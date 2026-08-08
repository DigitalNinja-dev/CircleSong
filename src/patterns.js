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
  { id: 'reggaeSkank', label: 'Reggae Skank', tag: 'offbeat' },
  { id: 'jazzSwing', label: 'Jazz Swing', tag: 'comp' },
  { id: 'bossa', label: 'Bossa Nova', tag: 'syncop' },
  { id: 'fingerstyle', label: 'Fingerstyle Arp', tag: 'arp' },
  { id: 'wholeNote', label: 'Let Ring', tag: 'sustain' },
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

  // One slow strum per bar for auditioning voicings.
  wholeNote: {
    kind: 'strum',
    hits: [d(0, 0.95, { spread: 0.05 })],
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
