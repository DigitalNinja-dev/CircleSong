#!/usr/bin/env node
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

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
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
  'src/drum-patterns.js',
  'src/harmony.js',
  'src/projects.js',
  'src/tuner.js',
  'src/theme.js',
  'src/content.js',
  'src/audio/impulse.js',
  'src/audio/drums.js',
  'src/audio/engine.js',
  'src/sequencer.js',
  'src/app.js',
];

// Adding a module to src/ and forgetting to list it here produces a bundle that
// throws only at runtime, and forgetting it in sw.js breaks the app offline
// only. Both lists are checked against the directory so the drift is a build
// error instead of a bug report.
{
  const found = [];
  const walk = (dir) => {
    for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
      const rel = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(rel);
      else if (entry.name.endsWith('.js')) found.push(rel);
    }
  };
  walk('src');

  // The worklet is embedded as a string, not concatenated into the bundle.
  const expected = found.filter((f) => f !== 'src/audio/guitar-processor.js');
  const missing = expected.filter((f) => !MODULES.includes(f));
  if (missing.length) {
    throw new Error(`build: these modules exist but are not in MODULES: ${missing.join(', ')}`);
  }

  const sw = read('sw.js');
  const uncached = found.filter((f) => !sw.includes(`./${f}`));
  if (uncached.length) {
    throw new Error(`build: these modules are not precached in sw.js: ${uncached.join(', ')}`);
  }

  // Renamed imports cannot survive bundling. The modules are concatenated into
  // one scope and the import lines are simply deleted, so `import { a as b }`
  // leaves every use of `b` undefined. Real ESM handles it, which is the
  // problem: it works in the dev server and throws only in the shipped single
  // file — and a throw during render takes the whole UI down with it.
  const aliased = [];
  for (const rel of found) {
    const src = read(rel);
    for (const m of src.matchAll(/^import\s*\{([^}]*)\}\s*from[^;]*;/gms)) {
      for (const part of m[1].split(',')) {
        const named = part.match(/(\S+)\s+as\s+(\S+)/);
        if (named) aliased.push(`${rel}: ${named[1]} as ${named[2]}`);
      }
    }
  }
  if (aliased.length) {
    throw new Error(
      `build: renamed imports do not survive bundling — rename the export instead:\n  ${aliased.join('\n  ')}`
    );
  }
}

// Stamp the service worker's cache name with a hash of everything it precaches.
//
// A hand-maintained version number fails silently in the one direction that
// matters: forget to bump it and every returning user keeps running the
// previous build, which is indistinguishable from the change not working. The
// hash cannot be forgotten, so shipping a change always invalidates the cache.
{
  const swPath = join(root, 'sw.js');
  let sw = readFileSync(swPath, 'utf8');
  const shell = [...sw.matchAll(/^\s*'\.\/([^']*)',/gm)].map((m) => m[1]).filter(Boolean);
  const h = createHash('sha256');
  for (const rel of shell.sort()) {
    try {
      h.update(rel);
      h.update(readFileSync(join(root, rel)));
    } catch {
      // './' and any entry without a file on disk contribute their name only.
    }
  }
  const stamp = `circlesong-${h.digest('hex').slice(0, 8)}`;
  const current = sw.match(/const CACHE = '([^']+)'/);
  if (!current) throw new Error('build: could not find the CACHE constant in sw.js');
  if (current[1] !== stamp) {
    sw = sw.replace(/const CACHE = '[^']+'/, `const CACHE = '${stamp}'`);
    writeFileSync(swPath, sw);
    console.log(`sw.js cache stamped ${current[1]} -> ${stamp}`);
  }
}

const stripModuleSyntax = (src) =>
  src
    // `import { a, b } from './x.js';`, including multi-line forms
    .replace(/^import\b[^;]*?from\s*['"][^'"]*['"]\s*;/gms, '')
    // leading `export ` on declarations
    .replace(/^export\s+/gm, '');

const workletSrc = read('src/audio/guitar-processor.js');

// The AGPL notice at the head of every source file would otherwise appear once
// per module inside the bundle. One copy is kept, at the top of the generated
// file and again above the script, which is what the licence actually asks for.
const LICENCE_HEADER = /^\/\*\n \* CircleSong[\s\S]*?\*\/\n/;
const licenceNotice = (read('src/theory.js').match(LICENCE_HEADER) || [''])[0].trim();
if (!licenceNotice) throw new Error('build: the AGPL header is missing from src/theory.js');

let bundle = MODULES.map((path) => {
  let code = stripModuleSyntax(read(path)).replace(LICENCE_HEADER, '');
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
const fonts = exists('assets/fonts.css') ? read('assets/fonts.css') : '';
if (!fonts) console.warn('warning: assets/fonts.css missing — falling back to system faces');

const css = read('styles.css');
const head = `<title>CircleSong</title>
<style>
${fonts}${css}
</style>`;

const script = `<script>
${licenceNotice}
(() => {
'use strict';
${prelude}
${bundle}
})();
</script>`;

// Fragment form: no doctype/html/head/body, for hosts that wrap the content in
// their own document skeleton.
const page = `${head}\n${body}\n${script}`;

// The single file is the whole program for anyone who receives it, so it
// carries the notice and the offer of source in its own right.
const htmlNotice = licenceNotice
  .replace(/^\/\*\n?/, '')
  .replace(/\n? \*\/$/, '')
  .replace(/^ \* ?/gm, '  ')
  .replace(/--/g, '- -');

const out = `<!DOCTYPE html>
<!--
${htmlNotice}
-->
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
