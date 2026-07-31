# Tests

Zero-dependency test suite — Node stdlib only, matching the repo's no-build rule.

```sh
node tests/run.js          # run everything
node tests/run.js sync     # run only suites/tests whose name contains "sync"
```

Exits non-zero on any failure, so it works as a pre-push check.

## What's covered

| File | Guards |
| --- | --- |
| `data-contract.test.js` | Every `data/<id>.js` matches the contract in CLAUDE.md — identity fields, hex accent colors, the flat `card` block that feeds both the hub cards and the compare table, drawer `contact` links, and the shared 12-section spine. Also checks section HTML for unbalanced tags and non-https / missing-`noopener` external links. |
| `sync.test.js` | The "adding a school touches seven places" gotcha: `SCHOOL_ORDER`, the `<script>` lists in both HTML pages, `sw.js` `ASSETS`, the Aid Estimator `DATA` array, the IPEDS ids in the fetcher, and school-count copy. Also that `APP_VERSION` (app.js) and `CACHE` (sw.js) are bumped together. |
| `integrity.test.js` | Everything parses, every referenced file exists, in-page anchors resolve, both pages expose the ids `app.js` renders into, the manifest is valid, CSS braces balance, and every class `app.js` emits actually exists in `styles.css`. |
| `app-render.test.js` | **Behavioral**, not static — boots `app.js` for real (see below) and exercises the hub renderer, the Decision Board ranking, `avgStars`, the legacy-key ratings migration, and the school-page renderer. |

Every file above except `app-render.test.js` works by reading source as text
(`read`, regex, `JSON.parse`) — it never executes `app.js`. `app-render.test.js`
is the exception: it actually runs the app's renderers and asserts on their
output.

## Adding *static* tests

`tests/harness.js` exposes `describe` / `test`, assertions (`ok`, `eq`, `deepEq`,
`match`, `includes`, `throws`, `fail`), and repo helpers (`read`, `exists`,
`dataFiles`, `loadSchools`, `parses`, `scriptSrcs`, `inlineScripts`).

`loadSchools()` evaluates every `data/*.js` in a `vm` sandbox with a fake
`window` and returns `{ SCHOOLS, ORDER }` — no browser needed.

Drop a new `tests/<name>.test.js` in this directory and the runner picks it up.

## Adding *behavioral* tests (booting app.js)

`tests/dom.js` is a from-scratch, Node-stdlib-only DOM + browser shim — no
jsdom, no headless browser. It boots `app.js` in a `vm` sandbox around a
lightweight node tree that models just enough of `document`/`window`/
`location`/`navigator`/`localStorage` for the real renderers to run. Read its
header comment before relying on it — it's explicit about what it fakes
(a pragmatic HTML tag-scanner, a descendant-combinator-only selector engine)
and what it flatly doesn't model (layout/geometry, entity decoding, service
worker/clipboard/share, event bubbling). If a test needs more fidelity than
the shim honestly provides, assert less — don't extend the shim to fake a
pass.

The one entry point is `bootApp(opts)`:

```js
const { bootApp } = require('./dom');

const { document, window, localStorage, SCHOOLS, ORDER } = bootApp({
  page: 'hub',                    // 'hub' (index.html) or 'school' (school.html)
  search: '?s=pennstate',         // location.search, read by renderSchool()
  seedRatings: { pitt: { status: 'love', stars: { 'Location': 5 }, note: '' } },
  seedLegacyRatings: { ... },     // seeds the old 'shortlist-ratings' key, pre-migration
  confirm: true                   // what window.confirm() returns if a test clicks a confirm-guarded button
});
```

It loads every `data/*.js` (delaware.js first, exactly like both HTML pages
require) and then `app.js`, fires `DOMContentLoaded` — which is what actually
triggers `renderHub()` / `renderSchool()` — and hands back the live
`document` to query and click against with real `querySelector`/
`addEventListener`/`dispatchEvent`. Each call to `bootApp()` is a fresh,
isolated sandbox: no state leaks between tests.
