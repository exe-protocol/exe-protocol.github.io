"""Exe AI harness (SPEC.md section 8, build step 2). Simulated.

Feeds any scorer's Signal Scores and detection flags into the engine's nine stress scenarios, in place of the scores
each scenario assumes, and reports gates G1-G6 against the baseline (the assumed scores).

The engine is not modified. Scenarios are rebuilt exactly as engine/run_demo_data.stress() builds them (same seeds,
same draw order); test_harness.py checks the baseline reproduces engine/outputs/demo_data.json.

A scorer is a function  scorer(view) -> (score, flagged)  where `view` holds only what a scorer could observe about
each wallet. It never sees the cohort label (genuine / bot / farm / whale): that is kept for reporting only.

    python3 ai/harness.py                 # baseline and the naive scorer, gate report
"""
from __future__ import annotations

import json
import pathlib
import sys

import numpy as np

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "engine"))

from exe_engine import Scenario, run                                    # noqa: E402
from exe_engine.policy import APPROVED, for_chain                       # noqa: E402
from exe_engine.population import BOT_PROFILES                          # noqa: E402
from run_demo_data import CHAINS, MONTHS, TRADE, _part, _pop, genuine   # noqa: E402

ATTACKERS = ("bot", "farm")          # cohorts that attack the pool (whales are reported, not counted as attackers)
SP0, SDK = 1_500_000.0, 150_000.0
CALIBRATION_TOL = 0.02              # G7: genuine mean score within 0.02 of the reference (no passing by inflating scores)
BASELINE_FILE = pathlib.Path(__file__).parent / "baseline.json"


# --------------------------------------------------------------------------- scenarios (as run_demo_data.stress)
def scenarios():
    """The nine stress scenarios: (key, title, parts, scenario kwargs, chain). Same seeds and draw order as the engine."""
    gas, eth_gas = 0.01, 5.0
    g, g_eth = genuine(gas), genuine(eth_gas)
    rng = np.random.default_rng(7)

    def bots(n, profile, mult=10.0, trade=100.0, tier=1, flagged=False, age=24):
        a, b = BOT_PROFILES[profile]
        return _part(rng.beta(a, b, n), tier, rng.poisson(300.0 * mult / 10.0, n), gas, trade, "bot", flagged, age)

    idx = np.random.default_rng(3).choice(len(g["score"]), 150, replace=False)
    whales = {k: v.copy() for k, v in g.items()}
    whales["actions"][idx] = 3000.0
    whales["score"][idx] = np.maximum(whales["score"][idx], 0.30)
    whales["cohort"][idx] = "whale"
    farm = _part(np.full(10_000, 0.5058), 2, 30.0, gas, TRADE, "farm")
    new_farm = _part(np.full(20_000, 0.75), 1, 60.0, eth_gas, TRADE, "farm", age=0)
    rev_shock = [SDK] * 6 + [0.0] * 18
    emergency = [0.0] * 6 + [0.9] * 3 + [0.0] * 15
    return [
        ("base", "Base", [g], {}, "cheap"),
        ("demand10", "10x demand", [g], dict(demand_mult=10), "cheap"),
        ("revshock", "Other apps' fees stop", [g], dict(revenue_by_month=rev_shock), "cheap"),
        ("emergency", "Emergency pause", [g], dict(anomaly_by_month=emergency), "cheap"),
        ("bots_undetected", "Undetected bots", [g, bots(30_000, "adaptive")], {}, "cheap"),
        ("bots_detected", "Detected bots", [g, bots(30_000, "adaptive", flagged=True)], dict(anomaly=0.6), "cheap"),
        ("whales", "Whales", [whales], {}, "cheap"),
        ("farm", "Farm of 10,000 wallets", [g, farm], {}, "cheap"),
        ("new_farm", "20,000 new wallets (Ethereum)", [g_eth, new_farm], {}, "ethereum"),
    ]


# --------------------------------------------------------------------------- scorers
def view_of(parts):
    """What a scorer may observe, per wallet. `assumed_score` and `assumed_flag` stand in for behaviour until step 3
    adds event histories; a real scorer will not have them."""
    cat = {k: np.concatenate([p[k] for p in parts]) for k in parts[0]}
    return dict(actions=cat["actions"], trade=cat["trade"], age=cat["age"], tier=cat["tier"],
                committed=cat["committed"], assumed_score=cat["score"], assumed_flag=cat["flagged"])


def baseline_scorer(view):
    """Today's assumptions: the scores and flags each scenario writes in."""
    return view["assumed_score"].copy(), view["assumed_flag"].copy()


def naive_scorer(view):
    """A deliberately bad scorer: everyone gets the same score, nobody is flagged. It cannot tell bots from people."""
    n = len(view["actions"])
    return np.full(n, 0.50), np.zeros(n, bool)


# --------------------------------------------------------------------------- one scenario
def gini(x):
    x = np.sort(np.asarray(x, float))
    if x.sum() == 0:
        return 0.0
    n = len(x)
    return float((2 * np.arange(1, n + 1) - n - 1).dot(x) / (n * x.sum()))


def run_scenario(key, parts, kw, chain, scorer):
    kw = dict(kw)
    view = view_of(parts)
    score, flagged = scorer(view)
    score = np.clip(np.asarray(score, float), 0.0, APPROVED.xpr_max)
    flagged = np.asarray(flagged, bool)
    scored = [dict(p) for p in parts]
    i = 0
    for p in scored:                                   # write the scorer's output back into each part
        n = len(p["score"])
        p["score"], p["flagged"] = score[i:i + n], flagged[i:i + n]
        i += n
    pop = _pop(scored, volume_mult=kw.get("demand_mult", 1.0))
    pol = for_chain(APPROVED, CHAINS[chain][2])
    r = run(pop, Scenario(key, MONTHS, sp0=SP0, revenue=SDK, seed=1, **kw), policy=pol)

    coh = pop.cohort.astype(str)
    relief = sum(e.users["coverage"] for e in r.epochs)
    fees = sum(e.users["fee_total"] for e in r.epochs)
    pool_take = sum(e.users["shared"] for e in r.epochs)              # relief paid from the shared pool (others' money)
    pool_in = r.params.phi_sp * sum(e.users["exe_fee"] for e in r.epochs)   # 70% of the wallet's protocol fees
    gen, att = coh == "genuine", np.isin(coh, ATTACKERS)
    top_n = max(1, int(round(0.01 * len(relief))))
    out = dict(
        genuine_redemption=float(relief[gen].sum() / fees[gen].sum()),
        attacker_recovery=float(relief[att].sum() / fees[att].sum()) if att.any() else None,
        attacker_pool_take=float(pool_take[att].sum()) if att.any() else None,
        attacker_pool_in=float(pool_in[att].sum()) if att.any() else None,
        attacker_take_ratio=float(pool_take[att].sum() / pool_in[att].sum()) if att.any() else None,
        genuine_mean_score=float(score[gen].mean()),
        whale_recovery=float(relief[coh == "whale"].sum() / fees[coh == "whale"].sum()) if (coh == "whale").any() else None,
        pool_min=float(min(e.sp_end for e in r.epochs)),
        reach=float((relief[gen] > 0).mean()),
        gini=gini(relief[gen]),
        top1_share=float(np.sort(relief)[::-1][:top_n].sum() / relief.sum()) if relief.sum() else 0.0,
        attackers_below_genuine_median=float((score[att] < np.median(score[gen])).mean()) if att.any() else None,
        attackers_flagged=float(flagged[att].mean()) if att.any() else None,
        score_change_max=0.0,      # scores are constant within a run until step 3 adds behaviour paths (gate G6)
        has_reasons=False,         # gate G5: set by scorers that return reason codes (step 5)
    )
    return out


def evaluate(scorer):
    return {key: run_scenario(key, parts, kw, chain, scorer) for key, _t, parts, kw, chain in scenarios()}


# --------------------------------------------------------------------------- gates
def gates(result, base):
    """G1-G4 against the baseline; G5 and G6 are reported (they bind from steps 5 and 3)."""
    rows, ok_all = [], True
    for key, r in result.items():
        b = base[key]
        checks = {
            "G1 genuine": r["genuine_redemption"] >= b["genuine_redemption"] - 1e-9,
            "G2 attackers": (r["attacker_recovery"] is None or
                             (r["attacker_recovery"] <= b["attacker_recovery"] + 1e-9 and r["attacker_recovery"] < 1.0)),
            "G2b net drain": (r["attacker_take_ratio"] is None or
                              (r["attacker_take_ratio"] <= b["attacker_take_ratio"] + 1e-9 and r["attacker_take_ratio"] < 1.0)),
            "G3 solvency": r["pool_min"] > 0,
            "G4 breadth": (r["reach"] >= b["reach"] - 1e-9 and r["gini"] <= b["gini"] + 1e-9
                           and r["top1_share"] <= b["top1_share"] + 1e-9),
            "G7 calibration": abs(r["genuine_mean_score"] - b["genuine_mean_score"]) <= CALIBRATION_TOL,
        }
        ok = all(checks.values())
        ok_all &= ok
        rows.append((key, ok, checks, r, b))
    return ok_all, rows


def pct(x):
    return "   -  " if x is None else f"{100 * x:5.1f}%"


def report(name, result, base):
    ok_all, rows = gates(result, base)
    print(f"\n{name}: {'PASS' if ok_all else 'FAIL'}   (simulated)")
    print(f"  {'scenario':16} {'genuine':>8} {'base':>7} {'attacker':>9} {'base':>7} {'pool take':>9} {'base':>7} "
          f"{'pool min $':>12} {'gini':>5}  failed")
    for key, ok, checks, r, b in rows:
        failed = ", ".join(k for k, v in checks.items() if not v) or "-"
        print(f"  {key:16} {pct(r['genuine_redemption'])}  {pct(b['genuine_redemption'])} {pct(r['attacker_recovery'])}  "
              f"{pct(b['attacker_recovery'])} {pct(r['attacker_take_ratio'])}  {pct(b['attacker_take_ratio'])} "
              f"{r['pool_min']:12,.0f} {r['gini']:5.2f}  {failed}")
    print("  attacker = all relief to bots and farms / their fees; pool take = relief they draw from the shared pool / "
          "70% of their own protocol fees")
    return ok_all


def main():
    base = evaluate(baseline_scorer)
    BASELINE_FILE.write_text(json.dumps(dict(label="SIMULATED - harness baseline (assumed scores), engine "
                                             "Master Doc Revision 010.6", scenarios=base), indent=1))
    report("Baseline (assumed scores)", base, base)
    report("Naive scorer (everyone 0.50, no detection)", evaluate(naive_scorer), base)


if __name__ == "__main__":
    main()
