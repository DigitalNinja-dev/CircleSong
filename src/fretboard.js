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
  // Extended chords carry more tones than a guitar has strings, so the search
  // requires only the ones that define the chord and treats the rest as bonus.
  const requiredPcs = chord.essentialPitchClasses || chordPcs;

  const sets =
    style === 'auto'
      ? [...allContiguousSets(requiredPcs.length), ...STRING_SETS.drop3]
      : STRING_SETS[style] || STRING_SETS.drop2;

  const results = [];
  for (const set of sets) {
    collectForSet(set, chordPcs, requiredPcs, wantBass, tuning, maxSpan, results, style);
  }

  // Score, sort, and de-duplicate identical fret patterns.
  const seen = new Set();
  const scored = results
    .map((v) => ({ ...v, score: scoreVoicing(v, preferredFret, requiredPcs.length, chordPcs) }))
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

function collectForSet(set, chordPcs, requiredPcs, wantBass, tuning, maxSpan, results, style) {
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
  // Cap per string set, not across the whole search. A global cap is spent by
  // the first few sets, so the fuller shapes later in the list are never
  // generated and the best answer is simply never considered.
  let found = 0;

  const walk = (i, minFretted, maxFretted, used) => {
    if (found > 150) return;
    if (i === set.length) {
      // Every tone the chord is named for must be present; droppable ones need
      // not be, which is what makes a 9th or 13th playable on six strings.
      for (const pc of requiredPcs) if (!used.has(pc)) return;
      const full = new Array(6).fill(null);
      const midi = new Array(6).fill(null);
      set.forEach((s, k) => {
        full[s] = frets[k];
        midi[s] = tuning[s] + frets[k];
      });
      const span = maxFretted === -1 ? 0 : maxFretted - minFretted;
      found++;
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

/**
 * Rank a shape by how a guitarist would judge it.
 *
 * The weights matter as much as the terms. Rewarding string count too heavily
 * makes the search prefer a six-string barre high up the neck over the open
 * chord everyone actually plays — it once answered "C major" with x35050. So
 * position and playability outrank fullness, and the one genuinely unplayable
 * combination, an open string ringing under a shape held high on the neck, is
 * penalised rather than rewarded for its zero fret span.
 */
function scoreVoicing(v, preferredFret, chordSize, allPcs = null) {
  let score = 0;
  score += v.strings * 3.5;

  // Prefer shapes that also cover the droppable tones — a 9th chord that keeps
  // its fifth is a better answer than one that does not, all else equal.
  if (allPcs && allPcs.length > chordSize) {
    const present = new Set(v.midi.filter((m) => m !== null).map((m) => m % 12));
    let covered = 0;
    for (const pc of allPcs) if (present.has(pc)) covered++;
    score += covered * 3;
  }

  score -= v.span * 5; // tight shapes are easier

  const openCount = v.frets.filter((f) => f === 0).length;
  const fretted = v.frets.filter((f) => f !== null && f > 0);
  const lowestFretted = fretted.length ? Math.min(...fretted) : 0;

  if (openCount) {
    // Open strings are free in first position and a stretch anywhere else.
    if (lowestFretted <= 4) score += openCount * 4;
    else score -= openCount * 7;
  }

  // Low positions first, unless the caller asked to sit somewhere else.
  score -= Math.abs(v.lowestFret - preferredFret) * 2.4;
  if (v.lowestFret > 12) score -= 8;

  // Penalise genuinely muddy low intervals — seconds down in the bass register.
  // The earlier threshold caught minor thirds up to G3, which condemned the
  // open C chord (E3 to G3) as mud and pushed the search off first position.
  const sounding = v.midi.filter((m) => m !== null);
  for (let i = 1; i < sounding.length; i++) {
    const gap = sounding[i] - sounding[i - 1];
    if (sounding[i - 1] < 52 && gap > 0 && gap < 3) score -= 6;
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
 * What it costs the hand to move from one shape to the next.
 *
 * Voice leading is the difference between a progression that is correct and one
 * that sounds like music. Two shapes that share frets share notes, and shared
 * notes are what make chords connect rather than merely follow each other. The
 * terms are what a player actually feels: how far the fingers travel, how much
 * the hand shifts up the neck, and how many strings switch between ringing and
 * muted, which is the part that makes a change sound clumsy even when the frets
 * are close.
 */
export function voiceLeadCost(a, b) {
  if (!a || !b) return 0;
  let cost = 0;
  let shared = 0;
  for (let s = 0; s < 6; s++) {
    const fa = a.frets[s];
    const fb = b.frets[s];
    if (fa === null && fb === null) continue;
    if (fa === null || fb === null) { cost += 2.5; continue; } // a string starts or stops
    cost += Math.abs(fa - fb);
    if (fa === fb) shared++;
  }
  // Moving the whole hand is more work than moving one finger.
  cost += Math.abs(voicingPosition(a) - voicingPosition(b)) * 1.5;
  // Fingers that stay put are the point, so reward them directly.
  cost -= shared * 1.2;
  return cost;
}

/** Total movement across a whole progression — the number "Smooth" reduces. */
export function progressionCost(voicings) {
  let total = 0;
  for (let i = 1; i < voicings.length; i++) total += Math.max(0, voiceLeadCost(voicings[i - 1], voicings[i]));
  return Math.round(total * 10) / 10;
}

/**
 * Choose one shape per chord so the whole progression connects.
 *
 * Picking each chord's best shape independently is what produces the jumping
 * around that makes an app-written progression sound like an exercise: every
 * chord is individually fine and no two of them fit together. Choosing the whole
 * sequence at once is a shortest-path problem, so it is solved exactly rather
 * than greedily — a greedy pass commits to an early shape that strands the
 * chord after it, which is precisely the failure worth avoiding.
 *
 * @param {Array<object>} chords
 * @param {object} opts
 * @param {number[]} opts.tuning
 * @param {number} opts.quality  weight on each shape's own playability, 0..1
 * @returns {Array<object|null>} one voicing per chord
 */
export function smoothProgression(chords, opts = {}) {
  const tuning = opts.tuning || TUNINGS.standard.midi;
  const quality = opts.quality ?? 0.35;
  if (!chords.length) return [];

  // Candidate shapes per chord, capped so the search stays instant.
  const candidates = chords.map((c) => {
    const list = findVoicings(c, { tuning, style: 'auto' }).slice(0, 8);
    return list.length ? list : [resolveVoicing(c, 'root', { tuning })].filter(Boolean);
  });
  if (candidates.some((c) => !c.length)) {
    return chords.map((c) => resolveVoicing(c, 'root', { tuning }));
  }

  // Viterbi: best total cost of reaching each candidate, plus a back-pointer.
  const best = candidates.map((list) => list.map(() => Infinity));
  const from = candidates.map((list) => list.map(() => -1));
  candidates[0].forEach((v, j) => { best[0][j] = -quality * v.score; });

  for (let i = 1; i < chords.length; i++) {
    candidates[i].forEach((v, j) => {
      const own = -quality * v.score;
      for (let k = 0; k < candidates[i - 1].length; k++) {
        const total = best[i - 1][k] + voiceLeadCost(candidates[i - 1][k], v) + own;
        if (total < best[i][j]) { best[i][j] = total; from[i][j] = k; }
      }
    });
  }

  const lastRow = best[chords.length - 1];
  let pick = lastRow.indexOf(Math.min(...lastRow));
  const out = new Array(chords.length);
  for (let i = chords.length - 1; i >= 0; i--) {
    out[i] = candidates[i][pick];
    pick = from[i][pick];
    if (pick < 0 && i > 0) pick = 0;
  }
  return out;
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
