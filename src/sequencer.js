// Transport and scheduling.
//
// Playback uses the standard Web Audio lookahead pattern: a coarse timer wakes
// up every 25 ms and schedules everything that falls inside the next 150 ms
// against the AudioContext clock. Timing therefore comes from the audio clock,
// not from setTimeout, so strums stay locked to the grid even when the main
// thread is busy laying out the UI.

import { getPattern, swingTime } from './patterns.js';
import { resolveVoicing, voicingNotes } from './fretboard.js';
import { patternHits } from './drum-patterns.js';

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.15;

export function parseTimeSig(sig) {
  const [beats, unit] = sig.split('/').map(Number);
  return { beats: beats || 4, unit: unit || 4 };
}

/** Bar length in seconds, honouring the time-signature denominator. */
export function barDuration(sig, bpm) {
  const { beats, unit } = parseTimeSig(sig);
  return beats * (60 / bpm) * (4 / unit);
}

export class Sequencer {
  /**
   * @param {import('./audio/engine.js').AudioEngine} engine
   * @param {() => object} getState  reads live transport state from the app
   */
  constructor(engine, getState) {
    this.engine = engine;
    this.getState = getState;
    this.playing = false;
    this.barIndex = 0;
    this.nextBarTime = 0;
    this.timer = null;
    this.scheduled = []; // [{index, time}] drained by the UI for the playhead
    this.onPlayhead = null;
    this._raf = null;
    this._lastReported = -1;
    /** Drum voices; assigned by the app once the context exists. */
    this.drums = null;
    /** Work deferred to the next bar line, so edits land musically. */
    this._pending = null;
    this._barsPlayed = 0;
  }

  /**
   * Run `fn` at the next bar line rather than immediately, and restart the loop
   * from its first bar. Switching sections mid-bar is what makes a change sound
   * like a mistake; waiting for the bar is what makes it sound intentional.
   *
   * When the transport is stopped there is no bar line to wait for, so the
   * change applies at once.
   */
  atNextBar(fn) {
    if (!this.playing) { fn(); return false; }
    this._pending = fn;
    return true;
  }

  start() {
    if (this.playing || !this.engine.ready) return;
    this.playing = true;
    this.barIndex = 0;
    this.scheduled.length = 0;
    this._lastReported = -1;
    this.nextBarTime = this.engine.currentTime + 0.08;
    this.timer = setInterval(() => this._tick(), LOOKAHEAD_MS);
    this._tick();
    this._watchPlayhead();
  }

  stop() {
    this.playing = false;
    clearInterval(this.timer);
    this.timer = null;
    cancelAnimationFrame(this._raf);
    this.scheduled.length = 0;
    // Stop means stop: drop everything already queued and damp the strings.
    // Letting them ring out sounds like the transport ignored you.
    this.engine.cut(this.engine.currentTime, { level: 1, time: 0.04 });
    if (this.onPlayhead) this.onPlayhead(-1);
  }

  /**
   * Where the bar currently sounding started, and how long it lasts. The UI
   * uses this to draw a playhead from the audio clock rather than from a timer,
   * so what is highlighted is what is actually being heard.
   */
  currentBarWindow() {
    const head = this.scheduled[0];
    if (!this.playing || !head) return null;
    const st = this.getState();
    return { start: head.time, duration: barDuration(st.timeSig, st.bpm) };
  }

  /** Restart the loop from the top without dropping the audio clock. */
  rewind() {
    if (!this.playing) return;
    this.barIndex = 0;
  }

  _tick() {
    if (!this.playing) return;
    const st = this.getState();
    const bars = st.bars;
    if (!bars.length) return;

    const horizon = this.engine.currentTime + SCHEDULE_AHEAD;
    let guard = 0;

    while (this.nextBarTime < horizon && guard++ < 32) {
      // Apply a queued change exactly on the bar line, then silence the old
      // material at that same instant. The replacement is scheduled after this
      // point, so the cut takes the outgoing loop and leaves the incoming one.
      if (this._pending) {
        const apply = this._pending;
        this._pending = null;
        apply();
        this.engine.cut(this.nextBarTime, { level: 1, time: 0.02 });
        this.barIndex = 0;
        this.scheduled.length = 0;
        this._lastReported = -1;
        return this._tick();
      }

      const idx = this.barIndex;
      const dur = barDuration(st.timeSig, st.bpm);
      this._scheduleBar(bars[idx], this.nextBarTime, dur, st);
      this.scheduled.push({ index: idx, time: this.nextBarTime });

      this.nextBarTime += dur;
      this.barIndex++;
      if (this.barIndex >= bars.length) {
        if (st.loop) {
          this.barIndex = 0;
        } else {
          // Let the final bar ring out, then stop.
          const endAt = this.nextBarTime;
          setTimeout(
            () => this.playing && this.stop(),
            Math.max(0, (endAt - this.engine.currentTime) * 1000)
          );
          this.playing = false;
          clearInterval(this.timer);
          this.timer = null;
          return;
        }
      }
    }
  }

  _scheduleBar(bar, startTime, dur, st) {
    this._scheduleDrums(startTime, dur, st);

    if (st.metronome) {
      const { beats, unit } = parseTimeSig(st.timeSig);
      const beatDur = dur / beats;
      // Compound meters (x/8) feel better clicking in dotted groups of three.
      const group = unit === 8 && beats % 3 === 0 ? 3 : 1;
      for (let b = 0; b < beats; b++) {
        if (b % group !== 0) continue;
        this.engine.click(startTime + b * beatDur, b === 0);
      }
    }

    if (!bar || !bar.slots) return;
    const slots = bar.slots.filter(Boolean).length ? bar.slots : [];
    const n = bar.slots.length;
    bar.slots.forEach((slot, i) => {
      if (!slot) return;
      const slotDur = dur / n;
      this.scheduleChord(slot, startTime + i * slotDur, slotDur, st);
    });
    void slots;
  }

  /**
   * Lay the drum pattern over one bar. Hits carry a fraction of the bar, so the
   * same grid works in any time signature — the bar's duration does the rest,
   * and the drums stay locked to the guitar because both are scheduled against
   * the same audio clock from the same bar start.
   */
  _scheduleDrums(startTime, dur, st) {
    if (!this.drums || !st.drumsOn || !st.drumPattern) return;

    // A fill on the last bar of the loop signals the turnaround.
    const bars = st.bars.length;
    const isLastBar = bars > 1 && this.barIndex === bars - 1;
    const fill = !!st.drumFills && isLastBar;

    // Humanise: a real drummer's placement drifts by a few milliseconds and
    // their velocity by a few percent. The downbeat drifts least — that is the
    // reference everything else is heard against.
    const h = st.drumHumanize || 0;
    for (const hit of patternHits(st.drumPattern, { fill })) {
      const anchor = hit.t === 0 ? 0.25 : 1;
      const drift = h ? (Math.random() - 0.5) * 0.014 * h * anchor : 0;
      const vel = h ? hit.velocity * (1 + (Math.random() - 0.5) * 0.24 * h) : hit.velocity;
      this.drums.hit(hit.voice, startTime + hit.t * dur + drift, Math.max(0.05, Math.min(1.2, vel)));
    }
  }

  /**
   * Render one chord over one slot of time using the active rhythm pattern.
   * Exposed so previews and vamps reuse exactly the playback code path.
   */
  scheduleChord(slot, startTime, duration, st) {
    const voicing = slot.voicing || resolveVoicing(slot.chord, slot.voicingMode || 'root', {
      tuning: st.tuning,
      preferredFret: st.preferredFret ?? 0,
    });
    if (!voicing) return;

    const midi = voicing.midi;
    const notes = voicingNotes(voicing);
    if (!notes.length) return;

    const pattern = getPattern(st.rhythm);
    // Previews can play only the first part of the pattern — `fraction` is how
    // much of the bar to sound, so the pattern keeps its tempo and is truncated
    // rather than squeezed.
    const fraction = st.previewFraction ?? 1;

    if (pattern.kind === 'arp') {
      // Map symbolic picks onto whichever strings this voicing actually uses.
      const sounding = [];
      for (let s = 0; s < 6; s++) if (midi[s] !== null) sounding.push(s);
      const pick = (name) => {
        if (name === 'bass') return sounding[0];
        if (name === 'bass2') return sounding[Math.min(1, sounding.length - 1)];
        const fromTop = sounding[sounding.length - 1 - name];
        return fromTop ?? sounding[sounding.length - 1];
      };
      for (const p of pattern.picks) {
        if (p.t >= fraction) continue;
        const s = pick(p.pick);
        if (s === undefined) continue;
        this.engine.pluck({
          string: s,
          midi: midi[s],
          when: startTime + p.t * duration,
          velocity: p.vel * (st.velocity ?? 1),
          hardness: Math.max(0, this.engine.stringParams.hardness - 0.3),
        });
      }
      return;
    }

    for (const hit of pattern.hits) {
      if (hit.t >= fraction) continue;
      const t = swingTime(hit.t, pattern.swing || 0);
      const when = startTime + t * duration;
      if (when < startTime - 0.001 || when >= startTime + duration) continue;

      this.engine.strum({
        midi,
        when,
        direction: hit.dir,
        velocity: Math.min(1, hit.vel * (st.velocity ?? 1)),
        spread: hit.spread,
        muteAmount: hit.mute,
      });

      // A damped chop is a strum plus an immediate choke.
      if (hit.mute > 0.4) {
        const choke = when + Math.min(0.12, duration * 0.12);
        for (let s = 0; s < 6; s++) if (midi[s] !== null) this.engine.release(s, choke, 0.85, 0.03);
      }
    }
  }

  /** Drive the playhead highlight off the audio clock. */
  _watchPlayhead() {
    const step = () => {
      if (!this.playing && !this.scheduled.length) return;
      const now = this.engine.currentTime;
      while (this.scheduled.length > 1 && this.scheduled[1].time <= now) this.scheduled.shift();
      const head = this.scheduled[0];
      if (head && head.time <= now && head.index !== this._lastReported) {
        this._lastReported = head.index;
        if (this.onPlayhead) this.onPlayhead(head.index);
      }
      this._raf = requestAnimationFrame(step);
    };
    this._raf = requestAnimationFrame(step);
  }
}
