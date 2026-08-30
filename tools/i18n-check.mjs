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
 * Translation coverage, measured rather than assumed.
 *
 * The app is driven through every panel in a real browser and asked what it
 * looked up. That is the only honest catalogue: a grep would miss the strings
 * that only exist in a data table, and a hand-kept list goes stale the first
 * time someone edits a sentence.
 *
 *   node tools/i18n-check.mjs            report coverage per language
 *   node tools/i18n-check.mjs --dump     print the English catalogue, sorted
 *
 * Exits non-zero when a dictionary has keys the app never asks for, because an
 * orphan means an English string was edited and its translations were not.
 */

import { readFileSync, existsSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dump = process.argv.includes('--dump');
const LANGS = ['es', 'hi', 'de', 'id', 'pt', 'ru', 'vi'];

/**
 * Chord suffixes, which are notation rather than language.
 *
 * They pass through `t()` because they live in the same table as the prose that
 * describes them, and it is not worth a second mechanism to keep them out. A
 * translator should leave them alone, so they are excluded from the count
 * instead of being reported as a gap forever.
 */
const NOTATION = new Set(['6th', '7th', '9th', '11th', '13th', 'add9', 'sus2', 'sus4']);

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2',
};

/**
 * Every string handed to `t()` in the source.
 *
 * The browser pass only sees the strings a session actually asks for, and the
 * ones it cannot reach are exactly the ones that matter most — the microphone
 * refusal, the storage-full save, the empty search. Those are read statically
 * instead of being provoked.
 */
/** Read a dictionary straight off disk, for the no-browser path. */
function localeDict(id) {
  const src = readFileSync(join(root, `src/locales/${id}.js`), 'utf8');
  const out = {};
  // Keys only: the values are not compared, and parsing the file as a module
  // would drag the whole import graph in for no gain.
  for (const m of src.matchAll(/^\s*('((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*:/gm)) {
    const raw = m[2] !== undefined ? m[2] : m[3];
    out[raw.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\')] = true;
  }
  return out;
}

function literalCatalogue() {
  const found = new Set();
  const walk = (dir) => {
    for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
      const rel = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(rel);
      else if (entry.name.endsWith('.js') && !rel.startsWith('src/locales')) {
        const src = readFileSync(join(root, rel), 'utf8');
        for (const m of src.matchAll(/\bt\(\s*'((?:[^'\\]|\\.)*)'/g)) {
          found.add(m[1].replace(/\\'/g, "'").replace(/\\u2019/g, '\u2019').replace(/\\\\/g, '\\'));
        }
        for (const m of src.matchAll(/\bplural\([^,]+,\s*'((?:[^'\\]|\\.)*)'\s*,\s*'((?:[^'\\]|\\.)*)'/g)) {
          found.add(m[1]); found.add(m[2]);
        }
      }
    }
  };
  walk('src');
  return found;
}

const server = createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = join(root, rel);
  if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404); res.end(); return; }
  const ext = rel.slice(rel.lastIndexOf('.'));
  res.writeHead(200, { 'content-type': TYPES[ext] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

/**
 * Drive the app in a real browser, if there is one.
 *
 * The browser pass is what catches strings that only exist in a data table, so
 * it is the better answer — but it is not the only one. Where Playwright or its
 * Chromium is not installed the static pass still reports coverage, with a note
 * saying which half ran. A check that refuses to run is a check nobody runs.
 */
/**
 * Where Chromium actually is.
 *
 * Playwright looks for the exact build it shipped with, which is not
 * necessarily the one installed — an environment that pre-installs browsers
 * pins a different revision. Any Chromium under the browsers path will do for
 * reading strings out of the page.
 */
function chromiumPath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const dir = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  if (!existsSync(dir)) return null;
  for (const entry of readdirSync(dir)) {
    if (!entry.startsWith('chromium-')) continue;
    const exe = join(dir, entry, 'chrome-linux', 'chrome');
    if (existsSync(exe)) return exe;
  }
  return null;
}

async function runtimeCatalogue() {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    return { strings: [], errors: [], ran: false, why: 'playwright is not installed' };
  }
  let browser;
  try {
    const exe = chromiumPath();
    browser = await chromium.launch(exe ? { executablePath: exe } : {});
  } catch (e) {
    return { strings: [], errors: [], ran: false, why: `no browser (${e.message.split('\n')[0]})` };
  }
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(base, { waitUntil: 'networkidle' });
  await exerciseIn(page);
  const strings = await page.evaluate(() => {
    const { requested, tableStrings } = window.CircleSong.i18n;
    return [...new Set([...requested, ...tableStrings()])];
  });
  const dicts = {};
  for (const id of LANGS) dicts[id] = await page.evaluate((l) => window.CircleSong.i18n.dict(l), id);
  await browser.close();
  return { strings, errors, dicts, ran: true };
}

/** Visit every tab and open the things that only render when opened. */
async function exerciseIn(page) {
  await page.evaluate(async () => {
    const app = window.CircleSong;
    for (const id of ['circle', 'tuner', 'tone', 'drums', 'compose', 'timeline', 'assist', 'learn', 'songs']) {
      app.state.activeTab = id;
      app.render();
    }
    // Panels that only exist once something is selected.
    app.state.exploreNote = 7;
    app.state.moodId = 'dreamy';
    app.state.sectionId = 'verse';
    app.state.templateOpen = 'axis';
    app.state.secDomOn = true;
    app.render();
  });
}

const runtime = await runtimeCatalogue();
const english = [...new Set([...runtime.strings, ...literalCatalogue()])]
  // A string with no letters in it is a symbol — a chord suffix, a cent window,
  // a reference pitch — and has nothing to translate.
  .filter((s) => /\p{L}{2}/u.test(s) && !NOTATION.has(s))
  .sort((a, b) => a.localeCompare(b));

if (dump) {
  writeFileSync(join(root, 'i18n-catalogue.txt'), english.join('\n') + '\n');
  console.log(`${english.length} strings → i18n-catalogue.txt`);
} else {
  const known = new Set(english);
  let bad = 0;
  console.log(
    `English catalogue: ${english.length} strings` +
    (runtime.ran ? '' : `  (source only — ${runtime.why})`)
  );
  for (const id of LANGS) {
    const dict = runtime.ran ? runtime.dicts[id] : localeDict(id);
    const keys = Object.keys(dict);
    const missing = english.filter((s) => !(s in dict));
    // Without the browser pass the catalogue is only the strings written as
    // literals, so almost every table entry would read as an orphan. Orphans
    // are only meaningful against the full catalogue.
    const orphans = runtime.ran ? keys.filter((k) => !known.has(k)) : [];
    // Count what the catalogue asked for and got, not the size of the file:
    // without the browser pass the dictionary is legitimately larger than the
    // catalogue, and dividing one by the other would report 388% coverage.
    const covered = english.length - missing.length;
    const pct = (covered / english.length * 100).toFixed(1);
    console.log(`  ${id}: ${covered}/${english.length} (${pct}%)` +
      `${missing.length ? `  missing ${missing.length}` : ''}` +
      `${orphans.length ? `  ORPHANED ${orphans.length}` : ''}`);
    for (const o of orphans.slice(0, 10)) console.log(`      orphan: ${JSON.stringify(o)}`);
    if (process.env.I18N_MISSING === id) {
      writeFileSync(join(root, `i18n-missing-${id}.txt`), missing.join('\n') + '\n');
      console.log(`      → i18n-missing-${id}.txt`);
    }
    if (orphans.length) bad++;
  }
  if (runtime.errors.length) {
    console.log('page errors:');
    runtime.errors.forEach((e) => console.log('  ' + e));
    bad++;
  }
  if (bad) { server.close(); process.exit(1); }
}

server.close();
