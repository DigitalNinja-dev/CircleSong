/*
 * CircleSong - Interactive Music Theory & Composition Engine
 * Copyright (C) 2026 Nicolás Raul Jean-Pierre Figueroa
 * https://github.com/DigitalNinja-dev/CircleSong
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// Pitch detection and the tuning tables behind the Tuner tab.
//
// Ported from DigitalNinja-dev/Guitar-Tuner, which was scaffolded by AI Studio
// as a React/Vite/Tailwind app. The scaffolding is dropped — CircleSong has no
// dependencies and no build step to develop — but the substance is kept: YIN
// with parabolic interpolation, an RMS noise gate, EMA smoothing, and a
// hysteresis lock so the readout settles instead of flickering.
//
// Three things are done differently from the source, all for the same reason:
// this runs inside an app that already owns an audio graph.
//   - It uses CircleSong's AudioContext rather than making a second one. Two
//     contexts cannot share a clock and iOS limits how many exist at all.
//   - The microphone is a dead end: source -> analyser and nothing further. A
//     path to the destination is a phone speaker feeding its own microphone.
//   - The analysis window is sized from the lowest note being tuned. The source
//     used a fixed 2048-sample buffer, which cannot resolve anything below
//     about 47 Hz at 48 kHz — so the bass tunings it offers, down to B0 at
//     30.9 Hz, could never have been detected.

import { midiToFreq } from './theory.js';

export const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

/** Note name with octave for a MIDI number, e.g. 40 -> "E2". */
export function midiLabel(midi) {
  return `${NOTE_NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

/** How far `freq` is from `target`, in cents. */
export function centsBetween(freq, target) {
  return 1200 * Math.log2(freq / target);
}

/**
 * Instruments and their tunings, as MIDI note numbers low string first.
 * Straight from the source's tunings table.
 */
export const INSTRUMENTS = [
  {
    id: 'guitar', label: 'Guitar',
    tunings: [
      { id: 'standard', label: 'Standard — E A D G B E', notes: [40, 45, 50, 55, 59, 64] },
      { id: 'dropd', label: 'Drop D — D A D G B E', notes: [38, 45, 50, 55, 59, 64] },
      { id: 'halfstep', label: 'Half step down — E♭ A♭ D♭ G♭ B♭ E♭', notes: [39, 44, 49, 54, 58, 63] },
      { id: 'fullstep', label: 'Full step down — D G C F A D', notes: [38, 43, 48, 53, 57, 62] },
      { id: 'openg', label: 'Open G — D G D G B D', notes: [38, 43, 50, 55, 59, 62] },
      { id: 'opend', label: 'Open D — D A D F♯ A D', notes: [38, 45, 50, 54, 57, 62] },
      { id: 'dadgad', label: 'DADGAD — D A D G A D', notes: [38, 45, 50, 55, 57, 62] },
      { id: 'dropc', label: 'Drop C — C G C F A D', notes: [36, 43, 48, 53, 57, 62] },
      { id: 'seven', label: '7-string — B E A D G B E', notes: [35, 40, 45, 50, 55, 59, 64] },
    ],
  },
  {
    id: 'bass', label: 'Bass',
    tunings: [
      { id: 'bass4', label: 'Standard 4-string — E A D G', notes: [28, 33, 38, 43] },
      { id: 'bassdropd', label: 'Drop D — D A D G', notes: [26, 33, 38, 43] },
      { id: 'basshalf', label: 'Half step down — E♭ A♭ D♭ G♭', notes: [27, 32, 37, 42] },
      { id: 'bass5', label: 'Standard 5-string — B E A D G', notes: [23, 28, 33, 38, 43] },
    ],
  },
  {
    id: 'ukulele', label: 'Ukulele',
    tunings: [
      { id: 'ukehighg', label: 'Standard high-G — G C E A', notes: [67, 60, 64, 69] },
      { id: 'ukelowg', label: 'Low-G — G C E A', notes: [55, 60, 64, 69] },
      { id: 'uked', label: 'D tuning — A D F♯ B', notes: [69, 62, 66, 71] },
      { id: 'ukebari', label: 'Baritone — D G B E', notes: [50, 55, 59, 64] },
    ],
  },
  {
    id: 'mandolin', label: 'Mandolin',
    tunings: [
      { id: 'mando', label: 'Standard — G D A E', notes: [55, 62, 69, 76] },
      { id: 'mandoopeng', label: 'Open G — F♯ D A D', notes: [54, 62, 69, 62] },
    ],
  },
  {
    id: 'banjo', label: 'Banjo',
    tunings: [
      { id: 'banjog', label: 'Open G 5-string — g D G B D', notes: [67, 50, 55, 59, 62] },
      { id: 'banjoc', label: 'Double C — g C G C D', notes: [67, 48, 55, 60, 62] },
      { id: 'banjosaw', label: 'Sawmill — g D G C D', notes: [67, 50, 55, 60, 62] },
    ],
  },
  {
    id: 'violin', label: 'Violin',
    tunings: [{ id: 'violin', label: 'Standard — G D A E', notes: [55, 62, 69, 76] }],
  },
  {
    id: 'cello', label: 'Cello / Viola',
    tunings: [
      { id: 'cello', label: 'Cello — C G D A', notes: [36, 43, 50, 57] },
      { id: 'viola', label: 'Viola — C G D A', notes: [48, 55, 62, 69] },
    ],
  },
  {
    id: 'chromatic', label: 'Chromatic',
    tunings: [{
      id: 'chromatic',
      label: 'Any note — C1 to B6',
      notes: Array.from({ length: 61 }, (_, i) => 24 + i),
    }],
  },
];

export const INSTRUMENT_BY_ID = Object.fromEntries(INSTRUMENTS.map((i) => [i.id, i]));

export function findTuning(instrumentId, tuningId) {
  const inst = INSTRUMENT_BY_ID[instrumentId] || INSTRUMENTS[0];
  return inst.tunings.find((t) => t.id === tuningId) || inst.tunings[0];
}

/**
 * YIN pitch detection.
 *
 * `maxLag` bounds the lowest detectable frequency and dominates the cost — the
 * difference function is O(maxLag²) — so the caller sizes it from the lowest
 * note actually being tuned rather than paying for a range nothing will use.
 *
 * @returns {{freq:number, clarity:number}} freq is -1 when nothing was found
 */
export function detectPitch(buf, sampleRate, minLag, maxLag) {
  const limit = Math.min(maxLag, Math.floor(buf.length / 2) - 1);
  if (limit <= minLag) return { freq: -1, clarity: 0 };

  const yin = new Float32Array(limit + 1);

  // Difference function.
  for (let tau = 1; tau <= limit; tau++) {
    let sum = 0;
    for (let i = 0; i < limit; i++) {
      const d = buf[i] - buf[i + tau];
      sum += d * d;
    }
    yin[tau] = sum;
  }

  // Cumulative mean normalised difference.
  yin[0] = 1;
  let running = 0;
  for (let tau = 1; tau <= limit; tau++) {
    running += yin[tau];
    yin[tau] = running === 0 ? 1 : (yin[tau] * tau) / running;
  }

  // Absolute threshold, then walk down to the local minimum.
  const THRESHOLD = 0.15;
  let tauFound = -1;
  for (let tau = minLag; tau <= limit; tau++) {
    if (yin[tau] < THRESHOLD) {
      while (tau + 1 <= limit && yin[tau + 1] < yin[tau]) tau++;
      tauFound = tau;
      break;
    }
  }
  // Nothing crossed the threshold: fall back to the best dip available, which
  // keeps a quiet or breathy note readable instead of dropping it entirely.
  if (tauFound === -1) {
    let best = minLag;
    for (let tau = minLag; tau <= limit; tau++) if (yin[tau] < yin[best]) best = tau;
    if (yin[best] > 0.5) return { freq: -1, clarity: 0 };
    tauFound = best;
  }

  // Parabolic interpolation for sub-hertz precision — without this the readout
  // quantises to whole samples of lag, which is several cents at pitch.
  let better = tauFound;
  if (tauFound > 0 && tauFound < limit) {
    const s0 = yin[tauFound - 1];
    const s1 = yin[tauFound];
    const s2 = yin[tauFound + 1];
    const denom = 2 * (2 * s1 - s2 - s0);
    if (denom !== 0) better = tauFound + (s2 - s0) / denom;
  }

  return { freq: sampleRate / better, clarity: 1 - Math.min(1, yin[tauFound]) };
}

/** Root-mean-square level of a buffer. */
export function rmsOf(buf) {
  let sum = 0;
  for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
  return Math.sqrt(sum / buf.length);
}

/**
 * A-weighting, in dB, at a frequency.
 *
 * The standard curve for how loud the ear finds a given frequency. Used here
 * for the only thing it is really good at: telling you that two tones of equal
 * amplitude are not equally loud.
 */
export function aWeightingDb(f) {
  const f2 = f * f;
  const num = 12194 * 12194 * f2 * f2;
  const den =
    (f2 + 20.6 * 20.6) *
    Math.sqrt((f2 + 107.7 * 107.7) * (f2 + 737.9 * 737.9)) *
    (f2 + 12194 * 12194);
  return 20 * Math.log10(num / den) + 2.0;
}

/** Where the compensation is anchored — roughly the middle of a guitar's range. */
const LOUDNESS_ANCHOR = 165;

/**
 * How much of the A-weighted difference the gain has to make up.
 *
 * Not all of it: the low notes are built from more partials (see `partialsFor`),
 * and those partials sit where the ear is more sensitive, so they already carry
 * part of the correction. Applying the full curve on top over-shot by 3.7 dB at
 * the low E and left the top E 3.8 dB short — measured, then fitted.
 */
const LOUDNESS_SHARE = 0.62;

/**
 * Gain that makes a tone at `freq` as loud as one at the anchor.
 *
 * A sine at 82 Hz and a sine at 330 Hz of identical amplitude are about 15 dB
 * apart in perceived loudness, which is why the low E used to be inaudible while
 * the top E was fine: the amplitude was the same for every string, so the
 * loudness could not be. This spends that difference in both directions from
 * the middle of the range rather than boosting the bottom alone, which keeps
 * the peak level sane.
 *
 * Clamped because the correction runs away below the range of anything this is
 * used for, and a tuner should not be able to ask for 20 dB of bass boost.
 */
export function loudnessGain(freq) {
  const delta = aWeightingDb(LOUDNESS_ANCHOR) - aWeightingDb(Math.max(20, freq));
  return Math.min(3.2, Math.max(0.3, Math.pow(10, (delta * LOUDNESS_SHARE) / 20)));
}

/**
 * How many partials a reference note is built from.
 *
 * Low notes get more. Partly because it is what makes a pitch legible — the ear
 * finds a fundamental from its harmonics even when the fundamental itself is
 * weak — and partly because most devices this runs on cannot reproduce an 82 Hz
 * sine at all. A phone speaker rolls off long before the low E, so a pure tone
 * there is not quiet, it is absent.
 */
function partialsFor(freq) {
  // Below a bass low E almost nothing can reproduce the fundamental at all, so
  // it stops being the point: the harmonics carry the pitch, the ear supplies
  // the missing root, and weakening the fundamental buys the headroom the
  // harmonics need.
  if (freq < 48) return [[1, 0.7], [2, 0.75], [3, 0.45], [4, 0.25], [5, 0.14]];
  if (freq < 150) return [[1, 1], [2, 0.55], [3, 0.3], [4, 0.16]];
  if (freq < 260) return [[1, 1], [2, 0.36], [3, 0.16]];
  return [[1, 1], [2, 0.2]];
}

/**
 * A reference pitch, sounded once.
 *
 * It has two jobs and they want the same thing: a note to tune by ear against,
 * and the sound of whichever string you just picked in manual mode. Both are
 * questions with an answer, so the note plays and ends — it used to hold until
 * you tapped it again, which meant the app was droning at you while you worked.
 * Tapping again simply asks again.
 */
export class ReferenceTone {
  constructor(ctx, destination) {
    this.ctx = ctx;
    this.destination = destination || ctx.destination;
    this.nodes = null;
    this._timer = null;
    /** Called when a bounded tone ends by itself, so the UI can catch up. */
    this.onStop = null;
  }

  get playing() {
    return !!this.nodes;
  }

  /**
   * Sound a pitch once.
   *
   * `duration` is the whole note including its fade. Level is compensated for
   * frequency so every string is as loud as every other one, which is the
   * difference between a reference you can hear and one you have to imagine.
   */
  play(freq, { wave = 'sine', level = 0.15, duration = 1.8 } = {}) {
    this.stop();
    const t = this.ctx.currentTime;
    const peak = level * loudnessGain(freq);
    const fade = Math.min(0.7, duration * 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(peak, t + 0.03);
    // Hold, then fade out. Exponential, because a linear fade audibly stalls at
    // the end and then stops rather than disappearing.
    gain.gain.setValueAtTime(peak, t + duration - fade);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    gain.connect(this.destination);

    const oscs = [];
    for (const [mult, mix] of partialsFor(freq)) {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = wave;
      o.frequency.setValueAtTime(freq * mult, t);
      g.gain.value = mix;
      o.connect(g);
      g.connect(gain);
      o.start(t);
      o.stop(t + duration + 0.05);
      oscs.push(o);
    }
    this.nodes = { gain, oscs };

    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.nodes = null;
      gain.disconnect();
      this._timer = null;
      if (this.onStop) this.onStop();
    }, (duration + 0.06) * 1000);
  }

  stop() {
    clearTimeout(this._timer);
    this._timer = null;
    if (!this.nodes) return;
    const { gain, oscs } = this.nodes;
    this.nodes = null;
    const t = this.ctx.currentTime;
    // Fade rather than cut: stopping an oscillator at full amplitude clicks.
    gain.gain.cancelScheduledValues(t);
    gain.gain.setValueAtTime(gain.gain.value, t);
    gain.gain.linearRampToValueAtTime(0.0001, t + 0.06);
    for (const o of oscs) o.stop(t + 0.08);
    setTimeout(() => gain.disconnect(), 200);
  }
}

/**
 * The short confirmation the source sounded when a string settled.
 *
 * Deliberately high and brief so it cannot be mistaken for the string itself,
 * and so it does not colour the note you are still holding.
 */
export function playChime(ctx, destination, { level = 0.09 } = {}) {
  const t = ctx.currentTime;
  const out = destination || ctx.destination;
  [1568, 2093].forEach((freq, i) => {
    const at = t + i * 0.085;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, at);
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(level, at + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
    o.connect(g);
    g.connect(out);
    o.start(at);
    o.stop(at + 0.2);
    setTimeout(() => g.disconnect(), 500);
  });
}

/**
 * The tuner: microphone in, a settled reading out.
 *
 * Reports through `onUpdate` at roughly 30 Hz. Slower than a render loop on
 * purpose — YIN is quadratic in the lag range, and the eye cannot use 60
 * updates a second on a needle anyway.
 */
export class Tuner {
  /** @param {AudioContext} ctx  the app's context; the tuner never makes its own */
  constructor(ctx) {
    this.ctx = ctx;
    this.stream = null;
    this.analyser = null;
    this.source = null;
    this.buffer = null;
    this.running = false;
    this.timer = null;

    this.a4 = 440;
    this.noiseGate = 0.008;
    this.emaAlpha = 0.25;
    this.lockDelayMs = 150;
    this.snapCents = 4;

    this.notes = [40, 45, 50, 55, 59, 64];
    this.targetMidi = null;   // null = follow whichever string is nearest
    this.onUpdate = null;
    /** Sound a short chime the moment a string settles, as the source did. */
    this.chimeOnLock = true;
    this.onLock = null;
    this._chimed = false;

    this._smoothCents = 0;
    this._lockStart = null;
    this._locked = false;
  }

  /** Set the notes being tuned to; resizes the analysis window to suit. */
  setNotes(notes, targetMidi = null) {
    this.notes = notes.slice().sort((a, b) => a - b);
    this.targetMidi = targetMidi;
    this._reset();
    if (this.running) this._configure();
  }

  setTarget(midi) {
    this.targetMidi = midi;
    this._reset();
  }

  _reset() {
    this._smoothCents = 0;
    this._lockStart = null;
    this._locked = false;
    this._chimed = false;
  }

  /**
   * Size the analysis window from the lowest note in play.
   *
   * A fixed 2048-sample buffer resolves nothing below ~47 Hz at 48 kHz, so a
   * 5-string bass low B (30.9 Hz) is simply undetectable with one — the bug
   * this replaces. The window grows only as far as the instrument needs.
   */
  _configure() {
    const lowest = midiToFreq(this.notes[0], this.a4);
    const highest = midiToFreq(this.notes[this.notes.length - 1], this.a4);
    // A fourth of headroom below the lowest string, so a badly flat string is
    // still found rather than reading as silence.
    const minFreq = Math.max(24, lowest * 0.75);
    const maxFreq = Math.min(this.ctx.sampleRate / 4, highest * 2.5);

    this._maxLag = Math.ceil(this.ctx.sampleRate / minFreq);
    this._minLag = Math.max(2, Math.floor(this.ctx.sampleRate / maxFreq));

    // The buffer must hold two full lags for the difference function.
    let fftSize = 2048;
    while (fftSize / 2 <= this._maxLag && fftSize < 32768) fftSize *= 2;
    if (this.analyser) {
      this.analyser.fftSize = fftSize;
      this.buffer = new Float32Array(this.analyser.fftSize);
    }
    this._fftSize = fftSize;
  }

  async start() {
    if (this.running) return;
    // Constraints off: the browser's voice processing is tuned for speech and
    // will happily gate, duck and pitch-shift a held instrument note.
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
    });

    this.analyser = this.ctx.createAnalyser();
    this.analyser.smoothingTimeConstant = 0;
    this.source = this.ctx.createMediaStreamSource(this.stream);
    // Deliberately terminal: the analyser goes nowhere. Connecting this to the
    // destination puts the microphone into the speakers.
    this.source.connect(this.analyser);

    this._configure();
    this.buffer = new Float32Array(this.analyser.fftSize);
    this.running = true;
    this._reset();
    this.timer = setInterval(() => this._tick(), 33);
  }

  stop() {
    this.running = false;
    clearInterval(this.timer);
    this.timer = null;
    if (this.stream) {
      for (const track of this.stream.getTracks()) track.stop();
      this.stream = null;
    }
    if (this.source) { this.source.disconnect(); this.source = null; }
    this.analyser = null;
    this.buffer = null;
    this._reset();
    if (this.onUpdate) {
      this.onUpdate({ state: 'off', freq: null, cents: 0, midi: null, level: 0, clarity: 0 });
    }
  }

  /** Nearest note in the current tuning to a detected frequency. */
  _nearest(freq) {
    let best = this.notes[0];
    let bestDist = Infinity;
    for (const midi of this.notes) {
      const d = Math.abs(centsBetween(freq, midiToFreq(midi, this.a4)));
      if (d < bestDist) { bestDist = d; best = midi; }
    }
    return best;
  }

  _tick() {
    if (!this.running || !this.analyser) return;
    this.analyser.getFloatTimeDomainData(this.buffer);

    const level = rmsOf(this.buffer);
    if (level < this.noiseGate) {
      this._lockStart = null;
      this._locked = false;
      this._smoothCents += (0 - this._smoothCents) * 0.15;
      this._emit({ state: 'off', freq: null, cents: this._smoothCents, midi: this.targetMidi, level, clarity: 0 });
      return;
    }

    const { freq, clarity } = detectPitch(this.buffer, this.ctx.sampleRate, this._minLag, this._maxLag);
    if (freq <= 0) {
      this._emit({ state: 'off', freq: null, cents: this._smoothCents, midi: this.targetMidi, level, clarity: 0 });
      return;
    }

    const midi = this.targetMidi ?? this._nearest(freq);
    const raw = centsBetween(freq, midiToFreq(midi, this.a4));
    this._smoothCents += (raw - this._smoothCents) * this.emaAlpha;

    // Hysteresis: hold inside the snap zone before calling it in tune, so a
    // needle passing through does not flash green.
    let state;
    const now = performance.now();
    if (Math.abs(this._smoothCents) <= this.snapCents) {
      if (this._lockStart === null) this._lockStart = now;
      if (now - this._lockStart >= this.lockDelayMs) {
        this._locked = true;
        state = 'locked';
        // Once per lock, not once per frame.
        if (this.chimeOnLock && !this._chimed) {
          this._chimed = true;
          if (this.onLock) this.onLock();
        }
      } else state = this._smoothCents < 0 ? 'flat' : 'sharp';
    } else {
      this._lockStart = null;
      this._locked = false;
      this._chimed = false;
      state = this._smoothCents < 0 ? 'flat' : 'sharp';
    }

    this._emit({
      state,
      freq,
      cents: this._locked ? 0 : this._smoothCents,
      midi,
      level,
      clarity,
    });
  }

  _emit(update) {
    if (this.onUpdate) this.onUpdate(update);
  }
}
