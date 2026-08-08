# CircleSong 🎸⭕

> **Turn Music Theory into Song Structures.**
> CircleSong is an interactive, web-based Guitar DAW designed to help musicians compose songs from scratch. By bridging the Circle of Fifths, smart chord inversions, customizable rhythm patterns, and real-time fretboard visualization, CircleSong makes songwriting intuitive, educational, and fun.

by Nicolas Jean Pierre Figueroa

---

## Running it

**Easiest — no install, no server.** Download
[`dist/circlesong.html`](dist/circlesong.html) and open it. It is the entire
app in one self-contained file: no network, no dependencies, fonts and the
audio engine included. Works offline, and works on a phone (the layout is
mobile-first).

**From source**, for development. The app is dependency-free static ES modules,
but in this form it **must be served over HTTP** — ES modules and
`AudioWorklet` both refuse `file://` origins.

```bash
npm start                 # or: npx http-server -p 8080 .
# then open http://localhost:8080
```

Any static server works (`python3 -m http.server 8080`, `npx serve`, nginx…).

Rebuild the single-file version after changing sources:

```bash
npm run build             # -> dist/circlesong.html
npm run fonts             # refresh tools/fonts.css (needs network; rarely)
```

Requires a browser with `AudioWorklet`: Chrome/Edge 66+, Firefox 76+, Safari 14.1+.

---

## Key Features

- **Circle of Fifths Engine** — real-time harmonic mapping, mode selection, and
  diatonic chord recommendations. Tap the outer ring for a major tonic, the
  inner ring for its relative minor.
- **Interactive Progression Timeline** — layer loops across 4, 8, 16, or 32 bars
  with custom time signatures (4/4, 3/4, 6/8, 3/8, 12/8) and BPM control.
  Bars can be split in half for two chords per bar. Drag chords in from the
  Compose tab.
- **Dynamic Fretboard & Inversion Switcher** — exact fingerings with chord-tone
  colouring, and instant auditioning of root position, 1st/2nd inversion,
  Drop-2 and Drop-3 voicings. Cycle alternative shapes for any chord.
- **Custom Tone & Strum Engine** — six modelled instruments (acoustic steel,
  nylon classical, electric clean, crunch, jazz archtop, reggae) and seven
  rhythm patterns, plus live control over sustain, brightness, and pick
  position. Five tunings including Drop D, DADGAD and Open G.
- **Predictable auditioning** — by default each chord you tap silences the one
  before it, so rapid exploring never turns into overlapping mush. Toggle it
  off under Tone → Playback, and set how much of a bar an audition plays
  (1, 2, 3 beats or a full bar).
- **Key lock + wheel explorer** — lock the key, then tap any wedge to hear it
  and read how it relates: its scale degree and function if it belongs, or the
  interval it sits at if it is borrowed. Choose whether a tap plays the full
  chord or a single note. In chord mode you hear the key's own chord on that
  root, so tapping D in C major gives Dm (ii), matching the caption.
- **Modes lesson + ear trainer** — play any mode's scale and characteristic
  vamp, see the degree strip showing exactly which notes it alters against the
  major scale, then test yourself with the "guess the mode" quiz, which tracks
  your streak and which modes you have identified.
- **About panel** — tap the wordmark for what CircleSong is and who made it.
- **Songwriting Assistant** — mood-based chord suggestions, song-section ideas,
  and progression templates inspired by hit songs. Everything applies straight
  to the timeline in the current key.
- **Save / load** — export and re-import songs as JSON. Progressions are stored
  as scale degrees, so re-importing into a different key transposes the song.

Pressing play with an empty timeline runs the metronome, so you can find a
tempo before committing chords.

Keyboard: <kbd>Space</kbd> toggles playback, <kbd>1</kbd>–<kbd>7</kbd> select and
audition scale degrees.

---

## The sound

Chords are rendered by a **six-string digital waveguide model** (extended
Karplus–Strong) running in an `AudioWorklet`, not by oscillators: fractional
delay tuning, frequency-dependent decay, pick position and hardness, velocity →
brightness coupling, and sympathetic bridge coupling between strings. Each
preset then convolves with a modelled instrument body or speaker cabinet.

Strums are performed rather than triggered — sequential string contact, velocity
and timing jitter, treble-side upstrokes that catch fewer strings, and real loop
damping for palm mutes.

See **[docs/AUDIO_QUALITY.md](docs/AUDIO_QUALITY.md)** for the full signal path,
the measurements it is verified against, and the ordered roadmap for pushing it
closer to a recorded guitar.

---

## Project layout

```
index.html               app shell / markup
styles.css               cyber-brutalist dark theme
assets/logo.svg          brand mark — swap this one file to change the artwork
src/
  app.js                 state, rendering, and event wiring
  theory.js              pitch classes, modes, diatonic harmony, Circle of Fifths
  fretboard.js           tunings, voicing search, inversions, Drop-2/Drop-3
  patterns.js            strum and fingerpicking patterns
  sequencer.js           lookahead transport, metronome, playhead
  content.js             harmonic-function copy, mode lessons, templates
  audio/
    engine.js            AudioContext, presets, signal chain, strum performance
    guitar-processor.js  AudioWorklet — the six string models
    impulse.js           synthesised body, cabinet, and room impulse responses
tools/
  build-single.mjs       bundles everything into dist/circlesong.html
  fetch-fonts.mjs        regenerates tools/fonts.css (inlined webfont subsets)
docs/
  AUDIO_QUALITY.md       sound design notes and improvement roadmap
dist/
  circlesong.html        generated single-file build — do not edit by hand
```

Add `?theme=mono` to the URL for the monochrome amber accent set.

### Branding

The brand mark lives at `assets/logo.svg` and is referenced by the header and
the About panel. Replace that one file to change the artwork — the build
inlines it as a `data:` URI automatically, so `dist/circlesong.html` stays
self-contained.

---

## License

See [LICENSE](LICENSE).
