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

// The harmony brain.
//
// Everything here is a pure function of (key, mode, what is already written).
// Nothing touches the DOM, the audio engine, or app state — which is what makes
// it testable, and what stops the musical reasoning from being scattered across
// render functions where it cannot be checked.
//
// The model is ordinary functional harmony, the same thing taught in a first
// theory class: chords have a job (tonic, subdominant, dominant), some
// successions are strong and some are weak, and a section of a song has a shape
// it is trying to make. Suggestions carry the reason they were made, because a
// suggestion a guitarist cannot explain teaches nothing.

import { MODES, chordForSpec, noteName, keySignaturePrefersFlats } from './theory.js';

/** The three jobs a chord can hold in a key. */
export const FUNCTION = { TONIC: 'T', SUBDOMINANT: 'S', DOMINANT: 'D' };

const FUNCTION_LABEL = { T: 'Tonic', S: 'Subdominant', D: 'Dominant' };

/**
 * Which job each scale degree does.
 *
 * In a major-ish mode: I/iii/vi rest, ii/IV move away, V/vii° pull back. Minor
 * modes shift the weight — the ♭VII in Aeolian and Dorian is not a dominant at
 * all, it is a colour that leans toward the ♭III, which is why a minor key needs
 * a borrowed V7 to actually cadence.
 */
const FUNCTION_BY_DEGREE = {
  major: ['T', 'S', 'T', 'S', 'D', 'T', 'D'],
  // The ii° of a minor key is a pre-dominant, not a dominant: it is the chord
  // that sets the V up, which is why a minor ii–V–i starts on it.
  minor: ['T', 'S', 'T', 'S', 'D', 'S', 'S'],
};

function isMinorMode(modeId) {
  const steps = (MODES[modeId] || MODES.ionian).steps;
  return steps[2] === 3;
}

export function degreeFunction(degree, modeId) {
  const table = FUNCTION_BY_DEGREE[isMinorMode(modeId) ? 'minor' : 'major'];
  return table[degree % 7];
}

export function functionLabel(fn) {
  return FUNCTION_LABEL[fn] || fn;
}

/**
 * How strong the motion between two chord roots is.
 *
 * Root motion down a fifth is the strongest progression in tonal music — it is
 * what a cadence is made of. Down a third is smooth because two notes are
 * shared. Up a step is strong but blunt. Up a fifth is retrogression: legal, but
 * it sounds like the music is backing up, which is a thing to know rather than a
 * thing to forbid.
 */
export function rootMotion(fromDegree, toDegree) {
  const step = ((toDegree - fromDegree) % 7 + 7) % 7;
  switch (step) {
    case 0: return { weight: 0, name: 'same chord' };
    case 3: return { weight: 10, name: 'down a fifth — the strongest move there is' };
    case 5: return { weight: 8, name: 'down a third — two notes stay put' };
    case 1: return { weight: 7, name: 'up a step' };
    case 6: return { weight: 6, name: 'down a step' };
    case 2: return { weight: 4, name: 'up a third' };
    case 4: return { weight: 3, name: 'up a fifth — a step backwards, used deliberately' };
    default: return { weight: 3, name: 'a move' };
  }
}

/**
 * The shape each part of a song is trying to make.
 *
 * `openOn` are the degrees that make a good first chord, `closeOn` the ones that
 * end the section the way the section wants to end. A pre-chorus that resolves
 * has thrown away its job; a chorus that does not resolve never lands.
 */
export const SECTION_ROLES = {
  intro: {
    label: 'Intro',
    blurb: 'Establish the key without spending the big moment.',
    openOn: [0, 5, 3], closeOn: [4, 0], avoidClose: [],
    prefersSize: 3, cadence: 'half',
  },
  verse: {
    label: 'Verse',
    blurb: 'A loop that can carry many different melodies.',
    openOn: [0, 5], closeOn: [4, 3, 0], avoidClose: [],
    prefersSize: 3, cadence: 'any',
  },
  prechorus: {
    label: 'Pre-Chorus',
    blurb: 'Climb, and hand the chorus an unresolved dominant.',
    openOn: [3, 1, 5], closeOn: [4], avoidClose: [0],
    prefersSize: 4, cadence: 'half',
  },
  chorus: {
    label: 'Chorus',
    blurb: 'The strongest, plainest statement of the key.',
    openOn: [0, 3, 5], closeOn: [0, 4], avoidClose: [],
    prefersSize: 3, cadence: 'authentic',
  },
  bridge: {
    label: 'Bridge',
    blurb: 'Leave home so returning means something.',
    openOn: [5, 3, 1], closeOn: [4], avoidClose: [0],
    prefersSize: 4, cadence: 'half',
  },
  outro: {
    label: 'Outro',
    blurb: 'Land, or vamp somewhere restful.',
    openOn: [0, 3], closeOn: [0], avoidClose: [4],
    prefersSize: 3, cadence: 'plagal',
  },
};

export const SECTION_ROLE_IDS = Object.keys(SECTION_ROLES);

/**
 * Extensions that belong on a degree, in the order a player would reach for
 * them.
 *
 * This is the difference between an app that lets you build any chord and one
 * that helps you: every degree can technically take every colour, but a ii that
 * is a m7 or m9 sounds like music and a ii that is an augmented triad sounds
 * like a mistake. Non-idiomatic options stay available — they are simply not
 * the ones offered first.
 */
export function idiomaticColours(degree, modeId) {
  const fn = degreeFunction(degree, modeId);
  const minorKey = isMinorMode(modeId);
  const quality = degreeQuality(degree, modeId);
  const out = [];

  const add = (size, colour, why) => out.push({ size, colour, why });

  if (quality === 'dim') {
    add(4, 'm7b5', 'Half-diminished is how this degree is normally voiced — it heads for the dominant.');
    add(4, 'dim7', 'Fully diminished, as a passing chord between two neighbours.');
    add(3, null, 'The bare diminished triad, which is harsher and rarely held.');
    return out;
  }

  if (fn === 'D') {
    add(4, 'dom', 'A true dominant 7th — the pull home.');
    add(5, 'dom', 'Add the 9th for warmth without losing the pull.');
    add(7, 'dom', 'A 13th: the full dominant sound.');
    add(4, 'sus4', 'Suspend the third, then release it into the 3rd.');
    add(5, 'dom', 'With a ♭9 this is the classic minor-key dominant.');
    out[4].alterations = ['b9'];
    return out;
  }

  if (fn === 'S') {
    if (quality === 'min') {
      add(4, null, 'The m7 — this is the ii of a ii–V, and it wants the dominant.');
      add(5, null, 'A m9: the same function, more air.');
      add(4, 'sus4', 'Suspended, which delays the move.');
    } else {
      add(4, null, 'A maj7 on the subdominant — soft, and it floats.');
      add(3, '6', 'A 6th chord, the settled vintage sound.');
      add(3, 'add9', 'add9 keeps it a triad but opens it up.');
    }
    return out;
  }

  // Tonic
  if (quality === 'min' || minorKey) {
    add(3, null, 'The plain minor triad — the most direct statement of home.');
    add(4, null, 'A m7 tonic: home, but still moving.');
    add(5, null, 'A m9 tonic, which is where a lot of neo-soul lives.');
    add(3, '6', 'm6 — brighter than it looks, because of the raised 6th.');
  } else {
    add(3, null, 'The plain triad — nothing is clearer than this.');
    add(4, null, 'maj7 makes the tonic dreamier and less final.');
    add(5, '6', 'A 6/9 chord: resolved, but not a full stop.');
    add(3, 'add9', 'add9 — a triad with light on it.');
  }
  return out;
}

/** 'maj' | 'min' | 'dim' | 'aug' for a mode's degree. */
export function degreeQuality(degree, modeId) {
  const steps = (MODES[modeId] || MODES.ionian).steps;
  const d = degree % 7;
  const at = (k) => steps[k % 7] + 12 * Math.floor(k / 7);
  const third = at(d + 2) - at(d);
  const fifth = at(d + 4) - at(d);
  if (fifth === 6) return 'dim';
  if (fifth === 8) return 'aug';
  return third === 3 ? 'min' : 'maj';
}

/**
 * What could come next.
 *
 * Scores combine root-motion strength, functional succession, the section's
 * shape, and whether the chord has already been used — a progression that
 * revisits a chord is normal, one that never leaves it is not. The reason
 * strings are the point: they are what the user reads.
 *
 * @param {object} ctx
 * @param {number} ctx.tonicPc
 * @param {string} ctx.modeId
 * @param {Array<object>} ctx.written   specs already placed, in order
 * @param {string} ctx.role             a SECTION_ROLES id
 * @param {number} ctx.position         index of the slot being filled
 * @param {number} ctx.total            slots in the section
 * @returns {Array<{spec, chord, score, reason, tag}>}
 */
export function suggestNext(ctx) {
  const { tonicPc, modeId, role = 'verse', position = 0, total = 4 } = ctx;
  const written = (ctx.written || []).filter(Boolean);
  const shape = SECTION_ROLES[role] || SECTION_ROLES.verse;
  const prev = written.length ? written[written.length - 1] : null;
  const isLast = position >= total - 1;
  const isFirst = position === 0 || !prev;
  const out = [];

  for (let degree = 0; degree < 7; degree++) {
    const fn = degreeFunction(degree, modeId);
    let score = 0;
    const reasons = [];

    if (isFirst) {
      const rank = shape.openOn.indexOf(degree);
      if (rank >= 0) {
        score += 12 - rank * 3;
        reasons.push(`opens a ${shape.label.toLowerCase()} well`);
      }
      if (degree === 0) { score += 6; reasons.push('the tonic, which states the key outright'); }
    } else {
      const motion = rootMotion(prev.degree, degree);
      score += motion.weight;
      if (motion.weight >= 8) reasons.push(motion.name);

      // Functional succession: away from home, then back.
      const prevFn = degreeFunction(prev.degree, modeId);
      if (prevFn === 'D' && fn === 'T') { score += 8; reasons.push('resolves the dominant'); }
      else if (prevFn === 'S' && fn === 'D') { score += 7; reasons.push('subdominant into dominant — the standard approach'); }
      else if (prevFn === 'T' && fn === 'D') { score += 8; reasons.push('home straight to the dominant, which is how half a songbook works'); }
      else if (prevFn === 'T' && fn === 'S') { score += 5; reasons.push('steps away from home'); }
      else if (prevFn === 'D' && fn === 'S') { score -= 4; reasons.push('pulls back from the dominant, which loosens the tension'); }
      if (degree === prev.degree) score -= 14;
    }

    if (isLast) {
      const rank = shape.closeOn.indexOf(degree);
      if (rank >= 0) { score += 10 - rank * 3; reasons.push(`ends a ${shape.label.toLowerCase()} the way it should`); }
      if (shape.avoidClose.includes(degree)) {
        score -= 10;
        reasons.push(`resolving here would spend the tension the ${shape.label.toLowerCase()} is building`);
      }
    }

    // A chord already in the section is familiar rather than new.
    const uses = written.filter((s) => s.degree === degree).length;
    score -= uses * 2;

    const colours = idiomaticColours(degree, modeId);
    const pick = colours[0] || { size: shape.prefersSize, colour: null, why: '' };
    const size = isLast || shape.prefersSize > 3 ? pick.size : shape.prefersSize;
    const spec = {
      degree,
      size: Math.max(size, shape.prefersSize === 4 ? 4 : 3),
      colour: pick.colour,
      alterations: pick.alterations ? pick.alterations.slice() : [],
    };

    out.push({
      spec,
      chord: chordForSpec(tonicPc, modeId, spec),
      score,
      tag: functionLabel(fn),
      reason: reasons.length ? capitalise(reasons.join('; ')) : `${functionLabel(fn)} chord in this key.`,
    });
  }

  // Secondary dominants: the V7 of any diatonic chord that is not diminished.
  // These are what let a plain diatonic loop turn a corner, so they are offered
  // alongside the diatonic options rather than hidden behind a separate menu.
  if (!isLast) {
    for (const target of secondaryDominants(tonicPc, modeId)) {
      if (prev && prev.degree === target.fromDegree) continue;
      out.push({
        spec: target.spec,
        chord: target.chord,
        score: target.isOwnDominant ? 11 : prev && rootMotion(prev.degree, target.fromDegree).weight >= 6 ? 9 : 6,
        tag: 'Borrowed',
        reason: target.why,
      });
    }
  }

  // In a minor key the "diatonic dominant" and the borrowed V7 are the same
  // chord arrived at two ways, so collapse them — and keep the explanation that
  // says why the third had to be raised, which is the one worth reading.
  const bySymbol = new Map();
  for (const s of out.sort((a, b) => b.score - a.score)) {
    const existing = bySymbol.get(s.chord.symbol);
    if (!existing) { bySymbol.set(s.chord.symbol, s); continue; }
    if (s.tag === 'Borrowed' && existing.tag !== 'Borrowed') existing.reason = s.reason;
  }
  return [...bySymbol.values()];
}

/**
 * Every secondary dominant available in a key.
 *
 * A secondary dominant sits a fifth above the chord it resolves to, so it is
 * built on the scale degree two places up the circle from the target. The
 * diminished degree is skipped: a chord that cannot be a stable target does not
 * get a dominant of its own.
 */
export function secondaryDominants(tonicPc, modeId) {
  const flats = keySignaturePrefersFlats(tonicPc, modeId);
  const out = [];
  for (let target = 0; target < 7; target++) {
    if (degreeQuality(target, modeId) === 'dim') continue;
    // The dominant of a degree is the degree a fourth below it (4 steps up).
    const fromDegree = (target + 4) % 7;
    // V7 of the tonic only counts as borrowed when the key does not already
    // supply it. In a major key it is just the V7 and belongs in the diatonic
    // list; in a minor key the diatonic v is minor, and making it major is the
    // single most useful borrowing there is — it is what lets a minor key
    // cadence at all, and it is exactly the E7 in A minor.
    const isOwnDominant = target === 0;
    if (isOwnDominant && degreeQuality(4, modeId) === 'maj') continue;

    const spec = { degree: fromDegree, size: 4, colour: 'dom', alterations: [] };
    const chord = chordForSpec(tonicPc, modeId, spec);
    const targetChord = chordForSpec(tonicPc, modeId, { degree: target, size: 3 });
    out.push({
      fromDegree,
      targetDegree: target,
      isOwnDominant,
      spec,
      chord,
      targetChord,
      targetName: noteName(targetChord.root, flats),
      targetNumeral: targetChord.numeral,
      label: `${chord.symbol}→${targetChord.symbol}`,
      why: isOwnDominant
        ? `The key's own v is minor and cannot pull home. Raising its third makes ${chord.symbol}, which can.`
        : `The V7 of ${noteName(targetChord.root, flats)} — it borrows a note from outside the key to point at the ${targetChord.numeral} chord.`,
    });
  }
  return out;
}

/**
 * Read a progression back and say what it does.
 *
 * The cadence check is the useful part: it names how the section ends and
 * whether that matches the job the section is doing, which is the single most
 * common thing to get wrong when writing by ear.
 */
export function analyseProgression(specs, tonicPc, modeId, role = 'verse') {
  const written = (specs || []).filter(Boolean);
  const shape = SECTION_ROLES[role] || SECTION_ROLES.verse;
  const notes = [];
  if (written.length < 2) {
    return { cadence: null, notes, summary: 'Add another chord to hear a progression.' };
  }

  // A chord held over two bars is one chord as far as the cadence is concerned,
  // so collapse repeats before reading the ending. Otherwise `V7 – i – i` looks
  // like it has no cadence at all, when in fact it just lands early and rests.
  const flow = written.filter((s, i) => i === 0 || s.degree !== written[i - 1].degree);
  if (flow.length < 2) {
    return { cadence: null, notes, summary: written.map((s) => chordForSpec(tonicPc, modeId, s).numeral).join(' – ') };
  }
  const last = flow[flow.length - 1];
  const prev = flow[flow.length - 2];
  const lastFn = degreeFunction(last.degree, modeId);
  const prevFn = degreeFunction(prev.degree, modeId);

  let cadence = null;
  if (prevFn === 'D' && last.degree === 0) cadence = { id: 'authentic', label: 'Perfect cadence', note: 'Dominant to tonic — the section lands.' };
  else if (prev.degree === 3 && last.degree === 0) cadence = { id: 'plagal', label: 'Plagal cadence', note: 'IV to I — the "amen" ending, softer than a perfect cadence.' };
  else if (lastFn === 'D') cadence = { id: 'half', label: 'Half cadence', note: 'Ends on the dominant, unresolved — it hands over to whatever comes next.' };
  else if (prevFn === 'D' && last.degree === 5) cadence = { id: 'deceptive', label: 'Deceptive cadence', note: 'The dominant resolves to vi instead of I — the ending is dodged on purpose.' };

  if (cadence && shape.cadence !== 'any' && cadence.id !== shape.cadence) {
    notes.push({
      level: 'hint',
      text: `A ${shape.label.toLowerCase()} usually ends with a ${shape.cadence} cadence; this one ends with a ${cadence.label.toLowerCase()}.`,
    });
  }
  if (!cadence) notes.push({ level: 'hint', text: 'No clear cadence — the section stops rather than ends.' });

  // A loop with no dominant anywhere never generates tension.
  if (!written.some((s) => degreeFunction(s.degree, modeId) === 'D' || s.colour === 'dom')) {
    notes.push({ level: 'hint', text: 'Nothing here acts as a dominant, so the loop stays flat. Try a V7 before the turn.' });
  }
  // Every chord the same size is a texture, not always a problem, but worth saying.
  const sizes = new Set(written.map((s) => s.size || 3));
  if (written.length >= 4 && sizes.size === 1 && [...sizes][0] === 3) {
    notes.push({ level: 'idea', text: 'All plain triads. A 7th or 9th on one chord will give the loop a centre of gravity.' });
  }

  const summary = written
    .map((s) => chordForSpec(tonicPc, modeId, s).numeral)
    .join(' – ');
  return { cadence, notes, summary };
}

/**
 * The scale to improvise with over a chord, and the note to handle carefully.
 *
 * This is the melodic half of the brain. A guitarist who knows the chord still
 * has to know what to play over it, and the answer is not always the key's own
 * scale: a secondary dominant borrows notes, and an altered dominant asks for a
 * different scale entirely.
 */
export function scaleForChord(spec, tonicPc, modeId) {
  const chord = chordForSpec(tonicPc, modeId, spec);
  const root = chord.root;
  const alt = spec.alterations || [];
  const scale = (name, offsets, avoid = null, why = '') => ({
    name, why,
    pitchClasses: offsets.map((o) => (root + o) % 12),
    avoidPc: avoid === null ? null : (root + avoid) % 12,
  });

  if (spec.colour === 'dom') {
    if (alt.includes('b9') || alt.includes('#9')) {
      return scale('Altered (super-locrian)', [0, 1, 3, 4, 6, 8, 10], null,
        'Every tension is raised or lowered — this is the scale the ♭9 is asking for.');
    }
    if (alt.includes('#11')) {
      return scale('Lydian dominant', [0, 2, 4, 6, 7, 9, 10], null,
        'A dominant with a raised 4th, which is exactly the ♯11.');
    }
    return scale('Mixolydian', [0, 2, 4, 5, 7, 9, 10], 5,
      'The dominant scale. The 4th clashes with the chord\'s 3rd — pass through it, do not land on it.');
  }
  if (spec.colour === 'dim7') {
    return scale('Diminished (half–whole)', [0, 1, 3, 4, 6, 7, 9, 10], null,
      'Symmetrical, like the chord — it works from any of the four notes.');
  }
  if (spec.colour === 'm7b5') {
    return scale('Locrian ♮2', [0, 2, 3, 5, 6, 8, 10], null,
      'Locrian with the 2nd raised, which keeps the 9th usable.');
  }

  // Diatonic chords take the mode built on their own root — the key's notes,
  // rearranged so the chord tones fall on the strong degrees.
  const steps = (MODES[modeId] || MODES.ionian).steps;
  const d = spec.degree % 7;
  const offsets = Array.from({ length: 7 }, (_, k) => {
    const idx = (d + k) % 7;
    const oct = Math.floor((d + k) / 7);
    return steps[idx] + 12 * oct - steps[d];
  });
  const quality = degreeQuality(d, modeId);
  const MODE_OF_DEGREE = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];
  const parentIdx = (MODE_IDS_ORDER.indexOf(modeId) + d) % 7;
  // A perfect 4th over a major third is the one note that fights the chord.
  const avoid = quality === 'maj' && offsets.includes(5) ? 5 : null;
  return scale(
    `${noteName(root, keySignaturePrefersFlats(tonicPc, modeId))} ${MODE_OF_DEGREE[parentIdx]}`,
    offsets.map((o) => ((o % 12) + 12) % 12),
    avoid,
    'The key\'s own notes, starting from this chord\'s root.'
  );
}

const MODE_IDS_ORDER = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'];

function capitalise(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
