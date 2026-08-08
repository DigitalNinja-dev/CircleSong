// Fretboard model + voicing search.
//
// Strings are indexed 0 = lowest (6th string / low E) .. 5 = highest (1st string).
// A voicing is an array of 6 entries: an integer fret, or null for a muted string.

import { bassPitchClass } from './theory.js';

export const TUNINGS = {
  standard: { label: 'Standard (EADGBE)', midi: [40, 45, 50, 55, 59, 64] },
  dropD: { label: 'Drop D (DADGBE)', midi: [38, 45, 50, 55, 59, 64] },
  dadgad: { label: 'DADGAD', midi: [38, 45, 50, 55, 57, 62] },
  openG: { label: 'Open G (DGDGBD)', midi: [38, 43, 50, 55, 59, 62] },
  halfDown: { label: 'E♭ Standard', midi: [39, 44, 49, 54, 58, 63] },
};

export const STRING_SETS = {
  // Triads on adjacent 3-string groups.
  triad: [
    [3, 4, 5],
    [2, 3, 4],
    [1, 2, 3],
    [0, 1, 2],
  ],
  // Drop-2: four adjacent strings.
  drop2: [
    [2, 3, 4, 5],
    [1, 2, 3, 4],
    [0, 1, 2, 3],
  ],
  // Drop-3: bass note, one skipped string, then three adjacent.
  drop3: [
    [1, 3, 4, 5],
    [0, 2, 3, 4],
  ],
};

const MAX_FRET = 15;

/**
 * Search for playable voicings of a chord.
 *
 * @param {object} chord      chord descriptor from theory.makeChord
 * @param {object} opts
 * @param {number[]} opts.tuning        open-string MIDI notes
 * @param {number} opts.inversion       0 = root position
 * @param {string} opts.style           'auto' | 'triad' | 'drop2' | 'drop3'
 * @param {number} opts.maxSpan         max fret span for fretted notes
 * @param {number} opts.preferredFret   bias results toward this position
 * @returns {Array<{frets:(number|null)[], midi:(number|null)[], span:number, score:number, lowestFret:number}>}
 */
export function findVoicings(chord, opts = {}) {
  const tuning = opts.tuning || TUNINGS.standard.midi;
  const inversion = opts.inversion || 0;
  const style = opts.style || 'auto';
  const maxSpan = opts.maxSpan ?? 4;
  const preferredFret = opts.preferredFret ?? 0;
  const wantBass = bassPitchClass(chord, inversion);
  const chordPcs = chord.pitchClasses;

  const sets =
    style === 'auto'
      ? [...allContiguousSets(chordPcs.length), ...STRING_SETS.drop3]
      : STRING_SETS[style] || STRING_SETS.drop2;

  const results = [];
  for (const set of sets) {
    collectForSet(set, chordPcs, wantBass, tuning, maxSpan, results, style);
  }

  // Score, sort, and de-duplicate identical fret patterns.
  const seen = new Set();
  const scored = results
    .map((v) => ({ ...v, score: scoreVoicing(v, preferredFret, chordPcs.length) }))
    .sort((a, b) => b.score - a.score)
    .filter((v) => {
      const key = v.frets.join('.');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return scored.slice(0, 12);
}

function allContiguousSets(chordSize) {
  // Every run of strings that can host the chord, from 3 up to all 6.
  const out = [];
  for (let len = Math.max(3, chordSize); len <= 6; len++) {
    for (let start = 0; start + len <= 6; start++) {
      out.push(Array.from({ length: len }, (_, i) => start + i));
    }
  }
  return out;
}

function collectForSet(set, chordPcs, wantBass, tuning, maxSpan, results, style) {
  const exact = style === 'drop2' || style === 'drop3' || style === 'triad';
  const candidates = set.map((s) => {
    const list = [];
    for (let f = 0; f <= MAX_FRET; f++) {
      const pc = (tuning[s] + f) % 12;
      if (chordPcs.includes(pc)) list.push(f);
    }
    return list;
  });

  const frets = new Array(set.length).fill(null);

  const walk = (i, minFretted, maxFretted, used) => {
    if (results.length > 400) return;
    if (i === set.length) {
      // Every chord tone must be present.
      if (used.size !== chordPcs.length) return;
      const full = new Array(6).fill(null);
      const midi = new Array(6).fill(null);
      set.forEach((s, k) => {
        full[s] = frets[k];
        midi[s] = tuning[s] + frets[k];
      });
      const span = maxFretted === -1 ? 0 : maxFretted - minFretted;
      results.push({
        frets: full,
        midi,
        span,
        lowestFret: minFretted === Infinity ? 0 : minFretted,
        strings: set.length,
      });
      return;
    }

    for (const f of candidates[i]) {
      const nMin = f > 0 ? Math.min(minFretted, f) : minFretted;
      const nMax = f > 0 ? Math.max(maxFretted, f) : maxFretted;
      if (nMax !== -1 && nMin !== Infinity && nMax - nMin > maxSpan) continue;

      const pc = (tuning[set[i]] + f) % 12;
      // Lowest string in the set defines the bass note.
      if (i === 0 && pc !== wantBass) continue;
      // Drop voicings use each chord tone exactly once.
      if (exact && used.has(pc)) continue;

      frets[i] = f;
      const hadPc = used.has(pc);
      used.add(pc);
      walk(i + 1, nMin, nMax, used);
      if (!hadPc) used.delete(pc);
      frets[i] = null;
    }
  };

  walk(0, Infinity, -1, new Set());
}

function scoreVoicing(v, preferredFret, chordSize) {
  let score = 0;
  score += v.strings * 6; // fuller chords ring better
  score -= v.span * 5; // tight shapes are easier
  const openCount = v.frets.filter((f) => f === 0).length;
  score += openCount * 3;
  score -= Math.abs(v.lowestFret - preferredFret) * 1.2;
  if (v.lowestFret > 12) score -= 8;

  // Penalise muddy low-register clusters (intervals < 4 semitones below G3).
  const sounding = v.midi.filter((m) => m !== null);
  for (let i = 1; i < sounding.length; i++) {
    const gap = sounding[i] - sounding[i - 1];
    if (sounding[i - 1] < 55 && gap > 0 && gap < 4) score -= 6;
  }
  if (sounding.length > chordSize) score += 2; // doublings are fine
  return score;
}

/** Best single voicing, or null when the chord is unplayable in the window. */
export function bestVoicing(chord, opts = {}) {
  const list = findVoicings(chord, opts);
  return list.length ? list[0] : null;
}

/** Human-readable shape, e.g. "x32010". */
export function voicingToString(v) {
  return v.frets.map((f) => (f === null ? 'x' : f > 9 ? `(${f})` : String(f))).join('');
}

// Semitone above the root -> chord-tone label used on the diagram.
const DEGREE_LABEL = {
  0: 'R', 1: '♭9', 2: '9', 3: '3', 4: '3', 5: '4',
  6: '5', 7: '5', 8: '5', 9: '6', 10: '7', 11: '7',
};

/** Per-note chord-tone roles for the fretboard diagram. */
export function voicingRoles(voicing, chord) {
  return voicing.midi.map((m) => {
    if (m === null) return null;
    return DEGREE_LABEL[((m - chord.root) % 12 + 12) % 12] || '';
  });
}

/** Lowest fretted fret; 0 means the shape sits in open position. */
export function voicingPosition(voicing) {
  const fretted = voicing.frets.filter((f) => f !== null && f > 0);
  return fretted.length ? Math.min(...fretted) : 0;
}

/** MIDI notes actually sounding, low to high. */
export function voicingNotes(voicing) {
  return voicing.midi.filter((m) => m !== null);
}

/**
 * The inversion selector in the UI mixes true inversions with a voicing style,
 * so translate a single UI id into search options.
 */
export const VOICING_MODES = {
  root: { label: 'Root', inversion: 0, style: 'auto' },
  '1st': { label: '1st Inv', inversion: 1, style: 'auto' },
  '2nd': { label: '2nd Inv', inversion: 2, style: 'auto' },
  drop2: { label: 'Drop-2', inversion: 0, style: 'drop2' },
  drop3: { label: 'Drop-3', inversion: 0, style: 'drop3' },
};

/**
 * Resolve a chord + UI voicing mode into a concrete shape, degrading
 * gracefully when the requested inversion has no playable shape (a 3rd
 * inversion of a triad, for instance, does not exist).
 */
export function resolveVoicing(chord, modeId, opts = {}) {
  const mode = VOICING_MODES[modeId] || VOICING_MODES.root;
  const inversion =
    mode.inversion < chord.intervals.length ? mode.inversion : 0;

  let v = bestVoicing(chord, { ...opts, inversion, style: mode.style });
  if (!v && mode.style !== 'auto') v = bestVoicing(chord, { ...opts, inversion, style: 'auto' });
  if (!v && inversion !== 0) v = bestVoicing(chord, { ...opts, inversion: 0, style: 'auto' });
  if (!v) v = bestVoicing(chord, { ...opts, inversion: 0, style: 'auto', maxSpan: 5 });
  return v;
}
