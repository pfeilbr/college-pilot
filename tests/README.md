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

## Adding tests

`tests/harness.js` exposes `describe` / `test`, assertions (`ok`, `eq`, `deepEq`,
`match`, `includes`, `throws`, `fail`), and repo helpers (`read`, `exists`,
`dataFiles`, `loadSchools`, `parses`, `scriptSrcs`, `inlineScripts`).

`loadSchools()` evaluates every `data/*.js` in a `vm` sandbox with a fake
`window` and returns `{ SCHOOLS, ORDER }` — no browser needed.

Drop a new `tests/<name>.test.js` in this directory and the runner picks it up.
