/* Backup / restore (export, import, copy summary) for the Decision Board.
   sanitizeImport() and mergeRatings() in app.js are written as pure functions
   (no DOM, no closure state beyond their own arguments) inside a marked block
   so this suite can lift that block out of app.js and run it directly in a
   vm sandbox — no browser, no localStorage needed. */
'use strict';
const vm = require('vm');
const { describe, test, ok, eq, deepEq, read, loadSchools } = require('./harness');

/* ---------- pull the pure backup logic out of app.js ---------- */
const appJs = read('app.js');
const START = '/* BACKUP:PURE:START';
const END = '/* BACKUP:PURE:END */';
const startIdx = appJs.indexOf(START);
const endIdx = appJs.indexOf(END);
ok(startIdx !== -1 && endIdx !== -1, 'app.js must contain the BACKUP:PURE markers around sanitizeImport/mergeRatings');
const src = appJs.slice(startIdx, endIdx + END.length);

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { filename: 'app.js#backup-pure' });
const { sanitizeImport, mergeRatings } = sandbox;
/* top-level `const` in a vm script scope isn't exposed as a sandbox property
   (unlike function declarations), so pull the two literal constants straight
   out of the source text instead of hand-duplicating them here. */
const SCHEMA_VERSION = Number(src.match(/const SCHEMA_VERSION = (\d+);/)[1]);
const NOTE_MAX = Number(src.match(/const NOTE_MAX = (\d+);/)[1]);

/* ---------- realistic fixtures, matching the actual data contract ---------- */
const { SCHOOLS } = loadSchools();
const schoolIds = Object.keys(SCHOOLS);
ok(schoolIds.length >= 2, 'need at least two real school ids to exercise import/merge');
const [S1, S2] = schoolIds;

const RATE_CATS = ['Business program', 'Campus & dorms', 'Location', 'Cost fit', 'Social scene', 'Sports & spirit', 'Food & dining', 'Gut feel'];
const STATUSES = [
  { k: 'love', label: '❤️ Shortlist it', short: '❤️ Shortlisted' },
  { k: 'maybe', label: '🤔 Undecided', short: '🤔 Undecided' },
  { k: 'pass', label: '❌ Pass', short: '❌ Passed' }
];

function envelope(ratings, overrides) {
  return Object.assign({ app: 'college-pilot', version: SCHEMA_VERSION, exported: new Date().toISOString(), ratings }, overrides || {});
}
function sanitize(payload) {
  return sanitizeImport(JSON.stringify(payload), SCHOOLS, RATE_CATS, STATUSES);
}

describe('backup: sanitizeImport validation', () => {
  test('a valid payload is accepted and passed through', () => {
    const res = sanitize(envelope({ [S1]: { status: 'love', stars: { 'Location': 5 }, note: 'Great tour' } }));
    ok(res.ok, 'expected a valid export to be accepted');
    deepEq(res.ratings[S1], { stars: { 'Location': 5 }, note: 'Great tour', status: 'love' });
  });

  test('malformed JSON is rejected', () => {
    const res = sanitizeImport('{not json', SCHOOLS, RATE_CATS, STATUSES);
    eq(res.ok, false, 'malformed JSON must not be accepted');
    ok(typeof res.error === 'string' && res.error.length, 'a rejected import must report a human-readable error');
  });

  test('a missing or wrong envelope is rejected', () => {
    eq(sanitize({ ratings: { [S1]: { status: 'love' } } }).ok, false, 'missing app/version must be rejected');
    eq(sanitize(envelope({ [S1]: { status: 'love' } }, { app: 'some-other-app' })).ok, false, 'wrong app id must be rejected');
    eq(sanitize(envelope({ [S1]: { status: 'love' } }, { version: 999 })).ok, false, 'unknown schema version must be rejected');
    eq(sanitizeImport('null', SCHOOLS, RATE_CATS, STATUSES).ok, false, 'null payload must be rejected');
    eq(sanitizeImport('[1,2,3]', SCHOOLS, RATE_CATS, STATUSES).ok, false, 'a JSON array payload must be rejected');
  });

  test('unknown school ids are dropped, known ones kept', () => {
    const res = sanitize(envelope({
      [S1]: { status: 'maybe' },
      'not-a-real-school': { status: 'love', stars: { 'Location': 5 } }
    }));
    ok(res.ok, 'a payload with one bad id and one good id should still be accepted');
    ok(S1 in res.ratings, 'the known school id must survive');
    ok(!('not-a-real-school' in res.ratings), 'an unknown school id must be dropped');
  });

  test('out-of-range or malformed star values are dropped, valid ones kept', () => {
    const res = sanitize(envelope({
      [S1]: { stars: { 'Location': 5, 'Cost fit': 0, 'Social scene': 6, 'Gut feel': 3.5, 'Sports & spirit': '5', 'Business program': 1, 'Unknown category': 4 } }
    }));
    ok(res.ok, 'expected the import to be accepted');
    deepEq(res.ratings[S1].stars, { 'Business program': 1, 'Location': 5 }, 'only integer 1-5 values for known categories should survive');
  });

  test('an oversized note is truncated to the note-editor cap', () => {
    const huge = 'x'.repeat(NOTE_MAX + 500);
    const res = sanitize(envelope({ [S1]: { note: huge } }));
    ok(res.ok);
    eq(res.ratings[S1].note.length, NOTE_MAX, 'notes must be capped at the same limit as the note editor');
  });

  test('a non-string note is dropped rather than coerced', () => {
    const res = sanitize(envelope({ [S1]: { status: 'love', note: { evil: true } } }));
    ok(res.ok);
    eq(res.ratings[S1].note, '', 'a non-string note must not survive sanitization');
  });

  test('an invalid status is dropped; a valid one is kept', () => {
    const bad = sanitize(envelope({ [S1]: { status: 'super-love', stars: { 'Location': 4 } } }));
    ok(bad.ok);
    eq(bad.ratings[S1].status, null, 'an unrecognized status must not survive');
    const good = sanitize(envelope({ [S1]: { status: 'pass' } }));
    eq(good.ratings[S1].status, 'pass');
  });

  test('a record with nothing usable in it is dropped entirely', () => {
    const res = sanitize(envelope({ [S1]: { status: 'nope', stars: { 'Location': 99 }, note: 42 } }));
    ok(res.ok);
    ok(!(S1 in res.ratings), 'a record that sanitizes down to nothing should not appear in the result');
  });

  test('a <script>-bearing note is neutralized by the same escaping app.js uses at render time', () => {
    const payload = '<img src=x onerror=alert(1)><script>alert(1)</script> nice campus';
    const res = sanitize(envelope({ [S1]: { note: payload } }));
    ok(res.ok);
    eq(res.ratings[S1].note, payload, 'sanitizeImport should not mangle the note text itself — escaping happens at render time');
    /* app.js renders notes with the exact same convention in two places
       (the board preview and the "My Take" textarea): .replace(/</g,'&lt;') */
    ok(/\.replace\(\/</g.test(appJs), 'app.js must still escape "<" before putting note text into innerHTML');
    const rendered = res.ratings[S1].note.replace(/</g, '&lt;');
    ok(!rendered.includes('<script>'), 'an escaped note must not contain a live <script> tag');
    ok(!rendered.includes('<img'), 'an escaped note must not contain a live <img> tag');
  });
});

describe('backup: mergeRatings', () => {
  test('non-conflicting schools are simply added', () => {
    const existing = { [S1]: { stars: {}, note: '', status: 'love' } };
    const incoming = { [S2]: { stars: {}, note: '', status: 'pass' } };
    const { merged, imported, skipped } = mergeRatings(existing, incoming, true);
    eq(imported, 1); eq(skipped, 0);
    deepEq(merged[S1], existing[S1], 'existing rating for an untouched school must be preserved');
    deepEq(merged[S2], incoming[S2]);
  });

  test('on conflict, keepExisting=true leaves the existing rating untouched', () => {
    const existing = { [S1]: { stars: {}, note: 'my original note', status: 'love' } };
    const incoming = { [S1]: { stars: {}, note: 'imported note', status: 'pass' } };
    const { merged, imported, skipped } = mergeRatings(existing, incoming, true);
    eq(imported, 0); eq(skipped, 1);
    deepEq(merged[S1], existing[S1], 'keepExisting=true must not let the import overwrite an existing school');
  });

  test('on conflict, keepExisting=false lets the import win', () => {
    const existing = { [S1]: { stars: {}, note: 'my original note', status: 'love' } };
    const incoming = { [S1]: { stars: {}, note: 'imported note', status: 'pass' } };
    const { merged, imported, skipped } = mergeRatings(existing, incoming, false);
    eq(imported, 1); eq(skipped, 0);
    deepEq(merged[S1], incoming[S1], 'keepExisting=false must let the imported record replace the existing one');
  });

  test('mergeRatings never mutates its inputs', () => {
    const existing = { [S1]: { stars: {}, note: 'a', status: 'love' } };
    const incoming = { [S1]: { stars: {}, note: 'b', status: 'pass' } };
    const existingCopy = JSON.parse(JSON.stringify(existing));
    mergeRatings(existing, incoming, false);
    deepEq(existing, existingCopy, 'mergeRatings must not mutate the existing ratings map it was given');
  });
});
