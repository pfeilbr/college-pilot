/* Behavioral tests: actually boot app.js (via tests/dom.js) and exercise its
   renderers, ratings store, and Decision Board ranking — as opposed to the
   other suites, which grep source text. See tests/dom.js's header comment
   for exactly what the shim does and does not model. */
'use strict';
const { describe, test, ok, eq, deepEq, match, includes } = require('./harness');
const { bootApp } = require('./dom');
const h = require('./harness');

const { ORDER, SCHOOLS } = h.loadSchools();

/* ---------- hub: school grid + compare table ---------- */
describe('app.js — hub renderer', () => {
  test('#schoolGrid renders one card per school, in SCHOOL_ORDER, linking to school.html', () => {
    const { document } = bootApp({ page: 'hub' });
    const cards = document.querySelector('#schoolGrid').querySelectorAll('.scard');
    eq(cards.length, ORDER.length, 'one card per school');
    cards.forEach((card, i) => {
      const id = ORDER[i];
      eq(card.getAttribute('href'), `school.html?s=${id}`, `card ${i} links to ${id}`);
      includes(card.getAttribute('style'), SCHOOLS[id].colors.sc, `card ${i} carries ${id}'s accent color`);
      includes(card.textContent, SCHOOLS[id].name, `card ${i} shows ${id}'s name`);
    });
  });

  test('#cmpWrap renders a compare table with one header column per school and one row per metric', () => {
    const { document } = bootApp({ page: 'hub' });
    const table = document.querySelector('#cmpWrap table.cmp');
    ok(table, 'compare table exists');
    const headerRow = table.querySelectorAll('tr')[0];
    const headerCells = headerRow.querySelectorAll('th');
    eq(headerCells.length, ORDER.length + 1, 'blank corner cell + one th per school');
    ORDER.forEach((id, i) => eq(headerCells[i + 1].textContent, SCHOOLS[id].short, `header ${i} is ${id}'s short name`));
    // 13 metric rows + 1 header row, one <td> per school per metric row
    const rows = table.querySelectorAll('tr');
    eq(rows.length - 1, 13, 'one row per compare metric');
    const acceptRow = rows[2]; // ['Type', 'Acceptance rate', ...] — acceptance rate is metric #2
    includes(acceptRow.textContent, SCHOOLS[ORDER[0]].card.accept, 'a metric row shows the first school\'s value');
  });
});

/* ---------- Decision Board ranking ---------- */
describe('app.js — Decision Board (renderBoard)', () => {
  test('shows the empty state when nothing is rated', () => {
    const { document } = bootApp({ page: 'hub' });
    const board = document.querySelector('#boardRows');
    includes(board.innerHTML, 'Nothing rated yet', 'empty-state copy renders');
    eq(board.querySelectorAll('a.aidRow').length, 0, 'no rows render');
  });

  test('love > maybe > unrated-but-touched > pass, ties broken by descending star average, trophy only on a first-place love', () => {
    const [a, b, c, d, e] = ORDER; // five real school ids, in SCHOOL_ORDER
    const seed = {
      [a]: { status: 'love', stars: { 'Business program': 5, 'Location': 3 }, note: '' }, // avg 4.0
      [b]: { status: 'love', stars: { 'Business program': 4, 'Location': 4 }, note: '' }, // avg 4.0, tied with a but later in ORDER
      [c]: { status: 'maybe', stars: {}, note: 'thinking' },
      [d]: { status: null, stars: { 'Cost fit': 2 }, note: '' }, // no verdict but has a star rating -> still "rated"
      [e]: { status: 'pass', stars: { 'Location': 1 }, note: '' }
    };
    const { document } = bootApp({ page: 'hub', seedRatings: seed });
    const rows = document.querySelector('#boardRows').querySelectorAll('a.aidRow');
    eq(rows.length, 5, 'all five touched schools appear');
    const order = rows.map(r => r.getAttribute('href'));
    deepEq(order, [
      `school.html?s=${a}`, `school.html?s=${b}`, `school.html?s=${c}`, `school.html?s=${d}`, `school.html?s=${e}`
    ], 'love (tie broken by SCHOOL_ORDER) > maybe > unrated-with-data > pass');

    includes(rows[0].textContent, '🏆', 'the first-place love gets the trophy');
    ok(!rows[1].textContent.includes('🏆'), 'a second love does NOT get the trophy');
    ok(!rows[2].textContent.includes('🏆'), 'a non-love in any position does not get the trophy');

    const bestWorstA = rows[0].querySelector('small.why').textContent;
    includes(bestWorstA, 'Best: Business program (5★)', 'best category is the highest-starred one');
    includes(bestWorstA, 'Weakest: Location (3★)', 'weakest category is the lowest-starred one');
  });

  test('a love that is not first place gets no trophy, and best===weakest is not shown twice', () => {
    const [a, b] = ORDER;
    const seed = {
      [a]: { status: 'love', stars: { 'Location': 5, 'Cost fit': 1 }, note: '' }, // avg 3.0 -> ranks below b
      [b]: { status: 'love', stars: { 'Location': 5 }, note: '' } // avg 5.0, single category: best === weakest
    };
    const { document } = bootApp({ page: 'hub', seedRatings: seed });
    const rows = document.querySelector('#boardRows').querySelectorAll('a.aidRow');
    eq(rows[0].getAttribute('href'), `school.html?s=${b}`, 'higher star average outranks a lower one within the same verdict');
    ok(!rows[1].textContent.includes('🏆'), 'the second-place love does not get the trophy');
    const secondWhy = rows[1].querySelector('small.why').textContent;
    includes(secondWhy, 'Best: Location (5★)', 'sanity: this is the two-category record');
    includes(secondWhy, 'Weakest: Cost fit (1★)');

    const firstWhy = rows[0].querySelector('small.why').textContent;
    includes(firstWhy, 'Best: Location (5★)', 'single-category record still reports a best');
    ok(!firstWhy.includes('Weakest'), 'a single rated category is not also reported as weakest');
  });

  test('unrated schools are listed in "Not rated yet"; a fully-rated list swaps in the completion message', () => {
    const [a] = ORDER;
    const { document: partial } = bootApp({ page: 'hub', seedRatings: { [a]: { status: 'maybe', stars: {}, note: '' } } });
    const line = partial.querySelector('#boardUnrated').textContent;
    includes(line, 'Not rated yet:', 'unrated line appears');
    ok(!line.includes(SCHOOLS[a].short), 'the rated school is not listed as unrated');
    for (const id of ORDER.slice(1)) includes(line, SCHOOLS[id].short, `${id} is listed as not yet rated`);

    const fullSeed = {};
    for (const id of ORDER) fullSeed[id] = { status: 'maybe', stars: {}, note: '' };
    const { document: full } = bootApp({ page: 'hub', seedRatings: fullSeed });
    eq(full.querySelector('#boardUnrated').textContent, 'Every school is rated — time to decide. 🎓');
  });

  test('a note is truncated to 90 chars in the board row', () => {
    const [a] = ORDER;
    const longNote = 'x'.repeat(150);
    const { document } = bootApp({ page: 'hub', seedRatings: { [a]: { status: 'maybe', stars: {}, note: longNote } } });
    const why = document.querySelector('#boardRows a.aidRow small.why').textContent;
    includes(why, 'x'.repeat(90) + '…', 'note is cut to 90 chars with an ellipsis');
    ok(!why.includes('x'.repeat(91)), 'no more than 90 raw characters of the note show');
  });

  test('a note containing "<script>" is escaped, not rendered as a real element', () => {
    const [a] = ORDER;
    const { document } = bootApp({ page: 'hub', seedRatings: { [a]: { status: 'love', stars: {}, note: '<script>alert(1)</script> nice tour' } } });
    const board = document.querySelector('#boardRows');
    ok(!board.innerHTML.includes('<script>'), 'no literal <script> tag-open sequence appears in the markup');
    includes(board.innerHTML, '&lt;script', 'the "<" was escaped to "&lt;"');
    eq(board.querySelectorAll('script').length, 0, 'no <script> element was actually created');
  });
});

/* ---------- avgStars (exercised indirectly through the rendered board row) ---------- */
describe('app.js — avgStars (via the rendered star average)', () => {
  test('a record with no stars at all averages to 0 ("—")', () => {
    const [a] = ORDER;
    const { document } = bootApp({ page: 'hub', seedRatings: { [a]: { status: 'love', stars: {}, note: '' } } });
    const row = document.querySelector('#boardRows a.aidRow');
    eq(row.querySelector('.amt b').textContent, '—');
    eq(row.querySelector('.amt small').textContent, `0/8 rated`);
  });

  test('zeroed-out categories are ignored, not averaged in as 0', () => {
    const [a] = ORDER;
    const { document } = bootApp({ page: 'hub', seedRatings: { [a]: { status: 'love', stars: { 'Location': 0, 'Cost fit': 0 }, note: '' } } });
    const row = document.querySelector('#boardRows a.aidRow');
    eq(row.querySelector('.amt b').textContent, '—', 'all-zero categories behave like an empty record');
    eq(row.querySelector('.amt small').textContent, '0/8 rated');
  });

  test('only rated (nonzero) categories are averaged', () => {
    const [a] = ORDER;
    const { document } = bootApp({
      page: 'hub',
      seedRatings: { [a]: { status: 'love', stars: { 'Location': 4, 'Cost fit': 2, 'Gut feel': 0 }, note: '' } }
    });
    const row = document.querySelector('#boardRows a.aidRow');
    eq(row.querySelector('.amt b').textContent, '3.0★', '(4+2)/2, the zeroed "Gut feel" is excluded');
    eq(row.querySelector('.amt small').textContent, '2/8 rated');
  });
});

/* ---------- migration from the legacy 'shortlist-ratings' key ---------- */
describe('app.js — one-time ratings migration', () => {
  test('migrates the legacy key into the new key when the new key is absent', () => {
    const legacy = { pitt: { status: 'love', stars: {}, note: 'old data' } };
    const { localStorage } = bootApp({ page: 'hub', seedLegacyRatings: legacy });
    deepEq(JSON.parse(localStorage.getItem('college-pilot-ratings')), legacy, 'legacy data lands under the new key');
    eq(localStorage.getItem('shortlist-ratings'), null, 'the legacy key is removed after migrating');
  });

  test('does NOT clobber the new key when it already has data', () => {
    const legacy = { pitt: { status: 'love', stars: {}, note: 'old' } };
    const current = { rutgers: { status: 'maybe', stars: {}, note: 'new' } };
    const { localStorage } = bootApp({ page: 'hub', seedRatings: current, seedLegacyRatings: legacy });
    deepEq(JSON.parse(localStorage.getItem('college-pilot-ratings')), current, 'existing ratings are left untouched');
    deepEq(JSON.parse(localStorage.getItem('shortlist-ratings')), legacy, 'the legacy key is left alone too, since migration never ran');
  });
});

/* ---------- school page renderer ---------- */
describe('app.js — school page renderer (renderSchool)', () => {
  test('renders the requested school\'s title, accent colors, and section nav pills plus "My Take"', () => {
    const id = ORDER[ORDER.length - 1];
    const sc = SCHOOLS[id];
    const { document } = bootApp({ page: 'school', search: `?s=${id}` });
    eq(document.title, `${sc.name} — College Pilot`);
    eq(document.documentElement.style.getPropertyValue('--sc'), sc.colors.sc);
    eq(document.documentElement.style.getPropertyValue('--sc-dark'), sc.colors.scDark);

    const pillLinks = document.querySelector('#pills').querySelectorAll('a');
    eq(pillLinks.length, sc.sections.length + 1, 'one pill per section, plus the appended My Take pill');
    sc.sections.forEach((s, i) => eq(pillLinks[i].getAttribute('href'), `#${s.id}`, `pill ${i} points at #${s.id}`));
    eq(pillLinks[pillLinks.length - 1].getAttribute('href'), '#mytake', 'the last pill is the My Take pill');
    includes(pillLinks[pillLinks.length - 1].textContent, 'My Take');

    ok(document.querySelector(`#${sc.sections[0].id}`), 'the first section actually rendered into #main');
    ok(document.querySelector('#mytake'), 'the My Take section rendered');
  });

  test('renders every school without throwing and titles match', () => {
    for (const id of ORDER) {
      const sc = SCHOOLS[id];
      const { document } = bootApp({ page: 'school', search: `?s=${id}` });
      eq(document.title, `${sc.name} — College Pilot`, `${id} sets the right title`);
    }
  });

  test('falls back to the first school in SCHOOL_ORDER for a missing ?s=', () => {
    const { document } = bootApp({ page: 'school' }); // no search string at all
    eq(document.title, `${SCHOOLS[ORDER[0]].name} — College Pilot`);
  });

  test('falls back to the first school in SCHOOL_ORDER for a garbage ?s=', () => {
    const { document } = bootApp({ page: 'school', search: '?s=not-a-real-school-id' });
    eq(document.title, `${SCHOOLS[ORDER[0]].name} — College Pilot`);
  });
});
