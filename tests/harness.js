/* Tiny zero-dependency test harness for College Pilot.
   Node stdlib only — matching the repo's no-build, no-dependency rule. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

/* ---------- registry ---------- */
const suites = [];
let current = null;

function describe(name, fn) {
  current = { name, tests: [] };
  suites.push(current);
  fn();
  current = null;
}

function test(name, fn) {
  if (!current) throw new Error('test() must be called inside describe()');
  current.tests.push({ name, fn });
}

/* ---------- assertions ---------- */
class AssertionError extends Error { }

function fail(msg) { throw new AssertionError(msg); }

function ok(value, msg) {
  if (!value) fail(msg || `expected truthy, got ${show(value)}`);
}

function eq(actual, expected, msg) {
  if (!Object.is(actual, expected)) {
    fail(`${msg ? msg + '\n      ' : ''}expected: ${show(expected)}\n      actual:   ${show(actual)}`);
  }
}

function deepEq(actual, expected, msg) {
  const a = JSON.stringify(actual), b = JSON.stringify(expected);
  if (a !== b) fail(`${msg ? msg + '\n      ' : ''}expected: ${b}\n      actual:   ${a}`);
}

function match(str, re, msg) {
  if (!re.test(str)) fail(`${msg ? msg + '\n      ' : ''}${show(str)} does not match ${re}`);
}

function includes(haystack, needle, msg) {
  const has = Array.isArray(haystack) ? haystack.includes(needle) : String(haystack).includes(needle);
  if (!has) fail(`${msg ? msg + '\n      ' : ''}missing ${show(needle)}`);
}

function throws(fn, msg) {
  let threw = false;
  try { fn(); } catch (e) { threw = true; }
  if (!threw) fail(msg || 'expected function to throw');
}

function show(v) {
  if (typeof v === 'string') return JSON.stringify(v.length > 160 ? v.slice(0, 160) + '…' : v);
  try { return JSON.stringify(v); } catch (e) { return String(v); }
}

/* ---------- repo helpers ---------- */
function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function dataFiles() {
  return fs.readdirSync(path.join(ROOT, 'data'))
    .filter(f => f.endsWith('.js'))
    .sort();
}

/* Evaluate every data/<id>.js in a sandbox and return { SCHOOLS, ORDER }.
   delaware.js must load first — it defines window.SCHOOL_ORDER. */
function loadSchools() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  const files = dataFiles();
  const first = files.filter(f => f === 'delaware.js');
  const rest = files.filter(f => f !== 'delaware.js');
  for (const f of first.concat(rest)) {
    vm.runInContext(read(path.join('data', f)), sandbox, { filename: 'data/' + f });
  }
  return { SCHOOLS: sandbox.window.SCHOOLS || {}, ORDER: sandbox.window.SCHOOL_ORDER || [] };
}

/* Parse-check a source string without executing it. */
function parses(src, filename) {
  new vm.Script(src, { filename: filename || 'inline' });
}

/* Pull the <script src="..."> list out of an HTML file, in document order. */
function scriptSrcs(html) {
  const out = [];
  const re = /<script[^>]*\ssrc="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

/* Pull inline <script> bodies (those without a src attribute). */
function inlineScripts(html) {
  const out = [];
  const re = /<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

module.exports = {
  ROOT, describe, test, AssertionError,
  ok, eq, deepEq, match, includes, throws, fail,
  read, exists, dataFiles, loadSchools, parses, scriptSrcs, inlineScripts,
  _suites: suites
};
