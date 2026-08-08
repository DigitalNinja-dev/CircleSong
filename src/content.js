// Editorial content: harmonic-function copy, mode lessons, and the rule-based
// songwriting suggestions. Ported from the CircleSong design prototype.

export const FUNCTION_NAMES = [
  'Tonic',
  'Supertonic',
  'Mediant',
  'Subdominant',
  'Dominant',
  'Submediant',
  'Leading Tone',
];

export const FUNCTION_BLURB = [
  'Home base — the point of rest the progression resolves to.',
  'Often leads toward the dominant; sets up motion away from home.',
  'Colors the tonic, blending stability with subtle tension.',
  'Pulls away from home and opens the door to the dominant.',
  'Strongest pull back to the tonic — the engine of resolution.',
  'A gentle detour from the tonic, often feels wistful or reflective.',
  'Maximum tension — wants urgently to resolve back to the tonic.',
];

export const MODE_INFO = [
  {
    alsoKnown: 'Major scale',
    formula: 'W-W-H-W-W-W-H',
    mood: 'Bright, resolved, happy',
    use: 'The default major-key sound — home base for pop, country, and classical.',
    vampDegrees: [0, 3, 4, 0],
  },
  {
    alsoKnown: '',
    formula: 'W-H-W-W-W-H-W',
    mood: 'Minor but hopeful, moody without being sad',
    use: 'The major 6th is the giveaway — vamp i–IV for a jazzy, less melancholic minor sound (Santana, Radiohead).',
    vampDegrees: [0, 3],
  },
  {
    alsoKnown: '',
    formula: 'H-W-W-W-H-W-W',
    mood: 'Dark, exotic, tense',
    use: 'The ♭2 gives it away — vamp i–♭II for a flamenco or metal flavor.',
    vampDegrees: [0, 1],
  },
  {
    alsoKnown: '',
    formula: 'W-W-W-H-W-W-H',
    mood: 'Dreamy, floating, cinematic',
    use: 'The ♯4 makes it float above plain major — vamp I–II for a "movie score" wonder.',
    vampDegrees: [0, 1],
  },
  {
    alsoKnown: '',
    formula: 'W-W-H-W-W-H-W',
    mood: 'Bluesy, rootsy major',
    use: 'Major with a flat 7th — vamp I–♭VII for classic rock and blues-rock.',
    vampDegrees: [0, 6],
  },
  {
    alsoKnown: 'Natural minor',
    formula: 'W-H-W-W-H-W-W',
    mood: 'Sad, melancholic, introspective',
    use: 'The default minor-key sound — vamp i–VI for that classic sad or epic minor feel.',
    vampDegrees: [0, 5],
  },
  {
    alsoKnown: '',
    formula: 'H-W-W-H-W-W-W',
    mood: 'Unstable, tense, rarely a home base',
    use: 'Built on a diminished triad — usually a passing color (like vii° in a major key) rather than a tonic.',
    vampDegrees: [0, 1],
  },
];

export const MOODS = [
  {
    id: 'melancholic',
    label: 'Melancholic',
    degrees: [5, 2, 0, 4],
    seventh: false,
    text: 'vi–iii–I–V — a wistful loop that never fully settles.',
  },
  {
    id: 'energetic',
    label: 'Energetic',
    degrees: [0, 3, 4, 3],
    seventh: false,
    text: 'I–IV–V–IV — a driving, anthemic push forward.',
  },
  {
    id: 'dreamy',
    label: 'Dreamy',
    degrees: [3, 0, 5, 4],
    seventh: true,
    text: 'IVmaj7–Imaj7–vi–V7 — floating, cinematic pads.',
  },
  {
    id: 'heroic',
    label: 'Heroic',
    degrees: [0, 3, 0, 4],
    seventh: false,
    text: 'I–IV–I–V — bold, triumphant, forward motion.',
  },
  {
    id: 'bluesy',
    label: 'Bluesy',
    degrees: [0, 3, 4, 0],
    seventh: true,
    text: 'I7–IV7–V7–I7 — grit and swagger, blues turnaround flavor.',
  },
];

export const SECTIONS = [
  {
    id: 'intro',
    label: 'Intro',
    variants: [
      { label: 'Simple & Open', degrees: [0, 3], seventh: false, blurb: 'I–IV vamp — establishes the key calmly before the verse enters.' },
      { label: 'Suspended Mood', degrees: [5, 3], seventh: false, blurb: 'vi–IV — opens on a softer, unresolved color.' },
    ],
  },
  {
    id: 'verse',
    label: 'Verse',
    variants: [
      { label: 'Narrative Motion', degrees: [0, 5, 3, 4], seventh: false, blurb: 'I–vi–IV–V — steady storytelling motion, familiar and grounded.' },
      { label: 'Understated', degrees: [0, 3, 0, 3], seventh: false, blurb: 'I–IV–I–IV — restrained, leaves room for the chorus to lift.' },
    ],
  },
  {
    id: 'chorus',
    label: 'Chorus',
    variants: [
      { label: 'Big Lift', degrees: [3, 0, 4, 5], seventh: false, blurb: 'IV–I–V–vi — climbs above the verse for a euphoric hook.' },
      { label: 'Anthemic', degrees: [0, 4, 5, 3], seventh: false, blurb: 'I–V–vi–IV — instantly singable, the classic pop lift.' },
    ],
  },
  {
    id: 'bridge',
    label: 'Bridge',
    variants: [
      { label: 'Harmonic Detour', degrees: [5, 1, 4], seventh: true, blurb: 'vi–ii7–V7 — borrows jazz motion to contrast the chorus.' },
      { label: 'Minor Shift', degrees: [2, 3, 0], seventh: false, blurb: 'iii–IV–I — a brief modal-interchange color before the final chorus.' },
    ],
  },
  {
    id: 'outro',
    label: 'Outro',
    variants: [
      { label: 'Fade Home', degrees: [3, 4, 0], seventh: false, blurb: 'IV–V–I — a final cadence that settles the song.' },
      { label: 'Loop & Dissolve', degrees: [0, 5], seventh: false, blurb: 'I–vi — a gentle vamp to fade out on.' },
    ],
  },
];

export const TEMPLATES = [
  { id: 'fifties', label: '50s Progression', tag: 'I–vi–IV–V', degrees: [0, 5, 3, 4], seventh: false },
  { id: 'axis', label: 'Axis of Awesome', tag: 'I–V–vi–IV', degrees: [0, 4, 5, 3], seventh: false },
  { id: 'andalucian', label: 'Andalusian Cadence', tag: 'i–VII–VI–V', degrees: [0, 6, 5, 4], seventh: false },
  { id: 'canon', label: "Pachelbel's Canon", tag: 'I–V–vi–iii–IV–I–IV–V', degrees: [0, 4, 5, 2, 3, 0, 3, 4], seventh: false },
  { id: 'turnaround', label: 'ii–V–I Turnaround', tag: 'jazz', degrees: [1, 4, 0], seventh: true },
  { id: 'blues12', label: '12-Bar Blues', tag: 'I7–IV7–V7', degrees: [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4], seventh: true },
];

export const MODE_NAMES = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];

export const CIRCLE_LABELS = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭', 'F'];
export const MINOR_LABELS = ['Am', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m', 'D♯m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm'];

/** Interval names, indexed by semitones above the tonic. */
export const INTERVAL_NAMES = [
  'Unison (root)', 'Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th',
  'Tritone', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th',
];

export const BAR_SIZES = [4, 8, 16, 32];
export const TIME_SIGS = ['4/4', '3/4', '6/8', '3/8', '12/8'];

/** Round a progression length up to the nearest supported bar count. */
export function nearestBarSize(n) {
  return BAR_SIZES.find((s) => s >= n) || BAR_SIZES[BAR_SIZES.length - 1];
}
