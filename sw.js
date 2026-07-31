const CACHE = 'college-pilot-v14';
const ASSETS = [
  './',
  './index.html',
  './school.html',
  './styles.css',
  './app.js',
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
  self.skipWaiting();
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
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((m) => m || caches.match('./index.html')))
  );
});
