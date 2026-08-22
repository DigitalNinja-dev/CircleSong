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
 * Themes.
 *
 * A theme is a set of custom properties in styles.css and nothing else — no
 * second stylesheet, no classes sprinkled through the markup. This module only
 * decides *which* set is active, which is a smaller job than it sounds:
 *
 *  - `system` is not a theme, it is a deferral. It resolves to light or dark
 *    here and re-resolves when the OS preference changes under a running app,
 *    so the CSS never needs a duplicated block inside a media query.
 *  - the choice is remembered, and read back before first paint so the app does
 *    not flash the wrong theme on launch.
 *  - `<meta name="theme-color">` follows the theme, which is what colours the
 *    Android status bar and the task-switcher card. Without it an installed
 *    light-theme app keeps a black system bar.
 */

const KEY = 'circlesong.theme';

export const THEMES = [
  {
    id: 'system',
    label: 'System',
    note: 'Follows your device, and changes with it.',
  },
  { id: 'dark', label: 'Dark', note: 'The default. Neon on black.' },
  { id: 'light', label: 'Light', note: 'Ink on paper, with a darker accent so it stays legible.' },
  {
    id: 'contrast',
    label: 'High contrast',
    note: 'Pure black and white, visible borders, no faint washes.',
  },
  { id: 'sepia', label: 'Sepia', note: 'Warm and low-glare, for long sessions.' },
];

export const THEME_IDS = THEMES.map((t) => t.id);

/** The colour the OS chrome should take, per resolved theme. */
const THEME_COLOR = {
  dark: '#0d0d0d',
  light: '#f7f7f8',
  contrast: '#000000',
  sepia: '#efe6d6',
};

const prefersLight = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: light)').matches;

/** What `system` currently means. */
export function resolveTheme(pref) {
  if (pref === 'system' || !THEME_IDS.includes(pref)) return prefersLight() ? 'light' : 'dark';
  return pref;
}

export function storedTheme() {
  try {
    const v = localStorage.getItem(KEY);
    return THEME_IDS.includes(v) ? v : 'system';
  } catch {
    // Private mode, or storage disabled. Not a reason to fail.
    return 'system';
  }
}

/**
 * Put a theme on the document.
 *
 * `data-theme` carries the resolved theme, because that is what the stylesheet
 * selects on; `data-theme-pref` carries what the user actually chose, so the
 * picker can show "System" as selected rather than whichever theme it became.
 */
export function applyTheme(pref) {
  const resolved = resolveTheme(pref);
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themePref = pref;
  // Tell the browser which colour scheme the page is in, so that form controls,
  // scrollbars and the like are drawn to match rather than fighting it.
  root.style.colorScheme = resolved === 'light' || resolved === 'sepia' ? 'light' : 'dark';

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLOR[resolved] || THEME_COLOR.dark);
  return resolved;
}

export function saveTheme(pref) {
  try {
    localStorage.setItem(KEY, pref);
  } catch {
    /* nothing to do — the choice just will not persist */
  }
}

/**
 * Start following the OS preference. Only has an effect while the preference is
 * `system`; the callback lets the UI re-render when the resolved theme flips.
 */
export function watchSystemTheme(getPref, onChange) {
  if (typeof matchMedia !== 'function') return () => {};
  const mq = matchMedia('(prefers-color-scheme: light)');
  const handler = () => {
    if (getPref() !== 'system') return;
    const resolved = applyTheme('system');
    if (onChange) onChange(resolved);
  };
  // Safari below 14 has only the deprecated form.
  if (mq.addEventListener) mq.addEventListener('change', handler);
  else if (mq.addListener) mq.addListener(handler);
  return () => {
    if (mq.removeEventListener) mq.removeEventListener('change', handler);
    else if (mq.removeListener) mq.removeListener(handler);
  };
}

/**
 * Read a resolved colour token off the document.
 *
 * The wheel and the fretboard are drawn from JavaScript, so they cannot use
 * `var(--token)` directly — they need the computed value at the moment they are
 * drawn, and again whenever the theme changes.
 */
export function themeColor(token, fallback = '#888') {
  const v = getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim();
  return v || fallback;
}
