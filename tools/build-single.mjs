#!/usr/bin/env node
/**
 * Builds dist/circlesong.html — the whole app as one self-contained file that
 * runs by double-clicking it, with no server, no network, and no install.
 *
 * The multi-file source under src/ stays the thing you edit; this is a
 * distribution artifact. Rebuild with `npm run build` after changing sources.
 *
 * Two things need special handling:
 *  - ES module syntax is stripped and the modules are concatenated in
 *    dependency order inside one IIFE, so the page needs no module loader and
 *    works from a file:// origin.
 *  - The AudioWorklet processor cannot be inlined as a <script>; it has to be
 *    fetched as a URL. It is embedded as a string and loaded from a blob URL,
 *    falling back to a data URL where a Content-Security-Policy forbids blobs.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const exists = (p) => existsSync(join(root, p));

// `--artifact <path>` additionally emits a fragment (no doctype/html/head/body)
// for hosts that supply their own document skeleton.
const artifactFlag = process.argv.indexOf('--artifact');
const artifactPath = artifactFlag !== -1 ? process.argv[artifactFlag + 1] : null;

// Dependency order — each module may only reference those above it.
const MODULES = [
  'src/theory.js',
  'src/fretboard.js',
  'src/patterns.js',
  'src/content.js',
  'src/audio/impulse.js',
  'src/audio/engine.js',
  'src/sequencer.js',
  'src/app.js',
];

const stripModuleSyntax = (src) =>
  src
    // `import { a, b } from './x.js';`, including multi-line forms
    .replace(/^import\b[^;]*?from\s*['"][^'"]*['"]\s*;/gms, '')
    // leading `export ` on declarations
    .replace(/^export\s+/gm, '');

const workletSrc = read('src/audio/guitar-processor.js');

let bundle = MODULES.map((path) => {
  let code = stripModuleSyntax(read(path));
  if (path === 'src/audio/engine.js') {
    // The worklet URL is resolved by the prelude instead of import.meta.
    code = code
      .replace(/^const WORKLET_URL = .*$/m, '')
      .replace(
        /await this\.ctx\.audioWorklet\.addModule\(WORKLET_URL\);/,
        'await loadWorklet(this.ctx);'
      );
  }
  return `\n/* ===== ${path} ===== */\n${code.trim()}\n`;
}).join('');

if (bundle.includes('WORKLET_URL')) {
  throw new Error('build: WORKLET_URL was not fully replaced in engine.js');
}
if (/^\s*import\b/m.test(bundle) || /^export\b/m.test(bundle)) {
  throw new Error('build: module syntax survived stripping');
}

const prelude = `
const WORKLET_SRC = ${JSON.stringify(workletSrc)};

/**
 * Load the string-model processor. A blob URL is the normal path; some
 * Content-Security-Policies forbid blob: for worklets, so fall back to a data
 * URL before giving up.
 */
async function loadWorklet(ctx) {
  const candidates = [
    () => URL.createObjectURL(new Blob([WORKLET_SRC], { type: 'text/javascript' })),
    () => 'data:text/javascript;base64,' + btoa(unescape(encodeURIComponent(WORKLET_SRC))),
  ];
  let lastError;
  for (const make of candidates) {
    try {
      await ctx.audioWorklet.addModule(make());
      return;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}
`;

// Body markup from index.html, minus the module script tag. Referenced assets
// become data URIs so the single file has nothing left to fetch.
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(read('assets/logo.svg'), 'utf8').toString('base64')}`;
const html = read('index.html');
const body = html
  .slice(html.indexOf('<body>') + '<body>'.length, html.lastIndexOf('</body>'))
  .replace(/<script[^>]*src=[^>]*><\/script>/g, '')
  .replaceAll('assets/logo.svg', logoDataUri)
  .trim();

// Webfonts are inlined as data URIs rather than linked: the page must render
// its real typography with no network, and font CDNs are blocked outright in
// sandboxed hosts. Regenerate with tools/fetch-fonts.mjs.
const fonts = exists('tools/fonts.css') ? read('tools/fonts.css') : '';
if (!fonts) console.warn('warning: tools/fonts.css missing — falling back to system faces');

const css = read('styles.css');
const head = `<title>CircleSong</title>
<style>
${fonts}${css}
</style>`;

const script = `<script>
(() => {
'use strict';
${prelude}
${bundle}
})();
</script>`;

// Fragment form: no doctype/html/head/body, for hosts that wrap the content in
// their own document skeleton.
const page = `${head}\n${body}\n${script}`;

const out = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0d0d0d">
<meta name="description" content="CircleSong — an interactive, theory-guided guitar DAW and progression sequencer built on the Circle of Fifths.">
<!-- Single-file build — generated by tools/build-single.mjs, do not edit.
     Open it directly in a browser; no server or network required. -->
${head}
</head>
<body>
${body}
${script}
</body>
</html>
`;

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/circlesong.html'), out);
console.log(`dist/circlesong.html  ${(out.length / 1024).toFixed(0)} KB`);

if (artifactPath) {
  writeFileSync(artifactPath, `${page}\n`);
  console.log(`${artifactPath}  ${(page.length / 1024).toFixed(0)} KB`);
}
