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

  // --- Jazz & neo-soul ---
  //
  // These are the progressions that need the chord builder: every entry is a
  // spec, so the template asks for a specific quality on a specific degree
  // rather than "all sevenths" applied uniformly. That is what lets a minor
  // ii-V-i carry a half-diminished ii and an altered V while the i stays a m9.
  { id: 'minorDom9', family: 'Jazz & Neo-Soul', label: 'Minor ii–V–i with a ♭9', mode: 'aeolian',
    degrees: [
      { degree: 3, size: 5 },
      { degree: 4, size: 5, colour: 'dom', alterations: ['b9'] },
      { degree: 0, size: 5 },
      { degree: 0, size: 5 },
    ],
    blurb: 'Dm9 – E7♭9 – Am9 in A minor. The v has to be borrowed as a dominant to pull home, and the ♭9 is the note that makes it ache.' },
  { id: 'minorTwoFive', family: 'Jazz & Neo-Soul', label: 'Half-Diminished ii–V–i', mode: 'aeolian',
    degrees: [
      { degree: 1, size: 4, colour: 'm7b5' },
      { degree: 4, size: 5, colour: 'dom', alterations: ['b9'] },
      { degree: 0, size: 5 },
      { degree: 0, size: 5 },
    ],
    blurb: 'The textbook minor cadence: iiø7 sets up the dominant, the dominant lands on a m9.' },
  { id: 'sixNineTurn', family: 'Jazz & Neo-Soul', label: '6/9 Turnaround', mode: 'ionian',
    degrees: [
      { degree: 0, size: 5, colour: '6' },
      { degree: 5, size: 4 },
      { degree: 1, size: 5 },
      { degree: 4, size: 7, colour: 'dom' },
    ],
    blurb: 'A 6/9 tonic never quite sits down, so the loop keeps turning. The 13th on the V is the full jazz dominant.' },
  { id: 'susResolve', family: 'Jazz & Neo-Soul', label: 'Sus4 Release', mode: 'mixolydian',
    degrees: [
      { degree: 0, size: 4, colour: 'sus4' },
      { degree: 0, size: 5, colour: 'dom' },
      { degree: 6, size: 4 },
      { degree: 0, size: 4 },
    ],
    blurb: 'Hold the 4th, then let it fall to the 3rd. The oldest tension-and-release there is.' },
  { id: 'secondaryCycle', family: 'Jazz & Neo-Soul', label: 'Secondary Dominant Cycle', mode: 'ionian',
    degrees: [
      { degree: 0, size: 4 },
      { degree: 2, size: 4, colour: 'dom' },
      { degree: 1, size: 4 },
      { degree: 4, size: 5, colour: 'dom' },
    ],
    blurb: 'Every chord is the dominant of the next. Each borrowed 7th pulls a fifth down into the chord after it.' },
  { id: 'neoSoulLoop', family: 'Jazz & Neo-Soul', label: 'Neo-Soul Loop', mode: 'dorian',
    degrees: [
      { degree: 0, size: 5 },
      { degree: 3, size: 5, colour: 'dom' },
      { degree: 5, size: 5 },
      { degree: 4, size: 4, colour: 'sus4' },
    ],
    blurb: 'Dorian with ninths on everything. The major IV is what makes Dorian sound like Dorian rather than minor.' },

  // --- The Chord Progression Handbook ---
  //
  // Matney & Niemuth, "Chord Progression Handbook" (University of Kansas
  // Libraries, 2019, CC BY-NC 4.0). The book orders its twenty progressions by
  // difficulty rather than by style — one chord, then two, then cadences, then
  // modal and chromatic — and that ordering is kept here, because it is the
  // teaching. The song lists are the book's own: a roman numeral means little
  // until you hear a song you already know built out of it.
  { id: 'hbSingleMajor', family: 'Handbook', label: '1 · Single Major Chord', mode: 'ionian',
    degrees: [0, 0, 0, 0], seventh: false,
    blurb: 'One chord, held. Everything else in music is a departure from this.',
    songs: ['Chain of Fools — Aretha Franklin', 'Get Up Stand Up — Bob Marley', 'Everyday People — Sly & the Family Stone', 'Bad to the Bone — George Thorogood'] },
  { id: 'hbSingleMinor', family: 'Handbook', label: '2 · Single Minor Chord', mode: 'aeolian',
    degrees: [0, 0, 0, 0], seventh: false,
    blurb: 'The same drone in minor. A whole song can live here.',
    songs: ['Papa Was a Rollin\' Stone — The Temptations', 'Get Up, Stand Up — Bob Marley', 'We Will Rock You — Queen'] },
  { id: 'hbTonicDomMajor', family: 'Handbook', label: '3 · Tonic–Dominant, Major', mode: 'ionian',
    degrees: [0, 4], seventh: false,
    blurb: 'Away and back. The smallest complete musical sentence there is.',
    songs: ['Jocko Homo — Devo', 'Achy Breaky Heart — Billy Ray Cyrus', 'Jambalaya — Hank Williams', 'Wheels on the Bus'] },
  { id: 'hbTonicDomMinor', family: 'Handbook', label: '4 · Tonic–Dominant, Minor', mode: 'aeolian',
    degrees: [0, 4], seventh: false,
    blurb: 'The same two-chord motion with a minor tonic — darker, and it leans harder.',
    songs: ['Black Horse and a Cherry Tree — KT Tunstall'] },
  { id: 'hbTonicSubdom', family: 'Handbook', label: '5 · Tonic–Subdominant', mode: 'ionian',
    degrees: [0, 3], seventh: false,
    blurb: 'Away and back without tension. Restful where the dominant is restless.',
    songs: ['I Still Haven\'t Found What I\'m Looking For — U2', 'Born in the USA — Bruce Springsteen', 'Paperback Writer — The Beatles', 'What I Got — Sublime'] },
  { id: 'hbMajorRelMinor', family: 'Handbook', label: '6 · Major to Relative Minor', mode: 'ionian',
    degrees: [0, 5], seventh: false,
    blurb: 'The same seven notes, seen from its shadow.',
    songs: ['Want to Want Me — Jason Derulo', 'Buffalo Soldier — Bob Marley', 'Roar — Katy Perry'] },
  { id: 'hbOneFourFive', family: 'Handbook', label: '7 · I–IV–V', mode: 'ionian',
    degrees: [0, 3, 4], seventh: false,
    blurb: 'The three chords most songs are made of.',
    songs: ['La Bamba — Ritchie Valens', 'Twist and Shout — The Beatles', 'Mr. Jones — Counting Crows'] },
  { id: 'hbPlagal', family: 'Handbook', label: '8 · I–IV–V, Plagal Cadence', mode: 'ionian',
    degrees: [0, 4, 0, 3], seventh: false,
    blurb: 'Ends IV to I rather than V to I — the softer landing.',
    songs: ['Learn to Fly — Foo Fighters', 'Drift Away — Mentor Williams', 'Semi-Charmed Life — Third Eye Blind'] },
  { id: 'hbLouie', family: 'Handbook', label: '9 · I–IV–V–IV', mode: 'ionian',
    degrees: [0, 3, 4, 3], seventh: false,
    blurb: 'The loop that never resolves, so it can go round forever.',
    songs: ['Louie Louie — The Kingsmen', 'Wild Thing — The Troggs', 'I Love Rock and Roll — Joan Jett'] },
  { id: 'hbMinorFlatThree', family: 'Handbook', label: '10 · Minor to ♭III', mode: 'aeolian',
    degrees: [0, 2], seventh: false,
    blurb: 'Minor tonic to its relative major. Used alone, or to open something longer.',
    songs: ['Eleanor Rigby — The Beatles', 'Need You Now — Lady A', 'Something in the Way — Nirvana', 'Hey There Delilah — Plain White T\'s'] },
  { id: 'hbMinorFlatSeven', family: 'Handbook', label: '11 · Minor to ♭VII', mode: 'aeolian',
    degrees: [0, 6], seventh: false,
    blurb: 'The first chord from outside the major scale. Modal, and instantly modern.',
    songs: ['Ramblin\' Man — The Allman Brothers'] },
  { id: 'hbDooWop', family: 'Handbook', label: '12 · Doo-Wop / Ice Cream', mode: 'ionian',
    degrees: [0, 5, 3, 4], seventh: false,
    blurb: 'I–vi–IV–V. Fifty years of hits and it still has not worn out.',
    songs: ['Stand by Me — Ben E. King', 'Earth Angel — The Penguins', 'Heart and Soul — Hoagy Carmichael', 'Perfect — Ed Sheeran'] },
  { id: 'hbAxisHb', family: 'Handbook', label: '12A · I–V–vi–IV', mode: 'ionian',
    degrees: [0, 4, 5, 3], seventh: false,
    blurb: 'The same four chords rotated. Probably the most recorded loop alive.',
    songs: ['No Woman No Cry — Bob Marley', 'Demons — Imagine Dragons', 'I\'m Yours — Jason Mraz', 'Torn — Natalie Imbruglia'] },
  { id: 'hbOneFourSixFive', family: 'Handbook', label: '12B · I–IV–vi–V', mode: 'ionian',
    degrees: [0, 3, 5, 4], seventh: false,
    blurb: 'The subdominant arrives early, so the minor lands harder.',
    songs: ['More Than a Feeling — Boston', 'She Drives Me Crazy — Fine Young Cannibals'] },
  { id: 'hbRhythmChanges', family: 'Handbook', label: '13 · Rhythm Changes', mode: 'ionian',
    degrees: [0, 5, 1, 4], seventh: false,
    blurb: 'I–vi–ii–V. The circle of fifths, walked backwards, four bars at a time.',
    songs: ['I Got Rhythm — George Gershwin', 'Blue Moon — Rodgers and Hart', 'Dancing in the Moonlight — King Harvest'] },
  { id: 'hbSecondaryDom', family: 'Handbook', label: '13B · Secondary Dominants', mode: 'ionian',
    degrees: [
      { degree: 0, size: 4 },
      { degree: 5, size: 4, colour: 'dom' },
      { degree: 1, size: 4, colour: 'dom' },
      { degree: 4, size: 4, colour: 'dom' },
    ],
    blurb: 'Each chord turned into the dominant of the next, so the loop pulls all the way round.',
    songs: ['Come and Get Your Love — Redbone', 'Walk Right In — Gus Cannon', 'Alice\'s Restaurant — Arlo Guthrie'] },
  { id: 'hbTurnaround', family: 'Handbook', label: '13D · The Turnaround', mode: 'ionian',
    degrees: [
      { degree: 2, size: 4 },
      { degree: 5, size: 4 },
      { degree: 1, size: 4 },
      { degree: 4, size: 4, colour: 'dom' },
    ],
    blurb: 'iii–vi–ii–V. Tacked on the end to extend an ending, in show tunes and jazz.',
    songs: ['Standard jazz and show-tune ending'] },
  { id: 'hbTwoFiveOneFour', family: 'Handbook', label: '14 · ii–V–I–IV', mode: 'ionian',
    degrees: [
      { degree: 1, size: 4 },
      { degree: 4, size: 4, colour: 'dom' },
      { degree: 0, size: 3 },
      { degree: 3, size: 3 },
    ],
    blurb: 'The jazz cadence, then straight out to the subdominant instead of resting.',
    songs: ['Ice Cream — Sarah McLachlan'] },
  { id: 'hbModalTwoFour', family: 'Handbook', label: '15 · Modal with ii and IV', mode: 'ionian',
    degrees: [0, 1, 3, 4], seventh: false,
    blurb: 'Stepwise out of the tonic. Modern pop leans on this constantly.',
    songs: ['Marry You — Bruno Mars', 'Lips Are Movin — Meghan Trainor', 'What\'s Up — 4 Non Blondes'] },
  { id: 'hbFlatSevenLoop', family: 'Handbook', label: '16 · I–♭VII–IV–I', mode: 'mixolydian',
    degrees: [0, 6, 3, 0], seventh: false,
    blurb: 'Mixolydian rock. The ♭VII is what stops it sounding like a hymn.',
    songs: ['Born This Way — Lady Gaga', 'Who Are You — The Who', 'Royals — Lorde', 'Gloria — Them'] },
  { id: 'hbMinorFlatSevenThree', family: 'Handbook', label: '18 · i–♭III–♭VII–i', mode: 'aeolian',
    degrees: [0, 2, 6, 0], seventh: false,
    blurb: 'Minor, its relative major, and the subtonic. Endlessly loopable.',
    songs: ['Right Round — Flo Rida', 'Jolene — Dolly Parton', 'Na Na Hey Hey Kiss Him Goodbye — Steam'] },
  { id: 'hbAndalusian', family: 'Handbook', label: '19 · Andalusian Cadence', mode: 'aeolian',
    degrees: [
      { degree: 0, size: 3 },
      { degree: 6, size: 3 },
      { degree: 5, size: 3 },
      { degree: 4, size: 4, colour: 'dom' },
    ],
    blurb: 'Stepwise descending, out of Flamenco. The V7 at the bottom is what makes it Spanish rather than merely minor.',
    songs: ['Greensleeves — traditional', 'Hit the Road Jack — Ray Charles', 'Stray Cat Strut — Stray Cats', 'All Along the Watchtower — Jimi Hendrix'] },
  { id: 'hbPachelbel', family: 'Handbook', label: '20 · Pachelbel\'s Canon', mode: 'ionian',
    degrees: [0, 4, 5, 2, 3, 0, 3, 4], seventh: false,
    blurb: 'Eight bars from 1680 that pop music has never stopped borrowing.',
    songs: ['Basket Case — Green Day', 'Changes — David Bowie', 'Hook — Blues Traveler', 'Hometown — Joe Jackson'] },
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
