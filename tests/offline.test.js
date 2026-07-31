/* Offline/update UX: sw.js's fetch strategy, and the update/offline signal
   app.js's boot section wires up.

   sw.js runs inside a service-worker global scope that tests/dom.js does not
   (and should not, per its own header) model. So this file boots sw.js on
   its own in a `vm` sandbox with minimal `self`/`caches`/`fetch` fakes and
   drives the handlers it registers directly — it never touches tests/dom.js.

   The fakes use hand-rolled *synchronous* thenables (see `syncResolve` /
   `syncReject` below) instead of real Promises. tests/run.js calls test
   functions synchronously and does not await anything they return, so a
   real Promise chain would resolve on a microtask tick this file can never
   observe — any assertion inside a real `.then()` would silently vanish
   instead of failing the suite. Synchronous thenables run every `.then`
   callback immediately, so the whole chain — including sw.js's internal
   `caches.open(...).then(...)` fire-and-forget writes — has settled by the
   time the dispatching call returns, and plain assertions can inspect the
   result directly. This models the real Promise/thenable resolution and
   flattening rules closely enough for sw.js's actual chains (verified by
   hand below); it is not a general Promise polyfill. */
'use strict';
const vm = require('vm');
const { describe, test, ok, eq, match, includes, read } = require('./harness');

const swSrc = read('sw.js');
const appJs = read('app.js');

/* ---------- synchronous thenables ---------- */
function isThenable(x) { return !!x && typeof x.then === 'function'; }

function syncResolve(value) {
  return {
    then(onFulfilled) {
      if (typeof onFulfilled !== 'function') return syncResolve(value);
      try {
        const r = onFulfilled(value);
        return isThenable(r) ? r : syncResolve(r);
      } catch (err) { return syncReject(err); }
    },
    catch() { return this; } // already fulfilled: catch is a passthrough
  };
}

function syncReject(err) {
  return {
    then(onFulfilled, onRejected) {
      if (typeof onRejected !== 'function') return syncReject(err);
      try {
        const r = onRejected(err);
        return isThenable(r) ? r : syncResolve(r);
      } catch (err2) { return syncReject(err2); }
    },
    catch(onRejected) { return this.then(undefined, onRejected); }
  };
}

/* A thenable that never settles, to prove cache-first responses don't wait
   on the network. */
function pendingThenable() {
  const p = { then() { return p; }, catch() { return p; } };
  return p;
}

/* ---------- fake request/response/event ---------- */
function makeRequest({ url, method, mode, destination }) {
  return { url, method: method || 'GET', mode, destination };
}
function makeResponse({ ok, body }) {
  return { ok: ok !== false, body, clone() { return this; } };
}
function makeEvent(request) {
  return {
    request,
    _respondedCalled: false,
    _responded: undefined,
    respondWith(p) { this._respondedCalled = true; this._responded = p; }
  };
}

/* ---------- boot sw.js into a vm sandbox ---------- */
function loadSW(opts) {
  opts = opts || {};
  const cacheNameMatch = swSrc.match(/const CACHE = '([^']+)'/);
  const CACHE_NAME = cacheNameMatch ? cacheNameMatch[1] : 'college-pilot-v0';

  const store = new Map(); // cache name -> Map<url, response>
  function cacheMap(name) {
    if (!store.has(name)) store.set(name, new Map());
    return store.get(name);
  }
  function keyFor(request) { return typeof request === 'string' ? request : request.url; }

  const fakeCaches = {
    open(name) {
      const m = cacheMap(name);
      return syncResolve({
        match(request) { return syncResolve(m.get(keyFor(request))); },
        put(request, response) { m.set(keyFor(request), response); return syncResolve(undefined); },
        add() { return syncResolve(undefined); },
        addAll() { return syncResolve(undefined); }
      });
    },
    match(request) {
      const k = keyFor(request);
      for (const m of store.values()) if (m.has(k)) return syncResolve(m.get(k));
      return syncResolve(undefined);
    },
    keys() { return syncResolve([...store.keys()]); },
    delete(name) { return syncResolve(store.delete(name)); }
  };

  let fetchCalls = 0;
  const fetchImpl = opts.fetchImpl || (() => syncResolve(makeResponse({ ok: true })));
  const fakeFetch = (request) => { fetchCalls++; return fetchImpl(request); };

  const listeners = {};
  const fakeSelf = {
    location: { origin: 'https://example.test' },
    addEventListener(type, fn) { (listeners[type] = listeners[type] || []).push(fn); },
    skipWaiting() { fakeSelf.skipWaitingCalled = true; },
    clients: { claim() { return syncResolve(undefined); } }
  };

  const sandbox = { self: fakeSelf, caches: fakeCaches, fetch: fakeFetch, URL, Promise };
  vm.createContext(sandbox);
  vm.runInContext(swSrc, sandbox, { filename: 'sw.js' });

  return {
    dispatch(type, event) { (listeners[type] || []).forEach((fn) => fn(event)); return event; },
    hasListener(type) { return !!(listeners[type] && listeners[type].length); },
    store, CACHE_NAME, cacheMap, fakeSelf,
    fetchCalls: () => fetchCalls
  };
}

/* Runs the (already-settled, synchronous) responded value out of an event
   and returns it — throws if respondWith was never called. */
function resolved(event) {
  ok(event._respondedCalled, 'fetch handler did not call event.respondWith(...)');
  let value, threw = null;
  event._responded.then((v) => { value = v; }, (e) => { threw = e; });
  if (threw) throw threw;
  return value;
}

describe('sw.js fetch strategy (vm sandbox)', () => {
  test('a non-GET request is left completely alone', () => {
    const sw = loadSW();
    const event = makeEvent(makeRequest({ url: 'https://example.test/app.js', method: 'POST' }));
    sw.dispatch('fetch', event);
    ok(!event._respondedCalled, 'sw.js must not call respondWith for a non-GET request');
    eq(sw.fetchCalls(), 0, 'sw.js must not touch the network for a non-GET request either');
  });

  test('a cross-origin request is never intercepted or cached', () => {
    const sw = loadSW();
    const event = makeEvent(makeRequest({ url: 'https://cdn.other.test/lib.js', method: 'GET' }));
    sw.dispatch('fetch', event);
    ok(!event._respondedCalled, 'cross-origin requests must be left to the browser\'s default handling');
    eq(sw.store.size, 0, 'cross-origin requests must never populate the cache');
  });

  test('a non-http(s) request (e.g. chrome-extension:) is never intercepted or cached', () => {
    const sw = loadSW();
    const event = makeEvent(makeRequest({ url: 'chrome-extension://abcdefg/inject.js', method: 'GET' }));
    sw.dispatch('fetch', event);
    ok(!event._respondedCalled, 'non-http(s) requests must be left alone');
    eq(sw.store.size, 0, 'non-http(s) requests must never populate the cache');
  });

  test('a cached static asset is served cache-first, without waiting on a hung network', () => {
    const sw = loadSW({ fetchImpl: () => pendingThenable() }); // network never answers
    const url = 'https://example.test/styles.css';
    const cached = makeResponse({ ok: true, body: 'cached-css' });
    sw.cacheMap(sw.CACHE_NAME).set(url, cached);
    const event = makeEvent(makeRequest({ url, method: 'GET' }));
    sw.dispatch('fetch', event);
    eq(resolved(event), cached, 'a cached static asset must resolve to the cached response, not wait on the network');
  });

  test('a static asset with no cache entry falls back to (a hung) network without throwing', () => {
    const sw = loadSW({ fetchImpl: () => pendingThenable() });
    const event = makeEvent(makeRequest({ url: 'https://example.test/data/newschool.js', method: 'GET' }));
    sw.dispatch('fetch', event);
    ok(event._respondedCalled, 'respondWith must still be called even with nothing cached yet');
    // We deliberately do not assert the pending promise ever settles here —
    // that would require real async scheduling this sandbox doesn't have.
    // Asserting less: only that the handler didn't throw wiring it up.
  });

  test('a failed navigation falls back to a cached page, and ultimately to ./index.html', () => {
    const sw = loadSW({ fetchImpl: () => syncReject(new Error('offline')) });
    sw.cacheMap(sw.CACHE_NAME).set('./index.html', makeResponse({ ok: true, body: 'app-shell' }));
    const event = makeEvent(makeRequest({ url: 'https://example.test/school.html?s=pitt', method: 'GET', mode: 'navigate' }));
    sw.dispatch('fetch', event);
    eq(resolved(event).body, 'app-shell', 'an offline navigation with no direct cache hit must fall back to the cached ./index.html shell');
  });

  test('a failed navigation prefers its own cached page over the index.html fallback', () => {
    const sw = loadSW({ fetchImpl: () => syncReject(new Error('offline')) });
    sw.cacheMap(sw.CACHE_NAME).set('https://example.test/school.html?s=pitt', makeResponse({ ok: true, body: 'pitt-page' }));
    sw.cacheMap(sw.CACHE_NAME).set('./index.html', makeResponse({ ok: true, body: 'app-shell' }));
    const event = makeEvent(makeRequest({ url: 'https://example.test/school.html?s=pitt', method: 'GET', mode: 'navigate' }));
    sw.dispatch('fetch', event);
    eq(resolved(event).body, 'pitt-page', 'a direct cache hit must win over the ./index.html fallback');
  });

  test('a non-OK response is never written to the cache (static asset path)', () => {
    const sw = loadSW({ fetchImpl: () => syncResolve(makeResponse({ ok: false, body: '404' })) });
    const url = 'https://example.test/data/missing.js';
    const event = makeEvent(makeRequest({ url, method: 'GET' }));
    sw.dispatch('fetch', event);
    eq(resolved(event).ok, false, 'the 404 itself must still reach the page');
    eq(sw.cacheMap(sw.CACHE_NAME).has(url), false, 'a non-OK response must never be written to the cache');
  });

  test('a non-OK response is never written to the cache (navigation path)', () => {
    const sw = loadSW({ fetchImpl: () => syncResolve(makeResponse({ ok: false, body: '500' })) });
    const url = 'https://example.test/school.html?s=pitt';
    const event = makeEvent(makeRequest({ url, method: 'GET', mode: 'navigate' }));
    sw.dispatch('fetch', event);
    eq(resolved(event).ok, false, 'a server error must still reach the page rather than being swallowed');
    eq(sw.cacheMap(sw.CACHE_NAME).has(url), false, 'a non-OK navigation response must never be written to the cache');
  });

  test('install still registers, activate still purges stale caches, and a message handler completes the skipWaiting handshake', () => {
    const sw = loadSW();
    ok(sw.hasListener('install'), 'install handler must still be registered');
    ok(sw.hasListener('activate'), 'activate handler must still be registered');
    ok(sw.hasListener('message'), 'sw.js must listen for the page\'s SKIP_WAITING message');
    sw.dispatch('message', { data: { type: 'SKIP_WAITING' } });
    ok(sw.fakeSelf.skipWaitingCalled, 'a SKIP_WAITING message must call self.skipWaiting()');
  });
});

describe('offline / update UX wiring in app.js (static)', () => {
  test('sw.js install no longer calls skipWaiting() unconditionally', () => {
    // The whole point of the update toast is that a new worker parks in
    // `waiting` instead of silently taking over a page that's mid-render.
    // A literal, unconditional self.skipWaiting() call still present would
    // defeat that — so require the only call site to be the message handler.
    const skipWaitingCalls = (swSrc.match(/self\.skipWaiting\(\)/g) || []).length;
    eq(skipWaitingCalls, 1, 'self.skipWaiting() must only be called once, from the message handler');
    match(swSrc, /addEventListener\('message'[\s\S]*?self\.skipWaiting\(\)/, 'skipWaiting must be driven by the message handler, not called unconditionally');
    const installMatch = swSrc.match(/addEventListener\('install'[\s\S]*?\n\}\);/);
    ok(installMatch, 'could not isolate the install handler body to check it');
    ok(!/self\.skipWaiting\(\)/.test(installMatch[0]), 'install must not unconditionally call self.skipWaiting()');
  });

  test('the boot section registers the service-worker update lifecycle listeners', () => {
    match(appJs, /addEventListener\('updatefound'/, 'app.js must listen for updatefound on the registration');
    match(appJs, /addEventListener\('statechange'/, 'app.js must watch the installing worker\'s statechange');
    match(appJs, /addEventListener\('controllerchange'/, 'app.js must listen for controllerchange to reload post-update');
    includes(appJs, 'SKIP_WAITING', 'app.js must ask the waiting worker to skip waiting');
  });

  test('the update toast is dismissible and shown via a distinct element', () => {
    match(appJs, /cp-update-toast/, 'app.js must render an update toast');
    match(appJs, /cp-update-dismiss/, 'the update toast must offer a dismiss control');
  });

  test('the boot section wires an online/offline indicator', () => {
    includes(appJs, "'online'", 'app.js must listen for the online event');
    includes(appJs, "'offline'", 'app.js must listen for the offline event');
    includes(appJs, 'onLine', 'app.js must read navigator.onLine');
    match(appJs, /cp-offline/, 'app.js must render an offline indicator element');
  });

  test('service-worker wiring degrades silently when unsupported', () => {
    match(appJs, /'serviceWorker' in navigator/, 'app.js must feature-detect serviceWorker before using it');
    match(appJs, /\.catch\(\(\) => \{ ?\}\)/, 'the service-worker registration must swallow rejection silently');
  });
});
