/* Aid Estimator (aid.js): the pure DATA/BRACKETS/rank logic extracted out of
   index.html's old inline <script>. Loaded in a vm sandbox so the tests can
   exercise the real ranking and validation code, not a regex approximation. */
'use strict';
const vm = require('vm');
const { describe, test, ok, eq, read, loadSchools } = require('./harness');

const { SCHOOLS } = loadSchools();
const schoolIds = new Set(Object.keys(SCHOOLS));

/* Load aid.js in a sandbox where the estimator's elements are absent (e.g.
   school.html, which has a `document` but no #aidRows/#aidBrackets/#aidDiv) —
   the DOM-wiring half must no-op harmlessly rather than throw. */
function loadAidNoDom() {
  const sandbox = { window: {}, document: { getElementById: () => null, createElement: () => ({}) } };
  vm.createContext(sandbox);
  vm.runInContext(read('aid.js'), sandbox, { filename: 'aid.js' });
  return sandbox.window.CollegePilotAid;
}

/* Load aid.js against a minimal fake document that has the estimator's
   elements, so the DOM-wiring half runs too (chips get built, render() fires). */
function loadAidWithDom() {
  const brackets = [];
  function makeChipsEl() {
    const children = [];
    return {
      children,
      appendChild(btn) { children.push(btn); },
    };
  }
  function makeButton() {
    const attrs = {};
    return {
      textContent: '',
      classList: { toggled: {}, toggle(cls, on) { this.toggled[cls] = on; } },
      addEventListener() {},
      setAttribute(k, v) { attrs[k] = v; },
      getAttribute(k) { return attrs[k]; },
    };
  }
  const chipsEl = makeChipsEl();
  const rowsEl = { html: '', set innerHTML(v) { this.html = v; }, get innerHTML() { return this.html; } };
  const divBtn = makeButton();
  const sandbox = {
    window: {},
    document: {
      getElementById(id) {
        if (id === 'aidBrackets') return chipsEl;
        if (id === 'aidRows') return rowsEl;
        if (id === 'aidDiv') return divBtn;
        return null;
      },
      createElement() { return makeButton(); },
    },
  };
  vm.createContext(sandbox);
  vm.runInContext(read('aid.js'), sandbox, { filename: 'aid.js' });
  return { api: sandbox.window.CollegePilotAid, rowsEl, chipsEl };
}

describe('aid estimator', () => {
  test('loading aid.js with no estimator elements present does not throw', () => {
    let api;
    try {
      api = loadAidNoDom();
    } catch (e) {
      throw new Error('aid.js threw with the estimator elements absent: ' + e.message);
    }
    ok(api, 'window.CollegePilotAid should still be set when the estimator elements are absent');
  });

  test('exposes DATA, BRACKETS and rank on window.CollegePilotAid', () => {
    const api = loadAidNoDom();
    ok(Array.isArray(api.DATA), 'DATA should be an array');
    ok(Array.isArray(api.BRACKETS), 'BRACKETS should be an array');
    eq(typeof api.rank, 'function', 'rank should be a function');
    eq(api.BRACKETS.length, 5, 'expected 5 income brackets');
  });

  test('every school id in DATA matches a real school in data/*.js', () => {
    const { DATA } = loadAidNoDom();
    for (const row of DATA) {
      ok(schoolIds.has(row.id), `aid.js DATA references unknown school id "${row.id}"`);
    }
    const rowIds = DATA.map((r) => r.id).sort();
    eq(new Set(rowIds).size, rowIds.length, 'duplicate ids in DATA');
    eq(rowIds.length, schoolIds.size, 'DATA does not cover every school exactly once');
  });

  test('every row has exactly one [low, high] pair per bracket, low <= high', () => {
    const { DATA, BRACKETS } = loadAidNoDom();
    for (const row of DATA) {
      eq(row.est.length, BRACKETS.length, `${row.id}: est has ${row.est.length} entries, expected ${BRACKETS.length}`);
      row.est.forEach(([lo, hi], i) => {
        eq(typeof lo, 'number', `${row.id}: est[${i}][0] should be a number`);
        eq(typeof hi, 'number', `${row.id}: est[${i}][1] should be a number`);
        ok(lo <= hi, `${row.id}: est[${i}] low ${lo} exceeds high ${hi}`);
      });
    }
  });

  test('rank() is cheapest-first for every bracket, and total/stable (13 in, 13 out)', () => {
    const { DATA, BRACKETS } = loadAidNoDom();
    for (let bi = 0; bi < BRACKETS.length; bi++) {
      const result = loadAidNoDom().rank(bi);
      eq(result.length, DATA.length, `rank(${bi}) dropped or duplicated rows`);
      const resultIds = result.map((r) => r.id).sort();
      eq(new Set(resultIds).size, DATA.length, `rank(${bi}) has duplicate ids`);
      for (let i = 1; i < result.length; i++) {
        const prevMid = result[i - 1].est[bi][0] + result[i - 1].est[bi][1];
        const curMid = result[i].est[bi][0] + result[i].est[bi][1];
        ok(prevMid <= curMid, `rank(${bi}) is not cheapest-first at index ${i}: ${result[i - 1].id} (${prevMid}) then ${result[i].id} (${curMid})`);
      }
    }
  });

  test('the CSS-Profile flag partitions into 4 privates and 9 publics', () => {
    const { DATA } = loadAidNoDom();
    const privates = DATA.filter((r) => r.css === true);
    const publics = DATA.filter((r) => r.css === false);
    eq(privates.length, 4, 'expected 4 CSS Profile (private) schools');
    eq(publics.length, 9, 'expected 9 FAFSA-only (public) schools');
    eq(privates.length + publics.length, DATA.length, 'every row should have a boolean css flag');
  });

  test('DOM wiring renders rows when the estimator elements are present', () => {
    const { rowsEl, chipsEl } = loadAidWithDom();
    ok(rowsEl.innerHTML.length > 0, 'render() should populate #aidRows on load');
    ok(rowsEl.innerHTML.includes('🏆'), 'the cheapest row should carry the trophy badge');
    eq(chipsEl.children.length, 5, 'one bracket chip button should be created per BRACKETS entry');
  });
});
