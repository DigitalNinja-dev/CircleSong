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
 * Language.
 *
 * The app is written in English and the English text *is* the key: `t('Loop')`
 * looks up 'Loop' in the active dictionary and hands back 'Loop' when there is
 * nothing to hand back. That has three consequences worth stating, because they
 * are why it is done this way rather than with `ui.transport.loop` keys:
 *
 *  - A missing translation degrades to English rather than to a key name. There
 *    is no state of the app in which a raw identifier can reach the screen.
 *  - The source stays readable. `t('Nothing saved yet.')` says what it renders.
 *  - Adding a language is one file and touches nothing else.
 *
 * The cost is that changing an English string orphans its translations. That is
 * caught by `npm run i18n:check`, which diffs every dictionary against the
 * strings the app actually asks for.
 *
 * Static markup is translated by attribute rather than by call: an element with
 * `data-i18n` has its text replaced, and `data-i18n-attr="title aria-label"`
 * names attributes to translate as well. The English original is snapshotted on
 * the element the first time it is seen, so switching language repeatedly does
 * not translate a translation.
 */

import { LOCALE_ES } from './locales/es.js';
import { LOCALE_HI } from './locales/hi.js';
import { LOCALE_DE } from './locales/de.js';

const LANG_KEY = 'circlesong.lang';

/**
 * Every language is written in its own script, and never only in English.
 *
 * Someone who has just switched the app into a language they cannot read has to
 * be able to find their way back, and "Spanish" is no help to them — "Español"
 * is. The picker shows both, so it is findable from either direction.
 */
export const LANGUAGES = [
  { id: 'en', native: 'English', english: 'English', dir: 'ltr' },
  { id: 'es', native: 'Español', english: 'Spanish', dir: 'ltr' },
  { id: 'hi', native: 'हिन्दी', english: 'Hindi', dir: 'ltr' },
  { id: 'de', native: 'Deutsch', english: 'German', dir: 'ltr' },
];

export const LANG_IDS = LANGUAGES.map((l) => l.id);

const DICTS = { en: null, es: LOCALE_ES, hi: LOCALE_HI, de: LOCALE_DE };

/** One dictionary, for the coverage tool. English has none — it is the source. */
export function dictFor(id) {
  return DICTS[id] || {};
}

let current = 'en';
let active = null;

/** Strings the app asked for, for the coverage check. Cheap, and only a Set. */
export const REQUESTED = new Set();

/**
 * Translate.
 *
 * `vars` fills `{name}` placeholders, in the translation as well as in the
 * fallback, so a translator can move them around a sentence freely — which is
 * the whole reason they are named rather than positional.
 */
export function t(s, vars) {
  if (typeof s !== 'string' || !s) return s;
  REQUESTED.add(s);
  let out = (active && active[s]) || s;
  if (vars) {
    out = out.replace(/\{(\w+)\}/g, (m, k) =>
      Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : m
    );
  }
  return out;
}

/**
 * Pick a singular or plural form and translate it.
 *
 * Both forms are separate entries in the dictionary rather than one string with
 * a suffix rule, because the rule is not the same in every language: German
 * pluralises the noun, Spanish pluralises the adjective with it, and Hindi
 * inflects differently again.
 */
export function plural(n, one, other, vars) {
  return t(n === 1 ? one : other, { n, ...vars });
}

export function lang() {
  return current;
}

export function langInfo(id = current) {
  return LANGUAGES.find((l) => l.id === id) || LANGUAGES[0];
}

/**
 * What language to start in.
 *
 * A stored choice wins. Otherwise the device's own languages are consulted in
 * order and the first one the app speaks is used — matching on the primary
 * subtag, so `es-419` and `de-AT` both land somewhere useful. English is the
 * fallback, and also the default when the device asks for something we do not
 * have.
 */
export function resolveLang(pref) {
  if (LANG_IDS.includes(pref)) return pref;
  const wanted =
    typeof navigator !== 'undefined' && navigator.languages && navigator.languages.length
      ? navigator.languages
      : [typeof navigator !== 'undefined' ? navigator.language : 'en'];
  for (const tag of wanted) {
    const base = String(tag || '').toLowerCase().split('-')[0];
    if (LANG_IDS.includes(base)) return base;
  }
  return 'en';
}

export function storedLang() {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return LANG_IDS.includes(v) ? v : null;
  } catch {
    return null;
  }
}

export function saveLang(id) {
  try {
    localStorage.setItem(LANG_KEY, id);
  } catch {
    /* the choice simply will not persist */
  }
}

/**
 * Make a language current.
 *
 * `<html lang>` is set because it is what a screen reader reads the page with —
 * a Spanish page announced by an English voice is unusable, and that is a
 * one-attribute fix. `dir` is set for the same reason, and is ready for a
 * right-to-left language without further work.
 */
export function setLanguage(pref) {
  const id = LANG_IDS.includes(pref) ? pref : resolveLang(pref);
  current = id;
  active = DICTS[id] || null;
  const info = langInfo(id);
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.lang = id;
    root.dir = info.dir;
    root.dataset.lang = id;
  }
  return id;
}

// The English original of everything translated in place, keyed by element.
// Kept off the elements themselves so that cloning or serialising a node cannot
// carry a stale English copy with it.
const originals = new WeakMap();

function snapshot(elm) {
  let rec = originals.get(elm);
  if (rec) return rec;
  rec = { text: elm.textContent, attrs: {} };
  const list = (elm.getAttribute('data-i18n-attr') || '').split(/[\s,]+/).filter(Boolean);
  for (const a of list) rec.attrs[a] = elm.getAttribute(a);
  originals.set(elm, rec);
  return rec;
}

/**
 * Translate the static markup under `root`.
 *
 * Only elements the markup opts in are touched, because the alternative —
 * walking every text node — would also rewrite chord names, note letters and
 * the numbers on the tuner, none of which are language.
 */
export function translateDom(root = document) {
  const nodes = root.querySelectorAll('[data-i18n], [data-i18n-attr]');
  for (const elm of nodes) {
    const rec = snapshot(elm);
    if (elm.hasAttribute('data-i18n') && rec.text != null) {
      const key = elm.getAttribute('data-i18n') || rec.text.replace(/\s+/g, ' ').trim();
      elm.textContent = t(key);
    }
    for (const [attr, value] of Object.entries(rec.attrs)) {
      if (value != null) elm.setAttribute(attr, t(value));
    }
  }
  return nodes.length;
}
