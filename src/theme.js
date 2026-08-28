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

// One 1x1 canvas, reused. Painting a colour into it and reading the pixel back
// is how a colour in any notation becomes numbers: Chromium reports authored
// values in their own space, so `oklch(0.62 0.19 265)` comes back as that
// string and cannot be compared with anything.
let probe = null;
function toRgb(css, over = '#000') {
  if (!probe) {
    const c = document.createElement('canvas');
    c.width = c.height = 1;
    probe = c.getContext('2d', { willReadFrequently: true });
  }
  probe.clearRect(0, 0, 1, 1);
  probe.fillStyle = over;
  probe.fillRect(0, 0, 1, 1);
  probe.fillStyle = css;
  probe.fillRect(0, 0, 1, 1);
  const d = probe.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2]];
}

/** WCAG relative luminance. */
function luminance(rgb) {
  const f = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
}

/**
 * WCAG contrast ratio between `ink` drawn on `paper`.
 *
 * `ink` is composited over `paper` first, because several of these inks are
 * translucent and a translucent colour is not the colour it says it is — the
 * ratio that matters is against what ends up on the screen.
 */
export function contrastRatio(ink, paper) {
  const bg = toRgb(paper);
  const fg = toRgb(ink, `rgb(${bg[0]},${bg[1]},${bg[2]})`);
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Pick whichever ink is readable on `background`.
 *
 * The fretboard dots and the wheel wedges are coloured by *hue* — the root is
 * green, the third amber, and so on — and hue is not lightness. In OKLCH two
 * colours at the same L look equally light and have wildly different relative
 * luminance: a yellow at L 0.7 is four times as bright as a blue at L 0.7. One
 * fixed ink over all of them therefore cannot be legible over all of them, and
 * measuring is the only way to know which one is.
 */
export function readableInk(background, inkA, inkB) {
  const a = themeColor(inkA);
  const b = themeColor(inkB);
  return contrastRatio(a, background) >= contrastRatio(b, background) ? a : b;
}
