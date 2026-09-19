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
 * The app's own dropdowns, in place of the platform's.
 *
 * These were native <select>s, chosen deliberately: the platform picker cannot
 * get stuck open, and it is keyboard- and screen-reader-accessible for free.
 * On Android that turned out not to hold. The list a <select> opens is a
 * framework dialog built from the activity's theme, and it arrived unreadable
 * twice — first as dark text on a dark panel, then, after that was fixed, as a
 * white sheet with no legible rows at all. None of it is reproducible or
 * measurable from a browser, which makes every attempt at a fix a guess
 * verified only on someone's phone.
 *
 * So the list is drawn by the app now, in the same overlay the language picker
 * and About already use: themed, translated, inset-aware, and measurable here.
 *
 * The <select> elements stay exactly where they are. Each is hidden and given
 * a button that stands in for it, and everything that reads `select.value`,
 * assigns to it, refills its options or listens for `change` goes on working
 * untouched — which is what keeps this a layer rather than a rewrite.
 */

const OPEN = {
  select: null,      // the <select> the open list belongs to
  restore: null,     // what to focus when it closes
};

/** The proxy button standing in for a given select. */
const proxies = new WeakMap();

/* Named for this module: the single-file build concatenates every module into
   one scope, so a second top-level `el` would be a syntax error there. */
function mkEl(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
}

/** What the closed control should read: the selected option, or nothing. */
function currentLabel(select) {
  const option = select.options[select.selectedIndex];
  return option ? option.textContent : '';
}

/**
 * Put every proxy button back in step with the select behind it.
 *
 * Assigning to `select.value` changes a property rather than an attribute, so
 * there is nothing to observe; the app calls this from its render instead,
 * which is the one moment everything else is already up to date.
 */
export function syncMenus(root = document) {
  for (const select of root.querySelectorAll('select[data-menu]')) {
    const proxy = proxies.get(select);
    if (!proxy) continue;
    proxy.querySelector('.menu-value').textContent = currentLabel(select);
    proxy.disabled = select.disabled;
  }
}

function closeMenu() {
  const overlay = document.getElementById('menuOverlay');
  if (overlay) overlay.hidden = true;
  const back = OPEN.restore;
  OPEN.select = null;
  OPEN.restore = null;
  if (back && back.isConnected) back.focus();
}

/** Whether a list is open — the app's Escape handling asks before acting. */
export function menuIsOpen() {
  return !!OPEN.select;
}

function choose(select, value) {
  closeMenu();
  if (select.value === value) return;
  select.value = value;
  // The same event the native control fires, so every existing onchange
  // handler is reached by exactly the path it was written for.
  select.dispatchEvent(new Event('change', { bubbles: true }));
}

function moveFocus(list, delta) {
  const options = [...list.querySelectorAll('[role="option"]')];
  if (!options.length) return;
  const here = options.indexOf(document.activeElement);
  const next = here < 0
    ? 0
    : Math.min(options.length - 1, Math.max(0, here + delta));
  options[next].focus();
}

function openMenu(select) {
  const overlay = document.getElementById('menuOverlay');
  const list = document.getElementById('menuList');
  if (!overlay || !list || select.disabled) return;

  document.getElementById('menuTitle').textContent =
    select.getAttribute('aria-label') || '';
  list.replaceChildren();

  let selected = null;
  for (const option of select.options) {
    const row = mkEl('button', 'menu-option', option.textContent);
    row.type = 'button';
    row.setAttribute('role', 'option');
    const on = option.value === select.value;
    row.setAttribute('aria-selected', String(on));
    if (on) { row.classList.add('active'); selected = row; }
    row.onclick = () => choose(select, option.value);
    list.appendChild(row);
  }

  OPEN.select = select;
  OPEN.restore = proxies.get(select) || select;
  overlay.hidden = false;
  // Open on the current choice, so the list starts where the eye already is.
  (selected || list.firstElementChild || document.getElementById('menuCloseBtn')).focus();
  if (selected) selected.scrollIntoView({ block: 'nearest' });
}

/**
 * Give every <select> under `root` a button that opens the app's own list.
 *
 * Safe to call more than once: a select that already has one is skipped, so a
 * re-render or a language change cannot leave two buttons behind.
 */
export function enhanceSelects(root = document) {
  for (const select of root.querySelectorAll('select')) {
    if (proxies.has(select)) continue;

    const proxy = mkEl('button', select.className);
    proxy.type = 'button';
    proxy.classList.add('menu-proxy');
    proxy.setAttribute('aria-haspopup', 'listbox');
    const label = select.getAttribute('aria-label');
    if (label) proxy.setAttribute('aria-label', label);
    proxy.append(mkEl('span', 'menu-value', currentLabel(select)), mkEl('i', 'menu-caret'));
    proxy.onclick = () => openMenu(select);

    select.dataset.menu = 'proxied';
    // Hidden rather than removed: it is still the value, the options and the
    // event target that the rest of the app talks to.
    select.hidden = true;
    select.setAttribute('aria-hidden', 'true');
    select.tabIndex = -1;
    select.after(proxy);
    proxies.set(select, proxy);
  }
  syncMenus(root);
}

/** Wire the one overlay the lists share. Called once, at boot. */
export function initMenus() {
  const overlay = document.getElementById('menuOverlay');
  const list = document.getElementById('menuList');
  if (!overlay || !list) return;

  overlay.onclick = (e) => { if (e.target === overlay) closeMenu(); };
  const close = document.getElementById('menuCloseBtn');
  if (close) close.onclick = closeMenu;

  list.addEventListener('keydown', (e) => {
    const keys = {
      ArrowDown: 1, ArrowUp: -1, PageDown: 5, PageUp: -5,
      Home: -Infinity, End: Infinity,
    };
    if (e.key in keys) { e.preventDefault(); moveFocus(list, keys[e.key]); }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && OPEN.select) { e.preventDefault(); closeMenu(); }
  });
}
