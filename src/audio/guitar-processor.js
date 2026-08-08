/**
 * CircleSong string synthesis worklet.
 *
 * Six independent digital waveguide (extended Karplus-Strong) string models,
 * coupled through a shared bridge. Running in an AudioWorklet is what makes
 * this possible at all: the string loop needs single-sample feedback, which no
 * arrangement of native WebAudio nodes can express.
 *
 * Per string:
 *   excitation -> [ delay line -> fractional-delay allpass -> loop filter
 *                   -> loop gain -> (+ bridge coupling) ] -> pickup comb -> out
 *
 * The excitation is a noise burst shaped by pick hardness (one-pole lowpass)
 * and pick position (feed-forward comb), which is what gives the attack its
 * character. Loop gain is derived from a target T60 so decay time is specified
 * in seconds rather than by an opaque coefficient, and the loop filter makes
 * high partials die faster than low ones — the single most audible property of
 * a real plucked string.
 */

const MAX_DELAY = 4096; // ~11.7 Hz at 48 kHz, far below any guitar string
const MASK = MAX_DELAY - 1;

class StringModel {
  constructor(sampleRate, index) {
    this.sr = sampleRate;
    this.index = index;
    this.buf = new Float32Array(MAX_DELAY);
    this.w = 0;

    this.delay = 100;
    this.intDelay = 99;
    this.apCoef = 0;
    this.apX1 = 0;
    this.apY1 = 0;

    this.lpState = 0;
    this.lpCoef = 0.5;
    this.loopGain = 0.995;

    this.freq = 110;
    this.amp = 0;
    this.active = false;

    // Pickup comb (electric): fraction of the string length from the bridge.
    this.pickupPos = 0.12;
    this.pickupMix = 0;

    // Body/bridge DC blocker so coupling can't build up a rail offset.
    this.dcX1 = 0;
    this.dcY1 = 0;

    // Mute envelope: multiplies loop gain, used for palm mutes and note-offs.
    this.muteGain = 1;
    this.muteTarget = 1;
    this.muteRate = 1;

    this.rng = 0x9e3779b9 ^ (index * 0x85ebca6b);
  }

  noise() {
    // xorshift32 — deterministic per string, no allocation.
    let x = this.rng;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.rng = x >>> 0;
    return (this.rng / 0x7fffffff) - 1;
  }

  /**
   * Excite the string.
   * @param {object} p
   *  freq, velocity, decay (T60 seconds), brightness 0..1, pickPos 0..0.5,
   *  hardness 0..1, pickupPos, pickupMix, muteAmount 0..1
   */
  pluck(p) {
    const freq = Math.max(20, Math.min(this.sr / 4, p.freq));
    this.freq = freq;
    const total = this.sr / freq;

    // Split into an integer delay plus a first-order allpass handling the
    // fractional part. Keep the fractional part near 1.0 where the allpass is
    // best behaved (a delay of ~0 makes the filter ring).
    let intDelay = Math.floor(total) - 1;
    let frac = total - intDelay;
    if (intDelay < 2) {
      intDelay = 2;
      frac = Math.max(0.1, total - intDelay);
    }
    this.delay = total;
    this.intDelay = intDelay;
    this.apCoef = (1 - frac) / (1 + frac);
    this.apX1 = 0;
    this.apY1 = 0;

    const vel = Math.max(0.02, Math.min(1, p.velocity ?? 0.8));
    const mute = Math.max(0, Math.min(1, p.muteAmount ?? 0));

    // Loop filter. The cutoff tracks the fundamental rather than sitting at a
    // fixed frequency: a real string's losses scale with partial number, so
    // what stays constant across the neck is roughly *how many harmonics*
    // survive, not which kilohertz. A fixed cutoff is the single biggest
    // reason naive Karplus-Strong sounds like a sitar on the low strings and
    // like a rubber band on the high ones. The absolute ceiling then keeps the
    // top strings from screaming, which is also what real ones do.
    const brightness = Math.max(0.02, Math.min(0.999, (p.brightness ?? 0.5) * (0.75 + 0.35 * vel)));
    const harmonics = 8 + brightness * 46;
    const ceiling = 6500 * (1 - 0.65 * mute);
    const cutoff = Math.max(
      120,
      Math.min(freq * harmonics * (1 - 0.5 * mute), ceiling, this.sr * 0.45)
    );
    this.lpCoef = Math.exp((-2 * Math.PI * cutoff) / this.sr);

    // T60 -> per-period loop gain: g^(freq*T60) = 10^-3
    let t60 = Math.max(0.05, p.decay ?? 3.0);
    if (mute > 0) t60 *= 1 - 0.93 * mute;
    // Lower strings sustain longer; higher strings shed energy faster.
    t60 *= 1 + 0.35 * (1 - Math.min(1, freq / 330));
    this.loopGain = Math.min(0.99995, Math.pow(10, -3 / (freq * t60)));

    this.pickupPos = p.pickupPos ?? 0.12;
    this.pickupMix = p.pickupMix ?? 0;

    this.muteGain = 1;
    this.muteTarget = 1;
    this.muteRate = 1;

    // --- Build the excitation burst ---
    const n = Math.max(2, Math.round(total));
    const hardness = Math.max(0, Math.min(1, p.hardness ?? 0.5));
    // A soft fingertip is a low-passed impulse; a hard plectrum is closer to
    // white. Map hardness onto the one-pole smoothing of the noise burst.
    const smooth = 0.9 - 0.88 * hardness;

    const burst = new Float32Array(n);
    let s = 0;
    for (let i = 0; i < n; i++) {
      const white = this.noise();
      s = smooth * s + (1 - smooth) * white;
      // Taper the burst so the pluck has a short, non-clicky rise.
      const env = i < n * 0.1 ? i / (n * 0.1) : 1;
      burst[i] = s * env;
    }

    // Pick position comb: plucking at position β notches every (1/β)-th
    // harmonic. The coefficient is just under 1 so the notches are deep
    // without turning the whole burst into a differentiator.
    const beta = Math.max(0.02, Math.min(0.5, p.pickPos ?? 0.13));
    const dly = Math.max(1, Math.round(beta * n));
    const combed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      combed[i] = burst[i] - 0.9 * (i >= dly ? burst[i - dly] : 0);
    }

    // Spectral tilt. An ideal plucked string's initial displacement puts
    // amplitude ~ sin(nπβ)/n² into partial n — the comb above supplies the
    // sin(nπβ) term, this supplies the 1/n². Two cascaded one-poles give the
    // required -12 dB/oct; a single pole (-6 dB/oct) leaves the note thin and
    // nasal, with more energy around the 11th harmonic than the fundamental.
    // The corner is referenced to the pitch and opened up by pick hardness, so
    // a fingertip is mellow and a plectrum is bright at every pitch.
    const tiltFc = Math.min(freq * (0.5 + 1.5 * hardness), this.sr * 0.4);
    const tiltA = 1 - Math.exp((-2 * Math.PI * tiltFc) / this.sr);
    let t1 = 0;
    let t2 = 0;
    for (let i = 0; i < n; i++) {
      t1 += tiltA * (combed[i] - t1);
      t2 += tiltA * (t1 - t2);
      combed[i] = t2;
    }

    // Normalise so velocity, not the RNG, controls level.
    let peak = 1e-6;
    for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(combed[i]));
    const gain = (vel * 0.7) / peak;

    // Replace the delay-line contents. Re-plucking a ringing string damps what
    // was there rather than summing with it, which is what a real pick does.
    const keep = 0.25;
    for (let i = 0; i < MAX_DELAY; i++) this.buf[i] *= keep;
    for (let i = 0; i < n; i++) {
      const idx = (this.w - i + MAX_DELAY) & MASK;
      this.buf[idx] += combed[i] * gain;
    }

    this.lpState = 0;
    this.active = true;
    this.amp = vel;
  }

  /** Damp a ringing string (note-off, fret-hand mute, or palm mute). */
  release(level = 0.5, timeSec = 0.12) {
    this.muteTarget = Math.max(0, 1 - level);
    this.muteRate = Math.exp(-1 / Math.max(1, timeSec * this.sr));
  }

  silence() {
    this.buf.fill(0);
    this.active = false;
    this.amp = 0;
    this.lpState = 0;
    this.apX1 = 0;
    this.apY1 = 0;
    this.muteGain = 1;
    this.muteTarget = 1;
  }

  /** Advance one sample. `coupling` is the shared bridge signal. */
  tick(coupling) {
    if (!this.active) return 0;

    const r = (this.w - this.intDelay + MAX_DELAY) & MASK;
    const x = this.buf[r];

    // First-order allpass for the fractional delay.
    const a = this.apCoef;
    const y = a * x + this.apX1 - a * this.apY1;
    this.apX1 = x;
    this.apY1 = y;

    // One-pole lowpass in the loop => frequency-dependent decay.
    this.lpState = (1 - this.lpCoef) * y + this.lpCoef * this.lpState;

    this.muteGain = this.muteTarget + (this.muteGain - this.muteTarget) * this.muteRate;
    const fed = this.lpState * this.loopGain * this.muteGain + coupling;

    this.buf[this.w] = fed;

    // Output tap. With pickupMix > 0 we take the difference between the bridge
    // and a point further along the string: the comb notch of a magnetic pickup.
    let out = y;
    if (this.pickupMix > 0) {
      const pd = Math.max(1, Math.round(this.pickupPos * this.delay));
      const pr = (this.w - pd + MAX_DELAY) & MASK;
      out = y - this.buf[pr] * this.pickupMix;
    }

    // A hand landing on the strings silences what is already travelling down
    // the delay line, not just what recirculates — so damping has to attenuate
    // the output too, otherwise a "cut" still rings for a full period.
    out *= this.muteGain;

    this.w = (this.w + 1) & MASK;

    // DC blocker.
    const dc = out - this.dcX1 + 0.9985 * this.dcY1;
    this.dcX1 = out;
    this.dcY1 = dc;

    // Cheap activity gate so idle strings cost nothing.
    this.amp = Math.max(Math.abs(dc), this.amp * 0.9995);
    if (this.amp < 2e-5) {
      this.active = false;
      this.amp = 0;
    }
    return dc;
  }
}

class GuitarProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.strings = Array.from({ length: 6 }, (_, i) => new StringModel(sampleRate, i));
    this.queue = [];
    this.coupling = 0.006;
    this.bridgeState = 0;
    /** Previous-sample output per string, so a string never drives itself. */
    this.last = new Float32Array(6);
    // Slight stereo spread: low strings left, high strings right.
    this.pan = [-0.35, -0.22, -0.08, 0.08, 0.22, 0.35];
    this.master = 0.9;
    this.running = true;

    this.port.onmessage = (e) => this.onMessage(e.data);
  }

  onMessage(msg) {
    switch (msg.type) {
      case 'pluck':
      case 'release':
        this.queue.push(msg);
        // Keep the queue ordered by scheduled frame.
        this.queue.sort((a, b) => a.frame - b.frame);
        break;

      // Retrigger: silence everything from `frame` onward. Pending events at or
      // after that point are dropped rather than allowed to fire, which is what
      // stops a rapid series of clicks from piling chords on top of each other.
      // Notes scheduled *after* this message arrives still play, so the caller
      // cuts first and schedules the replacement second.
      case 'cut':
        this.queue = this.queue.filter((e) => e.frame < msg.frame);
        this.queue.push({
          type: 'cutAll',
          frame: msg.frame,
          level: msg.level ?? 1,
          time: msg.time ?? 0.03,
        });
        this.queue.sort((a, b) => a.frame - b.frame);
        break;
      case 'config':
        if (msg.coupling !== undefined) this.coupling = msg.coupling;
        if (msg.master !== undefined) this.master = msg.master;
        break;
      case 'allNotesOff':
        this.queue.length = 0;
        this.strings.forEach((s) => s.silence());
        break;
      case 'stop':
        this.running = false;
        break;
    }
  }

  applyEvent(ev) {
    if (ev.type === 'cutAll') {
      for (const s of this.strings) s.release(ev.level, ev.time);
      return;
    }
    const s = this.strings[ev.string & 5];
    if (ev.type === 'pluck') s.pluck(ev);
    else s.release(ev.level ?? 0.6, ev.time ?? 0.1);
  }

  process(_inputs, outputs) {
    const out = outputs[0];
    const left = out[0];
    const right = out.length > 1 ? out[1] : out[0];
    const n = left.length;
    const base = currentFrame;

    for (let i = 0; i < n; i++) {
      // Sample-accurate event dispatch.
      while (this.queue.length && this.queue[0].frame <= base + i) {
        this.applyEvent(this.queue.shift());
      }

      let l = 0;
      let r = 0;
      let sum = 0;
      const bridge = this.bridgeState;

      for (let k = 0; k < 6; k++) {
        const st = this.strings[k];
        if (!st.active) {
          this.last[k] = 0;
          continue;
        }
        // Drive each string with the bridge motion caused by the *other*
        // strings. Leaving its own contribution in place is positive feedback:
        // it silently raises the loop gain and stretches every note far past
        // the decay time the preset asked for.
        const v = st.tick((bridge - this.last[k]) * this.coupling);
        this.last[k] = v;
        sum += v;
        const p = this.pan[k];
        l += v * (1 - p) * 0.5;
        r += v * (1 + p) * 0.5;
      }

      // Bridge admittance: lowpassed sum of all strings.
      this.bridgeState = this.bridgeState * 0.72 + sum * 0.28;

      left[i] = l * this.master;
      right[i] = r * this.master;
    }

    return this.running;
  }
}

registerProcessor('guitar-processor', GuitarProcessor);
