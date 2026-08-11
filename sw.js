/**
 * Service worker — makes CircleSong installable and fully usable offline.
 *
 * Everything the app needs is same-origin and known up front, so the whole
 * shell is precached on install. There is no API and no user data to sync: once
 * cached, the app never needs the network again.
 *
 * CACHE is stamped by `npm run build` with a hash of everything in SHELL, so
 * shipping a change always invalidates installed copies. It used to be a hand
 * written number, and the failure mode was silent and expensive: forget to bump
 * it and every returning user keeps running the previous build while the source
 * says otherwise — which looks exactly like the new feature not working.
 */

const CACHE = 'circlesong-f7a9fd1b';

const SHELL = [
  './',
  './index.html',
  './styles.css',
  './assets/fonts.css',
  './assets/logo.svg',
  './manifest.webmanifest',
  './src/app.js',
  './src/theory.js',
  './src/fretboard.js',
  './src/patterns.js',
  './src/drum-patterns.js',
  './src/harmony.js',
  './src/projects.js',
  './src/content.js',
  './src/sequencer.js',
  './src/audio/engine.js',
  './src/audio/guitar-processor.js',
  './src/audio/impulse.js',
  './src/audio/drums.js',
  './src/audio/recorder.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      // Individually, so one bad entry cannot fail the whole installation.
      .then((cache) => Promise.allSettled(SHELL.map((url) => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations fall back to the cached shell, so launching the installed app
  // offline opens the app rather than the browser's error page.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          // Cache successful same-origin responses as they are first requested.
          if (response.ok && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
    )
  );
});
