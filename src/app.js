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
  scalePitchClasses,
  noteName,
  chordLabel,
  keySignaturePrefersFlats,
  midiToName,
  modeStepsAbsolute,
} from './theory.js';
import {
  TUNINGS,
  findVoicings,
  resolveVoicing,
  voicingRoles,
  voicingPosition,
  voicingToString,
  VOICING_MODES,
} from './fretboard.js';
import { AudioEngine, PRESETS } from './audio/engine.js';
import { Sequencer, barDuration, parseTimeSig } from './sequencer.js';
import { RHYTHMS } from './patterns.js';
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
  nearestBarSize,
} from './content.js';

const $ = (id) => document.getElementById(id);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

const TONE_ORDER = ['acoustic', 'nylon', 'electric', 'crunch', 'jazz', 'reggae'];
const TONE_COLOR = {
  acoustic: 'var(--d)', nylon: 'var(--b)', electric: 'var(--a)',
  crunch: 'var(--c)', jazz: 'var(--c)', reggae: 'var(--b)',
};

const TABS = [
  { id: 'circle', label: 'Circle', glyph: 'circle' },
  { id: 'tone', label: 'Tone', glyph: 'square' },
  { id: 'compose', label: 'Compose', glyph: 'diamond' },
  { id: 'timeline', label: 'Timeline', glyph: 'bars' },
  { id: 'learn', label: 'Learn', glyph: 'book' },
  { id: 'assist', label: 'Assist', glyph: 'spark' },
];

const params = new URLSearchParams(location.search);
if (params.get('theme') === 'mono') document.documentElement.dataset.accent = 'mono';

const state = {
  projectTitle: 'Untitled Song',
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
  seventh: false,
  voicingIndex: 0,

  tone: 'acoustic',
  rhythm: 'straight8',
  tuningId: 'standard',
  volume: 0.8,
  /** Each new chord silences the previous one instead of layering over it. */
  cutOnRetrigger: true,
  /** How many beats of the rhythm pattern an audition plays. */
  previewBeats: 4,

  barCount: 8,
  bars: makeBars(8),

  activeTab: 'circle',
  moodId: null,
  sectionId: null,
  templateId: null,

  learnModeIdx: 0,
  quiz: { modeIdx: null, options: [], answered: false, correct: null, picked: null, score: 0, total: 0 },
};

function makeBars(n, existing = []) {
  return Array.from({ length: n }, (_, i) => existing[i] || { slots: [null] });
}

const engine = new AudioEngine();
const sequencer = new Sequencer(engine, () => ({
  bars: state.bars,
  bpm: state.bpm,
  timeSig: state.timeSig,
  loop: state.loop,
  metronome: state.metronome,
  rhythm: state.rhythm,
  tuning: TUNINGS[state.tuningId].midi,
  velocity: 1,
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

function currentChords() {
  return diatonicChords(state.rootPc, modeId(), state.seventh);
}

function chordForDegree(degree, seventh = state.seventh) {
  return diatonicChords(state.rootPc, modeId(), seventh)[degree % 7];
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
  sequencer.scheduleChord({ chord, voicing, voicingMode: state.voicingMode }, auditionStart(), dur, {
    rhythm: state.rhythm,
    tuning: tuning(),
    velocity: 1,
    previewFraction: fraction ?? previewFraction(),
  });
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
  const strings = tuning();
  steps.forEach((off, i) => {
    const target = 60 + state.rootPc + off;
    // Play each degree on whichever string can reach it most naturally.
    let best = 0;
    let bestFret = 99;
    for (let s = 0; s < 6; s++) {
      const fret = target - strings[s];
      if (fret >= 0 && fret <= 14 && fret < bestFret) { best = s; bestFret = fret; }
    }
    engine.pluck({ string: best, midi: target, when: t0 + i * 0.26, velocity: 0.8 });
  });
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
    if (!state.bars.some((b) => b.slots.some(Boolean)) && !state.metronome) {
      toast('Timeline is empty — add chords, or switch the metronome on.');
    }
    sequencer.start();
    state.playing = true;
  }
  renderTransport();
  renderTimeline();
}

// ------------------------------------------------------------ timeline edits

function slotFromDegree(degree) {
  const chord = chordForDegree(degree);
  const list = voicingList(chord);
  const voicing = list.length ? list[state.voicingIndex % list.length] : null;
  return {
    degree,
    chord,
    voicing,
    voicingMode: state.voicingMode,
    seventh: state.seventh,
    label: chordLabel(chord, VOICING_MODES[state.voicingMode].inversion, preferFlats()),
    roman: chord.numeral,
  };
}

function assignSlot(barIdx, slotIdx, degree) {
  const d = degree != null ? degree : state.activeDegree;
  const bar = state.bars[barIdx];
  if (!bar) return;
  bar.slots[slotIdx] = slotFromDegree(d);
  renderTimeline();
}

function clearSlot(barIdx, slotIdx) {
  const bar = state.bars[barIdx];
  if (!bar) return;
  bar.slots[slotIdx] = null;
  if (bar.slots.length === 2 && !bar.slots[0] && !bar.slots[1]) bar.slots = [null];
  renderTimeline();
}

function addHalfBar(barIdx) {
  const bar = state.bars[barIdx];
  if (!bar) return;
  bar.slots = [bar.slots[0] || null, slotFromDegree(state.activeDegree)];
  renderTimeline();
}

function applyDegrees(degrees, seventh) {
  const prevSeventh = state.seventh;
  state.seventh = !!seventh;
  const size = nearestBarSize(degrees.length);
  const bars = makeBars(size);
  degrees.forEach((d, i) => { bars[i] = { slots: [slotFromDegree(d)] }; });
  state.seventh = prevSeventh || !!seventh;
  state.barCount = size;
  state.bars = bars;
  state.activeTab = 'timeline';
  render();
  toast(`Loaded ${degrees.length} chords into ${size} bars.`);
}

/** Re-derive every stored shape — used after a key, tuning, or mode change. */
function reresolveAll() {
  for (const bar of state.bars) {
    bar.slots = bar.slots.map((slot) => (slot ? slotFromDegree(slot.degree) : null));
  }
}

// ------------------------------------------------------------------ rendering

function render() {
  renderTransport();
  renderCircle();
  renderTone();
  renderCompose();
  renderTimeline();
  renderLearn();
  renderAssist();
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
    b.onclick = () => { state.activeTab = t.id; render(); };
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
    spark: `width:14px;height:14px;background:${col};clip-path:polygon(50% 0,61% 35%,100% 35%,69% 57%,82% 100%,50% 75%,18% 100%,31% 57%,0 35%,39% 35%);`,
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
  });

  $('wheelOuter').style.background = `conic-gradient(from -15deg, ${outerStops.join(', ')})`;
  $('wheelInner').style.background = `conic-gradient(from -15deg, ${innerStops.join(', ')})`;

  $('hubKey').textContent = noteName(state.rootPc, preferFlats());
  $('hubMode').textContent = MODE_NAMES[state.modeIdx];
  $('circleKeyLabel').textContent = `${noteName(state.rootPc, preferFlats())} ${MODE_NAMES[state.modeIdx]}`;
  $('modeSelect').value = String(state.modeIdx);

  const strip = $('scaleStrip');
  strip.replaceChildren();
  scalePitchClasses(state.rootPc, modeId()).forEach((pc, i) => {
    const b = el('button', i === 0 ? 'tonic' : '', noteName(pc, preferFlats()));
    b.title = `Scale degree ${i + 1}`;
    b.onclick = async () => {
      if (!(await ensureAudio())) return;
      const strings = tuning();
      const target = 60 + pc + (pc < state.rootPc ? 12 : 0);
      let s = 0;
      let bestFret = 99;
      for (let k = 0; k < 6; k++) {
        const f = target - strings[k];
        if (f >= 0 && f <= 14 && f < bestFret) { s = k; bestFret = f; }
      }
      engine.pluck({ string: s, midi: target, when: auditionStart(), velocity: 0.85 });
    };
    strip.appendChild(b);
  });
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

  const list = $('rhythmList');
  list.replaceChildren();
  for (const r of RHYTHMS) {
    const b = el('button', `list-btn${state.rhythm === r.id ? ' active' : ''}`);
    b.append(el('span', '', r.label), el('span', 'tag', r.tag));
    b.onclick = () => { state.rhythm = r.id; renderTone(); previewDegree(state.activeDegree); };
    list.appendChild(b);
  }
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

  const seventhBtn = $('seventhBtn');
  seventhBtn.classList.toggle('active', state.seventh);
  seventhBtn.style.background = state.seventh ? 'var(--d)' : '';
  seventhBtn.style.borderColor = state.seventh ? 'var(--d)' : '';

  renderDiagram(chord);
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

function renderTimeline() {
  const row = $('barSizeRow');
  row.replaceChildren();
  for (const size of BAR_SIZES) {
    const b = el('button', `chip small${state.barCount === size ? ' active' : ''}`, String(size));
    b.onclick = () => {
      state.barCount = size;
      state.bars = makeBars(size, state.bars);
      renderTimeline();
    };
    row.appendChild(b);
  }

  const grid = $('timelineGrid');
  grid.replaceChildren();
  state.bars.forEach((bar, idx) => {
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
      s.onclick = () => assignSlot(idx, slotIdx);
      s.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); assignSlot(idx, slotIdx); } };
      s.ondragover = (e) => { e.preventDefault(); s.classList.add('dragover'); };
      s.ondragleave = () => s.classList.remove('dragover');
      s.ondrop = (e) => {
        e.preventDefault();
        s.classList.remove('dragover');
        const deg = Number(e.dataTransfer.getData('text/plain'));
        if (!Number.isNaN(deg)) assignSlot(idx, slotIdx, deg);
      };
      if (slot) {
        const x = el('button', 'clear', '✕');
        x.title = 'Clear';
        x.onclick = (e) => { e.stopPropagation(); clearSlot(idx, slotIdx); };
        s.appendChild(x);
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

  const q = state.quiz;
  $('quizScore').textContent = `${q.score} / ${q.total}`;
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
  if (q.correct) q.score += 1;
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

function renderAssist() {
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
    $('suggestionLabel').textContent = `${mood.label} progression`;
    $('suggestionText').textContent = mood.text;
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
      card.append(head, el('p', '', v.blurb));
      variants.appendChild(card);
    }
  }

  const tpl = $('templateList');
  tpl.replaceChildren();
  for (const t of TEMPLATES) {
    const b = el('button', `list-btn${state.templateId === t.id ? ' active' : ''}`);
    b.append(el('span', 'main', t.label), el('span', 'tag', t.tag));
    b.onclick = () => {
      state.templateId = t.id;
      state.moodId = null;
      applyDegrees(t.degrees, t.seventh);
    };
    tpl.appendChild(b);
  }
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

  $('wheel').onclick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = rect.width / 280;
    const dx = (e.clientX - (rect.left + rect.width / 2)) / scale;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / scale;
    const dist = Math.hypot(dx, dy);
    if (dist > 140 || dist < 42) return;
    let angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (angle < 0) angle += 360;
    const note = CIRCLE[Math.floor(((angle + 15) % 360) / 30)];
    if (dist > 90) { state.rootPc = note; state.modeIdx = 0; }
    else { state.rootPc = (note + 9) % 12; state.modeIdx = 5; }
    state.activeDegree = 0;
    state.voicingIndex = 0;
    reresolveAll();
    render();
    previewDegree(0);
  };

  $('previewBtn').onclick = () => previewDegree(state.activeDegree);
  $('seventhBtn').onclick = () => {
    state.seventh = !state.seventh;
    state.voicingIndex = 0;
    renderCompose();
    previewDegree(state.activeDegree);
  };
  $('nextVoicingBtn').onclick = () => {
    state.voicingIndex += 1;
    renderCompose();
    previewDegree(state.activeDegree);
  };

  $('playScaleBtn').onclick = () => playModeScale(state.learnModeIdx);
  $('playVampBtn').onclick = () => playModeVamp(state.learnModeIdx);
  $('quizStartBtn').onclick = startQuiz;
  $('quizReplayBtn').onclick = () => state.quiz.modeIdx !== null && playModeVamp(state.quiz.modeIdx);

  $('applySuggestionBtn').onclick = () => {
    const mood = MOODS.find((m) => m.id === state.moodId);
    if (mood) applyDegrees(mood.degrees, mood.seventh);
  };

  $('clearTimelineBtn').onclick = () => {
    state.bars = makeBars(state.barCount);
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

function exportSong() {
  const data = {
    format: 'circlesong.v1',
    title: state.projectTitle,
    bpm: state.bpm,
    timeSig: state.timeSig,
    rootPc: state.rootPc,
    mode: modeId(),
    tone: state.tone,
    rhythm: state.rhythm,
    tuning: state.tuningId,
    barCount: state.barCount,
    bars: state.bars.map((b) => b.slots.map((s) => (s ? { degree: s.degree, seventh: s.seventh, voicingMode: s.voicingMode } : null))),
  };
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
      if (data.format !== 'circlesong.v1') throw new Error('Unrecognised file format');
      state.projectTitle = data.title || 'Untitled Song';
      state.bpm = Number(data.bpm) || 96;
      state.timeSig = TIME_SIGS.includes(data.timeSig) ? data.timeSig : '4/4';
      state.rootPc = Number(data.rootPc) || 0;
      state.modeIdx = Math.max(0, MODE_IDS.indexOf(data.mode));
      state.tone = PRESETS[data.tone] ? data.tone : 'acoustic';
      state.rhythm = data.rhythm || 'straight8';
      state.tuningId = TUNINGS[data.tuning] ? data.tuning : 'standard';
      state.barCount = Number(data.barCount) || 8;
      state.bars = makeBars(state.barCount);
      (data.bars || []).forEach((slots, i) => {
        if (!state.bars[i]) return;
        state.bars[i] = {
          slots: slots.map((s) => {
            if (!s) return null;
            const prev = state.seventh;
            state.seventh = !!s.seventh;
            const prevMode = state.voicingMode;
            state.voicingMode = VOICING_MODES[s.voicingMode] ? s.voicingMode : 'root';
            const slot = slotFromDegree(s.degree);
            state.seventh = prev;
            state.voicingMode = prevMode;
            return slot;
          }),
        };
      });
      if (engine.ready) engine.setPreset(state.tone);
      render();
      toast(`Loaded "${state.projectTitle}".`);
    } catch (err) {
      toast(`Import failed: ${err.message}`, true);
    }
    e.target.value = '';
  };
  reader.readAsText(file);
}

// --------------------------------------------------------------------- boot

wire();
render();

// Arm the audio engine on the first interaction anywhere, so the very first
// chord the user taps already makes sound.
const arm = () => { ensureAudio(); document.removeEventListener('pointerdown', arm); };
document.addEventListener('pointerdown', arm, { once: true });

// Expose for debugging in the console.
window.CircleSong = { state, engine, sequencer, MODES };
