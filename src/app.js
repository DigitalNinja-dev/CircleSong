/*
 * CircleSong - Interactive Music Theory & Composition Engine
 * Copyright (C) 2026 Nicolás Raul Jean-Pierre Figueroa
 * https://github.com/DigitalNinja-dev/CircleSong
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// CircleSong — application shell.
//
// Implements the design prototype as a real app: the design's DCLogic component
// tree becomes plain DOM, and its placeholder oscillator synth is replaced by
// the waveguide engine in src/audio/.

import {
  CIRCLE,
  MODES,
  MODE_IDS,
  diatonicChords,
  makeChord,
  scalePitchClasses,
  noteName,
  chordLabel,
  keySignaturePrefersFlats,
  midiToName,
  modeStepsAbsolute,
  chordForSpec,
  describeSpec,
  CHORD_COLOURS,
  CHORD_ALTERATIONS,
} from './theory.js';
import {
  TUNINGS,
  findVoicings,
  resolveVoicing,
  voicingRoles,
  voicingPosition,
  voicingToString,
  VOICING_MODES,
  smoothProgression,
  progressionCost,
  voiceLeadCost,
} from './fretboard.js';
import { AudioEngine, PRESETS } from './audio/engine.js';
import { Sequencer, barDuration, parseTimeSig } from './sequencer.js';
import { RHYTHMS } from './patterns.js';
import { Tuner, INSTRUMENTS, INSTRUMENT_BY_ID, findTuning, midiLabel } from './tuner.js';
import { listProjects, saveProject, loadProject, deleteProject, storageAvailable } from './projects.js';
import { DrumKit, DRUM_KITS, DRUM_VOICES } from './audio/drums.js';
import { DRUM_STYLE_BY_ID, stylesForMeter, styleToPattern, stylesByFamily, varyPattern } from './drum-patterns.js';
import {
  SECTION_ROLES,
  degreeFunction,
  functionLabel,
  suggestNext,
  analyseProgression,
  secondaryDominants,
  scaleForChord,
  idiomaticColours,
} from './harmony.js';
import {
  FUNCTION_NAMES,
  FUNCTION_BLURB,
  MODE_INFO,
  MODE_NAMES,
  MOODS,
  SECTIONS,
  TEMPLATES,
  CIRCLE_LABELS,
  MINOR_LABELS,
  BAR_SIZES,
  TIME_SIGS,
  INTERVAL_NAMES,
  TEMPLATE_FAMILIES,
  nearestBarSize,
} from './content.js';

const $ = (id) => document.getElementById(id);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

const TONE_ORDER = ['acoustic', 'nylon', 'electric', 'crunch', 'jazz', 'reggae', 'piano', 'rhodes'];
const TONE_COLOR = {
  acoustic: 'var(--d)', nylon: 'var(--b)', electric: 'var(--a)',
  crunch: 'var(--c)', jazz: 'var(--c)', reggae: 'var(--b)',
  piano: 'var(--a)', rhodes: 'var(--d)',
};

const TABS = [
  { id: 'circle', label: 'Circle', glyph: 'circle' },
  { id: 'tuner', label: 'Tuner', glyph: 'fork' },
  { id: 'tone', label: 'Tone', glyph: 'square' },
  { id: 'drums', label: 'Drums', glyph: 'grid' },
  { id: 'compose', label: 'Compose', glyph: 'diamond' },
  { id: 'timeline', label: 'Timeline', glyph: 'bars' },
  { id: 'assist', label: 'Assist', glyph: 'spark' },
  { id: 'learn', label: 'Learn', glyph: 'book' },
  { id: 'songs', label: 'Songs', glyph: 'disc' },
];

const params = new URLSearchParams(location.search);
if (params.get('theme') === 'mono') document.documentElement.dataset.accent = 'mono';

const state = {
  projectTitle: 'Untitled Song',
  /** Which saved project this song came from, so Save overwrites it. */
  projectId: null,
  bpm: 96,
  timeSig: '4/4',
  metronome: true,
  loop: true,
  playing: false,
  playheadIndex: -1,

  rootPc: 0,
  modeIdx: 0,
  activeDegree: 0,
  voicingMode: 'root',
  voicingIndex: 0,

  /**
   * How chords are built, applied to whichever degree is chosen. Stored as a
   * recipe rather than a finished chord so a progression survives a key change:
   * `Dm9 – E7♭9 – Am9` in A minor becomes `Gm9 – A7♭9 – Dm9` in D minor without
   * anything being re-entered.
   */
  /**
   * Per-degree variations, keyed by scale degree. A degree with no entry is a
   * plain diatonic triad. Editing one in Compose changes that chord everywhere
   * it appears — including in a timeline that is currently playing — which is
   * what makes trying a 7th or a 9th against the loop a single tap rather than
   * an edit of every bar.
   */
  degreeSpec: {},

  tone: 'acoustic',
  rhythm: 'straight8',
  tuningId: 'standard',
  volume: 0.8,
  /** Each new chord silences the previous one instead of layering over it. */
  cutOnRetrigger: true,
  /** How many beats of the rhythm pattern an audition plays. */
  previewBeats: 4,

  /**
   * Sections are the song's loops — a verse, a chorus, a turnaround. Only one
   * plays at a time; switching while the transport runs waits for the bar line.
   */
  sections: [{ id: 1, name: 'A', barCount: 8, bars: makeBars(8), role: 'verse', smooth: false }],
  activeSection: 0,
  /** {barIdx, slotIdx} of the bar the chord picker is open on, or null. */
  picker: null,
  /** Section queued to take over at the next bar line, or null. */
  queuedSection: null,

  drumsOn: false,
  drumStyle: 'rockDrive',
  drumKit: 'rock',
  drumVolume: 0.7,
  drumFills: true,
  drumHumanize: 0.35,
  /**
   * The editable grid. A style seeds it, after which this is what plays — so
   * anything typed into the sequencer is heard, not overwritten by the preset.
   */
  drumPattern: null,

  activeTab: 'circle',
  moodId: null,
  sectionId: null,
  templateId: null,
  templateFamily: 'All',
  /** Free-text filter over the progression library. */
  templateSearch: '',
  /** Which progression is expanded; only one at a time. */
  templateOpen: null,
  /** Which family of strum/rhythm feels is being browsed. */
  rhythmFamily: 'All',
  showAbout: false,
  // --- tuner ---
  tunerInstrument: 'guitar',
  tunerTuning: 'standard',
  tunerA4: 440,
  /** A string chosen by hand, or null to follow whichever is nearest. */
  tunerTarget: null,
  tunerOn: false,
  tunerReading: null,
  tunerError: '',
  /** Draw the secondary-dominant arrows on the wheel. */
  showSecDom: false,

  /**
   * Key lock turns the wheel from a key picker into an explorer: taps stop
   * changing the key and instead sound the wedge and explain how it relates to
   * the key you locked in.
   */
  rootLocked: false,
  exploreNote: null,
  exploreIsMinor: false,
  /** What a wheel tap sounds while locked: 'chord' or 'note'. */
  exploreMode: 'chord',

  learnModeIdx: 0,
  quiz: {
    modeIdx: null, options: [], answered: false, correct: null, picked: null,
    score: 0, total: 0, streak: 0, bestStreak: 0, mastered: [],
  },
};

function makeBars(n, existing = []) {
  return Array.from({ length: n }, (_, i) => existing[i] || { slots: [null] });
}

/** The section currently being edited and played. */
function activeSection() {
  return state.sections[state.activeSection] || state.sections[0];
}
const bars = () => activeSection().bars;
const barCount = () => activeSection().barCount;

function setBars(nextBars, count) {
  const sec = activeSection();
  sec.bars = nextBars;
  sec.barCount = count ?? nextBars.length;
}

const engine = new AudioEngine();
/** Created on first use — the tuner holds a microphone, so never eagerly. */
let tuner = null;
const sequencer = new Sequencer(engine, () => ({
  bars: bars(),
  bpm: state.bpm,
  timeSig: state.timeSig,
  loop: state.loop,
  metronome: state.metronome,
  rhythm: state.rhythm,
  tuning: TUNINGS[state.tuningId].midi,
  velocity: 1,
  drumsOn: state.drumsOn,
  drumPattern: state.drumPattern,
  drumFills: state.drumFills,
  drumHumanize: state.drumHumanize,
}));

sequencer.onPlayhead = (idx) => {
  state.playheadIndex = idx;
  if (idx === -1 && state.playing && !sequencer.playing) {
    state.playing = false;
    renderTransport();
  }
  renderTimeline();
};

// ---------------------------------------------------------------- audio boot

let audioError = null;

async function ensureAudio() {
  if (engine.ready) {
    if (engine.ctx.state === 'suspended') await engine.ctx.resume();
    return true;
  }
  try {
    await engine.init();
    engine.setPreset(state.tone);
    engine.setMasterVolume(state.volume);

    // Drums join the chain at the master bus: after the guitar's body and
    // cabinet colouring, before the limiter, so a loud groove cannot clip the
    // output and both instruments share one master fader.
    if (!engine.drums) {
      engine.drums = new DrumKit(engine.ctx, engine.master);
      sequencer.drums = engine.drums;
    }
    engine.drums.setKit(state.drumKit);
    engine.drums.setVolume(state.drumVolume);
    audioError = null;
    renderTransport();
    return true;
  } catch (err) {
    audioError = err.message || String(err);
    toast(audioError, true);
    renderTransport();
    return false;
  }
}

let toastTimer = null;
function toast(msg, isError = false) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.toggle('error', isError);
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, isError ? 6000 : 2200);
}

// ------------------------------------------------------------ theory helpers

const modeId = () => MODE_IDS[state.modeIdx];
const tuning = () => TUNINGS[state.tuningId].midi;
const preferFlats = () => keySignaturePrefersFlats(state.rootPc, modeId());

/** The spec the builder controls are currently set to. */
/** A degree with no variation set: the chord the key gives, as a triad. */
const DEFAULT_DEGREE_SPEC = { size: 3, colour: null, alterations: [] };

/** The variation currently set for a degree, or the default if none is. */
function currentSpec(degree = state.activeDegree) {
  const d = ((degree % 7) + 7) % 7;
  const v = state.degreeSpec[d] || DEFAULT_DEGREE_SPEC;
  return {
    degree: d,
    size: v.size ?? 3,
    colour: v.colour ?? null,
    alterations: (v.alterations || []).slice(),
  };
}

/** True when a degree has been varied away from the plain diatonic triad. */
function degreeIsVaried(degree) {
  const v = state.degreeSpec[((degree % 7) + 7) % 7];
  return !!v && (v.size !== 3 || v.colour || (v.alterations && v.alterations.length));
}

/**
 * Change the variation on a degree and push it through the song.
 *
 * Timeline slots follow their degree unless they were edited individually, so
 * re-resolving is what makes the change appear in the bars. Done while the
 * transport runs, the next scheduled bar picks it up — the loop keeps playing
 * and the chords simply become sevenths.
 */
function setDegreeSpec(degree, patch) {
  const d = ((degree % 7) + 7) % 7;
  if (patch === null) delete state.degreeSpec[d];
  else state.degreeSpec[d] = { ...currentSpec(d), ...patch, degree: d };
  reresolveAll();
}

/** The seven degrees of the key, each built to the current recipe. */
function currentChords() {
  return Array.from({ length: 7 }, (_, d) => chordForSpec(state.rootPc, modeId(), currentSpec(d)));
}

/**
 * Chord for a degree. Accepts either a bare degree (built to the live settings)
 * or a stored spec, which is what timeline slots and templates carry.
 */
function chordForDegree(degree, spec = null) {
  if (spec && typeof spec === 'object') {
    return chordForSpec(state.rootPc, modeId(), { ...spec, degree: (spec.degree ?? degree) % 7 });
  }
  return chordForSpec(state.rootPc, modeId(), currentSpec(degree));
}

/**
 * Normalise the shorthand used by templates and moods into a spec. A number is
 * a plain degree; an object may name any part of the recipe.
 */
function toSpec(entry, fallbackSize) {
  if (entry && typeof entry === 'object') {
    return {
      degree: (entry.degree ?? 0) % 7,
      size: entry.size ?? fallbackSize,
      colour: entry.colour ?? null,
      alterations: entry.alterations ? entry.alterations.slice() : [],
    };
  }
  return { degree: entry % 7, size: fallbackSize, colour: null, alterations: [] };
}

/** Templates predate the size selector, so `seventh: true` still means "4 notes". */
function sizeFromLegacy(value, fallback = 3) {
  if (typeof value === 'number') return Math.max(3, Math.min(7, value));
  if (typeof value === 'boolean') return value ? 4 : 3;
  return fallback;
}

function voicingList(chord, mode = state.voicingMode) {
  const m = VOICING_MODES[mode] || VOICING_MODES.root;
  const inversion = m.inversion < chord.intervals.length ? m.inversion : 0;
  let list = findVoicings(chord, { tuning: tuning(), inversion, style: m.style });
  if (!list.length) list = findVoicings(chord, { tuning: tuning(), inversion: 0, style: 'auto' });
  if (!list.length) {
    const fallback = resolveVoicing(chord, 'root', { tuning: tuning() });
    return fallback ? [fallback] : [];
  }
  return list;
}

// ------------------------------------------------------------------ playback

/**
 * Fraction of a bar an audition covers. The rhythm pattern keeps its tempo and
 * is truncated, so "2 beats" sounds like the first half of the real thing
 * rather than the whole thing played twice as fast.
 */
function previewFraction() {
  const { beats } = parseTimeSig(state.timeSig);
  return Math.min(1, state.previewBeats / beats);
}

/**
 * Start of the next audition. When "cut previous sound" is on, everything
 * already ringing or queued is silenced at exactly this moment, so repeated
 * clicks replace each other instead of stacking up.
 */
function auditionStart() {
  const when = engine.currentTime + 0.04;
  if (state.cutOnRetrigger) engine.cut(when);
  return when;
}

async function playChordNow(chord, voicing, { duration, fraction } = {}) {
  if (!(await ensureAudio())) return;
  const dur = duration ?? barDuration(state.timeSig, state.bpm);
  const frac = fraction ?? previewFraction();
  const when = auditionStart();
  sequencer.scheduleChord({ chord, voicing, voicingMode: state.voicingMode }, when, dur, {
    rhythm: state.rhythm,
    tuning: tuning(),
    velocity: 1,
    previewFraction: frac,
  });
  // An audition is a question, not a performance: it has to end on its own.
  // Left alone the strings ring for the preset's full decay — nine seconds on
  // the piano — and the only way to stop them is to play something else.
  engine.damp(when + dur * frac);
}

async function previewDegree(degree) {
  // While the transport runs, tapping a chord selects it without sounding —
  // auditioning over a loop is what turned into audio soup.
  if (sequencer.playing) return;
  const chord = chordForDegree(degree);
  const list = voicingList(chord);
  const v = list.length ? list[state.voicingIndex % list.length] : null;
  if (!v) { toast('No playable shape for that chord in this tuning.'); return; }
  await playChordNow(chord, v);
}

async function playModeScale(idx) {
  if (!(await ensureAudio())) return;
  const steps = modeStepsAbsolute(MODE_IDS[idx]).concat([12]);
  const t0 = auditionStart();
  steps.forEach((off, i) => {
    // Spread the run across strings so the notes ring into each other the way
    // a played scale does, instead of each one choking the last.
    engine.pluckNote({
      midi: 60 + state.rootPc + off,
      tuning: tuning(),
      when: t0 + i * 0.26,
      velocity: 0.8,
      layer: true,
    });
  });
  engine.damp(t0 + steps.length * 0.26 + 0.5, { level: 0.85, time: 0.6 });
}

async function playModeVamp(idx) {
  if (!(await ensureAudio())) return;
  const chords = diatonicChords(state.rootPc, MODE_IDS[idx], false);
  const info = MODE_INFO[idx];
  const dur = Math.max((60 / state.bpm) * 2, 0.9);
  const t0 = auditionStart();
  info.vampDegrees.forEach((d, i) => {
    const chord = chords[d];
    const v = resolveVoicing(chord, 'root', { tuning: tuning() });
    if (!v) return;
    sequencer.scheduleChord({ chord, voicing: v }, t0 + i * dur, dur, {
      rhythm: state.rhythm,
      tuning: tuning(),
      velocity: 1,
    });
  });
  engine.damp(t0 + info.vampDegrees.length * dur);
}

async function togglePlay() {
  if (sequencer.playing) {
    sequencer.stop();
    state.playing = false;
    state.playheadIndex = -1;
  } else {
    if (!(await ensureAudio())) return;
    // An empty timeline still plays: the metronome runs, which is what you
    // want when working out a tempo or a feel before committing chords.
    if (!bars().some((b) => b.slots.some(Boolean)) && !state.metronome) {
      toast('Timeline is empty — add chords, or switch the metronome on.');
    }
    sequencer.start();
    state.playing = true;
  }
  renderTransport();
  renderTimeline();
}

// ------------------------------------------------------------ timeline edits

/**
 * Build a timeline slot. The spec travels with the slot, so the chord can be
 * rebuilt from scratch after a key, mode or tuning change — and so a 9th chord
 * stays a 9th chord when the rest of the timeline is plain triads.
 */
function slotFromDegree(degree, spec = null, voicingMode = state.voicingMode) {
  // `spec` present means this slot was set explicitly — by the picker, a
  // template, or a loaded file — and keeps its own quality. Without one the
  // slot follows whatever variation its degree currently carries, which is how
  // a change in Compose reaches the timeline.
  const full = spec ? { ...toSpec(spec, 3), degree: degree % 7 } : currentSpec(degree);
  const chord = chordForDegree(degree, full);
  const list = voicingList(chord, voicingMode);
  const voicing = list.length ? list[state.voicingIndex % list.length] : null;
  return {
    degree: degree % 7,
    spec: full,
    /** Set individually, so it ignores its degree's variation. */
    override: !!spec,
    chord,
    voicing,
    voicingMode,
    label: chordLabel(chord, VOICING_MODES[voicingMode].inversion, preferFlats()),
    roman: chord.numeral,
  };
}

function assignSlot(barIdx, slotIdx, degree) {
  const d = degree != null ? degree : state.activeDegree;
  const bar = bars()[barIdx];
  if (!bar) return;
  bar.slots[slotIdx] = slotFromDegree(d);
  renderTimeline();
}

function clearSlot(barIdx, slotIdx) {
  const bar = bars()[barIdx];
  if (!bar) return;
  bar.slots[slotIdx] = null;
  if (bar.slots.length === 2 && !bar.slots[0] && !bar.slots[1]) bar.slots = [null];
  renderTimeline();
}

function addHalfBar(barIdx) {
  const bar = bars()[barIdx];
  if (!bar) return;
  bar.slots = [bar.slots[0] || null, slotFromDegree(state.activeDegree)];
  renderTimeline();
}

function applyDegrees(degrees, seventh, mode = null) {
  // A suggestion carries the mode it belongs in, and applying it without
  // switching would produce different chords from the ones it is named for.
  // A locked key overrides that: the user has already said what the song is.
  const target = suggestionMode(mode);
  if (MODE_IDS.includes(target)) state.modeIdx = MODE_IDS.indexOf(target);
  const defaultSize = sizeFromLegacy(seventh, 3);
  const size = nearestBarSize(degrees.length);
  // Each degree carries the quality the progression asked for, so the builder
  // opens on what was just loaded and any bar added by hand matches. The bars
  // then follow their degree rather than freezing a copy, which is what lets
  // the loaded progression be varied afterwards from Compose.
  state.degreeSpec = {};
  for (const entry of degrees) {
    const spec = toSpec(entry, defaultSize);
    state.degreeSpec[spec.degree] = {
      degree: spec.degree,
      size: spec.size,
      colour: spec.colour,
      alterations: spec.alterations,
    };
  }
  const nextBars = makeBars(size);
  degrees.forEach((entry, i) => {
    nextBars[i] = { slots: [slotFromDegree(toSpec(entry, defaultSize).degree)] };
  });
  setBars(nextBars, size);
  state.activeTab = 'timeline';
  render();
  toast(`Loaded ${degrees.length} chords into ${size} bars.`);
}

/**
 * Re-derive every stored shape — used after a key, tuning, or mode change.
 * Each slot rebuilds from its own spec, so a progression keeps the chord
 * qualities it was written with instead of collapsing to the live settings.
 */
function reresolveAll() {
  for (const sec of state.sections) {
    for (const bar of sec.bars) {
      bar.slots = bar.slots.map((slot) =>
        // A slot that was not edited individually re-reads its degree's current
        // variation; one that was keeps what it was given.
        slot ? slotFromDegree(slot.degree, slot.override ? slot.spec : null, slot.voicingMode) : null
      );
    }
  }
  // Smoothing is a property of the section, not a one-off edit, so a key, mode
  // or tuning change re-derives it rather than dropping back to root shapes.
  const active = state.activeSection;
  state.sections.forEach((sec, i) => {
    if (!sec.smooth) return;
    state.activeSection = i;
    applySmoothing();
  });
  state.activeSection = active;
}

// ------------------------------------------------------------------ rendering

function render() {
  renderTransport();
  renderCircle();
  renderTone();
  renderDrums();
  renderCompose();
  renderTimeline();
  renderLearn();
  renderAssist();
  renderSongs();
  renderTuner();
  renderTabs();
}

function renderTabs() {
  const bar = $('tabbar');
  bar.replaceChildren();
  for (const t of TABS) {
    const active = t.id === state.activeTab;
    const b = el('button', active ? 'active' : '');
    b.appendChild(glyph(t.glyph, active));
    b.appendChild(el('span', '', t.label));
    b.onclick = () => {
      // Holding a microphone open on a screen you have navigated away from is
      // both a battery drain and a thing users are right to distrust.
      if (state.activeTab === 'tuner' && t.id !== 'tuner' && state.tunerOn) stopTuner();
      state.activeTab = t.id;
      render();
    };
    bar.appendChild(b);
  }
  for (const t of TABS) {
    const panel = $(`tab-${t.id}`);
    if (panel) panel.hidden = t.id !== state.activeTab;
  }
}

function glyph(kind, active) {
  const i = el('i');
  const col = active ? 'var(--a)' : 'oklch(0.5 0.01 250)';
  const styles = {
    circle: `width:16px;height:16px;border-radius:50%;border:2px solid ${col};`,
    square: `width:14px;height:14px;border:2px solid ${col};`,
    diamond: `width:13px;height:13px;transform:rotate(45deg);border:2px solid ${col};`,
    bars: `width:16px;height:12px;background:linear-gradient(90deg,${col} 3px,transparent 3px);background-size:6px 100%;`,
    book: `width:13px;height:11px;border:2px solid ${col};border-radius:1px 4px 4px 1px;`,
    grid: `width:15px;height:11px;background:
      linear-gradient(90deg,${col} 3px,transparent 3px) 0 0/5px 5px,
      linear-gradient(90deg,transparent 3px,${col} 3px) 0 6px/5px 5px;`,
    spark: `width:14px;height:14px;background:${col};clip-path:polygon(50% 0,61% 35%,100% 35%,69% 57%,82% 100%,50% 75%,18% 100%,31% 57%,0 35%,39% 35%);`,
    fork: `width:12px;height:15px;border:2px solid ${col};border-top:none;border-radius:0 0 6px 6px;`,
    disc: `width:15px;height:15px;border-radius:50%;border:2px solid ${col};box-shadow:inset 0 0 0 3px ${col === 'var(--a)' ? 'transparent' : 'transparent'},0 0 0 0 ${col};position:relative;background:radial-gradient(circle,${col} 0 2px,transparent 2px);`,
  };
  i.setAttribute('style', styles[kind] || styles.square);
  return i;
}

function renderTransport() {
  // The engine state is a single LED rather than a status readout: it matters
  // only when something is wrong, and the key/mode it used to echo is already
  // on the wheel.
  const led = $('armedLed');
  led.classList.toggle('armed', engine.ready && !audioError);
  led.title = audioError
    ? `Audio unavailable — ${audioError}`
    : engine.ready
      ? 'Audio engine ready'
      : 'Tap anything to start audio';

  const play = $('playBtn');
  play.classList.toggle('playing', sequencer.playing);
  play.setAttribute('aria-label', sequencer.playing ? 'Stop' : 'Play');

  $('bpmValue').textContent = state.bpm;
  const bpm = $('bpm');
  if (document.activeElement !== bpm) bpm.value = state.bpm;

  $('timeSigSelect').value = state.timeSig;
  const metro = $('metroBtn');
  metro.setAttribute('aria-pressed', String(state.metronome));
  const loop = $('loopBtn');
  loop.setAttribute('aria-pressed', String(state.loop));
  loop.classList.add('solid');

  const title = $('projectTitle');
  if (document.activeElement !== title) title.value = state.projectTitle;
}

function renderCircle() {
  const scaleSet = new Set(scalePitchClasses(state.rootPc, modeId()));
  const outerStops = [];
  const innerStops = [];
  const labels = $('wheelLabels');
  labels.replaceChildren();

  const posAt = (r, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return { x: 140 + r * Math.sin(a), y: 140 - r * Math.cos(a) };
  };

  // Which degree of the key each pitch class is.
  //
  // Keyed by root *and quality*, because the wheel's two rings are not two
  // views of the same chord: the outer wedge is the major triad on that note
  // and the inner one is the minor. Matching on the root alone labels the A
  // major wedge "i" in A minor, which is exactly backwards — the key's chord on
  // A is Am, and it lives on the inner ring.
  const gradeAt = new Map();
  diatonicChords(state.rootPc, modeId(), 3).forEach((chord, d) => {
    const minorish = chord.intervals[1] === 3; // minor third: minor or diminished
    gradeAt.set(`${chord.root}:${minorish ? 'min' : 'maj'}`, {
      numeral: chord.numeral,
      chord,
      fn: degreeFunction(d, modeId()),
    });
  });

  CIRCLE.forEach((note, i) => {
    const hue = i * 30;
    const isRoot = note === state.rootPc;
    const isDia = scaleSet.has(note);
    const oL = isRoot ? 0.68 : isDia ? 0.56 : 0.26;
    const oC = isRoot ? 0.17 : isDia ? 0.13 : 0.035;

    const minorNote = (note + 9) % 12;
    const isRootMinor = minorNote === state.rootPc;
    const isDiaMinor = scaleSet.has(minorNote);
    const iL = isRootMinor ? 0.56 : isDiaMinor ? 0.44 : 0.2;
    const iC = isRootMinor ? 0.13 : isDiaMinor ? 0.1 : 0.025;

    outerStops.push(`oklch(${oL} ${oC} ${hue}) ${i * 30}deg ${i * 30 + 30}deg`);
    innerStops.push(`oklch(${iL} ${iC} ${hue}) ${i * 30}deg ${i * 30 + 30}deg`);

    const op = posAt(115, i);
    const ip = posAt(66, i);
    const outer = el('span', 'outer', CIRCLE_LABELS[i]);
    outer.style.cssText = `left:${op.x}px;top:${op.y}px;color:${
      isRoot || isDia ? 'oklch(0.99 0.003 250)' : 'oklch(0.75 0.006 250 / 0.7)'
    };`;
    const inner = el('span', 'inner', MINOR_LABELS[i]);
    inner.style.cssText = `left:${ip.x}px;top:${ip.y}px;color:${
      isRootMinor || isDiaMinor ? 'oklch(0.97 0.003 250)' : 'oklch(0.65 0.006 250 / 0.55)'
    };`;
    labels.append(outer, inner);

    // Grade markers. Every wedge that belongs to the key gets its roman
    // numeral, so the whole chord set of the tone is readable straight off the
    // wheel — and it re-labels itself the moment the root moves, which is the
    // point: the same shape on the circle means a different degree in a
    // different key. They ride inside the note label rather than being placed
    // separately, which keeps them off the rim and stops them colliding with
    // the wedge borders.
    const grade = gradeAt.get(`${note}:maj`);
    if (grade) {
      const g = el('i', `grade fn-${grade.fn.toLowerCase()}`, grade.numeral);
      g.title = `${grade.chord.symbol} — ${functionLabel(grade.fn)}`;
      outer.appendChild(g);
    }
    const gradeMinor = gradeAt.get(`${minorNote}:min`);
    if (gradeMinor) {
      const g = el('i', `grade fn-${gradeMinor.fn.toLowerCase()}`, gradeMinor.numeral);
      g.title = `${gradeMinor.chord.symbol} — ${functionLabel(gradeMinor.fn)}`;
      inner.appendChild(g);
    }
  });

  $('wheelOuter').style.background = `conic-gradient(from -15deg, ${outerStops.join(', ')})`;
  $('wheelInner').style.background = `conic-gradient(from -15deg, ${innerStops.join(', ')})`;

  $('hubKey').textContent = noteName(state.rootPc, preferFlats());
  $('hubMode').textContent = MODE_NAMES[state.modeIdx];
  $('circleKeyLabel').textContent = `${noteName(state.rootPc, preferFlats())} ${MODE_NAMES[state.modeIdx]}`;
  $('modeSelect').value = String(state.modeIdx);
  $('modeSelect').disabled = state.rootLocked;

  const lock = $('lockBtn');
  lock.setAttribute('aria-pressed', String(state.rootLocked));
  lock.textContent = state.rootLocked ? '🔒 Key Locked — tap wheel to explore' : '🔓 Lock Key to Explore';

  // The chord/note choice only means anything while locked, so it appears with
  // the mode it belongs to instead of sitting there inert.
  // The chord/note choice governs every note button on this screen, not just
  // the wheel, so it is always available rather than appearing only once the
  // key is locked.
  $('exploreModeRow').hidden = false;
  const modeBtns = $('exploreModeBtns');
  modeBtns.replaceChildren();
  for (const [id, label] of [['chord', 'Chord'], ['note', 'Note']]) {
    const b = el('button', `chip small grow${state.exploreMode === id ? ' active' : ''}`, label);
    b.setAttribute('aria-pressed', String(state.exploreMode === id));
    b.onclick = () => {
      state.exploreMode = id;
      renderCircle();
      // Re-sound the current selection so the difference is immediate.
      if (state.exploreNote !== null) playExplore();
    };
    modeBtns.appendChild(b);
  }

  renderSecondaryDominants(posAt);
  renderExplore();

  // The scale strip: every degree of the key, labelled with its roman numeral
  // so the grades of the tone are visible here as well as on the wheel. It
  // obeys the same Chord/Note switch as the wheel — one setting for every note
  // button on the screen, rather than two rules to remember.
  const strip = $('scaleStrip');
  strip.replaceChildren();
  const keyChords = currentChords();
  scalePitchClasses(state.rootPc, modeId()).forEach((pc, i) => {
    const chord = keyChords[i];
    const b = el('button', i === 0 ? 'tonic' : '');
    b.append(
      el('span', 'strip-note', noteName(pc, preferFlats())),
      el('span', 'strip-grade', chord.numeral)
    );
    b.title = `${noteName(pc, preferFlats())} — degree ${i + 1} of the key (${chord.numeral})`;
    b.onclick = async () => {
      if (!(await ensureAudio())) return;
      // Always one note, whatever the wheel's Chord/Note switch says. This
      // strip is for working out a line over a progression, and it plays on
      // voices of its own: nothing that silences a chord reaches it, no chord
      // can steal its voice, and stopping the transport leaves it ringing.
      engine.pluckMelody({
        midi: 60 + pc + (pc < state.rootPc ? 12 : 0),
        velocity: 0.85,
      });
    };
    strip.appendChild(b);
  });
}

/**
 * Draw each secondary dominant as an arrow into the chord it resolves to.
 *
 * This is the one thing the circle of fifths is uniquely good at showing. A
 * dominant resolves down a fifth, and down a fifth is one step counter-clockwise
 * on this wheel — so every one of these arrows is the same short hop, and seeing
 * six of them at once is what makes the pattern obvious rather than a rule to
 * memorise. The chord list underneath is the part you can play.
 */
function renderSecondaryDominants(posAt) {
  const svg = $('wheelArcs');
  const panel = $('secDomPanel');
  const btn = $('secDomBtn');
  btn.setAttribute('aria-pressed', String(state.showSecDom));
  btn.textContent = state.showSecDom ? 'On' : 'Off';

  svg.replaceChildren();
  panel.hidden = !state.showSecDom;
  if (!state.showSecDom) return;

  const NS = 'http://www.w3.org/2000/svg';
  const doms = secondaryDominants(state.rootPc, modeId());
  // Where each chord root sits on the wheel: CIRCLE lists pitch classes in
  // fifths order, which is exactly the wedge order.
  const wedgeOf = (pc) => CIRCLE.indexOf(pc);

  for (const d of doms) {
    const from = wedgeOf(d.chord.root);
    const to = wedgeOf(d.targetChord.root);
    if (from < 0 || to < 0) continue;
    const isMinorTarget = d.targetChord.intervals[1] === 3;
    // Minor chords live on the inner ring, majors on the outer.
    const r1 = 95;
    const r2 = isMinorTarget ? 84 : 95;
    const a = posAt(r1, from);
    const b = posAt(r2, to);
    // Bow the line toward the hub so arrows never cross the labels.
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const cx = 140 + (mx - 140) * 0.62;
    const cy = 140 + (my - 140) * 0.62;

    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', d.isOwnDominant ? 'var(--a)' : 'var(--c)');
    path.setAttribute('stroke-width', d.isOwnDominant ? '2.2' : '1.4');
    path.setAttribute('opacity', d.isOwnDominant ? '0.95' : '0.6');
    path.setAttribute('marker-end', 'url(#secdom-arrow)');
    svg.appendChild(path);
  }

  // One shared arrowhead.
  const defs = document.createElementNS(NS, 'defs');
  const marker = document.createElementNS(NS, 'marker');
  marker.setAttribute('id', 'secdom-arrow');
  marker.setAttribute('viewBox', '0 0 10 10');
  marker.setAttribute('refX', '8');
  marker.setAttribute('refY', '5');
  marker.setAttribute('markerWidth', '5');
  marker.setAttribute('markerHeight', '5');
  marker.setAttribute('orient', 'auto-start-reverse');
  const head = document.createElementNS(NS, 'path');
  head.setAttribute('d', 'M 0 1 L 9 5 L 0 9 z');
  head.setAttribute('fill', 'var(--c)');
  marker.appendChild(head);
  defs.appendChild(marker);
  svg.insertBefore(defs, svg.firstChild);

  const row = $('secDomRow');
  row.replaceChildren();
  for (const d of doms) {
    const b = el('button', `chip small${d.isOwnDominant ? ' active' : ''}`, d.label);
    b.title = d.why;
    b.onclick = async () => {
      $('secDomHint').textContent = d.why;
      // Hearing it resolve is the explanation — play the dominant, then the
      // chord it lands on.
      if (!(await ensureAudio())) return;
      const dur = Math.max((60 / state.bpm) * 2, 0.85);
      const t0 = auditionStart();
      [d.chord, d.targetChord].forEach((c, i) => {
        const v = resolveVoicing(c, 'root', { tuning: tuning() });
        if (!v) return;
        sequencer.scheduleChord({ chord: c, voicing: v }, t0 + i * dur, dur, {
          rhythm: state.rhythm,
          tuning: tuning(),
          velocity: 1,
        });
      });
      engine.damp(t0 + 2 * dur);
    };
    row.appendChild(b);
  }
  $('secDomHint').textContent = 'Tap one to hear it resolve. Each arrow points at the chord that chord pulls into.';
}

/**
 * Resolve the tapped wedge into the thing to sound and the words to show.
 *
 * The chord is the key's own chord on that root whenever the note belongs, so
 * what you hear matches the roman numeral in the caption — tapping D in C major
 * gives Dm (ii), not D. Off-key wedges fall back to the quality the wheel
 * itself implies: major on the outer ring, minor on the inner.
 */
function exploreTarget() {
  if (state.exploreNote === null) return null;
  const note = state.exploreNote;
  const flats = preferFlats();
  const chords = diatonicChords(state.rootPc, modeId(), false);
  const degree = chords.findIndex((c) => c.root === note);
  const chord =
    degree >= 0
      ? chords[degree]
      : makeChord(note, state.exploreIsMinor ? 'min' : 'maj', { preferFlats: flats });

  // The headline names whatever is actually sounding, so the label never
  // promises a chord the ear does not get.
  const displayName =
    state.exploreMode === 'chord'
      ? chord.symbol
      : noteName(note, flats) + (state.exploreIsMinor ? 'm' : '');

  const interval = ((note - state.rootPc) % 12 + 12) % 12;
  const keyName = noteName(state.rootPc, flats);
  const text =
    degree >= 0
      ? `${displayName} is the ${FUNCTION_NAMES[degree]} (${chords[degree].numeral}) of ${keyName} — a ${INTERVAL_NAMES[interval]} above the root.`
      : `${displayName} sits a ${INTERVAL_NAMES[interval]} from ${keyName} — outside the current key, a borrowed or chromatic color.`;

  return { note, chord, displayName, text };
}

function renderExplore() {
  const card = $('exploreCard');
  const target = exploreTarget();
  if (!target) { card.hidden = true; return; }
  $('exploreName').textContent = target.displayName;
  $('exploreText').textContent = target.text;
  card.hidden = false;
}

/**
 * Sound the current explore selection.
 *
 * A tapped chord uses the selected rhythm, the same as every other chord
 * audition. It used to be a bare single strum, which meant locking the key
 * silently changed how chords were played — tap a wedge unlocked and you heard
 * your feel, tap it locked and you heard a plain downstroke. That was a
 * workaround for taps that strummed for a whole bar and would not stop, which
 * the audition fade now handles properly.
 */
async function playExplore() {
  const target = exploreTarget();
  if (!target || !(await ensureAudio())) return;

  if (state.exploreMode === 'chord') {
    const v = resolveVoicing(target.chord, 'root', { tuning: tuning() });
    if (v) { await playChordNow(target.chord, v); return; }
    // No playable shape in this tuning — fall through to the single note
    // rather than going silent.
  }

  const when = auditionStart();
  engine.pluckNote({ midi: 60 + target.note, tuning: tuning(), when, velocity: 0.85 });
  engine.damp(when + exploreRingSeconds());
}

/** How long a tapped wedge rings before it is faded out. */
function exploreRingSeconds() {
  return Math.max(1.2, barDuration(state.timeSig, state.bpm) * previewFraction());
}

function renderTone() {
  const grid = $('toneGrid');
  grid.replaceChildren();
  for (const id of TONE_ORDER) {
    const p = PRESETS[id];
    const b = el('button', `tone-btn${state.tone === id ? ' active' : ''}`);
    b.style.borderColor = state.tone === id ? TONE_COLOR[id] : '';
    const dot = el('i');
    dot.style.background = TONE_COLOR[id];
    b.append(dot, el('span', '', p.label));
    b.onclick = async () => {
      state.tone = id;
      engine.clearStringOverrides();
      if (await ensureAudio()) engine.setPreset(id);
      // Switching to a keyboard while a strum pattern is loaded would keep
      // playing guitar figures on a piano, which is the thing that makes it
      // sound wrong. Move to a keyboard pattern, and back again on the way out
      // — but never override a choice the user made within the right family.
      const wantsKeys = !!PRESETS[id].isKeyboard;
      const onKeys = KEYBOARD_RHYTHMS.includes(state.rhythm);
      if (wantsKeys && !onKeys) {
        state.rhythm = 'keysBallad';
        state.rhythmFamily = 'Keyboard';
      } else if (!wantsKeys && onKeys) {
        state.rhythm = 'straight8';
        state.rhythmFamily = 'All';
      }
      renderTone();
      previewDegree(state.activeDegree);
    };
    grid.appendChild(b);
  }

  const sliders = $('voiceSliders');
  sliders.replaceChildren();
  const p = PRESETS[state.tone].string;
  const defs = [
    { key: 'volume', label: 'VOLUME', min: 0, max: 1, step: 0.01, value: state.volume, fmt: (v) => `${Math.round(v * 100)}%` },
    { key: 'brightness', label: 'BRIGHTNESS', min: 0.05, max: 1, step: 0.01, value: engine.overrides.brightness ?? p.brightness, fmt: (v) => v.toFixed(2) },
    { key: 'decay', label: 'SUSTAIN', min: 0.2, max: 9, step: 0.1, value: engine.overrides.decay ?? p.decay, fmt: (v) => `${v.toFixed(1)}s` },
    { key: 'pickPos', label: 'PICK POS', min: 0.03, max: 0.4, step: 0.005, value: engine.overrides.pickPos ?? p.pickPos, fmt: (v) => v.toFixed(2) },
  ];
  for (const d of defs) {
    const row = el('div', 'slider-row');
    const lab = el('label', '', d.label);
    const input = document.createElement('input');
    input.type = 'range';
    input.min = d.min; input.max = d.max; input.step = d.step; input.value = d.value;
    input.className = 'grow';
    input.id = `slider-${d.key}`;
    lab.htmlFor = input.id;
    const out = el('output', '', d.fmt(Number(d.value)));
    input.oninput = () => {
      const v = Number(input.value);
      out.textContent = d.fmt(v);
      if (d.key === 'volume') { state.volume = v; engine.setMasterVolume(v); }
      else engine.setStringOverride(d.key, v);
    };
    row.append(lab, input, out);
    sliders.appendChild(row);
  }

  const retrigger = $('retriggerBtn');
  retrigger.setAttribute('aria-pressed', String(state.cutOnRetrigger));
  retrigger.textContent = state.cutOnRetrigger ? 'On' : 'Off';

  const lenRow = $('previewLengthRow');
  lenRow.replaceChildren();
  const { beats } = parseTimeSig(state.timeSig);
  for (let n = 1; n <= 4; n++) {
    const isBar = n >= beats;
    const b = el('button', `chip small${state.previewBeats === n ? ' active' : ''}`, isBar ? '1 bar' : `${n}`);
    b.title = isBar ? 'Play a full bar' : `Play ${n} beat${n > 1 ? 's' : ''}`;
    b.onclick = () => { state.previewBeats = n; renderTone(); previewDegree(state.activeDegree); };
    lenRow.appendChild(b);
  }

  const sel = $('tuningSelect');
  if (!sel.options.length) {
    for (const [id, t] of Object.entries(TUNINGS)) {
      const o = document.createElement('option');
      o.value = id;
      o.textContent = t.label;
      sel.appendChild(o);
    }
    sel.onchange = () => {
      state.tuningId = sel.value;
      state.voicingIndex = 0;
      reresolveAll();
      render();
    };
  }
  sel.value = state.tuningId;

  renderRhythms();
}

/**
 * How the rhythms are grouped for browsing.
 *
 * The pattern data tags each rhythm with what it *is*; this says what a player
 * would go looking for. Eighteen options in one flat column is a scroll rather
 * than a choice, so they are gathered into a handful of families and laid out
 * two across — every option still present, in about a third of the height.
 */
const RHYTHM_FAMILIES = [
  { label: 'Strumming', tags: ['strum'] },
  { label: 'Muted & Percussive', tags: ['percussive'] },
  { label: 'Offbeat', tags: ['offbeat'] },
  { label: 'Jazz Comping', tags: ['comp'] },
  { label: 'Latin & Syncopated', tags: ['syncop'] },
  { label: 'Other Meters', tags: ['3/4', '6/8'] },
  { label: 'Fingerstyle', tags: ['arp', 'sustain'] },
  { label: 'Keyboard', tags: ['keys'] },
];

/** Rhythm ids written for a keyboard rather than a picked instrument. */
const KEYBOARD_RHYTHMS = RHYTHMS.filter((r) => r.tag === 'keys').map((r) => r.id);

function renderRhythms() {
  const sel = $('rhythmFamilySelect');
  if (!sel.options.length) {
    const all = el('option', '', `All feels (${RHYTHMS.length})`);
    all.value = 'All';
    sel.appendChild(all);
    for (const f of RHYTHM_FAMILIES) {
      const n = RHYTHMS.filter((r) => f.tags.includes(r.tag)).length;
      if (!n) continue;
      const o = el('option', '', `${f.label} (${n})`);
      o.value = f.label;
      sel.appendChild(o);
    }
    sel.onchange = () => { state.rhythmFamily = sel.value; renderRhythms(); };
  }
  sel.value = state.rhythmFamily || 'All';

  const list = $('rhythmList');
  list.replaceChildren();
  const wanted = RHYTHM_FAMILIES.filter(
    (f) => (state.rhythmFamily || 'All') === 'All' || f.label === state.rhythmFamily
  );

  for (const fam of wanted) {
    const items = RHYTHMS.filter((r) => fam.tags.includes(r.tag));
    if (!items.length) continue;
    // The heading is skipped when a single family is selected — the dropdown
    // already says which one it is.
    if (wanted.length > 1) list.appendChild(el('span', 'micro-label group-head', fam.label));
    const grid = el('div', 'rhythm-grid');
    for (const r of items) {
      const b = el('button', `rhythm-btn${state.rhythm === r.id ? ' active' : ''}`);
      b.append(el('span', 'name', r.label), el('span', 'tag', r.tag));
      b.onclick = () => { state.rhythm = r.id; renderTone(); previewDegree(state.activeDegree); };
      grid.appendChild(b);
    }
    list.appendChild(grid);
  }
}

/** Seed the editable grid from a named groove. */
function loadDrumStyle(id, { keepKit = false } = {}) {
  const style = DRUM_STYLE_BY_ID[id];
  if (!style) return;
  state.drumStyle = id;
  state.drumPattern = styleToPattern(style, DRUM_VOICES.map((v) => v.id));
  if (!keepKit) {
    state.drumKit = style.kit;
    if (engine.drums) engine.drums.setKit(state.drumKit);
  }
}

/**
 * Highlight the step currently sounding. Driven from the audio clock, so the
 * column shown is the one being heard rather than one a timer guessed at.
 */
let drumPlayheadRaf = null;
function watchDrumPlayhead() {
  cancelAnimationFrame(drumPlayheadRaf);
  const step = () => {
    const grid = $('drumGrid');
    const visible = state.activeTab === 'drums' && !$('tab-drums').hidden;
    if (visible) {
      const win = sequencer.currentBarWindow();
      let current = -1;
      if (win && state.drumPattern) {
        const through = (engine.currentTime - win.start) / win.duration;
        if (through >= 0 && through < 1) current = Math.floor(through * state.drumPattern.steps);
      }
      if (grid.dataset.playStep !== String(current)) {
        grid.dataset.playStep = String(current);
        for (const cell of grid.querySelectorAll('.seq-cell')) {
          cell.classList.toggle('playing', Number(cell.dataset.step) === current);
        }
      }
    }
    drumPlayheadRaf = requestAnimationFrame(step);
  };
  drumPlayheadRaf = requestAnimationFrame(step);
}

/** Steps cycle off -> soft -> medium -> hard, so one tap edits without a menu. */
const STEP_LEVELS = [0, 4, 6, 9];
const nextStepLevel = (v) => STEP_LEVELS[(STEP_LEVELS.indexOf(v) + 1) % STEP_LEVELS.length] ?? 0;

function renderDrums() {
  if (!state.drumPattern) loadDrumStyle(state.drumStyle);
  const pattern = state.drumPattern;

  for (const id of ['drumsBtn', 'drumsQuickBtn']) {
    const b = $(id);
    b.setAttribute('aria-pressed', String(state.drumsOn));
    if (id === 'drumsBtn') b.textContent = state.drumsOn ? 'On' : 'Off';
  }

  const fills = $('drumFillBtn');
  fills.setAttribute('aria-pressed', String(state.drumFills));
  fills.textContent = state.drumFills ? 'On' : 'Off';

  const kitSel = $('drumKitSelect');
  if (!kitSel.options.length) {
    for (const [id, kit] of Object.entries(DRUM_KITS)) {
      const o = document.createElement('option');
      o.value = id;
      o.textContent = kit.label;
      kitSel.appendChild(o);
    }
  }
  kitSel.value = state.drumKit;

  // Only grooves that fit the current metre — a 6/8 clave in 4/4 is not a
  // useful option, it is a bug waiting to be reported.
  const styleSel = $('drumStyleSelect');
  const available = stylesForMeter(state.timeSig);
  styleSel.replaceChildren();
  // Grouped by family: thirty-five grooves in one flat list is a wall.
  for (const [family, styles] of stylesByFamily(available)) {
    const group = document.createElement('optgroup');
    group.label = family;
    for (const style of styles) {
      const o = document.createElement('option');
      o.value = style.id;
      o.textContent = style.label;
      group.appendChild(o);
    }
    styleSel.appendChild(group);
  }
  if (available.some((s) => s.id === state.drumStyle)) styleSel.value = state.drumStyle;

  const swing = $('drumSwing');
  swing.value = pattern.swing || 0;
  $('drumSwingOut').textContent = `${Math.round((pattern.swing || 0) * 100)}%`;
  const human = $('drumHumanize');
  human.value = state.drumHumanize;
  $('drumHumanizeOut').textContent = `${Math.round(state.drumHumanize * 100)}%`;

  // --- the grid ---
  const grid = $('drumGrid');
  grid.replaceChildren();
  grid.style.setProperty('--steps', pattern.steps);
  // Group boundaries land every 4 steps in 4/4 and every 3 in compound metres.
  const group = pattern.steps % 4 === 0 && pattern.steps !== 12 ? 4 : 3;

  for (const voice of DRUM_VOICES) {
    const lane = pattern.lanes[voice.id] || new Array(pattern.steps).fill(0);

    const name = el('button', 'seq-name', voice.label);
    name.title = `Preview ${voice.label}`;
    name.onclick = async () => {
      if (!(await ensureAudio())) return;
      engine.drums.hit(voice.id, engine.currentTime + 0.02, 0.9);
    };
    grid.appendChild(name);

    const row = el('div', 'seq-row');
    lane.forEach((vel, i) => {
      const cell = el('button', `seq-cell${vel ? ' on' : ''}${i % group === 0 ? ' beat' : ''}`);
      cell.dataset.step = String(i);
      cell.dataset.voice = voice.id;
      if (vel) cell.dataset.level = vel >= 9 ? 'hard' : vel >= 6 ? 'med' : 'soft';
      cell.setAttribute('aria-label', `${voice.label} step ${i + 1}`);
      cell.onclick = async () => {
        lane[i] = nextStepLevel(lane[i]);
        pattern.lanes[voice.id] = lane;
        renderDrums();
        // Audition the edit so the grid answers back.
        if (lane[i] && (await ensureAudio())) {
          engine.drums.hit(voice.id, engine.currentTime + 0.02, lane[i] / 9);
        }
      };
      row.appendChild(cell);
    });
    grid.appendChild(row);

    const clear = el('button', 'seq-clear', '✕');
    clear.title = `Clear ${voice.label}`;
    clear.onclick = () => { pattern.lanes[voice.id] = new Array(pattern.steps).fill(0); renderDrums(); };
    grid.appendChild(clear);
  }
}

async function toggleDrums(on = !state.drumsOn) {
  state.drumsOn = on;
  if (on && !(await ensureAudio())) { state.drumsOn = false; }
  renderDrums();
}

function renderCompose() {
  const chords = currentChords();
  const grid = $('chordGrid');
  grid.replaceChildren();
  chords.forEach((c, i) => {
    const b = el('button', `chord-btn${i === state.activeDegree ? ' active' : ''}`);
    b.draggable = true;
    b.append(el('span', 'roman', c.numeral), el('span', 'name', c.symbol));
    b.onclick = () => {
      state.activeDegree = i;
      state.voicingIndex = 0;
      renderCompose();
      previewDegree(i);
    };
    b.ondragstart = (e) => {
      e.dataTransfer.setData('text/plain', String(i));
      e.dataTransfer.effectAllowed = 'copy';
      b.classList.add('dragging');
    };
    b.ondragend = () => b.classList.remove('dragging');
    grid.appendChild(b);
  });

  const chord = chords[state.activeDegree];
  const inv = VOICING_MODES[state.voicingMode].inversion;
  $('activeChordName').textContent = chordLabel(chord, inv < chord.intervals.length ? inv : 0, preferFlats());
  $('activeFunctionName').textContent = FUNCTION_NAMES[state.activeDegree];
  $('activeFunctionBlurb').textContent = FUNCTION_BLURB[state.activeDegree];

  const invRow = $('inversionRow');
  invRow.replaceChildren();
  for (const [id, m] of Object.entries(VOICING_MODES)) {
    const b = el('button', `chip small${state.voicingMode === id ? ' active' : ''}`, m.label);
    if (state.voicingMode === id) { b.style.background = 'var(--c)'; b.style.borderColor = 'var(--c)'; }
    b.onclick = () => {
      state.voicingMode = id;
      state.voicingIndex = 0;
      renderCompose();
      previewDegree(state.activeDegree);
    };
    invRow.appendChild(b);
  }

  renderChordBuilder();
  renderDiagram(chord);
}

/** Note counts the size row offers, labelled the way a chart would name them. */
const CHORD_SIZE_LABELS = [
  [3, '△', 'Triad — root, third, fifth'],
  [4, '7', 'Seventh chord'],
  [5, '9', 'Ninth'],
  [6, '11', 'Eleventh'],
  [7, '13', 'Thirteenth — the full stack'],
];

/**
 * The chord builder: size, colour, alterations.
 *
 * These three rows are what turn a fixed table of seven chords into a way of
 * writing `Dm9 – E7♭9 – Am9`. Options that would not make sense on the current
 * chord are disabled rather than hidden, so the shape of what is available
 * stays learnable.
 */
function renderChordBuilder() {
  const spec = currentSpec();

  const sizeRow = $('chordSizeRow');
  sizeRow.replaceChildren();
  for (const [size, label, title] of CHORD_SIZE_LABELS) {
    const b = el('button', `chip small${spec.size === size ? ' active' : ''}`, label);
    b.title = title;
    b.onclick = () => {
      setDegreeSpec(state.activeDegree, { size });
      state.voicingIndex = 0;
      render();
      previewDegree(state.activeDegree);
    };
    sizeRow.appendChild(b);
  }

  const colourRow = $('chordColourRow');
  colourRow.replaceChildren();
  for (const c of CHORD_COLOURS) {
    const on = spec.colour === c.id;
    const b = el('button', `chip small${on ? ' active' : ''}`, c.label);
    b.title = c.hint;
    if (on) { b.style.background = 'var(--b)'; b.style.borderColor = 'var(--b)'; }
    b.onclick = () => {
      setDegreeSpec(state.activeDegree, { colour: on ? null : c.id });
      state.voicingIndex = 0;
      render();
      previewDegree(state.activeDegree);
    };
    colourRow.appendChild(b);
  }

  // Alterations only mean something on a chord that has a seventh to alter.
  const canAlter = spec.size >= 4 || ['dom', 'm7b5', 'aug', 'sus4', 'sus2'].includes(spec.colour);
  const alterRow = $('chordAlterRow');
  alterRow.replaceChildren();
  for (const a of CHORD_ALTERATIONS) {
    const on = spec.alterations.includes(a.id);
    const b = el('button', `chip small${on ? ' active' : ''}`, a.label);
    b.disabled = !canAlter;
    b.title = canAlter ? `Add a ${a.label}` : 'Alterations need a seventh — pick 7 or larger first.';
    if (on) { b.style.background = 'var(--c)'; b.style.borderColor = 'var(--c)'; }
    b.onclick = () => {
      const alterations = on
        ? spec.alterations.filter((x) => x !== a.id)
        : [...spec.alterations, a.id];
      setDegreeSpec(state.activeDegree, { alterations });
      state.voicingIndex = 0;
      render();
      previewDegree(state.activeDegree);
    };
    alterRow.appendChild(b);
  }

  // Reset this chord, and reset them all. Trying a variation is only free if
  // getting back is free too.
  const varied = degreeIsVaried(state.activeDegree);
  const anyVaried = Array.from({ length: 7 }, (_, d) => degreeIsVaried(d)).some(Boolean);
  const resetRow = $('chordResetRow');
  resetRow.replaceChildren();
  const one = el('button', 'chip small', 'Reset this chord');
  one.disabled = !varied;
  one.onclick = () => {
    setDegreeSpec(state.activeDegree, null);
    state.voicingIndex = 0;
    render();
    previewDegree(state.activeDegree);
  };
  const all = el('button', 'chip small', 'Reset all');
  all.disabled = !anyVaried;
  all.onclick = () => {
    state.degreeSpec = {};
    reresolveAll();
    state.voicingIndex = 0;
    render();
  };
  resetRow.append(one, all);

  $('chordBuilderHint').textContent = describeSpec(state.rootPc, modeId(), spec);
  const sc = scaleForChord(spec, state.rootPc, modeId());
  const avoid = sc.avoidPc === null ? '' : ` Careful with ${noteName(sc.avoidPc, preferFlats())}.`;
  $('chordScaleHint').textContent = `Solo with ${sc.name}. ${sc.why}${avoid}`;
}

function renderDiagram(chord) {
  const svg = $('chordDiagram');
  const NS = 'http://www.w3.org/2000/svg';
  svg.replaceChildren();

  const list = voicingList(chord);
  const v = list.length ? list[state.voicingIndex % list.length] : null;
  if (!v) {
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', '140'); t.setAttribute('y', '105');
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('fill', 'oklch(0.6 0.01 250)');
    t.setAttribute('font-size', '13');
    t.textContent = 'No playable shape';
    svg.appendChild(t);
    $('positionLabel').textContent = '—';
    $('shapeLabel').textContent = '';
    return;
  }

  const STRING_X = [20, 68, 116, 164, 212, 260];
  const FRET_Y = [30, 62, 94, 126, 158, 190];
  const position = voicingPosition(v);
  const roles = voicingRoles(v, chord);
  const roleColor = { R: 'var(--a)', 3: 'var(--b)', 5: 'var(--c)', 7: 'var(--d)' };

  const line = (x1, y1, x2, y2, stroke, w) => {
    const l = document.createElementNS(NS, 'line');
    l.setAttribute('x1', x1); l.setAttribute('y1', y1);
    l.setAttribute('x2', x2); l.setAttribute('y2', y2);
    l.setAttribute('stroke', stroke); l.setAttribute('stroke-width', w);
    svg.appendChild(l);
  };
  const text = (x, y, str, opts = {}) => {
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', x); t.setAttribute('y', y);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-family', 'IBM Plex Mono, monospace');
    t.setAttribute('font-size', opts.size || 10);
    t.setAttribute('font-weight', '600');
    t.setAttribute('fill', opts.fill || 'oklch(0.12 0.01 250)');
    t.textContent = str;
    svg.appendChild(t);
  };

  FRET_Y.forEach((y, i) => line(20, y, 260, y, 'oklch(0.4 0.01 250)', i === 0 && position === 0 ? 3 : 1));
  STRING_X.forEach((x) => line(x, 26, x, 190, 'oklch(0.45 0.01 250)', 1.5));

  v.frets.forEach((f, s) => {
    if (f === null) { text(STRING_X[s], 16, '×', { size: 13, fill: 'oklch(0.5 0.02 25)' }); return; }
    if (f === 0) { text(STRING_X[s], 16, '○', { size: 12, fill: 'oklch(0.7 0.01 250)' }); return; }
    const row = f - position;
    if (row < 0 || row > 4) return;
    const y = FRET_Y[row] + 16;
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', STRING_X[s]); c.setAttribute('cy', y); c.setAttribute('r', '12');
    c.setAttribute('fill', roleColor[roles[s]] || 'var(--d)');
    svg.appendChild(c);
    text(STRING_X[s], y + 4, roles[s]);
  });

  // Note names under the diagram.
  v.midi.forEach((m, s) => {
    if (m === null) return;
    text(STRING_X[s], 206, midiToName(m, preferFlats()), { size: 9, fill: 'oklch(0.6 0.01 250)' });
  });

  $('positionLabel').textContent = position === 0 ? 'Open Position' : `Position — ${position}fr`;
  $('shapeLabel').textContent = `${voicingToString(v)}  ·  ${state.voicingIndex % list.length + 1}/${list.length}`;
}

/**
 * Switch the loop being played and edited. While the transport runs the change
 * is deferred to the next bar line so it lands musically; the chip shows a
 * queued state until it does.
 */
function selectSection(index) {
  if (index === state.activeSection && state.queuedSection === null) return;
  const apply = () => {
    state.activeSection = index;
    state.queuedSection = null;
    renderTimeline();
  };
  if (sequencer.atNextBar(apply)) {
    state.queuedSection = index;
    renderTimeline();
  }
}

function renderSectionTabs() {
  const tabs = $('sectionTabs');
  tabs.replaceChildren();
  state.sections.forEach((sec, i) => {
    const active = i === state.activeSection;
    const queued = state.queuedSection === i;
    const filled = sec.bars.filter((b) => b.slots.some(Boolean)).length;
    const b = el('button', `chip small${active ? ' active' : ''}${queued ? ' queued' : ''}`);
    b.append(el('span', '', sec.name));
    b.append(el('span', 'tag', `${filled}/${sec.barCount}`));
    b.title = queued ? 'Starts at the next bar' : `Loop ${sec.name}`;
    b.onclick = () => selectSection(i);
    b.ondblclick = () => {
      const name = prompt('Loop name', sec.name);
      if (name) { sec.name = name.slice(0, 12); renderTimeline(); }
    };
    tabs.appendChild(b);
  });
  $('delSectionBtn').disabled = state.sections.length < 2;
}

function renderTimeline() {
  renderSectionTabs();
  const row = $('barSizeRow');
  row.replaceChildren();
  for (const size of BAR_SIZES) {
    const b = el('button', `chip small${barCount() === size ? ' active' : ''}`, String(size));
    b.onclick = () => {
      setBars(makeBars(size, bars()), size);
      renderTimeline();
    };
    row.appendChild(b);
  }

  const grid = $('timelineGrid');
  grid.replaceChildren();
  bars().forEach((bar, idx) => {
    const cell = el('div', `bar-cell${idx === state.playheadIndex ? ' playhead' : ''}`);
    const inner = el('div', 'bar-row');
    const n = bar.slots.length;

    bar.slots.forEach((slot, slotIdx) => {
      const s = el('div', `slot${slot ? ' filled' : ''}`);
      s.tabIndex = 0;
      s.setAttribute('role', 'button');
      s.append(
        el('span', 'main', slot ? slot.label : '+'),
        el('span', 'sub', slot ? slot.roman : n === 2 ? (slotIdx === 0 ? 'L' : 'R') : `Bar ${idx + 1}`)
      );
      s.ondragover = (e) => { e.preventDefault(); s.classList.add('dragover'); };
      s.ondragleave = () => s.classList.remove('dragover');
      s.ondrop = (e) => {
        e.preventDefault();
        s.classList.remove('dragover');
        const deg = Number(e.dataTransfer.getData('text/plain'));
        if (!Number.isNaN(deg)) assignSlot(idx, slotIdx, deg);
      };
      s.onclick = () => openPicker(idx, slotIdx);
      s.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker(idx, slotIdx); } };
      if (state.picker && state.picker.barIdx === idx && state.picker.slotIdx === slotIdx) {
        s.classList.add('editing');
      }
      if (slot) {
        const x = el('button', 'clear', '✕');
        x.title = 'Clear';
        x.onclick = (e) => { e.stopPropagation(); clearSlot(idx, slotIdx); };
        s.appendChild(x);
        // How far the hand travels to reach this chord from the one before it.
        // Showing the number is what makes "Smooth voicings" legible rather
        // than magic — the figures visibly drop when it is switched on.
        const prev = previousSlot(idx, slotIdx);
        if (prev && prev.voicing && slot.voicing) {
          const move = Math.max(0, Math.round(voiceLeadCost(prev.voicing, slot.voicing)));
          const tag = el('span', `move${move > 9 ? ' far' : ''}`, `↔${move}`);
          tag.title = move > 9
            ? 'A big jump from the previous chord — try Smooth voicings.'
            : 'Fret movement from the previous chord.';
          s.appendChild(tag);
        }
      }
      inner.appendChild(s);
    });

    if (n === 1) {
      const add = el('button', 'add-half', '+');
      add.title = 'Split bar into two chords';
      add.onclick = () => addHalfBar(idx);
      inner.appendChild(add);
    }

    cell.appendChild(inner);
    grid.appendChild(cell);
  });

  renderSectionRole();
  renderPicker();
  renderAnalysis();

  const smooth = $('smoothBtn');
  smooth.setAttribute('aria-pressed', String(!!section().smooth));
  smooth.textContent = section().smooth ? 'On' : 'Off';
}

/** The section being edited. */
function section() {
  return state.sections[state.activeSection];
}

/** The part of a song that usually follows the one given. */
function nextRole(role) {
  const order = ['intro', 'verse', 'prechorus', 'chorus', 'bridge', 'outro'];
  const i = order.indexOf(role || 'verse');
  return order[Math.min(order.length - 1, i + 1)];
}

/** Every filled slot of the active section, in playing order. */
function filledSlots() {
  const out = [];
  bars().forEach((bar, barIdx) => {
    bar.slots.forEach((slot, slotIdx) => {
      if (slot) out.push({ slot, barIdx, slotIdx });
    });
  });
  return out;
}

/** The chord immediately before a given position, for voice-leading readouts. */
function previousSlot(barIdx, slotIdx) {
  const list = filledSlots();
  const i = list.findIndex((e) => e.barIdx === barIdx && e.slotIdx === slotIdx);
  return i > 0 ? list[i - 1].slot : null;
}

function renderSectionRole() {
  const sel = $('sectionRoleSelect');
  if (!sel.options.length) {
    for (const [id, r] of Object.entries(SECTION_ROLES)) {
      sel.appendChild(el('option', '', r.label)).value = id;
    }
  }
  const role = section().role || 'verse';
  sel.value = role;
  $('sectionRoleHint').textContent = SECTION_ROLES[role].blurb;
}

/**
 * Re-pick every shape in the section so the progression connects.
 *
 * Stored as a flag on the section rather than as frozen shapes, so a key or
 * tuning change re-runs it: the progression stays smooth instead of smooth
 * once.
 */
function applySmoothing() {
  const sec = section();
  const list = filledSlots();
  if (!sec.smooth || list.length < 2) return;
  const voicings = smoothProgression(list.map((e) => e.slot.chord), { tuning: tuning() });
  list.forEach((e, i) => {
    if (voicings[i]) {
      e.slot.voicing = voicings[i];
      e.slot.label = chordLabel(e.slot.chord, 0, preferFlats());
    }
  });
}

function renderAnalysis() {
  const list = filledSlots();
  const card = $('analysisCard');
  if (list.length < 2) { card.hidden = true; return; }
  card.hidden = false;

  const a = analyseProgression(
    list.map((e) => e.slot.spec),
    state.rootPc,
    modeId(),
    section().role || 'verse'
  );
  $('analysisSummary').textContent = `${a.summary}   ·   ${list.map((e) => e.slot.chord.symbol).join(' ')}`;
  $('analysisCadence').textContent = a.cadence ? `${a.cadence.label} — ${a.cadence.note}` : '';

  const notes = $('analysisNotes');
  notes.replaceChildren();
  for (const n of a.notes) notes.appendChild(el('li', n.level, n.text));

  const cost = progressionCost(list.map((e) => e.slot.voicing).filter(Boolean));
  notes.appendChild(el('li', 'idea', `Total fret movement across the loop: ${cost}.`));
}

function openPicker(barIdx, slotIdx) {
  state.picker = { barIdx, slotIdx };
  renderTimeline();
  $('pickerCard').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closePicker() {
  state.picker = null;
  renderTimeline();
}

/**
 * The chord picker.
 *
 * Three layers, in the order a writer needs them: what the app thinks should
 * come next and why, then every chord the key contains, then the controls to
 * take whichever chord was chosen and turn it into the exact voicing wanted.
 */
function renderPicker() {
  const card = $('pickerCard');
  if (!state.picker) { card.hidden = true; return; }
  card.hidden = false;

  const { barIdx, slotIdx } = state.picker;
  const bar = bars()[barIdx];
  if (!bar || !bar.slots.length) { card.hidden = true; state.picker = null; return; }
  const slot = bar.slots[slotIdx];
  const role = section().role || 'verse';
  $('pickerTitle').textContent =
    bar.slots.length === 2 ? `BAR ${barIdx + 1} · ${slotIdx === 0 ? 'FIRST' : 'SECOND'} HALF` : `BAR ${barIdx + 1}`;

  // Everything written before this position is the context for the suggestion.
  const list = filledSlots();
  const before = list.filter((e) => e.barIdx < barIdx || (e.barIdx === barIdx && e.slotIdx < slotIdx));
  const suggestions = suggestNext({
    tonicPc: state.rootPc,
    modeId: modeId(),
    written: before.map((e) => e.slot.spec),
    role,
    position: before.length,
    total: Math.max(list.length + 1, barCount()),
  }).slice(0, 5);

  const sug = $('pickerSuggestions');
  sug.replaceChildren();
  for (const s of suggestions) {
    const row = el('button', 'suggest');
    row.append(
      el('span', 'suggest-chord', s.chord.symbol),
      el('span', 'suggest-numeral', s.chord.numeral),
      el('span', `suggest-tag tag-${s.tag.toLowerCase()}`, s.tag),
      el('span', 'suggest-why', s.reason)
    );
    row.onclick = () => {
      setSlotSpec(barIdx, slotIdx, s.spec);
      previewSlot(barIdx, slotIdx);
    };
    sug.appendChild(row);
  }

  // Every chord in the key, at the size the builder is set to.
  const scaleRow = $('pickerScale');
  scaleRow.replaceChildren();
  currentChords().forEach((c, d) => {
    const on = slot && slot.spec.degree === d;
    const b = el('button', `chip small${on ? ' active' : ''}`);
    b.append(el('span', '', c.symbol), el('span', 'tag', c.numeral));
    b.onclick = () => {
      setSlotSpec(barIdx, slotIdx, { ...currentSpec(d) });
      previewSlot(barIdx, slotIdx);
    };
    scaleRow.appendChild(b);
  });

  // Per-chord editing, once there is a chord to edit.
  const edit = $('pickerEdit');
  edit.hidden = !slot;
  if (!slot) return;
  const spec = slot.spec;
  // Only a slot that has been pinned to its own quality has anything to give
  // back, so the button says what it does and is otherwise out of the way.
  const reset = $('pickerResetBtn');
  reset.disabled = !slot.override;
  reset.title = slot.override
    ? 'Drop this bar\'s own setting and follow the chord variation from Compose.'
    : 'This bar already follows the chord variation set in Compose.';

  const sizeRow = $('pickerSizeRow');
  sizeRow.replaceChildren();
  for (const [size, label, title] of CHORD_SIZE_LABELS) {
    const b = el('button', `chip small${spec.size === size ? ' active' : ''}`, label);
    b.title = title;
    b.onclick = () => { setSlotSpec(barIdx, slotIdx, { ...spec, size }); previewSlot(barIdx, slotIdx); };
    sizeRow.appendChild(b);
  }

  // Colours the key actually suggests for this degree come first and are
  // marked, so the list teaches which ones belong rather than just listing all.
  const idiomatic = new Set(idiomaticColours(spec.degree, modeId()).map((c) => c.colour));
  const colourRow = $('pickerColourRow');
  colourRow.replaceChildren();
  for (const c of CHORD_COLOURS) {
    const on = (spec.colour ?? null) === c.id;
    const b = el('button', `chip small${on ? ' active' : ''}${idiomatic.has(c.id) ? ' idiomatic' : ''}`, c.label);
    b.title = idiomatic.has(c.id) ? `${c.hint} — idiomatic on this degree.` : c.hint;
    b.onclick = () => {
      setSlotSpec(barIdx, slotIdx, { ...spec, colour: on ? null : c.id });
      previewSlot(barIdx, slotIdx);
    };
    colourRow.appendChild(b);
  }

  const canAlter = spec.size >= 4 || ['dom', 'm7b5', 'aug', 'sus4', 'sus2'].includes(spec.colour);
  const alterRow = $('pickerAlterRow');
  alterRow.replaceChildren();
  for (const a of CHORD_ALTERATIONS) {
    const on = (spec.alterations || []).includes(a.id);
    const b = el('button', `chip small${on ? ' active' : ''}`, a.label);
    b.disabled = !canAlter;
    b.onclick = () => {
      const alterations = on
        ? spec.alterations.filter((x) => x !== a.id)
        : [...(spec.alterations || []), a.id];
      setSlotSpec(barIdx, slotIdx, { ...spec, alterations });
      previewSlot(barIdx, slotIdx);
    };
    alterRow.appendChild(b);
  }

  const sc = scaleForChord(spec, state.rootPc, modeId());
  $('pickerHint').textContent = `${describeSpec(state.rootPc, modeId(), spec)} Solo with ${sc.name}.`;
}

function setSlotSpec(barIdx, slotIdx, spec) {
  const bar = bars()[barIdx];
  if (!bar) return;
  bar.slots[slotIdx] = slotFromDegree(spec.degree, spec);
  applySmoothing();
  renderTimeline();
}

async function previewSlot(barIdx, slotIdx) {
  const slot = bars()[barIdx] && bars()[barIdx].slots[slotIdx];
  if (!slot || !slot.voicing || sequencer.playing) return;
  await playChordNow(slot.chord, slot.voicing);
}

/**
 * The song library and audio export.
 *
 * Saving reuses the exact JSON that export writes, so a saved project and an
 * exported file are the same thing — there is no second format to keep in step.
 */
/**
 * The tuner panel.
 *
 * The detector lives in src/tuner.js; this is the face of it. Reference pitches
 * are played on the melody voices rather than a synthesised sine, so the note
 * you match against is the instrument the rest of the app uses — and, because
 * those voices sit outside the reach of `cut`, a reference tone cannot be
 * silenced by anything else that happens.
 */
function renderTuner() {
  const instSel = $('tunerInstrument');
  if (!instSel.options.length) {
    for (const inst of INSTRUMENTS) {
      const o = el('option', '', inst.label);
      o.value = inst.id;
      instSel.appendChild(o);
    }
  }
  instSel.value = state.tunerInstrument;

  const inst = INSTRUMENT_BY_ID[state.tunerInstrument] || INSTRUMENTS[0];
  const tunSel = $('tunerTuning');
  tunSel.replaceChildren();
  for (const t of inst.tunings) {
    const o = el('option', '', t.label);
    o.value = t.id;
    tunSel.appendChild(o);
  }
  const tuning = findTuning(state.tunerInstrument, state.tunerTuning);
  tunSel.value = tuning.id;

  // Strings. Tapping one sounds its reference pitch and pins the tuner to it;
  // tapping the pinned one again hands it back to auto-detect.
  const strings = $('tunerStrings');
  strings.replaceChildren();
  const reading = state.tunerReading;
  const chromatic = tuning.notes.length > 12;
  if (chromatic) {
    strings.appendChild(el('p', 'body-copy tight', 'Chromatic: play any note and it will name it.'));
  } else {
    tuning.notes.forEach((midi, i) => {
      const pinned = state.tunerTarget === midi;
      const live = reading && reading.midi === midi && reading.state !== 'off';
      const b = el('button', `tuner-string${pinned ? ' pinned' : ''}${live ? ' live' : ''}${live && reading.state === 'locked' ? ' locked' : ''}`);
      b.append(
        el('span', 'ts-name', midiLabel(midi)),
        el('span', 'ts-index', `${i + 1}`)
      );
      b.onclick = async () => {
        state.tunerTarget = pinned ? null : midi;
        if (tuner) tuner.setTarget(state.tunerTarget);
        renderTuner();
        if (await ensureAudio()) engine.pluckMelody({ midi, velocity: 0.8 });
      };
      strings.appendChild(b);
    });
  }

  // A4 reference.
  const a4Row = $('tunerA4Row');
  a4Row.replaceChildren();
  for (const hz of [432, 436, 438, 440, 442, 444]) {
    const b = el('button', `chip small${state.tunerA4 === hz ? ' active' : ''}`, String(hz));
    b.onclick = () => {
      state.tunerA4 = hz;
      if (tuner) { tuner.a4 = hz; tuner.setNotes(tuning.notes, state.tunerTarget); }
      renderTuner();
    };
    a4Row.appendChild(b);
  }

  const btn = $('tunerMicBtn');
  btn.setAttribute('aria-pressed', String(state.tunerOn));
  btn.textContent = state.tunerOn ? 'On' : 'Off';

  const err = $('tunerError');
  err.hidden = !state.tunerError;
  err.textContent = state.tunerError;

  renderTunerReadout();
}

/** The needle and the numbers. Kept apart so it can update without a re-render. */
function renderTunerReadout() {
  const r = state.tunerReading;
  const note = $('tunerNote');
  const freq = $('tunerFreq');
  const cents = $('tunerCents');
  const stateEl = $('tunerState');
  const needle = $('tunerNeedle');

  if (!r || r.state === 'off' || r.midi === null) {
    note.textContent = state.tunerOn ? '—' : (state.tunerTarget !== null ? midiLabel(state.tunerTarget) : '—');
    freq.textContent = state.tunerOn ? 'listening…' : 'Turn Listen on, then play a string.';
    cents.textContent = '';
    stateEl.textContent = '';
    stateEl.className = 'tuner-state';
    needle.style.left = '50%';
    needle.className = 'tuner-needle';
    return;
  }

  note.textContent = midiLabel(r.midi);
  freq.textContent = r.freq ? `${r.freq.toFixed(1)} Hz` : '';
  const c = Math.max(-50, Math.min(50, r.cents));
  cents.textContent = `${c > 0 ? '+' : ''}${c.toFixed(1)} cents`;
  needle.style.left = `${50 + c}%`;
  needle.className = `tuner-needle ${r.state}`;
  stateEl.className = `tuner-state ${r.state}`;
  stateEl.textContent =
    r.state === 'locked' ? 'IN TUNE'
      : r.state === 'flat' ? 'FLAT — tighten'
        : 'SHARP — loosen';
}

/** Start or stop listening. */
async function toggleTuner() {
  if (state.tunerOn) {
    stopTuner();
    return;
  }
  state.tunerError = '';
  if (!(await ensureAudio())) {
    state.tunerError = 'Audio could not start, so the tuner cannot listen.';
    renderTuner();
    return;
  }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    state.tunerError = 'This browser does not offer microphone access to the page.';
    renderTuner();
    return;
  }
  try {
    if (!tuner) {
      tuner = new Tuner(engine.ctx);
      tuner.onUpdate = (u) => {
        state.tunerReading = u;
        renderTunerReadout();
      };
    }
    tuner.a4 = state.tunerA4;
    const tuning = findTuning(state.tunerInstrument, state.tunerTuning);
    tuner.setNotes(tuning.notes, state.tunerTarget);
    await tuner.start();
    state.tunerOn = true;
  } catch (e) {
    // Denied, or blocked by the page's permissions policy — which is what
    // happens inside a sandboxed iframe that was not granted the microphone.
    state.tunerOn = false;
    state.tunerError =
      e && e.name === 'NotAllowedError'
        ? 'Microphone access was refused. Allow it for this page, or open CircleSong in its own tab — an embedded frame is often not permitted to ask.'
        : `The microphone could not be opened — ${e && e.message ? e.message : 'unknown error'}.`;
  }
  renderTuner();
}

function stopTuner() {
  if (tuner) tuner.stop();
  state.tunerOn = false;
  state.tunerReading = null;
  renderTuner();
}

function renderSongs() {
  const secs = state.sections.length;
  const filled = state.sections.reduce(
    (n, sec) => n + sec.bars.filter((b) => b.slots.some(Boolean)).length,
    0
  );
  $('songsCurrent').textContent =
    `${state.projectTitle} · ${noteName(state.rootPc, preferFlats())} ${MODE_NAMES[state.modeIdx]} · ${state.bpm} BPM · ${secs} loop${secs === 1 ? '' : 's'} · ${filled} bars written`;


  $('saveProjectBtn').disabled = !storageAvailable();

  const list = $('projectList');
  list.replaceChildren();
  const projects = listProjects();
  $('projectsEmpty').hidden = projects.length > 0;

  for (const p of projects) {
    const row = el('div', `project-row${state.projectId === p.id ? ' active' : ''}`);
    const info = el('div', 'project-info');
    info.append(
      el('span', 'project-title', p.title),
      el('span', 'project-meta', `${p.key || ''} · ${p.bpm || '?'} BPM · ${p.sections || 1} loop${p.sections === 1 ? '' : 's'} · ${timeAgo(p.savedAt)}`)
    );
    const actions = el('div', 'row gap-xs');
    const open = el('button', 'chip small', 'Open');
    open.onclick = () => openProject(p.id);
    const del = el('button', 'chip small', 'Delete');
    del.onclick = () => {
      if (!confirm(`Delete “${p.title}”? This cannot be undone.`)) return;
      deleteProject(p.id);
      if (state.projectId === p.id) state.projectId = null;
      renderSongs();
      toast('Project deleted.');
    };
    actions.append(open, del);
    row.append(info, actions);
    list.appendChild(row);
  }
}

function timeAgo(ts) {
  if (!ts) return 'saved';
  const secs = Math.max(0, (Date.now() - ts) / 1000);
  if (secs < 60) return 'just now';
  if (secs < 3600) return `${Math.floor(secs / 60)} min ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)} h ago`;
  return new Date(ts).toLocaleDateString();
}

function openProject(id) {
  const data = loadProject(id);
  if (!data) { toast('That project could not be read.', true); return; }
  applySongData(data);
  state.projectId = id;
  render();
  toast(`Opened “${state.projectTitle}”.`);
}

function doSaveProject(asNew = false) {
  if (!storageAvailable()) {
    toast('This browser will not let the app save locally.', true);
    return;
  }
  const result = saveProject(songData(), asNew ? null : state.projectId);
  if (result.error) { toast(result.error, true); return; }
  state.projectId = result.id;
  renderSongs();
  toast(`Saved “${state.projectTitle}”.`);
}

function renderLearn() {
  const row = $('learnModeRow');
  row.replaceChildren();
  MODE_NAMES.forEach((label, i) => {
    const b = el('button', `chip${i === state.learnModeIdx ? ' active' : ''}`, label);
    if (i === state.learnModeIdx) { b.style.background = 'var(--c)'; b.style.borderColor = 'var(--c)'; }
    b.onclick = () => { state.learnModeIdx = i; renderLearn(); };
    row.appendChild(b);
  });

  const info = MODE_INFO[state.learnModeIdx];
  $('learnName').textContent = MODE_NAMES[state.learnModeIdx];
  $('learnAlsoKnown').textContent = info.alsoKnown;
  $('learnFormula').textContent = info.formula;
  $('learnMood').textContent = info.mood;
  $('learnUse').textContent = info.use;

  // Degree strip: which notes this mode alters relative to the major scale.
  // That single row is what actually distinguishes one mode from another.
  const major = modeStepsAbsolute('ionian');
  const here = modeStepsAbsolute(MODE_IDS[state.learnModeIdx]);
  const strip = $('diffStrip');
  strip.replaceChildren();
  here.slice(0, 7).forEach((val, i) => {
    const delta = val - major[i];
    const cell = el('div', delta !== 0 ? 'altered' : '', delta === 0 ? String(i + 1) : `${delta < 0 ? '♭' : '♯'}${i + 1}`);
    strip.appendChild(cell);
  });

  const q = state.quiz;
  $('quizScore').textContent = `${q.score} / ${q.total}`;
  $('quizStreak').textContent = `Streak: ${q.streak} (best ${q.bestStreak})`;

  const dots = $('masteryDots');
  dots.replaceChildren();
  MODE_NAMES.forEach((label, i) => {
    const dot = el('i', q.mastered.includes(i) ? 'on' : '');
    dot.title = `${label}${q.mastered.includes(i) ? ' — identified' : ''}`;
    dots.appendChild(dot);
  });
  $('quizStartBtn').textContent = q.modeIdx !== null ? '↻ New Round' : '▶ Start';
  $('quizReplayBtn').hidden = q.modeIdx === null;

  const opts = $('quizOptions');
  opts.hidden = q.modeIdx === null;
  opts.replaceChildren();
  for (const idx of q.options) {
    let cls = 'quiz-opt';
    if (q.answered) {
      if (idx === q.modeIdx) cls += ' correct';
      else if (idx === q.picked) cls += ' wrong';
    }
    const b = el('button', cls, MODE_NAMES[idx]);
    b.onclick = () => answerQuiz(idx);
    opts.appendChild(b);
  }
  $('quizFeedback').textContent = q.answered
    ? q.correct ? 'Correct! 🎧' : `Not quite — that was ${MODE_NAMES[q.modeIdx]}`
    : '';
}

function answerQuiz(idx) {
  const q = state.quiz;
  if (q.answered || q.modeIdx === null) return;
  q.answered = true;
  q.picked = idx;
  q.correct = idx === q.modeIdx;
  q.total += 1;
  if (q.correct) {
    q.score += 1;
    q.streak += 1;
    q.bestStreak = Math.max(q.bestStreak, q.streak);
    if (!q.mastered.includes(q.modeIdx)) q.mastered.push(q.modeIdx);
  } else {
    q.streak = 0;
  }
  renderLearn();
}

function startQuiz() {
  const correct = Math.floor(Math.random() * 7);
  const opts = new Set([correct]);
  while (opts.size < 4) opts.add(Math.floor(Math.random() * 7));
  const arr = [...opts];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  state.quiz = { ...state.quiz, modeIdx: correct, options: arr, answered: false, correct: null, picked: null };
  renderLearn();
  playModeVamp(correct);
}

/**
 * The chords a suggestion will actually produce in the current key. Building
 * them rather than storing labels means what is shown can never drift from what
 * is heard — which is the whole point of showing it. Entries may be bare
 * degrees or full specs, so a template can call for an altered dominant.
 */
function chordsForSuggestion(degrees, seventh, mode) {
  const modeName = suggestionMode(mode);
  const size = sizeFromLegacy(seventh, 3);
  return degrees.map((entry) => chordForSpec(state.rootPc, modeName, toSpec(entry, size)));
}

/** The roman-numeral summary of a progression. */
function numeralsFor(degrees, seventh, mode) {
  return chordsForSuggestion(degrees, seventh, mode).map((c) => c.numeral).join('–');
}

/** The chord names a progression produces in the current key. */
function chordNamesFor(degrees, seventh, mode) {
  return chordsForSuggestion(degrees, seventh, mode).map((c) => c.symbol).join(' ');
}

/**
 * The mode a suggestion should be read and played in.
 *
 * Templates carry the mode they belong to, which is right when browsing freely
 * — a Mixolydian riff is not the same idea in Ionian. But once the key is
 * locked the user has said what the song is, and a suggestion that silently
 * changes the mode out from under them is no longer a suggestion in their song.
 * Locking therefore wins: everything in Assist is shown, auditioned and applied
 * in the locked key.
 */
function suggestionMode(templateMode) {
  if (state.rootLocked) return modeId();
  return templateMode && MODE_IDS.includes(templateMode) ? templateMode : modeId();
}

function renderAssist() {
  const keyName = `${noteName(state.rootPc, preferFlats())} ${MODE_NAMES[state.modeIdx]}`;
  $('assistKeyName').textContent = keyName;
  $('assistKeyLock').textContent = state.rootLocked
    ? '🔒 locked — suggestions stay in this key'
    : 'unlocked — a suggestion may bring its own mode';
  $('assistKeyBanner').classList.toggle('locked', state.rootLocked);

  const moodRow = $('moodRow');
  moodRow.replaceChildren();
  for (const m of MOODS) {
    const b = el('button', `chip${state.moodId === m.id ? ' active' : ''}`, m.label);
    if (state.moodId === m.id) { b.style.background = 'var(--b)'; b.style.borderColor = 'var(--b)'; }
    b.onclick = () => { state.moodId = m.id; state.templateId = null; renderAssist(); };
    moodRow.appendChild(b);
  }

  const mood = MOODS.find((m) => m.id === state.moodId);
  $('suggestionCard').hidden = !mood;
  if (mood) {
    $('suggestionLabel').textContent = `${mood.label} — ${numeralsFor(mood.degrees, mood.seventh, mood.mode)}`;
    $('suggestionText').textContent =
      `${chordNamesFor(mood.degrees, mood.seventh, mood.mode)} · ${mood.text}`;
  }

  const secRow = $('sectionRow');
  secRow.replaceChildren();
  for (const s of SECTIONS) {
    const b = el('button', `chip${state.sectionId === s.id ? ' active' : ''}`, s.label);
    if (state.sectionId === s.id) { b.style.background = 'var(--c)'; b.style.borderColor = 'var(--c)'; }
    b.onclick = () => { state.sectionId = state.sectionId === s.id ? null : s.id; renderAssist(); };
    secRow.appendChild(b);
  }

  const variants = $('sectionVariants');
  variants.replaceChildren();
  const section = SECTIONS.find((s) => s.id === state.sectionId);
  if (section) {
    for (const v of section.variants) {
      const card = el('div', 'variant-card');
      const head = el('div', 'row between');
      head.append(el('span', 'label', v.label));
      const apply = el('button', 'chip', 'Apply');
      apply.onclick = () => applyDegrees(v.degrees, v.seventh);
      head.appendChild(apply);
      card.append(head);
      card.append(el('span', 'variant-numerals', `${numeralsFor(v.degrees, v.seventh)}  ·  ${chordNamesFor(v.degrees, v.seventh)}`));
      card.append(el('p', '', v.blurb));
      variants.appendChild(card);
    }
  }

  renderTemplateLibrary();
}

/**
 * The progression library.
 *
 * There are now around fifty progressions across eight families, and a flat
 * column of full-height cards makes that a scroll rather than a choice. Three
 * things fix it without hiding a single option: a family dropdown, a search
 * that also looks inside the song lists — "Marley" or "I-V-vi-IV" both find
 * something — and rows that stay one line until you open one.
 */
function renderTemplateLibrary() {
  const sel = $('templateFamilySelect');
  if (!sel.options.length) {
    const all = el('option', '', `All families (${TEMPLATES.length})`);
    all.value = 'All';
    sel.appendChild(all);
    for (const fam of TEMPLATE_FAMILIES) {
      const n = TEMPLATES.filter((t) => t.family === fam).length;
      const o = el('option', '', `${fam} (${n})`);
      o.value = fam;
      sel.appendChild(o);
    }
    sel.onchange = () => { state.templateFamily = sel.value; renderAssist(); };
  }
  sel.value = state.templateFamily || 'All';

  const search = $('templateSearch');
  if (search.value !== state.templateSearch) search.value = state.templateSearch || '';
  if (!search.oninput) {
    search.oninput = () => {
      state.templateSearch = search.value;
      renderTemplateLibrary();
    };
  }

  const wanted = state.templateFamily && state.templateFamily !== 'All' ? state.templateFamily : null;
  const q = (state.templateSearch || '').trim().toLowerCase();
  const matches = TEMPLATES.filter((t) => {
    if (wanted && t.family !== wanted) return false;
    if (!q) return true;
    // Search the words a person would actually reach for: the name, the family,
    // the numerals as displayed, and the songs it is known from.
    const hay = [
      t.label,
      t.family,
      t.blurb,
      numeralsFor(t.degrees, t.seventh, t.mode),
      chordNamesFor(t.degrees, t.seventh, t.mode),
      ...(t.songs || []),
    ].join(' ').toLowerCase();
    return hay.includes(q);
  });

  $('templateCount').textContent =
    `${matches.length} PROGRESSION${matches.length === 1 ? '' : 'S'}${q ? ` MATCHING “${state.templateSearch.trim()}”` : ''}`;

  const tpl = $('templateList');
  tpl.replaceChildren();
  if (!matches.length) {
    tpl.appendChild(el('p', 'body-copy', 'Nothing matches that. Try a song name, a chord, or clear the search.'));
    return;
  }

  for (const t of matches) {
    const open = state.templateOpen === t.id;
    const card = el('div', `template-card${open ? ' open' : ''}${state.templateId === t.id ? ' active' : ''}`);

    // The collapsed row: enough to recognise the progression, nothing more.
    const head = el('button', 'template-head');
    head.setAttribute('aria-expanded', String(open));
    head.append(
      el('span', 'label', t.label),
      el('span', 'template-numerals', numeralsFor(t.degrees, t.seventh, t.mode)),
      el('span', 'caret', open ? '▾' : '▸')
    );
    head.onclick = () => {
      state.templateOpen = open ? null : t.id;
      renderTemplateLibrary();
      if (!open) previewProgression(t);
    };
    card.appendChild(head);

    if (open) {
      const body = el('div', 'template-body');
      body.append(el('span', 'template-chords', chordNamesFor(t.degrees, t.seventh, t.mode)));

      // Name the mode it will actually be heard in, which is the locked one when
      // the key is locked — not the mode the template was written in.
      const shownMode = suggestionMode(t.mode);
      const recast = state.rootLocked && shownMode !== t.mode;
      body.append(el('p', '', t.blurb));
      body.append(
        el(
          'span',
          'template-meta',
          `${MODE_NAMES[MODE_IDS.indexOf(shownMode)]}${recast ? ` (written in ${MODE_NAMES[MODE_IDS.indexOf(t.mode)]})` : ''} · ${t.degrees.length} bars · ${t.family}`
        )
      );

      // Songs built on this progression. A roman numeral means little until you
      // recognise something you already know inside it, so where the source
      // names examples they are shown rather than kept in a data file.
      if (t.songs && t.songs.length) {
        const songs = el('ul', 'song-list');
        for (const s of t.songs) songs.appendChild(el('li', '', s));
        body.append(el('span', 'micro-label', 'HEARD IN'), songs);
      }

      const actions = el('div', 'row gap-xs mt-s');
      const hear = el('button', 'chip small', '▶ Hear it');
      hear.onclick = () => previewProgression(t);
      const apply = el('button', 'chip small filled-a', 'Apply to timeline');
      apply.onclick = () => {
        state.templateId = t.id;
        state.moodId = null;
        applyDegrees(t.degrees, t.seventh, t.mode);
      };
      actions.append(hear, apply);
      body.appendChild(actions);
      card.appendChild(body);
    }

    tpl.appendChild(card);
  }
}

/**
 * Audition a progression without committing it — hear before you overwrite the
 * timeline. Chords are scheduled back to back at the current tempo.
 */
async function previewProgression(t) {
  if (!(await ensureAudio())) return;
  if (sequencer.playing) { toast('Stop playback to preview a progression.'); return; }

  const chords = chordsForSuggestion(t.degrees, t.seventh, t.mode).slice(0, 8);
  const dur = barDuration(state.timeSig, state.bpm);
  const t0 = auditionStart();

  // Preview the progression the way it should be played — connected shapes, not
  // a root-position grip per chord, which is what makes an audition sound like
  // an exercise instead of music.
  const voicings = smoothProgression(chords, { tuning: tuning() });
  chords.forEach((chord, i) => {
    const v = voicings[i] || resolveVoicing(chord, 'root', { tuning: tuning() });
    if (!v) return;
    sequencer.scheduleChord({ chord, voicing: v }, t0 + i * dur, dur, {
      rhythm: state.rhythm,
      tuning: tuning(),
      velocity: 1,
    });
  });
  engine.damp(t0 + chords.length * dur);
  toast(`Previewing ${t.label} — tap Apply to keep it.`);
}

// ------------------------------------------------------------ static wiring

/** Fill a <select> once, with `values[i]` as the option value. */
function fillSelect(sel, labels, values) {
  sel.replaceChildren();
  labels.forEach((label, i) => {
    const o = document.createElement('option');
    o.value = String(values ? values[i] : label);
    o.textContent = label;
    sel.appendChild(o);
  });
}

function wire() {
  $('projectTitle').oninput = (e) => { state.projectTitle = e.target.value; };

  $('playBtn').onclick = togglePlay;

  $('bpm').oninput = (e) => {
    state.bpm = Number(e.target.value);
    $('bpmValue').textContent = state.bpm;
  };

  // Native selects rather than custom popovers: they cannot get stuck open,
  // they open the platform picker on touch devices, and they are keyboard- and
  // screen-reader-accessible for free.
  const timeSig = $('timeSigSelect');
  fillSelect(timeSig, TIME_SIGS);
  timeSig.onchange = () => {
    state.timeSig = timeSig.value;
    renderTransport();
    renderTone(); // audition-length labels depend on beats per bar
    // Grooves are metre-specific; move to one that fits if the current one does not.
    const fits = stylesForMeter(state.timeSig);
    if (!fits.some((s) => s.id === state.drumStyle)) loadDrumStyle(fits[0].id);
    renderDrums();
  };

  const modeSel = $('modeSelect');
  fillSelect(modeSel, MODE_NAMES, MODE_NAMES.map((_, i) => i));
  modeSel.onchange = () => {
    state.modeIdx = Number(modeSel.value);
    state.activeDegree = 0;
    state.voicingIndex = 0;
    reresolveAll();
    render();
  };

  $('metroBtn').onclick = () => { state.metronome = !state.metronome; renderTransport(); };
  $('loopBtn').onclick = () => { state.loop = !state.loop; renderTransport(); };
  $('retriggerBtn').onclick = () => { state.cutOnRetrigger = !state.cutOnRetrigger; renderTone(); };

  $('wheel').onclick = async (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = rect.width / 280;
    const dx = (e.clientX - (rect.left + rect.width / 2)) / scale;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / scale;
    const dist = Math.hypot(dx, dy);
    if (dist > 140 || dist < 42) return;
    let angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (angle < 0) angle += 360;
    const note = CIRCLE[Math.floor(((angle + 15) % 360) / 30)];
    const isMinorRing = dist <= 90;

    // Locked: explore instead of navigate. Sound the wedge and explain it.
    if (state.rootLocked) {
      state.exploreNote = isMinorRing ? (note + 9) % 12 : note;
      state.exploreIsMinor = isMinorRing;
      renderExplore();
      await playExplore();
      return;
    }

    if (!isMinorRing) { state.rootPc = note; state.modeIdx = 0; }
    else { state.rootPc = (note + 9) % 12; state.modeIdx = 5; }
    state.activeDegree = 0;
    state.voicingIndex = 0;
    state.exploreNote = null;
    reresolveAll();
    render();
    previewDegree(0);
  };

  $('lockBtn').onclick = () => {
    state.rootLocked = !state.rootLocked;
    state.exploreNote = null;
    renderCircle();
  };

  // About dialog.
  const overlay = $('aboutOverlay');
  const closeAbout = () => { state.showAbout = false; overlay.hidden = true; };
  $('aboutBtn').onclick = () => { state.showAbout = true; overlay.hidden = false; $('aboutCloseBtn').focus(); };
  $('aboutCloseBtn').onclick = closeAbout;
  overlay.onclick = (e) => { if (e.target === overlay) closeAbout(); };
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.showAbout) closeAbout(); });

  $('previewBtn').onclick = () => previewDegree(state.activeDegree);
  $('nextVoicingBtn').onclick = () => {
    state.voicingIndex += 1;
    renderCompose();
    previewDegree(state.activeDegree);
  };

  $('secDomBtn').onclick = () => {
    state.showSecDom = !state.showSecDom;
    renderCircle();
  };

  // --- timeline: role, picker, voice leading ---
  $('sectionRoleSelect').onchange = (e) => {
    section().role = e.target.value;
    renderTimeline();
  };
  $('smoothBtn').onclick = () => {
    const sec = section();
    sec.smooth = !sec.smooth;
    // Turning it off should put the shapes back, not leave the smoothed ones
    // in place with the switch reading "off".
    if (sec.smooth) applySmoothing();
    else reresolveAll();
    renderTimeline();
  };
  // --- tuner ---
  $('tunerInstrument').onchange = (e) => {
    state.tunerInstrument = e.target.value;
    state.tunerTuning = INSTRUMENT_BY_ID[state.tunerInstrument].tunings[0].id;
    state.tunerTarget = null;
    state.tunerReading = null;
    if (tuner) tuner.setNotes(findTuning(state.tunerInstrument, state.tunerTuning).notes, null);
    renderTuner();
  };
  $('tunerTuning').onchange = (e) => {
    state.tunerTuning = e.target.value;
    state.tunerTarget = null;
    state.tunerReading = null;
    if (tuner) tuner.setNotes(findTuning(state.tunerInstrument, state.tunerTuning).notes, null);
    renderTuner();
  };
  $('tunerMicBtn').onclick = toggleTuner;

  // --- songs, saving, audio export ---
  $('saveProjectBtn').onclick = () => doSaveProject(false);
  $('saveAsProjectBtn').onclick = () => doSaveProject(true);
  $('newProjectBtn').onclick = () => {
    if (!confirm('Start a new song? Anything unsaved will be lost.')) return;
    state.projectId = null;
    state.projectTitle = 'Untitled Song';
    state.degreeSpec = {};
    state.sections = [{ id: 1, name: 'A', barCount: 8, bars: makeBars(8), role: 'verse', smooth: false }];
    state.activeSection = 0;
    render();
    toast('New song started.');
  };
  $('exportBtn2').onclick = exportSong;
  $('importInput2').onchange = importSong;

  $('pickerCloseBtn').onclick = closePicker;
  $('pickerResetBtn').onclick = () => {
    // Hand the slot back to its degree, so it follows the Compose builder again.
    if (!state.picker) return;
    const { barIdx, slotIdx } = state.picker;
    const slot = bars()[barIdx] && bars()[barIdx].slots[slotIdx];
    if (!slot) return;
    bars()[barIdx].slots[slotIdx] = slotFromDegree(slot.degree, null, slot.voicingMode);
    applySmoothing();
    renderTimeline();
  };
  $('pickerClearBtn').onclick = () => {
    if (!state.picker) return;
    const { barIdx, slotIdx } = state.picker;
    clearSlot(barIdx, slotIdx);
    closePicker();
  };

  $('playScaleBtn').onclick = () => playModeScale(state.learnModeIdx);
  $('playVampBtn').onclick = () => playModeVamp(state.learnModeIdx);
  $('quizStartBtn').onclick = startQuiz;
  $('quizReplayBtn').onclick = () => state.quiz.modeIdx !== null && playModeVamp(state.quiz.modeIdx);

  $('applySuggestionBtn').onclick = () => {
    const mood = MOODS.find((m) => m.id === state.moodId);
    if (mood) applyDegrees(mood.degrees, mood.seventh);
  };

  // --- loops / sections ---
  const nextName = () => {
    const used = new Set(state.sections.map((s) => s.name));
    for (let i = 0; i < 26; i++) {
      const name = String.fromCharCode(65 + i);
      if (!used.has(name)) return name;
    }
    return `L${state.sections.length + 1}`;
  };

  $('addSectionBtn').onclick = () => {
    const count = barCount();
    // A new loop is usually the next part of the song, so it defaults to the
    // role that follows the current one rather than always to "verse".
    state.sections.push({
      id: Date.now(),
      name: nextName(),
      barCount: count,
      bars: makeBars(count),
      role: nextRole(section().role),
      smooth: !!section().smooth,
    });
    selectSection(state.sections.length - 1);
    renderTimeline();
  };

  $('dupSectionBtn').onclick = () => {
    const sec = activeSection();
    state.sections.splice(state.activeSection + 1, 0, {
      id: Date.now(),
      name: nextName(),
      barCount: sec.barCount,
      role: sec.role || 'verse',
      smooth: !!sec.smooth,
      // Slots are re-derived rather than shared, so editing the copy cannot
      // reach back into the original.
      bars: sec.bars.map((b) => ({ slots: b.slots.map((s) => (s ? { ...s } : null)) })),
    });
    selectSection(state.activeSection + 1);
    renderTimeline();
  };

  $('delSectionBtn').onclick = () => {
    if (state.sections.length < 2) return;
    state.sections.splice(state.activeSection, 1);
    state.activeSection = Math.max(0, Math.min(state.activeSection, state.sections.length - 1));
    state.queuedSection = null;
    renderTimeline();
  };

  // --- drums ---
  $('drumsBtn').onclick = () => toggleDrums();
  $('drumsQuickBtn').onclick = () => toggleDrums();
  $('drumFillBtn').onclick = () => { state.drumFills = !state.drumFills; renderDrums(); };
  $('drumKitSelect').onchange = (e) => {
    state.drumKit = e.target.value;
    if (engine.drums) engine.drums.setKit(state.drumKit);
  };
  $('drumStyleSelect').onchange = (e) => {
    loadDrumStyle(e.target.value);
    if (!state.drumsOn) toggleDrums(true);
    renderDrums();
  };
  $('drumClearBtn').onclick = () => {
    for (const v of DRUM_VOICES) {
      state.drumPattern.lanes[v.id] = new Array(state.drumPattern.steps).fill(0);
    }
    renderDrums();
  };
  $('drumResetBtn').onclick = () => { loadDrumStyle(state.drumStyle, { keepKit: true }); renderDrums(); };
  $('drumDoubleBtn').onclick = () => {
    // Write a one-bar idea in the first half, then fill the bar with it.
    const p = state.drumPattern;
    const half = Math.floor(p.steps / 2);
    for (const v of DRUM_VOICES) {
      const lane = p.lanes[v.id];
      for (let i = 0; i < half; i++) lane[half + i] = lane[i];
    }
    renderDrums();
  };
  const swing = $('drumSwing');
  swing.oninput = () => {
    state.drumPattern.swing = Number(swing.value);
    $('drumSwingOut').textContent = `${Math.round(state.drumPattern.swing * 100)}%`;
  };
  const human = $('drumHumanize');
  human.oninput = () => {
    state.drumHumanize = Number(human.value);
    $('drumHumanizeOut').textContent = `${Math.round(state.drumHumanize * 100)}%`;
  };
  $('drumVaryBtn').onclick = () => {
    state.drumPattern = varyPattern(state.drumPattern);
    renderDrums();
  };
  const drumVol = $('drumVolume');
  drumVol.oninput = () => {
    state.drumVolume = Number(drumVol.value);
    $('drumVolumeOut').textContent = `${Math.round(state.drumVolume * 100)}%`;
    if (engine.drums) engine.drums.setVolume(state.drumVolume);
  };

  $('clearTimelineBtn').onclick = () => {
    setBars(makeBars(barCount()), barCount());
    renderTimeline();
  };
  $('exportBtn').onclick = exportSong;
  $('importInput').onchange = importSong;

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, select, textarea')) return;
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    if (e.key >= '1' && e.key <= '7') {
      state.activeDegree = Number(e.key) - 1;
      state.voicingIndex = 0;
      renderCompose();
      previewDegree(state.activeDegree);
    }
  });

  // Browsers suspend the context when the tab is hidden; stop cleanly instead
  // of letting the scheduler race a stalled clock.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && sequencer.playing) {
      sequencer.stop();
      state.playing = false;
      renderTransport();
    }
  });
}

// ---------------------------------------------------------------- save/load

/** The song as plain JSON — the one shape used by export, save and load. */
function songData() {
  return {
    format: 'circlesong.v3',
    title: state.projectTitle,
    bpm: state.bpm,
    timeSig: state.timeSig,
    rootPc: state.rootPc,
    mode: modeId(),
    tone: state.tone,
    rhythm: state.rhythm,
    tuning: state.tuningId,
    drums: { on: state.drumsOn, style: state.drumStyle, kit: state.drumKit, volume: state.drumVolume, fills: state.drumFills, pattern: state.drumPattern },
    activeSection: state.activeSection,
    degreeSpec: state.degreeSpec,
    sections: state.sections.map((sec) => ({
      name: sec.name,
      barCount: sec.barCount,
      role: sec.role || 'verse',
      smooth: !!sec.smooth,
      bars: sec.bars.map((b) =>
        b.slots.map((s) => (s ? { degree: s.degree, spec: s.spec, override: !!s.override, voicingMode: s.voicingMode } : null))
      ),
    })),
    // Denormalised for the project list, which should not have to rebuild a
    // song just to show a row.
    keyName: `${noteName(state.rootPc, preferFlats())} ${MODE_NAMES[state.modeIdx]}`,
    barTotal: state.sections.reduce((n, sec) => n + sec.barCount, 0),
  };
}

function exportSong() {
  const data = songData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${state.projectTitle.replace(/[^\w-]+/g, '_') || 'circlesong'}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast('Exported song JSON.');
}

function importSong(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      if (!String(data.format || '').startsWith('circlesong.v')) {
        throw new Error('Unrecognised file format');
      }
      applySongData(data);
      state.projectId = null;
      render();
      toast(`Loaded "${state.projectTitle}".`);
    } catch (err) {
      toast(`Could not read that file — ${err.message}`, true);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

/** Load a song object into state. Shared by file import and the song library. */
function applySongData(data) {
  {
    {
      state.projectTitle = data.title || 'Untitled Song';
      state.bpm = Number(data.bpm) || 96;
      state.timeSig = TIME_SIGS.includes(data.timeSig) ? data.timeSig : '4/4';
      state.rootPc = Number(data.rootPc) || 0;
      state.modeIdx = Math.max(0, MODE_IDS.indexOf(data.mode));
      state.tone = PRESETS[data.tone] ? data.tone : 'acoustic';
      state.rhythm = data.rhythm || 'straight8';
      state.tuningId = TUNINGS[data.tuning] ? data.tuning : 'standard';
      state.degreeSpec = data.degreeSpec && typeof data.degreeSpec === 'object' ? data.degreeSpec : {};

      if (data.drums) {
        state.drumsOn = !!data.drums.on;
        if (DRUM_STYLE_BY_ID[data.drums.style]) state.drumStyle = data.drums.style;
        if (DRUM_KITS[data.drums.kit]) state.drumKit = data.drums.kit;
        if (Number.isFinite(data.drums.volume)) state.drumVolume = data.drums.volume;
        state.drumFills = data.drums.fills !== false;
        // Prefer the saved grid over the style's defaults: it may have been edited.
        if (data.drums.pattern && data.drums.pattern.lanes) state.drumPattern = data.drums.pattern;
        else loadDrumStyle(state.drumStyle, { keepKit: true });
      }

      // v1 held a single loop; v2 holds named sections. Reading a v1 file just
      // means treating its one loop as the first section.
      const incoming = data.sections || [
        { name: 'A', barCount: data.barCount, bars: data.bars },
      ];

      state.sections = incoming.map((sec, i) => {
        const count = Number(sec.barCount) || 8;
        const built = makeBars(count);
        (sec.bars || []).forEach((slots, b) => {
          if (!built[b] || !Array.isArray(slots)) return;
          built[b] = {
            slots: slots.map((slot) => {
              if (!slot) return null;
              // Files written before the chord builder carry a `seventh` flag
              // instead of a spec; both describe the same thing.
              const vm = VOICING_MODES[slot.voicingMode] ? slot.voicingMode : 'root';
              // Slots saved before per-degree variations always carried their
              // own quality, so they are restored as pinned.
              if (slot.override === false) return slotFromDegree(slot.degree, null, vm);
              const spec = slot.spec || { degree: slot.degree, size: sizeFromLegacy(slot.seventh) };
              return slotFromDegree(slot.degree, spec, vm);
            }),
          };
        });
        return {
          id: i + 1,
          name: sec.name || String.fromCharCode(65 + i),
          barCount: count,
          role: SECTION_ROLES[sec.role] ? sec.role : 'verse',
          smooth: !!sec.smooth,
          bars: built,
        };
      });
      if (!state.sections.length) state.sections = [{ id: 1, name: 'A', barCount: 8, bars: makeBars(8) }];
      state.activeSection = Math.min(Number(data.activeSection) || 0, state.sections.length - 1);

      if (engine.ready) engine.setPreset(state.tone);
    }
  }
}

// The microphone is released whenever the page stops being visible, so it is
// never held by a tab sitting in the background.
document.addEventListener('visibilitychange', () => {
  if (document.hidden && state.tunerOn) stopTuner();
});

// --------------------------------------------------------------------- boot

wire();
render();

// Arm the audio engine on the first interaction anywhere, so the very first
// chord the user taps already makes sound.
const arm = () => { ensureAudio(); document.removeEventListener('pointerdown', arm); };
document.addEventListener('pointerdown', arm, { once: true });

// Register the service worker that makes the app installable and offline-
// capable. Guarded on the manifest link because the single-file build strips
// it, and on http(s) because workers are unavailable on file:// origins —
// without both checks those two ways of running the app log a fetch error.
if (
  'serviceWorker' in navigator &&
  document.querySelector('link[rel="manifest"]') &&
  location.protocol.startsWith('http')
) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* Offline support is an enhancement; the app runs fine without it. */
    });
  });
}

watchDrumPlayhead();

// Expose for debugging in the console.
window.CircleSong = {
  state,
  engine,
  sequencer,
  MODES,
  PRESETS,
  /** Bars of the loop currently active — state.sections holds them all. */
  get bars() { return bars(); },
  activeSection,
  render,
  /** Re-derive every stored shape — what a key, mode or tuning change runs. */
  reresolveAll,
  /** The live Tuner, once listening has been switched on. */
  tunerInstance: () => tuner,
  // Exposed so tests can measure voice leading rather than eyeball it.
  progressionCost,
  voiceLeadCost,
};
