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

// Saved projects, kept in localStorage.
//
// The app already knows how to turn a song into JSON and back — that is what
// export and import do. This reuses exactly that shape rather than inventing a
// second one, so a saved project and an exported file are the same thing and
// neither can drift from the other.
//
// Storage is deliberately dumb: an index of metadata under one key, and each
// song under its own. That keeps listing cheap when there are many songs, and
// means one corrupt project cannot take the rest of the library with it.

const INDEX_KEY = 'circlesong.projects';
const SONG_PREFIX = 'circlesong.song.';

/** localStorage can be absent or blocked; the app must still run. */
function store() {
  try {
    const s = window.localStorage;
    const probe = '__circlesong_probe__';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    return null;
  }
}

export function storageAvailable() {
  return store() !== null;
}

function readIndex(s) {
  try {
    const raw = s.getItem(INDEX_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function writeIndex(s, list) {
  s.setItem(INDEX_KEY, JSON.stringify(list));
}

/** Saved projects, most recently saved first. */
export function listProjects() {
  const s = store();
  if (!s) return [];
  return readIndex(s).slice().sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
}

/**
 * Save a song, replacing any project with the same id.
 *
 * @param {object} data  the same JSON shape `exportSong` produces
 * @param {string|null} id  an existing project to overwrite, or null for a new one
 * @returns {{id:string}|{error:string}}
 */
export function saveProject(data, id = null) {
  const s = store();
  if (!s) return { error: 'This browser will not let the app store anything locally.' };

  const projectId = id || `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const entry = {
    id: projectId,
    title: data.title || 'Untitled Song',
    bpm: data.bpm,
    key: data.keyName || '',
    bars: data.barTotal || 0,
    sections: (data.sections || []).length,
    savedAt: Date.now(),
  };

  try {
    s.setItem(SONG_PREFIX + projectId, JSON.stringify(data));
  } catch {
    // Quota is the realistic failure here, and it needs to say so plainly
    // rather than looking like the save silently worked.
    return { error: 'No room left in this browser\'s storage. Delete a project and try again.' };
  }

  const list = readIndex(s).filter((p) => p.id !== projectId);
  list.push(entry);
  writeIndex(s, list);
  return { id: projectId, entry };
}

/** The full song JSON for a project, or null. */
export function loadProject(id) {
  const s = store();
  if (!s) return null;
  try {
    const raw = s.getItem(SONG_PREFIX + id);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function deleteProject(id) {
  const s = store();
  if (!s) return;
  s.removeItem(SONG_PREFIX + id);
  writeIndex(s, readIndex(s).filter((p) => p.id !== id));
}

export function renameProject(id, title) {
  const s = store();
  if (!s) return;
  const list = readIndex(s);
  const entry = list.find((p) => p.id === id);
  if (!entry) return;
  entry.title = title;
  writeIndex(s, list);
  const song = loadProject(id);
  if (song) {
    song.title = title;
    try {
      s.setItem(SONG_PREFIX + id, JSON.stringify(song));
    } catch {
      /* the index rename still stands */
    }
  }
}

/** Rough footprint of the library, for showing how full storage is. */
export function storageUsed() {
  const s = store();
  if (!s) return 0;
  let bytes = 0;
  for (const p of readIndex(s)) {
    const raw = s.getItem(SONG_PREFIX + p.id);
    if (raw) bytes += raw.length;
  }
  return bytes;
}
