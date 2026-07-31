/* Tests for scripts/check_drift.py — the drift checker that cross-checks
   authored `card` copy in data/<id>.js against official figures in
   data/generated/scorecard.json.

   check_drift.py is Python (not JS), so these tests shell out to `python3`
   via child_process.execFileSync, per CLAUDE.md's stdlib-only rule. Fixtures
   with deliberately wrong numbers are written to a fresh temp dir under the
   OS temp dir (never into the repo) and cleaned up after each test. */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const h = require('./harness');
const { describe, test, ok, eq, includes, fail } = h;

const SCRIPT = path.join('scripts', 'check_drift.py');

/* Run `python3 scripts/check_drift.py [args]` from the repo root and return
   { status, stdout, stderr } without throwing on a non-zero exit — a
   non-zero exit is an expected outcome (drift found), not a test failure. */
function runCli(args) {
  try {
    const stdout = execFileSync('python3', [SCRIPT, ...(args || [])], {
      cwd: h.ROOT,
      encoding: 'utf8',
    });
    return { status: 0, stdout, stderr: '' };
  } catch (e) {
    return { status: e.status, stdout: e.stdout || '', stderr: e.stderr || '' };
  }
}

/* Run an inline Python snippet with scripts/ on sys.path and check_drift
   imported as `cd`, from the repo root. Returns parsed JSON printed by the
   snippet — the snippet is expected to `print(json.dumps(...))`. */
function runPy(snippet) {
  const code = `import sys, json\nsys.path.insert(0, 'scripts')\nimport check_drift as cd\n${snippet}`;
  const out = execFileSync('python3', ['-c', code], { cwd: h.ROOT, encoding: 'utf8' });
  // Some snippets (e.g. those calling print_report()) write human-readable
  // report lines before the final `print(json.dumps(...))` — only the last
  // non-empty line is the payload we care about.
  const lines = out.split('\n').filter((l) => l.trim().length > 0);
  return JSON.parse(lines[lines.length - 1]);
}

function mkFixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'college-pilot-drift-'));
  return dir;
}

function rmFixture(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

/* ---------------------------------------------------------------------- */

describe('check_drift.py — file and CLI shape', () => {
  test('scripts/check_drift.py exists', () => {
    ok(h.exists(SCRIPT), `${SCRIPT} should exist`);
  });

  test('is Python 3 stdlib only — no third-party imports', () => {
    const src = h.read(SCRIPT);
    // every top-level import must be a stdlib module used elsewhere in the repo's fetcher
    const STDLIB = new Set([
      'argparse', 'dataclasses', 'json', 'os', 're', 'sys', 'typing', '__future__',
    ]);
    const importRe = /^\s*(?:import|from)\s+([\w.]+)/gm;
    let m;
    const found = [];
    while ((m = importRe.exec(src))) found.push(m[1].split('.')[0]);
    for (const mod of found) {
      ok(STDLIB.has(mod), `unexpected non-stdlib-looking import: ${mod}`);
    }
    ok(found.length > 0, 'expected at least one import to check');
  });

  test('--help works without crashing (argparse wired up)', () => {
    const r = runCli(['--help']);
    eq(r.status, 0, 'help should exit 0');
    includes(r.stdout, 'quiet');
  });
});

describe('check_drift.py — runs against current repo data', () => {
  test('produces a report and a machine-checkable exit code', () => {
    const r = runCli([]);
    includes(r.stdout, 'SUMMARY:');
    ok(r.status === 0 || r.status === 1, `exit code should be 0 or 1, got ${r.status}`);
    // exit code must agree with whether the summary reports FAIL or CLEAN
    if (/SUMMARY: FAIL/.test(r.stdout)) {
      eq(r.status, 1, 'FAIL summary must exit non-zero');
    } else {
      includes(r.stdout, 'SUMMARY: CLEAN');
      eq(r.status, 0, 'CLEAN summary must exit zero');
    }
  });

  test('--quiet only prints DRIFT lines and the summary, never OK lines', () => {
    const full = runCli([]);
    const quiet = runCli(['--quiet']);
    // whatever the current data looks like, quiet output must never contain an OK row
    ok(!/\[OK\s*\]/.test(quiet.stdout), 'quiet output should suppress [OK] rows');
    includes(quiet.stdout, 'SUMMARY:');
    // the summary line itself should be identical between modes (same underlying checks)
    const fullSummary = full.stdout.match(/SUMMARY:.*/)[0];
    const quietSummary = quiet.stdout.match(/SUMMARY:.*/)[0];
    eq(quietSummary, fullSummary, 'summary line should not depend on --quiet');
  });

  test('every DRIFT line in quiet mode also appears in the default report', () => {
    const full = runCli([]);
    const quiet = runCli(['--quiet']);
    const driftLines = quiet.stdout.split('\n').filter((l) => l.startsWith('[DRIFT'));
    for (const line of driftLines) {
      includes(full.stdout, line, 'default report should contain every drift finding');
    }
  });

  test('honestly reports fields it cannot check, with a reason, instead of dropping them', () => {
    const r = runCli([]);
    includes(r.stdout, 'Unchecked');
    // the fields CLAUDE.md/the task call out as having no Scorecard equivalent must show up
    for (const field of ['rank', 'biz', 'greek', 'sports', 'deadlines', 'drive', 'placed']) {
      const re = new RegExp(`\\]\\s+\\w+\\s+${field}\\b`);
      ok(re.test(r.stdout), `expected an unchecked row for field "${field}"`);
    }
    includes(r.stdout, 'no Scorecard equivalent field');
  });

  test('flags a not-apples-to-apples grad-rate comparison as unchecked, not a pass', () => {
    // delaware's card grad4 is '74%' with no "(6-yr)" label — must not be silently compared
    // against the Scorecard's 6-yr grad_rate_150pct.
    const r = runCli([]);
    includes(r.stdout, 'delaware');
    ok(
      /\[SKIP\s*\]\s+delaware\s+grad4/.test(r.stdout),
      'delaware grad4 (unlabeled) should be reported as unchecked'
    );
  });
});

describe('check_drift.py — display-string parsers (unit level)', () => {
  test('parse_percent extracts the first percentage, ignoring leading ~ and trailing parentheticals', () => {
    const got = runPy(`print(json.dumps([
      cd.parse_percent('74.1%'),
      cd.parse_percent('~60% (37% Isenberg)'),
      cd.parse_percent('86% (6-yr)'),
      cd.parse_percent('no percent here'),
    ]))`);
    eq(got[0], 74.1);
    eq(got[1], 60.0);
    eq(got[2], 86.0);
    eq(got[3], null);
  });

  test('parse_money_k converts "$NNK"-style strings to dollars', () => {
    const got = runPy(`print(json.dumps([
      cd.parse_money_k('$65.9K OOS'),
      cd.parse_money_k('$39.7K in-state'),
      cd.parse_money_k('≈$95K'),
      cd.parse_money_k('no money here'),
    ]))`);
    eq(got[0], 65900);
    eq(got[1], 39700);
    eq(got[2], 95000);
    eq(got[3], null);
  });

  test('parse_int_commas strips thousands separators', () => {
    const got = runPy(`print(json.dumps([
      cd.parse_int_commas('19,385'),
      cd.parse_int_commas('7,126'),
      cd.parse_int_commas('42,284'),
    ]))`);
    eq(got[0], 19385);
    eq(got[1], 7126);
    eq(got[2], 42284);
  });

  test('parse_sat_range handles the real en-dash used in authored copy', () => {
    const got = runPy(`print(json.dumps([
      cd.parse_sat_range('1220–1370'),
      cd.parse_sat_range('1480–1540'),
      cd.parse_sat_range('nonsense'),
    ]))`);
    eq(got[0][0], 1220);
    eq(got[0][1], 1370);
    eq(got[1][0], 1480);
    eq(got[1][1], 1540);
    eq(got[2], null);
  });

  test('cost_basis classifies in-state vs out-of-state vs full/approx cost strings', () => {
    const got = runPy(`print(json.dumps([
      cd.cost_basis('$38.1K in-state'),
      cd.cost_basis('$65.9K OOS'),
      cd.cost_basis('$60K OOS est.'),
      cd.cost_basis('≈$95K'),
      cd.cost_basis('$94.4K'),
    ]))`);
    eq(got[0], 'in-state');
    eq(got[1], 'out-of-state');
    eq(got[2], 'out-of-state');
    eq(got[3], 'full');
    eq(got[4], 'full');
  });

  test('is_six_year_labeled recognizes the "(6-yr)" convention used by most schools', () => {
    const got = runPy(`print(json.dumps([
      cd.is_six_year_labeled('85.5% (6-yr)'),
      cd.is_six_year_labeled('74%'),
      cd.is_six_year_labeled('~4.5–5 yrs typical'),
    ]))`);
    eq(got[0], true);
    eq(got[1], false);
    eq(got[2], false);
  });
});

describe('check_drift.py — card-block extraction (regex parser, no JS execution)', () => {
  test('parse_card_pairs handles single quotes, double quotes, and escaped apostrophes', () => {
    const got = runPy(`block = """
    type: 'Private',
    accept: '58%', rank: '#97', cost: '$93.7K',
    biz: "D'Amore-McKim + co-op", greek: 'None',
    """
print(json.dumps(cd.parse_card_pairs(block)))`);
    eq(got.type, 'Private');
    eq(got.accept, '58%');
    eq(got.biz, "D'Amore-McKim + co-op");
    eq(got.greek, 'None');
  });

  test('extract_card_block pulls out only the card object, not the whole file', () => {
    const got = runPy(`js = """
window.SCHOOLS['x'] = {
  name: 'X',
  card: {
    accept: '50%', undergrads: '1,000'
  },
  sections: []
};
"""
block = cd.extract_card_block(js)
print(json.dumps({'block': block, 'pairs': cd.parse_card_pairs(block)}))`);
    ok(!/sections/.test(got.block), 'card block should not leak sibling keys');
    eq(got.pairs.accept, '50%');
    eq(got.pairs.undergrads, '1,000');
  });

  test('every real data/<id>.js card block parses to a non-empty dict', () => {
    const ids = h.dataFiles().map((f) => f.replace(/\.js$/, ''));
    const got = runPy(`out = {}
for sid in ${JSON.stringify(ids)}:
    card = cd.load_card(sid)
    out[sid] = card is not None and len(card) > 0
print(json.dumps(out))`);
    for (const id of ids) {
      ok(got[id], `data/${id}.js should have a parseable, non-empty card block`);
    }
  });
});

describe('check_drift.py — comparison logic against fixtures (never the repo)', () => {
  test('a deliberately drifted fixture is caught on every comparable field', () => {
    const dir = mkFixture();
    fs.writeFileSync(
      path.join(dir, 'testschool.js'),
      `window.SCHOOLS['testschool'] = {
  card: {
    type: 'Public', blurb: 'x', rank: '#1', biz: 'x', placed: '1%', greek: 'x',
    sports: 'x', deadlines: 'x', drive: '1hr',
    accept: '10%', sat: '1000–1100', undergrads: '5,000',
    grad4: '50% (6-yr)', cost: '$10.0K in-state'
  }
};\n`
    );
    const scorecardPath = path.join(dir, 'scorecard.json');
    fs.writeFileSync(
      scorecardPath,
      JSON.stringify({
        _meta: { source: 'fixture' },
        testschool: {
          admission_rate: 0.9, // vs authored 10% — huge drift
          sat_mid50: [1400, 1500], // vs authored 1000-1100 — huge drift
          undergrad_size: 50000, // vs authored 5,000 — huge drift
          grad_rate_150pct: 0.95, // vs authored 50% (6-yr) — huge drift
          total_cost_academic_year: 90000, // vs authored $10.0K in-state — huge drift
        },
      })
    );

    try {
      const got = runPy(`checks = cd.run_all(data_dir=${JSON.stringify(dir)}, scorecard_path=${JSON.stringify(scorecardPath)})
print(json.dumps([{'field': c.field, 'status': c.status} for c in checks]))`);

      const byField = Object.fromEntries(got.map((c) => [c.field, c.status]));
      for (const field of ['accept', 'sat_low', 'sat_high', 'undergrads', 'grad4', 'cost']) {
        eq(byField[field], 'drift', `expected ${field} to be flagged as drift`);
      }
      for (const field of ['rank', 'biz', 'greek', 'sports', 'deadlines', 'drive', 'placed', 'type', 'blurb']) {
        eq(byField[field], 'unchecked', `expected ${field} to be honestly reported as unchecked`);
      }
    } finally {
      rmFixture(dir);
    }
  });

  test('a matching fixture (within tolerance) reports clean, not drift', () => {
    const clean = mkFixture();
    fs.writeFileSync(
      path.join(clean, 'testschool.js'),
      `window.SCHOOLS['testschool'] = {
  card: {
    accept: '60.0%', sat: '1200–1400', undergrads: '10,000',
    grad4: '80.0% (6-yr)', cost: '$30.0K in-state'
  }
};\n`
    );
    const scorecardPath = path.join(clean, 'scorecard.json');
    fs.writeFileSync(
      scorecardPath,
      JSON.stringify({
        _meta: { source: 'fixture' },
        testschool: {
          admission_rate: 0.6,
          sat_mid50: [1200, 1400],
          undergrad_size: 10000,
          grad_rate_150pct: 0.8,
          total_cost_academic_year: 30000,
        },
      })
    );
    try {
      const got = runPy(`checks = cd.run_all(data_dir=${JSON.stringify(clean)}, scorecard_path=${JSON.stringify(scorecardPath)})
print(json.dumps([{'field': c.field, 'status': c.status} for c in checks]))`);
      const statuses = got.map((c) => c.status);
      ok(!statuses.includes('drift'), `expected no drift, got ${JSON.stringify(got)}`);

      // sanity: quiet mode on the *real* repo run is unaffected by fixtures
      // (the real repo currently has known drift, so this may exit non-zero —
      // that's expected and asserted elsewhere; here we only check it still runs)
      const cli = runCli(['--quiet']);
      includes(cli.stdout, 'SUMMARY:');
    } finally {
      rmFixture(clean);
    }
  });

  test('run_all() exits clean (status 0) when every field is within tolerance', () => {
    const dirClean = mkFixture();
    fs.writeFileSync(
      path.join(dirClean, 'testschool.js'),
      `window.SCHOOLS['testschool'] = {
  card: { accept: '50.0%' }
};\n`
    );
    const scorecardPath = path.join(dirClean, 'scorecard.json');
    fs.writeFileSync(
      scorecardPath,
      JSON.stringify({ _meta: {}, testschool: { admission_rate: 0.5 } })
    );
    try {
      const got = runPy(`status = cd.print_report(cd.run_all(data_dir=${JSON.stringify(dirClean)}, scorecard_path=${JSON.stringify(scorecardPath)}), quiet=True)
print(json.dumps(status))`);
      eq(got, 0, 'print_report should return exit code 0 when nothing drifts');
    } finally {
      rmFixture(dirClean);
    }
  });

  test('run_all() reports non-zero when drift exceeds tolerance', () => {
    const got = runPy(`status = cd.print_report(cd.run_all(), quiet=True)
print(json.dumps(status))`);
    // this mirrors the CLI's own exit code on the real repo data
    const cliStatus = runCli(['--quiet']).status;
    eq(got, cliStatus, 'print_report()\'s return value should match the CLI exit code');
  });
});

describe('check_drift.py — the reviewed-differences baseline', () => {
  test('the baseline file is valid JSON and every entry carries a reason', () => {
    const raw = h.read(path.join('scripts', 'drift_baseline.json'));
    const baseline = JSON.parse(raw);
    ok(baseline._meta, 'the baseline should document what it is for');
    const schools = Object.keys(baseline).filter(k => k !== '_meta');
    ok(schools.length, 'expected at least one reviewed difference');
    const { SCHOOLS } = h.loadSchools();
    for (const school of schools) {
      ok(SCHOOLS[school], `baseline names unknown school "${school}"`);
      for (const [field, entry] of Object.entries(baseline[school])) {
        for (const key of ['authored', 'official', 'reason']) {
          ok(typeof entry[key] === 'string' && entry[key].trim(),
            `${school}.${field} baseline entry needs a non-empty ${key}`);
        }
        ok(entry.reason.length > 30,
          `${school}.${field} needs a real explanation, not "${entry.reason}"`);
      }
    }
  });

  test('the repo is clean once reviewed differences are accounted for', () => {
    const { status, stdout } = runCli(['--quiet']);
    eq(status, 0, `check_drift.py should exit 0 on current data:\n${stdout}`);
    includes(stdout, 'SUMMARY: CLEAN');
  });

  test('--strict ignores the baseline and reports the raw differences', () => {
    const { status, stdout } = runCli(['--strict', '--quiet']);
    eq(status, 1, 'every baselined difference is still a real difference under --strict');
    includes(stdout, 'SUMMARY: FAIL');
    const known = Object.entries(JSON.parse(h.read(path.join('scripts', 'drift_baseline.json'))))
      .filter(([k]) => k !== '_meta')
      .flatMap(([school, fields]) => Object.keys(fields).map(f => [school, f]));
    for (const [school, field] of known) {
      ok(new RegExp(`${school}\\s+${field}\\b`).test(stdout),
        `--strict should still report ${school}.${field}`);
    }
  });

  test('a waiver applies only to the exact pair it was reviewed against', () => {
    /* This is the whole point: a baseline entry must not be able to hide a
       later edit to a guide or a fresher number from the Scorecard. */
    const drifted = runPy(`
checks = cd.run_all()
one = [c for c in checks if c.school == 'umass' and c.field == 'grad4'][0]
baseline = cd.load_baseline()
same = cd.apply_baseline([one], baseline)[0]
moved = cd.apply_baseline([cd.Check('umass', 'grad4', 'drift', '70% (6-yr)', one.official, 13.26, 1.0)], baseline)[0]
official_moved = cd.apply_baseline([cd.Check('umass', 'grad4', 'drift', one.authored, '99.00%', 18.0, 1.0)], baseline)[0]
print(json.dumps({'same': same.status, 'authored_changed': moved.status, 'official_changed': official_moved.status}))
`);
    eq(drifted.same, 'accepted', 'the reviewed pair should be waived');
    eq(drifted.authored_changed, 'drift', 'editing the guide must re-expose the drift');
    eq(drifted.official_changed, 'drift', 'a fresher Scorecard number must re-expose the drift');
  });

  test('a missing baseline file degrades to no waivers rather than throwing', () => {
    const res = runPy(`print(json.dumps(cd.load_baseline('/nonexistent/baseline.json')))`);
    eq(Object.keys(res).length, 0, 'an unreadable baseline should simply mean no waivers');
  });
});
