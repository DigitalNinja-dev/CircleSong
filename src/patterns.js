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

// Strum / rhythm patterns.
//
// A hit's `t` is a fraction of the bar (0..1). `vel` is relative velocity,
// `mute` is fret-hand damping (0 = let ring, 1 = fully choked), `spread` is
// how long the pick takes to cross the strings, in seconds.
//
// Three further fields describe things a player does constantly that a bare
// down/up/velocity model cannot say at all, and whose absence was the reason
// two patterns as different as a reggae skank and a ska stroke came out
// identical here:
//
//   `strings` — which part of the voicing the stroke actually catches. Reggae
//     and ska chop the top three and leave the low end to the bass; Freddie
//     Green comping lives on the inner strings; boom-chick alternates a single
//     bass note against a chord on the backbeat. 'all' is the default.
//   `choke`   — how long the chord rings, **in beats**, before the fret hand
//     stops it. The staccato stop is the whole character of a chop, and beats
//     rather than seconds is right because a player thinks in note values: the
//     same figure rings longer at 70 BPM than at 160.
//   `ghost`   — a fully damped stroke that sounds as percussion rather than
//     pitch. The scratches between the chords are most of what makes funk and
//     disco read as funk and disco.
//
// Arp patterns pick individual strings instead: `pick` is either 'bass'
// (lowest sounding string) or an index counted down from the highest sounding
// string, so a pattern works with any voicing.
//
// `tempo: [lo, hi]` is the range a feel actually lives in. It is advice, shown
// next to the pattern and applied only when asked for — never silently.

export const RHYTHMS = [
  { id: 'straight8', label: 'Straight 8ths', tag: 'strum' },
  { id: 'pop16', label: '16th Pop Strum', tag: 'strum' },
  { id: 'folkDDU', label: 'Folk D-DU-UDU', tag: 'strum' },
  { id: 'driving16', label: 'Driving 16ths', tag: 'strum' },
  { id: 'anthemic', label: 'Anthem Half-Time', tag: 'strum' },
  { id: 'punkDown', label: 'Punk Downstrokes', tag: 'strum' },
  { id: 'muteChuck', label: 'Muted Chuck', tag: 'percussive' },
  { id: 'funk16', label: 'Funk 16ths', tag: 'percussive' },
  { id: 'discoChank', label: 'Disco Chank', tag: 'percussive' },
  { id: 'reggaeSkank', label: 'Reggae Skank', tag: 'offbeat' },
  { id: 'oneDrop', label: 'One Drop', tag: 'offbeat' },
  { id: 'rocksteady', label: 'Rocksteady', tag: 'offbeat' },
  { id: 'skaUpstroke', label: 'Ska Upstrokes', tag: 'offbeat' },
  { id: 'skaBubble', label: 'Ska Bubble (16ths)', tag: 'offbeat' },
  { id: 'jazzSwing', label: 'Jazz Swing', tag: 'comp' },
  { id: 'charleston', label: 'Charleston Comp', tag: 'comp' },
  { id: 'bossa', label: 'Bossa Nova', tag: 'syncop' },
  { id: 'rumba', label: 'Rumba Clave', tag: 'syncop' },
  { id: 'rumbaFlamenca', label: 'Rumba Flamenca', tag: 'syncop' },
  { id: 'boomChick', label: 'Country Boom-Chick', tag: 'country' },
  { id: 'bluegrass', label: 'Bluegrass Boom-Chuck', tag: 'country' },
  { id: 'waltzStrum', label: 'Waltz Strum', tag: '3/4' },
  { id: 'ballad68', label: 'Ballad 6/8', tag: '6/8' },
  { id: 'blues128', label: 'Slow Blues 12/8', tag: '6/8' },
  { id: 'fingerstyle', label: 'Fingerstyle Arp', tag: 'arp' },
  { id: 'travis', label: 'Travis Picking', tag: 'arp' },
  { id: 'arpUp', label: 'Rising Arpeggio', tag: 'arp' },
  { id: 'wholeNote', label: 'Let Ring', tag: 'sustain' },
  { id: 'keysBlock', label: 'Block Chords', tag: 'keys' },
  { id: 'keysBallad', label: 'Ballad Left Hand', tag: 'keys' },
  { id: 'keysAlberti', label: 'Alberti Bass', tag: 'keys' },
  { id: 'keysBroken', label: 'Broken Chord', tag: 'keys' },
  { id: 'keysComp', label: 'Comping Stabs', tag: 'keys' },
  { id: 'organBubble', label: 'Reggae Organ Bubble', tag: 'keys' },
];

const d = (t, vel = 0.85, extra = {}) => ({ t, dir: 'D', vel, mute: 0, spread: 0.024, ...extra });
const u = (t, vel = 0.7, extra = {}) => ({ t, dir: 'U', vel, mute: 0, spread: 0.018, ...extra });

/** A dead, percussive stroke: no pitch to speak of, all scrape. */
const ghost = (t, dir = 'D', vel = 0.32) => ({
  t, dir, vel, mute: 1, spread: 0.008, ghost: true, strings: 'top4', choke: 0.12,
});

export const RHYTHM_PATTERNS = {
  // Down on the beat, up on the "and". Accented on 1 and 3.
  straight8: {
    kind: 'strum',
    tempo: [70, 140],
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
    tempo: [80, 130],
    hits: [
      d(0, 1.0),
      d(0.25, 0.85),
      u(0.375, 0.72),
      u(0.625, 0.68),
      d(0.75, 0.88),
      u(0.875, 0.7),
    ],
  },

  /**
   * The skank: an upstroke on every offbeat, hard on the ones after 2 and 4.
   *
   * Three details make it reggae rather than "a strum on the upbeat". It is
   * played on the top three strings only — the low end belongs to the bass, and
   * a guitarist who strums all six is the single most common way this goes
   * wrong. It is stopped almost immediately, so what you hear is a chord-shaped
   * click. And it is slow: roots reggae lives around 70-78 BPM, which is what
   * gives each chop room to be heard as its own event.
   */
  reggaeSkank: {
    kind: 'strum',
    tempo: [65, 90],
    hits: [
      u(0.125, 0.8, { mute: 0.55, spread: 0.011, strings: 'top3', choke: 0.35 }),
      u(0.375, 0.95, { mute: 0.55, spread: 0.011, strings: 'top3', choke: 0.35 }),
      u(0.625, 0.8, { mute: 0.55, spread: 0.011, strings: 'top3', choke: 0.35 }),
      u(0.875, 0.95, { mute: 0.55, spread: 0.011, strings: 'top3', choke: 0.35 }),
    ],
  },

  /**
   * One drop: the afterbeat alone, on 2 and 4, with beat 1 left empty.
   *
   * The name is the drummer's — the kick is dropped from beat 1 — but the
   * guitar figure that goes with it is this: no downbeat at all, just two
   * chops. It is the emptiest thing in this list and the hardest to sit still
   * inside.
   */
  oneDrop: {
    kind: 'strum',
    tempo: [65, 80],
    hits: [
      u(0.25, 0.95, { mute: 0.5, spread: 0.013, strings: 'top3', choke: 0.55 }),
      u(0.75, 0.95, { mute: 0.5, spread: 0.013, strings: 'top3', choke: 0.55 }),
    ],
  },

  /**
   * Rocksteady: the step between ska and reggae, and it sounds like it.
   *
   * Slower than ska, heavier than a skank, and with a little shuffle left over
   * from the ska it came out of. Four strings rather than three, and allowed to
   * ring about twice as long.
   */
  rocksteady: {
    kind: 'strum',
    tempo: [76, 100],
    swing: 0.14,
    hits: [
      u(0.125, 0.85, { mute: 0.4, spread: 0.014, strings: 'top4', choke: 0.6 }),
      u(0.375, 0.95, { mute: 0.4, spread: 0.014, strings: 'top4', choke: 0.6 }),
      u(0.625, 0.85, { mute: 0.4, spread: 0.014, strings: 'top4', choke: 0.6 }),
      u(0.875, 0.95, { mute: 0.4, spread: 0.014, strings: 'top4', choke: 0.6 }),
    ],
  },

  /**
   * Freddie Green style: short comps on 2 and 4, swung.
   *
   * Played on the inner strings. A big-band rhythm guitarist is competing with
   * a bass player below and a horn section above, and the way through is to
   * occupy neither — three or four middle strings, every chord clipped.
   */
  jazzSwing: {
    kind: 'strum',
    tempo: [110, 220],
    swing: 0.33,
    hits: [
      d(0.25, 0.9, { mute: 0.35, spread: 0.03, strings: 'mid', choke: 0.7 }),
      u(0.4375, 0.5, { mute: 0.45, strings: 'mid', choke: 0.5 }),
      d(0.75, 0.95, { mute: 0.35, spread: 0.03, strings: 'mid', choke: 0.7 }),
      u(0.9375, 0.5, { mute: 0.45, strings: 'mid', choke: 0.5 }),
    ],
  },

  /**
   * Bossa comp: bass-anchored and syncopated, let ring.
   *
   * The thumb keeps the bass on 1 and 3 while the fingers place the chord off
   * the beat — so the downbeats here are a bass note, not a strum.
   */
  bossa: {
    kind: 'strum',
    tempo: [110, 150],
    hits: [
      d(0, 0.9, { strings: 'bass', spread: 0 }),
      d(0.375, 0.75, { spread: 0.02, strings: 'top4' }),
      d(0.5, 0.85, { strings: 'bass2', spread: 0 }),
      d(0.875, 0.7, { spread: 0.02, strings: 'top4' }),
    ],
  },

  // Travis-ish alternating-bass fingerpicking.
  fingerstyle: {
    kind: 'arp',
    tempo: [70, 120],
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
    tempo: [75, 130],
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
    tempo: [90, 150],
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
    tempo: [65, 100],
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
    tempo: [85, 130],
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

  /**
   * Ska: the same gesture as the skank, at twice the speed and half the ring.
   *
   * This pattern and `reggaeSkank` used to be identical — same four positions,
   * a different label — which is exactly the confusion the two genres invite,
   * because the stroke really is the same one. What separates them is
   * everything around it: ska runs at 140-180 BPM against reggae's 65-90, every
   * chop is even and hard rather than leaning on 2 and 4, the ring is cut to a
   * third as long, and the fret hand mutes less so the chord stays bright
   * enough to cut through a horn section.
   *
   * If you are writing at a slow tempo and want this feel, either take the
   * tempo hint or switch the Feel control to double-time — which is the same
   * insight, applied to any pattern.
   */
  skaUpstroke: {
    kind: 'strum',
    tempo: [140, 180],
    hits: [
      u(0.125, 0.95, { mute: 0.28, spread: 0.008, strings: 'top4', choke: 0.22 }),
      u(0.375, 0.95, { mute: 0.28, spread: 0.008, strings: 'top4', choke: 0.22 }),
      u(0.625, 0.95, { mute: 0.28, spread: 0.008, strings: 'top4', choke: 0.22 }),
      u(0.875, 0.95, { mute: 0.28, spread: 0.008, strings: 'top4', choke: 0.22 }),
    ],
  },

  /**
   * The bubble: 16th-note upstrokes on the "and" and the "a" of every beat.
   *
   * A dancehall and late-ska device, and the way to get a ska bounce out of a
   * slow written tempo without moving the transport — eight chops a bar instead
   * of four, each one shorter still.
   */
  skaBubble: {
    kind: 'strum',
    tempo: [70, 105],
    hits: [
      u(0.125, 0.9, { mute: 0.35, spread: 0.007, strings: 'top3', choke: 0.12 }),
      u(0.1875, 0.62, { mute: 0.45, spread: 0.007, strings: 'top3', choke: 0.12 }),
      u(0.375, 0.9, { mute: 0.35, spread: 0.007, strings: 'top3', choke: 0.12 }),
      u(0.4375, 0.62, { mute: 0.45, spread: 0.007, strings: 'top3', choke: 0.12 }),
      u(0.625, 0.9, { mute: 0.35, spread: 0.007, strings: 'top3', choke: 0.12 }),
      u(0.6875, 0.62, { mute: 0.45, spread: 0.007, strings: 'top3', choke: 0.12 }),
      u(0.875, 0.9, { mute: 0.35, spread: 0.007, strings: 'top3', choke: 0.12 }),
      u(0.9375, 0.62, { mute: 0.45, spread: 0.007, strings: 'top3', choke: 0.12 }),
    ],
  },

  // The Charleston figure: beat one and the "and" of two. Endlessly useful.
  charleston: {
    kind: 'strum',
    tempo: [100, 180],
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
    tempo: [95, 140],
    hits: [
      d(0, 0.95),
      d(0.1875, 0.7),
      d(0.375, 0.8),
      d(0.625, 0.75),
      d(0.75, 0.85),
    ],
  },

  /**
   * Rumba flamenca. Notated in 4/4 but felt as 3+3+2, which is why the accents
   * land on 1, the upbeat of 2, and 4 rather than on the backbeat — and why it
   * drives the way it does. The stroke on 1 stands in for the golpe, the finger
   * tap on the soundboard that a flamenco player uses to mark it.
   */
  rumbaFlamenca: {
    kind: 'strum',
    tempo: [90, 130],
    hits: [
      d(0, 1.0, { spread: 0.03 }),
      ghost(0.25, 'U', 0.3),
      u(0.375, 0.9, { spread: 0.016 }),
      ghost(0.5, 'D', 0.34),
      u(0.625, 0.6, { spread: 0.016, mute: 0.25 }),
      d(0.75, 0.92, { spread: 0.026 }),
      u(0.875, 0.68, { spread: 0.016 }),
    ],
  },

  /**
   * Country boom-chick: bass note on 1 and 3, chord on 2 and 4.
   *
   * The "boom" is a single string, not a strum — that separation of a bass note
   * from the chord above it is the whole idiom, and it is why this needs the
   * per-stroke string selection rather than a velocity curve.
   */
  boomChick: {
    kind: 'strum',
    tempo: [90, 140],
    hits: [
      d(0, 0.95, { strings: 'bass', spread: 0 }),
      d(0.25, 0.85, { strings: 'top4' }),
      u(0.375, 0.6, { strings: 'top3' }),
      d(0.5, 0.9, { strings: 'bass2', spread: 0 }),
      d(0.75, 0.85, { strings: 'top4' }),
      u(0.875, 0.6, { strings: 'top3' }),
    ],
  },

  /**
   * Bluegrass boom-chuck: the same idea driven harder, with the bass note
   * alternating between the root and the fifth and the backbeat chords cut
   * short into a "chuck".
   */
  bluegrass: {
    kind: 'strum',
    tempo: [110, 180],
    hits: [
      d(0, 1.0, { strings: 'bass', spread: 0 }),
      d(0.25, 0.9, { strings: 'top4', mute: 0.3, spread: 0.014, choke: 0.5 }),
      d(0.5, 0.95, { strings: 'bass2', spread: 0 }),
      d(0.75, 0.9, { strings: 'top4', mute: 0.3, spread: 0.014, choke: 0.5 }),
    ],
  },

  /**
   * Funk 16ths: two chords and a lot of nothing, with the hand still moving.
   *
   * The strumming hand never stops — it plays every 16th — but only a few of
   * those strokes touch a fretted chord. The rest are dead strokes, and they
   * are what the groove is actually made of.
   */
  funk16: {
    kind: 'strum',
    tempo: [95, 120],
    hits: [
      d(0, 0.95, { strings: 'top4', choke: 0.4, spread: 0.012 }),
      ghost(0.0625, 'U'),
      ghost(0.125, 'D'),
      u(0.1875, 0.75, { strings: 'top3', choke: 0.3, spread: 0.01 }),
      ghost(0.25, 'D'),
      ghost(0.3125, 'U'),
      d(0.375, 0.9, { strings: 'top4', choke: 0.35, spread: 0.012 }),
      ghost(0.4375, 'U'),
      ghost(0.5, 'D'),
      ghost(0.5625, 'U'),
      d(0.625, 0.85, { strings: 'top4', choke: 0.35, spread: 0.012 }),
      u(0.6875, 0.7, { strings: 'top3', choke: 0.3, spread: 0.01 }),
      ghost(0.75, 'D'),
      ghost(0.8125, 'U'),
      d(0.875, 0.8, { strings: 'top4', choke: 0.4, spread: 0.012 }),
      ghost(0.9375, 'U'),
    ],
  },

  /**
   * Disco chank: a bright, even 16th chord on the top strings, cut short every
   * time. The stiffness is the point — this one does not swing at all.
   */
  discoChank: {
    kind: 'strum',
    tempo: [100, 128],
    hits: [
      d(0.125, 0.85, { strings: 'top3', choke: 0.18, spread: 0.008 }),
      u(0.1875, 0.7, { strings: 'top3', choke: 0.18, spread: 0.008 }),
      d(0.375, 0.9, { strings: 'top3', choke: 0.18, spread: 0.008 }),
      u(0.4375, 0.7, { strings: 'top3', choke: 0.18, spread: 0.008 }),
      d(0.625, 0.85, { strings: 'top3', choke: 0.18, spread: 0.008 }),
      u(0.6875, 0.7, { strings: 'top3', choke: 0.18, spread: 0.008 }),
      d(0.875, 0.9, { strings: 'top3', choke: 0.18, spread: 0.008 }),
      u(0.9375, 0.72, { strings: 'top3', choke: 0.18, spread: 0.008 }),
    ],
  },

  /** Punk: eighth notes, all downstrokes, no upstroke anywhere. That is it. */
  punkDown: {
    kind: 'strum',
    tempo: [150, 200],
    hits: [
      d(0, 1.0, { spread: 0.01 }),
      d(0.125, 0.9, { spread: 0.01 }),
      d(0.25, 0.95, { spread: 0.01 }),
      d(0.375, 0.9, { spread: 0.01 }),
      d(0.5, 1.0, { spread: 0.01 }),
      d(0.625, 0.9, { spread: 0.01 }),
      d(0.75, 0.95, { spread: 0.01 }),
      d(0.875, 0.9, { spread: 0.01 }),
    ],
  },

  /**
   * Slow blues in 12/8: four dotted beats, each one a triplet. Written against
   * a 12/8 bar, so the twelve positions are the twelve eighth notes.
   */
  blues128: {
    kind: 'strum',
    tempo: [50, 80],
    hits: [
      d(0, 1.0, { spread: 0.034 }),
      u(0.1667, 0.5, { mute: 0.3 }),
      d(0.25, 0.8, { spread: 0.026 }),
      u(0.4167, 0.5, { mute: 0.3 }),
      d(0.5, 0.92, { spread: 0.03 }),
      u(0.6667, 0.5, { mute: 0.3 }),
      d(0.75, 0.82, { spread: 0.026 }),
      u(0.9167, 0.58, { mute: 0.3 }),
    ],
  },

  // 3/4: down on one, lighter strokes on two and three.
  waltzStrum: {
    kind: 'strum',
    tempo: [90, 180],
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
    tempo: [50, 90],
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
    tempo: [80, 130],
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
    tempo: [70, 120],
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
  /**
   * The organ bubble: reggae's other offbeat instrument.
   *
   * The bubble is a Hammond figure before it is a guitar one — the left hand
   * plays the offbeat and the right answers on the 16th after it, and the
   * shuffle between them is what makes it breathe. On the keyboard presets this
   * is the reggae pattern to reach for; the skank belongs to the guitar.
   */
  organBubble: {
    kind: 'keys',
    tempo: [65, 95],
    swing: 0.2,
    hits: [
      { t: 0.125, part: 'upper', vel: 0.85 },
      { t: 0.1875, part: 'bass', vel: 0.6 },
      { t: 0.375, part: 'upper', vel: 0.95 },
      { t: 0.4375, part: 'bass', vel: 0.6 },
      { t: 0.625, part: 'upper', vel: 0.85 },
      { t: 0.6875, part: 'bass', vel: 0.6 },
      { t: 0.875, part: 'upper', vel: 0.95 },
      { t: 0.9375, part: 'bass', vel: 0.6 },
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

/**
 * Which strings a stroke catches, given the strings this voicing actually uses.
 *
 * `sounding` is in string order, lowest first. Everything is expressed relative
 * to the ends rather than to absolute string numbers, so a pattern written for
 * a six-string barre still does the right thing on a four-note voicing.
 */
export function selectStrings(spec, sounding) {
  const n = sounding.length;
  if (!spec || spec === 'all' || n === 0) return sounding;
  switch (spec) {
    case 'bass':
      return sounding.slice(0, 1);
    case 'bass2':
      // The alternating bass note: the next string up, or the root again when
      // the voicing has nothing else down there.
      return n > 1 ? sounding.slice(1, 2) : sounding.slice(0, 1);
    case 'low2':
      return sounding.slice(0, Math.min(2, n));
    case 'mid':
      return n <= 4 ? sounding : sounding.slice(1, n - 1);
    case 'top2':
      return sounding.slice(Math.max(0, n - 2));
    case 'top3':
      return sounding.slice(Math.max(0, n - 3));
    case 'top4':
      return sounding.slice(Math.max(0, n - 4));
    default:
      return sounding;
  }
}

/** The three feels, as offered in the Tone panel. */
export const FEELS = [
  { id: 'straight', label: 'Straight', note: 'The pattern as written.' },
  {
    id: 'double',
    label: 'Double-time',
    note: 'Twice the density at the same tempo — a skank becomes ska.',
  },
  {
    id: 'half',
    label: 'Half-time',
    note: 'The figure stretched across two bars. Everything gets heavier.',
  },
];

/**
 * Re-time a pattern into double-time or half-time.
 *
 * This is the general form of the thing that separates ska from reggae: the
 * same gesture, twice as often. Double-time folds the bar into its first half
 * and plays it twice; half-time stretches it over two bars and hands back the
 * half belonging to this one. `choke` is in beats, so it scales with the
 * figure; `spread` is in seconds and does not — a hand crosses the strings at
 * the speed it crosses them, whatever the feel.
 *
 * @param {Array<object>} events hits or picks — anything carrying a `t`
 * @param {'straight'|'double'|'half'} feel
 * @param {number} bar index of the bar being scheduled, for half-time
 */
export function applyFeel(events, feel, bar = 0) {
  if (!feel || feel === 'straight') return events;

  if (feel === 'double') {
    const out = [];
    for (const half of [0, 0.5]) {
      for (const e of events) {
        out.push({ ...e, t: e.t / 2 + half, choke: e.choke ? e.choke / 2 : e.choke });
      }
    }
    return out;
  }

  const from = bar % 2 === 0 ? 0 : 0.5;
  return events
    .filter((e) => e.t >= from - 1e-9 && e.t < from + 0.5)
    .map((e) => ({ ...e, t: (e.t - from) * 2, choke: e.choke ? e.choke * 2 : e.choke }));
}

/** The tempo range a pattern is written for, or null when it does not care. */
export function patternTempo(id) {
  const p = RHYTHM_PATTERNS[id];
  return p && p.tempo ? p.tempo : null;
}
