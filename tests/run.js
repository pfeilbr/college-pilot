#!/usr/bin/env node
/* College Pilot test runner — `node tests/run.js`
   Discovers every tests/*.test.js, runs it, prints a summary, exits non-zero on failure.
   Pass a substring to run only matching suites: `node tests/run.js sync` */
'use strict';
const fs = require('fs');
const path = require('path');
const h = require('./harness');

const filter = process.argv[2] || '';
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.test.js')).sort();
for (const f of files) require(path.join(__dirname, f));

const GREEN = '\x1b[32m', RED = '\x1b[31m', DIM = '\x1b[2m', BOLD = '\x1b[1m', OFF = '\x1b[0m';
let pass = 0, failed = 0, skipped = 0;
const failures = [];

for (const suite of h._suites) {
  const runnable = suite.tests.filter(t => !filter || (suite.name + ' ' + t.name).toLowerCase().includes(filter.toLowerCase()));
  skipped += suite.tests.length - runnable.length;
  if (!runnable.length) continue;
  console.log(`\n${BOLD}${suite.name}${OFF}`);
  for (const t of runnable) {
    try {
      t.fn();
      pass++;
      console.log(`  ${GREEN}✓${OFF} ${DIM}${t.name}${OFF}`);
    } catch (err) {
      failed++;
      failures.push({ suite: suite.name, test: t.name, err });
      console.log(`  ${RED}✗ ${t.name}${OFF}`);
      console.log(`      ${RED}${String(err.message).replace(/\n/g, '\n      ')}${OFF}`);
      if (!(err instanceof h.AssertionError) && err.stack) {
        console.log(`${DIM}${err.stack.split('\n').slice(1, 4).join('\n')}${OFF}`);
      }
    }
  }
}

const total = pass + failed;
console.log(`\n${BOLD}${failed ? RED + '✗' : GREEN + '✓'} ${pass}/${total} passing${OFF}` +
  (skipped ? ` ${DIM}(${skipped} filtered out)${OFF}` : ''));
if (failed) {
  console.log(`${RED}${failed} failing:${OFF}`);
  for (const f of failures) console.log(`  ${RED}·${OFF} ${f.suite} → ${f.test}`);
}
process.exit(failed ? 1 : 0);
