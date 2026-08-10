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

/** Chord sizes the app offers, as note counts. */
export const CHORD_SIZES = [
  { size: 3, label: 'Triad', short: '△' },
  { size: 4, label: '7th', short: '7' },
  { size: 5, label: '9th', short: '9' },
  { size: 6, label: '11th', short: '11' },
  { size: 7, label: '13th', short: '13' },
];

/**
 * Name a stack of thirds.
 *
 * Extensions are named by the highest one that is *unaltered*, with anything
 * altered appended — so a dominant with a flattened ninth is 7♭9 rather than a
 * plain 9, and a minor eleventh with a raised eleventh is m9♯11. Modes throw up
 * these chords constantly (Phrygian's tonic carries a ♭9, Lydian's a ♯11), and
 * naming them as if they were natural would be wrong in a way that matters to
 * anyone reading the chord.
 */
function stackSymbol(intervals) {
  const iv = intervals.map((i) => ((i % 12) + 12) % 12);
  const third = iv[1];
  const fifth = iv[2];
  const seventh = iv.length > 3 ? iv[3] : null;
  const count = intervals.length;

  const isMinor = third === 3;
  const isSus = third === 2 || third === 5;
  const dim5 = fifth === 6;
  const aug5 = fifth === 8;

  if (count === 3) {
    if (isSus) return third === 2 ? 'sus2' : 'sus4';
    if (isMinor && dim5) return '°';
    if (!isMinor && aug5) return '+';
    return isMinor ? 'm' : '';
  }

  // Base seventh-chord name.
  let base;
  if (isMinor && dim5 && seventh === 9) return '°7';
  if (isMinor && dim5) base = 'm7♭5';
  else if (isMinor) base = seventh === 11 ? 'mMaj7' : 'm7';
  else if (aug5) base = seventh === 11 ? 'maj7♯5' : '7♯5';
  else base = seventh === 11 ? 'maj7' : '7';

  if (count === 4) return base;

  // Extensions: 9th, 11th, 13th, with their unaltered values.
  const NATURAL = { 9: 2, 11: 5, 13: 9 };
  const present = [];
  if (count >= 5) present.push([9, iv[4]]);
  if (count >= 6) present.push([11, iv[5]]);
  if (count >= 7) present.push([13, iv[6]]);

  // Climb while the extensions stay natural; the last natural one names the chord.
  let highestNatural = 7;
  const alterations = [];
  for (const [degree, value] of present) {
    if (value === NATURAL[degree]) {
      if (highestNatural === degree - 2 || highestNatural === 7) highestNatural = degree;
    } else {
      const diff = value - NATURAL[degree];
      alterations.push(`${diff < 0 ? '♭' : '♯'}${degree}`);
    }
  }

  const stem = base.replace(/7/, String(highestNatural === 7 ? 7 : highestNatural));
  return stem + alterations.join('');
}

/**
 * Which tones must sound for the chord to be itself.
 *
 * Six strings cannot hold a seven-note chord, and a guitarist would not try:
 * the fifth goes first, then the extensions below the top one. What survives is
 * the root, the third that makes it major or minor, the seventh that gives it
 * its family, and the extension it is named for. An altered fifth stays,
 * because that is what the name is about.
 */
function essentialIntervals(intervals) {
  const count = intervals.length;
  if (count <= 3) return intervals.slice();

  const iv = intervals.map((i) => ((i % 12) + 12) % 12);
  const keep = new Set([intervals[0], intervals[1], intervals[3]]);
  if (iv[2] === 6 || iv[2] === 8) keep.add(intervals[2]);
  if (count >= 5) keep.add(intervals[count - 1]);
  return [...keep];
}

/**
 * Diatonic chords for a key/mode.
 * @param {number} tonicPc
 * @param {string} modeId
 * @param {boolean|number} size  note count (3-7), or a boolean for triad/7th
 */
export function diatonicChords(tonicPc, modeId, size = 3) {
  const noteCount = typeof size === 'boolean' ? (size ? 4 : 3) : Math.max(3, Math.min(7, size));
  const mode = MODES[modeId] || MODES.ionian;
  const steps = mode.steps;
  const flats = keySignaturePrefersFlats(tonicPc, modeId);
  const out = [];

  for (let d = 0; d < 7; d++) {
    // Stacked thirds: every other scale degree, wrapping into higher octaves.
    const degreeOffsets = Array.from({ length: noteCount }, (_, k) => k * 2);
    const rootAbs = steps[d];
    const intervals = degreeOffsets.map((o) => {
      const idx = (d + o) % 7;
      const octaves = Math.floor((d + o) / 7);
      return steps[idx] + 12 * octaves - rootAbs;
    });
    const rootPc = (tonicPc + rootAbs) % 12;
    const symbol = stackSymbol(intervals);
    const iv = intervals.map((i) => ((i % 12) + 12) % 12);
    const isMinorish = iv[1] === 3;

    // Modal degrees are numbered against the major scale, so a degree the mode
    // lowers or raises carries the accidental: Mixolydian's seventh is ♭VII,
    // not VII, and Lydian's fourth is ♯IV. Without this the numeral names a
    // chord from a different scale than the one being played.
    const alteration = steps[d] - MAJOR_STEPS[d];
    const accidental = alteration < 0 ? '♭' : alteration > 0 ? '♯' : '';

    let numeral = accidental + (isMinorish ? ROMAN[d].toLowerCase() : ROMAN[d]);
    if (iv[2] === 6) numeral += noteCount >= 4 ? 'ø' : '°';
    else if (iv[2] === 8) numeral += '+';
    if (noteCount >= 4) {
      // The numeral carries the same extension figure as the chord symbol, so
      // the two always agree about what is being played.
      const figure = symbol.match(/(13|11|9|7)/);
      if (figure) numeral += figure[1];
      if (iv[2] === 6 && iv[3] === 9) numeral = `${accidental}${ROMAN[d].toLowerCase()}°7`;
    }

    out.push(
      chordFromIntervals(rootPc, intervals, { degree: d, numeral, preferFlats: flats, symbol })
    );
  }
  return out;
}

/**
 * Build a chord descriptor from an explicit interval stack. Used for anything
 * beyond the fixed quality table — every extended chord is generated, not
 * enumerated.
 */
export function chordFromIntervals(rootPc, intervals, extra = {}) {
  const root = ((rootPc % 12) + 12) % 12;
  const preferFlats = extra.preferFlats ?? keyPrefersFlats(root);
  const symbol = extra.symbol ?? stackSymbol(intervals);
  const essential = essentialIntervals(intervals);
  return {
    root,
    qualityId: extra.qualityId ?? null,
    intervals: intervals.slice(),
    pitchClasses: intervals.map((i) => (root + i) % 12),
    /** Tones that must sound; the rest may be dropped to make a shape playable. */
    essentialPitchClasses: essential.map((i) => (root + i) % 12),
    symbol: noteName(root, preferFlats) + symbol,
    rootName: noteName(root, preferFlats),
    qualityName: extra.qualityName ?? symbol,
    degree: extra.degree ?? null,
    numeral: extra.numeral ?? null,
    inversion: extra.inversion ?? 0,
  };
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
    essentialPitchClasses: essentialIntervals(quality.intervals).map((i) => (root + i) % 12),
    symbol: noteName(root, preferFlats) + quality.symbol,
    rootName: noteName(root, preferFlats),
    qualityName: quality.name,
    degree: extra.degree ?? null,
    numeral: extra.numeral ?? null,
    /** 0 = root position, 1 = first inversion, ... */
    inversion: extra.inversion ?? 0,
  };
}

/**
 * Chord colours that can be applied to any scale degree.
 *
 * `dom` is the important one: a dominant seventh built on a degree that is not
 * dominant in the key. That is how a minor ii–V–i works — the V of A minor is
 * Em7 diatonically, and it takes an E7 to actually pull back to Am. Every
 * borrowed chord a guitarist reaches for is on this list.
 */
export const CHORD_COLOURS = [
  { id: null, label: 'Diatonic', hint: 'The chord the key gives you.' },
  { id: 'dom', label: 'Dom 7', hint: 'A dominant on this degree — the secondary-dominant pull.' },
  { id: 'sus4', label: 'sus4', hint: 'Third replaced by the fourth. Suspended, wants to resolve.' },
  { id: 'sus2', label: 'sus2', hint: 'Third replaced by the second. Open and unresolved.' },
  { id: '6', label: '6th', hint: 'Sixth instead of a seventh. Warm, settled, vintage.' },
  { id: 'add9', label: 'add9', hint: 'Ninth added over a triad, with no seventh.' },
  { id: 'dim7', label: '°7', hint: 'Fully diminished — a passing chord that leads anywhere.' },
  { id: 'm7b5', label: 'ø7', hint: 'Half-diminished. The ii of a minor ii–V–i.' },
  { id: 'aug', label: '+', hint: 'Raised fifth, pushing upward.' },
];

/** Alterations available on a dominant chord. */
export const CHORD_ALTERATIONS = [
  { id: 'b9', label: '♭9', degree: 9, value: 13 },
  { id: '#9', label: '♯9', degree: 9, value: 15 },
  { id: '#11', label: '♯11', degree: 11, value: 18 },
  { id: 'b13', label: '♭13', degree: 13, value: 20 },
];

const ALT_BY_ID = Object.fromEntries(CHORD_ALTERATIONS.map((a) => [a.id, a]));

/** Semitones above the root for each unaltered extension. */
const NATURAL_EXT = { 9: 14, 11: 17, 13: 21 };

/**
 * Build the chord for a slot's specification.
 *
 * A spec is stored rather than a finished chord, so a progression stays
 * transposable: change the key and every chord follows, keeping its size,
 * colour and alterations.
 *
 * @param {number} tonicPc
 * @param {string} modeId
 * @param {{degree:number, size?:number, colour?:string|null, alterations?:string[]}} spec
 */
export function chordForSpec(tonicPc, modeId, spec = {}) {
  const degree = (spec.degree ?? 0) % 7;
  const size = Math.max(3, Math.min(7, spec.size ?? 3));
  const colour = spec.colour ?? null;
  const alterations = spec.alterations ?? [];

  const diatonic = diatonicChords(tonicPc, modeId, size)[degree];
  if (!colour && !alterations.length) return diatonic;

  const rootPc = diatonic.root;
  const minorThird = diatonic.intervals[1] === 3;
  const flats = keySignaturePrefersFlats(tonicPc, modeId);

  // Which extension degrees this chord should carry, by size.
  const wantedDegrees = [];
  if (size >= 5) wantedDegrees.push(9);
  if (size >= 6) wantedDegrees.push(11);
  if (size >= 7) wantedDegrees.push(13);
  // An alteration implies its degree is present, whatever the size says.
  for (const id of alterations) {
    const alt = ALT_BY_ID[id];
    if (alt && !wantedDegrees.includes(alt.degree)) wantedDegrees.push(alt.degree);
  }
  wantedDegrees.sort((a, b) => a - b);

  const extensionFor = (deg) => {
    const chosen = alterations.map((id) => ALT_BY_ID[id]).find((a) => a && a.degree === deg);
    return chosen ? chosen.value : NATURAL_EXT[deg];
  };

  let core;
  switch (colour) {
    case 'dom': core = [0, 4, 7, 10]; break;
    case 'sus4': core = size >= 4 ? [0, 5, 7, 10] : [0, 5, 7]; break;
    case 'sus2': core = size >= 4 ? [0, 2, 7, 10] : [0, 2, 7]; break;
    case '6': core = [0, minorThird ? 3 : 4, 7, 9]; break;
    case 'add9': core = [0, minorThird ? 3 : 4, 7, 14]; break;
    case 'dim7': core = [0, 3, 6, 9]; break;
    case 'm7b5': core = [0, 3, 6, 10]; break;
    case 'aug': core = size >= 4 ? [0, 4, 8, 10] : [0, 4, 8]; break;
    default: core = diatonic.intervals.slice(0, Math.min(4, diatonic.intervals.length));
  }

  // 6th, add9 and °7 chords are complete as written — stacking further thirds
  // on them produces something that is no longer the chord that was asked for.
  // The one exception is the 6/9, which is a chord guitarists actually want.
  const stackable = !['6', 'add9', 'dim7'].includes(colour);
  const intervals = core.slice();
  if (stackable) for (const deg of wantedDegrees) intervals.push(extensionFor(deg));
  else if (colour === '6' && size >= 5) intervals.push(14);

  const symbol = symbolForColour(colour, minorThird, size, alterations, intervals);
  return chordFromIntervals(rootPc, intervals, {
    degree,
    numeral: numeralForSpec(diatonic, colour, symbol),
    preferFlats: flats,
    symbol,
  });
}

/**
 * The number a chord is named by: the highest extension it carries *naturally*.
 *
 * A chord is never named after an altered tone — the alteration is spelled out
 * instead, and the name falls back to the highest natural degree beneath it.
 * That is why E–G♯–B–D–F is E7♭9 and not E9♭9, while E–G♯–B–D–F♯–A♯ is E9♯11:
 * the ♯11 is altered, so the natural 9 underneath names the chord.
 */
function extensionNumber(intervals) {
  if (intervals.length < 4) return 0;
  const iv = new Set(intervals);
  let number = 7;
  for (const deg of [9, 11, 13]) {
    const natural = NATURAL_EXT[deg];
    // Present in any form — natural, flattened or sharpened.
    if (!(iv.has(natural) || iv.has(natural - 1) || iv.has(natural + 1))) break;
    if (iv.has(natural)) number = deg;
  }
  return number;
}

function symbolForColour(colour, minorThird, size, alterations, intervals) {
  const altText = alterations
    .map((id) => ALT_BY_ID[id])
    .filter(Boolean)
    .sort((a, b) => a.degree - b.degree)
    .map((a) => a.label)
    .join('');

  const n = extensionNumber(intervals);
  const number = n ? String(n) : '';
  const seventh = intervals.length >= 4;

  switch (colour) {
    case 'dom': return number + altText;
    case 'sus4': return (seventh ? number : '') + 'sus4' + altText;
    case 'sus2': return (seventh ? number : '') + 'sus2' + altText;
    case '6': return (minorThird ? 'm' : '') + (intervals.length >= 5 ? '6/9' : '6');
    case 'add9': return (minorThird ? 'm' : '') + 'add9';
    case 'dim7': return '°7';
    case 'm7b5': return 'm' + (number || '7') + '♭5' + altText;
    case 'aug': return seventh ? number + '♯5' + altText : '+';
    default: return stackSymbol(intervals);
  }
}

function numeralForSpec(diatonic, colour, symbol) {
  const base = diatonic.numeral.replace(/(13|11|9|7|ø|°|\+)+$/, '');
  if (colour === 'dom') return `${base.toUpperCase()}${symbol}`;
  if (!colour) return diatonic.numeral;
  return `${base}${symbol}`;
}

const SIZE_NOTE = {
  3: 'Plain triad — the chord at its most direct.',
  4: 'Seventh added: the chord gains a direction to move in.',
  5: 'Ninth on top — warmth and colour without changing the function.',
  6: 'Eleventh — open and suspended over the third.',
  7: 'Thirteenth — the full stack, the sound of a jazz voicing.',
};

const DEGREE_ROLE = [
  'home', 'a step away from home', 'the tonic\'s shadow', 'the lift',
  'the pull back home', 'the relative minor', 'the approach chord',
];

/**
 * Say, in a sentence a guitarist can act on, what a chord spec is doing in the
 * key. The interesting case is a chord the key does not contain: a dominant on
 * a degree that is not the dominant is heard as the V of wherever it points, and
 * naming that target is what turns a borrowed chord from a guess into a choice.
 */
export function describeSpec(tonicPc, modeId, spec = {}) {
  const degree = (spec.degree ?? 0) % 7;
  const size = Math.max(3, Math.min(7, spec.size ?? 3));
  const colour = spec.colour ?? null;
  const alterations = spec.alterations ?? [];
  const mode = MODES[modeId] || MODES.ionian;
  const flats = keySignaturePrefersFlats(tonicPc, modeId);
  const parts = [];

  if (colour === 'dom' && degree !== 4) {
    // A dominant resolves down a fifth. Name where this one lands, and whether
    // that landing place is in the key.
    const rootPc = (tonicPc + mode.steps[degree]) % 12;
    const targetPc = (rootPc + 5) % 12;
    const targetDegree = mode.steps.findIndex((s) => (tonicPc + s) % 12 === targetPc);
    const targetName = noteName(targetPc, flats);
    parts.push(
      targetDegree >= 0
        ? `Secondary dominant — the V7 of ${targetName}, so it pulls to the ${ROMAN[targetDegree]} chord.`
        : `Borrowed dominant pulling to ${targetName}, which sits outside this key.`
    );
  } else if (colour === 'dom') {
    parts.push('The key\'s own dominant, made a true V7 — the strongest pull to the tonic.');
  } else if (colour === 'sus4' || colour === 'sus2') {
    parts.push('No third, so it is neither major nor minor — it wants the chord after it.');
  } else if (colour === 'dim7') {
    parts.push('Symmetrical: it can resolve up a semitone into almost anything.');
  } else if (colour === 'm7b5') {
    parts.push('Half-diminished — the ii of a minor ii–V–i, heading for the dominant.');
  } else if (colour === '6') {
    parts.push('A sixth instead of a seventh: settled rather than in motion.');
  } else if (colour === 'add9') {
    parts.push('A ninth over a plain triad — colour with no seventh to resolve.');
  } else if (colour === 'aug') {
    parts.push('The raised fifth leans upward into the next chord\'s root or third.');
  } else {
    parts.push(`Diatonic — ${DEGREE_ROLE[degree]} in this key.`);
    if (size > 3) parts.push(SIZE_NOTE[size]);
  }

  if (alterations.length) {
    const labels = alterations.map((id) => ALT_BY_ID[id]?.label).filter(Boolean).join(' and ');
    parts.push(`The ${labels} tightens the tension — resolve it by step into the next chord.`);
  }
  return parts.join(' ');
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
