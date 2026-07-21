#!/usr/bin/env python3
"""Deterministic school-stats fetcher for the Shortlist app.

Pulls official data from the U.S. Dept. of Education College Scorecard API
(https://collegescorecard.ed.gov/data/api-documentation/) for every school in
SCHOOLS below and writes data/generated/scorecard.json. No LLM involved —
run it any time to refresh stats or after adding a school's IPEDS UnitID.

Usage:
  python3 scripts/fetch_school_data.py            # uses DEMO_KEY (rate-limited)
  API_KEY=yourkey python3 scripts/fetch_school_data.py   # free key: api.data.gov/signup

The app's authored guides (data/*.js) hold editorial content; this file holds
refreshable official stats. Add a school: (1) add its UnitID here, (2) run this,
(3) copy an existing data/*.js as a template and fill in editorial sections.
"""
import json
import os
import ssl
import sys
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

# IPEDS UnitIDs (find any school's at https://nces.ed.gov/collegenavigator/)
SCHOOLS = {
    "delaware": 130943,
    "villanova": 216597,
    "pennstate": 214777,   # University Park
    "pitt": 215293,        # Pittsburgh campus
    "umass": 166629,       # Amherst
    "fordham": 191241,
    "northeastern": 167358,
    "tufts": 168148,
    "bu": 164988,
}

FIELDS = [
    "id", "school.name", "school.city", "school.state",
    "latest.admissions.admission_rate.overall",
    "latest.admissions.sat_scores.25th_percentile.critical_reading",
    "latest.admissions.sat_scores.75th_percentile.critical_reading",
    "latest.admissions.sat_scores.25th_percentile.math",
    "latest.admissions.sat_scores.75th_percentile.math",
    "latest.student.size",
    "latest.student.demographics.men",
    "latest.student.demographics.women",
    "latest.student.demographics.race_ethnicity.white",
    "latest.student.demographics.race_ethnicity.black",
    "latest.student.demographics.race_ethnicity.hispanic",
    "latest.student.demographics.race_ethnicity.asian",
    "latest.student.demographics.race_ethnicity.two_or_more",
    "latest.student.demographics.race_ethnicity.non_resident_alien",
    "latest.cost.tuition.in_state",
    "latest.cost.tuition.out_of_state",
    "latest.cost.roomboard.oncampus",
    "latest.cost.attendance.academic_year",
    "latest.cost.avg_net_price.overall",
    "latest.cost.net_price.public.by_income_level.0-30000",
    "latest.cost.net_price.public.by_income_level.30001-48000",
    "latest.cost.net_price.public.by_income_level.48001-75000",
    "latest.cost.net_price.public.by_income_level.75001-110000",
    "latest.cost.net_price.public.by_income_level.110001-plus",
    "latest.cost.net_price.private.by_income_level.0-30000",
    "latest.cost.net_price.private.by_income_level.30001-48000",
    "latest.cost.net_price.private.by_income_level.48001-75000",
    "latest.cost.net_price.private.by_income_level.75001-110000",
    "latest.cost.net_price.private.by_income_level.110001-plus",
    "latest.aid.median_debt.completers.overall",
    "latest.aid.pell_grant_rate",
    "latest.completion.completion_rate_4yr_150nt",
    "latest.student.retention_rate.four_year.full_time",
    "latest.earnings.10_yrs_after_entry.median",
]


def fetch(url: str) -> dict:
    ctx = ssl.create_default_context()
    bundle = os.environ.get("SSL_CERT_FILE") or "/root/.ccr/ca-bundle.crt"
    if os.path.exists(bundle):
        ctx.load_verify_locations(bundle)
    with urllib.request.urlopen(url, context=ctx, timeout=60) as r:
        return json.load(r)


def main() -> int:
    api_key = os.environ.get("API_KEY", "DEMO_KEY")
    ids = ",".join(str(v) for v in SCHOOLS.values())
    url = (
        "https://api.data.gov/ed/collegescorecard/v1/schools?"
        + urllib.parse.urlencode({
            "api_key": api_key,
            "id__range": None,  # placeholder removed below
        })
    )
    # build query properly (id__in filter + selected fields)
    q = urllib.parse.urlencode({
        "api_key": api_key,
        "id": ids,          # comma list is accepted as OR filter
        "fields": ",".join(FIELDS),
        "per_page": 100,
    })
    url = "https://api.data.gov/ed/collegescorecard/v1/schools?" + q
    data = fetch(url)
    results = data.get("results", [])
    if not results:
        print("No results — check API key / UnitIDs", file=sys.stderr)
        return 1

    by_unitid = {r["id"]: r for r in results}
    out = {
        "_meta": {
            "source": "U.S. Dept. of Education College Scorecard API",
            "fetched": date.today().isoformat(),
            "note": "Refresh with scripts/fetch_school_data.py — deterministic, no LLM.",
        }
    }
    for key, unitid in SCHOOLS.items():
        r = by_unitid.get(unitid)
        if not r:
            print(f"WARN: no result for {key} ({unitid})", file=sys.stderr)
            continue
        g = lambda f: r.get(f)
        sat25 = (g("latest.admissions.sat_scores.25th_percentile.critical_reading") or 0) + \
                (g("latest.admissions.sat_scores.25th_percentile.math") or 0)
        sat75 = (g("latest.admissions.sat_scores.75th_percentile.critical_reading") or 0) + \
                (g("latest.admissions.sat_scores.75th_percentile.math") or 0)
        np_pub = {b: g(f"latest.cost.net_price.public.by_income_level.{b}") for b in
                  ["0-30000", "30001-48000", "48001-75000", "75001-110000", "110001-plus"]}
        np_priv = {b: g(f"latest.cost.net_price.private.by_income_level.{b}") for b in
                   ["0-30000", "30001-48000", "48001-75000", "75001-110000", "110001-plus"]}
        net_by_income = np_priv if any(v for v in np_priv.values()) else np_pub
        out[key] = {
            "unitid": unitid,
            "name": g("school.name"),
            "city": f"{g('school.city')}, {g('school.state')}",
            "admission_rate": g("latest.admissions.admission_rate.overall"),
            "sat_mid50": [sat25 or None, sat75 or None],
            "undergrad_size": g("latest.student.size"),
            "pct_women": g("latest.student.demographics.women"),
            "pct_men": g("latest.student.demographics.men"),
            "race_ethnicity": {
                "white": g("latest.student.demographics.race_ethnicity.white"),
                "hispanic": g("latest.student.demographics.race_ethnicity.hispanic"),
                "black": g("latest.student.demographics.race_ethnicity.black"),
                "asian": g("latest.student.demographics.race_ethnicity.asian"),
                "two_or_more": g("latest.student.demographics.race_ethnicity.two_or_more"),
                "international": g("latest.student.demographics.race_ethnicity.non_resident_alien"),
            },
            "tuition_in_state": g("latest.cost.tuition.in_state"),
            "tuition_out_of_state": g("latest.cost.tuition.out_of_state"),
            "roomboard": g("latest.cost.roomboard.oncampus"),
            "total_cost_academic_year": g("latest.cost.attendance.academic_year"),
            "avg_net_price": g("latest.cost.avg_net_price.overall"),
            "net_price_by_income": net_by_income,
            "median_debt_completers": g("latest.aid.median_debt.completers.overall"),
            "pell_rate": g("latest.aid.pell_grant_rate"),
            "grad_rate_150pct": g("latest.completion.completion_rate_4yr_150nt"),
            "retention_full_time": g("latest.student.retention_rate.four_year.full_time"),
            "median_earnings_10yr": g("latest.earnings.10_yrs_after_entry.median"),
        }

    dest = Path(__file__).resolve().parent.parent / "data" / "generated" / "scorecard.json"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(out, indent=2) + "\n")
    print(f"Wrote {dest} ({len(out) - 1} schools)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
