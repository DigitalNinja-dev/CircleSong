# CircleSong 🎸⭕

> **Turn music theory into song structures.**
> A theory-guided guitar tool that runs in a browser: compose on the
> Circle of Fifths, hear every chord on a physically modelled guitar, build
> loops into songs, and tune the instrument you are playing — offline, with no
> dependencies and no build step.

by Nicolás Raul Jean-Pierre Figueroa

<p align="center">
  <img src="docs/screenshots/circle.png" alt="Circle of Fifths with scale degrees and secondary dominants" width="24%">
  <img src="docs/screenshots/compose.png" alt="Chord builder and fretboard" width="24%">
  <img src="docs/screenshots/timeline.png" alt="Timeline with a progression and its analysis" width="24%">
  <img src="docs/screenshots/tuner.png" alt="Tuner" width="24%">
</p>

---

## Running it

**Easiest — no install, no server.** Download
[`dist/circlesong.html`](dist/circlesong.html) and open it. It is the entire app
in one self-contained file, about 720 KB: no network, no dependencies, fonts and
the audio engine included. Works offline, and works on a phone — the layout is
mobile-first.

**From source**, for development. The app is dependency-free static ES modules,
but in this form it **must be served over HTTP** — ES modules and `AudioWorklet`
both refuse `file://` origins.

```bash
npm start                 # or: npx http-server -p 8080 .
# then open http://localhost:8080
```

Any static server works (`python3 -m http.server 8080`, `npx serve`, nginx…).
There is no build step for development: edit a file, reload the page.

Rebuild the single-file version after changing sources:

```bash
npm run build             # -> dist/circlesong.html, and stamps sw.js
npm run fonts             # refresh assets/fonts.css (needs network; rarely)
npm run icons             # re-render icons/ from assets/logo.svg
```

Requires a browser with `AudioWorklet`: Chrome/Edge 66+, Firefox 76+, Safari 14.1+.

---

## What it does

### Harmony

- **Circle of Fifths engine** — real-time harmonic mapping, mode selection, and
  diatonic chords. The outer ring is major keys, the inner ring their relative
  minors, and each diatonic wedge is marked with its **scale degree** (I, ii,
  iii…) which follows the key as you change it.
- **The key is outlined, not merely tinted.** The seven chords of a key are not
  scattered around the circle of fifths: each ring holds one unbroken run of
  them, which is the whole reason this wheel is the right picture of a key.
  Drawing that boundary says which chords are in and which are borrowed at a
  glance, and says why they are neighbours at the same time. It is a shape
  rather than a shade because a shade had run out of room — on the pale themes
  an out-of-key wedge is already nearly the colour of the page, and in-key and
  out-of-key wedges sat at 1.3:1, which is indistinguishable. The outline is
  checked at 3:1 against every wedge it can cross, in all four themes, and the
  enclosure itself is checked against all 84 key-and-mode combinations.
- **Extended and altered chords** — five sizes (triad, 7th, 9th, 11th, 13th),
  **nine colours** (diatonic, dominant 7, sus4, sus2, 6th, add9, °7, ø7,
  augmented) and **four alterations** (♭9, ♯9, ♯11, ♭13), per chord and
  resettable per chord. Progressions are stored as *specs* rather than finished
  chords, so `Dm7/9 – E7/9 – Am9` transposes with the key.
- **Secondary dominants** drawn on the wheel as arrows pointing at the chord
  each one pulls into, with a row you can tap to hear the resolution.
- **A harmony engine** (`src/harmony.js`) behind all of it: functional analysis
  (tonic / subdominant / dominant), root-motion strength, next-chord suggestions
  that know what section you are writing, cadence detection, and shortest-path
  voice leading across a progression.
- **Key lock + wheel explorer** — lock the key, then tap any wedge to hear it and
  read how it relates: its degree and function if it belongs, or the interval it
  sits at if it is borrowed. Taps play the key's own chord on that root, or a
  single note, whichever you choose.

### Writing

- **Dynamic fretboard and inversion switcher** — exact fingerings with
  chord-tone colouring, and instant auditioning of root position, 1st and 2nd
  inversion, Drop-2 and Drop-3. Cycle alternative shapes for any chord.
- **Progression timeline** — loops of 4, 8, 16 or 32 bars in **five time
  signatures** (4/4, 3/4, 6/8, 3/8, 12/8). Every bar can be filled from a
  picker that suggests what comes next.
- **Up to four chords in a bar**, because most songs are not one chord per bar
  and a tool that cannot write those cannot write those songs. The limit is the
  metre's, not an arbitrary one: one chord per beat in a simple metre, one per
  dotted beat in a compound one — four in 4/4, three in 3/4, two in 6/8, four
  in 12/8. The bar keeps its length and the chords divide it evenly, which is
  measured at the engine rather than drawn: four chords in a bar at 120bpm
  reach the sequencer half a second apart, half a second each.

  Every bar stays the same width, because equal width for equal time is what
  makes the grid readable as a chart. What gives instead is how many bars share
  a row: a quarter of a phone holds one chord comfortably and two at 16px, so a
  section with any divided bar in it drops to two bars per row below 700px. The
  narrowest chord that now results is 31px wide and 54px tall, at 320px with
  four to a bar.
- **Multiple loops per song** — verse, chorus, turnaround as separate loops with
  section roles, switchable while playing. A switch waits for the bar line, so
  the change lands on the beat instead of cutting mid-phrase.
- **How this loop reads** — a live analysis of what you have written: roman
  numerals, cadence, and what is missing.
- **Songwriting assistant** — **14 moods**, **6 song sections with 23 variants**,
  and a **library of 56 progressions** in 8 families: pop and rock, modal rock,
  minor keys, jazz, blues, folk and country, jazz and neo-soul, and a set drawn
  from Matney & Niemuth's *Chord Progression Handbook*. Tap a card to hear it in
  your key, Apply to write it to the timeline. Each template carries the mode it
  belongs in, so ♭VII progressions land in Mixolydian rather than being
  mislabelled in Ionian.
- **Saved songs** — save, rename and reopen projects from the Songs tab; they
  live in browser storage, so they survive a reload and work offline. Songs
  written by an older version still import from a file.

### Sound

- **Eight modelled instruments** — acoustic steel, nylon classical, electric
  clean, electric crunch, jazz archtop, reggae, grand piano and electric piano —
  with live control over sustain, brightness and pick position, and **five
  tunings**: Standard, Drop D, DADGAD, Open G and E♭ Standard.
- **34 strum and picking patterns**, 28 for guitar and 6 written for the
  keyboard presets, in families: strumming, muted and percussive, reggae/ska and
  offbeat, jazz comping, Latin and syncopated, country and bluegrass, other
  meters, fingerstyle. Each carries the **tempo range it is written for**, with
  one tap to go there.
- **Feel, Swing and Humanize** — re-time any pattern into double- or half-time,
  set how far the offbeats lean, and how tightly the hand holds the grid.
- **Drum machine with a step sequencer** — 35 grooves across rock, funk and
  soul, house/techno/breakbeat, reggae and soca, Latin, jazz and blues, folk,
  hip-hop and metal. **Six kits, ten voices.** Every groove loads into an
  editable grid — tap a step to cycle it through soft, medium and hard — with
  swing, humanise, a musical **Vary** button, and a playhead driven from the
  audio clock. Locked to the guitar bar for bar in any time signature.
- **A scale strip with its own voices** — play single notes over a running
  progression to work out a line. They cannot be cut by a chord, cannot steal a
  chord's voice, and do not stop when the transport does.
- **Predictable auditioning** — each chord you tap silences the one before it, so
  rapid exploring never turns into overlapping mush. Toggle it off under Tone →
  Playback, and set how much of a bar an audition plays.

### Tuning

- **A real tuner** — YIN pitch detection with parabolic interpolation, an RMS
  noise gate, a median filter, adaptive smoothing and a held lock, running on
  the app's own AudioContext. The microphone is a dead end by construction: it
  reaches an analyser and nothing else.
- **An answer that stays still long enough to read.** A plucked string is not
  one pitch — it sharpens on the attack, drifts as it decays, and moves again
  under the finger on the peg — so a reading reported frame by frame crosses
  in and out of a ±4¢ window several times a second, and a flickering "in
  tune" is no answer at all. So: a median of the last three readings, which no
  single bad frame can move; an EMA whose rate follows how far it has to go, so
  a real correction is followed at once while the last couple of cents of a
  string breathing are damped; and a lock held for two seconds from the last
  frame that was genuinely in tune, surviving both a wobble out to ±8¢ and the
  note dying away under the gate. Past ±8¢ the peg has actually moved and the
  display follows it immediately. In tune, the whole ring lights and the status
  reads ✓ LOCKED — answerable from across the room, without reading a number.
- **8 instruments and 26 tunings** — guitar (including Drop C, Open D, DADGAD
  and 7-string), bass, ukulele, mandolin, banjo, violin, cello/viola, and
  chromatic.
- **Reference notes** — tap any string to hear it, loudness-compensated so the
  low E is as audible as the top E, and built from more partials the lower it
  goes because most speakers cannot reproduce an 82 Hz sine at all.
- Auto or manual target, an in-tune chime, adjustable sensitivity, response and
  in-tune window, and reference A4 from 432 to 444 Hz.

### Learning

- **A guide for guitarists**, at the top of the Learn tab: what the app is for,
  the first five minutes, how to read the wheel, and what each of the nine tabs
  does. Written for someone who already plays — the open chords you know are a
  key, a capo turns the wheel rather than the shapes, a shape is not a chord —
  rather than for someone starting at first principles. It collapses, because
  the ear trainer underneath is the part people come back for.
- **Modes lesson and ear trainer** — play any mode's scale and characteristic
  vamp, see the degree strip showing exactly which notes it alters against the
  major scale, then test yourself with a "guess the mode" quiz that tracks your
  streak.

### Appearance

- **Five themes** — System, Dark, Light, High Contrast and Sepia, chosen under
  Songs → Appearance and remembered. System follows the device and re-resolves
  while the app is running, so a phone that flips to dark at sunset takes the
  app with it.
- Every colour in the app is a semantic token, so a theme is a set of values
  rather than a second stylesheet — including the numbers the circle of fifths
  and the fretboard are painted with, which are drawn from JavaScript and would
  otherwise stay dark on a light page.
- **Responsive, and not merely wider.** Below 700px the phone layout is
  untouched — pixel-for-pixel, which is checked. Above it the extra room goes
  to the things that were actually cramped: seven degrees in one row instead of
  two shelves, sixteen drum steps at a readable size, the circle of fifths at
  420px instead of 280. On a desktop the nav becomes a left rail, which also
  fixes a bug — the fixed bottom bar used to float on top of the panel it
  belonged to on a short, wide window — and the progression library goes to two
  columns, fitting all 56 in half the height.
- **The wheel is operable from the keyboard.** The wedges are a conic gradient
  with nothing to focus, so the labels are the buttons: one tab stop, arrow
  keys around the circle of fifths, up and down between a key and its relative
  minor, Enter to choose. Each is named for a screen reader — "Em — iii, the
  mediant" — and focus survives the redraw that choosing causes.
- **All four themes pass WCAG AA**, measured rather than assumed — see
  Verifying it.

### Language

- **Eight languages** — English, Español, हिन्दी, Deutsch, Bahasa Indonesia,
  Português, Русский and Tiếng Việt, complete rather than partial: **856
  strings** in each, including the mode lessons, all 56 progression notes, the
  harmonic analysis the app writes about your loop, and the tuner's microphone
  errors. Not a word of the interface is left in English. Note letters and chord
  suffixes (`C`, `maj7`, `sus4`) stay as they are in every language: the
  fretboard, the chord symbols and the tuner all draw letters, so renaming them
  would be a correctness change rather than a translation.
- **A globe in the transport bar**, on every screen. Someone who has just put
  the app into a language they cannot read has to be able to get back out, and
  at that moment a settings menu is unreadable and a picture is not. Every
  language is listed in its own script, so you can find yours on sight.
- The language is remembered, and on a first visit it is taken from the
  device — `es-419` and `de-AT` both land somewhere useful. `?lang=de` on the
  URL overrides both, which makes every language linkable and screenshottable.
- Note letters (C, D, E…) are deliberately not translated: German notation
  calls B natural "H", and renaming every chord symbol and fretboard marker
  would be a correctness change rather than a translation. The words *about*
  the notes are translated; the letters on the instrument are not.

Pressing play with an empty timeline runs the metronome, so you can find a tempo
before committing chords.

Keyboard: <kbd>Space</kbd> toggles playback, <kbd>1</kbd>–<kbd>7</kbd> select and
audition scale degrees. Add `?theme=mono` to the URL for the monochrome amber
accent set.

---

## The sound

Chords are rendered by a **six-string digital waveguide model** (extended
Karplus–Strong) running in an `AudioWorklet`, not by oscillators: fractional
delay tuning with the loop filter's phase delay compensated, frequency-dependent
decay, pick position and hardness, velocity → brightness coupling, sympathetic
bridge coupling between strings, and — for the keyboard presets — a felt hammer
excitation and allpass dispersion that stretches the partials the way a real
piano's stiffness does.

A **pick attack** is played alongside each note rather than through it. An ideal
plucked string's partials fall off at 12 dB/octave, which leaves a low E with
essentially no energy above 1 kHz; the sound of the plectrum itself is where a
strummed steel string's 2–6 kHz comes from.

Each preset then convolves with a modelled instrument body or speaker cabinet.
Those are specified as **resonances in dB and normalised by their average gain
across the audible band**, because a convolution's gain is a property of its
whole impulse response and not of its peak sample — getting that wrong is what
made an F barre chord distort while a C did not.

Strums are performed rather than triggered: sequential string contact, velocity
and timing jitter scaled by the Humanize control, treble-side upstrokes that
catch fewer strings, and real loop damping for palm mutes. Patterns say **which
strings** a stroke catches, **how long** the chord rings in beats before the
fret hand stops it, and whether a stroke is a **dead percussive one** — which is
the difference between a reggae skank and a ska stroke, and between funk and a
series of chords.

See **[docs/AUDIO_QUALITY.md](docs/AUDIO_QUALITY.md)** for the full signal path,
the measurements it is verified against, and the ordered roadmap for pushing it
closer to a recorded guitar.

---

## Verifying it

There is no unit-test suite; the app is checked by **driving the built file in
headless Chromium and measuring what comes out**, because almost everything here
is either audio or layout and a green assertion about neither is worthless. A
check that counts zero of something is treated as a failure, not a pass.

The standing checks cover: WCAG contrast for every text element that sits on a
CSS background, in every theme — the wheel does not, and has its own check
below; output level, peak and crest factor for every preset
on the chord shapes that stress a guitar body's air mode; that every rhythm
pattern schedules audible strokes in every meter it claims; that ska and reggae
differ in position, ring, strings and mute; pitch-detector accuracy in cents on
every string of every tuning; reference-note loudness across the range; that the
microphone is released when the tab is left; and that the single-file build boots
from `file://`, under a strict CSP, and offline after the service worker has
installed.

Translation coverage is measured the same way. `npm run i18n` drives the app
through every panel in a real browser and asks it which strings it looked
up — the only honest catalogue, since a grep would miss everything that lives
in a data table and a hand-kept list goes stale the first time a sentence is
edited — then merges that with every literal handed to `t()` in the source, so
the strings only an error path reaches are counted too. It reports coverage per
language and fails on an orphan, which is what an edited English string leaves
behind. `npm run i18n:dump` writes the catalogue out for a translator.

Each language is also driven through all nine panels, asserting that every one
renders non-empty, differs from English, and returns to English exactly when
switched back — plus that the layout survives translation on a 360 px phone,
which is how the drum row's four buttons were found to overflow in German.

The wheel gets its own check, `npm run wheel:contrast`, because it is the
hardest surface in the app to measure and the easiest to get a false pass on.
Its wedges are a conic gradient built in JavaScript, so there is no
`background-color` on any ancestor: an audit that walks the DOM for one finds
the page *behind* the wheel and reports every label as fine. Both colours are
known, though — the wedge is `oklch(L C hue)` from the same tokens the painter
reads, and the ink is a theme token — so the tool composites the ink (several
are translucent) over the wedge and computes the ratio exactly, for all twelve
hues in all three states on both rings in all four themes.

Doing that found a real defect. Twelve hues at one OKLCH lightness *look*
equally light and are not: a yellow and a blue at L 0.56 differ fourfold in
relative luminance. A single pale ink was therefore legible on some wedges and
not on others, and **107 of the 288 wedge/ink pairs were below AA** — including
labels in the default key. No single colour could have fixed it, so the ink is
now chosen per wedge by measuring it (`readableInk` in `src/theme.js`), with a
dimmer pair for wedges outside the key so they still recede. All 288 pairs now
pass, the worst at 4.52:1. The fretboard dots pick their ink the same way,
which changes nothing today and stops the next palette edit from breaking them.

The same tool measures the outline round the key's own chords, at the 3:1 WCAG
asks of a graphical object rather than of text. It is drawn as a line over a
halo because no single colour is legible across wedges that run from yellow to
violet, so what must separate from the wedge is whichever of the two is further
from it — and the two must separate from each other, or they read as one thick
smudge. 580 pairs in total, the outline's worst at 3.29:1.

It also reports what the colour alone is worth, which is how the outline came
to exist: in-key and out-of-key wedges were 1.30:1 apart in Sepia and 1.33:1 in
Light — indistinguishable — against 2.42:1 in Dark. Widening the tokens as far
as the pale palettes allow brought those to 1.57 and 1.51, nowhere near enough
on its own, so the shape carries the meaning and the colour supports it.

---

## Installing on a phone

CircleSong is a PWA, so it installs from the browser — a launcher icon, no
browser chrome, and it keeps working with no signal. No app store, no APK.

**1. Publish it.** [`.github/workflows/pages.yml`](.github/workflows/pages.yml)
deploys the repo to GitHub Pages on every push to `main`. Enable it once at
**Settings → Pages → Source: GitHub Actions**. It is then live at:

```
https://digitalninja-dev.github.io/CircleSong/
```

An origin of its own matters for two reasons beyond tidiness: a service worker
will not install without one, so the PWA cannot go offline, and Permissions
Policy defaults `microphone` to `self`, so the tuner cannot listen inside
somebody else's cross-origin frame no matter what the user allows.

**2. Install it.** On Android, open that URL in Chrome and either take the
**Install** prompt or **⋮ → Add to Home screen**. On iOS, Safari →
**Share → Add to Home Screen**.

Installation needs HTTPS, which Pages provides. To try it on a phone first, run
`npm start` and open your machine's LAN address — the app will run, but Android
only offers to *install* over HTTPS or localhost.

### Testing on a device over USB

With the phone connected and USB debugging on, forward the port so the phone
sees the dev server as localhost, which also satisfies the install requirement:

```bash
adb reverse tcp:8080 tcp:8080
npm start
```

Then open `http://localhost:8080` on the phone. `chrome://inspect` on the desktop
gives you the phone's console and DevTools.

### Updating an installed copy

Nothing to remember: `npm run build` stamps `CACHE` in `sw.js` with a hash of
everything in the cached shell, so shipping a change always invalidates installed
copies. This used to be a hand-written number, and forgetting it looked exactly
like the new feature not working.

---

## The Android app

CircleSong is packaged for Android with [Capacitor](https://capacitorjs.com/),
which wraps the app's own files in a native shell. It needs no server: the whole
app is inside the package, so it works with no signal from the first launch
rather than after a first online visit.

**No Capacitor plugins are used, deliberately.** A plugin would mean a bare
import in the web sources, and the web app's one structural promise is that it
has no runtime dependencies and builds to a single self-contained file. The
native side is configured instead — `capacitor.config.json`, the manifest, and
the theme resources — so `src/` is exactly the same code in the browser and in
the app.

```bash
npm install                # the Capacitor CLI, dev-time only
npm run build:www          # assemble www/ — the files that go in the package
npm run android:sync       # copy them into the native project
npm run android:apk        # -> android/app/build/outputs/apk/debug/*.apk
npm run android:open       # or open the project in Android Studio
```

Always go through `npm run android:apk` rather than calling Gradle directly.
`android/app/src/main/assets/public/` is a synced copy of the web app, and a
Gradle build does not refresh it — running `./gradlew assembleDebug` on its own
packages whatever was last synced, which is how you end up debugging a missing
module rather than the app.

Building locally needs the **Android SDK** and a JDK 21. If you would rather not
install a toolchain, you do not have to: the workflow builds the APK for you.

### Getting a test build onto a phone

Two ways, depending on whether you have a cable.

**From the phone alone.** Run the Android workflow from the Actions tab
("Run workflow"), and it publishes the APK to a fixed release tag, so the link
never changes:

```
https://github.com/DigitalNinja-dev/CircleSong/releases/download/test-build/circlesong-debug.apk
```

Open that on the phone and tap it. Android will ask for permission to install
from the browser the first time — Settings → Apps → Special access → Install
unknown apps — and that is a one-time answer. Every push also attaches the APK
to its own run under Artifacts, but that is a zip behind a GitHub login, which
is why the release link exists.

**Over a cable.**

```bash
adb install -r circlesong-debug.apk    # -r updates in place
```

**Test builds update rather than reinstall.** Android refuses to install an APK
over one signed by a different key, and Gradle invents a debug key when it finds
none — which, on a CI runner, is every single build. So the debug key is
committed at `android/debug.keystore` and every test build is signed with it.
It is not a secret: it holds Android's own published debug credentials and can
only sign a debug build. The release key is a different thing entirely and never
comes near the repository.

**The first install after this change still needs an uninstall.** Any copy
already on the phone was signed with the random key the old runner generated, so
Android will refuse to install over it with `INSTALL_FAILED_UPDATE_INCOMPATIBLE`
— the very error the fixed key exists to remove. Uninstall CircleSong once, then
install; from that build onwards every test APK updates in place.

For the Play Store, tag a release (`v1.0.0`) and the same workflow builds a
signed App Bundle, provided four repository secrets exist:
`ANDROID_KEYSTORE_BASE64` (`base64 -w0 your.keystore`), `ANDROID_STORE_PASSWORD`,
`ANDROID_KEY_ALIAS` and `ANDROID_KEY_PASSWORD`. Without them the tag build skips
the bundle rather than failing — an unsigned release is of no use to anyone. The
keystore never enters the repository; `android/app/build.gradle` reads the
signing config from the environment.

### What the app declares, and why

- **`RECORD_AUDIO` and `MODIFY_AUDIO_SETTINGS`** — the tuner. Capacitor's
  WebChromeClient asks for these at the moment `getUserMedia` runs, but a
  runtime request only succeeds if the permission is declared in the manifest
  first.
- **`android.hardware.microphone` is `required="false"`** — everything except
  the tuner works without one, so a device that has no microphone should still
  be offered the app.
- **`androidScheme: "https"`** — the WebView serves the app from
  `https://localhost`, which is a secure context, so the service worker,
  `AudioWorklet` and `getUserMedia` all behave exactly as they do on the web.
- **minSdk 24** (Android 7). `AudioWorklet` needs a Chromium WebView 66 or
  newer, which is a system component updated through the Play Store rather than
  tied to the OS version.

### The two things `MainActivity` is there for

Everything else about the app is the web app. These two are not reachable from
inside the WebView, so they are the only native code in the project.

- **Where the system bars are.** From targetSdk 35 the window is edge-to-edge
  with no way to opt out, so the page is drawn underneath the status bar and
  the navigation bar. `env(safe-area-inset-*)` does not rescue it: Android's
  WebView fills those in from the display cutout alone, and a status bar is not
  a cutout, so `env(safe-area-inset-top)` is `0` while the clock sits on top of
  the transport. `MainActivity` measures the real insets and the page reads
  them into `--inset-top`, `--inset-right`, `--inset-bottom` and
  `--inset-left`; `env()` stays as the fallback, which is the whole answer in a
  browser. The transport bar pads itself by the top inset rather than moving
  down, so its background still paints behind the status bar.
- **Which way round to draw the system bars.** The app paints its own
  background behind the status bar and the navigation bar, and which one that
  is depends on the in-app theme — so Light and Sepia would put a white clock
  on a white bar. The page tells the shell, which sets it through
  `WindowInsetsControllerCompat`; switching the activity's night mode instead
  would recreate the activity and reload the app.
- **That the app has been put away.** Capacitor's `onPause` only notifies
  plugins — it never pauses the WebView — so a minimised app carries on
  running, and the audio worklet carries on rendering. The page silences itself
  on `visibilitychange` and `pagehide`: transport stopped, notes off,
  microphone released, and then the `AudioContext` suspended, which is the part
  that actually guarantees silence. `MainActivity` calls `WebView.onPause`,
  which is what marks the document hidden so that event is delivered at all; it
  does not pause JavaScript, so the handler still runs.

### Why the app draws its own dropdowns

These were native `<select>`s, and deliberately so: the platform picker cannot
get stuck open, and it is keyboard- and screen-reader-accessible for free. On
Android that turned out not to hold.

Capacitor sets the activity theme on the activity *and* on the application, so
it is also the theme every native control the WebView puts up is built
against — which on Android means the `<select>` popups. They arrived unreadable
twice. First as dark text on a dark panel: the theme was
`Theme.AppCompat.DayNight`, which follows the phone rather than the app, so a
phone in light mode gave light-theme text on a background the theme's stray
`android:background` had already forced dark. Fixing that — a fixed-dark theme
and a pinned alert-dialog theme — produced the second failure, a white sheet
with no legible rows at all.

The common factor is that none of it is reproducible or measurable from a
browser. Every attempt at a fix was a guess whose only verification was
somebody's phone, and the second guess was worse than the first. So the list is
drawn by the page now, in the same overlay the language picker and About
already use: themed with the rest of the app, translated, inset-aware, and
checked here rather than on a device.

The `<select>` elements stay exactly where they are. Each is hidden and given a
button that stands in for it, so everything that reads `select.value`, assigns
to it, refills its options or listens for `change` goes on working untouched —
which is what keeps `src/menu.js` a layer rather than a rewrite. The pinned
alert-dialog theme is gone with the popups it was for; the activity theme stays
fixed dark so that whatever the system does put up matches an app that ships
dark.

### Alternatively, a PWA

None of the above is required for everyday use. The app installs straight from
the browser — see below — and for a thin Play Store wrapper around the hosted
site, [PWABuilder](https://www.pwabuilder.com/) or Bubblewrap will take the
manifest already in this repo and emit a Trusted Web Activity.

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
  theory.js              pitch classes, modes, diatonic harmony, chord specs
  fretboard.js           tunings, voicing search, inversions, voice leading
  harmony.js             functional analysis, suggestions, secondary dominants
  patterns.js            strum, fingerpicking and keyboard patterns
  drum-patterns.js       drum grooves as step grids, by genre and metre
  sequencer.js           lookahead transport, feel, metronome, playhead
  tuner.js               YIN pitch detection, instrument tunings, reference tones
  theme.js               resolving, storing and applying the five themes
  i18n.js                t(), language resolution, and translating the markup
  i18n-data.js           rewrites the data tables into the chosen language
  menu.js                the app's own dropdowns, in place of the platform's
  locales/es.js          Spanish
  locales/hi.js          Hindi
  locales/de.js          German
  locales/id.js          Indonesian
  locales/pt.js          Portuguese
  locales/ru.js          Russian
  locales/vi.js          Vietnamese
  projects.js            saved songs in browser storage
  content.js             harmonic-function copy, mode lessons, progressions
  audio/
    engine.js            AudioContext, presets, signal chain, strum performance
    guitar-processor.js  AudioWorklet — ten string models
    impulse.js           synthesised body, cabinet, and room impulse responses
    drums.js             synthesised drum kit voices
capacitor.config.json    native shell config — app id, web directory, scheme
android/                 the Android project (Capacitor); build output ignored
tools/
  build-single.mjs       bundles everything into dist/circlesong.html
  build-www.mjs          assembles www/ — the files the Android package ships
  fetch-fonts.mjs        regenerates assets/fonts.css (inlined webfont subsets)
  make-icons.mjs         renders icons/ from assets/logo.svg
  i18n-check.mjs         measures translation coverage against the live app
  wheel-contrast.mjs     checks every wedge/ink pair on the wheel against AA
docs/
  AUDIO_QUALITY.md       sound design notes and improvement roadmap
  screenshots/           the images at the top of this file
.github/workflows/
  pages.yml              deploys to GitHub Pages on push to main
  android.yml            builds the APK, and a signed bundle on a tag
dist/
  circlesong.html        generated single-file build — do not edit by hand
```

### Branding

The brand mark lives at `assets/logo.svg` and is referenced by the header and the
About panel. Replace that one file to change the artwork — the build inlines it
as a `data:` URI automatically, so `dist/circlesong.html` stays self-contained.

---

## Repo settings

These live in GitHub's own settings rather than in the tree, so they have to be
set by hand — **Settings → General**, and the **About** panel on the repo home
page.

**Description**

```
Theory-guided guitar tool in the browser: compose on the Circle of Fifths, hear it on a physically modelled guitar, sequence loops into songs, and tune your instrument. Zero dependencies, installable, works offline.
```

**Website**: `https://digitalninja-dev.github.io/CircleSong/`

**Topics**: `music` `music-theory` `guitar` `daw` `circle-of-fifths` `web-audio`
`audioworklet` `physical-modeling` `pwa` `offline-first` `chord-progressions`
`tuner` `javascript` `no-dependencies`

---

## Licence

CircleSong is free software under the
[GNU Affero General Public License v3](LICENSE) or later, with no warranty.

Because it runs as a web application, **section 13** applies: anyone who
interacts with it over a network must be offered the corresponding source of the
version they are using. The app does that with a "Source Code (AGPL v3.0)" link
in its About panel and its footer. If you deploy a modified copy, point that link
at your source. See [NOTICE](NOTICE).
