# College Tours — Campus Visit Guides

A single-page web app with a full campus-visit guide for each school on the
college tour list: admissions stats, costs & aid, business programs, hiring
outcomes, student demographics, honest pros & cons (including real archived
Reddit sentiment), visit-day logistics, and nearby attractions.

**Live site:** https://pfeilbr.github.io/college-tours/

## Schools covered

- University of Delaware (Newark, DE)
- Northeastern University (Boston, MA)
- Fordham University (New York, NY)
- UMass Amherst (Amherst, MA)
- Tufts University (Medford/Somerville, MA)
- Boston University (Boston, MA)

## Features

- 🏠 Hub page with school cards and a side-by-side comparison table
- 📊 Per-school guides with identical sections for apples-to-apples comparison
- 💰 Cost-of-attendance charts, merit aid, debt & earnings data
- 💼 Business program deep-dives with per-major hiring rates and salaries
- 🧑‍🤝‍🧑 Official demographics (gender, ethnicity) from each Common Data Set
- 🗣️ Real student sentiment from archived Reddit threads, clearly labeled
- 📍 Visit logistics: directions, parking, admissions contacts, campus stops
- 📱 Responsive PWA: installable to home screen, offline support, in-app updates

## Tech

Static site — plain HTML/CSS/JS, no build step. School content lives in
`data/*.js` files rendered by `app.js` into `school.html`. Deployed to GitHub
Pages via GitHub Actions (gh-pages branch). Data compiled from public sources
(each school's Common Data Set, admissions/financial-aid pages, U.S. News,
Niche, College Scorecard, Pullpush Reddit archive) as of July 2026 — verify
current figures with official sources before making decisions.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```
