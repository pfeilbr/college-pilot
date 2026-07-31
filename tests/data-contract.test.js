/* The data contract every data/<id>.js must satisfy — see CLAUDE.md. */
'use strict';
const { describe, test, ok, eq, deepEq, match, includes, loadSchools, dataFiles, read } = require('./harness');

const { SCHOOLS, ORDER } = loadSchools();
const ids = Object.keys(SCHOOLS);

/* The shared 12-section spine. Uniformity is what makes side-by-side comparison work. */
const SPINE = ['overview', 'admissions', 'costs', 'business', 'outcomes', 'studentlife',
  'proscons', 'criticisms', 'visit', 'nearby', 'timeline', 'sources'];

/* Flat card fields — these feed both the hub cards and the compare table in app.js. */
const CARD_FIELDS = ['type', 'blurb', 'accept', 'rank', 'cost', 'sat', 'undergrads',
  'biz', 'placed', 'grad4', 'greek', 'sports', 'drive', 'deadlines'];

const CONTACT_FIELDS = ['maps', 'mapsLabel', 'tourUrl', 'siteUrl', 'siteLabel'];

describe('data contract', () => {
  test('every data/<id>.js registers exactly one school', () => {
    const files = dataFiles().map(f => f.replace(/\.js$/, ''));
    deepEq(ids.slice().sort(), files.slice().sort(), 'data/*.js filenames must match registered school ids');
  });

  test('school.id matches its key and its filename', () => {
    for (const id of ids) eq(SCHOOLS[id].id, id, `SCHOOLS['${id}'].id`);
  });

  for (const id of ids) {
    test(`${id}: identity fields are non-empty strings`, () => {
      const s = SCHOOLS[id];
      for (const f of ['name', 'short', 'city', 'locChip', 'heroTitle', 'heroSub']) {
        ok(typeof s[f] === 'string' && s[f].trim(), `${id}.${f} must be a non-empty string`);
      }
    });

    test(`${id}: colors are hex pairs driving --sc / --sc-dark`, () => {
      const c = SCHOOLS[id].colors;
      ok(c, `${id}.colors missing`);
      match(c.sc, /^#[0-9a-fA-F]{6}$/, `${id}.colors.sc`);
      match(c.scDark, /^#[0-9a-fA-F]{6}$/, `${id}.colors.scDark`);
    });

    test(`${id}: heroStats is a non-empty list of {b,s}`, () => {
      const hs = SCHOOLS[id].heroStats;
      ok(Array.isArray(hs) && hs.length, `${id}.heroStats must be a non-empty array`);
      hs.forEach((t, i) => {
        ok(typeof t.b === 'string' && t.b.trim(), `${id}.heroStats[${i}].b`);
        ok(typeof t.s === 'string' && t.s.trim(), `${id}.heroStats[${i}].s`);
      });
    });

    test(`${id}: card has every field the hub + compare table read`, () => {
      const card = SCHOOLS[id].card;
      ok(card, `${id}.card missing`);
      for (const f of CARD_FIELDS) {
        ok(typeof card[f] === 'string' && card[f].trim(), `${id}.card.${f} must be a non-empty string`);
      }
    });

    test(`${id}: contact has the links the drawer builds`, () => {
      const c = SCHOOLS[id].contact;
      ok(c, `${id}.contact missing`);
      for (const f of CONTACT_FIELDS) {
        ok(typeof c[f] === 'string' && c[f].trim(), `${id}.contact.${f} must be a non-empty string`);
      }
      for (const f of ['maps', 'tourUrl', 'siteUrl']) {
        match(c[f], /^https:\/\//, `${id}.contact.${f} must be an https URL`);
      }
      if (c.tel) match(c.tel, /^\+\d{10,15}$/, `${id}.contact.tel must be a bare +E.164 number`);
      if (c.email) match(c.email, /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i, `${id}.contact.email`);
    });

    test(`${id}: sections follow the shared 12-section spine`, () => {
      const secs = SCHOOLS[id].sections;
      ok(Array.isArray(secs) && secs.length, `${id}.sections must be a non-empty array`);
      deepEq(secs.map(s => s.id), SPINE, `${id} section ids drifted from the shared spine`);
    });

    test(`${id}: every section has nav/kicker/title/html`, () => {
      for (const s of SCHOOLS[id].sections) {
        for (const f of ['nav', 'kicker', 'title', 'html']) {
          ok(typeof s[f] === 'string' && s[f].trim(), `${id}.sections#${s.id}.${f} must be a non-empty string`);
        }
        if ('lead' in s) ok(typeof s.lead === 'string', `${id}.sections#${s.id}.lead must be a string when present`);
      }
    });
  }

  test('section html has balanced div tags', () => {
    for (const id of ids) {
      for (const s of SCHOOLS[id].sections) {
        const open = (s.html.match(/<div\b/g) || []).length;
        const close = (s.html.match(/<\/div>/g) || []).length;
        eq(close, open, `${id} #${s.id}: <div> / </div> mismatch (innerHTML would silently reflow the page)`);
      }
    }
  });

  test('section html has no unclosed <a> tags', () => {
    for (const id of ids) {
      for (const s of SCHOOLS[id].sections) {
        const open = (s.html.match(/<a\b/g) || []).length;
        const close = (s.html.match(/<\/a>/g) || []).length;
        eq(close, open, `${id} #${s.id}: <a> / </a> mismatch`);
      }
    }
  });

  test('external links in section html are https and rel="noopener"', () => {
    const bad = [];
    for (const id of ids) {
      for (const s of SCHOOLS[id].sections) {
        const re = /<a\s+([^>]*?)href="(http[^"]*)"([^>]*)>/g;
        let m;
        while ((m = re.exec(s.html))) {
          const attrs = m[1] + m[3], href = m[2];
          if (!/^https:\/\//.test(href)) bad.push(`${id}#${s.id}: non-https ${href}`);
          if (!/rel="[^"]*noopener/.test(attrs)) bad.push(`${id}#${s.id}: missing rel="noopener" on ${href}`);
        }
      }
    }
    eq(bad.length, 0, 'external link problems:\n      ' + bad.join('\n      '));
  });

  test('SCHOOL_ORDER lives in data/delaware.js and lists every school once', () => {
    includes(read('data/delaware.js'), 'window.SCHOOL_ORDER', 'SCHOOL_ORDER must stay in delaware.js (it loads first)');
    eq(new Set(ORDER).size, ORDER.length, 'SCHOOL_ORDER has duplicates');
    deepEq(ORDER.slice().sort(), ids.slice().sort(), 'SCHOOL_ORDER and the loaded schools disagree');
  });

  test('school "short" names are unique (compare-table headers)', () => {
    const shorts = ids.map(id => SCHOOLS[id].short);
    eq(new Set(shorts).size, shorts.length, 'duplicate short names: ' + shorts.join(', '));
  });

  test('school accent colors are unique (Decision Board dots)', () => {
    const cols = ids.map(id => SCHOOLS[id].colors.sc.toLowerCase());
    eq(new Set(cols).size, cols.length, 'duplicate accent colors: ' + cols.join(', '));
  });
});
