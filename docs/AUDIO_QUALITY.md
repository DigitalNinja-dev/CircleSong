# Audio Quality: where the sound comes from, and how to make it better

The design prototype used one `OscillatorNode` per note — a triangle or square
wave through a fixed lowpass with an exponential gain envelope. That is a
placeholder: it has no attack transient, no frequency-dependent decay, no
instrument body, and every note has an identical spectrum. It reads as a
synthesizer, not a guitar.

This document records what replaced it, why each piece matters, and the ordered
plan for getting from "clearly a guitar" to "hard to tell from a recording".

---

## 1. What is implemented now

### 1.1 Digital waveguide strings (`src/audio/guitar-processor.js`)

Six independent extended Karplus–Strong string models running in an
`AudioWorklet`. The worklet is not a stylistic choice: the string loop needs
single-sample feedback, and no arrangement of native WebAudio nodes can express
a delay line shorter than one render quantum feeding back into itself.

Per string, per sample:

```
delay line -> fractional-delay allpass -> one-pole loop filter -> loop gain -> back in
                                                              \-> pickup comb -> out
```

The details that carry most of the realism:

| Element | What it does | Why it matters |
|---|---|---|
| Fractional delay (1st-order allpass) | Tunes the loop to an exact period | Integer-only delays are audibly out of tune; error reaches tens of cents on the high strings |
| Loop filter cutoff tracks the fundamental | Damps a roughly fixed *harmonic count* rather than a fixed frequency | A fixed cutoff makes low strings sound like a sitar and high strings like a rubber band |
| Loop gain from a target T60 | Decay is specified in seconds | Lets presets say "4.2 s of sustain" instead of tuning an opaque coefficient |
| Pick-position comb | Notches every (1/β)-th harmonic | The single most recognisable "where on the string was this plucked" cue |
| Two-pole excitation tilt | Gives partials the physical `sin(nπβ)/n²` envelope | Without it the fundamental is weak and the note sounds thin and nasal |
| Pick-hardness lowpass on the burst | Fingertip vs. plectrum | Changes attack character without changing pitch or level |
| Velocity → brightness coupling | Harder playing is brighter | Real strings are nonlinear; fixed-timbre velocity layers are the classic sampler giveaway |
| Bridge coupling between strings | Sympathetic resonance | Un-played strings ring; this is why a strummed acoustic sounds "alive" |
| Per-string stereo placement | Low strings left, high strings right | Matches the physical spread of a guitar in front of a listener |

Verified behaviour (measured through the live graph, `sampleRate` 44.1 kHz):

- Decay tracks the requested T60 within ~7 %.
- No non-finite samples across MIDI 28–88 at full velocity.
- Muting drops output ~30 dB in 250 ms.
- Harmonic envelope falls monotonically above the 3rd partial.

### 1.2 Instrument body (`src/audio/impulse.js`)

A string model on its own sounds like a string in a vacuum. The body is what
makes it an instrument. Each preset convolves with a synthesised impulse
response built from measured resonance frequencies — Helmholtz air mode, top
and back plate modes, and a diffuse tail:

- **Steel dreadnought** — strong 98 Hz air mode, lively top
- **Nylon classical** — lower air mode, warmer, shorter
- **Archtop** — mellow, quick, pronounced low-mids
- **1×12 cabinet** — the ~80 Hz–5 kHz window with a 2.6 kHz presence peak

Two things about how these are specified matter more than the mode lists:

**Modes are given as peak gain in dB, not as amplitudes.** A decaying sinusoid
of amplitude `a` in an impulse response is not an `a`-sized bump in the
frequency response — its resonant gain is `a · τ · sampleRate / 2`. At 48 kHz a
mode with amplitude 1.0 and a 0.14 s T60 is a **+54 dB** resonator. That is what
these bodies were: an F barre, whose root F2 (87 Hz) and octave F3 (175 Hz)
straddle the two strongest modes, came out enormously louder than a chord that
happened to sit between them. `modalIR` now solves for the amplitude from a
stated peak, so a mode means what it says and is independent of both the sample
rate and the chosen T60.

**IRs are normalised by their average gain across 80 Hz–6 kHz.** A convolution's
gain is a property of the whole response, not of its peak sample, so
peak-normalising left the level to chance: the bodies ranged from −1 dB
(cabinet) to +12 dB broadband, and far more than that in the band the guitar
actually occupies. Broadband energy is not the right measure either — a speaker
cabinet is a band-pass, and normalising its total energy leaves it far too loud
inside the band where all the signal is. Measuring where the instrument lives
treats a resonant box and a band-limited speaker alike.

These are generated rather than shipped as audio so the app stays
dependency-free and loads instantly. **Swapping in real recorded IRs is a
drop-in change** — see §2.1, it is the single highest-value upgrade available.

### 1.3 Signal chain (`src/audio/engine.js`)

```
strings -> 70 Hz rumble filter -> drive (clean/soft-clip blend) -> tone stack
        -> body or cab convolution -> glue compressor -> master -> limiter
        -> safety shaper -> out
                          \-> reverb send -> room convolution -^
```

The limiter and safety shaper exist because a six-string strum sums six
correlated transients. They are the last resort, not the plan: with the body
convolution mis-staged they were engaged on *every* strum, and the resulting
soft-clipping was audible as harshness on exactly the chords that excite a body
mode hardest. Measured through the graph for an F barre at full velocity, the
chain used to look like this:

| tap | peak | RMS | crest |
|---|---|---|---|
| worklet out | 0.365 | 0.085 | 4.30 |
| **post body convolution** | **3.243** | **0.930** | 3.49 |
| output | 0.864 | 0.367 | **2.36** |

— a 20.8 dB convolution gain, 10 dB over full scale, and a crest factor halved
by permanent limiting. With the IRs normalised and the preset gains restaged it
now runs 0.77 → 0.73 → 0.81, crest **4.5**, limiter reduction 0.09 dB, and no
samples past the safety knee at all. The chain is transparent and the ceiling is
there for emergencies.

Gain staging targets a worst-case peak near −1.5 dBFS per preset. Peak level is
unchanged from before the fix; RMS is 2–3 dB lower, and that difference is
precisely the distortion that used to be supplying it.

The **70 Hz rumble filter** is first in the chain. The lowest note the
instrument can make is the low E at 82.4 Hz, so everything below it is
excitation noise and the skirt of the air mode — inaudible, and expensive in
headroom.

### 1.4 Retrigger and stop behaviour

Overlapping auditions were the loudest usability problem: tapping through
chords stacked them on top of each other. The worklet now takes a `cut`
message that both drops queued events scheduled at or after a given frame and
damps every ringing string, so the caller cuts first and schedules the
replacement second. Damping attenuates the delay-line *output*, not just its
feedback path — otherwise a "cut" still rings for a full period.

Measured: strings fall to 0.5 % of level in 120 ms and to zero by 300 ms.
Residual output after a cut is the room reverb decaying naturally (9 % at
120 ms, 1.5 % at 600 ms), which is intentional — cutting a reverb tail dead
sounds artificial.

### 1.5 Performance realism (`src/audio/engine.js`, `src/patterns.js`)

Correct notes played mechanically still sound fake. The strum engine adds:

- Sequential string contact across 12–50 ms rather than simultaneous onset
- Upstrokes that start at the treble side and catch fewer strings
- Per-note velocity jitter (±12 %) and timing jitter, scaled by the Humanize
  control so that "machine" really is one
- Pick position drifting slightly across the strings within one stroke
- Palm/fret-hand mutes as a real loop-damping change, not a volume envelope
- Swing as an actual timing offset on offbeats
- **Pick attack** — a short broadband transient at the bridge, played alongside
  the string rather than through it. An ideal plucked string's partials fall off
  at 12 dB/octave from the fundamental, which leaves a low E with essentially no
  energy above 1 kHz; the sound of the plectrum itself is where a strummed steel
  string's 2–6 kHz comes from. Its absence was being masked by clipping
  harmonics, so removing the distortion made adding it necessary. It follows
  pick hardness, is silent for the hammer-excited keyboard presets, and survives
  the fret-hand mute — a muted chuck is mostly this sound.

The pattern data itself carries three things a down/up/velocity model cannot
express, and whose absence had made a reggae skank and a ska stroke literally
identical (same four positions, different labels):

- `strings` — which part of the voicing a stroke catches. Reggae and ska chop
  the top three and leave the low end to the bass; Freddie Green comping lives
  on the inner strings; boom-chick alternates a single bass note against a
  chord.
- `choke` — how long a chord rings, in **beats**, before the fret hand stops it.
  The staccato stop is the character of a chop, and beats is the right unit
  because a player thinks in note values.
- `ghost` — a fully damped percussive stroke. The scratches between the chords
  are most of what makes funk and disco read as funk and disco.

On top of the pattern, `Feel` re-times any figure into double- or half-time.
Double-time is the general form of the thing that separates ska from reggae:
the same gesture, twice as often.

---

## 2. Roadmap: from "clearly a guitar" to "hard to tell"

Ordered by audible improvement per unit of work.

### 2.1 Real recorded impulse responses — *biggest single win*

Replace the synthesised body IRs with measured ones. A guitar body has hundreds
of coupled modes; the ten-mode approximation gets the character but not the
texture.

- **Effort:** low. `AudioEngine._irs` already holds `AudioBuffer`s; point them
  at `decodeAudioData` of a `.wav` instead of the generators.
- **Cost:** ~100–400 KB per IR at 48 kHz mono, or ~40 KB as 16-bit 0.4 s.
- **Sources:** CC0/CC-BY IR packs exist for acoustic bodies and cabinets;
  alternatively record one by tapping a guitar's bridge with a mic and
  deconvolving a sine sweep.
- **Watch for:** licensing, and setting `convolver.normalize` consistently so
  the gain staging in §1.3 still holds.

### 2.2 Body/string coupling instead of series convolution

Today the body is applied *after* the strings, as an effect. Physically the
body loads the string: it changes how the string decays, not just how it
sounds. Feed a scaled body response back into the string's bridge termination.

- **Effort:** medium. The coupling bus already exists in the worklet.
- **Payoff:** wolf notes, pitch-dependent sustain, the "breathing" of a real
  top. This is the difference between a very good model and a convincing one.

### 2.3 Sampled hybrid mode

The honest ceiling of pure modelling is below a good multisample library. Add a
second engine backend that plays recorded notes and crossfades with the model:

- Sampled attacks (the hardest part to model) blended with modelled sustain
- Round-robin sample selection to defeat the machine-gun effect
- 3–4 velocity layers, with the model filling in between
- **Format:** a small `.sfz`-style manifest plus Opus-encoded notes keeps a
  playable set near 2–4 MB; load lazily so first paint stays instant.

This is the largest change and the only one that requires shipping assets, but
it is what separates this from a professional virtual instrument.

### 2.4 Fret and finger noise

Cheap and disproportionately convincing. Real recordings are full of it:

- Squeak on position changes (filtered noise burst, pitch tracks the slide)
- Pick attack noise as a separate transient layer
- Fret buzz on low action and hard velocity
- Release/damping noise when the fretting hand lifts

**Effort:** low. This is arguably better value than §2.3 per hour spent.

### 2.5 String nonlinearity and tension modulation

Real strings sharpen on hard attacks and settle back as they decay. Add a
slight pitch envelope on the delay length driven by amplitude, plus tension
modulation for a subtle chorus on heavy strums.

**Effort:** low-medium — modulate `intDelay`/`apCoef` from the running envelope.

### 2.6 Stiffness / inharmonicity

Steel strings are stiff, so partials are progressively sharp. Adding a cascade
of 2–4 allpass filters in the loop reproduces this and is the difference
between "nylon" and "steel" as much as the body is.

**Effort:** medium — the allpass cascade must be accounted for in the loop
length or the tuning drifts.

### 2.7 Better voicing and fingering realism

- Model the fretting hand: barre chords mute differently than open shapes
- Track which strings a real player would actually let ring
- Voice-leading between consecutive chords in the timeline rather than
  independently picking the "best" shape per chord

**Effort:** medium, and it lives in `src/fretboard.js` rather than the DSP.
This changes what is played, which listeners often read as "tone".

### 2.8 Amp and cabinet depth (electric presets)

- Pre/post gain stages with distinct curves rather than one shaper
- Bias shift and sag under sustained load
- Cabinet IR selection per preset, plus a mic-position blend
- Spring reverb model for surf and reggae

---

## 3. Things deliberately not done

- **No external audio libraries.** Tone.js or similar would add a build step
  and a large dependency without solving the string model, which is the actual
  problem.
- **No `ScriptProcessorNode` fallback.** It is deprecated, runs on the main
  thread, and would glitch under UI load. Browsers without `AudioWorklet` get a
  clear error instead of bad audio.
- **No sample assets in this change.** They are the right long-term answer
  (§2.3) but they are a licensing and repository-size decision, not a technical
  one, so that call belongs to the project owner.

---

## 4. Measuring changes

`AudioEngine.analyser` is tapped post-limiter, and `engine.node` can be tapped
directly for the raw string signal. When changing the model, check:

1. **Decay accuracy** — RMS at 1 s / 3 s / 6 s against the requested T60.
2. **Harmonic envelope** — the fundamental should be within a few dB of the
   loudest partial on a low E; anything peaking above the 5th harmonic is thin.
3. **Non-finite samples** — sweep MIDI 28–88 at velocity 1.0; must be zero.
4. **Peak level** — a full six-string strum at velocity 1.0 must stay under
   1.0 with no clipped samples on every preset.
5. **Loudness match** — presets should peak within ~1 dB of each other.
