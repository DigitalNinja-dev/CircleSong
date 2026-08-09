/**
 * Drum grooves.
 *
 * A lane is one voice's row of steps: a digit 1-9 is a hit at that velocity,
 * `.` is a rest. Written this way a groove reads like a drum machine's grid, so
 * the source and the on-screen sequencer show the same thing.
 *
 * `steps` divides one bar, which is what lets a 6/8 groove and a 4/4 groove
 * share a scheduler: the bar's real duration does the rest.
 *
 * Velocity is where a pattern stops sounding like a machine. Ghost notes — the
 * quiet snare taps between backbeats — carry most of the feel in funk and
 * Motown, and the accent pattern on a hi-hat line is what makes it swing or
 * drive. These are written in deliberately, not left flat.
 */

export const DRUM_STYLES = [
  {
    id: 'rockDrive',
    family: 'Rock & Pop',
    label: 'Modern Rock Drive',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      crash: '7...............',
      kick: '9.....7.9.......',
      snare: '....9..2....9...',
      hat: '7.5.7.5.7.5.7.5.',
      openhat: '..............6.',
    },
  },
  {
    id: 'pop16',
    family: 'Rock & Pop',
    label: 'Pop / Funk 16ths',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9....7...8...7..',
      snare: '....9.2.2...9..3',
      hat: '7353635372536353',
    },
  },
  {
    id: 'funkGhost',
    family: 'Funk & Soul',
    label: 'Funk Ghost Notes',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9..7..9....7.9..',
      snare: '..2.9.22..2.9.2.',
      hat: '6353635363536353',
    },
  },
  {
    id: 'indie8',
    family: 'Rock & Pop',
    label: 'Indie Straight-8',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '8...8...8...8...',
      rim: '....7.......7...',
      hat: '6.5.6.5.6.5.6.5.',
    },
  },
  {
    id: 'disco',
    family: 'Electronic & Dance',
    label: 'Disco Four-on-Floor',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9...8...9...8...',
      snare: '....9.......9...',
      hat: '5...5...5...5...',
      openhat: '..7...7...7...7.',
    },
  },
  {
    id: 'reggaeOneDrop',
    family: 'Reggae & Caribbean',
    label: 'Reggae One-Drop',
    kit: 'reggae',
    meters: ['4/4'],
    steps: 16,
    // Beat one is deliberately empty; that silence is the whole feel.
    lanes: {
      kick: '........9.......',
      rim: '........9.......',
      hat: '..5...4...5...4.',
    },
  },
  {
    id: 'reggaeSteppers',
    family: 'Reggae & Caribbean',
    label: 'Reggae Steppers',
    kit: 'reggae',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9...8...9...8...',
      rim: '........9.......',
      hat: '..5...5...5...5.',
      shaker: '..4...4...4...4.',
    },
  },
  {
    id: 'bossa',
    family: 'Latin',
    label: 'Bossa Nova',
    kit: 'jazz',
    meters: ['4/4'],
    steps: 16,
    // Cross-stick plays the 3-2 son clave; ride keeps flat eighths over it.
    lanes: {
      kick: '8.....6.7.....6.',
      rim: '9..7..9...9.7...',
      ride: '5.4.5.4.5.4.5.4.',
    },
  },
  {
    id: 'samba',
    family: 'Latin',
    label: 'Samba',
    kit: 'acoustic',
    meters: ['4/4'],
    steps: 16,
    // The surdo carries samba and it leans on beats 2 and 4, not 1 — that
    // weighting is what stops it sounding like a march. Tamborim plays the
    // teleco-teco figure over a continuous caixa sixteenth.
    lanes: {
      kick: '5...9...5...9...',
      rim: '9..7..9...9.7...',
      shaker: '6454645464546454',
    },
  },
  {
    id: 'sambaPartido',
    family: 'Latin',
    label: 'Partido Alto',
    kit: 'acoustic',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '5...9...5...9...',
      rim: '..9.7..9..9.7..9',
      shaker: '6454645464546454',
      tom: '.......6.......7',
    },
  },
  {
    id: 'cumbiaClasica',
    family: 'Latin',
    label: 'Cumbia Clásica',
    kit: 'acoustic',
    meters: ['4/4'],
    steps: 16,
    // Cumbia's signature is the güira scraping steady eighths over a bass drum
    // on one and three, with the wood/rim answering on the backbeat.
    lanes: {
      kick: '9.......9.......',
      rim: '....8.......8...',
      shaker: '6.4.6.4.6.4.6.4.',
      tom: '..............6.',
    },
  },
  {
    id: 'cumbiaModerna',
    family: 'Latin',
    label: 'Cumbia Moderna',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    // The sonidera variant: same skeleton, busier güira and a tom pickup into
    // the turnaround.
    lanes: {
      kick: '9.....7.9.....7.',
      rim: '....8.......8...',
      shaker: '6454645464546454',
      tom: '............6.8.',
    },
  },
  {
    id: 'merengue',
    family: 'Latin',
    label: 'Merengue',
    kit: 'acoustic',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9...5...9...5...',
      rim: '..7...7...7...7.',
      shaker: '7575757575757575',
    },
  },
  {
    id: 'sonMontuno',
    family: 'Latin',
    label: 'Son Montuno (2-3)',
    kit: 'acoustic',
    meters: ['4/4'],
    steps: 16,
    // Son clave, 2-3 direction: the two-side first, then the three-side.
    lanes: {
      kick: '......8.......8.',
      rim: '....9...9..9..9.',
      shaker: '6.5.6.5.6.5.6.5.',
    },
  },
  {
    id: 'afro68',
    family: 'Latin',
    label: 'Afro-Cuban 6/8',
    kit: 'acoustic',
    meters: ['6/8', '12/8'],
    steps: 12,
    // The 6/8 bell pattern, the backbone of the whole tradition.
    lanes: {
      kick: '8.....7.....',
      rim: '9.87.9.87.9.',
      shaker: '654654654654',
    },
  },
  {
    id: 'blues68',
    family: 'Jazz & Blues',
    label: 'Slow Blues Shuffle',
    kit: 'jazz',
    meters: ['6/8', '12/8'],
    steps: 12,
    // Long-short ride triplets: the shuffle lives in the missing middle note.
    lanes: {
      kick: '8.....7.....',
      snare: '...9.....9..',
      ride: '6.46.46.46.4',
    },
  },
  {
    id: 'jazzSwing',
    family: 'Jazz & Blues',
    label: 'Jazz Swing Ride',
    kit: 'jazz',
    meters: ['4/4', '12/8'],
    steps: 12,
    lanes: {
      kick: '4.....4.....',
      rim: '...7.....7..',
      ride: '7..7.67..7.6',
    },
  },
  {
    id: 'waltz',
    family: 'Acoustic & Folk',
    label: 'Folk Waltz',
    kit: 'acoustic',
    meters: ['3/4'],
    steps: 12,
    // "Boom-chick-chick" — weight on one, brushes on two and three.
    lanes: {
      kick: '9...........',
      snare: '....5...5...',
      hat: '5..35..35..3',
    },
  },
  {
    id: 'ballad68',
    family: 'Acoustic & Folk',
    label: 'Ballad 6/8',
    kit: 'acoustic',
    meters: ['6/8', '3/8', '12/8'],
    steps: 12,
    lanes: {
      kick: '9.....7.....',
      snare: '......9.....',
      hat: '5.45.45.45.4',
    },
  },
  {
    id: 'motown',
    family: 'Funk & Soul',
    label: 'Motown Pocket',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9....7..8.......',
      snare: '....9..2..3.9...',
      shaker: '6.5.6.5.6.5.6.5.',
      hat: '5...5...5...5...',
    },
  },
  {
    id: 'cajon',
    family: 'Acoustic & Folk',
    label: 'Acoustic Cajon',
    kit: 'acoustic',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9....7..8.......',
      snare: '....8..2....8..2',
      shaker: '5353535353535353',
    },
  },
  {
    id: 'lofiSwing',
    family: 'Hip-Hop & Lo-Fi',
    label: 'Lo-Fi Chillhop',
    kit: 'lofi',
    meters: ['4/4'],
    steps: 16,
    swing: 0.3,
    lanes: {
      kick: '8......5..7.....',
      snare: '....7.......7...',
      hat: '5..45..45..45.4.',
    },
  },
  {
    id: 'halfTime',
    family: 'Hip-Hop & Lo-Fi',
    label: 'Half-Time Groove',
    kit: 'lofi',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9.......5..7....',
      snare: '........9.......',
      hat: '6.4.6.4.6.4.6.4.',
    },
  },
  {
    id: 'metalHalf',
    family: 'Metal',
    label: 'Metal Half-Time',
    kit: 'metal',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      crash: '8.......8.......',
      kick: '9.9...9.9...9.9.',
      snare: '........9.......',
      ride: '7...6...7...6...',
    },
  },
  {
    id: 'metalDrive',
    family: 'Metal',
    label: 'Metal Double-Kick',
    kit: 'metal',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9898989898989898',
      snare: '....9.......9...',
      ride: '7.6.7.6.7.6.7.6.',
      crash: '8...............',
    },
  },
  {
    id: 'house',
    family: 'Electronic & Dance',
    label: 'House',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    // Four-on-the-floor with the open hat on every offbeat — that alternation
    // between closed and open is the whole engine of house.
    lanes: {
      kick: '9...9...9...9...',
      clap: '....9.......9...',
      hat: '5...5...5...5...',
      openhat: '..7...7...7...7.',
      shaker: '..4...4...4...4.',
    },
  },
  {
    id: 'deepHouse',
    family: 'Electronic & Dance',
    label: 'Deep House',
    kit: 'lofi',
    meters: ['4/4'],
    steps: 16,
    swing: 0.16,
    lanes: {
      kick: '9...9...9...9...',
      clap: '....8.......8...',
      hat: '..4.5.4...4.5.4.',
      openhat: '......6.......6.',
      rim: '..........5.....',
    },
  },
  {
    id: 'techno',
    family: 'Electronic & Dance',
    label: 'Techno',
    kit: 'metal',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9...9...9...9...',
      hat: '..6...6...6...6.',
      openhat: '..............7.',
      rim: '....7.......7...',
      shaker: '5353535353535353',
    },
  },
  {
    id: 'breakbeat',
    family: 'Electronic & Dance',
    label: 'Breakbeat',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9.....9...9.....',
      snare: '....9.......9..3',
      hat: '6.5.6.5.6.5.6.5.',
    },
  },
  {
    id: 'trap',
    family: 'Hip-Hop & Lo-Fi',
    label: 'Trap',
    kit: 'lofi',
    meters: ['4/4'],
    steps: 16,
    // Rolling hats against a sparse 808 — the roll is the point.
    lanes: {
      kick: '9.......9..7....',
      clap: '........9.......',
      hat: '6353635365656565',
    },
  },
  {
    id: 'boomBap',
    family: 'Hip-Hop & Lo-Fi',
    label: 'Boom Bap',
    kit: 'lofi',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9.....7.9.......',
      snare: '....9.......9...',
      hat: '6.5.6.5.6.5.6.5.',
    },
  },
  {
    id: 'countryTrain',
    family: 'Acoustic & Folk',
    label: 'Country Train',
    kit: 'acoustic',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9...5...9...5...',
      snare: '..6.9.6...6.9.6.',
      hat: '5.5.5.5.5.5.5.5.',
    },
  },
  {
    id: 'punkDbeat',
    family: 'Metal',
    label: 'Punk D-Beat',
    kit: 'metal',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9...9.9.9...9.9.',
      snare: '....9.......9...',
      hat: '6.6.6.6.6.6.6.6.',
    },
  },
  {
    id: 'soca',
    family: 'Reggae & Caribbean',
    label: 'Soca',
    kit: 'reggae',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9...9...9...9...',
      rim: '..7...7...7...7.',
      hat: '5353535353535353',
      openhat: '..............7.',
    },
  },
  {
    id: 'gospelShuffle',
    family: 'Funk & Soul',
    label: 'Gospel Shuffle',
    kit: 'rock',
    meters: ['4/4', '12/8'],
    steps: 12,
    lanes: {
      kick: '8...7.8...7.',
      snare: '...9.....9..',
      hat: '6.46.46.46.4',
    },
  },
];

export const DRUM_STYLE_BY_ID = Object.fromEntries(DRUM_STYLES.map((s) => [s.id, s]));

/** Two-beat fills, keyed by steps-per-bar. Applied to the bar's second half. */
const FILLS = {
  16: { snare: '........5.6.7.8.', tom: '..........7.8.9.', hat: '................' },
  12: { snare: '......5.6.7.', tom: '........8.9.', hat: '............' },
};

/** Styles that fit a given metre; falls back to 4/4 so the list is never empty. */
export function stylesForMeter(timeSig) {
  const matching = DRUM_STYLES.filter((s) => s.meters.includes(timeSig));
  return matching.length ? matching : DRUM_STYLES.filter((s) => s.meters.includes('4/4'));
}

/** Lane string -> array of velocities 0-9, padded to `steps`. */
export function laneToSteps(lane, steps) {
  const out = new Array(steps).fill(0);
  for (let i = 0; i < steps; i++) {
    const ch = lane[i];
    if (!ch || ch === '.') continue;
    const n = Number(ch);
    if (Number.isFinite(n)) out[i] = n;
  }
  return out;
}

/**
 * Expand a style into the editable grid the sequencer plays and the UI shows.
 * Every voice gets a lane, so a row can be drawn on even if the style left it
 * empty.
 */
export function styleToPattern(style, voices) {
  const lanes = {};
  for (const voice of voices) {
    lanes[voice] = laneToSteps(style.lanes[voice] || '', style.steps);
  }
  return { steps: style.steps, swing: style.swing || 0, lanes };
}

/** Group styles by family, preserving each family's first-seen order. */
export function stylesByFamily(styles) {
  const groups = new Map();
  for (const style of styles) {
    const key = style.family || 'Other';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(style);
  }
  return [...groups.entries()];
}

/**
 * Nudge a groove into a variation of itself.
 *
 * Deliberately not random: random edits to a drum pattern almost always sound
 * worse, because the strong beats are what make it a groove at all. So the
 * anchors — the downbeat kick and the backbeat snare — are left alone, and
 * changes are limited to the moves a drummer actually makes: adding or dropping
 * a ghost note, displacing a syncopated kick, opening a hat into the turnaround.
 */
export function varyPattern(pattern) {
  const steps = pattern.steps;
  const lanes = {};
  for (const [k, v] of Object.entries(pattern.lanes)) lanes[k] = v.slice();

  const quarter = Math.max(1, Math.round(steps / 4));
  const isDownbeat = (i) => i === 0;
  const isBackbeat = (i) => i === quarter || i === quarter * 3;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const weakSteps = [];
  for (let i = 0; i < steps; i++) if (!isDownbeat(i) && !isBackbeat(i)) weakSteps.push(i);

  const moves = [
    // A ghost note: quiet, always off the strong beats.
    () => {
      if (!lanes.snare) return;
      const i = pick(weakSteps.filter((x) => x % quarter !== 0));
      if (i === undefined) return;
      lanes.snare[i] = lanes.snare[i] ? 0 : 2;
    },
    // Move a syncopated kick, never the one on the downbeat.
    () => {
      if (!lanes.kick) return;
      const candidates = weakSteps.filter((x) => lanes.kick[x] > 0);
      const empties = weakSteps.filter((x) => !lanes.kick[x]);
      if (candidates.length && empties.length && Math.random() < 0.6) {
        const from = pick(candidates);
        const to = pick(empties);
        lanes.kick[to] = lanes.kick[from];
        lanes.kick[from] = 0;
      } else if (empties.length) {
        lanes.kick[pick(empties)] = 6;
      }
    },
    // Open the hat late in the bar, which is where a drummer opens it.
    () => {
      if (!lanes.openhat) return;
      const i = steps - Math.max(1, Math.round(steps / 8));
      lanes.openhat[i] = lanes.openhat[i] ? 0 : 6;
    },
    // Shift a hi-hat accent so the line breathes differently.
    () => {
      const lane = lanes.hat || lanes.ride || lanes.shaker;
      if (!lane) return;
      const active = [];
      for (let i = 0; i < steps; i++) if (lane[i]) active.push(i);
      if (active.length < 2) return;
      const i = pick(active);
      lane[i] = lane[i] >= 7 ? 4 : 7;
    },
  ];

  const count = 2 + Math.floor(Math.random() * 2);
  for (let n = 0; n < count; n++) pick(moves)();

  return { ...pattern, lanes };
}

/**
 * Turn a grid into scheduled hits.
 * @returns {Array<{voice:string, t:number, velocity:number}>} `t` is a fraction
 *   of the bar, so the caller multiplies by the bar's real duration.
 */
export function patternHits(pattern, { fill = false } = {}) {
  const { steps, swing = 0 } = pattern;
  const lanes = { ...pattern.lanes };

  if (fill) {
    const f = FILLS[steps];
    if (f) {
      const half = Math.floor(steps / 2);
      for (const [voice, lane] of Object.entries(f)) {
        const base = (lanes[voice] || new Array(steps).fill(0)).slice();
        const replacement = laneToSteps(lane, steps);
        for (let i = half; i < steps; i++) base[i] = replacement[i];
        lanes[voice] = base;
      }
      // Cymbals step aside so the fill reads clearly.
      for (const voice of ['hat', 'openhat', 'ride', 'shaker']) {
        if (!lanes[voice]) continue;
        const lane = lanes[voice].slice();
        for (let i = half; i < steps; i++) lane[i] = 0;
        lanes[voice] = lane;
      }
    }
  }

  const hits = [];
  for (const [voice, lane] of Object.entries(lanes)) {
    if (!lane) continue;
    for (let i = 0; i < steps; i++) {
      const vel = lane[i];
      if (!vel) continue;
      let t = i / steps;
      if (swing && i % 2 === 1) t += (swing * 0.5) / steps;
      hits.push({ voice, t, velocity: vel / 9 });
    }
  }
  return hits.sort((a, b) => a.t - b.t);
}
