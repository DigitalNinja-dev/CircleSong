/**
 * Drum synthesis.
 *
 * Every voice is built from oscillators and noise rather than samples, for the
 * same reason the guitar is modelled: the app ships no audio assets, works
 * offline, and loads instantly. Drums are far more forgiving than a plucked
 * string here — a kick really is a pitch-swept sine, and a hat really is
 * band-limited noise — so synthesis costs very little realism.
 *
 * Voices are scheduled against the AudioContext clock, so they line up with the
 * guitar to the sample rather than to a timer.
 */

/** Kits differ by voice tuning and level, not by which voices exist. */
export const DRUM_KITS = {
  rock: {
    label: 'Rock Standard',
    kick: { freq: 55, drop: 110, decay: 0.34, click: 0.5, gain: 1.0 },
    snare: { tone: 190, noise: 0.85, decay: 0.19, hp: 1400, gain: 0.85 },
    hat: { decay: 0.045, open: 0.32, hp: 7500, gain: 0.42 },
    rim: { freq: 420, decay: 0.06, gain: 0.6 },
    ride: { decay: 0.9, hp: 5200, gain: 0.3 },
    shaker: { decay: 0.06, hp: 6000, gain: 0.3 },
    tom: { freq: 150, drop: 60, decay: 0.32, gain: 0.75 },
  },
  acoustic: {
    label: 'Cajon & Shaker',
    kick: { freq: 62, drop: 55, decay: 0.26, click: 0.75, gain: 0.92 },
    snare: { tone: 260, noise: 0.6, decay: 0.12, hp: 1900, gain: 0.6 },
    hat: { decay: 0.05, open: 0.2, hp: 5200, gain: 0.3 },
    rim: { freq: 520, decay: 0.05, gain: 0.5 },
    ride: { decay: 0.5, hp: 4200, gain: 0.2 },
    shaker: { decay: 0.075, hp: 4200, gain: 0.42 },
    tom: { freq: 130, drop: 45, decay: 0.28, gain: 0.6 },
  },
  reggae: {
    label: 'Reggae / Dub',
    kick: { freq: 44, drop: 70, decay: 0.42, click: 0.25, gain: 1.05 },
    snare: { tone: 330, noise: 0.35, decay: 0.13, hp: 900, gain: 0.7 },
    hat: { decay: 0.038, open: 0.26, hp: 8200, gain: 0.36 },
    rim: { freq: 470, decay: 0.075, gain: 0.9 },
    ride: { decay: 0.7, hp: 5000, gain: 0.24 },
    shaker: { decay: 0.05, hp: 6500, gain: 0.26 },
    tom: { freq: 120, drop: 55, decay: 0.36, gain: 0.7 },
  },
  jazz: {
    label: 'Jazz Brushes',
    kick: { freq: 58, drop: 45, decay: 0.24, click: 0.15, gain: 0.6 },
    snare: { tone: 240, noise: 0.95, decay: 0.16, hp: 2400, gain: 0.42 },
    hat: { decay: 0.06, open: 0.3, hp: 6800, gain: 0.28 },
    rim: { freq: 500, decay: 0.05, gain: 0.55 },
    ride: { decay: 1.3, hp: 4600, gain: 0.42 },
    shaker: { decay: 0.09, hp: 4800, gain: 0.3 },
    tom: { freq: 140, drop: 50, decay: 0.3, gain: 0.55 },
  },
  lofi: {
    label: 'Lo-Fi / Chillhop',
    kick: { freq: 50, drop: 65, decay: 0.4, click: 0.3, gain: 0.95 },
    snare: { tone: 200, noise: 0.7, decay: 0.17, hp: 1100, gain: 0.65 },
    hat: { decay: 0.05, open: 0.24, hp: 5600, gain: 0.3 },
    rim: { freq: 440, decay: 0.06, gain: 0.5 },
    ride: { decay: 0.6, hp: 4200, gain: 0.22 },
    shaker: { decay: 0.07, hp: 5000, gain: 0.26 },
    tom: { freq: 135, drop: 50, decay: 0.34, gain: 0.6 },
  },
  metal: {
    label: 'Hard Rock / Metal',
    kick: { freq: 52, drop: 130, decay: 0.22, click: 0.95, gain: 1.1 },
    snare: { tone: 210, noise: 0.9, decay: 0.22, hp: 1600, gain: 1.0 },
    hat: { decay: 0.04, open: 0.4, hp: 8500, gain: 0.45 },
    rim: { freq: 400, decay: 0.05, gain: 0.6 },
    ride: { decay: 1.1, hp: 5600, gain: 0.4 },
    shaker: { decay: 0.05, hp: 7000, gain: 0.28 },
    tom: { freq: 160, drop: 70, decay: 0.3, gain: 0.9 },
  },
};

export class DrumKit {
  /**
   * @param {AudioContext} ctx
   * @param {AudioNode} destination
   */
  constructor(ctx, destination) {
    this.ctx = ctx;
    this.kitId = 'rock';

    this.out = ctx.createGain();
    this.out.gain.value = 0.7;

    // Drums get their own glue compressor so a busy pattern stays even without
    // pumping the guitar, which sits on a separate bus.
    this.comp = ctx.createDynamicsCompressor();
    this.comp.threshold.value = -14;
    this.comp.knee.value = 12;
    this.comp.ratio.value = 4;
    this.comp.attack.value = 0.003;
    this.comp.release.value = 0.12;

    this.out.connect(this.comp).connect(destination);

    // One noise buffer, reused by every noise-based voice.
    const len = Math.floor(ctx.sampleRate * 1.2);
    this.noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }

  get kit() {
    return DRUM_KITS[this.kitId] || DRUM_KITS.rock;
  }

  setKit(id) {
    if (DRUM_KITS[id]) this.kitId = id;
  }

  setVolume(v) {
    this.out.gain.setTargetAtTime(v, this.ctx.currentTime, 0.02);
  }

  _noise(when, duration, { hp = 0, bp = 0, q = 1, gain = 1, decay = 0.05 }) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.playbackRate.value = 1;
    // Start at a random offset so repeated hits are not bit-identical.
    const offset = Math.random() * (this.noiseBuffer.duration - duration - 0.01);

    let node = src;
    if (hp) {
      const f = ctx.createBiquadFilter();
      f.type = 'highpass';
      f.frequency.value = hp;
      node = node.connect(f);
    }
    if (bp) {
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = bp;
      f.Q.value = q;
      node = node.connect(f);
    }

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(gain, when + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, when + decay);
    node.connect(g).connect(this.out);

    src.start(when, Math.max(0, offset), decay + 0.05);
    src.stop(when + decay + 0.06);
  }

  _tone(when, { freq, drop = 0, decay = 0.2, gain = 1, type = 'sine' }) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq + drop, when);
    if (drop) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq), when + decay * 0.55);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(gain, when + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, when + decay);

    osc.connect(g).connect(this.out);
    osc.start(when);
    osc.stop(when + decay + 0.03);
  }

  /**
   * Fire one drum voice.
   * @param {string} voice kick|snare|hat|openhat|rim|ride|shaker|tom
   * @param {number} when AudioContext timestamp
   * @param {number} velocity 0..1
   */
  hit(voice, when, velocity = 1) {
    const k = this.kit;
    const v = Math.max(0.05, Math.min(1.4, velocity));

    switch (voice) {
      case 'kick':
        this._tone(when, { freq: k.kick.freq, drop: k.kick.drop, decay: k.kick.decay, gain: k.kick.gain * v });
        if (k.kick.click) {
          this._noise(when, 0.02, { hp: 1200, gain: 0.22 * k.kick.click * v, decay: 0.018 });
        }
        break;

      case 'snare':
        // Body plus noise: the tone gives it pitch, the noise gives it snap.
        this._tone(when, { freq: k.snare.tone, decay: k.snare.decay * 0.55, gain: 0.5 * k.snare.gain * v, type: 'triangle' });
        this._noise(when, 0.2, { hp: k.snare.hp, gain: k.snare.noise * k.snare.gain * v, decay: k.snare.decay });
        break;

      case 'hat':
        this._noise(when, 0.08, { hp: k.hat.hp, gain: k.hat.gain * v, decay: k.hat.decay });
        break;

      case 'openhat':
        this._noise(when, 0.4, { hp: k.hat.hp * 0.9, gain: k.hat.gain * 0.9 * v, decay: k.hat.open });
        break;

      case 'rim':
        this._tone(when, { freq: k.rim.freq, decay: k.rim.decay, gain: k.rim.gain * v, type: 'square' });
        this._noise(when, 0.05, { bp: 2400, q: 3, gain: 0.35 * k.rim.gain * v, decay: k.rim.decay });
        break;

      case 'ride':
        this._noise(when, 1.4, { hp: k.ride.hp, gain: k.ride.gain * v, decay: k.ride.decay });
        this._tone(when, { freq: 3200, decay: 0.12, gain: 0.08 * k.ride.gain * v, type: 'square' });
        break;

      case 'shaker':
        this._noise(when, 0.12, { hp: k.shaker.hp, gain: k.shaker.gain * v, decay: k.shaker.decay });
        break;

      case 'tom':
        this._tone(when, { freq: k.tom.freq, drop: k.tom.drop, decay: k.tom.decay, gain: k.tom.gain * v });
        break;

      default:
        break;
    }
  }
}
