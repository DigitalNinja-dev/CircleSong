/**
 * Drum patterns.
 *
 * A pattern is a set of voice lanes. Each lane is a string of steps where a
 * digit 1-9 is a hit at that velocity (9 loudest) and `.` is a rest, so a
 * groove reads like a drum machine's grid rather than like an array literal.
 *
 * `steps` is how many subdivisions fill one bar, which is what lets a 6/8
 * pattern and a 4/4 pattern share the same scheduler: the bar is divided into
 * `steps`, whatever its length in seconds.
 */

export const DRUM_STYLES = [
  {
    id: 'rockDrive',
    label: 'Modern Rock Drive',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9...' + '..7.' + '8...' + '....',
      snare: '....' + '8...' + '....' + '8...',
      hat: '6.5.' + '6.5.' + '6.5.' + '6.5o',
    },
  },
  {
    id: 'pop16',
    label: 'Pop / Funk 16ths',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9...' + '..6.' + '.8..' + '..5.',
      snare: '....' + '8...' + '....' + '8..3',
      hat: '7353' + '7353' + '7353' + '7353',
    },
  },
  {
    id: 'indie8',
    label: 'Indie Straight-8',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '8...' + '8...' + '8...' + '8...',
      rim: '....' + '7...' + '....' + '7...',
      hat: '6.6.' + '6.6.' + '6.6.' + '6.6.',
    },
  },
  {
    id: 'reggaeOneDrop',
    label: 'Reggae One-Drop',
    kit: 'reggae',
    meters: ['4/4'],
    steps: 16,
    // Beat 1 is deliberately empty — that silence is the whole point of the feel.
    lanes: {
      kick: '....' + '....' + '9...' + '....',
      rim: '....' + '....' + '9...' + '....',
      hat: '..6.' + '..6.' + '..6.' + '..6.',
    },
  },
  {
    id: 'bossa',
    label: 'Bossa Nova',
    kit: 'jazz',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '7...' + '..5.' + '7...' + '..5.',
      rim: '..6.' + '6...' + '...6' + '.6..',
      ride: '5.4.' + '5.4.' + '5.4.' + '5.4.',
    },
  },
  {
    id: 'afro68',
    label: 'Afro-Cuban 6/8',
    kit: 'acoustic',
    meters: ['6/8', '12/8'],
    steps: 12,
    lanes: {
      kick: '8..' + '...' + '7..' + '...',
      rim: '..6' + '.6.' + '..6' + '6..',
      shaker: '654' + '654' + '654' + '654',
    },
  },
  {
    id: 'blues68',
    label: 'Slow Blues Shuffle',
    kit: 'jazz',
    meters: ['6/8', '12/8'],
    steps: 12,
    lanes: {
      kick: '8..' + '...' + '7..' + '...',
      snare: '...' + '8..' + '...' + '8..',
      ride: '6.4' + '6.4' + '6.4' + '6.4',
    },
  },
  {
    id: 'waltz',
    label: 'Folk Waltz',
    kit: 'acoustic',
    meters: ['3/4'],
    steps: 12,
    // "boom-chick-chick": weight on one, brushes on two and three.
    lanes: {
      kick: '9...' + '....' + '....',
      snare: '....' + '5...' + '5...',
      hat: '5..3' + '5..3' + '5..3',
    },
  },
  {
    id: 'motown',
    label: 'Motown Pocket',
    kit: 'rock',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9...' + '..5.' + '7...' + '....',
      snare: '....' + '8..2' + '..3.' + '8...',
      hat: '6464' + '6464' + '6464' + '6464',
    },
  },
  {
    id: 'cajon',
    label: 'Acoustic Cajon',
    kit: 'acoustic',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9...' + '..5.' + '8...' + '....',
      snare: '....' + '7...' + '....' + '7...',
      shaker: '5353' + '5353' + '5353' + '5353',
    },
  },
  {
    id: 'lofiSwing',
    label: 'Lo-Fi Chillhop',
    kit: 'lofi',
    meters: ['4/4'],
    steps: 16,
    swing: 0.28,
    lanes: {
      kick: '8...' + '...5' + '..7.' + '....',
      snare: '....' + '7...' + '....' + '7...',
      hat: '5..4' + '5..4' + '5..4' + '5.4.',
    },
  },
  {
    id: 'metalHalf',
    label: 'Metal Half-Time',
    kit: 'metal',
    meters: ['4/4'],
    steps: 16,
    lanes: {
      kick: '9.9.' + '..9.' + '9...' + '9.9.',
      snare: '....' + '....' + '9...' + '....',
      ride: '7...' + '6...' + '7...' + '6...',
    },
  },
];

/** Two-beat fills, played at the end of a phrase. Keyed by steps-per-bar. */
const FILLS = {
  16: { snare: '........' + '5768', tom: '........' + '..7.', hat: '............' },
  12: { snare: '......' + '5768', tom: '......' + '..7.', hat: '............' },
};

export const DRUM_STYLE_BY_ID = Object.fromEntries(DRUM_STYLES.map((s) => [s.id, s]));

/** Styles that make sense in a given time signature. */
export function stylesForMeter(timeSig) {
  const matching = DRUM_STYLES.filter((s) => s.meters.includes(timeSig));
  return matching.length ? matching : DRUM_STYLES.filter((s) => s.meters.includes('4/4'));
}

/**
 * Expand a pattern into scheduled hits.
 * @returns {Array<{voice:string, t:number, velocity:number}>} `t` is a
 *   fraction of the bar, so the caller multiplies by the bar's real duration.
 */
export function patternHits(style, { fill = false } = {}) {
  const hits = [];
  const steps = style.steps;
  const swing = style.swing || 0;

  const lanes = { ...style.lanes };
  if (fill) {
    const f = FILLS[steps];
    if (f) {
      // A fill replaces the second half of the bar, keeping the groove's first half.
      for (const [voice, lane] of Object.entries(f)) {
        const existing = (lanes[voice] || '.'.repeat(steps)).padEnd(steps, '.');
        lanes[voice] = existing.slice(0, steps / 2) + lane.padEnd(steps, '.').slice(steps / 2, steps);
      }
      // Cymbals and hats step aside so the fill reads clearly.
      if (lanes.hat) lanes.hat = lanes.hat.slice(0, steps / 2) + '.'.repeat(steps / 2);
    }
  }

  for (const [voice, lane] of Object.entries(lanes)) {
    for (let i = 0; i < steps; i++) {
      const ch = lane[i];
      if (!ch || ch === '.') continue;

      // `o` marks an open hi-hat at a fixed level; digits are velocities.
      const isOpen = ch === 'o';
      const velocity = isOpen ? 0.7 : Number(ch) / 9;
      if (!isOpen && !Number.isFinite(velocity)) continue;

      let t = i / steps;
      // Swing delays every second subdivision.
      if (swing && i % 2 === 1) t += (swing * 0.5) / steps;

      hits.push({ voice: isOpen ? 'openhat' : voice, t, velocity });
    }
  }

  return hits.sort((a, b) => a.t - b.t);
}
