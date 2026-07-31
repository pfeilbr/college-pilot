/* Pure-function tests for the school grid search/filter feature.
   Extracts the "school grid filters (pure helpers)" block straight out of
   app.js and evaluates it in a vm sandbox — no DOM, no browser needed. */
'use strict';
const vm = require('vm');
const { describe, test, ok, eq, read, loadSchools } = require('./harness');

const START = '/* ---------- school grid filters (pure helpers) ---------- */';
const END = '/* ---------- hub renderer ---------- */';

function loadFilterHelpers() {
  const appJs = read('app.js');
  const start = appJs.indexOf(START);
  const end = appJs.indexOf(END);
  ok(start !== -1 && end !== -1 && end > start, 'could not locate the filter-helpers block in app.js — did its section markers move?');
  const src = appJs.slice(start, end);

  // Minimal fake localStorage so loadFilters()/saveFilters() are exercisable too.
  const store = {};
  const localStorage = {
    getItem: (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; }
  };

  const sandbox = { localStorage, exports: {} };
  vm.createContext(sandbox);
  vm.runInContext(src + '\nexports.__api = { normText, isPublicType, parseDriveHours, driveBand, sanitizeFilters, loadFilters, saveFilters, schoolMatchesFilters, FILTER_DEFAULTS, VALID_TYPE, VALID_DRIVE, VALID_VERDICT };', sandbox, { filename: 'app-filters-extract.js' });
  return { api: sandbox.exports.__api, store };
}

const { api } = loadFilterHelpers();
const { SCHOOLS, ORDER } = loadSchools();

const school = (overrides) => Object.assign({
  name: 'Test State University', short: 'Test', city: 'Testville, PA',
  card: { type: 'Public flagship (OOS)', blurb: 'A fine place to study things.', drive: '~3 hr' }
}, overrides);

describe('drive-time parser', () => {
  test('handles every real card.drive value in data/*.js without an unexpected null', () => {
    for (const id of ORDER) {
      const raw = SCHOOLS[id].card.drive;
      const hrs = api.parseDriveHours(raw);
      ok(hrs !== null, `${id}: parseDriveHours(${JSON.stringify(raw)}) returned null`);
      ok(typeof hrs === 'number' && !Number.isNaN(hrs) && hrs > 0, `${id}: parseDriveHours(${JSON.stringify(raw)}) should be a positive number, got ${hrs}`);
    }
  });

  test('parses the "~" prefix and unicode vulgar fractions', () => {
    eq(api.parseDriveHours('~1¼ hr'), 1.25);
    eq(api.parseDriveHours('~5½ hr'), 5.5);
    eq(api.parseDriveHours('~4¾ hr'), 4.75);
    eq(api.parseDriveHours('~10 hr (fly)'), 10);
    eq(api.parseDriveHours('~1½–2 hr'), 1.5, 'a range should read its first (lower) bound');
  });

  test('returns null — never 0 or NaN — for anything unparseable', () => {
    for (const bad of [undefined, null, 123, '', 'N/A', 'call the office', '   ', 'hr']) {
      eq(api.parseDriveHours(bad), null, `parseDriveHours(${JSON.stringify(bad)}) should be null`);
    }
  });

  test('bands hours into under-2 / 2-4 / 4-plus, and passes null through', () => {
    eq(api.driveBand(1.25), 'lt2');
    eq(api.driveBand(1.99), 'lt2');
    eq(api.driveBand(2), '2to4');
    eq(api.driveBand(3.99), '2to4');
    eq(api.driveBand(4), '4plus');
    eq(api.driveBand(10), '4plus');
    eq(api.driveBand(null), null);
  });
});

describe('type predicate', () => {
  test('partitions all 13 schools into public/private with none left uncategorized', () => {
    eq(ORDER.length, 13, 'sanity check: this suite assumes the current 13-school roster');
    let publics = 0, privates = 0;
    for (const id of ORDER) {
      const type = SCHOOLS[id].card.type;
      if (api.isPublicType(type)) publics++; else privates++;
    }
    eq(publics + privates, ORDER.length, 'every school must fall into exactly one bucket');
    ok(publics > 0, 'expected at least one public school');
    ok(privates > 0, 'expected at least one private school');
  });

  test('only classifies a type as public when it starts with "Public"', () => {
    ok(api.isPublicType('Public flagship (OOS)'));
    ok(api.isPublicType('Public (state-assisted)'));
    ok(!api.isPublicType('Private'));
    ok(!api.isPublicType('Private (Jesuit)'));
    ok(!api.isPublicType('State-related (PA in-state!)'));
    ok(!api.isPublicType(undefined));
    ok(!api.isPublicType(''));
  });
});

describe('filter predicate composition', () => {
  test('empty filters match everything', () => {
    ok(api.schoolMatchesFilters(school(), null, api.FILTER_DEFAULTS()));
  });

  test('search text matches name, short, city, and blurb — case- and accent-insensitive', () => {
    const s = school({ name: 'Université Testé', short: 'UT', city: 'Montréal, QC', card: { type: 'Public', blurb: 'Renowned café culture.', drive: '~1 hr' } });
    const f = (q) => Object.assign(api.FILTER_DEFAULTS(), { q });
    ok(api.schoolMatchesFilters(s, null, f('universite teste')), 'should match with accents stripped');
    ok(api.schoolMatchesFilters(s, null, f('MONTREAL')), 'should match case-insensitively on city');
    ok(api.schoolMatchesFilters(s, null, f('cafe')), 'should match the blurb, accent-insensitive');
    ok(!api.schoolMatchesFilters(s, null, f('nonexistent town')), 'should not match unrelated text');
  });

  test('type filter is a positive OR within the category', () => {
    const pub = school({ card: { type: 'Public flagship (OOS)', blurb: 'x', drive: '~1 hr' } });
    const priv = school({ card: { type: 'Private', blurb: 'x', drive: '~1 hr' } });
    const both = Object.assign(api.FILTER_DEFAULTS(), { type: ['public', 'private'] });
    const onlyPublic = Object.assign(api.FILTER_DEFAULTS(), { type: ['public'] });
    ok(api.schoolMatchesFilters(pub, null, both) && api.schoolMatchesFilters(priv, null, both));
    ok(api.schoolMatchesFilters(pub, null, onlyPublic));
    ok(!api.schoolMatchesFilters(priv, null, onlyPublic));
  });

  test('drive filter fails open when the drive string is unparseable', () => {
    const s = school({ card: { type: 'Public', blurb: 'x', drive: 'call for directions' } });
    const f = Object.assign(api.FILTER_DEFAULTS(), { drive: ['lt2'] });
    ok(api.schoolMatchesFilters(s, null, f), 'an unparseable drive string must never make a school invisible');
  });

  test('drive filter excludes non-matching bands', () => {
    const near = school({ card: { type: 'Public', blurb: 'x', drive: '~1 hr' } });
    const far = school({ card: { type: 'Public', blurb: 'x', drive: '~9 hr' } });
    const f = Object.assign(api.FILTER_DEFAULTS(), { drive: ['lt2'] });
    ok(api.schoolMatchesFilters(near, null, f));
    ok(!api.schoolMatchesFilters(far, null, f));
  });

  test('verdict filter reads through the ratings record, not a duplicate store', () => {
    const s = school();
    const shortlist = Object.assign(api.FILTER_DEFAULTS(), { verdict: ['love'] });
    ok(api.schoolMatchesFilters(s, { status: 'love' }, shortlist));
    ok(!api.schoolMatchesFilters(s, { status: 'maybe' }, shortlist));
    ok(!api.schoolMatchesFilters(s, { status: 'pass' }, shortlist), 'passed schools never match a specific verdict chip');
    const unrated = Object.assign(api.FILTER_DEFAULTS(), { verdict: ['unrated'] });
    ok(api.schoolMatchesFilters(s, null, unrated), 'no record at all counts as unrated');
    ok(api.schoolMatchesFilters(s, {}, unrated), 'a record with no status counts as unrated');
  });

  test('hidePassed independently excludes passed schools regardless of the verdict selection', () => {
    const s = school();
    const f = Object.assign(api.FILTER_DEFAULTS(), { hidePassed: true });
    ok(!api.schoolMatchesFilters(s, { status: 'pass' }, f));
    ok(api.schoolMatchesFilters(s, { status: 'love' }, f));
    ok(api.schoolMatchesFilters(s, null, f));
  });

  test('filters compose with AND across categories', () => {
    const s = school({ name: 'Big State U', short: 'BSU', city: 'Farville, OH', card: { type: 'Public flagship (OOS)', blurb: 'Big campus energy.', drive: '~6 hr' } });
    const rec = { status: 'maybe' };
    const passing = Object.assign(api.FILTER_DEFAULTS(), { q: 'big', type: ['public'], drive: ['4plus'], verdict: ['maybe'] });
    ok(api.schoolMatchesFilters(s, rec, passing), 'should match when every category is satisfied');
    const failingOnType = Object.assign(api.FILTER_DEFAULTS(), { type: ['private'] });
    ok(!api.schoolMatchesFilters(s, rec, failingOnType), 'a single failing category should exclude the school even if others pass');
  });
});

describe('filter persistence (storage sanitization)', () => {
  test('sanitizeFilters falls back cleanly on garbage input', () => {
    const cases = [null, undefined, 42, 'nope', [], { q: 123, type: 'public', drive: ['warp-speed'], verdict: null, hidePassed: 'yes' }];
    for (const bad of cases) {
      const f = api.sanitizeFilters(bad);
      eq(typeof f.q, 'string');
      ok(Array.isArray(f.type) && f.type.every(x => api.VALID_TYPE.includes(x)));
      ok(Array.isArray(f.drive) && f.drive.every(x => api.VALID_DRIVE.includes(x)));
      ok(Array.isArray(f.verdict) && f.verdict.every(x => api.VALID_VERDICT.includes(x)));
      eq(typeof f.hidePassed, 'boolean');
    }
  });

  test('sanitizeFilters keeps only recognized values out of a mixed array', () => {
    const f = api.sanitizeFilters({ type: ['public', 'bogus', 'private'], drive: ['lt2', 'warpspeed'] });
    eq(f.type.sort().join(','), 'private,public');
    eq(f.drive.join(','), 'lt2');
  });

  test('loadFilters() falls back to defaults on corrupt stored JSON, never throws', () => {
    const { api: freshApi, store } = loadFilterHelpers();
    store['college-pilot-filters'] = '{not even json';
    let result;
    ok((() => { try { result = freshApi.loadFilters(); return true; } catch (e) { return false; } })(), 'loadFilters() must not throw on corrupt JSON');
    ok(result && Object.is(result.q, ''));
    ok(Array.isArray(result.type) && result.type.length === 0);
  });

  test('loadFilters()/saveFilters() round-trip a valid filter state', () => {
    const { api: freshApi } = loadFilterHelpers();
    const chosen = { q: 'penn', type: ['public'], drive: ['2to4'], verdict: ['love', 'maybe'], hidePassed: true };
    freshApi.saveFilters(chosen);
    const back = freshApi.loadFilters();
    eq(back.q, 'penn');
    eq(back.type.join(','), 'public');
    eq(back.verdict.sort().join(','), 'love,maybe');
    eq(back.hidePassed, true);
  });
});
