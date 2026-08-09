# CircleSong 🎸⭕

> **Turn Music Theory into Song Structures.**
> CircleSong is an interactive, web-based Guitar tool designed to help musicians compose songs from scratch. By bridging the Circle of Fifths, smart chord inversions, customizable rhythm patterns, and real-time fretboard visualization, CircleSong makes songwriting intuitive, educational, and fun.

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
npm run fonts             # refresh assets/fonts.css (needs network; rarely)
```

Requires a browser with `AudioWorklet`: Chrome/Edge 66+, Firefox 76+, Safari 14.1+.

---

## Installing on a phone

CircleSong is a PWA, so it installs from the browser — a launcher icon, no
browser chrome, and it keeps working with no signal. No app store, no APK.

**1. Publish it once.** In the repo: **Settings → Pages → Source: Deploy from a
branch → `main` / `(root)` → Save**. After a minute it is live at:

```
https://digitalninja-dev.github.io/CircleSong/
```

**2. Install it on Android.** Open that URL in Chrome, then either tap the
**Install** prompt Chrome offers, or **⋮ → Add to Home screen**. It lands in the
app drawer with the CircleSong icon and opens fullscreen.

**On iOS** the equivalent is Safari → **Share → Add to Home Screen**.

Installation needs HTTPS, which GitHub Pages provides. To try it on a phone
before publishing, run `npm start` and open your machine's LAN address
(`http://192.168.x.x:8080`) — the app will run, but Android only offers to
*install* over HTTPS or localhost.

### Testing on a device over USB

With the phone connected and USB debugging on, forward the port so the phone
sees the dev server as localhost, which also satisfies the install requirement:

```bash
adb reverse tcp:8080 tcp:8080
npm start
```

Then open `http://localhost:8080` on the phone. `chrome://inspect` on the
desktop gives you the phone's console and DevTools.

### Updating an installed copy

The service worker serves the cached shell first, so an installed app keeps
running the version it cached. After deploying changes, bump `CACHE` in
`sw.js` — installed copies then fetch the new files on their next launch.

### If you need a real APK

A PWA covers testing and everyday use. For a Play Store listing or a `.apk`
file, wrap this same URL in a Trusted Web Activity with
[PWABuilder](https://www.pwabuilder.com/) or Google's Bubblewrap — both take
the manifest already in this repo and emit a signed Android package. That path
adds Play Console signing and review; nothing about the app itself changes.

---

## Key Features

- **Circle of Fifths Engine** — real-time harmonic mapping, mode selection, and
  diatonic chord recommendations. Tap the outer ring for a major tonic, the
  inner ring for its relative minor.
- **Interactive Progression Timeline** — layer loops across 4, 8, 16, or 32 bars
  with custom time signatures (4/4, 3/4, 6/8, 3/8, 12/8) and BPM control.
  Bars can be split in half for two chords per bar. Drag chords in from the
  Compose tab.
- **Multiple loops per song** — build a verse, a chorus and a turnaround as
  separate loops and switch between them while playing. A switch waits for the
  bar line, so the change lands on the beat instead of cutting mid-phrase.
- **Backing drums** — twelve grooves across rock, funk, reggae, bossa,
  Afro-Cuban 6/8, blues shuffle, waltz, Motown, cajon, lo-fi and metal, over six
  kits. Scheduled against the same audio clock as the guitar, so they stay
  locked bar for bar in any time signature, with an optional fill before the
  loop turns around.
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
manifest.webmanifest     PWA metadata — name, icons, standalone display
sw.js                    service worker — offline cache of the app shell
assets/logo.svg          brand mark — swap this one file to change the artwork
assets/fonts.css         webfont subsets, inlined so nothing loads from a CDN
icons/                   launcher icons (generated by tools/make-icons.mjs)
src/
  app.js                 state, rendering, and event wiring
  theory.js              pitch classes, modes, diatonic harmony, Circle of Fifths
  fretboard.js           tunings, voicing search, inversions, Drop-2/Drop-3
  patterns.js            strum and fingerpicking patterns
  drum-patterns.js       drum grooves as step grids, by genre and metre
  sequencer.js           lookahead transport, metronome, playhead
  content.js             harmonic-function copy, mode lessons, templates
  audio/
    engine.js            AudioContext, presets, signal chain, strum performance
    guitar-processor.js  AudioWorklet — the six string models
    impulse.js           synthesised body, cabinet, and room impulse responses
    drums.js             synthesised drum kit voices
tools/
  build-single.mjs       bundles everything into dist/circlesong.html
  fetch-fonts.mjs        regenerates assets/fonts.css (inlined webfont subsets)
  make-icons.mjs         renders icons/ from assets/logo.svg
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
