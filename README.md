# University of Delaware — Campus Visit Guide

A single-page web app with key facts for a University of Delaware campus visit:
admissions stats, costs, the Lerner College of Business, pros & cons, common
criticisms, campus/location info, and local attractions in Newark, DE.

**Live site:** https://pfeilbr.github.io/university-of-delaware-app/

## Features

- 📊 Admissions stats, acceptance rate, test scores, rankings
- 💰 Cost of attendance (in-state vs. out-of-state), scholarships, aid
- 💼 Alfred Lerner College of Business & Economics overview
- ⚖️ Honest pros & cons drawn from student reviews and public data
- 📍 Location, visit logistics, and local attractions
- 📱 Responsive design; installable as a home-screen app (PWA with offline support)

## Tech

Static single-page app — plain HTML/CSS/JS, no build step. Deployed to GitHub
Pages via GitHub Actions. Data compiled from public sources (University of
Delaware, U.S. News, Niche, College Scorecard, Common Data Set) as of July 2026 —
verify current figures with official sources before making decisions.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```
