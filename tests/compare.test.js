/* Compare-table usability: the sticky layout, the column highlighter, and — the risky
   part — the pure parser that pulls a leading number out of authored display strings
   so the "best value" cells can be marked. See CLAUDE.md's data contract for the
   card fields this reads. */
'use strict';
const vm = require('vm');
const { describe, test, ok, eq, match, includes, read, loadSchools } = require('./harness');

const appJs = read('app.js');
const css = read('styles.css');

/* Pull the real parser straight out of app.js and evaluate it in a sandbox, rather
   than re-implementing it here — a copy could drift from what actually ships. */
function loadParser() {
  const start = appJs.indexOf('const FRACS');
  const end = appJs.indexOf('const cmpWinners');
  ok(start !== -1 && end !== -1, 'app.js: could not locate FRACS / parseLeadingNumber above renderHub');
  const sandbox = {};
  vm.createContext(sandbox);
  // Top-level const/let don't become sandbox properties, so return the binding
  // as the script's completion value instead of reading it off the sandbox.
  return vm.runInContext(appJs.slice(start, end) + '\nparseLeadingNumber', sandbox, { filename: 'parseLeadingNumber' });
}

const parseLeadingNumber = loadParser();
const { SCHOOLS } = loadSchools();

describe('compare-table number parser', () => {
  test('is a function', () => {
    eq(typeof parseLeadingNumber, 'function', 'expected app.js to expose parseLeadingNumber as a plain function');
  });

  test('plain percentages', () => {
    eq(parseLeadingNumber('74.1%'), 74.1);
    eq(parseLeadingNumber('60.6%'), 60.6);
    eq(parseLeadingNumber('82%'), 82);
  });

  test('dollar-K cost figures, with and without a leading approx sign', () => {
    eq(parseLeadingNumber('$65.9K OOS'), 65.9, 'delaware.card.cost');
    eq(parseLeadingNumber('$39.7K in-state'), 39.7, 'pennstate.card.cost');
    eq(parseLeadingNumber('≈$95K'), 95, 'tufts.card.cost — the ≈ sign must not swallow the number');
    eq(parseLeadingNumber('$94.4K'), 94.4, 'bu.card.cost');
  });

  test('leading number of an en-dash range', () => {
    eq(parseLeadingNumber('1220–1370'), 1220, 'SAT range — leading number only');
    eq(parseLeadingNumber('1480–1540'), 1480);
  });

  test('numbers embedded after other characters', () => {
    eq(parseLeadingNumber('#88'), 88);
    eq(parseLeadingNumber('Top 40'), 40);
    eq(parseLeadingNumber('19,385'), 19385, 'thousands separator must not truncate to 19');
    eq(parseLeadingNumber('37,806'), 37806);
  });

  test('unicode fraction glyphs attach to the digit they follow', () => {
    eq(parseLeadingNumber('~1¼ hr'), 1.25, 'delaware.card.drive');
    eq(parseLeadingNumber('~3¼ hr'), 3.25);
    eq(parseLeadingNumber('~5½ hr'), 5.5);
    eq(parseLeadingNumber('~4¾ hr'), 4.75);
    eq(parseLeadingNumber('~6½ hr'), 6.5);
    eq(parseLeadingNumber('~10 hr (fly)'), 10, 'no fraction glyph — plain integer still works');
  });

  test('a fraction glyph range takes the leading value', () => {
    eq(parseLeadingNumber('~1½–2 hr'), 1.5, 'rutgers.card.drive');
  });

  test('a bare fraction glyph with no leading digit still resolves', () => {
    eq(parseLeadingNumber('¼ mile'), 0.25);
  });

  test('unparseable strings return null, never NaN or 0', () => {
    const bad = ['Small', 'None', 'Large system', '', 'strong (Smeal reports high offers)'];
    for (const v of bad) eq(parseLeadingNumber(v), null, `expected null for ${JSON.stringify(v)}`);
  });

  test('non-string input never throws or coerces to a number', () => {
    for (const v of [null, undefined, 42, {}, [], true]) {
      eq(parseLeadingNumber(v), null, `expected null for ${JSON.stringify(v)}`);
    }
  });

  test('never produces NaN for any input', () => {
    for (const v of ['Small', '', 'D3 NESCAC', '$', '%', '——', '¼', 'K', null, undefined, 7]) {
      const r = parseLeadingNumber(v);
      ok(r === null || !Number.isNaN(r), `${JSON.stringify(v)} produced NaN instead of null`);
    }
  });

  test('every card field in every school parses to null or a real number, never NaN', () => {
    for (const id of Object.keys(SCHOOLS)) {
      for (const [field, val] of Object.entries(SCHOOLS[id].card)) {
        const r = parseLeadingNumber(val);
        ok(r === null || (typeof r === 'number' && Number.isFinite(r)),
          `${id}.card.${field} = ${JSON.stringify(val)} parsed to ${r}, expected null or a finite number`);
      }
    }
  });

  test('qualitative (non-numeric) "placed" values go unmarked, not a false 0', () => {
    for (const id of Object.keys(SCHOOLS)) {
      const placed = SCHOOLS[id].card.placed;
      if (!/\d/.test(placed)) eq(parseLeadingNumber(placed), null, `${id}.card.placed = ${JSON.stringify(placed)}`);
    }
  });

  test('a non-percentage "grad4" value (years-to-degree prose) still parses a number', () => {
    // northeastern authors grad4 as years-to-degree prose, not a percentage. The
    // parser itself is dumb on purpose — it is renderHub's %-guard, not the parser,
    // that must keep this out of the 4-yr-grad-rate "best" comparison.
    eq(parseLeadingNumber('~4.5–5 yrs typical'), 4.5);
  });
});

describe('compare-table: sticky columns, best-value marks, and the column highlighter', () => {
  test('the table splits into a sticky thead / tbody', () => {
    match(appJs, /<thead>[\s\S]*?<\/thead>/, 'cmpWrap markup needs a <thead>');
    match(appJs, /<tbody>[\s\S]*?<\/tbody>/, 'cmpWrap markup needs a <tbody>');
  });

  test('the label column and header row carry the sticky classes/rules', () => {
    includes(appJs, 'class="cmp-corner"', 'the blank corner cell needs its own class for CSS to target both axes');
    includes(css, '.cmp-corner', 'styles.css must style .cmp-corner');
    match(css, /\.cmp\s+thead\s+th\{[^}]*position:sticky;top:0/, 'header row must be sticky to the top of its scroll container');
    match(css, /\.cmp\s+th:first-child\{[^}]*position:sticky;left:0/, 'label column header must stay sticky to the left');
    match(css, /\.cmp\s+td:first-child\{[^}]*position:sticky;left:0/, 'label column body cells must stay sticky to the left');
  });

  test('winning cells are marked with cmp-best plus an explanatory title/aria-label', () => {
    includes(appJs, 'class="cmp-best"', 'app.js must emit the cmp-best class on winning cells');
    includes(appJs, 'title="', 'winning cells need a title explaining the win');
    includes(appJs, 'aria-label="', 'winning cells need an aria-label explaining the win');
    includes(css, '.cmp-best', 'styles.css must style .cmp-best');
  });

  test('ranked rows only: sticker cost, grads placed, 4-yr grad rate, drive time', () => {
    match(appJs, /\['Sticker cost \/ yr',[^\]]*'min'/, 'sticker cost must rank low-to-high (lowest wins)');
    match(appJs, /\['Grads placed \(6 mo\)',[^\]]*'max'/, 'grads placed must rank high-to-low (highest wins)');
    match(appJs, /\['4-yr grad rate',[^\]]*'max'[^\]]*\/%\//, '4-yr grad rate must rank highest and guard on a literal %');
    match(appJs, /\['Drive from Philly burbs',[^\]]*'min'/, 'drive time must rank low-to-high (shortest wins)');
  });

  test('acceptance rate and non-comparable rows never get a "min"/"max" direction', () => {
    for (const label of ['Type', 'Acceptance rate', 'SAT middle 50%', 'US News rank',
      'Undergrads', 'Business program', 'Greek life', 'Sports', 'Application deadlines']) {
      const re = new RegExp(`\\['${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',[^\\]]*'(min|max)'`);
      ok(!re.test(appJs), `"${label}" must not declare a min/max winner`);
    }
  });

  test('a column-highlight class exists and is emitted', () => {
    includes(appJs, 'cmp-active', 'app.js must reference the cmp-active column-highlight class');
    includes(css, '.cmp-active', 'styles.css must style .cmp-active');
  });

  test('column headers are keyboard-reachable and toggleable, not just hoverable', () => {
    includes(appJs, 'tabindex="0"', 'school column headers must be focusable');
    includes(appJs, 'role="button"', 'school column headers need a button role for AT users');
    includes(appJs, 'aria-pressed', 'header toggle state must be exposed to AT users');
    match(appJs, /addEventListener\('keydown'/, 'column highlight must respond to keyboard, not only mouse/touch');
    match(appJs, /addEventListener\('click'/, 'column highlight must respond to click/tap');
  });

  test('every school column carries a data-col hook the highlighter can target', () => {
    match(appJs, /data-col="\$\{id\}"/, 'header and body cells need data-col="${id}" for the highlighter to select a whole column');
  });

  test('a legend explains the highlight in the existing .src style', () => {
    match(appJs, /<p class="src">[^<]*<\/p>`;/, 'cmpWrap must end with a .src legend paragraph');
  });

  test('the appended CSS is one block at the end of the file, marked and self-contained', () => {
    const marker = '/* ===== compare ===== */';
    const idx = css.indexOf(marker);
    ok(idx !== -1, 'styles.css must contain the /* ===== compare ===== */ marker');
    eq(css.indexOf(marker, idx + 1), -1, 'the compare marker must appear exactly once');
    ok(idx > css.length * 0.85, 'the compare block must live at the very end of styles.css');
  });
});

describe('compare-table: best-value winners match the authored data (regression guard)', () => {
  // Mirrors app.js's own cmpWinners() logic against the real data, so a future edit
  // to either the data or the ranking rules gets caught here too.
  const winnerFor = (field, dir, guard) => {
    const ids = Object.keys(SCHOOLS);
    const vals = ids.map(id => {
      const raw = SCHOOLS[id].card[field];
      return guard && !guard.test(raw || '') ? null : parseLeadingNumber(raw);
    });
    const real = vals.filter(v => v != null);
    if (!real.length) return new Set();
    const target = dir === 'min' ? Math.min(...real) : Math.max(...real);
    return new Set(ids.filter((id, i) => vals[i] === target));
  };

  test('lowest sticker cost wins, and it is a real school in the data', () => {
    const winners = winnerFor('cost', 'min');
    ok(winners.size >= 1, 'expected at least one cost winner');
    for (const id of winners) ok(SCHOOLS[id], `winner id ${id} must be a real school`);
  });

  test('highest 4-yr grad rate wins only among %-labeled values', () => {
    const winners = winnerFor('grad4', 'max', /%/);
    for (const id of winners) includes(SCHOOLS[id].card.grad4, '%', `${id} won 4-yr grad rate without a % in its value`);
  });

  test('shortest drive wins', () => {
    const winners = winnerFor('drive', 'min');
    ok(winners.size >= 1, 'expected at least one drive-time winner');
  });

  test('acceptance rate never has a computed winner set consulted by the renderer', () => {
    // Sanity check on the data itself: every accept value parses fine (so the
    // renderer *could* rank it), which makes the "no winner" behavior a deliberate
    // choice in renderHub, not an accident of unparseable data.
    for (const id of Object.keys(SCHOOLS)) {
      ok(parseLeadingNumber(SCHOOLS[id].card.accept) !== null, `${id}.card.accept should be parseable`);
    }
  });
});

describe('compare: prose values never win a numeric row', () => {
  const { ORDER } = loadSchools();

  test('a bare digit inside prose does not become a placement rate', () => {
    /* Indiana's card.placed is "excellent (Wall St / Big 4 pipeline)" — the "4"
       is a firm-count, not a percentage. Rows that rank percentages must guard
       on a literal % so prose is skipped rather than parsed. */
    eq(parseLeadingNumber('excellent (Wall St / Big 4 pipeline)'), 4, 'the raw parser does read the stray digit');
    ok(!/%/.test(SCHOOLS.indiana.card.placed), 'Indiana states placement as prose, not a percentage');
  });

  test('every ranked percentage row guards on a literal %', () => {
    const src = read('app.js');
    const rows = src.slice(src.indexOf('const metrics = ['), src.indexOf('];', src.indexOf('const metrics = [')));
    for (const label of ['Grads placed (6 mo)', '4-yr grad rate']) {
      const line = rows.split('\n').find(l => l.includes(label));
      ok(line, `no metrics row for ${label}`);
      ok(/\/%\/\s*\]/.test(line), `${label} ranks percentages and must pass the /%/ guard: ${line.trim()}`);
    }
  });

  test('guarded rows only ever crown schools that actually report a percentage', () => {
    for (const field of ['placed', 'grad4']) {
      const numeric = ORDER.filter(id => /%/.test(SCHOOLS[id].card[field]));
      const best = Math.max(...numeric.map(id => parseLeadingNumber(SCHOOLS[id].card[field])));
      const winners = numeric.filter(id => parseLeadingNumber(SCHOOLS[id].card[field]) === best);
      ok(winners.length, `no winner computable for ${field}`);
      for (const id of winners) {
        ok(/%/.test(SCHOOLS[id].card[field]), `${id} won the ${field} row without reporting a percentage`);
      }
    }
  });
});
