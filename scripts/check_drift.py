#!/usr/bin/env python3
"""Drift checker for the College Pilot app.

`scripts/fetch_school_data.py` pulls official stats from the U.S. Dept. of
Education College Scorecard API into `data/generated/scorecard.json`, but
nothing loads that file at runtime -- the numbers shown in the app are
hand-transcribed from it into `data/<id>.js`'s `card` block (see CLAUDE.md,
"Refreshable stats vs. authored copy"). The two can drift apart silently.

This script cross-checks the authored `card` display strings in every
`data/<id>.js` against the official figures in `data/generated/scorecard.json`
and reports every mismatch beyond a per-field tolerance. It is deterministic,
Python 3 stdlib only, and never executes JS -- the `card` block is a flat
object literal, so a targeted regex extracts it as text.

Usage:
  python3 scripts/check_drift.py            # human-readable report
  python3 scripts/check_drift.py --quiet    # only problems + summary

Exit code: non-zero if any field drifts beyond tolerance, zero otherwise --
safe to wire into CI. Not every `card` field has a Scorecard equivalent (rank,
biz, greek, sports, deadlines, drive, placed, plus free-text type/blurb); this
script skips those explicitly and reports them as unchecked rather than
silently omitting them or claiming a pass.

The parsing/comparison functions below are plain, import-safe functions (no
work happens at import time) so they can be unit tested directly by importing
this module and calling e.g. check_drift.parse_percent(...) or
check_drift.check_school(...).
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)
DATA_DIR = os.path.join(REPO_ROOT, "data")
SCORECARD_PATH = os.path.join(REPO_ROOT, "data", "generated", "scorecard.json")
BASELINE_PATH = os.path.join(SCRIPT_DIR, "drift_baseline.json")

# `card` fields with no College Scorecard equivalent at all -- always
# reported as unchecked, never silently skipped.
NO_SCORECARD_EQUIVALENT = [
    "type", "blurb", "rank", "biz", "placed", "greek", "sports", "deadlines", "drive",
]

# Tolerances. These are different vintages (author-time copy vs. a July 2026
# Scorecard fetch) and different rounding conventions, so exact equality would
# flag near everything; too loose would never flag anything. Each is picked
# from what real drift in this repo's data actually looks like -- see
# scripts/check_drift.py's own test fixtures and CLAUDE.md's note.
ACCEPT_TOLERANCE_PTS = 1.5       # admit rate, percentage points
GRAD4_TOLERANCE_PTS = 1.0        # 6-yr grad rate, percentage points
SAT_TOLERANCE_PTS = 20           # SAT composite points, per bound
UNDERGRAD_REL_TOLERANCE = 0.05   # 5% relative
UNDERGRAD_MIN_ABS_TOLERANCE = 300
COST_REL_TOLERANCE = 0.03        # 3% relative
COST_MIN_ABS_TOLERANCE = 1500    # dollars

CARD_BLOCK_RE = re.compile(r"card:\s*\{(.*?)\}", re.DOTALL)
# key: 'single quoted' | "double quoted" value; values may contain escaped quotes.
PAIR_RE = re.compile(r"(\w+):\s*(?:'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\")")


# --------------------------------------------------------------------------
# Extraction -- read data/<id>.js as text, never execute it.
# --------------------------------------------------------------------------

def extract_card_block(js_text: str) -> Optional[str]:
    """Return the raw text inside `card: { ... }`, or None if not found."""
    m = CARD_BLOCK_RE.search(js_text)
    return m.group(1) if m else None


def parse_card_pairs(block_text: str) -> Dict[str, str]:
    """Parse a flat `key: 'value', key2: "value2"` block into a dict.

    Handles both quote styles and backslash-escaped quotes inside values
    (e.g. `biz: "D'Amore-McKim + co-op"`), and leaves unicode (en-dashes,
    fraction glyphs, thousands commas, `~`, `≈`) untouched in the value.
    """
    pairs: Dict[str, str] = {}
    for m in PAIR_RE.finditer(block_text):
        key = m.group(1)
        val = m.group(2) if m.group(2) is not None else m.group(3)
        val = val.replace("\\'", "'").replace('\\"', '"')
        pairs[key] = val
    return pairs


def load_card(school_id: str, data_dir: str = DATA_DIR) -> Optional[Dict[str, str]]:
    """Load and parse the `card` block for one school id, or None if the
    file or the card block doesn't exist."""
    path = os.path.join(data_dir, f"{school_id}.js")
    if not os.path.exists(path):
        return None
    with open(path, encoding="utf-8") as f:
        text = f.read()
    block = extract_card_block(text)
    if block is None:
        return None
    return parse_card_pairs(block)


# --------------------------------------------------------------------------
# Display-string parsers -- turn authored copy into comparable numbers.
# --------------------------------------------------------------------------

def parse_percent(s: str) -> Optional[float]:
    """'74.1%' -> 74.1; '~60% (37% Isenberg)' -> 60.0 (first % wins)."""
    m = re.search(r"(\d+(?:\.\d+)?)\s*%", s)
    return float(m.group(1)) if m else None


def parse_money_k(s: str) -> Optional[float]:
    """'$65.9K OOS' -> 65900.0; '≈$95K' -> 95000.0."""
    m = re.search(r"(\d+(?:\.\d+)?)\s*[Kk]", s)
    return float(m.group(1)) * 1000 if m else None


def parse_int_commas(s: str) -> Optional[int]:
    """'19,385' -> 19385."""
    m = re.search(r"(\d[\d,]*)", s)
    if not m:
        return None
    return int(m.group(1).replace(",", ""))


def parse_sat_range(s: str) -> Optional[Tuple[int, int]]:
    """'1220–1370' -> (1220, 1370). Accepts en-dash, em-dash, or hyphen."""
    m = re.search(r"(\d{3,4})\s*[-–—]\s*(\d{3,4})", s)
    if not m:
        return None
    return int(m.group(1)), int(m.group(2))


def cost_basis(s: str) -> str:
    """Classify which figure a `cost` string is quoting.

    Scorecard's `total_cost_academic_year` tracks resident/in-state cost of
    attendance (confirmed against this repo's own in-state-labeled cards --
    see CLAUDE.md drift note). There is no comparable Scorecard field for an
    out-of-state or "sticker price" total, so those bases are reported as
    unchecked rather than compared against the wrong number.
    """
    if "OOS" in s:
        return "out-of-state"
    if "in-state" in s.lower():
        return "in-state"
    return "full"


def is_six_year_labeled(s: str) -> bool:
    """Whether a grad-rate string is explicitly labeled 6-yr, e.g. '85.5% (6-yr)'."""
    return bool(re.search(r"6[\s-]?yr", s))


# --------------------------------------------------------------------------
# Comparison
# --------------------------------------------------------------------------

@dataclass
class Check:
    school: str
    field: str
    status: str  # 'ok' | 'drift' | 'unchecked'
    authored: str
    official: str
    delta: Optional[float]
    tolerance: Optional[float]
    note: str = ""


def _numeric_check(
    school: str,
    field: str,
    authored_val: Optional[float],
    authored_display: str,
    official_val: Optional[float],
    official_display: str,
    tolerance: Optional[float],
) -> Check:
    if authored_val is None or official_val is None or tolerance is None:
        return Check(
            school, field, "unchecked", authored_display, official_display, None, tolerance,
            "could not parse a comparable number from one side",
        )
    delta = abs(authored_val - official_val)
    status = "ok" if delta <= tolerance else "drift"
    return Check(school, field, status, authored_display, official_display, round(delta, 3), tolerance)


def check_school(school: str, card: Dict[str, str], official: Dict) -> List[Check]:
    """Run every drift check for one school's authored card vs. its official
    Scorecard record. Returns one Check per field considered, including
    fields that were explicitly (and honestly) left unchecked."""
    checks: List[Check] = []

    if "accept" in card:
        authored = parse_percent(card["accept"])
        off = official.get("admission_rate")
        off_pct = off * 100 if off is not None else None
        checks.append(_numeric_check(
            school, "accept", authored, card["accept"],
            off_pct, f"{off_pct:.2f}%" if off_pct is not None else "n/a",
            ACCEPT_TOLERANCE_PTS,
        ))

    if "sat" in card:
        rng = parse_sat_range(card["sat"])
        osat = official.get("sat_mid50")
        if rng and osat and len(osat) == 2:
            lo, hi = rng
            olo, ohi = osat
            checks.append(_numeric_check(school, "sat_low", lo, card["sat"], olo, str(olo), SAT_TOLERANCE_PTS))
            checks.append(_numeric_check(school, "sat_high", hi, card["sat"], ohi, str(ohi), SAT_TOLERANCE_PTS))
        else:
            checks.append(Check(
                school, "sat", "unchecked", card.get("sat", "n/a"), "n/a", None, None,
                "could not parse an SAT range from one side",
            ))

    if "undergrads" in card:
        authored = parse_int_commas(card["undergrads"])
        off = official.get("undergrad_size")
        tol = max(UNDERGRAD_MIN_ABS_TOLERANCE, UNDERGRAD_REL_TOLERANCE * off) if off is not None else None
        checks.append(_numeric_check(
            school, "undergrads", authored, card["undergrads"],
            off, str(off) if off is not None else "n/a", tol,
        ))

    if "grad4" in card:
        raw = card["grad4"]
        if is_six_year_labeled(raw):
            authored = parse_percent(raw)
            off = official.get("grad_rate_150pct")
            off_pct = off * 100 if off is not None else None
            checks.append(_numeric_check(
                school, "grad4", authored, raw,
                off_pct, f"{off_pct:.2f}%" if off_pct is not None else "n/a",
                GRAD4_TOLERANCE_PTS,
            ))
        else:
            checks.append(Check(
                school, "grad4", "unchecked", raw, "n/a", None, None,
                "not labeled 6-yr; Scorecard's grad_rate_150pct is a 6-yr rate, not apples-to-apples",
            ))

    if "cost" in card:
        raw = card["cost"]
        basis = cost_basis(raw)
        if basis == "in-state":
            authored = parse_money_k(raw)
            off = official.get("total_cost_academic_year")
            tol = max(COST_MIN_ABS_TOLERANCE, COST_REL_TOLERANCE * off) if off is not None else None
            checks.append(_numeric_check(
                school, "cost", authored, raw,
                off, f"${off:,.0f}" if off is not None else "n/a", tol,
            ))
        else:
            checks.append(Check(
                school, "cost", "unchecked", raw, "n/a", None, None,
                f"{basis} cost has no comparable Scorecard field "
                "(total_cost_academic_year tracks in-state COA only)",
            ))

    for field in NO_SCORECARD_EQUIVALENT:
        if field in card:
            checks.append(Check(
                school, field, "unchecked", card[field], "n/a", None, None,
                "no Scorecard equivalent field",
            ))

    return checks


def load_baseline(path: str = BASELINE_PATH) -> Dict:
    """Reviewed, accepted differences. Missing or unreadable file = no waivers."""
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, ValueError):
        return {}
    return {k: v for k, v in data.items() if k != "_meta"}


def apply_baseline(checks: List[Check], baseline: Dict) -> List[Check]:
    """Downgrade a drift finding to 'accepted' only when a baseline entry pins
    BOTH the authored and the official string it was reviewed against. If either
    side has changed since, the waiver no longer applies and the drift stands --
    so an entry here can never mask a later edit or a fresher data pull.
    """
    out: List[Check] = []
    for c in checks:
        entry = baseline.get(c.school, {}).get(c.field) if c.status == "drift" else None
        if (
            entry
            and entry.get("authored") == c.authored
            and entry.get("official") == c.official
        ):
            out.append(Check(
                c.school, c.field, "accepted", c.authored, c.official, c.delta,
                c.tolerance, entry.get("reason", "(no reason recorded)"),
            ))
        else:
            out.append(c)
    return out


def run_all(data_dir: str = DATA_DIR, scorecard_path: str = SCORECARD_PATH) -> List[Check]:
    with open(scorecard_path, encoding="utf-8") as f:
        scorecard = json.load(f)

    school_ids = sorted(k for k in scorecard.keys() if k != "_meta")
    all_checks: List[Check] = []
    for school_id in school_ids:
        card = load_card(school_id, data_dir)
        if card is None:
            all_checks.append(Check(
                school_id, "(file)", "unchecked", "n/a", "n/a", None, None,
                "no data/<id>.js card block found for this school",
            ))
            continue
        all_checks.extend(check_school(school_id, card, scorecard[school_id]))
    return all_checks


# --------------------------------------------------------------------------
# Reporting
# --------------------------------------------------------------------------

def format_check(c: Check) -> str:
    tag = {"ok": "OK   ", "drift": "DRIFT", "unchecked": "SKIP ", "accepted": "KNOWN"}[c.status]
    if c.status == "unchecked":
        return f"[{tag}] {c.school:<15} {c.field:<12} {c.authored!r:<28} -- {c.note}"
    if c.status == "accepted":
        return (
            f"[{tag}] {c.school:<15} {c.field:<12} "
            f"authored={c.authored!r:<20} official={c.official!r:<14} "
            f"delta={c.delta:<8} -- {c.note}"
        )
    return (
        f"[{tag}] {c.school:<15} {c.field:<12} "
        f"authored={c.authored!r:<20} official={c.official!r:<14} "
        f"delta={c.delta:<8} tol={c.tolerance}"
    )


def print_report(checks: List[Check], quiet: bool = False) -> int:
    drift = [c for c in checks if c.status == "drift"]
    ok = [c for c in checks if c.status == "ok"]
    unchecked = [c for c in checks if c.status == "unchecked"]
    accepted = [c for c in checks if c.status == "accepted"]

    if not quiet:
        print("College Pilot drift check -- authored card vs. data/generated/scorecard.json")
        print("=" * 78)
        for c in checks:
            if c.status not in ("unchecked", "accepted"):
                print(format_check(c))
        if accepted:
            print()
            print("Known differences (reviewed, recorded in scripts/drift_baseline.json):")
            for c in accepted:
                print(format_check(c))
        if unchecked:
            print()
            print("Unchecked (no apples-to-apples Scorecard comparison available):")
            for c in unchecked:
                print(format_check(c))
    else:
        for c in drift:
            print(format_check(c))

    print()
    status = "FAIL" if drift else "CLEAN"
    print(
        f"SUMMARY: {status} -- {len(ok)} ok, {len(drift)} drift, "
        f"{len(accepted)} known, {len(unchecked)} unchecked, "
        f"{len(checks)} total checks considered"
    )
    return 1 if drift else 0


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0] if __doc__ else "")
    parser.add_argument(
        "--quiet", action="store_true",
        help="only print drift findings and the summary line",
    )
    parser.add_argument(
        "--strict", action="store_true",
        help="ignore scripts/drift_baseline.json and report every difference",
    )
    args = parser.parse_args(argv)

    checks = run_all()
    if not args.strict:
        checks = apply_baseline(checks, load_baseline())
    return print_report(checks, quiet=args.quiet)


if __name__ == "__main__":
    sys.exit(main())
