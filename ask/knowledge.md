# Ask Exe knowledge bank

The single source of truth for Ask Exe. `ask/tools/build.mjs` turns this file into `assets/ask/knowledge.json`
(entries plus search vectors). Edit here, never in the JSON.

## How an entry is written

Entries are separated by a line with three dashes. Each entry has a header (one `field: value` per line), a blank line,
then the answer.

- `id`: short, unique, lowercase with dashes. Never reuse or rename once published (links may point to it).
- `status`: `approved` (published), `sample` or `draft` (preview builds only), `needs-input` (preview only; something
  is missing from David).
- `kind`: `answer` (found by search) or `fixed` (always used when a `trigger` pattern matches the question).
- `topic`: groups entries in the batch list.
- `q`: the question as shown on the answer card.
- `also`: other ways people ask, separated by `|`. These are searched.
- `test`: further ways people ask, separated by `|`. Never searched; used only by the search-quality check.
- `keywords`: extra search words, separated by commas.
- `trigger`: (fixed entries only) a pattern; repeat the line for more patterns.
- `source`: `Title | link`; repeat the line for more sources. Every entry needs at least one.
- `related`: ids of related entries, shown as chips.
- `allow`: wording-rule ids this entry may break, with the reason after a colon. Shown in every check report.
- `checked`: who checked it against its sources, and when.
- `approved`: David's initials and the date. Required for `approved` status.

Answers use plain text with a little formatting: blank line between paragraphs, `- ` for bullets, `**bold**`,
`[text](link)`. Mark anything still to be supplied with `[PLACEHOLDER: …]`; the check fails a published entry that
still has one.

Core draft revision 2, after source review, 10 November 2026. All entries require source checking and approval before publication.

starters: what-is-exe-protocol, what-is-xpr, what-is-exeswap, is-it-live, is-exe-audited, contact-exe

---
id: what-is-exe-protocol
status: approved
kind: answer
topic: Exe Protocol
q: What is Exe Protocol?
also: what does exe do | explain exe protocol simply | what is the exe execution layer
test: give me the short version of exe | what's this protocol about
keywords: protocol, execution layer, apps, wallets, agents
source: Exe Protocol specs: Positioning | exe-protocol-specs.html#positioning
source: Exe Protocol specs: Mechanism | exe-protocol-specs.html#mechanism
source: Important information: What this site is | important-information.html#what-this-site-is
source: Homepage: The Exe product suite | index.html#suite
related: what-is-xpr, what-is-exeswap, is-it-live
checked: Claude, 11 Nov 2026, David's edit, against the cited site pages
approved: David, 11 Nov 2026

Exe Protocol is the execution layer for apps, wallets and agents. Exe Protocol prices every payment by your XPR, your Exe Protocol Rate, earned through your verified on-chain signal.

Apps plug in through an SDK (in development), with your XPR designed to carry to every app built on Exe Protocol. Each wallet’s activity, whether a person’s or an agent’s, pays for its execution.

---
id: what-problem-exe-addresses
status: approved
kind: answer
topic: Exe Protocol
q: What problem is Exe solving?
also: why does exe need to exist | what problem does exe protocol solve | why would anyone need exe | why bother with exe | what is wrong with paying the usual way | what hassle does this remove
test: what's the point of building this | which payment problems are you working on
keywords: problem, fees, friction, payments, useful activity
source: Exe Protocol specs: Positioning | exe-protocol-specs.html#positioning
source: Exe Protocol specs: Mechanism | exe-protocol-specs.html#mechanism
source: Homepage | index.html
related: what-is-exe-protocol, x402-relationship
checked: Claude, 11 Nov 2026, David's edit, against the cited site pages
approved: David, 11 Nov 2026

AI agents are starting to pay at machine speed and scale, creating two problems: settling every payment on-chain adds cost, and an autonomous agent needs firm spending limits. Exe Protocol settles payments in netted batches, sets spending limits up front, and prices each fee by the payer’s signal: smarter, so faster and cheaper.

---
id: who-is-exe-for
status: approved
kind: answer
topic: Exe Protocol
q: Who is Exe Protocol for?
also: who would use exe | who are your intended customers | is exe for apps or individual users
test: where would this fit in my business | who is supposed to benefit from exe
keywords: users, customers, apps, wallets, agents, businesses
source: Exe Protocol specs: Positioning | exe-protocol-specs.html#positioning
source: Exe Protocol specs: Who pays | exe-protocol-specs.html#whos-who-and-who-pays
source: Homepage | index.html
related: what-is-exeswap, sdk-availability, who-pays-agent-fees
checked: Claude, 11 Nov 2026, David's edit, against the cited site pages
approved: David, 11 Nov 2026

Exe Protocol is built for smarter, cheaper machine-speed execution across wallets, apps and autonomous agents.

Apps and their agents use Exe Protocol through an SDK (in development): trading apps, Telegram apps, and AI agents and services. Every wallet, user or agent earns its own XPR.

---
id: what-is-exeswap
status: approved
kind: answer
topic: Exeswap
q: What is Exeswap?
also: what does exeswap do | is exeswap a dex | explain the exeswap app
test: what's the swap product | is this an exchange aggregator
keywords: Exeswap, aggregator, exchanges, swap, first app
source: Exeswap specs: How Exeswap works | exeswap-specs.html#what-it-is
source: Important information: What this site is | important-information.html#what-this-site-is
source: Homepage: The Exe product suite | index.html#suite
related: what-is-exe-protocol, is-xpr-optional, what-can-i-try
checked: Claude, 11 Nov 2026, David's edit, against the cited site pages
approved: David, 11 Nov 2026

Exeswap is a DEX aggregator, and the first app built on Exe Protocol. Exeswap finds the cheapest swap route for your trade (to be verified before launch), then your XPR reduces the fee by 0–100% depending on your signal strength.

A working prototype you can try today: [launch Exeswap](simulator.html).

---
id: is-it-live
status: approved
kind: answer
topic: Status
q: Is any of this live?
also: is exe live | can I trade for real on exeswap | can I connect my wallet now | is this real money | can I use this for real now | is the trading part running yet
test: will pressing swap move my money | is the site doing actual transactions
keywords: live, prototype, wallet connection, real money, transactions
source: Important information: What this site is | important-information.html#what-this-site-is
source: Important information: Every figure is simulated | important-information.html#every-figure-is-simulated
source: Exeswap simulator: questions | simulator.html#swap
related: what-can-i-try, is-exe-audited, roadmap-open-items
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Not yet. This site shows a working prototype of Exe Protocol and Exeswap. Nothing on it is live: no wallet connects, no trade is executed and no real money moves.

Every figure comes from our simulation unless it is labelled measured (timed in the prototype) or sourced (from a linked public source).

---
id: what-can-i-try
status: approved
kind: answer
topic: Demo
q: What can I try in the prototype?
also: where is the demo | how can I try exe | what does the simulator let me do
test: show me something I can use today | where should I start exploring the prototype
keywords: demo, simulator, interactive, try, screens
source: Exeswap simulator: Swap | simulator.html#trade
source: Exeswap simulator: Your rate | simulator.html#rate
source: Exeswap simulator: Sponsorship Pool | simulator.html#pool
source: Exeswap simulator: Stress test | simulator.html#stress
source: Exeswap simulator: App funding | simulator.html#calc
related: is-it-live, what-is-xpr, stress-test-results
checked: Claude, 11 Nov 2026, David's edit, against the cited site pages
approved: David, 11 Nov 2026

The Exeswap simulator: a working prototype you can try today. [Launch Exeswap](simulator.html#trade) to swap and see how your XPR affects your fee.

You can also explore [Your rate](simulator.html#rate), the [Sponsorship Pool](simulator.html#pool), the [stress tests](simulator.html#stress), the [app funding calculator](simulator.html#calc) and [agent payments](simulator.html#speed).

---
id: what-is-xpr
status: approved
kind: answer
topic: XPR
q: What is XPR?
also: what does xpr stand for | explain the exe protocol rate | what is my xpr rate
test: what's this personal exchange rate | what does the number called xpr mean
keywords: XPR, rate, personal exchange rate, signal
source: Exeswap specs: XPR | exeswap-specs.html#xpr
source: Exeswap specs: How Exeswap works | exeswap-specs.html#what-it-is
source: Exeswap simulator: Your rate | simulator.html#rate
source: Homepage: How Exe Protocol works | index.html#platform
related: is-xpr-optional, how-xpr-changes, what-affects-fee-redemption
checked: Claude, 11 Nov 2026, David's edit, against the cited site pages
approved: David, 11 Nov 2026

XPR, your Exe Protocol Rate, functions as your personalized ‘exchange rate,’ with higher XPR meaning lower fees, from 0–100%. Earned through verified on-chain signal, XPR is determined by your activity.

XPR powers Exeswap and is designed to carry across every app that uses Exe Protocol.

---
id: is-xpr-optional
status: approved
kind: answer
topic: XPR
q: Do I have to use XPR?
also: can I use exeswap without xpr | is xpr compulsory | do I need to opt in | can I leave xpr off | do I have to join the rate scheme | can I just pay the usual cost
test: what if I don't want a rate | can I skip xpr and just swap
keywords: opt in, optional, normal fee, participation
source: Exeswap specs: How Exeswap works | exeswap-specs.html#what-it-is
source: Exeswap simulator: questions | simulator.html#swap
related: what-is-xpr, what-is-exeswap, what-fees-exeswap
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

No. XPR is opt-in. Without it, Exeswap works as a regular aggregator and you pay the normal fee.

---
id: how-xpr-changes
status: approved
kind: answer
topic: XPR
q: How does my XPR go up or down?
also: does my xpr change each month | how quickly does xpr update | does xpr remember earlier activity | does my rate move each month | how much does last month count | does my old rate still matter
test: will my rate jump around | does one quiet month erase my history
keywords: XPR, monthly, history, smoothing, updates
source: Exeswap specs: XPR | exeswap-specs.html#xpr
source: Exeswap simulator: Your rate | simulator.html#rate
related: what-is-xpr, tier-three, xpr-range
checked: Claude, 11 Nov 2026, David's edit, against the cited site pages
approved: David, 11 Nov 2026

Your XPR follows your verified on-chain activity: steady activity builds your XPR, and a period of less activity, even inactivity, lowers it gently. Your history counts too, so one burst of activity can’t send your XPR soaring, and one quiet period won’t wipe it out.

---
id: what-are-tiers
status: approved
kind: answer
topic: Tiers
q: What are Tiers and how do they work?
also: What are tiers? | How do tiers work? | What's the difference between Tier 1, 2 and 3? | Explain the tiers | How many tiers are there?
test: what do the tier levels mean | is there a higher level than tier 1
keywords: tier, tiers, Tier 1, Tier 2, Tier 3, budget, level
source: Exeswap simulator: questions | simulator.html#swap
source: Exeswap specs: Tiers | exeswap-specs.html#tiers
source: Exeswap simulator: Your rate | simulator.html#rate
related: tier-one, tier-two, tier-three
checked: Claude, 11 Nov 2026, David's wording, against the cited site pages
approved: David, 11 Nov 2026

Tier 1 is where everyone starts. Tier 2 adds a budget commitment, earns more from the same XPR, and lets your XPR go up to 1.10. Tier 3 earns more again, so your fees stay low even in a quieter month.

---
id: xpr-range
status: approved
kind: answer
topic: XPR
q: Can XPR go above 1.00?
also: what is the maximum xpr | is xpr capped at one | why does xpr go up to 1.10 | how high can my rate go | is one the limit | can the rate reach one point one
test: can my rate be higher than one | what's the top rate at tier two
keywords: XPR, maximum, range, 1.00, 1.10
source: Exeswap specs: XPR | exeswap-specs.html#xpr
source: Exeswap specs: Tiers | exeswap-specs.html#tiers
source: Exe Protocol specs: Mechanism | exe-protocol-specs.html#mechanism
source: Homepage: How Exe Protocol works | index.html#platform
related: tier-one, tier-two, what-affects-fee-redemption
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Yes, at Tiers 2 and 3. XPR runs from 0.00 to 1.00, and up to 1.10 at Tiers 2 and 3. Tier 1 is never above 1.00.

Either way, a user never redeems more than the fees they paid.

---
id: what-affects-fee-redemption
status: approved
kind: answer
topic: XPR
q: Why can two wallets with the same XPR pay different fees?
also: does the same xpr always give the same fee | why is my fee different at the same rate | what else affects fee redemption | same rate why a different bill | what changes my cost besides xpr | why do two people on the same rate pay different amounts
test: we have equal xpr but different costs why | is xpr the only number that matters
keywords: same rate, tier, gas, pool strength, limits
source: Exeswap specs: XPR | exeswap-specs.html#xpr
source: Exeswap specs: Fees | exeswap-specs.html#fees
source: Exeswap specs: Funding | exeswap-specs.html#funding
source: Exeswap specs: Safeguards | exeswap-specs.html#safeguards
source: Exe Protocol specs: Who pays | exe-protocol-specs.html#whos-who-and-who-pays
source: Exeswap simulator: questions | simulator.html#swap
related: tier-two, what-fees-exeswap, pool-under-load
checked: Claude, 11 Nov 2026, David's edit, against the cited site pages
approved: David, 11 Nov 2026

Because XPR isn't the only factor. Higher tiers earn more from the same XPR, gas differs from chain to chain, and pool strength sets how much of what XPR earns Exe's pool can pay right now.

Every quote shows the full fee, what XPR redeems and what you pay.

---
id: tier-one
status: approved
kind: answer
topic: XPR
q: What does Tier 1 give me?
also: how does tier one work | what is the starting tier | what do I get at the basic tier
test: what happens before I qualify for higher tiers | explain the first tier
keywords: Tier 1, starting tier, base rate, first tier, starting tier
source: Exeswap specs: Tiers | exeswap-specs.html#tiers
source: Exeswap specs: XPR | exeswap-specs.html#xpr
source: Exeswap specs: Funding | exeswap-specs.html#funding
source: Exeswap simulator: questions | simulator.html#swap
related: tier-two, xpr-example, is-xpr-optional
checked: Claude, 11 Nov 2026, David's edit, against the cited site pages
approved: David, 11 Nov 2026

At Tier 1, with Exe's pool at full strength, your fee redemption matches your XPR: XPR 0.60 redeems 60% of each trade's fee.

At Tier 1, XPR runs up to 1.00.

---
id: tier-two
status: approved
kind: answer
topic: XPR
q: How do I reach Tier 2?
also: how do I qualify for tier two | what budget is needed for tier 2 | how do I move up from tier one
test: what would I have to set aside for the second tier | how big is the tier two commitment
keywords: Tier 2, budget, qualification, commitment, second tier
source: Exeswap specs: Tiers | exeswap-specs.html#tiers
source: Exeswap simulator: Your rate | simulator.html#rate
source: Exeswap simulator: questions | simulator.html#swap
related: budget-increases-xpr, withdraw-tier-budget, tier-three
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Set aside a budget in your own wallet, usually about 10% (between 5% and 25%, lower for a long, steady history) of what you trade in a month. The budget stays in your wallet, and Exe Protocol never holds it. A new budget counts once you’ve held it for 30 days.

Tier 2 earns more from the same XPR, and lets your XPR go up to 1.10.

---
id: tier-three
status: approved
kind: answer
topic: XPR
q: How do I reach and keep Tier 3?
also: how do I qualify for tier three | what keeps me in tier 3 | when would I drop from tier three
test: how many strong months to reach the highest tier | what happens after two months below 0.75
keywords: Tier 3, sustained activity, 0.75, four months, two months, third tier, highest tier, top tier
source: Exeswap specs: Tiers | exeswap-specs.html#tiers
source: Exeswap simulator: Your rate | simulator.html#rate
source: Exeswap simulator: questions | simulator.html#swap
related: tier-two, how-xpr-changes, withdraw-tier-budget
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Stay at Tier 2 with an XPR of 0.75 or more for four months in a row. Tier 3 earns more again, so your fees stay low even in a quieter month.

Two months below 0.75 and you move back to Tier 2.

---
id: budget-increases-xpr
status: approved
kind: answer
topic: XPR
q: Does committing a bigger budget raise my XPR?
also: can I increase xpr by committing more money | does a larger budget improve my rate | can I buy a higher xpr
test: if I double the commitment does my xpr rise | will extra money give me a better signal score
keywords: budget, bigger commitment, signal, tier, XPR
source: Exeswap specs: Tiers | exeswap-specs.html#tiers
source: Exeswap simulator: Your rate | simulator.html#rate
related: what-is-xpr, tier-two, withdraw-tier-budget
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

No. A budget above the minimum is headroom for a busier month only. It does not raise XPR: fee redemption is earned through signal, never bought.

---
id: withdraw-tier-budget
status: approved
kind: answer
topic: XPR
q: What happens if I end my Tier 2 or Tier 3 budget commitment?
also: can I stop the tier budget commitment | what happens if I withdraw my tier budget | do I lose my tier when the commitment ends | can I leave tier two | what if I take my budget out | do I drop a tier if I stop committing money
test: can I leave the higher tier | what happens to my tier after taking the budget out
keywords: withdraw, budget commitment, tier reversion
source: Exeswap specs: Tiers | exeswap-specs.html#tiers
source: Exeswap simulator: Your rate | simulator.html#rate
source: Exeswap specs: Settlement and custody | exeswap-specs.html#settlement-and-custody
source: Exeswap simulator: questions | simulator.html#swap
related: tier-one, tier-two, tier-three
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

You can withdraw your budget at any time, and you drop back to Tier 1. The budget stays in your own wallet; Exe Protocol never holds it.

---
id: what-fees-exeswap
status: approved
kind: answer
topic: Exeswap
q: What fees does Exeswap model?
also: what is the normal exeswap fee | does exeswap charge gas as well | what do I pay before xpr | how much does a swap cost before xpr | what fees do I pay | is gas included in the cost
test: what makes up the full cost of a swap | is the protocol fee the same as gas
keywords: fees, gas, protocol fee, low-fee chains, Ethereum
source: Exe Protocol specs: Who pays | exe-protocol-specs.html#whos-who-and-who-pays
source: Exeswap specs: Fees | exeswap-specs.html#fees
source: Exeswap simulator: Sponsorship Pool | simulator.html#pool
related: xpr-example, quote-shows-cost, is-xpr-optional
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Each trade costs the network’s gas plus Exe Protocol’s fee: 0.10% of the trade on low-fee chains, 0.25% on Ethereum. XPR redeems a share of that total.

---
id: xpr-example
status: approved
kind: answer
topic: Exeswap
q: What would XPR 0.60 mean on a $1,000 swap?
also: show me a simple xpr fee example | what does 0.60 xpr save in the example | work out the illustrated thousand dollar swap | show me the money at rate point six | what would the thousand dollar example cost me | give me a simple cost example with xpr
test: how does the one dollar fee become forty cents | put a 60 percent rate into actual numbers
keywords: example, 0.60, 1000, 1.01, 0.40, simulated
source: Exeswap specs: Fees | exeswap-specs.html#fees
related: what-fees-exeswap, tier-one, own-fees-and-pool
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

A $1,000 trade on a low-fee chain costs $1.01: a $1.00 protocol fee plus $0.01 gas. At Tier 1, with Exe’s pool at full strength, XPR 0.60 gives a fee redemption of $0.61, all from the user's own fees. The user pays $0.40.

Simulated.

---
id: quote-shows-cost
status: approved
kind: answer
topic: Exeswap
q: What does the quote show before approval?
also: can I see the fee before signing | what is shown in your quote | will I know the cost before approving | can I check the cost first | do I see the bill before saying yes | where does it show what I pay
test: where can I see my final amount to pay | do you show the full fee and the xpr reduction separately
keywords: quote, signing, approval, full fee, final cost
source: Exeswap specs: How Exeswap works | exeswap-specs.html#what-it-is
source: Exeswap simulator: Your quote | simulator.html#quote
source: Important information: What this site is | important-information.html#what-this-site-is
related: what-fees-exeswap, what-affects-fee-redemption, is-it-live
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Every quote shows the full fee, what XPR redeems and what you pay, before you sign. Once approved, that quote is fixed.

See it in [Your quote](simulator.html#quote).

---
id: cheapest-swap-status
status: approved
kind: answer
topic: Exeswap
q: Is Exeswap always the cheapest?
also: does exeswap beat every price | have you verified the best swap price | is the cheapest route claim established | will this always cost less | is the lowest price proven yet | have you checked that it is cheapest
test: can you promise a better price than every exchange | have the swap prices been checked on real trades
keywords: cheapest, best price, swap comparison, intended capability
source: Exeswap specs: How Exeswap works | exeswap-specs.html#what-it-is
source: Exeswap specs: Status | exeswap-specs.html#status
source: Important information: Statements of intent | important-information.html#statements-of-intent
source: Exeswap simulator: Your quote | simulator.html#quote
related: what-is-exeswap, evidence-labels, quote-shows-cost
checked: Claude, 11 Nov 2026, David's edit, against the cited site pages
approved: David, 11 Nov 2026

That's our aim (to be verified before launch). Exeswap finds a route for each trade across exchanges, like any aggregator.

---
id: what-is-sponsorship-pool
status: approved
kind: answer
topic: Sponsorship Pool
q: What is the Sponsorship Pool?
also: what is exes pool | what does sp mean | what is the shared sponsorship pool for | what is that shared pot | what does the pool actually do | what is the pool for
test: where does the shared fee support come from | explain the pool in plain english
keywords: SP, Sponsorship Pool, shared support, app accounts
source: Exeswap specs: Funding | exeswap-specs.html#funding
source: Exe Protocol specs: App funding | exe-protocol-specs.html#app-funding
source: Homepage: How Exe Protocol works | index.html#platform
related: how-pool-funded, own-fees-and-pool, pool-under-load
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Exe's shared pool. Your XPR determines how much of your fee is redeemed from Exe’s pool, after what your own fees cover.

The pool is funded by 70% of Exe Protocol’s revenue. Users’ budgets and wallet balances never enter the pool.

---
id: how-pool-funded
status: approved
kind: answer
topic: Sponsorship Pool
q: How is the Sponsorship Pool funded?
also: where does money for the pool come from | what pays for shared fee redemption | does the pool use user balances | where does the pool get its money | does the pool take my wallet money | how does money get into the shared pot
test: who supplies the money behind the fee support | does my budget get put into the pool
keywords: pool funding, revenue, 70 percent, 30 percent, user budgets
source: Exeswap specs: Funding | exeswap-specs.html#funding
source: Exe Protocol specs: App funding | exe-protocol-specs.html#app-funding
related: what-is-sponsorship-pool, app-accounts, app-cost
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

By 70% of Exe Protocol’s revenue, from Exeswap’s fees and the protocol fees that apps’ users pay. The other 30% goes to operations.

Users’ budgets and wallet balances never enter the pool.

---
id: own-fees-and-pool
status: approved
kind: answer
topic: Sponsorship Pool
q: Where does my fee redemption come from?
also: why does the example split fee support into two parts | what does from my own fees mean | how is own-fee support different from pool support | what is the difference between own-fee support and shared pool support
test: why are there separate own fees and pool columns | which part comes from what I already paid
keywords: own fees, shared support, protocol fees, 70 percent
source: Exeswap specs: Fees | exeswap-specs.html#fees
source: Exeswap specs: Funding | exeswap-specs.html#funding
source: Exeswap simulator: questions | simulator.html#swap
related: how-pool-funded, pool-under-load, xpr-example
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

First from your own fees: up to 70% of the protocol fee you paid. The rest comes from Exe’s pool.

The part from your own fees never shrinks, whatever the pool’s state. Fee redemption never exceeds the fee you paid.

---
id: pool-under-load
status: approved
kind: answer
topic: Sponsorship Pool
q: What happens when the pool cannot cover all demand?
also: what happens when pool strength drops | can the pool pay less under load | why would shared fee support decrease
test: what if too many users need fee support at once | do my fees rise when the pool is under pressure
keywords: pool strength, load, capacity, shared support, step-down
source: Exeswap specs: Funding | exeswap-specs.html#funding
source: Exeswap simulator: Sponsorship Pool | simulator.html#pool
source: Exe Protocol specs: Evidence | exe-protocol-specs.html#evidence
source: Exeswap simulator: questions | simulator.html#swap
related: own-fees-and-pool, what-affects-fee-redemption, stress-test-results
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

If Exe’s pool runs low, everyone’s share from the pool shrinks equally. The part paid from your own fees depends only on your XPR, never on pool strength.

Under load, the pool steps down gradually. In all nine stress tests (simulated, 24 months each), the pool never ran dry.

---
id: app-accounts
status: approved
kind: answer
topic: Sponsorship Pool
q: Does one app pay for another app's users?
also: are app pool balances kept separate | do apps subsidise each other | is there a separate account for each app
test: would my app's fees cover somebody else's customers | how is one app separated from another in the pool
keywords: app accounts, separation, pool funding, cross-subsidy
source: Exe Protocol specs: App funding | exe-protocol-specs.html#app-funding
source: Exeswap specs: Funding | exeswap-specs.html#funding
related: how-pool-funded, app-cost, sdk-availability
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

No. Each app has its own account in the pool, built from the fees its users pay, so no app subsidises another.

Exe Protocol starts each new app’s account with about 1.9 months of its expected income.

---
id: app-cost
status: approved
kind: answer
topic: Apps and SDK
q: Must an app pay for its users' fee redemption?
also: do developers have to fund user fee support | is an app top-up compulsory | what does the app have to contribute | must my app put money in | do I pay for my users fees | is topping up required for an app
test: would I need to bankroll my customers' fees | can an app use the model without topping up its pool account
keywords: app funding, top-ups, optional budgets, protocol fee
source: Exe Protocol specs: App funding | exe-protocol-specs.html#app-funding
source: Exeswap simulator: App funding | simulator.html#calc
related: app-accounts, how-pool-funded, sdk-availability
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

No. Nothing is required from apps for fee redemption.

An app can fund a budget so XPR also discounts its own fee. That money goes to its users under the same rules.

---
id: sdk-availability
status: approved
kind: answer
topic: Apps and SDK
q: Can I integrate Exe into my app today?
also: is the exe sdk available | can developers use the sdk now | is app integration ready
test: where do I download the sdk | can I plug my wallet app into exe yet
keywords: SDK, integration, developers, availability
source: Exe Protocol specs: Roadmap and open items | exe-protocol-specs.html#roadmap-and-open-items
source: Important information: Statements of intent | important-information.html#statements-of-intent
source: Exe Protocol: Contact | index.html#contact
source: Homepage: The Exe product suite | index.html#suite
related: app-cost, who-is-exe-for, contact-exe
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Not yet. An SDK, so any app can use Exe Protocol, is in development.

To talk about integrating, email the team at [Richexeswap@proton.me](mailto:Richexeswap@proton.me).

---
id: who-pays-agent-fees
status: approved
kind: answer
topic: Agents
q: Who pays when an AI agent makes a payment?
also: who funds an agent transaction | does the agent or its owner pay | who covers an agent's fees
test: whose money would the agent spend | who is charged when software pays for something
keywords: agent, payer, budget, owner, app
source: Exe Protocol specs: Who pays | exe-protocol-specs.html#whos-who-and-who-pays
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
source: Homepage: How Exe Protocol works | index.html#platform
related: agent-budget-custody, x402-relationship, what-is-xpr
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

The payer pays: the fee falls on whoever funds the agent’s budget, the app or its user.

Set the budget and limits up front, and the agent is designed to pay on its own, instantly: no human, no crypto housekeeping.

---
id: x402-relationship
status: approved
kind: answer
topic: Agents
q: How would Exe work with x402?
also: is exe a replacement for x402 | what does exe add to x402 | how do x402 and exe fit together
test: why put exe alongside a payment rail | is x402 a competitor or something you would use
keywords: x402, payment rails, complementary, integration
source: Exe Protocol specs: Positioning | exe-protocol-specs.html#positioning
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
source: Important information: Statements of intent | important-information.html#statements-of-intent
related: what-is-exe-protocol, net-settlement, rail-partnerships
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

x402 moves the money; Exe Protocol determines what it costs, by signal.

x402 is the pipe, not the rival. Exe Protocol adds what x402 does not have: fees priced by the payer’s signal, budgets and policy set before each payment, a shared pool that funds fee redemption, and settlement netted across all agents. (Working with any rail is a statement of intent until built.)

---
id: net-settlement
status: approved
kind: answer
topic: Agents
q: What does net settlement mean?
also: why do you batch payments | how does netting work | why are there fewer settlements than payments
test: how can lots of payments turn into fewer transfers | what goes on chain at the end of a batch
keywords: netting, settlement, batching, on-chain transfers
source: Exe Protocol specs: Mechanism | exe-protocol-specs.html#mechanism
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
source: Homepage: How Exe Protocol works | index.html#platform
related: x402-relationship, prototype-speed, agent-budget-custody
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Each payment is approved and recorded instantly, then settled on-chain later in netted batches. Fewer settlements mean lower costs than typical on-chain transactions that settle every payment individually.

In the agent-payments simulation: 22.8× fewer on-chain transactions.

---
id: agent-budget-custody
status: approved
kind: answer
topic: Agents
q: Where would an agent's budget be held?
also: is agent budget escrow already built | who holds agent payment funds | how would agent budget custody work
test: can an agent withdraw money it hasn't spent | is the proposed escrow in the prototype yet
keywords: agent budget, escrow, custody, planned design
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
source: Exe Protocol specs: Roadmap and open items | exe-protocol-specs.html#roadmap-and-open-items
source: Exe Protocol specs: Pending legal advice | exe-protocol-specs.html#pending-legal-advice
related: who-pays-agent-fees, net-settlement, is-it-live
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Planned: each agent’s budget sits in an escrow contract the agent controls. A batch settles only payments the agent signed.

The prototype doesn't do this yet, and no real money moves.

---
id: rail-partnerships
status: approved
kind: answer
topic: Exe Protocol
q: Is Exe partnered with the companies named on the site?
also: are you partnered with the companies shown | does mentioning stripe mean an integration | are the named rails endorsing exe | do the named payment services and chains imply partnerships
test: does the coinbase reference mean they're backing you | are those company names confirmed partners
keywords: partnership, endorsement, rails, Stripe, Coinbase, names
source: Important information: Third-party names and figures | important-information.html#third-party-names-and-figures
source: Important information: Statements of intent | important-information.html#statements-of-intent
related: x402-relationship, sdk-availability, roadmap-open-items
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

No. Names such as x402, Coinbase, Cloudflare, Stripe, MetaMask, Jupiter and Hyperliquid are used for comparison only and imply no partnership or endorsement.

---
id: evidence-labels
status: approved
kind: answer
topic: Evidence
q: What do simulated, measured and sourced mean?
also: which numbers are simulations | what does measured mean on the site | how should I read the evidence labels
test: are benchmark timings the same as simulation results | where do the comparison figures come from
keywords: simulated, measured, sourced, evidence, labels
source: Important information: Every figure is simulated | important-information.html#every-figure-is-simulated
source: Exe Protocol specs: Evidence | exe-protocol-specs.html#evidence
related: is-it-live, prototype-speed, stress-test-results
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Every figure on this site comes from Exe Protocol’s simulation model unless it is labelled **measured** (timed in the prototype) or **sourced** (from a linked public source).

Simulated figures are not quotes, forecasts or promises of any user’s outcome.

---
id: stress-test-results
status: approved
kind: answer
topic: Evidence
q: What did the nine stress tests show?
also: did the pool run dry in testing | what were the stress test results | how long were the nine scenarios tested | did the money last in the tests | did any test run the pool dry | what happened in the nine test cases
test: how did the model behave under pressure | did any of the simulated scenarios empty the pool
keywords: stress tests, nine scenarios, 24 months, pool
source: Exe Protocol specs: Evidence | exe-protocol-specs.html#evidence
source: Exeswap simulator: Stress test | simulator.html#stress
related: pool-under-load, is-exe-audited, evidence-labels
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

The pool never ran dry in 9 of 9 stress tests, 24 months each, including bots, whales and wallet farms. Simulated.

---
id: is-exe-audited
status: approved
kind: answer
topic: Evidence
q: Has Exe been audited?
also: is exe protocol audited | has the economic model been independently reviewed | has a developer signed off the real funds version
test: was there a formal audit | what review happened before this prototype
keywords: audit, review, AI reviewers, developer sign-off
source: Important information: Not audited | important-information.html#not-audited
source: Exe Protocol specs: Evidence | exe-protocol-specs.html#evidence
related: is-it-live, stress-test-results, roadmap-open-items
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Not yet. The economic model has been independently reviewed by two AI reviewers. It has not been audited.

A developer review and security audit come before any real funds, after fundraising.

---
id: prototype-speed
status: approved
kind: answer
topic: Evidence
q: How fast is Exe?
also: how fast is the prototype fee calculation | what was timed at 0.054 milliseconds | does 18406 a second mean real payments per second | what does the 0.054 ms measurement actually cover
test: is that speed blockchain settlement time | what exactly runs in fifty four microseconds
keywords: speed, benchmark, 0.054 ms, 18406, in memory
source: Exe Protocol specs: Evidence | exe-protocol-specs.html#evidence
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
related: evidence-labels, net-settlement, is-it-live
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

In the prototype, determining a payment’s fee relief takes 0.054 ms: 18,406 a second on one computer, in memory. Netting 100,000 payments between 1,000 agents takes 0.9 ms.

Both measured in the prototype, not on a live network.

---
id: roadmap-open-items
status: approved
kind: answer
topic: Status
q: What still needs to be built or resolved?
also: what remains on the roadmap | what are the open development questions | which parts are only planned | what is left to do | what parts are still missing | what do you still need to figure out
test: what's missing before the wider product works | what can the prototype not establish yet
keywords: roadmap, SDK, escrow, wallet linking, cross-chain XPR, cold start
source: Exe Protocol specs: Roadmap and open items | exe-protocol-specs.html#roadmap-and-open-items
source: Exe Protocol specs: Evidence | exe-protocol-specs.html#evidence
related: sdk-availability, agent-budget-custody, is-exe-audited
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

- **In development:** the SDK, so any app can use Exe Protocol; working with x402 and other rails; escrow custody for agent budgets.
- **Open:** wallet linking (one person’s wallets and agents under one XPR); XPR across chains.
- **For a pilot:** cold start, and whether XPR predicts valuable activity.

---
id: contact-exe
status: approved
kind: answer
topic: Contact
q: How can I contact Exe about the project?
also: how do I get in touch with exe | where do I send a project enquiry | who do I contact about an integration | can I talk to someone about exe | how do I reach you | where can I ask about working together
test: I'd like to discuss the product | where's the contact link
keywords: contact, enquiries, product, integration, discussion
source: Exe Protocol: Contact | index.html#contact
related: what-is-exe-protocol, sdk-availability, invest-in-exe
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Put your signal to work: email the team at [Richexeswap@proton.me](mailto:Richexeswap@proton.me), or use "Talk to our team" on the [homepage](index.html#contact).

---
id: xpt-token
status: approved
kind: fixed
topic: Token
q: Can I buy $XPT?
also: is xpt available to buy | what is xpt | is exe doing a token presale
test: where can I purchase xpt | are exe tokens for sale
keywords: XPT, ecosystem token, availability, token enquiries
trigger: ^\s*(?:what\s+is\s+|tell\s+me\s+about\s+)?\$?xpt\s*[?.!]*\s*$
trigger: \b(?:buy|purchase|sale|presale|pre-sale|airdrop|price|worth|tokenomics|allocation|allocations|vesting|supply|listed|listing)\b.{0,45}\$?\bxpt\b
trigger: \$?\bxpt\b.{0,45}\b(?:buy|purchase|sale|presale|pre-sale|airdrop|price|worth|tokenomics|allocation|allocations|vesting|supply|listed|listing)\b
trigger: \bexe(?:\s+protocol)?\b.{0,25}\btoken(?:s|omics)?\b.{0,25}\b(?:buy|purchase|sale|presale|pre-sale|airdrop|price|supply|vesting|allocations?)\b
trigger: \bexe(?:\s+protocol)?\b.{0,15}\btoken\s+(?:presale|pre-sale|sale)\b
source: Important information: No offer of tokens or investments | important-information.html#no-offer-of-tokens-or-investments
source: Important information: Not advice | important-information.html#not-advice
related: is-it-live, contact-exe
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

$XPT is Exe Protocol’s ecosystem token. $XPT is not listed or available, and nothing on this site is an offer, solicitation or invitation to buy, sell or hold any token or other investment.

See [Important information](important-information.html#no-offer-of-tokens-or-investments).

---
id: invest-in-exe
status: approved
kind: fixed
topic: Investors
q: How can I invest in Exe?
also: how would I invest in exe protocol | is there an exe funding round | who can I contact to discuss investing in exe
test: I want to invest in Exe | where can I ask about Exe fundraising
keywords: invest in Exe, investment enquiry, funding round, contact
trigger: \binvest(?:ing)?\s+in\s+(?:the\s+)?exe(?:\s+protocol)?\b
trigger: \bexe(?:\s+protocol)?(?:'s)?\s+(?:fundrais\w*|funding\s+round|investment\s+(?:round|opportunit\w*))\b
trigger: \b(?:funding\s+round|fundrais\w*|investment\s+(?:round|opportunit\w*))\b.{0,35}\bexe(?:\s+protocol)?\b
trigger: \b(?:fund|funding|back|backing)\s+exe\b
trigger: \binvest(?:ing|ment|ments|or|ors)?\b.{0,60}\bexe\b|\bexe\b.{0,60}\binvest(?:ing|ment|ments|or|ors)?\b
source: Important information: No offer of tokens or investments | important-information.html#no-offer-of-tokens-or-investments
source: Exe Protocol: Contact | index.html#contact
related: contact-exe, is-it-live, is-exe-audited
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Nothing on this site is an offer of an investment. To talk to the team, email [Richexeswap@proton.me](mailto:Richexeswap@proton.me), or use "Talk to our team" on the [homepage](index.html#contact).
