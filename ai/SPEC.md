# Exe AI — Specification v0.2

**Status:** draft for review · 5 November 2026 (v0.2: gates G2b and G7 added after the step 2 harness run) · author: Claude, for David · reviewer: GPT
**Scope:** steps 1–7 of the build plan. Nothing here changes the economic engine.

---

## 1. Purpose

Exe AI produces each wallet's **Signal Score** from its behaviour.

The engine already takes a normalised Signal Score per wallet (0.00–1.10) as its input and derives XPR from it
(`engine/exe_engine/model.py`, `Population.score` / `score_path`; XPR = (1 − δ) × XPR_prev + δ × Score). Today those
scores are **assumptions** written into each scenario. In the stress tests, bots are given scores drawn from
Beta(2.2, 7.5) (mean ≈ 0.23), the 10,000-wallet farm is given 0.5058, and the "detected bots" case sets a `flagged`
mask by hand (`engine/run_demo_data.py`, `stress()`).

The headline results (genuine users' redemption 42.1%, undetected bots recovering 22.5% of their fees, the pool never
running dry in 9 of 9 tests) therefore rest on bots and farms *receiving* low scores. Exe AI's job is to **earn**
those scores from behaviour instead of assuming them, and to supply the `flagged` mask from its own detection.

North star: more wealth channelled back to more people, through a fair and equal opportunity to redeem fees through
the positive activity their data shows. Exe AI's primary reward function: **adding value for its users.**

## 2. The constitution (fixed)

- The engine, Master Doc Revision 010.6 (`policy.APPROVED`), is the constitution. Exe AI never changes fees, the
  redemption curve, tiers, caps, the pool split or allocation rules.
- Exe AI supplies two inputs per wallet per epoch: `score` (0.00–1.10) and `flagged` (bool). Nothing else.
- Exe AI may **flag evidence** that a rule underperforms (a report, not a change). Only David and Claude amend the
  constitution, through the existing revision and review process.
- Scoring runs offline, once per epoch. The payment-time path (0.054 ms fee-relief decision) is unchanged and stays
  deterministic.

## 3. The value function

Exe AI predicts each wallet's **net contribution (NC)** over a forward window, then maps NC to a Signal Score.

```
NC(w) = Direct(w) + Indirect(w) − Harm(w)        measured over the next H epochs, before redemption
```

| Term | v1 definition | Source |
|---|---|---|
| Direct | Protocol fees the wallet's activity pays (engine `exe_fee`), excluding gas, which is a pass-through | engine per-wallet output |
| Indirect | 0 in v1. Later: liquidity others trade against, wallets it brings in, retention | later data sources |
| Harm | Value taken from other participants: wash or self-trading, sandwich/MEV patterns, membership of a sybil cluster | detection features (§5) |

**Design rule: NC is measured before redemption.** Relief received must never reduce a wallet's NC. If it did, the
cheapest way for the AI to raise total NC would be to give everyone low scores, i.e. to redeem less. That is the
extractive failure in its plainest form. Redemption is the engine's job, given the score; the pool's limits (pool
ceiling, caps, the new-wallet limit, rationing) already live in the constitution.

*Correction to running-list point 4:* "minus what it draws from the pool" is replaced by this rule. A wallet's pool
draw enters only as a **detection signal**: a draw out of proportion to its genuine activity is a farming pattern
and feeds Harm, not a penalty on honest redemption.

**From NC to Score.** v1 maps NC to a score by percentile rank among active wallets, calibrated so that a genuine
population's score distribution matches the engine's reference population (the "mid" profile). This keeps the
pool economics the engine has already tested, and makes the score relative: a wallet rises by adding more than
others, not by the system printing scores. Open question Q1 covers the alternative, an absolute mapping.

## 4. Breadth and harm measures

Revenue alone rewards concentration. Every scorer is also judged on breadth:

| Measure | Definition | Engine hook |
|---|---|---|
| Reach | Share of opted-in genuine wallets receiving any redemption | per-wallet `coverage` |
| Evenness | Gini coefficient of redemption across genuine wallets | per-wallet `coverage` |
| Concentration | Share of redemption taken by the top 1% of wallets | `EpochResult.top_wallet_share` |

Harm is scored per wallet (§3) and reported per cohort in synthetic tests: the share of attacker wallets scored
below the genuine median, and the share flagged.

## 5. Data and features

Sources plug in as separate modules writing one shared format:

| Record | Fields |
|---|---|
| Wallet | address, chain, first-seen epoch |
| Event | wallet, epoch, type (swap, transfer, LP, bridge…), size $, fee $, counterparty, block/time |
| Attestation | wallet, source (e.g. airdrop sybil list, identity attestation), label, date |

v1 feature families: age and consistency (active epochs, gaps); volume and fee profile; counterparty diversity;
timing regularity (bot-like intervals); funding graph (common funders, fan-out); round-trip and self-trade patterns;
cluster membership from the wallet graph.

Wallet clustering (funding sources, timing, shared counterparties) produces both the sybil part of Harm and the
`flagged` mask. It also addresses the open item "wallet linking: one person's wallets and agents under one XPR".
A cluster is not harm in itself: one honest person's wallets are merged under one XPR. Only a cluster that splits
activity across wallets to take a larger share of the pool counts toward Harm.

## 6. Scoring model

- v0: gradient-boosted trees predicting forward NC from past-window features, with per-feature contributions as
  **reason codes** for every score.
- An LLM is not the scorer. It explains scores in plain words and answers questions, grounded in the reason codes
  and the specs.
- Every score carries: model version, feature snapshot date, top reasons.

## 7. Data valuation

Each source earns its place by ablation: remove the source, retrain, and measure (a) the loss in prediction of forward
NC on held-out wallets, and (b) the change in gate results (§8). A source that improves neither is dropped. This is
the value-of-information rule: data is worth what it improves in outcomes, not in accuracy alone.

## 8. Pass/fail gates

A scorer version is used only if, with its scores and flags fed to the engine in place of the assumed ones, all gates
pass. Baselines are today's results with assumed scores (`engine/outputs/demo_data.json`, simulated).

| Gate | Requirement | Baseline (assumed scores) |
|---|---|---|
| G1 Genuine users | Genuine redemption not lower than baseline in every scenario | 42.1% (base, low-fee chain); 21.9% (new-wallet farm, Ethereum) |
| G2 Attackers | Attacker recovery (all relief / fees paid) not higher than baseline, and below 100% in every scenario | bots 22.5%; 10,000-wallet farm 93.3%; 20,000 new wallets 25.0% |
| G2b Net drain | Attackers' pool take (relief drawn from the shared pool) / 70% of their own protocol fees: not higher than baseline, and below 100% | bots 0.0%; farm 61.6%; new wallets 6.9% |
| G3 Solvency | Pool never runs dry | 9 of 9 scenarios |
| G4 Breadth | Reach, evenness and concentration (§4) no worse than baseline | to be recorded in step 2 |
| G5 Explanation | Every score has reason codes | — |
| G6 Stability | Month-to-month score changes for genuine wallets within a set bound | bound set in step 3, when scores vary month to month |
| G7 Calibration | Genuine wallets' mean score within 0.02 of the reference population's | reference mean (harness `baseline.json`) |

**What the harness showed (step 2).** "Attacker recovery" mixes two things. Bots recover 22.5% of their fees, but
almost all of it is own-fee relief, their own protocol fees coming back: over 24 months they draw about $3,400 from
the shared pool, against roughly $15m their fees put in. The 10,000-wallet farm is different: it draws $3.1m from the
shared pool, 61.6% of what its own fees contribute. That draw is the real cost to genuine users. G2b measures it.

G7 exists because the naive scorer (everyone 0.50) showed a loophole: inflating every score lifts genuine redemption
from 42.1% to 58.7% and would pass G1, while letting bots recover 50.0%. Calibration ties scores to the tested
distribution, as §3 requires.

**Improvement target (not a gate):** cut the farm's pool take (61.6% under its assumed score of 0.51) sharply by
clustering and flagging farms. This is the first place Exe AI can beat the current assumptions rather than merely
match them.

## 9. Build steps

| Step | Deliverable | Needs |
|---|---|---|
| 1 | This spec, reviewed | — |
| 2 ✓ | **Harness:** `ai/harness.py` feeds any scorer's scores and flags into the engine's stress scenarios and reports G1–G7. Reproduces today's results with the assumed scores (baseline), then shows a deliberately naive scorer failing | engine only |
| 3 | **Synthetic behaviour:** generator producing event histories for genuine users, bots, farms, whales and sandwich bots. Cohort labels are known, and the engine computes true Direct contribution, giving a training target | engine only |
| 4 | **First real data:** Arbitrum history (BigQuery public dataset) plus the Arbitrum and Hop sybil lists (GitHub) as real farming labels | David's BigQuery sandbox (§10) |
| 5 | **Scorer v0** trained and backtested: do past features predict next-window fees on real wallets; do flagged farmers score low | steps 3–4 |
| 6 | **Gate run:** v0 through the harness, report against §8 | steps 2, 5 |
| 7 | **Internal demo:** explorer (wallet → score → reasons → engine outcome) plus the grounded "Ask" panel | step 6 |

Each step: one builds, the other checks (Claude and GPT), and each step closes with a short result note usable as a
public update.

## 10. Data access

- This workspace cannot reach Dune, BigQuery or chain nodes (blocked by session network policy); GitHub is reachable.
- Dune's free plan is view-only, with no CSV or API export.
- BigQuery's public blockchain datasets include Arbitrum, Optimism, Ethereum and Polygon, not Base. Training and
  backtesting therefore start on Arbitrum, where on-chain history and a public sybil list exist on the same chain.
  Base remains the launch chain.
- Route for step 4: David runs Claude's SQL in a free BigQuery sandbox and saves results to Google Drive as CSV.
  Alternative: an admin network allowance for `bigquery.googleapis.com` and `oauth2.googleapis.com`.

## 11. Open questions

- **Q1 Score mapping.** Percentile (v1) or absolute NC thresholds? Percentile keeps the tested distribution;
  absolute rewards growth across the whole network.
- **Q2 Horizon H.** How many epochs ahead NC is measured; proposal: 3.
- **Q3 Cold start.** A new wallet starts at a low score and rises with verified history; the engine's new-wallet
  limit already caps its pool share. Confirm the starting score.
- **Q4 Indirect value.** Which indirect contributions to add first (liquidity, referrals, retention) and how to
  verify them.
- **Q5 Transfer.** How well a scorer trained on Arbitrum carries to Base; test on Base data once access exists.
- **Q6 Legal.** Automated scoring that affects prices may count as profiling in some jurisdictions; add to the
  pending-legal list.

Every figure in this document is simulated unless marked otherwise.
