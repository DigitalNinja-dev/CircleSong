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
    id: 'sambaLite',
    label: 'Samba (light)',
    kit: 'acoustic',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9..7.9..9..7.9..',
      rim: '..6..6..6..6..6.',
      shaker: '6454645464546454',
    },
  },
  {
    id: 'afro68',
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
