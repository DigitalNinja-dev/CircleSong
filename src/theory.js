// Music-theory core for CircleSong: pitch classes, modes, diatonic harmony,
// and the Circle of Fifths layout that drives the main wheel.

export const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Keys that are conventionally spelled with flats.
const FLAT_KEYS = new Set([5, 10, 3, 8, 1, 6]); // F, Bb, Eb, Ab, Db, Gb

export function noteName(pc, preferFlats = false) {
  const i = ((pc % 12) + 12) % 12;
  return (preferFlats ? FLAT_NAMES : SHARP_NAMES)[i];
}

export function keyPrefersFlats(tonicPc) {
  return FLAT_KEYS.has(((tonicPc % 12) + 12) % 12);
}

const MAJOR_STEPS = [0, 2, 4, 5, 7, 9, 11];

/**
 * Accidental spelling for a tonic *in a given mode*.
 *
 * Spelling follows the key signature, and a mode's signature is its relative
 * major's — C Aeolian carries three flats, so its scale is C D E♭ F G A♭ B♭,
 * not C D D♯ F G G♯ A♯. Deciding from the tonic alone gets every non-Ionian
 * key wrong.
 */
export function keySignaturePrefersFlats(tonicPc, modeId) {
  const i = Math.max(0, MODE_IDS.indexOf(modeId));
  const relativeMajor = (((tonicPc - MAJOR_STEPS[i]) % 12) + 12) % 12;
  return FLAT_KEYS.has(relativeMajor);
}

export function midiToName(midi, preferFlats = false) {
  return noteName(midi % 12, preferFlats) + (Math.floor(midi / 12) - 1);
}

export function midiToFreq(midi, a4 = 440) {
  return a4 * Math.pow(2, (midi - 69) / 12);
}

// Circle of Fifths, clockwise from 12 o'clock.
export const CIRCLE = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5]; // C G D A E B F# Db Ab Eb Bb F

export const MODES = {
  ionian: { label: 'Ionian (Major)', steps: [0, 2, 4, 5, 7, 9, 11], brightness: 5 },
  dorian: { label: 'Dorian', steps: [0, 2, 3, 5, 7, 9, 10], brightness: 2 },
  phrygian: { label: 'Phrygian', steps: [0, 1, 3, 5, 7, 8, 10], brightness: 0 },
  lydian: { label: 'Lydian', steps: [0, 2, 4, 6, 7, 9, 11], brightness: 6 },
  mixolydian: { label: 'Mixolydian', steps: [0, 2, 4, 5, 7, 9, 10], brightness: 4 },
  aeolian: { label: 'Aeolian (Minor)', steps: [0, 2, 3, 5, 7, 8, 10], brightness: 1 },
  locrian: { label: 'Locrian', steps: [0, 1, 3, 5, 6, 8, 10], brightness: -1 },
};

// Chord quality lookup, keyed by the sorted interval signature from the root.
const QUALITIES = [
  { id: 'maj', symbol: '', intervals: [0, 4, 7], name: 'major' },
  { id: 'min', symbol: 'm', intervals: [0, 3, 7], name: 'minor' },
  { id: 'dim', symbol: '°', intervals: [0, 3, 6], name: 'diminished' },
  { id: 'aug', symbol: '+', intervals: [0, 4, 8], name: 'augmented' },
  { id: 'sus2', symbol: 'sus2', intervals: [0, 2, 7], name: 'suspended 2nd' },
  { id: 'sus4', symbol: 'sus4', intervals: [0, 5, 7], name: 'suspended 4th' },
  { id: 'maj7', symbol: 'maj7', intervals: [0, 4, 7, 11], name: 'major 7th' },
  { id: 'dom7', symbol: '7', intervals: [0, 4, 7, 10], name: 'dominant 7th' },
  { id: 'min7', symbol: 'm7', intervals: [0, 3, 7, 10], name: 'minor 7th' },
  { id: 'm7b5', symbol: 'm7♭5', intervals: [0, 3, 6, 10], name: 'half-diminished' },
  { id: 'dim7', symbol: '°7', intervals: [0, 3, 6, 9], name: 'diminished 7th' },
  { id: 'minMaj7', symbol: 'mMaj7', intervals: [0, 3, 7, 11], name: 'minor-major 7th' },
  { id: 'add9', symbol: 'add9', intervals: [0, 2, 4, 7], name: 'added 9th' },
  { id: 'maj6', symbol: '6', intervals: [0, 4, 7, 9], name: 'major 6th' },
  { id: 'min6', symbol: 'm6', intervals: [0, 3, 7, 9], name: 'minor 6th' },
];

export const QUALITY_BY_ID = Object.fromEntries(QUALITIES.map((q) => [q.id, q]));
export const ALL_QUALITIES = QUALITIES;

function qualityFromIntervals(intervals) {
  const key = intervals.join(',');
  return QUALITIES.find((q) => q.intervals.join(',') === key) || null;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

/** Scale pitch classes for a tonic + mode. */
export function scalePitchClasses(tonicPc, modeId) {
  const mode = MODES[modeId] || MODES.ionian;
  return mode.steps.map((s) => (tonicPc + s) % 12);
}

/**
 * Diatonic chords for a key/mode.
 * @param {number} tonicPc
 * @param {string} modeId
 * @param {boolean} sevenths stack 7ths instead of triads
 */
export function diatonicChords(tonicPc, modeId, sevenths = false) {
  const mode = MODES[modeId] || MODES.ionian;
  const steps = mode.steps;
  const flats = keySignaturePrefersFlats(tonicPc, modeId);
  const out = [];

  for (let d = 0; d < 7; d++) {
    const degreeOffsets = sevenths ? [0, 2, 4, 6] : [0, 2, 4];
    const rootAbs = steps[d];
    const intervals = degreeOffsets.map((o) => {
      const idx = (d + o) % 7;
      const octaves = Math.floor((d + o) / 7);
      return steps[idx] + 12 * octaves - rootAbs;
    });
    const quality = qualityFromIntervals(intervals) || {
      id: 'maj',
      symbol: '',
      intervals,
      name: 'chord',
    };
    const rootPc = (tonicPc + rootAbs) % 12;
    const isMinorish = ['min', 'min7', 'dim', 'dim7', 'm7b5', 'min6', 'minMaj7'].includes(quality.id);

    // Modal degrees are numbered against the major scale, so a degree the mode
    // lowers or raises carries the accidental: Mixolydian's seventh is ♭VII,
    // not VII, and Lydian's fourth is ♯IV. Without this the numeral names a
    // chord from a different scale than the one being played.
    const alteration = steps[d] - MAJOR_STEPS[d];
    const accidental = alteration < 0 ? '♭' : alteration > 0 ? '♯' : '';

    let numeral = accidental + (isMinorish ? ROMAN[d].toLowerCase() : ROMAN[d]);
    if (quality.id === 'dim' || quality.id === 'dim7') numeral += '°';
    if (quality.id === 'm7b5') numeral += 'ø';
    if (quality.id === 'aug') numeral += '+';
    if (sevenths && ['maj7'].includes(quality.id)) numeral += 'maj7';
    else if (sevenths && quality.id === 'dom7') numeral += '7';
    else if (sevenths && ['min7', 'minMaj7'].includes(quality.id)) numeral += '7';

    out.push(makeChord(rootPc, quality.id, { degree: d, numeral, preferFlats: flats }));
  }
  return out;
}

/** Build a chord descriptor. */
export function makeChord(rootPc, qualityId, extra = {}) {
  const quality = QUALITY_BY_ID[qualityId] || QUALITY_BY_ID.maj;
  const preferFlats = extra.preferFlats ?? keyPrefersFlats(rootPc);
  const root = ((rootPc % 12) + 12) % 12;
  return {
    root,
    qualityId: quality.id,
    intervals: quality.intervals.slice(),
    pitchClasses: quality.intervals.map((i) => (root + i) % 12),
    symbol: noteName(root, preferFlats) + quality.symbol,
    rootName: noteName(root, preferFlats),
    qualityName: quality.name,
    degree: extra.degree ?? null,
    numeral: extra.numeral ?? null,
    /** 0 = root position, 1 = first inversion, ... */
    inversion: extra.inversion ?? 0,
  };
}

/** Pitch class that should sound in the bass for a given inversion. */
export function bassPitchClass(chord, inversion) {
  const n = chord.intervals.length;
  const inv = ((inversion % n) + n) % n;
  return (chord.root + chord.intervals[inv]) % 12;
}

export function chordLabel(chord, inversion = 0, preferFlats = undefined) {
  const flats = preferFlats ?? keyPrefersFlats(chord.root);
  if (!inversion) return chord.symbol;
  const bass = bassPitchClass(chord, inversion);
  return `${chord.symbol}/${noteName(bass, flats)}`;
}

/** Relative minor / major partner of a key. */
export function relativeKey(tonicPc, modeId) {
  if (modeId === 'ionian') return { tonicPc: (tonicPc + 9) % 12, modeId: 'aeolian' };
  if (modeId === 'aeolian') return { tonicPc: (tonicPc + 3) % 12, modeId: 'ionian' };
  return null;
}

/** Mode ids in the order the UI lists them. */
export const MODE_IDS = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'];

/** Absolute scale-degree offsets for a mode, used by the scale player. */
export function modeStepsAbsolute(modeId) {
  return (MODES[modeId] || MODES.ionian).steps.slice();
}
