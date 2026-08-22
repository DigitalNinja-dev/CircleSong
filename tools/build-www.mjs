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
 * Assemble www/ — the exact set of files the Android app ships.
 *
 * Capacitor copies a directory into the native project, so it needs one
 * containing the app and nothing else. Pointing it at the repo root would put
 * the git history, the tools and the docs inside the APK.
 *
 * This is a copy rather than the single-file build on purpose: the app runs
 * from a real origin inside the WebView, so modules and the service worker work
 * normally, and shipping the same file layout as the web version means the
 * Android app is not a second thing to debug.
 */

import { cp, rm, mkdir, readdir, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'www');

/** Everything the app loads at runtime, and nothing else. */
const SHIP = [
  'index.html',
  'styles.css',
  'sw.js',
  'manifest.webmanifest',
  'src',
  'assets',
  'icons',
];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const entry of SHIP) {
  await cp(join(root, entry), join(out, entry), { recursive: true });
}

// A missing file here is an app that boots to a blank screen on a device, which
// is a slow thing to diagnose. Check the entry points exist before declaring
// success.
const must = ['index.html', 'src/app.js', 'styles.css', 'assets/fonts.css'];
for (const f of must) {
  await stat(join(out, f)).catch(() => {
    throw new Error(`build-www: ${f} is missing from www/`);
  });
}

let files = 0;
let bytes = 0;
const walk = async (dir) => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else {
      files++;
      bytes += (await stat(p)).size;
    }
  }
};
await walk(out);
console.log(`www/  ${files} files, ${(bytes / 1024).toFixed(0)} KB`);
