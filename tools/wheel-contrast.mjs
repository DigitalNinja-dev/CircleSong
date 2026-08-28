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
 * Contrast of the wheel labels, computed rather than sampled.
 *
 *   node tools/wheel-contrast.mjs
 *
 * The circle of fifths is the main control of the app and the hardest surface
 * in it to check: the wedges are a conic gradient built in JavaScript, so there
 * is no `background-color` anywhere for a DOM-walking audit to find — it reads
 * the page behind the wheel instead and reports a pass. Sampling the rendered
 * pixels is not much better for a 16px glyph.
 *
 * Both colours here are known, though. The wedge is `oklch(L C hue)` assembled
 * from the same tokens `paintScheme()` reads, and the ink is a theme token,
 * composited over the wedge first because several of them are translucent. Two
 * known colours give an exact answer.
 *
 * Every hue is checked in every state on both rings, not only the ones the
 * default key happens to show, because the user can turn the wheel to any key.
 */

import { chromium } from 'playwright';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';

const root = process.env.APP_ROOT || join(dirname(fileURLToPath(import.meta.url)), '..');
const THEMES = ['dark', 'light', 'contrast', 'sepia'];
const AA = 4.5;

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2',
};
const server = createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = join(root, rel);
  if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYPES[rel.slice(rel.lastIndexOf('.'))] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

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

const exe = chromiumPath();
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 430, height: 900 } });
await page.goto(base, { waitUntil: 'networkidle' });

let failures = 0;
let pairs = 0;

for (const theme of THEMES) {
  const rows = await page.evaluate((t) => {
    document.documentElement.dataset.theme = t;
    window.CircleSong.state.activeTab = 'circle';
    window.CircleSong.render();

    const cv = document.createElement('canvas'); cv.width = cv.height = 1;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const over = (css, base) => {
      cx.clearRect(0, 0, 1, 1);
      cx.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`; cx.fillRect(0, 0, 1, 1);
      cx.fillStyle = css; cx.fillRect(0, 0, 1, 1);
      const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2]];
    };
    const solid = (css) => over(css, [0, 0, 0]);
    const lum = (p) => {
      const f = p.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
      return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
    };
    const ratio = (a, b) => { const [h, l] = [lum(a), lum(b)].sort((x, y) => y - x); return (h + 0.05) / (l + 0.05); };

    const cs = getComputedStyle(document.documentElement);
    const num = (k, d) => { const v = parseFloat(cs.getPropertyValue(k)); return Number.isFinite(v) ? v : d; };
    const ink = (k) => cs.getPropertyValue('--' + k).trim();
    const p = {
      lRoot: num('--wheel-l-root', 0.68), lDia: num('--wheel-l-dia', 0.56), lOff: num('--wheel-l-off', 0.26),
      cRoot: num('--wheel-c-root', 0.17), cDia: num('--wheel-c-dia', 0.13), cOff: num('--wheel-c-off', 0.035),
      drop: num('--wheel-in-drop', 0.12),
    };

    const out = [];
    for (let i = 0; i < 12; i++) {
      const hue = i * 30;
      for (const [state, L, C] of [
        ['root', p.lRoot, p.cRoot], ['diatonic', p.lDia, p.cDia], ['off', p.lOff, p.cOff],
      ]) {
        for (const ring of ['outer', 'inner']) {
          const wedge = solid(ring === 'inner'
            ? `oklch(${L - p.drop} ${C * 0.78} ${hue})`
            : `oklch(${L} ${C} ${hue})`);
          // Whichever polarity the app itself would choose here.
          const pair = state === 'off'
            ? ['wheel-ink-light-dim', 'wheel-ink-dark-dim']
            : ['wheel-ink-light', 'wheel-ink-dark'];
          let token = null, best = -1;
          for (const k of pair) {
            const r = ratio(over(ink(k), wedge), wedge);
            if (r > best) { best = r; token = k; }
          }
          out.push({ hue, state, ring, token, r: best });
        }
      }
    }
    return out;
  }, theme);

  const under = rows.filter((x) => x.r < 4.5);
  pairs += rows.length;
  failures += under.length;
  const worst = Math.min(...rows.map((x) => x.r));
  console.log(`  ${theme.padEnd(9)} ${rows.length} wedge/ink pairs, worst ${worst.toFixed(2)}${under.length ? `, ${under.length} below AA` : ''}`);
  for (const u of under) {
    console.log(`     hue ${String(u.hue).padStart(3)}  ${u.ring.padEnd(6)}${u.state.padEnd(10)}${u.token.padEnd(24)}${u.r.toFixed(2)}`);
  }
}

await browser.close();
server.close();
console.log(failures
  ? `\n${failures} of ${pairs} wedge/ink pairs are below WCAG AA`
  : `\nall ${pairs} wedge/ink pairs pass WCAG AA (${AA}:1)`);
process.exit(failures ? 1 : 0);
