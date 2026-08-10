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

/**
 * Modal body response: a sum of exponentially decaying sinusoids plus a
 * diffuse noise tail. `modes` are [frequency Hz, amplitude, T60 seconds].
 */
function modalIR(ctx, modes, { length = 0.35, tail = 0.35, seed = 12345, tailDecay = 22 } = {}) {
  const sr = ctx.sampleRate;
  const n = Math.floor(sr * length);
  const buf = ctx.createBuffer(2, n, sr);
  const rand = rng(seed);

  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    // Decorrelate the two channels slightly so the result has width without
    // smearing the transient.
    const detune = ch === 0 ? 1 : 1.006;
    const phase = ch === 0 ? 0 : 0.7;

    for (const [f, a, t60] of modes) {
      const w = (2 * Math.PI * f * detune) / sr;
      const decay = Math.exp(-6.907755 / (t60 * sr)); // ln(1000)/T60
      let env = a;
      for (let i = 0; i < n; i++) {
        d[i] += env * Math.sin(w * i + phase);
        env *= decay;
        if (env < 1e-7) break;
      }
    }

    // Diffuse late energy.
    let noiseEnv = tail;
    for (let i = 0; i < n; i++) {
      d[i] += rand() * noiseEnv;
      noiseEnv *= Math.exp(-tailDecay / sr);
    }

    // Sharp initial impulse so direct sound survives the convolution.
    d[0] += 1;
  }

  normalize(buf);
  return buf;
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

/** Dreadnought steel-string: strong Helmholtz air mode, lively top. */
export function steelBodyIR(ctx) {
  return modalIR(
    ctx,
    [
      [98, 1.0, 0.14], // Helmholtz air resonance
      [196, 0.75, 0.12], // top plate (0,0)
      [255, 0.5, 0.1], // back plate
      [392, 0.4, 0.08],
      [510, 0.3, 0.07],
      [720, 0.25, 0.06],
      [1050, 0.18, 0.05],
      [1580, 0.12, 0.04],
      [2400, 0.08, 0.03],
      [3300, 0.05, 0.025],
    ],
    { length: 0.32, tail: 0.22, seed: 7331 }
  );
}

/** Classical/nylon: lower air mode, warmer and shorter. */
export function nylonBodyIR(ctx) {
  return modalIR(
    ctx,
    [
      [88, 1.0, 0.16],
      [178, 0.8, 0.13],
      [230, 0.45, 0.1],
      [360, 0.3, 0.08],
      [560, 0.2, 0.06],
      [850, 0.13, 0.05],
      [1300, 0.07, 0.035],
      [2000, 0.04, 0.025],
    ],
    { length: 0.3, tail: 0.16, seed: 4242, tailDecay: 30 }
  );
}

/** Hollow-body archtop: mellow, quick, pronounced low-mid. */
export function archtopBodyIR(ctx) {
  return modalIR(
    ctx,
    [
      [120, 0.9, 0.1],
      [210, 0.7, 0.09],
      [330, 0.45, 0.07],
      [480, 0.28, 0.055],
      [740, 0.16, 0.04],
      [1150, 0.08, 0.03],
    ],
    { length: 0.24, tail: 0.14, seed: 9182, tailDecay: 35 }
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
      [58, 0.9, 0.5],
      [92, 1.0, 0.45],
      [131, 0.8, 0.4],
      [175, 0.62, 0.36],
      [233, 0.5, 0.32],
      [311, 0.42, 0.28],
      [415, 0.34, 0.24],
      [554, 0.26, 0.2],
      [740, 0.2, 0.17],
      [988, 0.15, 0.14],
      [1320, 0.11, 0.11],
      [1760, 0.08, 0.09],
      [2350, 0.055, 0.07],
      [3140, 0.038, 0.055],
      [4190, 0.024, 0.045],
    ],
    { length: 0.75, tail: 0.5, seed: 5150, tailDecay: 9 }
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
      [86, 1.0, 0.22],
      [172, 0.4, 0.16],
      [340, 0.18, 0.1],
      [620, 0.08, 0.07],
      [1180, 0.04, 0.05],
    ],
    { length: 0.22, tail: 0.1, seed: 6180, tailDecay: 40 }
  );
}

/** 1x12 guitar cabinet: the classic ~80 Hz–5 kHz window with a presence peak. */
export function cabinetIR(ctx) {
  return modalIR(
    ctx,
    [
      [95, 0.9, 0.02],
      [180, 0.6, 0.016],
      [420, 0.4, 0.012],
      [900, 0.35, 0.009],
      [1800, 0.3, 0.007],
      [2600, 0.4, 0.006], // presence peak
      [3900, 0.15, 0.004],
      [5200, 0.05, 0.003],
    ],
    { length: 0.06, tail: 0.05, seed: 555, tailDecay: 400 }
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
export function safetyCurve(knee = 0.7, ceiling = 0.98, steps = 4096) {
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
