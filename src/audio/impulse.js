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

/**
 * Synthesised impulse responses.
 *
 * A plucked-string model on its own sounds like a plucked string in a vacuum:
 * correct partials, no instrument. The body of an acoustic guitar (and the
 * speaker cabinet of an amp) is what makes it sound like a *guitar*. Both are
 * modelled here as short impulse responses fed to a ConvolverNode.
 *
 * These are built from measured resonance frequencies rather than shipped as
 * audio files, so the app stays dependency-free and instant to load. Swapping
 * in real recorded IRs later is a drop-in change — see docs/AUDIO_QUALITY.md.
 */

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return (s / 0x7fffffff) - 1;
  };
}

const LN1000 = 6.907755;

/**
 * Modal body response: a direct impulse, a set of resonances, and a diffuse
 * tail. `modes` are [frequency Hz, **peak gain in dB**, T60 seconds].
 *
 * The gain is given in dB on purpose. A decaying sinusoid of amplitude `a` in
 * an impulse response is not an `a`-sized bump in the frequency response — its
 * resonant gain is `a · τ · sampleRate / 2`, so at 48 kHz a mode with amplitude
 * 1.0 and a 0.14 s T60 is a **+54 dB** resonator. That is what these bodies used
 * to be: convolution multiplied the signal by 11× broadband, every note landing
 * near the air mode was boosted enormously, and the whole chain downstream lived
 * in permanent limiting. Specifying the peak in dB and solving for the amplitude
 * makes a mode mean what it says, and makes it independent of both the sample
 * rate and the chosen T60.
 *
 * `tailDb` is likewise the diffuse tail's energy relative to the direct sound.
 */
function modalIR(
  ctx,
  modes,
  { length = 0.35, tailDb = -14, seed = 12345, tailDecay = 22, direct = 1 } = {}
) {
  const sr = ctx.sampleRate;
  const n = Math.floor(sr * length);
  const buf = ctx.createBuffer(2, n, sr);
  const rand = rng(seed);

  // Uniform noise on [-1,1) has variance 1/3, and the envelope halves its
  // energy every `1/(2·tailDecay)` seconds, so this is the amplitude that lands
  // the tail at exactly `tailDb` relative to a unit direct impulse.
  const tailEnergy = Math.pow(10, tailDb / 10);
  const tailAmp = Math.sqrt((6 * tailDecay * tailEnergy) / sr);

  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    // Decorrelate the two channels slightly so the result has width without
    // smearing the transient.
    const detune = ch === 0 ? 1 : 1.006;
    const phase = ch === 0 ? 0 : 0.7;

    for (const [f, peakDb, t60] of modes) {
      const w = (2 * Math.PI * f * detune) / sr;
      const tau = t60 / LN1000;
      const a = (Math.pow(10, peakDb / 20) * 2) / (tau * sr);
      const decay = Math.exp(-1 / (tau * sr));
      let env = a;
      for (let i = 0; i < n; i++) {
        d[i] += env * Math.sin(w * i + phase);
        env *= decay;
        if (env < 1e-9) break;
      }
    }

    // Diffuse late energy.
    let noiseEnv = tailAmp;
    for (let i = 0; i < n; i++) {
      d[i] += rand() * noiseEnv;
      noiseEnv *= Math.exp(-tailDecay / sr);
    }

    // Sharp initial impulse so direct sound survives the convolution.
    d[0] += direct;
  }

  normalizeBandGain(buf);
  return buf;
}

/**
 * Scale an impulse response to unity average gain across the audible band.
 *
 * A convolution's gain is a property of its whole impulse response, not of its
 * peak sample, so peak-normalising leaves the level to chance: these bodies used
 * to range from −1 dB (cabinet) to +12 dB (piano) and the acoustic ones added
 * more than 20 dB in the band the guitar actually occupies. That is why some
 * presets distorted and others did not.
 *
 * Broadband energy is not the right measure either — a speaker cabinet is a
 * band-pass, so normalising its total energy leaves it far too loud inside the
 * band where all the signal is. Measuring the response where the instrument
 * lives is the honest measure, and it treats a resonant box and a band-limited
 * speaker alike.
 */
function normalizeBandGain(buf, { lo = 80, hi = 6000, points = 48, targetDb = 0 } = {}) {
  const d = buf.getChannelData(0);
  const sr = buf.sampleRate;
  let sum = 0;
  for (let k = 0; k < points; k++) {
    // Log-spaced, because that is how the response is heard.
    const f = lo * Math.pow(hi / lo, k / (points - 1));
    const w = (2 * Math.PI * f) / sr;
    let re = 0, im = 0;
    for (let i = 0; i < d.length; i++) {
      re += d[i] * Math.cos(w * i);
      im -= d[i] * Math.sin(w * i);
    }
    sum += re * re + im * im;
  }
  const avg = Math.sqrt(sum / points);
  const g = Math.pow(10, targetDb / 20) / Math.max(avg, 1e-9);
  for (let ch = 0; ch < buf.numberOfChannels; ch++) {
    const c = buf.getChannelData(ch);
    for (let i = 0; i < c.length; i++) c[i] *= g;
  }
}

function normalize(buf, target = 0.35) {
  let peak = 1e-9;
  for (let ch = 0; ch < buf.numberOfChannels; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < d.length; i++) peak = Math.max(peak, Math.abs(d[i]));
  }
  const g = target / peak;
  for (let ch = 0; ch < buf.numberOfChannels; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < d.length; i++) d[i] *= g;
  }
}

/**
 * Dreadnought steel-string: strong Helmholtz air mode, lively top.
 *
 * The air mode is the loudest thing a guitar body does, but it is a resonance
 * of a few dB and not a different instrument — an F barre puts its root on
 * 87 Hz and its octave on 175 Hz, straddling the two strongest modes, and the
 * point of the dB scale here is that this is now a lift you can name rather
 * than the overload it used to be.
 */
export function steelBodyIR(ctx) {
  return modalIR(
    ctx,
    [
      [98, 7.5, 0.14], // Helmholtz air resonance
      [196, 6, 0.12], // top plate (0,0)
      [255, 4.5, 0.1], // back plate
      [392, 4, 0.08],
      [510, 3.5, 0.07],
      [720, 3, 0.06],
      [1050, 3, 0.05],
      [1580, 2.5, 0.04],
      [2400, 3, 0.03], // where a steel string's bite lives
      [3300, 2.5, 0.025],
      [4600, 2, 0.02],
    ],
    { length: 0.32, tailDb: -13, seed: 7331 }
  );
}

/** Classical/nylon: lower air mode, warmer and shorter. */
export function nylonBodyIR(ctx) {
  return modalIR(
    ctx,
    [
      [88, 7, 0.16],
      [178, 6, 0.13],
      [230, 4, 0.1],
      [360, 3.5, 0.08],
      [560, 3, 0.06],
      [850, 2.5, 0.05],
      [1300, 2, 0.035],
      [2000, 1.5, 0.025],
      [3000, 1, 0.02],
    ],
    { length: 0.3, tailDb: -16, seed: 4242, tailDecay: 30 }
  );
}

/** Hollow-body archtop: mellow, quick, pronounced low-mid. */
export function archtopBodyIR(ctx) {
  return modalIR(
    ctx,
    [
      [120, 7, 0.1],
      [210, 6, 0.09],
      [330, 4.5, 0.07],
      [480, 3, 0.055],
      [740, 2, 0.04],
      [1150, 1.5, 0.03],
    ],
    { length: 0.24, tailDb: -17, seed: 9182, tailDecay: 35 }
  );
}

/**
 * Grand piano soundboard.
 *
 * A soundboard is a large, lightly damped plate, so it differs from a guitar
 * body in two ways that matter: the modes run much lower and much denser, and
 * they ring far longer. That long, dense tail is the "bloom" heard after a
 * piano chord is struck, and it is most of what separates a modelled piano
 * string from a piano.
 */
export function pianoBoardIR(ctx) {
  return modalIR(
    ctx,
    [
      [58, 5, 0.5],
      [92, 6, 0.45],
      [131, 5.5, 0.4],
      [175, 5, 0.36],
      [233, 4.5, 0.32],
      [311, 4, 0.28],
      [415, 3.5, 0.24],
      [554, 3, 0.2],
      [740, 3, 0.17],
      [988, 2.5, 0.14],
      [1320, 2.5, 0.11],
      [1760, 2, 0.09],
      [2350, 2, 0.07],
      [3140, 1.5, 0.055],
      [4190, 1.5, 0.045],
    ],
    { length: 0.75, tailDb: -9, seed: 5150, tailDecay: 9 }
  );
}

/**
 * Rhodes-style tine bar and pickup.
 *
 * An electric piano has almost no acoustic body — the tine is sensed
 * electromagnetically, like a guitar pickup. The tone bar adds one strong low
 * resonance and very little else, which is why the sound is so clean and why
 * the bell-like attack survives all the way to the output.
 */
export function tineBarIR(ctx) {
  return modalIR(
    ctx,
    [
      [86, 7, 0.22],
      [172, 3.5, 0.16],
      [340, 2, 0.1],
      [620, 1.5, 0.07],
      [1180, 1, 0.05],
    ],
    { length: 0.22, tailDb: -20, seed: 6180, tailDecay: 40 }
  );
}

/**
 * 1x12 guitar cabinet: the classic ~80 Hz–5 kHz window with a presence peak.
 *
 * A speaker is a band-pass, not a resonant box around a direct sound, so this
 * one carries no direct impulse — the modes *are* the response, and everything
 * outside their span is meant to be gone.
 */
export function cabinetIR(ctx) {
  return modalIR(
    ctx,
    [
      [95, 26, 0.02],
      [180, 24, 0.016],
      [420, 21, 0.012],
      [900, 20, 0.009],
      [1800, 19, 0.007],
      [2600, 21, 0.006], // presence peak
      [3900, 15, 0.004],
      [5200, 8, 0.003],
    ],
    { length: 0.06, tailDb: -18, seed: 555, tailDecay: 400, direct: 0 }
  );
}

/** Small room / plate ambience, kept short so strumming stays defined. */
export function roomIR(ctx, seconds = 1.4, decay = 3.2) {
  const sr = ctx.sampleRate;
  const n = Math.floor(sr * seconds);
  const buf = ctx.createBuffer(2, n, sr);
  const rand = rng(24680);
  const preDelay = Math.floor(sr * 0.012);

  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = preDelay; i < n; i++) {
      const t = (i - preDelay) / n;
      // Slight low-pass by averaging consecutive noise samples: high frequencies
      // in a real room die faster than lows.
      const damp = 1 - 0.6 * t;
      d[i] = rand() * Math.pow(1 - t, decay) * damp;
    }
    // Early reflections.
    for (const [ms, g] of [[7, 0.4], [13, 0.3], [23, 0.22], [37, 0.15]]) {
      const idx = Math.floor((sr * ms) / 1000) + (ch ? 11 : 0);
      if (idx < n) d[idx] += g;
    }
  }
  normalize(buf, 0.5);
  return buf;
}

/**
 * Output safety curve. Transparent below `knee`, then bends smoothly to a
 * ceiling. A WaveShaper clamps out-of-range input to the curve's endpoints, so
 * this doubles as a brickwall: nothing can leave the chain above the ceiling,
 * however hard the strum.
 */
export function safetyCurve(knee = 0.9, ceiling = 0.99, steps = 4096) {
  const curve = new Float32Array(steps);
  for (let i = 0; i < steps; i++) {
    const x = (i / (steps - 1)) * 2 - 1;
    const a = Math.abs(x);
    const y = a <= knee ? a : knee + (ceiling - knee) * Math.tanh((a - knee) / (ceiling - knee));
    curve[i] = Math.sign(x) * y;
  }
  return curve;
}

/** Soft-clipping curve for the amp stage. */
export function driveCurve(amount = 0.4, steps = 2048) {
  const curve = new Float32Array(steps);
  const k = 1 + amount * 24;
  for (let i = 0; i < steps; i++) {
    const x = (i / (steps - 1)) * 2 - 1;
    // Asymmetric soft clip: adds even harmonics, which reads as "tube-ish".
    const bias = 0.06 * amount;
    const y = Math.tanh(k * (x + bias)) - Math.tanh(k * bias);
    curve[i] = y / Math.tanh(k * (1 + bias));
  }
  return curve;
}
