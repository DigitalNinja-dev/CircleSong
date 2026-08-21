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
 * Catch duplicate Android resources before Gradle does.
 *
 * Android merges every file under res/values/ into one table, so defining a
 * name in two files is an error — and one that costs a full CI round trip to
 * find, because it surfaces during `mergeDebugResources` rather than at edit
 * time. Capacitor scaffolds `ic_launcher_background` into its own file, so
 * adding a colors.xml that also defines it is an easy mistake to make. It was
 * made.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const values = join(root, 'android/app/src/main/res/values');
if (!existsSync(values)) {
  console.log('no Android project — nothing to check');
  process.exit(0);
}

const seen = new Map();
const problems = [];
let count = 0;

for (const file of readdirSync(values).filter((f) => f.endsWith('.xml'))) {
  const xml = readFileSync(join(values, file), 'utf8');
  for (const m of xml.matchAll(/<(color|string|dimen|bool|integer|style|array)\s+name="([^"]+)"/g)) {
    const key = `${m[1]}/${m[2]}`;
    count++;
    if (seen.has(key)) problems.push(`${key} defined in both ${seen.get(key)} and ${file}`);
    else seen.set(key, file);
  }
}

if (!count) {
  console.error('check-android-res: found no resources at all — the check is not looking at anything');
  process.exit(1);
}
if (problems.length) {
  console.error('check-android-res: duplicate resources\n  ' + problems.join('\n  '));
  process.exit(1);
}
console.log(`check-android-res: ${count} resources, no duplicates`);
