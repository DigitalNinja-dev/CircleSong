// Strum / rhythm patterns.
//
// A hit's `t` is a fraction of the bar (0..1). `vel` is relative velocity,
// `mute` is fret-hand damping (0 = let ring, 1 = fully choked), `spread` is
// how long the pick takes to cross the strings, in seconds.
//
// Arp patterns pick individual strings instead: `pick` is either 'bass'
// (lowest sounding string) or an index counted down from the highest sounding
// string, so a pattern works with any voicing.

export const RHYTHMS = [
  { id: 'straight8', label: 'Straight 8ths', tag: 'strum' },
  { id: 'pop16', label: '16th Pop Strum', tag: 'strum' },
  { id: 'folkDDU', label: 'Folk D-DU-UDU', tag: 'strum' },
  { id: 'driving16', label: 'Driving 16ths', tag: 'strum' },
  { id: 'anthemic', label: 'Anthem Half-Time', tag: 'strum' },
  { id: 'muteChuck', label: 'Muted Chuck', tag: 'percussive' },
  { id: 'reggaeSkank', label: 'Reggae Skank', tag: 'offbeat' },
  { id: 'skaUpstroke', label: 'Ska Upstrokes', tag: 'offbeat' },
  { id: 'jazzSwing', label: 'Jazz Swing', tag: 'comp' },
  { id: 'charleston', label: 'Charleston Comp', tag: 'comp' },
  { id: 'bossa', label: 'Bossa Nova', tag: 'syncop' },
  { id: 'rumba', label: 'Rumba Clave', tag: 'syncop' },
  { id: 'waltzStrum', label: 'Waltz Strum', tag: '3/4' },
  { id: 'ballad68', label: 'Ballad 6/8', tag: '6/8' },
  { id: 'fingerstyle', label: 'Fingerstyle Arp', tag: 'arp' },
  { id: 'travis', label: 'Travis Picking', tag: 'arp' },
  { id: 'arpUp', label: 'Rising Arpeggio', tag: 'arp' },
  { id: 'wholeNote', label: 'Let Ring', tag: 'sustain' },
  { id: 'keysBlock', label: 'Block Chords', tag: 'keys' },
  { id: 'keysBallad', label: 'Ballad Left Hand', tag: 'keys' },
  { id: 'keysAlberti', label: 'Alberti Bass', tag: 'keys' },
  { id: 'keysBroken', label: 'Broken Chord', tag: 'keys' },
  { id: 'keysComp', label: 'Comping Stabs', tag: 'keys' },
];

const d = (t, vel = 0.85, extra = {}) => ({ t, dir: 'D', vel, mute: 0, spread: 0.024, ...extra });
const u = (t, vel = 0.7, extra = {}) => ({ t, dir: 'U', vel, mute: 0, spread: 0.018, ...extra });

export const RHYTHM_PATTERNS = {
  // Down on the beat, up on the "and". Accented on 1 and 3.
  straight8: {
    kind: 'strum',
    hits: [
      d(0, 1.0),
      u(0.125),
      d(0.25, 0.8),
      u(0.375),
      d(0.5, 0.92),
      u(0.625),
      d(0.75, 0.8),
      u(0.875, 0.75),
    ],
  },

  // The ubiquitous D-DU-UDU pattern, with the 2nd beat left as a gap.
  pop16: {
    kind: 'strum',
    hits: [
      d(0, 1.0),
      d(0.25, 0.85),
      u(0.375, 0.72),
      u(0.625, 0.68),
      d(0.75, 0.88),
      u(0.875, 0.7),
    ],
  },

  // Offbeat upstroke chops, heavily damped — the "skank".
  reggaeSkank: {
    kind: 'strum',
    hits: [
      u(0.125, 0.9, { mute: 0.55, spread: 0.012 }),
      u(0.375, 0.75, { mute: 0.55, spread: 0.012 }),
      u(0.625, 0.9, { mute: 0.55, spread: 0.012 }),
      u(0.875, 0.75, { mute: 0.55, spread: 0.012 }),
    ],
  },

  // Freddie Green style: short comps on 2 and 4, swung.
  jazzSwing: {
    kind: 'strum',
    swing: 0.33,
    hits: [
      d(0.25, 0.9, { mute: 0.35, spread: 0.03 }),
      u(0.4375, 0.5, { mute: 0.45 }),
      d(0.75, 0.95, { mute: 0.35, spread: 0.03 }),
      u(0.9375, 0.5, { mute: 0.45 }),
    ],
  },

  // Bossa comp: bass-anchored, syncopated, let ring.
  bossa: {
    kind: 'strum',
    hits: [
      d(0, 0.9, { spread: 0.03 }),
      d(0.375, 0.7, { spread: 0.02 }),
      d(0.5, 0.8, { spread: 0.028 }),
      d(0.875, 0.65, { spread: 0.02 }),
    ],
  },

  // Travis-ish alternating-bass fingerpicking.
  fingerstyle: {
    kind: 'arp',
    picks: [
      { t: 0, pick: 'bass', vel: 0.95 },
      { t: 0.125, pick: 1, vel: 0.65 },
      { t: 0.25, pick: 0, vel: 0.75 },
      { t: 0.375, pick: 2, vel: 0.6 },
      { t: 0.5, pick: 'bass2', vel: 0.85 },
      { t: 0.625, pick: 1, vel: 0.62 },
      { t: 0.75, pick: 0, vel: 0.72 },
      { t: 0.875, pick: 2, vel: 0.58 },
    ],
  },

  // The pattern most people mean by "strumming a guitar": D-DU-UDU, with the
  // second downstroke missing so the hand keeps moving through the gap.
  folkDDU: {
    kind: 'strum',
    hits: [
      d(0, 1.0),
      d(0.25, 0.82),
      u(0.375, 0.7),
      u(0.625, 0.66),
      d(0.75, 0.86),
      u(0.875, 0.7),
    ],
  },

  driving16: {
    kind: 'strum',
    hits: [
      d(0, 1.0, { spread: 0.018 }),
      u(0.0625, 0.5),
      d(0.125, 0.7),
      u(0.1875, 0.5),
      d(0.25, 0.88),
      u(0.3125, 0.5),
      d(0.375, 0.68),
      u(0.4375, 0.52),
      d(0.5, 0.95),
      u(0.5625, 0.5),
      d(0.625, 0.7),
      u(0.6875, 0.5),
      d(0.75, 0.86),
      u(0.8125, 0.52),
      d(0.875, 0.68),
      u(0.9375, 0.56),
    ],
  },

  // Big open strokes with room between them, for choruses.
  anthemic: {
    kind: 'strum',
    hits: [
      d(0, 1.0, { spread: 0.045 }),
      u(0.1875, 0.55),
      d(0.5, 0.92, { spread: 0.04 }),
      u(0.6875, 0.55),
      u(0.875, 0.6),
    ],
  },

  // Fret-hand mutes on the backbeat: pitch barely sounds, the click carries it.
  muteChuck: {
    kind: 'strum',
    hits: [
      d(0, 0.9),
      u(0.125, 0.55, { mute: 0.5 }),
      d(0.25, 0.95, { mute: 0.75, spread: 0.012 }),
      u(0.375, 0.5, { mute: 0.5 }),
      d(0.5, 0.85),
      u(0.625, 0.55, { mute: 0.5 }),
      d(0.75, 0.95, { mute: 0.75, spread: 0.012 }),
      u(0.875, 0.5, { mute: 0.5 }),
    ],
  },

  // Ska: every offbeat, all upstrokes, tighter and brighter than a skank.
  skaUpstroke: {
    kind: 'strum',
    hits: [
      u(0.125, 0.95, { mute: 0.35, spread: 0.01 }),
      u(0.375, 0.88, { mute: 0.35, spread: 0.01 }),
      u(0.625, 0.95, { mute: 0.35, spread: 0.01 }),
      u(0.875, 0.88, { mute: 0.35, spread: 0.01 }),
    ],
  },

  // The Charleston figure: beat one and the "and" of two. Endlessly useful.
  charleston: {
    kind: 'strum',
    swing: 0.33,
    hits: [
      d(0, 0.95, { spread: 0.03 }),
      u(0.375, 0.8, { mute: 0.3 }),
      d(0.5, 0.7, { spread: 0.03 }),
      u(0.875, 0.75, { mute: 0.3 }),
    ],
  },

  // Rumba clave, the 3-2 figure underneath a lot of Latin guitar.
  rumba: {
    kind: 'strum',
    hits: [
      d(0, 0.95),
      d(0.1875, 0.7),
      d(0.375, 0.8),
      d(0.625, 0.75),
      d(0.75, 0.85),
    ],
  },

  // 3/4: down on one, lighter strokes on two and three.
  waltzStrum: {
    kind: 'strum',
    hits: [
      d(0, 1.0, { spread: 0.038 }),
      d(0.3333, 0.7),
      u(0.5, 0.5),
      d(0.6667, 0.72),
      u(0.8333, 0.5),
    ],
  },

  ballad68: {
    kind: 'strum',
    hits: [
      d(0, 0.95, { spread: 0.04 }),
      u(0.1667, 0.55),
      u(0.3333, 0.6),
      d(0.5, 0.85, { spread: 0.035 }),
      u(0.6667, 0.55),
      u(0.8333, 0.6),
    ],
  },

  // Alternating thumb against a steady melody — the Travis signature.
  travis: {
    kind: 'arp',
    picks: [
      { t: 0, pick: 'bass', vel: 0.95 },
      { t: 0.0625, pick: 1, vel: 0.6 },
      { t: 0.125, pick: 0, vel: 0.7 },
      { t: 0.25, pick: 'bass2', vel: 0.85 },
      { t: 0.3125, pick: 2, vel: 0.58 },
      { t: 0.375, pick: 1, vel: 0.62 },
      { t: 0.5, pick: 'bass', vel: 0.9 },
      { t: 0.5625, pick: 1, vel: 0.6 },
      { t: 0.625, pick: 0, vel: 0.72 },
      { t: 0.75, pick: 'bass2', vel: 0.82 },
      { t: 0.8125, pick: 2, vel: 0.56 },
      { t: 0.875, pick: 1, vel: 0.6 },
    ],
  },

  arpUp: {
    kind: 'arp',
    picks: [
      { t: 0, pick: 'bass', vel: 0.9 },
      { t: 0.125, pick: 3, vel: 0.7 },
      { t: 0.25, pick: 2, vel: 0.72 },
      { t: 0.375, pick: 1, vel: 0.74 },
      { t: 0.5, pick: 0, vel: 0.8 },
      { t: 0.625, pick: 1, vel: 0.66 },
      { t: 0.75, pick: 2, vel: 0.68 },
      { t: 0.875, pick: 3, vel: 0.64 },
    ],
  },

  // One slow strum per bar for auditioning voicings.
  wholeNote: {
    kind: 'strum',
    hits: [d(0, 0.95, { spread: 0.05 })],
  },

  // --- keyboard patterns ---
  //
  // A piano has no pick crossing the strings, so none of the patterns above
  // describe one: an upstroke is not a thing a pianist can do, and a strum
  // spread is the one cue that most says "guitar". These work in parts instead
  // — bass note, upper voices, or the whole chord struck together — which is
  // how a keyboard player actually divides a chord up.
  keysBlock: {
    kind: 'keys',
    hits: [
      { t: 0, part: 'all', vel: 1.0 },
      { t: 0.25, part: 'all', vel: 0.78 },
      { t: 0.5, part: 'all', vel: 0.9 },
      { t: 0.75, part: 'all', vel: 0.76 },
    ],
  },

  // The ballad shape: root in the left hand, chord answering above it.
  keysBallad: {
    kind: 'keys',
    hits: [
      { t: 0, part: 'bass', vel: 0.95 },
      { t: 0.125, part: 'upper', vel: 0.72, roll: 0.02 },
      { t: 0.5, part: 'bass', vel: 0.8 },
      { t: 0.625, part: 'upper', vel: 0.68, roll: 0.02 },
    ],
  },

  // Alberti bass: low, high, middle, high. Two centuries of keyboard music.
  keysAlberti: {
    kind: 'keys',
    hits: [
      { t: 0, part: 'bass', vel: 0.9 },
      { t: 0.125, part: 0, vel: 0.68 },
      { t: 0.25, part: 1, vel: 0.7 },
      { t: 0.375, part: 0, vel: 0.66 },
      { t: 0.5, part: 'bass', vel: 0.85 },
      { t: 0.625, part: 0, vel: 0.68 },
      { t: 0.75, part: 1, vel: 0.7 },
      { t: 0.875, part: 0, vel: 0.66 },
    ],
  },

  // Flowing broken chord, up and back down.
  keysBroken: {
    kind: 'keys',
    hits: [
      { t: 0, part: 'bass', vel: 0.92 },
      { t: 0.125, part: 2, vel: 0.7 },
      { t: 0.25, part: 1, vel: 0.72 },
      { t: 0.375, part: 0, vel: 0.78 },
      { t: 0.5, part: 1, vel: 0.7 },
      { t: 0.625, part: 2, vel: 0.68 },
      { t: 0.75, part: 'bass', vel: 0.8 },
      { t: 0.875, part: 2, vel: 0.66 },
    ],
  },

  // Off-the-beat chord stabs over a rooted downbeat — pop and soul comping.
  keysComp: {
    kind: 'keys',
    swing: 0.15,
    hits: [
      { t: 0, part: 'bass', vel: 0.9 },
      { t: 0.1875, part: 'upper', vel: 0.85 },
      { t: 0.375, part: 'upper', vel: 0.7 },
      { t: 0.5, part: 'bass', vel: 0.78 },
      { t: 0.6875, part: 'upper', vel: 0.82 },
      { t: 0.875, part: 'upper', vel: 0.72 },
    ],
  },
};

/** Apply a swing feel to an offbeat position. */
export function swingTime(t, amount, subdivision = 0.125) {
  if (!amount) return t;
  const idx = t / subdivision;
  const isOffbeat = Math.abs((idx % 2) - 1) < 0.01;
  return isOffbeat ? t + subdivision * amount * 0.5 : t;
}

export function getPattern(id) {
  return RHYTHM_PATTERNS[id] || RHYTHM_PATTERNS.straight8;
}
