/* Pure-function tests for the Decision Board's per-category weighting.
   sanitizeWeights/weightedAvgStars/bestWorstCats/rankSchools in app.js are
   written as pure functions (no DOM, no closure state beyond their own
   arguments) inside a marked block so this suite can lift that block out of
   app.js and run it directly in a vm sandbox — no browser, no localStorage
   needed. Same pattern as tests/backup.test.js's BACKUP:PURE block. */
'use strict';
const vm = require('vm');
const { describe, test, ok, eq, deepEq, read, loadSchools } = require('./harness');

/* ---------- pull the pure weighting logic out of app.js ---------- */
const appJs = read('app.js');
const START = '/* WEIGHTS:PURE:START';
const END = '/* WEIGHTS:PURE:END */';
const startIdx = appJs.indexOf(START);
const endIdx = appJs.indexOf(END);
ok(startIdx !== -1 && endIdx !== -1, 'app.js must contain the WEIGHTS:PURE markers around the weighting helpers');
const src = appJs.slice(startIdx, endIdx + END.length);

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { filename: 'app.js#weights-pure' });
const { sanitizeWeights, weightedAvgStars, bestWorstCats, rankSchools } = sandbox;
/* top-level `const` in a vm script scope isn't exposed as a sandbox property
   (unlike function declarations), so pull the literal constants straight out
   of the source text instead of hand-duplicating them here. */
const DEFAULT_WEIGHT = Number(src.match(/const DEFAULT_WEIGHT = (\d+);/)[1]);
const WKEY = src.match(/const WKEY = '([^']+)';/)[1];

ok(typeof sanitizeWeights === 'function', 'sanitizeWeights must be extractable');
ok(typeof weightedAvgStars === 'function', 'weightedAvgStars must be extractable');
ok(typeof bestWorstCats === 'function', 'bestWorstCats must be extractable');
ok(typeof rankSchools === 'function', 'rankSchools must be extractable');

/* ---------- realistic fixtures, matching the actual data contract ---------- */
const RATE_CATS = ['Business program', 'Campus & dorms', 'Location', 'Cost fit', 'Social scene', 'Sports & spirit', 'Food & dining', 'Gut feel'];
const { SCHOOLS, ORDER } = loadSchools();
ok(ORDER.length >= 5, 'need at least five real school ids to exercise ranking');

const equalWeights = () => sanitizeWeights({}, RATE_CATS);
const flatMean = (stars) => {
  const v = Object.values(stars).filter(Boolean);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
};

describe('weights: WKEY is namespaced separately from ratings', () => {
  test('the weights storage key is not the ratings key', () => {
    eq(WKEY, 'college-pilot-weights');
  });
});

describe('weights: sanitizeWeights defensive parsing', () => {
  test('an empty/absent blob defaults every category to the default weight', () => {
    const w = sanitizeWeights({}, RATE_CATS);
    RATE_CATS.forEach(c => eq(w[c], DEFAULT_WEIGHT, `${c} defaults to normal weight`));
  });

  test('garbage input (null, array, string, number) never throws and falls back to defaults', () => {
    // If sanitizeWeights threw on any of these, this test itself would fail
    // with that exception — no try/catch needed to prove "does not throw".
    [null, undefined, [], 'nope', 42, true].forEach(bad => {
      const w = sanitizeWeights(bad, RATE_CATS);
      RATE_CATS.forEach(c => eq(w[c], DEFAULT_WEIGHT));
    });
  });

  test('unknown categories are dropped, not carried through', () => {
    const w = sanitizeWeights({ 'Not a real category': 3, 'Business program': 2 }, RATE_CATS);
    eq(w['Not a real category'], undefined, 'unknown category is absent from the sanitized map');
    eq(w['Business program'], 2, 'a known, in-range category is kept');
  });

  test('out-of-range and non-numeric values fall back to the default weight per-category', () => {
    const w = sanitizeWeights({
      'Business program': 4,     // above max
      'Campus & dorms': -1,      // below min
      'Location': 1.5,           // non-integer
      'Cost fit': '2',           // non-number
      'Social scene': NaN,
      'Sports & spirit': null,
      'Food & dining': 0,        // valid, in-range
      'Gut feel': 3              // valid, in-range
    }, RATE_CATS);
    eq(w['Business program'], DEFAULT_WEIGHT);
    eq(w['Campus & dorms'], DEFAULT_WEIGHT);
    eq(w['Location'], DEFAULT_WEIGHT);
    eq(w['Cost fit'], DEFAULT_WEIGHT);
    eq(w['Social scene'], DEFAULT_WEIGHT);
    eq(w['Sports & spirit'], DEFAULT_WEIGHT);
    eq(w['Food & dining'], 0, 'a real 0 (Ignore) is preserved, not treated as falsy-invalid');
    eq(w['Gut feel'], 3);
  });

  test('malformed JSON simulated as a caught parse failure also falls back to defaults (mirrors loadW\'s try/catch)', () => {
    let parsed;
    try { parsed = JSON.parse('{not valid json'); } catch (e) { parsed = {}; }
    const w = sanitizeWeights(parsed, RATE_CATS);
    RATE_CATS.forEach(c => eq(w[c], DEFAULT_WEIGHT));
  });
});

describe('weights: weightedAvgStars compatibility + zero-weight semantics', () => {
  test('equal (default) weights reproduce the flat mean exactly — the compatibility guarantee', () => {
    const stars = { 'Business program': 5, 'Location': 3, 'Cost fit': 4 };
    const rec = { status: 'love', stars, note: '' };
    eq(weightedAvgStars(rec, equalWeights(), RATE_CATS), flatMean(stars));
  });

  test('a zero weight excludes the category from the average, it is not scored as a 0', () => {
    const stars = { 'Business program': 5, 'Food & dining': 1 };
    const rec = { status: 'love', stars, note: '' };
    const weights = Object.assign(equalWeights(), { 'Food & dining': 0 });
    eq(weightedAvgStars(rec, weights, RATE_CATS), 5, 'Food & dining (weight 0) is dropped entirely, not averaged in as 0');
    // sanity: if it were wrongly counted as a zero, the average would be 2.5, not 5
    ok(weightedAvgStars(rec, weights, RATE_CATS) !== (5 + 0) / 2);
  });

  test('weighting a category up shifts the average toward it', () => {
    const stars = { 'Business program': 5, 'Food & dining': 1 };
    const rec = { status: 'love', stars, note: '' };
    const equalAvg = weightedAvgStars(rec, equalWeights(), RATE_CATS); // 3.0
    const boosted = Object.assign(equalWeights(), { 'Business program': 3 });
    const boostedAvg = weightedAvgStars(rec, boosted, RATE_CATS); // (5*3 + 1*1) / 4 = 4.0
    eq(equalAvg, 3);
    eq(boostedAvg, 4);
    ok(boostedAvg > equalAvg, 'boosting the higher-starred category raises the weighted average');
  });

  test('all-zero weights across every rated category fall back to the unweighted mean, not 0', () => {
    const stars = { 'Business program': 4, 'Location': 2 };
    const rec = { status: 'maybe', stars, note: '' };
    const allZero = RATE_CATS.reduce((acc, c) => (acc[c] = 0, acc), {});
    eq(weightedAvgStars(rec, allZero, RATE_CATS), 3, 'falls back to (4+2)/2, never reports a meaningless 0');
  });

  test('a record with no rated categories averages to 0 regardless of weights', () => {
    eq(weightedAvgStars({ status: 'love', stars: {}, note: '' }, equalWeights(), RATE_CATS), 0);
    eq(weightedAvgStars(null, equalWeights(), RATE_CATS), 0);
  });
});

describe('weights: bestWorstCats reflects weighted contribution', () => {
  test('with equal weights, best/weakest match raw star extremes (unchanged behavior)', () => {
    const rec = { status: 'love', stars: { 'Business program': 5, 'Location': 3, 'Cost fit': 4 }, note: '' };
    const { best, worst } = bestWorstCats(rec, equalWeights(), RATE_CATS);
    eq(best, 'Business program');
    eq(worst, 'Location');
  });

  test('a heavily-weighted lower-starred category can outrank a higher-starred but ignored one', () => {
    // Location: 3 stars but weight 3 -> score 9; Business program: 5 stars but weight 0 -> excluded entirely
    const rec = { status: 'love', stars: { 'Business program': 5, 'Location': 3 }, note: '' };
    const weights = Object.assign(equalWeights(), { 'Business program': 0, 'Location': 3 });
    const { best, worst } = bestWorstCats(rec, weights, RATE_CATS);
    eq(best, 'Location', 'the only nonzero-weight rated category becomes both best and worst');
    eq(worst, 'Location');
  });

  test('all-zero weights fall back to raw stars for best/worst too', () => {
    const rec = { status: 'love', stars: { 'Business program': 5, 'Location': 3 }, note: '' };
    const allZero = RATE_CATS.reduce((acc, c) => (acc[c] = 0, acc), {});
    const { best, worst } = bestWorstCats(rec, allZero, RATE_CATS);
    eq(best, 'Business program');
    eq(worst, 'Location');
  });

  test('an unrated record reports no best/worst', () => {
    const { best, worst, ratedCount } = bestWorstCats({ status: 'love', stars: {}, note: '' }, equalWeights(), RATE_CATS);
    eq(best, null);
    eq(worst, null);
    eq(ratedCount, 0);
  });
});

describe('weights: rankSchools — verdict still dominates, weighting changes order within a verdict', () => {
  test('verdict ordering (love > maybe > unrated-but-touched > pass) is unaffected by any weighting', () => {
    const [a, b, c, d] = ORDER;
    const ratings = {
      [a]: { status: 'pass', stars: { 'Business program': 5 }, note: '' },   // huge weighted score, but passed
      [b]: { status: 'love', stars: { 'Business program': 1 }, note: '' },   // tiny weighted score, but loved
      [c]: { status: 'maybe', stars: {}, note: 'thinking' },
      [d]: { status: null, stars: { 'Cost fit': 1 }, note: '' }
    };
    const weights = Object.assign(equalWeights(), { 'Business program': 3 }); // maximally favors a's category
    const order = rankSchools(ORDER, SCHOOLS, ratings, weights, RATE_CATS);
    deepEq(order, [b, c, d, a], 'a heavy weight toward the passed school\'s strong category still cannot beat verdict rank');
  });

  test('changing a category weight changes the resulting order within the same verdict', () => {
    const [a, b] = ORDER;
    const ratings = {
      [a]: { status: 'love', stars: { 'Business program': 5, 'Food & dining': 1 }, note: '' },
      [b]: { status: 'love', stars: { 'Business program': 1, 'Food & dining': 5 }, note: '' }
    };
    const equalOrder = rankSchools(ORDER, SCHOOLS, ratings, equalWeights(), RATE_CATS);
    eq(equalOrder[0], a, 'tied 3.0 averages -> SCHOOL_ORDER decides, a comes first');

    const foodie = Object.assign(equalWeights(), { 'Food & dining': 3, 'Business program': 0 });
    const foodieOrder = rankSchools(ORDER, SCHOOLS, ratings, foodie, RATE_CATS);
    eq(foodieOrder[0], b, 'weighting food & dining up (and ignoring business) flips the order to favor b');
  });

  test('a school with only zero-weighted rated categories still appears (via the unweighted-mean fallback), not silently dropped', () => {
    const [a] = ORDER;
    const ratings = { [a]: { status: null, stars: { 'Food & dining': 5 }, note: '' } };
    const allZero = RATE_CATS.reduce((acc, c) => (acc[c] = 0, acc), {});
    const order = rankSchools(ORDER, SCHOOLS, ratings, allZero, RATE_CATS);
    deepEq(order, [a], 'still counts as "rated" because the fallback mean is > 0, not excluded by a zeroed average');
  });
});

describe('weights: sanitizeWeights round-trips a corrupt/absent stored blob defensively (mirrors app.js loadW)', () => {
  test('simulating loadW over corrupt JSON never throws and yields all-default weights', () => {
    const fakeStorage = { 'bad-key': '{"Location": 99, "totally-unknown": 2, "Business program": 2' }; // truncated/invalid JSON
    // Mirrors app.js's loadW(): JSON.parse wrapped in try/catch, then sanitizeWeights.
    let parsed;
    try { parsed = JSON.parse(fakeStorage['bad-key'] || '{}'); } catch (e) { parsed = {}; }
    const weights = sanitizeWeights(parsed, RATE_CATS);
    RATE_CATS.forEach(c => eq(weights[c], DEFAULT_WEIGHT));
  });

  test('simulating loadW over an absent key never throws and yields all-default weights', () => {
    const fakeStorage = {};
    let parsed;
    try { parsed = JSON.parse(fakeStorage['missing-key'] || '{}'); } catch (e) { parsed = {}; }
    const weights = sanitizeWeights(parsed, RATE_CATS);
    RATE_CATS.forEach(c => eq(weights[c], DEFAULT_WEIGHT));
  });
});

describe('weights: the copy-summary agrees with the board it summarizes', () => {
  /* buildBoardSummary() is DOM-coupled (it reads both localStorage stores), so
     this is a static guard rather than a behavioral one: the summary must use
     the same weighted helpers the board ranks with. Without it the pasted text
     can list schools in weighted order while printing unweighted star averages
     and best/weakest categories beside them — a summary that contradicts itself. */
  const src = read('app.js');
  const body = src.slice(src.indexOf('function buildBoardSummary'), src.indexOf('function wireBoardBackup'));

  test('the summary is built from the weighted helpers, not the flat mean', () => {
    ok(body, 'could not locate buildBoardSummary in app.js');
    ok(/weightedAvgStars\(/.test(body), 'buildBoardSummary must use weightedAvgStars, not avgStars');
    ok(/bestWorstCats\(/.test(body), 'buildBoardSummary must pick best/weakest via bestWorstCats');
    ok(!/\bavgStars\(r\)/.test(body), 'buildBoardSummary must not fall back to the unweighted mean');
  });

  test('the summary says so when custom weights are in play', () => {
    ok(/weightsAreDefault\(/.test(body),
      'the summary should note when a non-default weighting produced the order');
  });
});
