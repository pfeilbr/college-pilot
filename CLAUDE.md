# CLAUDE.md

Guidance for working in this repo.

## What this is

**College Pilot** — a static, zero-build, zero-dependency PWA that helps one family
narrow a multi-school college list to a single choice. No `package.json`, no
bundler, no framework. Just HTML/CSS/vanilla JS served as files.

- **Live:** https://pfeilbr.github.io/college-pilot/
- **Run locally:** `python3 -m http.server 8000` then open http://localhost:8000
- **Test:** `node tests/run.js` (no install step — Node stdlib only)
- **Deploy:** pushing to `main` or `claude/session-wvyudu` triggers
  [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml), which
  publishes the repo root to the `gh-pages` branch.

## Layout

```
index.html        Hub: Decision Board, Aid Estimator, school cards, compare table
school.html       Empty shell — app.js renders any school into it from ?s=<id>
app.js            The whole app: drawer, theme, renderer, ratings store, spy, tooltips
styles.css        Design system; per-school accent color via the --sc CSS var
data/<id>.js      One authored guide per school; registers window.SCHOOLS[<id>]
data/generated/   Machine-fetched official stats (author-time reference, see below)
scripts/          Deterministic Python data fetcher (stdlib only, no deps)
tests/            `node tests/run.js` — zero-dep suite guarding the contract + sync points
sw.js             Service worker: network-first with cache fallback, explicit asset list
```

## The data contract (the important part)

Each `data/<id>.js` assigns `window.SCHOOLS['<id>']` an object with:

- identity + `colors: { sc, scDark }` (drives the whole page's accent)
- `heroTitle` / `heroSub` / `heroStats` / `locChip` / `visitCard`
- `card` — a flat block of short strings that feeds **both** the hub card and the
  compare-table rows in [app.js](app.js) (`renderHub`)
- `contact` — maps/tel/email/tour/site links for the drawer
- `sections: [{ id, nav, kicker, title, lead, html }]` — the renderer builds the
  nav pills and the page body from whatever sections exist
  ([app.js:186](app.js:186)). All schools currently share the same 12-section
  spine (overview, admissions, costs, business, outcomes, studentlife, proscons,
  criticisms, visit, nearby, timeline, sources) — that uniformity is what makes
  the side-by-side comparison meaningful, so keep it when adding a school.

`section.html` is raw HTML injected via `innerHTML`. This is a single-user,
static, no-user-input-rendered-back app, so that's acceptable here — but never
inject fetched or user-supplied strings into it.

`window.SCHOOL_ORDER` (an array of ids) controls display order everywhere. It
lives, oddly, inside [data/delaware.js](data/delaware.js) — that file must load
first, which it does in both HTML files' script lists.

## State

`localStorage` only, key `college-pilot-ratings`. Per school: a verdict
(`love`/`maybe`/`pass`), 8 category star ratings, and a free-text note. The
Decision Board ([app.js](app.js) `renderBoard`) ranks by verdict then star
average. Nothing is ever uploaded. There's a one-time migration from the old
`shortlist-ratings` key near the top of app.js.

## Refreshable stats vs. authored copy

`scripts/fetch_school_data.py` pulls ~35 fields per school from the U.S. Dept. of
Education **College Scorecard API** (by IPEDS UnitID) into
`data/generated/scorecard.json`. Run it any time to refresh:

```sh
python3 scripts/fetch_school_data.py            # DEMO_KEY, rate-limited
API_KEY=... python3 scripts/fetch_school_data.py  # free key from api.data.gov/signup
```

**Important:** nothing loads `scorecard.json` at runtime — it's author-time
reference only. The numbers shown in the app are hand-transcribed from it into
`data/<id>.js`, so the two can drift. When you refresh stats, also update the
prose/figures in the affected `data/<id>.js` files.

`scripts/check_drift.py` finds that drift for you: it parses each
`data/<id>.js` `card` block (regex, no JS execution) and cross-checks it
against `scorecard.json` within a per-field tolerance, printing a
school/field/authored/official/delta report and exiting non-zero on any real
mismatch — `python3 scripts/check_drift.py` (`--quiet` for problems only).
Many `card` fields (`rank`, `biz`, `greek`, etc.) and non-apples-to-apples
figures (e.g. an unlabeled grad rate) have no safe Scorecard equivalent; it
says so explicitly rather than silently skipping or false-passing them.

## Common gotchas

- **Version is manual and duplicated.** Bump `APP_VERSION` in [app.js](app.js)
  **and** `CACHE` in [sw.js](sw.js) together on any user-facing change, or the
  drawer's "Update app" button and the SW cache will disagree.
- **Adding/removing a school touches many places.** For each school id you must
  keep these in sync:
  1. `data/<id>.js` (the guide file)
  2. `window.SCHOOL_ORDER` in [data/delaware.js](data/delaware.js)
  3. `<script src="data/<id>.js">` in **both** [index.html](index.html) and
     [school.html](school.html)
  4. `sw.js` `ASSETS` list
  5. the Aid Estimator `DATA` array in the inline `<script>` at the bottom of
     [index.html](index.html)
  6. the school's IPEDS UnitID in `scripts/fetch_school_data.py`
  7. school-count copy: the hero in [index.html](index.html) and phrases like
     "the nine" / "of the nine" in the guide files (grep for the number word)
- **Run `node tests/run.js` before and after any change.** Zero-dependency, Node
  stdlib only, no CI beyond the Pages deploy. It enforces every rule on this page
  — the data contract, all seven sync points above, and the `APP_VERSION`/`CACHE`
  pairing — so a drifted school list fails loudly instead of silently rendering a
  half-broken page. `tests/app-render.test.js` boots `app.js` for real against the
  `tests/dom.js` shim and exercises the Decision Board ranking and both renderers.
  See [tests/README.md](tests/README.md). Still verify UI changes in a browser —
  the shim models no layout or geometry.
