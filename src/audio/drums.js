/**
 * Drum synthesis.
 *
 * Synthesised rather than sampled for the same reason the guitar is: the app
 * ships no audio assets, works offline, and loads instantly.
 *
 * The one thing worth getting right is metal. Filtered white noise is the
 * obvious way to make a hi-hat and it is the reason cheap drum machines sound
 * cheap — real cymbals are a dense cluster of *inharmonic* partials, not noise.
 * Hats, rides and crashes here use the TR-808 approach: six square oscillators
 * at deliberately non-integer ratios, band-limited and enveloped. Skins (kick,
 * snare, toms) are pitch-swept sines, which is genuinely what they are.
 */

/** Inharmonic ratios behind every metal voice — the 808 cymbal cluster. */
const METAL_RATIOS = [1, 1.4830, 1.8004, 2.5460, 2.6300, 3.8970];
const METAL_BASE = 205.3;

/**
 * Kits vary voice tuning, envelope and level. Every kit has every voice, so a
 * pattern can be played by any kit without gaps.
 */
export const DRUM_KITS = {
  rock: {
    label: 'Rock Standard',
    kick: { freq: 48, punch: 95, decay: 0.36, click: 0.55, sub: 0.35, gain: 1.0 },
    snare: { low: 185, high: 330, noise: 0.9, decay: 0.19, bp: 2400, q: 0.7, gain: 0.9 },
    hat: { base: 1.0, decay: 0.05, open: 0.36, hp: 7800, gain: 0.4 },
    ride: { base: 0.72, decay: 1.5, hp: 4400, gain: 0.3, ping: 0.5 },
    crash: { base: 0.86, decay: 2.2, hp: 3400, gain: 0.34 },
    rim: { freq: 420, decay: 0.055, gain: 0.62 },
    tom: { freq: 150, punch: 70, decay: 0.34, gain: 0.8 },
    shaker: { decay: 0.055, hp: 6200, gain: 0.3 },
    clap: { decay: 0.18, bp: 1500, gain: 0.6 },
  },
  acoustic: {
    label: 'Cajon & Percussion',
    kick: { freq: 62, punch: 45, decay: 0.24, click: 0.8, sub: 0.15, gain: 0.94 },
    snare: { low: 240, high: 420, noise: 0.55, decay: 0.11, bp: 2600, q: 1.2, gain: 0.62 },
    hat: { base: 1.15, decay: 0.045, open: 0.2, hp: 6400, gain: 0.26 },
    ride: { base: 0.8, decay: 0.9, hp: 4000, gain: 0.2, ping: 0.35 },
    crash: { base: 0.9, decay: 1.4, hp: 3200, gain: 0.24 },
    rim: { freq: 540, decay: 0.045, gain: 0.55 },
    tom: { freq: 128, punch: 40, decay: 0.28, gain: 0.62 },
    shaker: { decay: 0.08, hp: 4600, gain: 0.44 },
    clap: { decay: 0.15, bp: 1700, gain: 0.5 },
  },
  reggae: {
    label: 'Reggae / Dub',
    kick: { freq: 41, punch: 60, decay: 0.46, click: 0.2, sub: 0.6, gain: 1.05 },
    snare: { low: 330, high: 520, noise: 0.3, decay: 0.12, bp: 1400, q: 1.6, gain: 0.72 },
    hat: { base: 1.05, decay: 0.04, open: 0.28, hp: 8400, gain: 0.34 },
    ride: { base: 0.75, decay: 1.1, hp: 4200, gain: 0.22, ping: 0.3 },
    crash: { base: 0.88, decay: 1.8, hp: 3200, gain: 0.28 },
    rim: { freq: 470, decay: 0.08, gain: 0.95 },
    tom: { freq: 118, punch: 55, decay: 0.38, gain: 0.72 },
    shaker: { decay: 0.05, hp: 6800, gain: 0.26 },
    clap: { decay: 0.2, bp: 1300, gain: 0.5 },
  },
  jazz: {
    label: 'Jazz Brushes',
    kick: { freq: 56, punch: 30, decay: 0.22, click: 0.1, sub: 0.2, gain: 0.55 },
    snare: { low: 250, high: 380, noise: 1.0, decay: 0.17, bp: 3200, q: 0.5, gain: 0.4 },
    hat: { base: 0.95, decay: 0.06, open: 0.32, hp: 7000, gain: 0.26 },
    ride: { base: 0.7, decay: 1.9, hp: 4200, gain: 0.44, ping: 0.75 },
    crash: { base: 0.84, decay: 2.0, hp: 3000, gain: 0.28 },
    rim: { freq: 500, decay: 0.05, gain: 0.55 },
    tom: { freq: 140, punch: 45, decay: 0.3, gain: 0.55 },
    shaker: { decay: 0.1, hp: 5000, gain: 0.3 },
    clap: { decay: 0.16, bp: 1800, gain: 0.42 },
  },
  lofi: {
    label: 'Lo-Fi / Chillhop',
    kick: { freq: 46, punch: 55, decay: 0.42, click: 0.28, sub: 0.5, gain: 0.98 },
    snare: { low: 200, high: 300, noise: 0.72, decay: 0.16, bp: 1700, q: 0.9, gain: 0.66 },
    hat: { base: 0.88, decay: 0.05, open: 0.24, hp: 5200, gain: 0.28 },
    ride: { base: 0.68, decay: 0.9, hp: 3600, gain: 0.22, ping: 0.4 },
    crash: { base: 0.8, decay: 1.5, hp: 2800, gain: 0.26 },
    rim: { freq: 440, decay: 0.06, gain: 0.5 },
    tom: { freq: 132, punch: 45, decay: 0.34, gain: 0.6 },
    shaker: { decay: 0.07, hp: 4800, gain: 0.26 },
    clap: { decay: 0.19, bp: 1400, gain: 0.58 },
  },
  metal: {
    label: 'Hard Rock / Metal',
    kick: { freq: 50, punch: 150, decay: 0.2, click: 1.0, sub: 0.3, gain: 1.1 },
    snare: { low: 200, high: 360, noise: 1.0, decay: 0.23, bp: 2200, q: 0.6, gain: 1.0 },
    hat: { base: 1.1, decay: 0.042, open: 0.45, hp: 8600, gain: 0.44 },
    ride: { base: 0.78, decay: 1.6, hp: 5000, gain: 0.4, ping: 0.6 },
    crash: { base: 0.92, decay: 2.6, hp: 3600, gain: 0.4 },
    rim: { freq: 400, decay: 0.05, gain: 0.6 },
    tom: { freq: 160, punch: 80, decay: 0.3, gain: 0.92 },
    shaker: { decay: 0.05, hp: 7000, gain: 0.28 },
    clap: { decay: 0.17, bp: 1600, gain: 0.62 },
  },
};

/** Every voice a pattern may address, in the order the grid shows them. */
export const DRUM_VOICES = [
  { id: 'kick', label: 'Kick' },
  { id: 'snare', label: 'Snare' },
  { id: 'clap', label: 'Clap' },
  { id: 'rim', label: 'Rim' },
  { id: 'hat', label: 'Hat' },
  { id: 'openhat', label: 'Open Hat' },
  { id: 'ride', label: 'Ride' },
  { id: 'crash', label: 'Crash' },
  { id: 'tom', label: 'Tom' },
  { id: 'shaker', label: 'Shaker' },
];

export class DrumKit {
  constructor(ctx, destination) {
    this.ctx = ctx;
    this.kitId = 'rock';

    this.out = ctx.createGain();
    this.out.gain.value = 0.7;

    // Drums get their own glue compressor: a busy pattern should stay even
    // without pumping the guitar, which sits on a different bus.
    this.comp = ctx.createDynamicsCompressor();
    this.comp.threshold.value = -14;
    this.comp.knee.value = 12;
    this.comp.ratio.value = 4;
    this.comp.attack.value = 0.002;
    this.comp.release.value = 0.12;

    this.out.connect(this.comp).connect(destination);

    // One noise buffer shared by every noise-based voice.
    const len = Math.floor(ctx.sampleRate * 2);
    this.noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }

  get kit() {
    return DRUM_KITS[this.kitId] || DRUM_KITS.rock;
  }

  setKit(id) { if (DRUM_KITS[id]) this.kitId = id; }

  setVolume(v) { this.out.gain.setTargetAtTime(v, this.ctx.currentTime, 0.02); }

  _env(when, peak, decay, { attack = 0.001, hold = 0 } = {}) {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(peak, when + attack);
    if (hold) g.gain.setValueAtTime(peak, when + attack + hold);
    g.gain.exponentialRampToValueAtTime(0.0001, when + attack + hold + decay);
    return g;
  }

  _noise(when, { hp = 0, bp = 0, q = 1, gain = 1, decay = 0.05, attack = 0.001 }) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    let node = src;
    if (hp) {
      const f = ctx.createBiquadFilter();
      f.type = 'highpass'; f.frequency.value = hp;
      node = node.connect(f);
    }
    if (bp) {
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass'; f.frequency.value = bp; f.Q.value = q;
      node = node.connect(f);
    }

    node.connect(this._env(when, gain, decay, { attack })).connect(this.out);
    // Random start offset so repeated hits are not bit-identical.
    src.start(when, Math.random() * (this.noiseBuffer.duration - decay - 0.1), decay + 0.1);
    src.stop(when + decay + 0.12);
  }

  /** Pitch-swept sine — the physical behaviour of a struck drum head. */
  _skin(when, { freq, punch = 0, decay = 0.2, gain = 1, type = 'sine', sweep = 0.5 }) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq + punch, when);
    if (punch) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq), when + decay * sweep);
    osc.connect(this._env(when, gain, decay)).connect(this.out);
    osc.start(when);
    osc.stop(when + decay + 0.05);
  }

  /**
   * Inharmonic metal cluster. Six squares at non-integer ratios through a
   * highpass is what separates a cymbal from a hiss.
   */
  _metal(when, { base = 1, decay = 0.05, hp = 7000, gain = 0.4, bp = 0, attack = 0.0005 }) {
    const ctx = this.ctx;
    const bus = this._env(when, gain, decay, { attack });

    let node = bus;
    const hpf = ctx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.value = hp;
    node = node.connect(hpf);

    if (bp) {
      const bpf = ctx.createBiquadFilter();
      bpf.type = 'bandpass'; bpf.frequency.value = bp; bpf.Q.value = 0.6;
      node = node.connect(bpf);
    }
    node.connect(this.out);

    for (const ratio of METAL_RATIOS) {
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.value = METAL_BASE * base * ratio;
      osc.connect(bus);
      osc.start(when);
      osc.stop(when + decay + 0.05);
    }
  }

  /**
   * Fire one voice.
   * @param {string} voice one of DRUM_VOICES
   * @param {number} when AudioContext timestamp
   * @param {number} velocity 0..1
   */
  hit(voice, when, velocity = 1) {
    const k = this.kit;
    const v = Math.max(0.04, Math.min(1.3, velocity));

    switch (voice) {
      case 'kick': {
        this._skin(when, { freq: k.kick.freq, punch: k.kick.punch, decay: k.kick.decay, gain: k.kick.gain * v, sweep: 0.28 });
        // A sub layer with no pitch sweep gives weight the swept tone loses.
        if (k.kick.sub) {
          this._skin(when, { freq: k.kick.freq * 0.6, decay: k.kick.decay * 1.2, gain: k.kick.sub * k.kick.gain * v });
        }
        if (k.kick.click) {
          this._noise(when, { hp: 1800, gain: 0.3 * k.kick.click * v, decay: 0.014 });
        }
        break;
      }

      case 'snare': {
        // Two head tones plus band-limited noise: pitch from the shell, snap
        // from the wires.
        this._skin(when, { freq: k.snare.low, decay: k.snare.decay * 0.5, gain: 0.5 * k.snare.gain * v, type: 'triangle' });
        this._skin(when, { freq: k.snare.high, decay: k.snare.decay * 0.32, gain: 0.3 * k.snare.gain * v, type: 'triangle' });
        this._noise(when, { bp: k.snare.bp, q: k.snare.q, gain: k.snare.noise * k.snare.gain * v, decay: k.snare.decay });
        this._noise(when, { hp: 6000, gain: 0.3 * k.snare.gain * v, decay: k.snare.decay * 0.45 });
        break;
      }

      case 'hat':
        this._metal(when, { base: k.hat.base, decay: k.hat.decay, hp: k.hat.hp, gain: k.hat.gain * v });
        break;

      case 'openhat':
        this._metal(when, { base: k.hat.base, decay: k.hat.open, hp: k.hat.hp * 0.92, gain: k.hat.gain * 0.92 * v });
        break;

      case 'ride':
        // The stick "ping" is a short bright transient over the long wash.
        this._metal(when, { base: k.ride.base, decay: k.ride.decay, hp: k.ride.hp, gain: k.ride.gain * v });
        if (k.ride.ping) {
          this._metal(when, { base: k.ride.base * 2.4, decay: 0.09, hp: k.ride.hp * 1.6, gain: k.ride.ping * k.ride.gain * v });
        }
        break;

      case 'crash':
        this._metal(when, { base: k.crash.base, decay: k.crash.decay, hp: k.crash.hp, gain: k.crash.gain * v, attack: 0.004 });
        this._noise(when, { hp: k.crash.hp * 1.3, gain: 0.28 * k.crash.gain * v, decay: k.crash.decay * 0.7, attack: 0.004 });
        break;

      case 'rim':
        this._skin(when, { freq: k.rim.freq, decay: k.rim.decay, gain: k.rim.gain * v, type: 'square' });
        this._noise(when, { bp: 2600, q: 3.5, gain: 0.4 * k.rim.gain * v, decay: k.rim.decay });
        break;

      case 'tom':
        this._skin(when, { freq: k.tom.freq, punch: k.tom.punch, decay: k.tom.decay, gain: k.tom.gain * v, sweep: 0.4 });
        this._noise(when, { bp: k.tom.freq * 4, q: 1.5, gain: 0.12 * k.tom.gain * v, decay: k.tom.decay * 0.4 });
        break;

      case 'shaker':
        this._noise(when, { hp: k.shaker.hp, gain: k.shaker.gain * v, decay: k.shaker.decay, attack: 0.004 });
        break;

      case 'clap': {
        // A clap is several hands slightly out of sync — three quick bursts
        // into one tail is what makes it read as a clap and not a snare.
        for (const [offset, level] of [[0, 0.7], [0.011, 0.85], [0.021, 1]]) {
          this._noise(when + offset, { bp: k.clap.bp, q: 0.8, gain: level * k.clap.gain * v, decay: offset === 0.021 ? k.clap.decay : 0.03 });
        }
        break;
      }

      default:
        break;
    }
  }
}
