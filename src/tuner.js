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
      if (now - this._lockStart >= this.lockDelayMs) { this._locked = true; state = 'locked'; }
      else state = this._smoothCents < 0 ? 'flat' : 'sharp';
    } else {
      this._lockStart = null;
      this._locked = false;
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
