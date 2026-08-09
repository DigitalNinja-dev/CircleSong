/**
 * Audio engine: owns the AudioContext, the string worklet, and the post chain.
 *
 * Signal path
 *   guitar-processor (6 waveguide strings, stereo)
 *     -> drive stage (clean / soft-clip blend)
 *     -> tone stack (low shelf, mid bell, high shelf)
 *     -> body or cabinet convolution (wet/dry blend)
 *     -> bus -> compressor -> master -> destination
 *                \-> reverb send -> room convolution -> master
 */

import {
  steelBodyIR,
  nylonBodyIR,
  archtopBodyIR,
  cabinetIR,
  roomIR,
  driveCurve,
  safetyCurve,
} from './impulse.js';
import { midiToFreq } from '../theory.js';

const WORKLET_URL = new URL('./guitar-processor.js', import.meta.url);

/**
 * Tone presets. `string` params go to the physical model; everything else
 * shapes the instrument body and signal chain around it.
 */
export const PRESETS = {
  acoustic: {
    label: 'Acoustic Steel',
    string: { decay: 4.2, brightness: 0.62, pickPos: 0.12, hardness: 0.62, pickupMix: 0 },
    body: 'steel',
    bodyMix: 0.85,
    drive: 0,
    tone: { low: 1.5, mid: -1.5, midFreq: 500, high: 2.5 },
    reverb: 0.16,
    gain: 0.52,
    coupling: 0.008,
  },
  nylon: {
    label: 'Nylon Classical',
    string: { decay: 3.0, brightness: 0.4, pickPos: 0.18, hardness: 0.18, pickupMix: 0 },
    body: 'nylon',
    bodyMix: 0.9,
    drive: 0,
    tone: { low: 2, mid: 1, midFreq: 320, high: -2 },
    reverb: 0.2,
    gain: 0.48,
    coupling: 0.01,
  },
  electric: {
    label: 'Electric Clean',
    string: { decay: 5.5, brightness: 0.7, pickPos: 0.1, hardness: 0.8, pickupMix: 0.6, pickupPos: 0.11 },
    body: 'cabinet',
    bodyMix: 0.75,
    drive: 0.12,
    tone: { low: 0, mid: -2, midFreq: 700, high: 3 },
    reverb: 0.14,
    gain: 0.54,
    coupling: 0.004,
  },
  crunch: {
    label: 'Electric Crunch',
    string: { decay: 5.0, brightness: 0.78, pickPos: 0.09, hardness: 0.9, pickupMix: 0.7, pickupPos: 0.09 },
    body: 'cabinet',
    bodyMix: 0.9,
    drive: 0.55,
    tone: { low: 1, mid: 2, midFreq: 800, high: 1 },
    reverb: 0.1,
    gain: 0.3,
    coupling: 0.004,
  },
  jazz: {
    label: 'Jazz Archtop',
    string: { decay: 3.4, brightness: 0.3, pickPos: 0.22, hardness: 0.35, pickupMix: 0.45, pickupPos: 0.28 },
    body: 'archtop',
    bodyMix: 0.85,
    drive: 0.05,
    tone: { low: 2, mid: 1.5, midFreq: 400, high: -6 },
    reverb: 0.18,
    gain: 0.38,
    coupling: 0.005,
  },
  reggae: {
    label: 'Reggae Skank',
    string: { decay: 0.75, brightness: 0.72, pickPos: 0.08, hardness: 0.75, pickupMix: 0.55, pickupPos: 0.14 },
    body: 'cabinet',
    bodyMix: 0.8,
    drive: 0.08,
    tone: { low: -4, mid: 3, midFreq: 1200, high: 1 },
    reverb: 0.22,
    gain: 0.58,
    coupling: 0.003,
  },
};

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.node = null;
    this.ready = false;
    this.presetId = 'acoustic';
    this.preset = PRESETS.acoustic;
    this._irs = {};
    this.masterVolume = 0.8;
    /** User tweaks layered on top of the preset's string parameters. */
    this.overrides = {};
    /**
     * When each string is expected to have gone quiet. The model has exactly
     * six voices, so single notes have to be spread across them deliberately —
     * otherwise a run keeps landing on the same string and each note chokes the
     * one before it.
     */
    this._stringFree = new Float64Array(6);
  }

  /**
   * Choose the string to play a note on.
   *
   * `layer: true` means the note should ring alongside whatever is already
   * sounding (jamming a scale), so a string that has gone quiet is strongly
   * preferred and the longest-ringing one is stolen only as a last resort.
   * `layer: false` just wants the most comfortable fret.
   */
  allocateString(midi, tuning, { layer = false, maxFret = 15, at = null } = {}) {
    // Judge availability at the moment the note will sound, not at call time —
    // a scheduled run allocates all its notes up front.
    const now = at ?? this.currentTime;
    let best = -1;
    let bestScore = -Infinity;

    for (let s = 0; s < 6; s++) {
      const fret = midi - tuning[s];
      if (fret < 0 || fret > maxFret) continue;

      // Frets around the middle of the neck are the most playable, and open
      // strings are always fine.
      let score = -Math.abs(fret - 5) * 0.5;
      if (fret === 0) score += 2;

      if (layer) {
        const quiet = this._stringFree[s] <= now;
        // A free string outweighs any fret-comfort consideration.
        score += quiet ? 100 : -(this._stringFree[s] - now) * 4;
      }

      if (score > bestScore) { bestScore = score; best = s; }
    }
    return best;
  }

  /**
   * Play a single note, choosing the string for you. Returns the string used,
   * or -1 when the note is out of range in this tuning.
   */
  pluckNote({ midi, tuning, when, velocity = 0.85, layer = false }) {
    if (!this.ready) return -1;
    const t = when ?? this.currentTime + 0.02;
    const string = this.allocateString(midi, tuning, { layer, at: t });
    if (string < 0) return -1;
    this.pluck({ string, midi, when: t, velocity });
    // Assume it is audible for most of its decay; good enough for allocation.
    this._stringFree[string] = t + this.stringParams.decay * 0.55;
    return string;
  }

  /** A single strum of a voicing — one stroke, not a bar of a rhythm pattern. */
  strumOnce({ midi, when, velocity = 0.85, direction = 'D', spread = 0.028 }) {
    if (!this.ready) return;
    const t = when ?? this.currentTime + 0.02;
    this.strum({ midi, when: t, direction, velocity, spread });
    const decay = this.stringParams.decay * 0.55;
    for (let s = 0; s < 6; s++) {
      if (midi[s] !== null && midi[s] !== undefined) this._stringFree[s] = t + decay;
    }
  }

  /** Merged string parameters: preset defaults with user overrides applied. */
  get stringParams() {
    return { ...this.preset.string, ...this.overrides };
  }

  setStringOverride(key, value) {
    if (value === null || value === undefined) delete this.overrides[key];
    else this.overrides[key] = value;
  }

  clearStringOverrides() {
    this.overrides = {};
  }

  get currentTime() {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  /**
   * Must be called from a user gesture. Idempotent, and safe to call
   * concurrently — overlapping callers share one in-flight boot rather than
   * each building a context and racing to construct the worklet node.
   */
  async init() {
    if (this.ready) {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      return;
    }
    if (!this._initPromise) {
      this._initPromise = this._init().catch((err) => {
        this._initPromise = null;
        throw err;
      });
    }
    return this._initPromise;
  }

  async _init() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) throw new Error('Web Audio is not available in this browser.');
    this.ctx = new Ctx({ latencyHint: 'interactive' });

    if (!this.ctx.audioWorklet) {
      throw new Error(
        'AudioWorklet is required. Serve the app over http:// or https:// (not file://) in a modern browser.'
      );
    }
    await this.ctx.audioWorklet.addModule(WORKLET_URL);

    this.node = new AudioWorkletNode(this.ctx, 'guitar-processor', {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2],
    });

    this._buildChain();
    this._irs = {
      steel: steelBodyIR(this.ctx),
      nylon: nylonBodyIR(this.ctx),
      archtop: archtopBodyIR(this.ctx),
      cabinet: cabinetIR(this.ctx),
    };
    this.room.buffer = roomIR(this.ctx);

    this.ready = true;
    this.setPreset(this.presetId);
    await this.ctx.resume();
  }

  _buildChain() {
    const ctx = this.ctx;

    this.input = ctx.createGain();
    this.node.connect(this.input);

    // Drive stage: parallel clean + soft-clip, crossfaded by preset.drive.
    this.cleanGain = ctx.createGain();
    this.driveIn = ctx.createGain();
    this.shaper = ctx.createWaveShaper();
    this.shaper.oversample = '4x';
    this.driveOut = ctx.createGain();

    this.input.connect(this.cleanGain);
    this.input.connect(this.driveIn);
    this.driveIn.connect(this.shaper);
    this.shaper.connect(this.driveOut);

    // Tone stack.
    this.low = ctx.createBiquadFilter();
    this.low.type = 'lowshelf';
    this.low.frequency.value = 180;
    this.mid = ctx.createBiquadFilter();
    this.mid.type = 'peaking';
    this.mid.Q.value = 0.9;
    this.high = ctx.createBiquadFilter();
    this.high.type = 'highshelf';
    this.high.frequency.value = 3200;

    this.cleanGain.connect(this.low);
    this.driveOut.connect(this.low);
    this.low.connect(this.mid);
    this.mid.connect(this.high);

    // Body / cabinet convolution with a dry blend.
    this.convolver = ctx.createConvolver();
    this.convolver.normalize = false;
    this.bodyWet = ctx.createGain();
    this.bodyDry = ctx.createGain();
    this.high.connect(this.convolver);
    this.convolver.connect(this.bodyWet);
    this.high.connect(this.bodyDry);

    this.bus = ctx.createGain();
    this.bodyWet.connect(this.bus);
    this.bodyDry.connect(this.bus);

    // Room ambience send.
    this.room = ctx.createConvolver();
    this.room.normalize = true;
    this.reverbSend = ctx.createGain();
    this.reverbSend.gain.value = 0.15;
    this.bus.connect(this.reverbSend);
    this.reverbSend.connect(this.room);

    // Glue compression, then master.
    this.comp = ctx.createDynamicsCompressor();
    this.comp.threshold.value = -18;
    this.comp.knee.value = 22;
    this.comp.ratio.value = 3;
    this.comp.attack.value = 0.006;
    this.comp.release.value = 0.22;

    this.master = ctx.createGain();
    this.master.gain.value = this.masterVolume;

    // Output protection. A six-string strum sums six correlated transients, so
    // peaks land well above the level any single note suggests; without this
    // the destination hard-clips and the physical model's attack turns to
    // crackle. The compressor catches sustained overs, the shaper is a
    // brickwall for anything that slips past its attack time.
    this.limiter = ctx.createDynamicsCompressor();
    this.limiter.threshold.value = -1.5;
    this.limiter.knee.value = 0;
    this.limiter.ratio.value = 20;
    this.limiter.attack.value = 0.002;
    this.limiter.release.value = 0.1;

    this.safety = ctx.createWaveShaper();
    this.safety.curve = safetyCurve();
    this.safety.oversample = '2x';

    this.bus.connect(this.comp);
    this.room.connect(this.comp);
    this.comp.connect(this.master);
    this.master.connect(this.limiter);
    this.limiter.connect(this.safety);

    // The metronome bypasses the instrument chain so it never gets strummed
    // through the body IR or squashed by the glue compressor.
    this.clickBus = ctx.createGain();
    this.clickBus.gain.value = 0.5;
    this.clickBus.connect(this.master);

    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.safety.connect(this.analyser);
    this.safety.connect(ctx.destination);
  }

  /** Metronome click: a short pitched blip plus a noise transient. */
  click(when, accent = false) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = Math.max(when, ctx.currentTime);

    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = accent ? 1800 : 1150;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(accent ? 0.28 : 0.16, t + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    osc.connect(g).connect(this.clickBus);
    osc.start(t);
    osc.stop(t + 0.06);

    const n = ctx.createBufferSource();
    const len = Math.floor(ctx.sampleRate * 0.01);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const dch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) dch[i] = (Math.random() * 2 - 1) * (1 - i / len);
    n.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 2500;
    const ng = ctx.createGain();
    ng.gain.value = accent ? 0.2 : 0.11;
    n.connect(hp).connect(ng).connect(this.clickBus);
    n.start(t);
  }

  setMetronomeLevel(v) {
    if (this.ready) this.clickBus.gain.setTargetAtTime(v, this.ctx.currentTime, 0.02);
  }

  setPreset(id) {
    if (!PRESETS[id]) return;
    this.presetId = id;
    this.preset = PRESETS[id];
    if (!this.ready) return;

    const p = this.preset;
    const t = this.ctx.currentTime;
    const ramp = (param, value) => param.setTargetAtTime(value, t, 0.02);

    this.shaper.curve = driveCurve(Math.max(0.001, p.drive));
    ramp(this.driveIn.gain, p.drive > 0 ? 1 + p.drive * 3 : 0);
    ramp(this.driveOut.gain, p.drive > 0 ? 0.85 : 0);
    ramp(this.cleanGain.gain, 1 - Math.min(0.95, p.drive * 1.4));

    this.low.gain.setTargetAtTime(p.tone.low, t, 0.02);
    this.mid.gain.setTargetAtTime(p.tone.mid, t, 0.02);
    this.mid.frequency.setTargetAtTime(p.tone.midFreq, t, 0.02);
    this.high.gain.setTargetAtTime(p.tone.high, t, 0.02);

    this.convolver.buffer = this._irs[p.body] || this._irs.steel;
    ramp(this.bodyWet.gain, p.bodyMix);
    ramp(this.bodyDry.gain, 1 - p.bodyMix);
    ramp(this.reverbSend.gain, p.reverb);
    ramp(this.input.gain, p.gain);

    this.node.port.postMessage({ type: 'config', coupling: p.coupling });
  }

  setMasterVolume(v) {
    this.masterVolume = v;
    if (this.ready) this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.02);
  }

  /** Schedule a single plucked note. `when` is an AudioContext timestamp. */
  pluck({ string, midi, when, velocity = 0.8, muteAmount = 0, pickPos, hardness, decay }) {
    if (!this.ready) return;
    const s = this.stringParams;
    this.node.port.postMessage({
      type: 'pluck',
      frame: Math.max(0, Math.round(when * this.ctx.sampleRate)),
      string,
      freq: midiToFreq(midi),
      velocity,
      decay: decay ?? s.decay,
      brightness: s.brightness,
      pickPos: pickPos ?? s.pickPos,
      hardness: hardness ?? s.hardness,
      pickupMix: s.pickupMix ?? 0,
      pickupPos: s.pickupPos ?? 0.12,
      muteAmount,
    });
  }

  /** Damp a ringing string — note release or a fret-hand mute. */
  release(string, when, level = 0.75, time = 0.08) {
    if (!this.ready) return;
    this.node.port.postMessage({
      type: 'release',
      frame: Math.max(0, Math.round(when * this.ctx.sampleRate)),
      string,
      level,
      time,
    });
  }

  /**
   * Strum a voicing.
   *
   * Realism comes from three details: the strings are hit in sequence rather
   * than simultaneously (`spread`), an upstroke starts at the treble side and
   * usually omits the lowest strings, and each string gets a slightly
   * different velocity and pick position.
   *
   * @param {object} o
   *  midi: array of 6 (MIDI note or null), when, direction 'D'|'U',
   *  velocity, spread (seconds across the whole strum), mute 0..1, accent
   */
  strum({ midi, when, direction = 'D', velocity = 0.8, spread = 0.022, muteAmount = 0 }) {
    if (!this.ready) return;
    const played = [];
    for (let s = 0; s < 6; s++) if (midi[s] !== null && midi[s] !== undefined) played.push(s);
    if (!played.length) return;

    let order = played;
    if (direction === 'U') {
      order = played.slice().reverse();
      // Upstrokes typically catch only the top strings.
      const keep = Math.max(2, Math.ceil(played.length * 0.65));
      order = order.slice(0, keep);
    }

    const basePickPos = this.stringParams.pickPos;
    const gap = spread / Math.max(1, order.length - 1);
    order.forEach((s, i) => {
      // Humanise: ±12% velocity, small timing jitter, brighter on the treble.
      const jitter = (Math.random() - 0.5) * gap * 0.35;
      const v = velocity * (0.88 + Math.random() * 0.24) * (direction === 'U' ? 0.82 : 1);
      this.pluck({
        string: s,
        midi: midi[s],
        when: when + i * gap + jitter,
        velocity: Math.min(1, v),
        muteAmount,
        pickPos: basePickPos * (direction === 'U' ? 1.15 : 1) + s * 0.004,
      });
    });
  }

  /** Arpeggiate a voicing low-to-high (or high-to-low) over `duration`. */
  arpeggiate({ midi, when, duration, velocity = 0.75, descending = false }) {
    const played = [];
    for (let s = 0; s < 6; s++) if (midi[s] !== null && midi[s] !== undefined) played.push(s);
    if (!played.length) return;
    const order = descending ? played.slice().reverse() : played;
    const gap = duration / order.length;
    order.forEach((s, i) => {
      this.pluck({
        string: s,
        midi: midi[s],
        when: when + i * gap,
        velocity: velocity * (i === 0 ? 1 : 0.9),
        hardness: Math.max(0, this.stringParams.hardness - 0.25),
      });
    });
  }

  /**
   * Silence everything from `when` onward, dropping any notes already queued
   * for that moment or later. This is the retrigger primitive: call it, then
   * schedule the replacement, and the old sound stops exactly as the new one
   * starts instead of layering on top of it.
   *
   * The default 30 ms damp is fast enough to read as an immediate cut but slow
   * enough not to click.
   */
  cut(when = null, { level = 1, time = 0.03 } = {}) {
    if (!this.ready) return;
    const t = Math.max(when ?? this.currentTime, 0);
    this.node.port.postMessage({
      type: 'cut',
      frame: Math.max(0, Math.round(t * this.ctx.sampleRate)),
      level,
      time,
    });
  }

  /** Immediate, unconditional silence — used when tearing down playback. */
  allNotesOff() {
    if (this.ready) this.node.port.postMessage({ type: 'allNotesOff' });
  }

  async suspend() {
    if (this.ready && this.ctx.state === 'running') await this.ctx.suspend();
  }
}
