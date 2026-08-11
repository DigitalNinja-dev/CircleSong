// Recording the song to an audio file.
//
// A note on formats, because the obvious ask is "MP3" and browsers cannot do
// it. No browser exposes an MP3 encoder — producing one means shipping a
// LAME build (hundreds of kilobytes of JS, and a patent history) into an app
// whose whole point is that it is one file that works offline. So this offers
// what the platform actually has:
//
//   WAV  — written here from raw samples. Lossless, universal, opens in every
//          DAW and converts to MP3 anywhere. Big, but exact.
//   MP4 / WebM — whatever MediaRecorder supports. Safari gives AAC in an MP4
//          container (a normal .m4a), Chrome and Firefox give Opus in WebM.
//          Small, and fine for sharing.
//
// Both are captured from the live output in one pass, so what is written is
// exactly what was heard — the same limiter, the same reverb tail.

/** Container/codec options in the order we would rather have them. */
const COMPRESSED_TYPES = [
  'audio/mp4;codecs=mp4a.40.2',
  'audio/mp4',
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/ogg;codecs=opus',
];

/** The best compressed format this browser can write, or null. */
export function compressedFormat() {
  if (typeof MediaRecorder === 'undefined') return null;
  for (const mimeType of COMPRESSED_TYPES) {
    if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(mimeType)) {
      const ext = mimeType.startsWith('audio/mp4') ? 'm4a' : mimeType.startsWith('audio/ogg') ? 'ogg' : 'webm';
      return { mimeType, ext, label: ext === 'm4a' ? 'MP4 audio (.m4a)' : `${ext.toUpperCase()} audio` };
    }
  }
  return null;
}

/**
 * Capture the engine's output while something plays it.
 *
 * The caller starts playback and calls `stop()` when it has finished; this
 * only listens. Both formats come off the same pass so they can never differ.
 */
export class Recorder {
  /**
   * @param {AudioContext} ctx
   * @param {AudioNode} source  the node to tap — the very end of the chain
   */
  constructor(ctx, source) {
    this.ctx = ctx;
    this.source = source;
    this.recording = false;
    this._chunks = [];
    this._pcm = [[], []];
    this._frames = 0;
  }

  async start({ compressed = true, wav = true } = {}) {
    if (this.recording) return;
    this.recording = true;
    this._chunks = [];
    this._pcm = [[], []];
    this._frames = 0;
    this._wantWav = wav;

    // Raw samples for the WAV. A ScriptProcessor is deprecated but it is the
    // one tap that works without shipping another worklet, and it only has to
    // copy what is already flowing past.
    if (wav) {
      const size = 4096;
      this._tap = this.ctx.createScriptProcessor(size, 2, 2);
      this._tap.onaudioprocess = (e) => {
        if (!this.recording) return;
        const inp = e.inputBuffer;
        this._pcm[0].push(new Float32Array(inp.getChannelData(0)));
        this._pcm[1].push(new Float32Array(inp.getChannelData(inp.numberOfChannels > 1 ? 1 : 0)));
        this._frames += inp.length;
        // A ScriptProcessor must have somewhere to send its output or some
        // browsers stop calling it, so it feeds a silent gain.
      };
      this._sink = this.ctx.createGain();
      this._sink.gain.value = 0;
      this.source.connect(this._tap);
      this._tap.connect(this._sink);
      this._sink.connect(this.ctx.destination);
    }

    const fmt = compressed ? compressedFormat() : null;
    if (fmt) {
      this._dest = this.ctx.createMediaStreamDestination();
      this.source.connect(this._dest);
      this._rec = new MediaRecorder(this._dest.stream, { mimeType: fmt.mimeType });
      this._fmt = fmt;
      this._rec.ondataavailable = (e) => { if (e.data && e.data.size) this._chunks.push(e.data); };
      this._rec.start(250);
    }
  }

  /** @returns {{wav: Blob|null, compressed: Blob|null, ext: string|null, seconds: number}} */
  async stop() {
    if (!this.recording) return { wav: null, compressed: null, ext: null, seconds: 0 };
    this.recording = false;

    let compressed = null;
    if (this._rec) {
      await new Promise((resolve) => {
        this._rec.onstop = resolve;
        this._rec.stop();
      });
      compressed = new Blob(this._chunks, { type: this._fmt.mimeType });
      this.source.disconnect(this._dest);
      this._dest = null;
      this._rec = null;
    }

    let wav = null;
    const seconds = this._frames / this.ctx.sampleRate;
    if (this._tap) {
      this.source.disconnect(this._tap);
      this._tap.onaudioprocess = null;
      this._tap.disconnect();
      this._sink.disconnect();
      this._tap = null;
      this._sink = null;
    }
    if (this._wantWav && this._frames) wav = encodeWav(this._pcm, this._frames, this.ctx.sampleRate);
    this._pcm = [[], []];
    this._chunks = [];

    return { wav, compressed, ext: this._fmt ? this._fmt.ext : null, seconds };
  }
}

/** Interleave float chunks into a 16-bit stereo WAV. */
function encodeWav(pcm, frames, sampleRate) {
  const channels = 2;
  const bytes = 44 + frames * channels * 2;
  const buf = new ArrayBuffer(bytes);
  const view = new DataView(buf);

  const ascii = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  ascii(0, 'RIFF');
  view.setUint32(4, bytes - 8, true);
  ascii(8, 'WAVE');
  ascii(12, 'fmt ');
  view.setUint32(16, 16, true);          // PCM header size
  view.setUint16(20, 1, true);           // format: PCM
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * channels * 2, true); // byte rate
  view.setUint16(32, channels * 2, true);              // block align
  view.setUint16(34, 16, true);                        // bits per sample
  ascii(36, 'data');
  view.setUint32(40, frames * channels * 2, true);

  let offset = 44;
  const write = (v) => {
    // Clamp before scaling: the limiter should have handled this, but a sample
    // that slipped past would wrap around into a loud click rather than clip.
    const s = Math.max(-1, Math.min(1, v));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  };

  for (let c = 0; c < pcm[0].length; c++) {
    const l = pcm[0][c];
    const r = pcm[1][c];
    for (let i = 0; i < l.length; i++) {
      write(l[i]);
      write(r[i]);
    }
  }
  return new Blob([buf], { type: 'audio/wav' });
}
