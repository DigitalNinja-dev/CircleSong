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

/**
 * Mood suggestions. Each carries the mode it belongs in, so a "dreamy" idea
 * lands in Lydian and a "dark" one in Phrygian rather than being forced into
 * whatever key happens to be selected.
 */
export const MOODS = [
  { id: 'melancholic', label: 'Melancholic', mode: 'ionian', degrees: [5, 2, 0, 4], seventh: false,
    text: 'Begins on the relative minor and circles home without ever quite settling.' },
  { id: 'energetic', label: 'Energetic', mode: 'ionian', degrees: [0, 3, 4, 3], seventh: false,
    text: 'Primary triads, no minor chords, constant forward push.' },
  { id: 'dreamy', label: 'Dreamy', mode: 'lydian', degrees: [0, 1, 0, 4], seventh: true,
    text: 'Lydian major sevenths — the raised 4th keeps the tonic floating.' },
  { id: 'heroic', label: 'Heroic', mode: 'ionian', degrees: [0, 3, 0, 4], seventh: false,
    text: 'Tonic and subdominant trading places, then the dominant to lift it.' },
  { id: 'bluesy', label: 'Bluesy', mode: 'mixolydian', degrees: [0, 3, 4, 0], seventh: true,
    text: 'Dominant sevenths on every degree — grit rather than sweetness.' },
  { id: 'epic', label: 'Epic', mode: 'aeolian', degrees: [0, 5, 2, 6], seventh: false,
    text: 'Minor tonic under three major chords. Scale without brightness.' },
  { id: 'dark', label: 'Dark', mode: 'phrygian', degrees: [0, 1, 0, 6], seventh: false,
    text: 'The ♭2 pressing against the tonic — unresolved and menacing.' },
  { id: 'hopeful', label: 'Hopeful', mode: 'ionian', degrees: [3, 0, 4, 5], seventh: false,
    text: 'Starts away from the tonic so arriving home reads as relief.' },
  { id: 'nostalgic', label: 'Nostalgic', mode: 'ionian', degrees: [0, 5, 3, 4], seventh: false,
    text: 'The doo-wop turnaround. Familiar to the point of comfort.' },
  { id: 'hypnotic', label: 'Hypnotic', mode: 'dorian', degrees: [0, 3], seventh: false,
    text: 'Two chords, minor with a major 6th. Built for playing over.' },
  { id: 'sophisticated', label: 'Sophisticated', mode: 'ionian', degrees: [1, 4, 0, 0], seventh: true,
    text: 'ii–V–I with sevenths throughout — the jazz cadence.' },
  { id: 'restless', label: 'Restless', mode: 'aeolian', degrees: [0, 6, 5, 4], seventh: false,
    text: 'A stepwise descent that keeps arriving somewhere new.' },
  { id: 'tender', label: 'Tender', mode: 'ionian', degrees: [0, 2, 5, 3], seventh: true,
    text: 'Gentle mediant motion — close voicings, little movement in the bass.' },
  { id: 'triumphant', label: 'Triumphant', mode: 'mixolydian', degrees: [0, 6, 3, 0], seventh: false,
    text: 'The ♭VII gives it swagger without losing the major tonic.' },
];

/**
 * Song sections. Variants are alternatives for the same job, so a verse idea is
 * never just "a progression" but a progression with a role.
 */
export const SECTIONS = [
  {
    id: 'intro', label: 'Intro',
    variants: [
      { label: 'Simple & Open', degrees: [0, 3], seventh: false, blurb: 'Establishes the key calmly before the verse enters.' },
      { label: 'Suspended Mood', degrees: [5, 3], seventh: false, blurb: 'Opens on a softer, unresolved colour.' },
      { label: 'Single-Chord Drone', degrees: [0, 0], seventh: false, blurb: 'Holds the tonic so the first vocal line does the work.' },
      { label: 'Dominant Tease', degrees: [4, 3, 0], seventh: false, blurb: 'Starts on tension and resolves into bar one.' },
    ],
  },
  {
    id: 'verse', label: 'Verse',
    variants: [
      { label: 'Narrative Motion', degrees: [0, 5, 3, 4], seventh: false, blurb: 'Steady storytelling motion, familiar and grounded.' },
      { label: 'Understated', degrees: [0, 3, 0, 3], seventh: false, blurb: 'Restrained — leaves room for the chorus to lift.' },
      { label: 'Descending Line', degrees: [0, 4, 5, 3], seventh: false, blurb: 'The axis loop, which never tires of being sung over.' },
      { label: 'Minor Verse', degrees: [5, 3, 0, 4], seventh: false, blurb: 'Same chords starting on the relative minor — darker footing.' },
    ],
  },
  {
    id: 'prechorus', label: 'Pre-Chorus',
    variants: [
      { label: 'Rising Tension', degrees: [3, 4, 5, 4], seventh: false, blurb: 'Climbs and holds the dominant so the chorus can release it.' },
      { label: 'Stepwise Build', degrees: [1, 2, 3, 4], seventh: false, blurb: 'Walks up the scale — momentum without a key change.' },
      { label: 'Hold the Five', degrees: [3, 3, 4, 4], seventh: false, blurb: 'Two chords, twice as long each. Maximum anticipation.' },
    ],
  },
  {
    id: 'chorus', label: 'Chorus',
    variants: [
      { label: 'Big Lift', degrees: [3, 0, 4, 5], seventh: false, blurb: 'Climbs above the verse for a euphoric hook.' },
      { label: 'Anthemic', degrees: [0, 4, 5, 3], seventh: false, blurb: 'Instantly singable — the classic pop lift.' },
      { label: 'Plagal Power', degrees: [0, 3, 0, 3], seventh: false, blurb: 'Tonic and subdominant only. Hymn-like and immovable.' },
      { label: 'Minor Hook', degrees: [5, 4, 3, 0], seventh: false, blurb: 'Begins minor and resolves major — bittersweet.' },
    ],
  },
  {
    id: 'bridge', label: 'Bridge',
    variants: [
      { label: 'Harmonic Detour', degrees: [5, 1, 4], seventh: true, blurb: 'Borrows jazz motion to contrast the chorus.' },
      { label: 'Mediant Shift', degrees: [2, 3, 0], seventh: false, blurb: 'A brief modal colour before the final chorus.' },
      { label: 'Relative Minor', degrees: [5, 2, 3, 4], seventh: false, blurb: 'Moves the centre of gravity to the relative minor.' },
      { label: 'Suspended Halt', degrees: [3, 4], seventh: false, blurb: 'Two chords, held. The pause before the last chorus.' },
    ],
  },
  {
    id: 'outro', label: 'Outro',
    variants: [
      { label: 'Fade Home', degrees: [3, 4, 0], seventh: false, blurb: 'A final cadence that settles the song.' },
      { label: 'Loop & Dissolve', degrees: [0, 5], seventh: false, blurb: 'A gentle vamp to fade out on.' },
      { label: 'Plagal Amen', degrees: [3, 0], seventh: false, blurb: 'The IV–I "amen" cadence — restful, conclusive.' },
      { label: 'Unresolved', degrees: [0, 4], seventh: false, blurb: 'Ends on the dominant, leaving the question open.' },
    ],
  },
];

/**
 * Progression library.
 *
 * Degrees index the diatonic chords of the template's own `mode`, so applying
 * one switches to that mode and the chords are correct by construction. That
 * matters for anything with a flat degree: ♭VII is not available in Ionian, so
 * "I–♭VII–IV" is stored as a Mixolydian progression rather than as a label
 * stuck on the wrong scale.
 *
 * Roman numerals are never hardcoded — the UI computes them from the chords
 * that will actually play, so the label cannot drift from the sound.
 */
export const TEMPLATES = [
  // --- Pop & rock ---
  { id: 'axis', family: 'Pop & Rock', label: 'Axis of Awesome', mode: 'ionian', degrees: [0, 4, 5, 3], seventh: false,
    blurb: 'The four chords behind a startling share of the charts. Endlessly singable.' },
  { id: 'axisMinor', family: 'Pop & Rock', label: 'Axis, Minor Start', mode: 'ionian', degrees: [5, 3, 0, 4], seventh: false,
    blurb: 'The same loop rotated to begin on the relative minor — wistful rather than triumphant.' },
  { id: 'fifties', family: 'Pop & Rock', label: '50s Doo-Wop', mode: 'ionian', degrees: [0, 5, 3, 4], seventh: false,
    blurb: 'Ballads, prom scenes, "Stand By Me". Warm and instantly nostalgic.' },
  { id: 'threeChord', family: 'Pop & Rock', label: 'Three-Chord Rock', mode: 'ionian', degrees: [0, 3, 4, 3], seventh: false,
    blurb: 'The primary triads and nothing else. Direct, and hard to make sound wrong.' },
  { id: 'popPunk', family: 'Pop & Rock', label: 'Pop-Punk Lift', mode: 'ionian', degrees: [3, 0, 4, 5], seventh: false,
    blurb: 'Starts away from home so the chorus lands as a return.' },
  { id: 'balladClimb', family: 'Pop & Rock', label: 'Ballad Climb', mode: 'ionian', degrees: [0, 2, 3, 4], seventh: false,
    blurb: 'A stepwise rise through the scale — builds tension without a key change.' },
  { id: 'canon', family: 'Pop & Rock', label: "Pachelbel's Canon", mode: 'ionian', degrees: [0, 4, 5, 2, 3, 0, 3, 4], seventh: false,
    blurb: 'A descending sequence that has outlived three centuries of fashion.' },

  // --- Modal rock ---
  { id: 'mixoRock', family: 'Modal Rock', label: 'Mixolydian Rock', mode: 'mixolydian', degrees: [0, 6, 3, 0], seventh: false,
    blurb: 'The ♭VII is what makes this rock rather than pop — think "Sweet Home Alabama".' },
  { id: 'dorianVamp', family: 'Modal Rock', label: 'Dorian Vamp', mode: 'dorian', degrees: [0, 3, 0, 3], seventh: false,
    blurb: 'Minor with a bright 6th. Hypnotic, jam-friendly, never fully sad.' },
  { id: 'grunge', family: 'Modal Rock', label: 'Grunge ♭VI–♭VII', mode: 'aeolian', degrees: [0, 5, 6, 0], seventh: false,
    blurb: 'Heavy and modal — the flat 6th and 7th give it the weight.' },
  { id: 'lydianLift', family: 'Modal Rock', label: 'Lydian Lift', mode: 'lydian', degrees: [0, 1, 0, 4], seventh: false,
    blurb: 'The ♯4 floats the tonic. Cinematic wonder in two chords.' },
  { id: 'phrygianDark', family: 'Modal Rock', label: 'Phrygian Descent', mode: 'phrygian', degrees: [0, 1, 0, 6], seventh: false,
    blurb: 'The ♭2 leaning on the tonic — flamenco and metal share this one.' },

  // --- Minor keys ---
  { id: 'andalusian', family: 'Minor Keys', label: 'Andalusian Cadence', mode: 'aeolian', degrees: [0, 6, 5, 4], seventh: false,
    blurb: 'A stepwise descent from the tonic. Dramatic, and older than most of what it appears in.' },
  { id: 'epicMinor', family: 'Minor Keys', label: 'Epic Minor', mode: 'aeolian', degrees: [0, 5, 2, 6], seventh: false,
    blurb: 'i–VI–III–VII. Trailers, anthems, anything that needs scale.' },
  { id: 'minorBallad', family: 'Minor Keys', label: 'Minor Ballad', mode: 'aeolian', degrees: [0, 5, 3, 4], seventh: false,
    blurb: 'The doo-wop shape in minor — familiar bones, darker colour.' },
  { id: 'minorClimb', family: 'Minor Keys', label: 'Minor Climb', mode: 'aeolian', degrees: [0, 2, 5, 6], seventh: false,
    blurb: 'Rises through the relative major before falling back to the tonic.' },

  // --- Jazz ---
  { id: 'turnaround', family: 'Jazz', label: 'ii–V–I Turnaround', mode: 'ionian', degrees: [1, 4, 0, 0], seventh: true,
    blurb: 'The central cadence of jazz. Learn it in all twelve keys and half the language follows.' },
  { id: 'rhythmChanges', family: 'Jazz', label: 'Rhythm Changes A', mode: 'ionian', degrees: [0, 5, 1, 4], seventh: true,
    blurb: 'I–vi–ii–V, the most-played eight bars in the standard repertoire.' },
  { id: 'jazzBlues', family: 'Jazz', label: 'Jazz Blues Head', mode: 'mixolydian', degrees: [0, 3, 0, 4], seventh: true,
    blurb: 'Dominant sevenths throughout — the blues with a jazz accent.' },
  { id: 'circleFifths', family: 'Jazz', label: 'Circle of Fifths Run', mode: 'ionian', degrees: [2, 5, 1, 4, 0], seventh: true,
    blurb: 'Root movement by fourths all the way home — every chord pulls to the next.' },
  { id: 'bossaTurn', family: 'Jazz', label: 'Bossa Turnaround', mode: 'ionian', degrees: [0, 1, 4, 0], seventh: true,
    blurb: 'Major sevenths and a gentle ii–V. Nylon strings and brushes.' },

  // --- Blues ---
  { id: 'blues12', family: 'Blues', label: '12-Bar Blues', mode: 'mixolydian', degrees: [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4], seventh: true,
    blurb: 'The form. Twelve bars, three chords, a century of music.' },
  { id: 'quickChange', family: 'Blues', label: '12-Bar Quick Change', mode: 'mixolydian', degrees: [0, 3, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4], seventh: true,
    blurb: 'Moves to the IV in bar two — more motion early on.' },
  { id: 'minorBlues', family: 'Blues', label: 'Minor Blues', mode: 'aeolian', degrees: [0, 0, 0, 0, 3, 3, 0, 0, 5, 4, 0, 4], seventh: true,
    blurb: 'The same twelve bars in minor. Slower, heavier, more room to bend.' },

  // --- Folk & country ---
  { id: 'folkCircle', family: 'Folk & Country', label: 'Folk Circle', mode: 'ionian', degrees: [0, 3, 0, 4], seventh: false,
    blurb: 'Home, away, home, away. The campfire progression.' },
  { id: 'countryTrain', family: 'Folk & Country', label: 'Country I–IV–V', mode: 'ionian', degrees: [0, 0, 3, 4], seventh: false,
    blurb: 'Sits on the tonic before moving — leaves space for the vocal.' },
  { id: 'celticVamp', family: 'Folk & Country', label: 'Celtic Vamp', mode: 'mixolydian', degrees: [0, 6, 0, 3], seventh: false,
    blurb: 'The ♭VII again, this time in a jig. Works beautifully in DADGAD.' },
];

export const TEMPLATE_FAMILIES = [...new Set(TEMPLATES.map((t) => t.family))];

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
