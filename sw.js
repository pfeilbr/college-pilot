const CACHE = 'college-pilot-v14';
const ASSETS = [
  './',
  './index.html',
  './school.html',
  './styles.css',
  './app.js',
  './aid.js',
  './data/delaware.js',
  './data/northeastern.js',
  './data/fordham.js',
  './data/pennstate.js',
  './data/pitt.js',
  './data/rutgers.js',
  './data/ohiostate.js',
  './data/michiganstate.js',
  './data/indiana.js',
  './data/southcarolina.js',
  './data/umass.js',
  './data/tufts.js',
  './data/bu.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      Promise.allSettled(ASSETS.map((a) => c.add(a)))
    )
  );
  // Deliberately not forcing activation unconditionally here. A fresh
  // install with no prior controller activates on its own regardless
  // (there's nothing to "wait" behind), so this only changes behavior when a
  // page is already open under an older worker: the new one now parks in
  // `waiting` instead of silently taking over mid-session, which could
  // otherwise serve a page built from the old app.js against a cache the new
  // worker already refreshed. app.js's boot code shows a toast and only
  // triggers the skip-waiting handshake below once the visitor agrees to
  // reload.
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  let url;
  try { url = new URL(e.request.url); } catch (err) { return; }
  // Never touch cross-origin or non-http(s) requests (opaque responses,
  // chrome-extension:, etc.) — caching them can poison the cache with
  // responses we can't validate or that error on .clone()/.put().
  if (!/^https?:$/.test(url.protocol) || url.origin !== self.location.origin) return;

  const isNavigation = e.request.mode === 'navigate' || e.request.destination === 'document';

  if (isNavigation) {
    // Navigations stay network-first so a genuinely new deploy is picked up
    // as soon as it's reachable; only fall back to cache (then the app
    // shell) when the network is unavailable.
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => caches.match(e.request, { ignoreSearch: true }).then((m) => m || caches.match('./index.html')))
    );
    return;
  }

  // Static assets (CSS/JS/data/icons/manifest): cache-first so a repeat
  // visit is instant, with a background revalidate so the cache stays
  // fresh. Only OK responses are written back.
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
