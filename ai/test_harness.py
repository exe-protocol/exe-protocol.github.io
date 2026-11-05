"""Harness checks (SPEC.md step 2). Run: cd ai && python3 -m pytest -q"""
import json
import pathlib

import numpy as np
import pytest

import harness as H

DEMO = pathlib.Path(__file__).resolve().parent.parent / "engine" / "outputs" / "demo_data.json"


@pytest.fixture(scope="module")
def base():
    return H.evaluate(H.baseline_scorer)


@pytest.fixture(scope="module")
def naive():
    return H.evaluate(H.naive_scorer)


def test_baseline_reproduces_engine_outputs(base):
    """With the assumed scores the harness gives the engine's own published stress results, scenario by scenario."""
    demo = {s["key"]: s["series"] for s in json.loads(DEMO.read_text())["stress"]}
    assert set(demo) == set(base)
    for key, series in demo.items():
        gen = sum(m["genuine_relief"] for m in series) / sum(m["genuine_fees"] for m in series)
        assert base[key]["genuine_redemption"] == pytest.approx(gen, rel=1e-9), key
        assert base[key]["pool_min"] == pytest.approx(min(m["sp_end"] for m in series), rel=1e-9), key
        if key != "whales" and base[key]["attacker_recovery"] is not None:      # demo counts whales as attackers
            att = sum(m["attacker_relief"] for m in series) / sum(m["attacker_fees"] for m in series)
            assert base[key]["attacker_recovery"] == pytest.approx(att, rel=1e-9), key


def test_headline_figures(base):
    assert round(100 * base["base"]["genuine_redemption"], 1) == 42.1
    assert round(100 * base["bots_undetected"]["attacker_recovery"], 1) == 22.5
    assert all(r["pool_min"] > 0 for r in base.values())            # 9 of 9


def test_baseline_passes_its_own_gates(base):
    ok, _ = H.gates(base, base)
    assert ok


def test_naive_scorer_fails(base, naive):
    ok, rows = H.gates(naive, base)
    assert not ok
    failed = {k for k, _ok, checks, _r, _b in rows for g, v in checks.items() if not v and (k, g)}
    assert "bots_undetected" in failed and "base" in failed           # lets bots in; inflates everyone (G7)


def test_scorer_never_sees_cohort():
    _k, _t, parts, _kw, _c = H.scenarios()[4]
    view = H.view_of(parts)
    assert "cohort" not in view
    assert not any(isinstance(v, np.ndarray) and v.dtype == object for v in view.values())


def test_bots_take_almost_nothing_from_the_pool(base):
    """Bots' relief is their own fees coming back; the farm's pool take is the real cost to others."""
    assert base["bots_undetected"]["attacker_take_ratio"] < 0.001
    assert base["farm"]["attacker_take_ratio"] == pytest.approx(0.616, abs=0.001)
