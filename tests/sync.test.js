/* The cross-file sync gotchas from CLAUDE.md: adding or removing a school touches
   seven places, and the version stamp is duplicated across app.js and sw.js. */
'use strict';
const { describe, test, ok, eq, deepEq, match, read, loadSchools, scriptSrcs } = require('./harness');

const { SCHOOLS, ORDER } = loadSchools();
const ids = Object.keys(SCHOOLS).sort();
const indexHtml = read('index.html');
const schoolHtml = read('school.html');
const swJs = read('sw.js');
const appJs = read('app.js');
const aidJs = read('aid.js');
const fetcher = read('scripts/fetch_school_data.py');

const dataSrcs = html => scriptSrcs(html).filter(s => s.startsWith('data/')).map(s => s.replace(/^data\/|\.js$/g, ''));

describe('cross-file sync', () => {
  test('index.html loads every school script, delaware first', () => {
    const loaded = dataSrcs(indexHtml);
    eq(loaded[0], 'delaware', 'delaware.js must load first — it defines SCHOOL_ORDER');
    deepEq(loaded.slice().sort(), ids, 'index.html <script src="data/*"> list is out of sync');
  });

  test('school.html loads every school script, delaware first', () => {
    const loaded = dataSrcs(schoolHtml);
    eq(loaded[0], 'delaware', 'delaware.js must load first — it defines SCHOOL_ORDER');
    deepEq(loaded.slice().sort(), ids, 'school.html <script src="data/*"> list is out of sync');
  });

  test('both HTML files load app.js after the data files', () => {
    for (const [name, html] of [['index.html', indexHtml], ['school.html', schoolHtml]]) {
      const srcs = scriptSrcs(html);
      const app = srcs.indexOf('app.js');
      ok(app > -1, `${name} does not load app.js`);
      const lastData = srcs.map((s, i) => s.startsWith('data/') ? i : -1).reduce((a, b) => Math.max(a, b), -1);
      ok(app > lastData, `${name} loads app.js before the data files`);
    }
  });

  test('sw.js ASSETS caches every school data file', () => {
    const cached = [...swJs.matchAll(/'\.\/data\/([a-z]+)\.js'/g)].map(m => m[1]).sort();
    deepEq(cached, ids, 'sw.js ASSETS list is out of sync with data/*.js');
  });

  test('sw.js ASSETS caches every core asset both pages reference', () => {
    for (const asset of ['./index.html', './school.html', './styles.css', './app.js', './manifest.webmanifest']) {
      ok(swJs.includes(`'${asset}'`), `sw.js ASSETS is missing ${asset}`);
    }
  });

  test('the Aid Estimator DATA array covers every school exactly once', () => {
    const rows = [...aidJs.matchAll(/\{id:'([a-z]+)'/g)].map(m => m[1]);
    ok(rows.length, 'could not find the Aid Estimator DATA array in aid.js');
    eq(new Set(rows).size, rows.length, 'duplicate ids in the Aid Estimator DATA array');
    deepEq(rows.slice().sort(), ids, 'Aid Estimator DATA array is out of sync with the school list');
  });

  test('every Aid Estimator row has one estimate pair per income bracket', () => {
    const brackets = (aidJs.match(/var BRACKETS=\[([^\]]*)\]/) || [, ''])[1].split(',').filter(Boolean).length;
    eq(brackets, 5, 'expected 5 income brackets');
    const rows = [...aidJs.matchAll(/\{id:'([a-z]+)'[\s\S]*?est:\[([\s\S]*?)\],\s*\n/g)];
    eq(rows.length, Object.keys(SCHOOLS).length, 'could not parse every est: array');
    for (const [, id, est] of rows) {
      const pairs = [...est.matchAll(/\[(\d+),(\d+)\]/g)].map(m => [+m[1], +m[2]]);
      eq(pairs.length, brackets, `${id}: est has ${pairs.length} entries, expected ${brackets}`);
      pairs.forEach(([lo, hi], i) => ok(lo <= hi, `${id}: est[${i}] low ${lo} exceeds high ${hi}`));
    }
  });

  test('the data fetcher knows an IPEDS UnitID for every school', () => {
    const block = (fetcher.match(/SCHOOLS = \{([\s\S]*?)\n\}/) || [, ''])[1];
    const listed = [...block.matchAll(/"([a-z]+)":\s*(\d+)/g)];
    deepEq(listed.map(m => m[1]).sort(), ids, 'scripts/fetch_school_data.py SCHOOLS is out of sync');
    for (const [, id, unitid] of listed) {
      match(unitid, /^\d{6}$/, `${id}: IPEDS UnitIDs are 6 digits`);
    }
    const unitids = listed.map(m => m[2]);
    eq(new Set(unitids).size, unitids.length, 'duplicate IPEDS UnitIDs');
  });

  test('the school-count copy matches the actual school count', () => {
    const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
      'eighteen', 'nineteen', 'twenty'];
    const n = ORDER.length;
    const word = WORDS[n];
    ok(word, `no number word for ${n} schools — extend this test`);
    const hero = (indexHtml.match(/<div class="hero">[\s\S]*?<\/div>\s*<\/div>/) || [''])[0];
    const re = new RegExp(`\\b${word}\\b`, 'i');
    ok(re.test(hero), `index.html hero should say "${word}" for ${n} schools`);
    ok(hero.includes(`<b>${n}</b>`), `index.html hero stat should read <b>${n}</b>`);
  });

  test('app.js APP_VERSION and sw.js CACHE stay on the same version number', () => {
    const app = (appJs.match(/APP_VERSION\s*=\s*'v(\d+)/) || [])[1];
    const sw = (swJs.match(/CACHE\s*=\s*'college-pilot-v(\d+)'/) || [])[1];
    ok(app, "could not read APP_VERSION from app.js");
    ok(sw, "could not read CACHE from sw.js");
    eq(sw, app, 'bump APP_VERSION (app.js) and CACHE (sw.js) together — see CLAUDE.md');
  });

  test('APP_VERSION carries a plausible ISO date stamp', () => {
    const stamp = (appJs.match(/APP_VERSION\s*=\s*'v\d+\s*·\s*(\d{4}-\d{2}-\d{2})'/) || [])[1];
    ok(stamp, "APP_VERSION should look like 'v13 · 2026-07-31'");
    ok(!isNaN(Date.parse(stamp)), `APP_VERSION date ${stamp} is not parseable`);
  });

  test('every school id referenced in index.html markup exists', () => {
    const linked = [...indexHtml.matchAll(/school\.html\?s=([a-z]+)/g)].map(m => m[1]);
    for (const id of new Set(linked)) ok(SCHOOLS[id], `index.html links to unknown school "${id}"`);
  });

  test('the Aid Estimator hint lists the right public/private split', () => {
    /* "State-related" is Pennsylvania's designation for its public universities,
       so Penn State and Pitt count as public — matching the hint's own wording. */
    const isPublic = id => /^(Public|State-related)/.test(SCHOOLS[id].card.type);
    const publics = ORDER.filter(isPublic);
    const privates = ORDER.filter(id => !isPublic(id));
    eq(publics.length, 9, 'expected nine public/state schools');
    eq(privates.length, 4, 'expected four private schools');

    const hint = (indexHtml.match(/id="aidHint"[\s\S]*?<\/p>/) || [''])[0];
    ok(hint, 'could not find the aidHint copy in index.html');
    /* Split the sentence so each school is checked against the clause it belongs
       to — asserting both lists against the whole string would pass either way. */
    const split = hint.search(/For the \w+ private/);
    ok(split > -1, 'aidHint should have a "For the <n> private ..." clause');
    const publicClause = hint.slice(0, split), privateClause = hint.slice(split);

    for (const id of publics) {
      ok(publicClause.includes(SCHOOLS[id].short), `aidHint's public/state clause should name ${SCHOOLS[id].short}`);
      ok(!privateClause.includes(SCHOOLS[id].short), `aidHint lists the public school ${SCHOOLS[id].short} as private`);
    }
    for (const id of privates) {
      ok(privateClause.includes(SCHOOLS[id].short), `aidHint's private clause should name ${SCHOOLS[id].short}`);
    }
  });

  test('the Aid Estimator CSS-Profile flags agree with the hint copy', () => {
    /* aid.js decides FAFSA-vs-CSS per row; the hint prose says which schools are
       which. If those disagree the app contradicts itself on who counts income. */
    const isPublic = id => /^(Public|State-related)/.test(SCHOOLS[id].card.type);
    const rows = [...aidJs.matchAll(/\{id:'([a-z]+)',name:'[^']*',css:(true|false)/g)];
    eq(rows.length, ORDER.length, 'could not read the css: flag for every Aid Estimator row');
    for (const [, id, css] of rows) {
      eq(css === 'true', !isPublic(id), `aid.js marks ${id} css:${css}, which contradicts card.type "${SCHOOLS[id].card.type}"`);
    }
  });
});
