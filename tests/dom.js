/* Minimal, honest DOM + browser shim for booting app.js in a Node `vm` sandbox.
   Node stdlib only — matching the repo's no-build, no-dependency rule.

   WHAT THIS IS FOR
   -----------------
   `tests/app-render.test.js` needs app.js's actual renderers (renderHub,
   renderSchool, renderBoard, avgStars, the ratings store, the migration) to
   *run*, not just be grepped as text. This file provides just enough of
   `document` / `window` / `location` / `navigator` / `localStorage` for
   app.js to boot, render, and be queried and clicked by tests.

   WHAT IT MODELS (deliberately, because app.js actually uses it)
   -----------------------------------------------------------------
   - A real (small) node tree: Element / TextNode, with parentNode,
     childNodes, appendChild, remove, insertAdjacentHTML.
   - innerHTML get/set via a pragmatic tag-scanner (parseHTML below) — NOT a
     spec-compliant HTML parser. It handles the well-formed markup app.js and
     the school data files actually produce: nested tags, void elements
     (hr/br/img/...), quoted or bare attributes, and boolean attributes. It
     does NOT decode HTML entities, does NOT implement tag-omission /
     auto-closing rules (e.g. `<p>` doesn't implicitly close), does NOT
     understand `<script>`/`<style>` raw-text parsing, and will misparse a
     `<`/`>` character inside an unquoted or malformed attribute. Every
     data/*.js file and every template in app.js was checked against these
     assumptions before writing this shim; if new markup breaks them, fix the
     markup or extend the scanner, don't paper over it in a test.
   - A selector engine covering exactly the selector shapes app.js uses:
     `#id`, `tag.class`, `.class[attr]`, `#id tag`, and
     `#id tag[attr="value with spaces"]` (descendant combinator only — no
     `>`, `+`, `~`, `:pseudo`, or attribute operators like `^=`). It matches
     compound selectors left-to-right against the ancestor chain; it is not a
     general CSS selector engine.
   - classList (add/remove/toggle/contains), a dataset Proxy that reflects
     `data-*` attributes both ways (including `delete`), a `style` object
     with `setProperty`/`getPropertyValue`/`cssText` plus arbitrary property
     assignment (`el.style.opacity = 1`), addEventListener/removeEventListener
     /dispatchEvent (no bubbling — nothing in app.js relies on it), and a
     localStorage backed by a plain Map.
   - `CSS.escape`, `URLSearchParams` (Node's real global), `confirm` (stubs
     to `true`), `alert`/`requestAnimationFrame`/`setTimeout`/`getComputedStyle`
     (stubs sufficient to not throw).

   WHAT IT DELIBERATELY DOES NOT MODEL
   ------------------------------------
   - Any layout: offsetTop/offsetLeft/offsetWidth/clientWidth/scrollTo etc.
     are all inert stubs returning 0 / doing nothing. Anything in app.js that
     depends on real geometry (the scroll-spy's active-pill highlighting,
     tooltip positioning) cannot be meaningfully asserted here — the tests
     only check that this code *runs without throwing*, not that it picks
     the geometrically correct pill.
   - Event bubbling/capturing, `beforeinstallprompt`, `serviceWorker` /
     `caches` (navigator.serviceWorker is left undefined on purpose so
     `'serviceWorker' in navigator` is false and app.js's boot code doesn't
     try to register a real worker), clipboard, `navigator.share`.
   - CSS itself: no cascade, no computed layout. `getComputedStyle` always
     returns a fixed `paddingTop: '0px'`.
   - HTML entity decoding anywhere (innerHTML, textContent, attribute
     values) — strings round-trip as literal characters. This is actually
     load-bearing for the note-escaping test: app.js escapes notes by
     replacing `<` with `&lt;`, and this shim faithfully preserves that
     literal text instead of "helpfully" decoding it back to `<`.
   - Real script execution from parsed `<script>` tags (none of app.js's own
     templates emit one; this is what the note-escaping test relies on).

   If a test needs more fidelity than this shim honestly provides, that's a
   sign that the test should assert less, not that the shim should fake it.
*/
'use strict';
const vm = require('vm');
const h = require('./harness');

/* ---------- tiny node tree ---------- */
const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

class Node {
  constructor(nodeType) {
    this.nodeType = nodeType;
    this.parentNode = null;
    this.childNodes = [];
  }
  appendChild(node) {
    if (node.parentNode) node.parentNode.removeChild(node);
    node.parentNode = this;
    this.childNodes.push(node);
    return node;
  }
  removeChild(node) {
    const i = this.childNodes.indexOf(node);
    if (i >= 0) this.childNodes.splice(i, 1);
    node.parentNode = null;
    return node;
  }
  get firstChild() { return this.childNodes[0] || null; }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
}

class TextNode extends Node {
  constructor(data) { super(3); this.data = data; }
}

function toCamel(s) { return s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()); }
function toKebab(s) { return s.replace(/[A-Z]/g, c => '-' + c.toLowerCase()); }

function makeDatasetProxy(el) {
  return new Proxy({}, {
    get(_, prop) {
      if (typeof prop !== 'string') return undefined;
      const attr = 'data-' + toKebab(prop);
      return el.hasAttribute(attr) ? el.getAttribute(attr) : undefined;
    },
    set(_, prop, value) { el.setAttribute('data-' + toKebab(String(prop)), String(value)); return true; },
    deleteProperty(_, prop) { el.removeAttribute('data-' + toKebab(String(prop))); return true; },
    has(_, prop) { return el.hasAttribute('data-' + toKebab(String(prop))); },
    ownKeys() { return [...el.attrs.keys()].filter(k => k.startsWith('data-')).map(k => toCamel(k.slice(5))); },
    getOwnPropertyDescriptor() { return { enumerable: true, configurable: true }; }
  });
}

function splitClasses(el) { return (el.getAttribute('class') || '').split(/\s+/).filter(Boolean); }

function makeClassList(el) {
  return {
    add(...names) { const s = new Set(splitClasses(el)); names.forEach(n => s.add(n)); el.setAttribute('class', [...s].join(' ')); },
    remove(...names) { const s = new Set(splitClasses(el)); names.forEach(n => s.delete(n)); el.setAttribute('class', [...s].join(' ')); },
    toggle(name, force) {
      const s = new Set(splitClasses(el));
      if (force === undefined) { s.has(name) ? s.delete(name) : s.add(name); }
      else if (force) s.add(name); else s.delete(name);
      el.setAttribute('class', [...s].join(' '));
      return s.has(name);
    },
    contains(name) { return splitClasses(el).includes(name); }
  };
}

class StyleObj {
  setProperty(name, value) { this[name] = value; }
  getPropertyValue(name) { return this[name] || ''; }
  get cssText() {
    return Object.keys(this).filter(k => typeof this[k] !== 'function').map(k => `${k}:${this[k]}`).join(';');
  }
  set cssText(v) {
    for (const k of Object.keys(this)) if (typeof this[k] !== 'function') delete this[k];
    String(v).split(';').forEach(pair => {
      const idx = pair.indexOf(':');
      if (idx > 0) { const k = pair.slice(0, idx).trim(); const val = pair.slice(idx + 1).trim(); if (k) this[k] = val; }
    });
  }
}

function makeEvent(type, extra) {
  return Object.assign({ type, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, stopPropagation() { } }, extra);
}

class Element extends Node {
  constructor(tagName) {
    super(1);
    this.tagName = tagName.toUpperCase();
    this._tag = tagName.toLowerCase();
    this.attrs = new Map();
    this._listeners = {};
    this._style = new StyleObj();
    this.dataset = makeDatasetProxy(this);
    this.classList = makeClassList(this);
  }
  getAttribute(name) { const v = this.attrs.get(name.toLowerCase()); return v === undefined ? null : v; }
  setAttribute(name, value) { this.attrs.set(name.toLowerCase(), String(value)); }
  removeAttribute(name) { this.attrs.delete(name.toLowerCase()); }
  hasAttribute(name) { return this.attrs.has(name.toLowerCase()); }

  get id() { return this.getAttribute('id') || ''; }
  set id(v) { this.setAttribute('id', v); }
  get className() { return this.getAttribute('class') || ''; }
  set className(v) { this.setAttribute('class', v); }
  get hidden() { return this.hasAttribute('hidden'); }
  set hidden(v) { if (v) this.setAttribute('hidden', ''); else this.removeAttribute('hidden'); }
  get style() { return this._style; }

  get textContent() {
    let out = '';
    const walk = n => { if (n.nodeType === 3) out += n.data; else n.childNodes.forEach(walk); };
    this.childNodes.forEach(walk);
    return out;
  }
  set textContent(v) {
    this.childNodes.forEach(n => n.parentNode = null);
    this.childNodes = [];
    if (v !== '' && v != null) this.appendChild(new TextNode(String(v)));
  }

  get innerHTML() { return serialize(this.childNodes); }
  set innerHTML(html) {
    this.childNodes.forEach(n => n.parentNode = null);
    this.childNodes = [];
    parseHTML(String(html)).forEach(n => this.appendChild(n));
  }

  insertAdjacentHTML(pos, html) {
    const nodes = parseHTML(String(html));
    if (pos === 'afterbegin') {
      for (let i = nodes.length - 1; i >= 0; i--) { nodes[i].parentNode = this; this.childNodes.unshift(nodes[i]); }
    } else if (pos === 'beforebegin' && this.parentNode) {
      const idx = this.parentNode.childNodes.indexOf(this);
      nodes.forEach((n, i) => { n.parentNode = this.parentNode; this.parentNode.childNodes.splice(idx + i, 0, n); });
    } else if (pos === 'afterend' && this.parentNode) {
      const idx = this.parentNode.childNodes.indexOf(this);
      nodes.forEach((n, i) => { n.parentNode = this.parentNode; this.parentNode.childNodes.splice(idx + 1 + i, 0, n); });
    } else {
      nodes.forEach(n => this.appendChild(n)); // 'beforeend' and unrecognized positions
    }
  }

  addEventListener(type, fn) { (this._listeners[type] = this._listeners[type] || []).push(fn); }
  removeEventListener(type, fn) { if (this._listeners[type]) this._listeners[type] = this._listeners[type].filter(f => f !== fn); }
  dispatchEvent(evt) {
    evt.target = evt.target || this;
    evt.currentTarget = this;
    (this._listeners[evt.type] || []).slice().forEach(fn => fn.call(this, evt));
    return true;
  }
  click() { this.dispatchEvent(makeEvent('click')); }

  get offsetTop() { return 0; } get offsetLeft() { return 0; }
  get offsetWidth() { return 0; } get offsetHeight() { return 0; }
  get clientWidth() { return 0; } get clientHeight() { return 0; }
  scrollTo() { }
  focus() { } setAttributeNS(_ns, name, value) { this.setAttribute(name, value); }

  querySelector(sel) { return querySelectorAll(this, sel)[0] || null; }
  querySelectorAll(sel) { return querySelectorAll(this, sel); }
}

/* ---------- pragmatic tag-scanner: HTML string -> node list ---------- */
function appendText(parent, text) { if (text) parent.appendChild(new TextNode(text)); }

function parseAttrs(el, attrStr) {
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let m;
  while ((m = re.exec(attrStr))) {
    const name = m[1].toLowerCase();
    const value = m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4] !== undefined ? m[4] : '';
    el.setAttribute(name, value);
  }
}

function parseHTML(html) {
  const root = new Element('#fragment');
  const stack = [root];
  let lastIndex = 0;
  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^<>]*?)?)\s*(\/?)>/g;
  let m;
  while ((m = tagRe.exec(html))) {
    if (m.index > lastIndex) appendText(stack[stack.length - 1], html.slice(lastIndex, m.index));
    lastIndex = tagRe.lastIndex;
    const closing = m[1] === '/';
    const tagName = m[2].toLowerCase();
    const attrStr = m[3] || '';
    const selfClose = m[4] === '/';
    if (closing) {
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i]._tag === tagName) { stack.length = i; break; }
      }
    } else {
      const el = new Element(tagName);
      parseAttrs(el, attrStr);
      stack[stack.length - 1].appendChild(el);
      if (!selfClose && !VOID_TAGS.has(tagName)) stack.push(el);
    }
  }
  if (lastIndex < html.length) appendText(stack[stack.length - 1], html.slice(lastIndex));
  // Return a snapshot, not the live array: callers typically do
  // `parseHTML(html).forEach(n => target.appendChild(n))`, and appendChild()
  // splices `n` out of root.childNodes (its current parent) as a side
  // effect — forEach-ing that same live array while it's being spliced
  // silently skips every other node.
  return root.childNodes.slice();
}

function serialize(nodes) {
  return nodes.map(n => {
    if (n.nodeType === 3) return n.data;
    const attrs = [...n.attrs.entries()].map(([k, v]) => ` ${k}="${v}"`).join('');
    if (VOID_TAGS.has(n._tag)) return `<${n._tag}${attrs}>`;
    return `<${n._tag}${attrs}>${serialize(n.childNodes)}</${n._tag}>`;
  }).join('');
}

/* ---------- selector engine: #id / tag.class / .class[attr] / descendant chains ---------- */
function parseSelectorGroups(selector) {
  const tokens = [];
  let buf = '', quote = null, depth = 0;
  for (const c of selector) {
    if (quote) { buf += c; if (c === quote) quote = null; continue; }
    if (c === '"' || c === "'") { quote = c; buf += c; continue; }
    if (c === '[') { depth++; buf += c; continue; }
    if (c === ']') { depth = Math.max(0, depth - 1); buf += c; continue; }
    if (/\s/.test(c) && depth === 0) { if (buf) { tokens.push(buf); buf = ''; } continue; }
    buf += c;
  }
  if (buf) tokens.push(buf);
  return tokens.map(parseCompound);
}

function parseCompound(token) {
  let rest = token;
  const c = { tag: null, id: null, classes: [], attrs: [] };
  const tagMatch = rest.match(/^[a-zA-Z][a-zA-Z0-9-]*/);
  if (tagMatch) { c.tag = tagMatch[0].toLowerCase(); rest = rest.slice(tagMatch[0].length); }
  while (rest.length) {
    if (rest[0] === '.') {
      const m = rest.match(/^\.([a-zA-Z0-9_-]+)/);
      if (!m) break;
      c.classes.push(m[1]); rest = rest.slice(m[0].length);
    } else if (rest[0] === '#') {
      const m = rest.match(/^#([a-zA-Z0-9_-]+)/);
      if (!m) break;
      c.id = m[1]; rest = rest.slice(m[0].length);
    } else if (rest[0] === '[') {
      const end = rest.indexOf(']');
      if (end === -1) break;
      const inner = rest.slice(1, end);
      const eq = inner.indexOf('=');
      if (eq === -1) c.attrs.push({ name: inner.trim(), value: null });
      else {
        const name = inner.slice(0, eq).trim();
        let value = inner.slice(eq + 1).trim();
        if ((value[0] === '"' && value.endsWith('"')) || (value[0] === "'" && value.endsWith("'"))) value = value.slice(1, -1);
        value = value.replace(/\\(.)/g, '$1');
        c.attrs.push({ name, value });
      }
      rest = rest.slice(end + 1);
    } else break;
  }
  return c;
}

function matchesCompound(el, c) {
  if (c.tag && el._tag !== c.tag) return false;
  if (c.id && el.id !== c.id) return false;
  if (c.classes.length) { const cls = splitClasses(el); if (!c.classes.every(cl => cls.includes(cl))) return false; }
  for (const a of c.attrs) {
    if (a.value === null) { if (!el.hasAttribute(a.name)) return false; }
    else if (el.getAttribute(a.name) !== a.value) return false;
  }
  return true;
}

function allDescendants(root) {
  const out = [];
  (function walk(node) {
    for (const child of node.childNodes) if (child.nodeType === 1) { out.push(child); walk(child); }
  })(root);
  return out;
}

function ancestorChainMatches(el, preceding) {
  let idx = preceding.length - 1, cur = el.parentNode;
  while (cur && idx >= 0) { if (matchesCompound(cur, preceding[idx])) idx--; cur = cur.parentNode; }
  return idx < 0;
}

function querySelectorAll(root, selector) {
  const groups = parseSelectorGroups(selector.trim());
  if (!groups.length) return [];
  const last = groups[groups.length - 1];
  let matched = allDescendants(root).filter(el => matchesCompound(el, last));
  if (groups.length > 1) matched = matched.filter(el => ancestorChainMatches(el, groups.slice(0, -1)));
  return matched;
}

/* ---------- document ---------- */
class DocumentImpl {
  constructor() {
    this.documentElement = new Element('html');
    this.head = new Element('head');
    this.body = new Element('body');
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this._listeners = {};
    this._title = '';
  }
  get title() { return this._title; }
  set title(v) { this._title = v; }
  createElement(tag) { return new Element(tag); }
  createTextNode(data) { return new TextNode(data); }
  querySelector(sel) { return querySelectorAll(this.body, sel)[0] || null; }
  querySelectorAll(sel) { return querySelectorAll(this.body, sel); }
  addEventListener(type, fn) { (this._listeners[type] = this._listeners[type] || []).push(fn); }
  removeEventListener(type, fn) { if (this._listeners[type]) this._listeners[type] = this._listeners[type].filter(f => f !== fn); }
  dispatchEvent(evt) { evt.target = evt.target || this; (this._listeners[evt.type] || []).slice().forEach(fn => fn.call(this, evt)); return true; }
}

/* ---------- CSS.escape: enough to round-trip through our own parser (see header) ---------- */
function cssEscape(str) { return String(str).replace(/[^a-zA-Z0-9_-]/g, ch => '\\' + ch); }

/* ---------- localStorage ---------- */
function makeLocalStorage(store) {
  return {
    getItem(k) { return store.has(k) ? store.get(k) : null; },
    setItem(k, v) { store.set(k, String(v)); },
    removeItem(k) { store.delete(k); },
    clear() { store.clear(); },
    key(i) { return [...store.keys()][i] ?? null; },
    get length() { return store.size; }
  };
}

/* ---------- page skeletons (the subset of index.html / school.html that app.js needs) ---------- */
const HUB_BODY = `
<header class="site">
  <div class="bar">
    <img src="icons/icon-192.png" alt="College Pilot icon">
    <div class="t">College Pilot<small>Tour · Compare · Decide</small></div>
    <button class="menuBtn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
  </div>
  <nav class="pills" aria-label="Sections"><ul>
    <li><a href="#board">Decision Board</a></li>
    <li><a href="#schools">Schools</a></li>
    <li><a href="#compare">Compare</a></li>
  </ul></nav>
</header>
<div class="hero"><div class="wrap"></div></div>
<main class="wrap">
<section id="board">
  <div class="aidRows" id="boardRows"></div>
  <p class="src" id="boardUnrated"></p>
  <p class="src"><button id="boardClear" class="linkBtn">Clear all ratings on this device</button></p>
</section>
<section id="schools"><div class="schoolGrid" id="schoolGrid"></div></section>
<section id="compare"><div class="card tscroll" id="cmpWrap"></div></section>
</main>
<footer></footer>
<div class="tip" id="tip" role="tooltip"></div>
`;

const SCHOOL_BODY = `
<header class="site">
  <div class="bar">
    <a href="index.html"><img src="icons/icon-192.png" alt="College Pilot icon"></a>
    <div class="t" id="barTitle">College Pilot<small>Tour · Compare · Decide</small></div>
    <button class="menuBtn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
  </div>
  <nav class="pills" aria-label="Sections"><ul id="pills"></ul></nav>
</header>
<div class="hero"><div class="wrap" id="heroWrap"></div></div>
<main class="wrap" id="main"></main>
<footer></footer>
<div class="tip" id="tip" role="tooltip"></div>
`;

/* ---------- boot ---------- */
/* Loads every data/*.js (delaware.js first, as both HTML pages require) then
   app.js into one vm context around a fresh document, seeds localStorage if
   asked, and fires 'DOMContentLoaded' — exactly what the real pages do once
   their <script> tags finish loading. */
function bootApp(opts) {
  opts = opts || {};
  const page = opts.page === 'school' ? 'school' : 'hub';
  const doc = new DocumentImpl();
  doc.body.innerHTML = page === 'school' ? SCHOOL_BODY : HUB_BODY;

  const store = new Map();
  const localStorage = makeLocalStorage(store);
  if (opts.seedRatings) localStorage.setItem('college-pilot-ratings', JSON.stringify(opts.seedRatings));
  if (opts.seedLegacyRatings) localStorage.setItem('shortlist-ratings', JSON.stringify(opts.seedLegacyRatings));
  if (opts.seedRaw) for (const [k, v] of Object.entries(opts.seedRaw)) localStorage.setItem(k, v);

  const win = {};
  const location = {
    pathname: page === 'school' ? '/school.html' : '/index.html',
    search: opts.search || '',
    origin: 'http://localhost',
    get href() { return this.origin + this.pathname + this.search; },
    replace(url) { this._replacedTo = url; },
    reload() { this._reloaded = true; }
  };
  const navigator = { userAgent: 'node-test-shim' }; // no serviceWorker key: see header comment
  win.location = location;
  win.navigator = navigator;
  win.localStorage = localStorage;
  win.innerWidth = 1024;
  win.scrollY = 0;
  win.addEventListener = (type, fn) => { (win._listeners = win._listeners || {}, win._listeners[type] = win._listeners[type] || []).push(fn); };

  const sandbox = {
    window: win,
    document: doc,
    localStorage,
    location,
    navigator,
    console,
    URLSearchParams,
    CSS: { escape: cssEscape },
    setTimeout, clearTimeout,
    requestAnimationFrame: fn => setTimeout(fn, 0),
    getComputedStyle: () => ({ paddingTop: '0px', getPropertyValue() { return ''; } }),
    confirm: () => (opts.confirm === undefined ? true : opts.confirm),
    alert: () => { }
  };
  vm.createContext(sandbox);

  const files = h.dataFiles();
  const first = files.filter(f => f === 'delaware.js');
  const rest = files.filter(f => f !== 'delaware.js');
  for (const f of first.concat(rest)) vm.runInContext(h.read('data/' + f), sandbox, { filename: 'data/' + f });
  vm.runInContext(h.read('app.js'), sandbox, { filename: 'app.js' });

  doc.dispatchEvent(makeEvent('DOMContentLoaded'));

  return { sandbox, document: doc, window: win, localStorage, SCHOOLS: win.SCHOOLS || {}, ORDER: win.SCHOOL_ORDER || [] };
}

module.exports = { bootApp, parseHTML, makeEvent, cssEscape, DocumentImpl, Element, TextNode };
