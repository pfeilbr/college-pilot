/* Accessibility & keyboard-operability guards: skip links, drawer focus trap,
   keyboard-operable star ratings, live-region saves, and reduced-motion support. */
'use strict';
const { describe, test, ok, eq, match, includes, read } = require('./harness');

const indexHtml = read('index.html');
const schoolHtml = read('school.html');
const appJs = read('app.js');
const css = read('styles.css');

describe('a11y', () => {
  test('both pages have a skip link as the first focusable thing in body', () => {
    for (const [name, html] of [['index.html', indexHtml], ['school.html', schoolHtml]]) {
      const body = html.slice(html.indexOf('<body>'));
      const skipIdx = body.indexOf('class="skip-link"');
      ok(skipIdx > -1, `${name} is missing the skip link`);
      const firstA = body.indexOf('<a ');
      ok(firstA > -1 && firstA < skipIdx, `${name} skip link must be the first link in body`);
    }
  });

  test('the skip link targets a real in-page id', () => {
    const m = indexHtml.match(/<a href="#([\w-]+)" class="skip-link">/);
    ok(m, 'index.html skip link href not found');
    ok(new RegExp(`id="${m[1]}"`).test(indexHtml), `index.html skip link target #${m[1]} does not exist`);

    const m2 = schoolHtml.match(/<a href="#([\w-]+)" class="skip-link">/);
    ok(m2, 'school.html skip link href not found');
    ok(new RegExp(`id="${m2[1]}"`).test(schoolHtml), `school.html skip link target #${m2[1]} does not exist`);
  });

  test('the skip link class is styled in styles.css', () => {
    match(css, /\.skip-link\{/, 'styles.css must define .skip-link');
  });

  test('the drawer exposes dialog semantics', () => {
    match(appJs, /id="drawer"[^>]*role="dialog"/, 'drawer must have role="dialog"');
    match(appJs, /id="drawer"[^>]*aria-modal="true"/, 'drawer must have aria-modal="true"');
  });

  test('the drawer traps Tab focus and restores focus on close', () => {
    match(appJs, /drawer\.addEventListener\('keydown'/, 'drawer needs a keydown listener for Tab trapping');
    includes(appJs, "e.key !== 'Tab'", 'drawer keydown handler should react to Tab');
    includes(appJs, 'lastFocus', 'drawer must remember the element focused before it opened');
    match(appJs, /\(lastFocus \|\| menuBtn\)\.focus\(\)/, 'closing the drawer must restore focus to #menuBtn (or the prior focus)');
  });

  test('opening the drawer moves focus inside it', () => {
    match(appJs, /drawerFocusables\(\)/, 'openMenu should focus the first focusable element in the drawer');
  });

  test('star rating rows are keyboard-operable radiogroups', () => {
    match(appJs, /role="radiogroup" aria-label="\$\{cat\}"/, 'each stars row needs role="radiogroup" with an accessible name');
    match(appJs, /role="radio" aria-checked="/, 'each star button needs role="radio" and aria-checked');
    match(appJs, /tabindex="\$\{tab\}"/, 'star buttons need a roving tabindex');
    match(appJs, /'ArrowLeft', 'ArrowRight', 'Home', 'End'/, 'stars groups need Left/Right/Home/End arrow-key support');
  });

  test('star rating clicks still toggle the .on class and keep the localStorage shape', () => {
    includes(appJs, "x.classList.toggle('on', xv <= cur)", 'star fill-up-to-value .on toggling must not change');
    includes(appJs, 'rec.stars[cat] === v ? 0 : v', 'clicking the current star value must still clear it');
  });

  test('verdict chips expose pressed state', () => {
    match(appJs, /aria-pressed="\$\{rec\.status === s\.k\}"/, 'verdict chips need aria-pressed on initial render');
    includes(appJs, "x.setAttribute('aria-pressed', x.dataset.k === cur)", 'verdict chips need aria-pressed kept in sync on click');
  });

  test('the saved indicator is an aria-live region', () => {
    match(appJs, /id="rateSaved" aria-live="polite"/, '#rateSaved must be an aria-live region');
  });

  test('the scroll spy sets aria-current on the active nav pill', () => {
    includes(appJs, "a.setAttribute('aria-current', 'true')", 'active nav pill must get aria-current');
    includes(appJs, "a.removeAttribute('aria-current')", 'inactive nav pills must lose aria-current');
  });

  test('reduced motion is respected', () => {
    match(css, /@media \(prefers-reduced-motion: reduce\)/, 'styles.css needs a prefers-reduced-motion block');
    match(css, /\.drawer,\.backdrop\{transition:none\}/, 'drawer/backdrop transitions must be disabled under reduced motion');
    match(css, /html\{scroll-behavior:auto\}/, 'smooth scroll-behavior must be disabled under reduced motion');
    includes(appJs, 'prefers-reduced-motion: reduce', 'initSpy must check prefers-reduced-motion');
    includes(appJs, "reduceMotion ? 'auto' : 'smooth'", 'initSpy nav.scrollTo must respect reduced motion');
  });

  test('every a11y-introduced class in app.js is defined in styles.css', () => {
    const emitted = new Set([...appJs.matchAll(/class="([^"$]+)"/g)]
      .flatMap(m => m[1].split(/\s+/))
      .filter(c => c && !c.includes('{') && !c.includes('$')));
    const missing = [...emitted].filter(c => !new RegExp(`\\.${c}\\b`).test(css));
    eq(missing.length, 0, `classes used in app.js but absent from styles.css: ${missing.join(', ')}`);
  });
});
