/* Static integrity: everything parses, every referenced file exists, every in-page
   anchor resolves, and the PWA manifest/service-worker wiring holds together. */
'use strict';
const { describe, test, ok, eq, match, includes, read, exists, dataFiles, parses, scriptSrcs, inlineScripts, loadSchools } = require('./harness');

const indexHtml = read('index.html');
const schoolHtml = read('school.html');
const appJs = read('app.js');
const swJs = read('sw.js');
const css = read('styles.css');
const { SCHOOLS } = loadSchools();

describe('static integrity', () => {
  test('app.js and sw.js parse', () => {
    parses(appJs, 'app.js');
    parses(swJs, 'sw.js');
  });

  test('every data/*.js parses', () => {
    for (const f of dataFiles()) parses(read('data/' + f), 'data/' + f);
  });

  test('inline scripts in both HTML pages parse', () => {
    for (const [name, html] of [['index.html', indexHtml], ['school.html', schoolHtml]]) {
      inlineScripts(html).forEach((src, i) => parses(src, `${name} inline script #${i + 1}`));
    }
  });

  test('every file referenced by both pages exists on disk', () => {
    for (const [name, html] of [['index.html', indexHtml], ['school.html', schoolHtml]]) {
      const refs = [
        ...scriptSrcs(html),
        ...[...html.matchAll(/<link[^>]+href="([^"]+)"/g)].map(m => m[1]),
        ...[...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1])
      ].filter(r => !/^https?:|^mailto:|^tel:|^#/.test(r));
      for (const r of refs) ok(exists(r), `${name} references missing file ${r}`);
    }
  });

  test('every file in the sw.js ASSETS list exists on disk', () => {
    const assets = [...swJs.matchAll(/'\.\/([^']*)'/g)].map(m => m[1]).filter(Boolean);
    for (const a of assets) ok(exists(a), `sw.js caches missing file ${a}`);
  });

  test('index.html nav pills point at sections that exist', () => {
    const anchors = [...indexHtml.matchAll(/<nav class="pills"[\s\S]*?<\/nav>/g)]
      .flatMap(m => [...m[0].matchAll(/href="#([\w-]+)"/g)].map(x => x[1]));
    ok(anchors.length, 'no nav pills found in index.html');
    for (const a of anchors) {
      ok(new RegExp(`id="${a}"`).test(indexHtml), `index.html nav pill #${a} has no matching section`);
    }
  });

  test('index.html in-page links resolve to real ids', () => {
    const hrefs = [...indexHtml.matchAll(/href="#([\w-]+)"/g)].map(m => m[1]);
    for (const a of new Set(hrefs)) {
      ok(new RegExp(`id="${a}"`).test(indexHtml), `index.html links to missing anchor #${a}`);
    }
  });

  test('school.html is the empty shell app.js renders into', () => {
    for (const id of ['pills', 'heroWrap', 'main', 'barTitle', 'menuBtn', 'tip']) {
      ok(new RegExp(`id="${id}"`).test(schoolHtml), `school.html is missing #${id}, which app.js requires`);
    }
  });

  test('index.html has the hooks app.js renders into', () => {
    for (const id of ['schoolGrid', 'cmpWrap', 'boardRows', 'boardUnrated', 'boardClear', 'menuBtn', 'tip']) {
      ok(new RegExp(`id="${id}"`).test(indexHtml), `index.html is missing #${id}, which app.js requires`);
    }
  });

  test('element ids are unique within each page', () => {
    for (const [name, html] of [['index.html', indexHtml], ['school.html', schoolHtml]]) {
      const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
      const dupes = ids.filter((v, i) => ids.indexOf(v) !== i);
      eq(dupes.length, 0, `${name} has duplicate ids: ${[...new Set(dupes)].join(', ')}`);
    }
  });

  test('app.js does not build ids that collide with page markup', () => {
    const built = [...appJs.matchAll(/id="([a-zA-Z][\w-]*)"/g)].map(m => m[1]);
    const inPage = new Set([...indexHtml.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
    for (const id of new Set(built)) {
      ok(!inPage.has(id), `app.js injects #${id}, which index.html already defines`);
    }
  });

  test('the manifest is valid JSON and points at real icons', () => {
    const manifest = JSON.parse(read('manifest.webmanifest'));
    ok(manifest.name && manifest.short_name, 'manifest needs name and short_name');
    ok(Array.isArray(manifest.icons) && manifest.icons.length, 'manifest needs icons');
    for (const icon of manifest.icons) ok(exists(icon.src), `manifest icon missing: ${icon.src}`);
    ok(manifest.start_url, 'manifest needs a start_url');
  });

  test('both pages declare the PWA meta the manifest relies on', () => {
    for (const [name, html] of [['index.html', indexHtml], ['school.html', schoolHtml]]) {
      includes(html, 'rel="manifest"', `${name} is missing the manifest link`);
      includes(html, 'name="theme-color"', `${name} is missing theme-color`);
      includes(html, 'viewport-fit=cover', `${name} needs viewport-fit=cover for the iOS safe area`);
    }
  });

  test('styles.css defines the per-school accent variables app.js sets', () => {
    includes(css, '--sc', 'styles.css must use the --sc accent variable');
    includes(css, '--sc-dark', 'styles.css must use the --sc-dark accent variable');
  });

  test('styles.css has balanced braces', () => {
    const open = (css.match(/\{/g) || []).length, close = (css.match(/\}/g) || []).length;
    eq(close, open, 'unbalanced braces in styles.css');
  });

  test('every class app.js emits is defined in styles.css', () => {
    /* Catches renderer markup that silently loses its styling. */
    const emitted = new Set([...appJs.matchAll(/class="([^"$]+)"/g)]
      .flatMap(m => m[1].split(/\s+/))
      .filter(c => c && !c.includes('{') && !c.includes('$')));
    const missing = [...emitted].filter(c => !new RegExp(`\\.${c}\\b`).test(css));
    eq(missing.length, 0, `classes used in app.js but absent from styles.css: ${missing.join(', ')}`);
  });

  test('the ratings storage key and its migration are intact', () => {
    includes(appJs, "'college-pilot-ratings'", 'the localStorage key must stay college-pilot-ratings');
    includes(appJs, "'shortlist-ratings'", 'the one-time migration from the old key must stay');
  });

  test('the service worker is network-first with a cache fallback', () => {
    match(swJs, /addEventListener\('install'/, 'sw.js needs an install handler');
    match(swJs, /addEventListener\('activate'/, 'sw.js needs an activate handler');
    match(swJs, /addEventListener\('fetch'/, 'sw.js needs a fetch handler');
    match(swJs, /fetch\(e\.request\)[\s\S]*?\.catch\(/, 'sw.js fetch handler must fall back to the cache');
    includes(swJs, "e.request.method !== 'GET'", 'sw.js must not try to cache non-GET requests');
  });

  test('the service worker deletes stale caches on activate', () => {
    match(swJs, /caches\.keys\(\)[\s\S]*?caches\.delete/, 'activate must purge old cache versions');
  });

  test('data files never inject fetched or user-supplied strings', () => {
    for (const f of dataFiles()) {
      const src = read('data/' + f);
      ok(!/\bfetch\s*\(/.test(src), `data/${f} must not fetch at runtime — it is authored content`);
      ok(!/localStorage/.test(src), `data/${f} must not touch localStorage`);
    }
  });

  test('school guides are internally linkable by id', () => {
    for (const id of Object.keys(SCHOOLS)) {
      match(id, /^[a-z]+$/, `school id "${id}" must be lowercase letters only (it goes in ?s= URLs)`);
    }
  });
});
