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
 * Localising the data tables.
 *
 * Most of what the app says is not written in the markup or in a render
 * function — it is written in `content.js`, `patterns.js`, `drum-patterns.js`
 * and their neighbours, as data. Rewriting every one of those reads into a
 * `t()` call would be hundreds of edits to code that is not otherwise changing,
 * and would leave the tables themselves untranslatable to anyone who added one.
 *
 * So the tables are translated instead of the reads. On a language change the
 * named prose fields are rewritten in place, which is legal — the module
 * binding is constant, the array it points at is not — and every existing
 * read keeps working untouched.
 *
 * Two rules make that safe:
 *
 *  - English is restored from a pristine deep copy taken before anything is
 *    written, so switching language twice cannot translate a translation, and
 *    English is not a dictionary lookup but the original bytes.
 *  - Only fields listed here are touched, and never an `id`. Everything the
 *    code matches on is an id; everything translated is something a person
 *    reads. A label may be compared against another label — the progression
 *    family filter does exactly that — which stays correct because both sides
 *    are rewritten in the same pass.
 */

import { t } from './i18n.js';
import {
  FUNCTION_NAMES, FUNCTION_BLURB, MODE_INFO, MOODS, SECTIONS, TEMPLATES,
  TEMPLATE_FAMILIES, MODE_NAMES, INTERVAL_NAMES,
} from './content.js';
import { RHYTHMS, FEELS } from './patterns.js';
import { DRUM_STYLES } from './drum-patterns.js';
import { DRUM_KITS, DRUM_VOICES } from './audio/drums.js';
import { SECTION_ROLES, CADENCE_WORD } from './harmony.js';
import { MODES, CHORD_SIZES, CHORD_COLOURS, DEGREE_ROLE, SIZE_NOTE } from './theory.js';
import { INSTRUMENTS } from './tuner.js';
import { VOICING_MODES } from './fretboard.js';
import { THEMES } from './theme.js';

/** Object fields that hold prose. Everything else is left alone. */
const PROSE = ['label', 'blurb', 'text', 'use', 'mood', 'alsoKnown', 'note', 'hint', 'family'];

/**
 * The tables, as a flat list of the things to walk.
 *
 * Arrays of plain strings are translated element by element; arrays and objects
 * of records have their prose fields translated and are recursed into, so
 * `SECTIONS[].variants[].blurb` needs no special case.
 */
const TABLES = [
  FUNCTION_NAMES, FUNCTION_BLURB, MODE_NAMES, INTERVAL_NAMES,
  MODE_INFO, MOODS, SECTIONS, TEMPLATES, TEMPLATE_FAMILIES,
  RHYTHMS, FEELS, DRUM_STYLES, DRUM_VOICES, DRUM_KITS,
  SECTION_ROLES, MODES, CHORD_SIZES, CHORD_COLOURS, INSTRUMENTS, THEMES, VOICING_MODES,
  DEGREE_ROLE, SIZE_NOTE, CADENCE_WORD,
];

/**
 * Tables that are nothing but prose, keyed by something that is not a field
 * name — a chord size, a cadence id, a scale degree. There is no key to test
 * here, so they are named instead of inferred; inferring them from "every value
 * is a string" was wrong, because `{ id, label, tag }` is that shape too and
 * two of its three fields are identifiers.
 */
const ALL_PROSE = new Set([DEGREE_ROLE, SIZE_NOTE, CADENCE_WORD]);

/** Deep copy of the English tables, taken once, before anything is written. */
const PRISTINE = TABLES.map(clone);

function clone(v) {
  if (Array.isArray(v)) return v.map(clone);
  if (v && typeof v === 'object') {
    const o = {};
    for (const k of Object.keys(v)) o[k] = clone(v[k]);
    return o;
  }
  return v;
}

/**
 * Copy `src` over `dst` in place, translating prose on the way.
 *
 * `map` is the translation applied to a prose string; for English it is the
 * identity, which is how "switch back to English" is expressed without a
 * reverse dictionary.
 */
function overlay(dst, src, map, inProse) {
  if (Array.isArray(dst) && Array.isArray(src)) {
    dst.length = src.length;
    for (let i = 0; i < src.length; i++) {
      const s = src[i];
      if (typeof s === 'string') dst[i] = inProse ? map(s) : s;
      else if (s && typeof s === 'object') {
        if (!dst[i] || typeof dst[i] !== 'object') dst[i] = Array.isArray(s) ? [] : {};
        overlay(dst[i], s, map, inProse);
      } else dst[i] = s;
    }
    return dst;
  }
  for (const k of Object.keys(src)) {
    const s = src[k];
    const prose = PROSE.includes(k);
    if (typeof s === 'string') dst[k] = prose ? map(s) : s;
    else if (s && typeof s === 'object') {
      if (!dst[k] || typeof dst[k] !== 'object') dst[k] = Array.isArray(s) ? [] : {};
      overlay(dst[k], s, map, prose);
    } else dst[k] = s;
  }
  return dst;
}

/**
 * Rewrite every table for the language `t()` is currently set to.
 *
 * Call after `setLanguage`, before the next render. It is cheap — a few hundred
 * short strings — and idempotent, because it always starts from the pristine
 * English copy rather than from whatever is currently in the tables.
 */
export function localiseTables() {
  TABLES.forEach((table, i) => {
    if (ALL_PROSE.has(table)) {
      for (const k of Object.keys(PRISTINE[i])) table[k] = t(PRISTINE[i][k]);
      return;
    }
    overlay(table, PRISTINE[i], t, Array.isArray(table));
  });
  // TEMPLATE_FAMILIES is derived from TEMPLATES and has to be rebuilt from the
  // translated families, or the family filter would compare Spanish against
  // English and match nothing.
  const fams = [...new Set(TEMPLATES.map((x) => x.family))];
  TEMPLATE_FAMILIES.length = 0;
  TEMPLATE_FAMILIES.push(...fams);
  return TABLES.length;
}

/** Every English prose string in the tables, for the coverage tool. */
export function tableStrings() {
  const out = new Set();
  const walk = (v, inProse) => {
    if (Array.isArray(v)) {
      for (const x of v) {
        if (typeof x === 'string') { if (inProse) out.add(x); }
        else if (x && typeof x === 'object') walk(x, inProse);
      }
      return;
    }
    for (const k of Object.keys(v)) {
      const s = v[k];
      const prose = PROSE.includes(k);
      if (typeof s === 'string') { if (prose) out.add(s); }
      else if (s && typeof s === 'object') walk(s, prose);
    }
  };
  PRISTINE.forEach((table, i) => {
    if (ALL_PROSE.has(TABLES[i])) {
      for (const v of Object.values(table)) if (typeof v === 'string') out.add(v);
      return;
    }
    walk(table, Array.isArray(TABLES[i]));
  });
  return [...out];
}
