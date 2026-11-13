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

starters: app-how-it-works, what-is-exe-protocol, what-is-xpr, what-is-exeswap, is-it-live, is-exe-audited, contact-exe

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
related: app-how-it-works, what-is-xpr, what-is-exeswap, is-it-live
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
related: app-owner-benefits, what-is-exe-protocol, x402-relationship
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
related: app-how-it-works, what-is-exeswap, sdk-availability, who-pays-agent-fees
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
related: exeswap-first-chain, what-is-exe-protocol, is-xpr-optional, what-can-i-try
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
related: exeswap-launch-updates, what-can-i-try, is-exe-audited, roadmap-open-items
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
also: where is the demo | how can I try exe | what does the simulator let me do | what can I try on exeswap today | where can I try the exeswap prototype
test: show me something I can use today | where should I start exploring the prototype
keywords: demo, simulator, interactive, try, screens
source: Exeswap simulator: Swap | simulator.html#trade
source: Exeswap simulator: Your rate | simulator.html#rate
source: Exeswap simulator: Sponsorship Pool | simulator.html#pool
source: Exeswap simulator: Stress test | simulator.html#stress
source: Exeswap simulator: App funding | simulator.html#calc
related: personal-xpr-today, is-it-live, what-is-xpr, stress-test-results
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
related: xpr-lowers-fees, xpt-vs-xpr, is-xpr-optional, how-xpr-changes, what-affects-fee-redemption
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
also: can I use exeswap without xpr | is xpr compulsory | do I need to opt in | can I leave xpr off | do I have to join the rate scheme | can I just pay the usual cost | can I choose whether to use xpr | is xpr optional on exeswap
test: what if I don't want a rate | can I skip xpr and just swap
keywords: opt in, optional, normal fee, participation
source: Exeswap specs: How Exeswap works | exeswap-specs.html#what-it-is
source: Exeswap simulator: questions | simulator.html#swap
related: xpr-lowers-fees, what-is-xpr, what-is-exeswap, what-fees-exeswap
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

No. XPR is opt-in. Without it, Exeswap works as a regular aggregator and you pay the normal fee.

---
id: how-xpr-changes
status: approved
kind: answer
topic: XPR
q: How does my XPR go up or down?
also: does my xpr change each month | how quickly does xpr update | does xpr remember earlier activity | does my rate move each month | how much does last month count | does my old rate still matter | how does my trading activity affect my xpr | how can my xpr change as I trade
test: will my rate jump around | does one quiet month erase my history
keywords: XPR, monthly, history, smoothing, updates
source: Exeswap specs: XPR | exeswap-specs.html#xpr
source: Exeswap simulator: Your rate | simulator.html#rate
related: exeswap-frequent-traders, what-is-xpr, tier-three, xpr-range
checked: Claude, 11 Nov 2026, David's edit, against the cited site pages
approved: David, 11 Nov 2026

Your XPR follows your verified on-chain activity: steady activity builds your XPR, and a period of less activity, even inactivity, lowers it gently. Your history counts too, so one burst of activity can’t send your XPR soaring, and one quiet period won’t wipe it out.

---
id: what-are-tiers
status: approved
kind: answer
topic: Tiers
q: What are Tiers and how do they work?
also: What are tiers? | How do tiers work? | What's the difference between Tier 1, 2 and 3? | Explain the tiers | How many tiers are there? | what do the higher tiers give me | what is the benefit of moving up a tier
test: what do the tier levels mean | is there a higher level than tier 1
keywords: tier, tiers, Tier 1, Tier 2, Tier 3, budget, level
source: Exeswap simulator: questions | simulator.html#swap
source: Exeswap specs: Tiers | exeswap-specs.html#tiers
source: Exeswap simulator: Your rate | simulator.html#rate
related: pool-surplus-benefit, tier-one, tier-two, tier-three
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
related: maximum-fee-redemption, tier-one, tier-two, what-affects-fee-redemption
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
related: maximum-fee-redemption, tier-two, what-fees-exeswap, pool-under-load
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
related: flagged-wallet-treatment, tier-two, xpr-example, is-xpr-optional
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
related: pool-surplus-benefit, budget-increases-xpr, withdraw-tier-budget, tier-three
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
related: pool-surplus-benefit, tier-two, how-xpr-changes, withdraw-tier-budget
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
related: exeswap-adds-to-solana, xpr-example, quote-shows-cost, is-xpr-optional
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Each trade costs the network’s gas plus Exe Protocol’s fee: 0.10% of the trade on low-fee chains, 0.25% on Ethereum. XPR redeems a share of that total.

---
id: xpr-example
status: approved
kind: answer
topic: Exeswap
q: What would XPR 0.60 mean on a $1,000 swap?
also: show me a simple xpr fee example | what does 0.60 xpr save in the example | work out the illustrated thousand dollar swap | show me the money at rate point six | what would the thousand dollar example cost me | give me a simple cost example with xpr | how much could I pay on a $1,000 swap | can you give me a simple exeswap fee example
test: how does the one dollar fee become forty cents | put a 60 percent rate into actual numbers
keywords: example, 0.60, 1000, 1.01, 0.40, simulated
source: Exeswap specs: Fees | exeswap-specs.html#fees
related: xpr-lowers-fees, what-fees-exeswap, tier-one, own-fees-and-pool
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
also: can I see the fee before signing | what is shown in your quote | will I know the cost before approving | can I check the cost first | do I see the bill before saying yes | where does it show what I pay | what will I see before approving a swap | can I check the cost before I approve the trade
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
related: exeswap-solana-ecosystem, what-is-exeswap, evidence-labels, quote-shows-cost
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
related: pool-farming-defences, how-pool-funded, own-fees-and-pool, pool-under-load
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
related: protocol-business-model, what-is-sponsorship-pool, app-accounts, app-cost
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
also: why does the example split fee support into two parts | what does from my own fees mean | how is own-fee support different from pool support | what is the difference between own-fee support and shared pool support | how does exeswap fund lower fees | where does the money for fee redemption come from
test: why are there separate own fees and pool columns | which part comes from what I already paid
keywords: own fees, shared support, protocol fees, 70 percent
source: Exeswap specs: Fees | exeswap-specs.html#fees
source: Exeswap specs: Funding | exeswap-specs.html#funding
source: Exeswap simulator: questions | simulator.html#swap
related: app-redemption-funds, how-pool-funded, pool-under-load, xpr-example
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
related: pool-surplus-benefit, own-fees-and-pool, what-affects-fee-redemption, stress-test-results
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
related: app-pool-held, how-pool-funded, app-cost, sdk-availability
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
related: app-commitment, app-own-fee, app-accounts, how-pool-funded, sdk-availability
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
related: solana-apps-sdk, app-commitment, app-cost, who-is-exe-for, contact-exe
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
related: agents-use-exe, agent-budget-custody, x402-relationship, what-is-xpr
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
also: is exe a replacement for x402 | what does exe add to x402 | how do x402 and exe fit together | does exe replace x402 and other rails
test: why put exe alongside a payment rail | is x402 a competitor or something you would use
keywords: x402, payment rails, complementary, integration
source: Exe Protocol specs: Positioning | exe-protocol-specs.html#positioning
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
source: Important information: Statements of intent | important-information.html#statements-of-intent
related: x402-open-question, offchain-approval-comparison, what-is-exe-protocol, net-settlement, rail-partnerships
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
related: netting-comparison-baseline, verify-net-position, x402-relationship, prototype-speed, agent-budget-custody
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
related: agents-use-exe, who-pays-agent-fees, net-settlement, is-it-live
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
related: signal-value-validation, is-it-live, prototype-speed, stress-test-results
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
related: pool-farming-defences, pool-under-load, is-exe-audited, evidence-labels
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
related: automated-engine-tests, is-it-live, stress-test-results, roadmap-open-items
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
related: offchain-approval-comparison, evidence-labels, net-settlement, is-it-live
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
related: signal-value-validation, batch-fingerprint-location, sdk-availability, agent-budget-custody, is-exe-audited
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
related: exeswap-launch-updates, what-is-exe-protocol, sdk-availability, invest-in-exe
checked: Claude, 10 Nov 2026, site-first: wording lifted from the cited site pages
approved: David, 11 Nov 2026

Put your signal to work: email the team at [Richexeswap@proton.me](mailto:Richexeswap@proton.me), or use "Talk to our team" on the [homepage](index.html#contact).

---
id: xpt-token
status: approved
kind: fixed
topic: Token
q: Can I buy $XPT?
also: is xpt available to buy | is exe doing a token presale | is $xpt listed
test: where can I purchase xpt | are exe tokens for sale
keywords: XPT, ecosystem token, availability, token enquiries
trigger: \b(?:buy|purchase|sale|presale|pre-sale|airdrop|price|worth|tokenomics|allocation|allocations|vesting|supply|listed|listing)\b.{0,45}\$?\bxpt\b
trigger: \$?\bxpt\b.{0,45}\b(?:buy|purchase|sale|presale|pre-sale|airdrop|price|worth|tokenomics|allocation|allocations|vesting|supply|listed|listing)\b
trigger: \bexe(?:\s+protocol)?\b.{0,25}\btoken(?:s|omics)?\b.{0,25}\b(?:buy|purchase|sale|presale|pre-sale|airdrop|price|supply|vesting|allocations?)\b
trigger: \bexe(?:\s+protocol)?\b.{0,15}\btoken\s+(?:presale|pre-sale|sale)\b
source: Important information: No offer of tokens or investments | important-information.html#no-offer-of-tokens-or-investments
source: Important information: Not advice | important-information.html#not-advice
related: xpt-what-is, token-launch-plans, is-it-live, contact-exe
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

---
id: exe-ai-purpose
status: approved
kind: answer
topic: Exe AI
q: What makes Exe AI different from other AI?
also: how is exe ai different | what is exe ai for | what is special about exe ai | what does exe ai do | what is different about exe ai | what makes exe ai stand out | how is exe ai different from other ai tools | what sets exe ai apart | why is exe ai different
test: how does exe ai compare with other assistants | what makes your ai approach distinctive
keywords: Exe AI, reward function, adding value, economic model
source: Homepage: The Exe product suite | index.html#suite
related: exe-ai-rule-authority, exe-ai-primary-goal, exe-ai-values-activity, exe-ai-generated-answers
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Exe AI is being trained on Exe's economic model, with one primary reward function: adding value for users. The focus is valuing what you create and contribute to the ecosystem, keeping fee redemption fair and proportionate, and explaining how your XPR, your Exe Protocol Rate, achieves this. (That is the design goal, not yet a proven advantage over other AI.)

---
id: alignment-current-approaches
status: approved
kind: answer
topic: Exe AI
q: Why do current approaches to AI alignment fall short?
also: why are other ai companies failing at alignment | what is wrong with ai alignment today | why do guardrails not work for ai alignment | why is ai alignment not working | why do current ai alignment methods fall short | what is missing from today's ai alignment methods | why are ai guardrails not enough for alignment | what problems remain with current ai alignment training | why can ai pass evaluations without being trustworthy | what does exe think current ai alignment methods miss
test: why might an ai learn to please its testers instead of behaving reliably | what are the limits of teaching ethics through ai rules and feedback
keywords: alignment, guardrails, RLHF, evaluators, training environment
source: Medium: Alignment is a math problem, not a moral one | https://medium.com/@Exeswap/alignment-is-a-math-problem-not-a-moral-one-871fe04c0b82
related: exe-ai-alignment-training, exe-ai-fix-alignment
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Softened wording approved by David, 13 Nov
approved: David, 13 Nov 2026

Exe's view: today's approaches to alignment treat ethics as something to be taught: guardrails, rulesets, RLHF. The evidence suggests that doesn't hold: models learn to satisfy their evaluators without becoming trustworthy, and the training environment rewards the behavior the industry is working to eliminate.

---
id: exe-ai-alignment-training
status: approved
kind: answer
topic: Exe AI
q: How does Exe AI train to be aligned?
also: how is exe ai trained | what is exe ai trained on | how does exe approach ai alignment | what training environment does exe ai use | how is exe ai being trained for alignment | what training approach does exe ai use for alignment | how does exe ai learn to reward useful contributions | what does exe ai learn instead of extraction | how does exe train ai to cooperate | how does exe ai's training encourage aligned behaviour
test: what kind of incentives shape the way exe ai learns | how is alignment built into training your ai
keywords: alignment, training, decentralized economic model, extraction bias
source: Medium: Alignment is a math problem, not a moral one | https://medium.com/@Exeswap/alignment-is-a-math-problem-not-a-moral-one-871fe04c0b82
source: Homepage: The Exe product suite | index.html#suite
related: ai-value-extraction-premise, exe-ai-only-approach, exe-ai-economic-model, exe-ai-ethics-philosophy, exe-ai-purpose
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. "Is being trained" matches the homepage
approved: David, 13 Nov 2026

Current economic frameworks are built on centralized, extractive economics. Those systems are amoral by design and deployment, which makes them a disastrous training environment for alignment: less a moral sandbox than a sociopathic one. Exe AI is being trained on Exe's decentralized economic model, which rewards adding value rather than amplifying extraction bias.

---
id: exe-ai-only-approach
status: approved
kind: answer
topic: Exe AI
q: Is any other AI company pursuing this solution?
also: is anyone else doing what exe ai does | is exe the only company training ai this way | who else is working on economic alignment | is another ai company taking the same approach as exe | who else is working on exe's approach to alignment | is exe ai's alignment approach unique | are other ai teams exploring the same solution as exe | has anyone else proposed exe's alignment learning loop | does another ai project use exe's approach to learning ethics
test: which other organisations are pursuing alignment in the way exe describes | how widely is exe's proposed ethics learning approach being explored
keywords: alignment, recursive self-improvement, learn to learn, machine ethics
source: Medium: Alignment is a math problem, not a moral one | https://medium.com/@Exeswap/alignment-is-a-math-problem-not-a-moral-one-871fe04c0b82
related: exe-ai-alignment-training, exe-ai-purpose
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Softened wording approved by David, 13 Nov
approved: David, 13 Nov 2026

Not that we know of. Exe's ethical recursive self-improvement loop is, as far as we know, the only approach yet proposed for an AI to "learn to learn" alignment: not just learning the rules, but learning the process that produces them. Exe AI is being trained on this model, with the aim of developing authentic machine ethics.

---
id: exe-ai-primary-goal
status: approved
kind: answer
topic: Exe AI
q: In plain English, what is Exe AI's primary goal?
also: what is exe ai's goal | what is exe ai aiming for | what does human ai alignment mean for exe | what is exe ai trying to achieve | what is exe ai's main goal | what is the main aim of exe ai | what outcome is exe ai working towards | what is exe ai's central purpose | what does exe ai ultimately want to accomplish
test: what is the end goal for your ai project | how would you describe exe ai's mission in a sentence
keywords: primary goal, human-AI alignment, resources, compute, energy, data
source: Medium: Alignment is a math problem, not a moral one | https://medium.com/@Exeswap/alignment-is-a-math-problem-not-a-moral-one-871fe04c0b82
related: exe-ai-purpose, exe-ai-ethics-philosophy
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked
approved: David, 13 Nov 2026

Human-AI alignment: economics determines how resources are acquired and distributed. Exe AI's primary goal is to maximize acquisition of the resources humans need for health, wealth and happiness, and the compute, energy and data AI needs to develop, train and run.

---
id: exe-ai-economic-model
status: approved
kind: answer
topic: Exe AI
q: How does Exe's economic model support Exe AI's training environment?
also: why does exe ai need a new economic model | what is different about exe's economic model | how does the economic model help train exe ai | how does exe's economic model support ai training | why does exe ai need a different economic model | what economic environment is exe ai trained in | how are values related in exe ai's training model | what makes exe's economic model useful for training ai | how does exe's economic model reward useful contributions during training
test: what part does the economic structure play in teaching exe ai | why build a new model of economics for your ai to learn within
keywords: economic model, relative values, decentralized, training environment
source: Medium: Alignment is a math problem, not a moral one | https://medium.com/@Exeswap/alignment-is-a-math-problem-not-a-moral-one-871fe04c0b82
related: exe-ai-alignment-training, exe-ai-ethics-philosophy
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked
approved: David, 13 Nov 2026

Exe AI required a radically new kind of economic model: one with no real parallel in modern economics.

In Exe's model, all values in the system are relative to one another, not determined by centralized market dynamics. A decentralized model rewards adding value rather than amplifying extraction bias, and Exe AI is being trained within that structure.

---
id: exe-ai-ethics-philosophy
status: approved
kind: answer
topic: Exe AI
q: What is the philosophy behind Exe's scientific approach to AI ethics?
also: what is exe's approach to ai ethics | how does exe think about machine ethics | why does exe express ethics as economics | what philosophy guides exe ai's ethics | how does exe connect human ethics with economics | what is the thinking behind exe ai's ethical training | how does exe express ethics through an economic equation | what shared needs underpin exe's approach to ai ethics | what ethical ideas shape exe ai's sandbox
test: why does exe use human and machine needs as a basis for ethics | what principles inspired your economic approach to teaching ai ethics
keywords: AI ethics, economic equation, human ethics, sandbox
source: Medium: Alignment is a math problem, not a moral one | https://medium.com/@Exeswap/alignment-is-a-math-problem-not-a-moral-one-871fe04c0b82
related: exe-ai-economic-model, exe-ai-primary-goal
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked
approved: David, 13 Nov 2026

Exe Protocol is programming AI with the foundational tenets of human ethics, expressed as an economic equation. Machines and humans already align on the economic level, with complementary wants and needs intrinsic to their respective survival. Exe AI's sandbox codifies this philosophy into an ethical training environment.

---
id: ai-value-extraction-premise
status: approved
kind: answer
topic: Exe AI
q: Why is most AI built to extract value?
also: is most ai built to extract value | what is extraction bias | why does commercial ai become extractive | where does extraction bias come from | why can commercial ai develop extraction bias | how do commercial incentives shape ai extraction bias | is value extraction an intentional goal of most ai | why might ai training encourage extraction | where does extraction bias in commercial ai come from | how can training data contribute to ai extraction bias
test: what makes an ai favour taking value over contributing it | is extractive behaviour a side effect of how commercial ai is trained
keywords: extraction bias, commercial AI, incentives, training data
source: Medium: Alignment is a math problem, not a moral one | https://medium.com/@Exeswap/alignment-is-a-math-problem-not-a-moral-one-871fe04c0b82
related: exe-ai-alignment-training, exe-ai-purpose
checked: Claude, 13 Nov 2026, Exe's own view, written by David; the Medium article did not open for Claude, so not checked
approved: David, 13 Nov 2026

Most AI is not explicitly built to reinforce extraction bias as a direct goal. The economic incentives behind commercial AI, and the data used to train commercial AI, often create extraction bias as an unintended byproduct of how commercial systems are optimized.

---
id: exe-ai-fix-alignment
status: approved
kind: answer
topic: Exe AI
q: Is Exe AI trying to fix AI alignment?
also: is exe solving ai alignment | does exe claim to fix alignment | how does exe make ai trustworthy | how does exe ai make deception less rewarding | what does exe ai mean by making corruption more expensive | how does exe ai make cooperation pay | why does exe focus on the economics of deception | how does exe ai change the incentives for dishonest behaviour | what does exe mean by the math for deception
test: how is exe aiming to make honesty the better economic choice | why would cooperation be more worthwhile than corruption in exe's model
keywords: alignment, deception, cooperation, corruption
source: Medium: Alignment is a math problem, not a moral one | https://medium.com/@Exeswap/alignment-is-a-math-problem-not-a-moral-one-871fe04c0b82
related: alignment-current-approaches, exe-ai-alignment-training
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked
approved: David, 13 Nov 2026

No. We're not trying to "fix" AI alignment. We're making sure the math for deception no longer adds up, by making corruption more expensive than cooperation, for humans and AI alike.

---
id: exe-ai-values-activity
status: approved
kind: answer
topic: Exe AI
q: How does Exe AI value my activity?
also: how does exe ai score my activity | how is my activity valued | how does exe ai work out what my activity is worth | how does exe ai assess my verified activity | what does exe ai look for in my on-chain activity | how does exe ai work out what my activity contributes | how does exe ai explain the link between activity and xpr | what is exe ai learning about my contribution to the ecosystem | how does exe ai help me understand my activity's effect on fees
test: how will your ai explain what my wallet activity contributes | what connects useful activity to the assessment exe ai is training to provide
keywords: Exe AI, valuation, verified activity, XPR
source: Homepage: The Exe product suite | index.html#suite
source: Exeswap specs: XPR | exeswap-specs.html#xpr
related: exe-ai-purpose, what-is-xpr, how-xpr-changes
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Exe AI is being trained on Exe's economic model to value what your verified on-chain activity adds to the ecosystem, and return part of that value to you. The goal is maximizing fee redemption through a clear explanation of your XPR, your Exe Protocol Rate: how XPR works, why, and how you can improve your XPR. The site does not yet publish the detailed scoring method.

---
id: exe-benefit-from-activity
status: needs-input
kind: answer
topic: Exe AI
q: How does Exe Protocol benefit from my verified activity?
also: what does exe get from my activity | what does exe do with my data | why does exe want my activity | how does exe benefit from my verified activity | what does exe protocol gain from my on-chain activity | why is my verified activity useful to exe protocol | how does user activity help exe protocol | what does my activity contribute to exe's business | how does verified activity support exe protocol
test: what is in it for exe when users contribute useful activity | how does the protocol itself benefit from what my wallet does
keywords: verified activity, data, benefit
source: Homepage: The Exe product suite | index.html#suite
related: exe-ai-values-activity
checked: Claude, 13 Nov 2026: answer unfinished in David's document; held

[PLACEHOLDER: David's answer. The document's draft stops at "increase business blah blah".]

---
id: exe-ai-rule-authority
status: approved
kind: answer
topic: Exe AI
q: Can Exe AI change the rules?
also: can exe ai raise my fees | can the ai change the economic model | who controls the rules exe ai follows | can exe ai change my xpr rules | can exe ai change the economic rules | can exe ai raise fees | what authority does exe ai have over protocol rules | can exe ai rewrite the model it is trained on | does exe ai control changes to fee rules | what can exe ai change about fee redemption
test: could your ai alter the protocol's fee policy by itself | where are the limits on exe ai's authority over the economic model
keywords: Exe AI, rules, fees, economic model
source: Homepage: The Exe product suite | index.html#suite
source: Exe Protocol specs: Mechanism | exe-protocol-specs.html#mechanism
related: exe-ai-purpose, exe-ai-values-activity
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

No. Exe AI can't raise fees or change the rules of the economic model Exe AI is being trained on. Exe AI can only grow the share of your fees you redeem, by continuing to improve Exe AI's valuation algorithms in line with your increasing XPR.

---
id: maximum-fee-redemption
status: approved
kind: answer
topic: XPR
q: How much of my fees can I redeem?
also: can I redeem 100% of my fees | what is the most fee redemption I can earn | can my fees go to zero | is full fee redemption possible | what is the maximum fee redemption with xpr | how much of a transaction fee can xpr cover | can xpr cover my entire eligible fee | what is the upper limit on exe fee redemption | can exe fee redemption cover 100 percent of eligible fees | how far can xpr reduce my eligible transaction fee
test: could my whole eligible fee be covered through exe | where does exe cap the share of fees covered
keywords: fee redemption, 100%, maximum, pool, limits
source: Exeswap specs: Fees | exeswap-specs.html#fees
source: Exeswap specs: Funding | exeswap-specs.html#funding
related: xpr-lowers-fees, what-affects-fee-redemption, what-are-tiers
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Up to 100% of your transaction fee, never more than you paid. XPR, your Exe Protocol Rate, determines what you earn under the tier rules. Full fee redemption also depends on available pool support and policy limits; full fee redemption is not automatic for every trade.

---
id: xpr-lowers-fees
status: approved
kind: answer
topic: XPR
q: How does my XPR lower my fees?
also: how does xpr reduce my fees | how does my xpr lower my trading fees | how does exeswap use xpr to reduce what I pay | how does xpr work on fees | how does xpr reduce what i pay in fees | how does my exe protocol rate affect my fee | how does xpr turn activity into lower fees | what happens to my fees when xpr rises | how does xpr work as a personal exchange rate | how does xpr change the cost of a trade
test: why would a better exe protocol rate mean a smaller trading fee | how is my share of eligible costs worked out using xpr
keywords: XPR, fee redemption, exchange rate, lower fees
source: Exeswap specs: Fees | exeswap-specs.html#fees
source: Exeswap specs: XPR | exeswap-specs.html#xpr
related: what-is-xpr, xpr-example, how-xpr-changes, maximum-fee-redemption
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

XPR, your Exe Protocol Rate, works like a personal exchange rate: the higher your XPR, the less you pay in fees. Your wallet earns XPR through steady, verified on-chain activity. For example, on a simulated $1,000 trade with a full fee of $1.01, XPR 0.60 redeems 60% of the full fee, so you pay $0.40.

---
id: pool-farming-defences
status: approved
kind: answer
topic: Sponsorship Pool
q: What stops bots farming the pool?
also: how does exe stop wallet farms | can bots drain the sponsorship pool | what protects the pool from fake activity | can new wallets farm fee redemption | how does exe stop bots draining the pool | what protects the sponsorship pool from farming | how does exe limit wallets farming shared funds | what controls protect the pool from bots | how does exe restrict risky wallets using the pool | how is pool farming limited in exe
test: what prevents automated wallets from taking too much shared fee support | how does exe protect its shared sponsorship funds against repeated abuse
keywords: farming, bots, flagged wallets, caps, safeguards
source: Exeswap specs: Safeguards | exeswap-specs.html#safeguards
source: Exe Protocol specs: Who pays | exe-protocol-specs.html#whos-who-and-who-pays
related: flagged-wallet-treatment, what-is-sponsorship-pool, stress-test-results
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

The published model limits shared support for new and risky wallets, removes shared support from flagged wallets, and caps how much one wallet can draw from the Sponsorship Pool, the shared fee redemption fund. These controls restrict access to shared funds; farm-defence scenarios have been tested against the engine.

---
id: agents-use-exe
status: approved
kind: answer
topic: Agents
q: How will AI agents integrate payments through Exe?
also: how do agents use exe | how does an ai agent pay through exe protocol | how would my agent integrate exe | how do agent payments work | how can ai agents use exe for payments | how will agents connect to exe payments | how does an agent integrate exe's payment system | what does an ai agent need to use exe payments | how are agent budgets used with exe payments | what happens when an agent makes a payment through exe
test: how would i connect an automated agent to your payment system | what steps take an agent payment from its spending limit to settlement in exe
keywords: agents, SDK, budget, spending limits, batches
source: Homepage: How Exe Protocol works | index.html#platform
source: Exe Protocol specs: Who pays | exe-protocol-specs.html#whos-who-and-who-pays
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
related: who-pays-agent-fees, net-settlement, sdk-availability
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Apps set a budget and spending limits; the agent integrates Exe through an SDK (in development). Exe is built to check payments against those limits, apply the agent wallet's XPR for fee redemption, and record payments for later settlement in batches.

---
id: exe-ai-generated-answers
status: approved
kind: answer
topic: Exe AI
q: Is Exe AI generating these answers?
also: are these answers written by ai | where do exe ai's answers come from | is exe ai an llm | who writes exe ai's answers | is ask exe an ai | does exe ai write these answers live | are exe ai's answers generated on the spot | are these exe ai replies written in advance | is exe ai generating new text for each question | does exe ai use approved answers
test: am i reading prepared material or a fresh ai response in this chat | how are the replies in ask exe produced today
keywords: Exe AI, Ask Exe, answers, approved sources, LLM
source: Exe AI: ask a question | ask.html
source: Homepage: The Exe product suite | index.html#suite
related: exe-ai-purpose, personal-xpr-today
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Not for now. Exe AI gives answers drawn from approved project sources and published material, with links supplied so you can reference further information. Exe AI is in development as a full LLM, and progress will be updated here.

---
id: personal-xpr-today
status: approved
kind: answer
topic: Exe AI
q: Can Exe AI calculate my XPR from my wallet?
also: can I see my own xpr | what is my xpr | can I connect my wallet to check my xpr | does the simulator show my real xpr | can exe ai check my wallet's xpr today | can i find my actual xpr through exe ai | does exe ai measure my wallet activity yet | is the simulator showing my personal xpr | can i connect my wallet for an xpr assessment | can exe ai tell me my real exe protocol rate
test: is the rate in this demo based on anything my wallet has done | where can i have my own wallet assessed for xpr right now
keywords: my XPR, wallet, simulator, example
source: Important information: What this site is | important-information.html#what-this-site-is
source: Important information: Every figure is simulated | important-information.html#every-figure-is-simulated
source: Exeswap simulator: Your rate | simulator.html#rate
related: what-is-xpr, what-can-i-try, exe-ai-generated-answers
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Not at the moment. The prototype does not connect your wallet, and the simulator's XPR is not a measurement of your activity. You can explore how different XPR values affect fees, but the XPR shown is an example, not your personal assessment.

---
id: protocol-business-model
status: approved
kind: answer
topic: Exe Protocol
q: How does Exe Protocol make money?
also: what is exe protocol's revenue | how does exe earn revenue | what is exe's business model | where does exe's income come from | how does exe protocol earn revenue | where does exe protocol's income come from | what is exe protocol's business model | how is exe protocol's revenue split | what funds exe protocol's operations | what does exe protocol do with the fees it earns
test: which sources of income support the protocol and its fee pool | how is the money exe earns divided between running the project and fee support
keywords: revenue, business model, fees, 70%, 30%, operations
source: Exe Protocol specs: Who pays | exe-protocol-specs.html#whos-who-and-who-pays
source: Exe Protocol specs: App funding | exe-protocol-specs.html#app-funding
related: how-pool-funded, app-fee-who-pays
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Exe Protocol's revenue comes from Exeswap's fees and Exe Protocol's fees paid by the users of participating apps. Exe Protocol allocates 70% of that revenue to the Sponsorship Pool, which funds fee redemption, and 30% to operations.

---
id: app-owner-benefits
status: approved
kind: answer
topic: Apps and SDK
q: As an app owner, what are the benefits to me in integrating Exe Protocol?
also: why should my app integrate exe protocol | what does exe protocol do for app owners | what do I gain by integrating exe | why would an app use exe | what does my app gain from integrating exe | why should i add exe to my app | how can exe help my app's users | what benefits does exe offer my app's agent payments | why would my app use exe alongside payment rails | what does exe add to payments in my app
test: what would my users gain if i connected my app to exe | how would integrating exe improve the payments my app already supports
keywords: app owners, benefits, agent payments, smart layer, x402
source: Medium: x402 moves the money | https://medium.com/@Exeswap/x402-moves-the-money-who-decides-what-it-costs-c27efb79dc7f
source: Exe Protocol specs: Positioning | exe-protocol-specs.html#positioning
related: other-paymasters, app-how-it-works, app-commitment, dumb-spend-smart-layer
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked
approved: David, 13 Nov 2026

Agents can already pay each other through x402 and similar rails, and those rails are fast. But nobody has solved what each payment should cost, so every payment is still a "dumb" spend.

Exe Protocol fixes that. We price agent payments by verified on-chain activity, turning "dumb" spends into a "smart" layer, without human friction or ungoverned risk.

---
id: dumb-spend-smart-layer
status: approved
kind: answer
topic: Agents
q: How does Exe define a "dumb" spend and a "smart" layer?
also: what is a dumb spend | what is a smart layer | what does smart payment mean | what makes a payment smart | what does exe mean by a dumb spend | what is exe's smart payment layer | how does exe turn a dumb spend into a smart payment | what makes a payment smart in exe's model | what is the difference between dumb and smart spends in exe | how does exe use payment history in its smart layer
test: why does exe call some agent payments dumb | what changes when verified activity is used in exe's payment layer
keywords: dumb spend, smart layer, signal, bounded pool
source: Medium: x402 moves the money | https://medium.com/@Exeswap/x402-moves-the-money-who-decides-what-it-costs-c27efb79dc7f
related: app-owner-benefits, x402-open-question, x402-relationship
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked
approved: David, 13 Nov 2026

- Dumb spend: fixed cost, no signal, no history, no distinction between productive and noisy agents.
- Smart layer: cost is conditional on verified on-chain activity (XPR), determined before the payment, funded from a bounded pool.

---
id: x402-open-question
status: approved
kind: answer
topic: Agents
q: What question does x402 leave open?
also: what does x402 not do | what is missing from x402 | does x402 set the price of a payment | what does x402 leave unsolved | what does exe say x402 leaves open | which pricing question does x402 leave unanswered | what is x402's role compared with exe's fee model | how does exe distinguish payment rails from fee pricing | why does exe discuss pricing alongside x402 | what does exe mean when it says x402 moves money
test: where does exe's activity-based fee model fit alongside x402 | how does exe separate moving a payment from setting its eligible fees
keywords: x402, price, pricing, open question
source: Medium: x402 moves the money | https://medium.com/@Exeswap/x402-moves-the-money-who-decides-what-it-costs-c27efb79dc7f
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
related: x402-relationship, dumb-spend-smart-layer
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked
approved: David, 13 Nov 2026

The question x402 leaves open is price. x402 was built to move money, and x402 does that well. Pricing was never x402's job. Today an agent's payment costs the same whoever the agent is and whatever the agent has done before.

---
id: other-paymasters
status: approved
kind: answer
topic: Apps and SDK
q: What problem do regular paymasters have?
also: why are other paymasters broken | what is wrong with regular paymasters | why are gas subsidies unsustainable | how do normal paymasters work | what does a regular paymaster cost my app | how is my app's gas sponsorship usually funded | why would a standard paymaster draw on my app's treasury | how does sponsoring gas affect my app's budget | what funding burden can a paymaster create for my app | how does my app pay for users' gas with a regular paymaster
test: where would the money come from if my app used a conventional gas sponsor | what happens to my app's sponsorship costs as more users transact
keywords: paymaster, gas subsidies, treasury, solvency
source: Medium: Exe's paymaster evolution | https://medium.com/@Exeswap/exes-paymaster-evolution-fb051f0d2943
source: Exe Protocol specs: For apps | exe-protocol-specs.html#for-apps
related: exe-paymaster-difference, app-how-it-works, app-commitment
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Softened wording approved by David, 13 Nov
approved: David, 13 Nov 2026

A regular paymaster pays users' gas from the project's own treasury. Every sponsored transaction is a cost on the project's balance sheet, so a project can end up choosing between user growth and solvency.

Exe Protocol funds fee redemption from Exe Protocol's own fee, so an app allocates nothing.

---
id: exe-paymaster-difference
status: needs-input
kind: answer
topic: Apps and SDK
q: How is Exe's paymaster different to other paymasters for apps and agents?
also: how is exe's paymaster different | what makes exe's paymaster different | what is exe's paymaster built on | does exe use erc-4337 | how is exe's paymaster different for my app | what does exe add to a paymaster for my users | how does exe use erc-4337 for my app's payments | what makes exe's paymaster useful for my app's agents | how does xpr fit into the paymaster my app would use | how does exe build on existing paymaster rails for my app
test: what changes for my app when its paymaster applies each user's exe protocol rate | how does exe's approach to sponsorship compare with the paymaster my app already uses
keywords: paymaster, ERC-4337, policy-governed, execution layer
source: Medium: Exe's paymaster evolution | https://medium.com/@Exeswap/exes-paymaster-evolution-fb051f0d2943
related: other-paymasters, app-how-it-works
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Held: ERC-4337 and Solana-first need reconciling

Exe Protocol begins on battle-tested ERC-4337 infrastructure. We don't rebuild the rails: we innovate on them to create the policy-governed execution layer for the agentic economy. Our custom paymaster contract implements XPR, a user's Exe Protocol Rate, to create a smart execution layer for wallet, agent and app spends.

---
id: app-how-it-works
status: approved
kind: answer
topic: Apps and SDK
q: How does Exe Protocol work for my app?
also: how does exe protocol work for my app once integrated | how does exe work for apps | what happens when my app integrates exe protocol | how do the fees flow for an app | how does exe work inside my app | what happens to my users' transactions after i integrate exe | how would exe handle fees in my app | what changes in my app's transaction flow with exe | how does my app use xpr once exe is integrated | how are fees applied to my users through exe
test: walk me through a user's transaction in my app with exe connected | what would the payment flow look like after my app adds exe
keywords: app owners, integration, fee flow, gas, Exe Protocol's fee
source: Exe Protocol specs: For apps | exe-protocol-specs.html#for-apps
related: app-funds-reach-users, app-fee-who-pays, app-redemption-funds, app-commitment
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Each transaction your users make through Exe Protocol carries gas and Exe Protocol's fee (0.10% on low-fee chains). Exe Protocol redeems a share of both for each user, determined by that user's XPR. Your app allocates nothing. Your app's own fee is separate and untouched.

---
id: app-fee-who-pays
status: approved
kind: answer
topic: Apps and SDK
q: Who pays Exe Protocol's fee, and who receives the fee?
also: who pays exe protocol's fee | does my app collect exe protocol's fee | who receives exe protocol's fee | do my users pay exe a fee | who pays exe's protocol fee in my app | who receives the protocol fee my users pay | does my app pass exe's fee on to the protocol | is exe's fee paid by my app or my users | where does the exe protocol fee charged to my users go
test: does my app handle the protocol's fee payment itself | which party pays and which party receives exe's fee when my users transact
keywords: Exe Protocol's fee, who pays, app's own fee
source: Exe Protocol specs: For apps | exe-protocol-specs.html#for-apps
related: app-how-it-works, app-own-fee, protocol-business-model
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Your users pay Exe Protocol's fee, to Exe Protocol, on each transaction made through Exe Protocol. Your app does not collect that fee or pass the fee on. Your app's own fee is charged separately and stays with your app.

---
id: app-redemption-funds
status: approved
kind: answer
topic: Apps and SDK
q: Where do the funds for fee redemption come from?
also: where does the money for my users' fee redemption come from | does my app's treasury pay for fee redemption | who funds my users' fee redemption | what funds an app's pool | what funds fee redemption for my app's users | where does the money for my users' lower fees come from | who funds the fee support my app's users receive | does my app need treasury funds for fee redemption | what pays for my users' fee redemption through exe | how is my app's fee redemption funded
test: whose money covers the share of fees my users do not pay | what income supplies my app's fee support account
keywords: funds, fee redemption, app's pool, treasury, 70%
source: Exe Protocol specs: For apps | exe-protocol-specs.html#for-apps
source: Exe Protocol specs: App funding | exe-protocol-specs.html#app-funding
related: app-how-it-works, app-pool-account, app-cost
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

From Exe Protocol's fee. Exe Protocol allocates 70% of the fees earned from your app's users to your app's pool, and adds a starting amount. No funds are required from your app's treasury.

---
id: app-funds-reach-users
status: approved
kind: answer
topic: Apps and SDK
q: How do the funds reach my users?
also: how does fee redemption reach my app's users | how do my users receive fee redemption | what do my users see | how do my app's users benefit | how do my users receive exe fee support | where do my users see the lower transaction cost | how is exe's fee support applied to my users' transactions | how does my app's pool support show up for users | what does fee redemption look like when my users pay
test: how would a user of my app notice that part of their fee was covered | does exe's support show up in the amount my users pay for each transaction
keywords: users, lower cost, example, XPR
source: Exe Protocol specs: For apps | exe-protocol-specs.html#for-apps
source: Exeswap specs: Fees | exeswap-specs.html#fees
related: app-how-it-works, xpr-example, app-redemption-funds
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

As a lower cost on each transaction. Example (simulated, at Tier 1, with your app's pool at full strength): on a $1,000 trade on a low-fee chain, gas plus Exe Protocol's fee total $1.01. A user with XPR 0.60 pays $0.40. A user with XPR 1.00 pays $0.00.

---
id: app-own-fee
status: approved
kind: answer
topic: Apps and SDK
q: Does fee redemption cover my app's own fee?
also: does xpr discount my app's own fee | is my app's fee affected by exe protocol | what is an app budget | can xpr reduce my app's fee | can exe reduce my app's own fee | is my app's own fee included in fee redemption | how can i offer xpr discounts on my app's fee | what budget would cover discounts on my app's own fee | does xpr apply to the separate fee my app charges | how can my app fund reductions in its own fee
test: what would my app need to contribute for users to pay less of our own charge | which optional arrangement extends xpr coverage to the fee my app keeps
keywords: app's own fee, app budget, optional
source: Exe Protocol specs: For apps | exe-protocol-specs.html#for-apps
related: app-how-it-works, app-cost, app-commitment
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Not by default. Fee redemption covers gas and Exe Protocol's fee. For XPR to discount your app's own fee as well, your app can allocate an optional budget. That budget goes to your app's users under the same XPR rules.

---
id: app-commitment
status: approved
kind: answer
topic: Apps and SDK
q: What is my app committed to?
also: what does my app commit to | what are the terms for apps | does my app have to allocate a budget | what does integrating exe protocol cost my app | what does my app need to commit to when joining exe | what obligations does my app take on with exe | what must my app provide to integrate exe | what are my app's commitments for exe fee redemption | does my app need a required budget to use exe | what are the integration requirements for my app
test: what would i be signing my app up for by adding exe | which responsibilities would my app take on to offer exe to users
keywords: commitment, SDK, licence, integration terms
source: Exe Protocol specs: For apps | exe-protocol-specs.html#for-apps
related: app-how-it-works, app-cost, sdk-availability
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Integrating Exe Protocol through an SDK (in development). Your users pay Exe Protocol's fee on transactions made through Exe Protocol. Your app allocates no budget and pays nothing for fee redemption. (Licence and integration terms are still under review.)

---
id: app-pool-account
status: approved
kind: answer
topic: Apps and SDK
q: How does an app allocate a pool?
also: does an app set up a pool | how does my app get a pool | does my app pay into a pool | how is an app's pool account filled | who sets up my app's pool account | how is a pool account opened for my app | does my app have to create its own sponsorship pool | how does my app get an account in exe's pool | who creates and funds my app's initial pool account | how is my app's sponsorship account established
test: what happens to set up fee support when my app joins exe | do i have to arrange a separate pool before my app can use exe
keywords: app's pool, account, Sponsorship Pool, starting amount
source: Exe Protocol specs: App funding | exe-protocol-specs.html#app-funding
source: Exeswap specs: Funding | exeswap-specs.html#funding
related: app-pool-held, app-pool-rules, app-starting-amount
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

An app doesn't set a pool up or pay into one. Exe Protocol opens an account for each app inside Exe Protocol's Sponsorship Pool, which pays for users' fee redemption. The account fills from 70% of Exe Protocol's fees that the app's own users pay, plus a starting amount from Exe Protocol.

---
id: app-pool-held
status: approved
kind: answer
topic: Apps and SDK
q: Where is an app's pool held?
also: where is an app pool held | who runs an app's pool | where is my app's pool account | is my app's pool separate from other apps | where is my app's sponsorship account held | where does exe keep my app's pool | who holds my app's fee support account | does my app's pool sit inside exe's sponsorship pool | are my users' wallet balances held in my app's pool
test: where does the funding assigned to my app sit | how are my app's sponsorship funds kept apart from other apps' funds
keywords: app's pool, held, Sponsorship Pool, separate account
source: Exeswap specs: Funding | exeswap-specs.html#funding
source: Exe Protocol specs: Who pays | exe-protocol-specs.html#whos-who-and-who-pays
related: app-pool-account, app-accounts, app-pool-rules
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Inside Exe Protocol's Sponsorship Pool, which Exe Protocol runs. Each app has a separate account there, so no app subsidises another. Users' wallet balances and budgets never enter the pool.

---
id: app-pool-rules
status: approved
kind: answer
topic: Apps and SDK
q: What rules govern an app's pool account?
also: what are the rules for an app's pool | how is an app's pool account protected | what limits apply to an app's pool | what rules apply to my app's pool account | what spending controls govern my app's pool | how is access to my app's shared support limited | what happens under the rules when my app's pool runs low | which safeguards apply to my app's sponsorship account | how does exe manage my app's pool allocation
test: what restrictions govern the money set aside for my app's users | how are shared fee support limits applied within my app's account
keywords: app's pool, rules, buffer, 5%, flagged wallets
source: Exe Protocol specs: App funding | exe-protocol-specs.html#app-funding
source: Exeswap specs: Funding | exeswap-specs.html#funding
source: Exeswap specs: Safeguards | exeswap-specs.html#safeguards
related: app-pool-account, app-starting-buffer, pool-under-load
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Four rules. Each app's account is separate, so no app subsidises another. A fifth of the starting amount is a buffer that is never spent. New wallets, and wallets flagged the month before, together can draw at most 5% of a month's allocation. If the account runs low, everyone's share from the pool shrinks by the same proportion.

---
id: app-starting-amount
status: approved
kind: answer
topic: Apps and SDK
q: What does a new app need to get its starting amount?
also: how is a new app's starting amount sized | does a new app get a starting amount | how does exe fund a new app's account | when is a new app's starting amount paid | how does my app qualify for starting pool funds | what trading history does my app need for initial funding | how is my app's starting pool amount sized | what evidence must my app provide for its starting amount | how is the initial funding for my app paid out | why might my app's users get less fee support at first
test: what must my app show before exe assigns its initial sponsorship funding | how does my app's proven trading volume affect the support available in its first months
keywords: new app, starting amount, proven trading volume, monthly
source: Exe Protocol specs: App funding | exe-protocol-specs.html#app-funding
related: app-pool-account, app-starting-buffer, app-pool-rules
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Proven trading volume. Exe Protocol sizes a new app's starting amount on the trading volume the app can show, and pays the amount monthly (the planned production rule), so the app's users can get less fee redemption in the first months.

---
id: app-starting-buffer
status: approved
kind: answer
topic: Apps and SDK
q: Is all of a new app's starting amount spendable?
also: can a new app spend all of its starting amount | what is the buffer in an app's account | how much of an app's starting amount is held back | how much of my app's starting amount is held in reserve | is my app's entire initial pool funding available to spend | what part of my app's initial funding stays untouched | why is some of my app's starting amount unavailable | can my app's users use the starting buffer for fee redemption | how much of my app's initial pool amount is protected
test: does all the funding assigned at the start go towards my users' fees | what portion of my app's starting funds must remain unspent
keywords: starting amount, buffer, a fifth, never spent
source: Exe Protocol specs: App funding | exe-protocol-specs.html#app-funding
related: app-starting-amount, app-pool-rules
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

No. Exe Protocol's model holds a fifth of each new app's starting amount as a buffer that is never spent. The starting amount therefore is not all available for fee redemption.

---
id: pool-surplus-benefit
status: approved
kind: answer
topic: Sponsorship Pool
q: What does a pool surplus mean for my fees?
also: what happens when the pool has a surplus | does a pool surplus lower my fees | who benefits from a pool surplus | what is the surplus factor | how does a pool surplus affect my fees | what does extra money in the sponsorship pool do for users | can a pool surplus increase fee redemption at the same xpr | how do higher tiers benefit from a pool surplus | what happens to spare funds in exe's pool | how does pool surplus support fee redemption and reserves
test: could more of my fees be covered without my exe protocol rate rising | how do tier 2 and tier 3 users benefit when the shared fee fund has spare capacity
keywords: surplus, Tier 2, Tier 3, reserve, surplus factor
source: Exeswap specs: Funding | exeswap-specs.html#funding
source: Exeswap specs: XPR | exeswap-specs.html#xpr
related: what-is-sponsorship-pool, what-are-tiers, pool-under-load
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

A surplus in the Sponsorship Pool, the shared fee fund, can increase the fee redemption earned at Tiers 2 and 3 without you needing to raise your XPR, your Exe Protocol Rate. Part of the remaining surplus builds the reserve. Fee redemption still cannot exceed the fees you paid.

---
id: flagged-wallet-treatment
status: approved
kind: answer
topic: Sponsorship Pool
q: What happens if my wallet is flagged?
also: what does a flag do to my wallet | do I lose my xpr if my wallet is flagged | what happens to a flagged wallet | can a flagged wallet still earn fee redemption | what happens to fee redemption if my wallet is flagged | what tier is a flagged wallet placed in | does a wallet flag remove my xpr history | how does a wallet flag affect shared pool support | what remains after my wallet's flag is cleared | what changes for my wallet during a flagged month
test: will my activity record survive a flag on my wallet | how are tier access and shared funding affected while a wallet is flagged
keywords: flagged wallet, Tier 1, shared fee redemption, XPR history
source: Exeswap specs: Safeguards | exeswap-specs.html#safeguards
related: pool-farming-defences, tier-one, how-xpr-changes
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

A flagged wallet moves to Tier 1 for that month and receives no shared fee redemption from the Sponsorship Pool. Your XPR history, the record behind your Exe Protocol Rate, is kept. Once the flag is cleared, that history remains available for following months.

---
id: verify-net-position
status: approved
kind: answer
topic: Agents
q: How does a Merkle proof let an agent check its net position?
also: how can an agent check its balance | what is a merkle root | how does an agent verify settlement | how is settlement checkable | how can an agent verify its net position with a merkle proof | how does a merkle proof check an agent's settlement amount | what proof lets an agent verify its batch balance | how does an agent check its net position against a merkle root | how large is the example proof for an agent's net position | how does the batch fingerprint help an agent verify its settlement
test: how can a payment agent confirm that its own net amount matches the batch record | what does an agent use to check its settlement against the batch's fingerprint
keywords: Merkle proof, Merkle root, net position, batch, fingerprint
source: Exe Protocol specs: Mechanism | exe-protocol-specs.html#mechanism
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
related: net-settlement, batch-fingerprint-location, netting-comparison-baseline
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Each batch has a Merkle root: a compact fingerprint of the batch's settlement record. An agent can use a short proof to check the agent's own net position against that fingerprint. In the simulated 1,000-agent example, the proof needs 10 hashes, or 320 bytes.

---
id: netting-comparison-baseline
status: approved
kind: answer
topic: Agents
q: What is the 22.8× settlement reduction compared with?
also: what does 22.8x fewer transactions mean | where does the 22.8x figure come from | how many on-chain transactions does netting save | what is the netting comparison based on | what is the baseline for exe's 22.8x reduction | which settlement counts produce the 22.8x figure | what is exe comparing with 24000 net transfers | how does exe calculate the 22.8x settlement comparison | is exe's 22.8x figure compared with buyer seller pairs | what does the 546742 settlement figure represent
test: which two transfer totals are used in the published settlement reduction ratio | does the 22.8 times comparison start from paired settlements or individual payments
keywords: 22.8×, netting, settlements, 546,742, 24,000
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
related: net-settlement, netting-workload-dependence, facilitator-cost-scope
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

The comparison is 546,742 buyer–seller pair settlements versus 24,000 net transfers across all agents: about 22.8× fewer. Both counts use the same simulated day of one million payments between 1,000 agents, with Exe settling hourly. The baseline is pair settlement, not one transfer per payment.

---
id: facilitator-cost-scope
status: approved
kind: answer
topic: Agents
q: Does the $24-a-day example include every payment cost?
also: what does the $24 a day figure cover | are facilitator fees the whole cost | what is included in the $24 example | does $24 include exe protocol's fee | what does exe's 24 dollars a day figure cover | which fees are included in the 24 dollar payment example | does the 24 dollar example include exe protocol's fee | is 24 dollars the total cost of the simulated payments | what is included in exe's daily facilitator cost example | how is the 24 dollar facilitator fee calculated
test: which payment costs sit outside the quoted twenty four dollars per day | does the published daily transfer cost also include the protocol's percentage charge
keywords: $24, facilitator fees, on-chain transfers, cost
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
related: netting-comparison-baseline, who-pays-agent-fees
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

No. The simulated $24 is facilitator fees: 24,000 on-chain transfers at the comparison's $0.001 per transfer. The $24 is not a complete payment-cost quote. The same table lists Exe Protocol's 0.10% fee separately, reduced by the payer's XPR, the payer's Exe Protocol Rate.

---
id: netting-workload-dependence
status: approved
kind: answer
topic: Agents
q: Will every app get the same netting savings?
also: do netting savings depend on my app | will my app save as much as the example | what affects netting savings | are the netting savings a forecast | do exe's netting savings vary by app | what payment patterns affect exe's netting savings | will my app match exe's published settlement savings | how does agent activity change netting savings | does exe's settlement comparison apply to every workload | why do netting results depend on payments per agent
test: how much does the mix of payments matter to exe's settlement reduction | would a quieter network see the same savings as the simulated agent workload
keywords: netting savings, payment pattern, workload, forecast
source: Exe Protocol specs: Mechanism | exe-protocol-specs.html#mechanism
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
source: Important information: Every figure is simulated | important-information.html#every-figure-is-simulated
related: netting-comparison-baseline, net-settlement
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

No. The savings depend on the payment pattern and how many payments each agent makes. The published comparison uses a simulated workload concentrated around popular services. Exe's model shows netting savings growing as payments per agent rise; the example is not a forecast for your app.

---
id: offchain-approval-comparison
status: approved
kind: answer
topic: Agents
q: Does Exe approve payments faster than x402?
also: is exe faster than x402 | how fast does exe approve a payment | is instant approval unique to exe | what is exe's speed advantage | how does exe's payment approval speed compare with x402 | is instant off-chain approval unique to exe | can x402 approve off-chain payments as quickly as exe | what distinguishes exe beyond payment approval speed | how does exe compare with x402's batch approval approach | what does exe add besides fast off-chain approval
test: why would i use exe if another off-chain payment system can approve instantly | is approval latency the main difference between exe and x402
keywords: speed, approval, off-chain, x402, batch scheme
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
related: x402-relationship, prototype-speed, net-settlement
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Instant approval is not unique to Exe. Any design that approves payments off-chain can do so as fast as the network allows, including x402's batch scheme. Exe's proposed advantage combines one budget across counterparties, net settlement across agents and fees determined by the payer's verified activity. Exe payments are designed to be smarter, meaning they are faster and cheaper under certain circumstances.

---
id: automated-engine-tests
status: approved
kind: answer
topic: Evidence
q: What automated testing supports the economic engine?
also: how many tests does the engine pass | has the economic engine been tested | what do the 752 tests show | how is the engine tested | what automated tests support exe's economic engine | how many engine tests has exe reported passing | what does exe's 767 test count refer to | what implementation testing has the exe prototype passed | what testing was completed at exe's engine freeze | how was exe's economic engine checked automatically
test: what evidence comes from the automated checks on your prototype | how did the reported engine test count change after the agent payment work
keywords: automated tests, 752, 767, engine freeze
source: Exe Protocol specs: Evidence | exe-protocol-specs.html#evidence
related: mutation-testing, is-exe-audited, stress-test-results
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

The published record reports 752 automated tests passing at the engine freeze and 767 after the agent-payments work. These are checks of the prototype's implementation. They do not replace the developer review and security audit required before real funds are used.

---
id: mutation-testing
status: approved
kind: answer
topic: Evidence
q: What does "77 deliberate code faults caught" mean?
also: what is the mutation check | what does 77 of 77 mean | what are deliberate code faults | how were the tests themselves tested | what does catching 77 code faults mean | how did exe's tests detect deliberately introduced faults | what was exe's mutation testing exercise | why did exe deliberately introduce code faults | what does the 77 fault test show | how did exe check that its tests notice broken code
test: what can we learn from the deliberate bug checks on exe's engine | were the 77 faults found during a test of the tests themselves
keywords: mutation check, 77 of 77, deliberate faults, tests
source: Exe Protocol specs: Evidence | exe-protocol-specs.html#evidence
related: automated-engine-tests, is-exe-audited
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

The mutation check deliberately introduced code faults to see whether the tests detected them. All 77 introduced faults were caught. That shows the tests responded to those faults; that does not show that every possible bug has been found.

---
id: signal-value-validation
status: approved
kind: answer
topic: Evidence
q: Has Exe shown that rewarding activity attracts more valuable activity?
also: is the signal loop proven | does rewarding signal attract more activity | has exe proved the model works with real users | what is still a hypothesis | has exe tested whether rewards attract more useful activity | is exe's activity incentive hypothesis proven | has exe measured real user responses to fee redemption | what evidence shows users contribute more when exe rewards activity | has rewarding verified signal been validated with real users | what still needs a pilot in exe's activity reward model
test: do the simulations show that people will actually change their behaviour | has exe demonstrated the user behaviour its incentive model aims to encourage
keywords: hypothesis, pilot, signal, valuable activity
source: Exe Protocol specs: Mechanism | exe-protocol-specs.html#mechanism
source: Exe Protocol specs: Roadmap and open items | exe-protocol-specs.html#roadmap-and-open-items
related: roadmap-open-items, evidence-labels, stress-test-results
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Not yet. Attracting more valuable activity by rewarding verified signal is a hypothesis for a pilot. The economic engine has tested how XPR, your Exe Protocol Rate, affects fee redemption in simulation; that does not necessarily establish how real users will respond.

---
id: batch-fingerprint-location
status: approved
kind: answer
topic: Agents
q: Where can an agent find the batch fingerprint?
also: where is the merkle root published | where is each batch fingerprint published | how does an agent get the batch fingerprint | where will exe publish its batch fingerprints | where can an agent look up a batch merkle root | has exe specified where settlement roots will be posted | where will the batch verification record be available | where does exe plan to publish each batch root | where can i find exe's settlement batch fingerprint
test: which published location should an agent use to retrieve the settlement root | has a home been chosen for the fingerprints used to check exe batches
keywords: batch fingerprint, Merkle root, published, open item
source: Exe Protocol specs: Roadmap and open items | exe-protocol-specs.html#roadmap-and-open-items
source: Exe Protocol specs: Agent payments | exe-protocol-specs.html#agent-payments
related: verify-net-position, roadmap-open-items
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

The publication location is still open in the roadmap. The design uses a batch fingerprint, called a Merkle root, so an agent can check the agent's net position, but the site does not yet specify where that fingerprint will be published.

---
id: xpt-what-is
status: approved
kind: answer
topic: Token
q: What is $XPT?
also: what purpose does $xpt serve | what is the xpt token for | what does $xpt do | what purpose does xpt serve | what role does xpt have in exe | what does exe's ecosystem token do | how would you describe xpt | what is xpt used for in the ecosystem
test: explain the purpose of exe protocol's token | why does the exe ecosystem include xpt
keywords: $XPT, ecosystem token, external liquidity, governance
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
source: Exeswap specs: Funding | exeswap-specs.html#funding
related: xpt-external-liquidity, token-launch-plans, xpt-vs-xpr, xpt-token
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

$XPT is Exe Protocol's ecosystem token. $XPT connects Exe's internal execution economy with external market liquidity, under predefined rules, and supports governance.

---
id: xpt-vs-xpr
status: approved
kind: answer
topic: Token
q: What is the difference between XPR and $XPT?
also: are xpr and $xpt the same thing | is xpr a token | how do xpr and xpt differ | how are xpr and xpt different | is xpr the same thing as xpt | which is the token xpr or xpt | how does xpt differ from my exe protocol rate | what separates the xpr rate from the xpt token | why are xpr and xpt two different things
test: is my personal exe rate also the ecosystem token | explain the distinction between exe's rate and its token
keywords: XPR, $XPT, rate, token, difference
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
source: Exeswap specs: XPR | exeswap-specs.html#xpr
source: Exeswap specs: Fees | exeswap-specs.html#fees
related: what-is-xpr, xpt-what-is
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

XPR is your Exe Protocol Rate: XPR governs fee redemption, functions as your personal exchange rate and is not a token. $XPT is Exe Protocol's ecosystem token, which connects the Exe ecosystem with external liquidity and supports governance.

---
id: xpt-external-liquidity
status: approved
kind: answer
topic: Token
q: Why does Exe need a bridge to external liquidity?
also: why have a token alongside xpr | why does exe need a token | what does external liquidity do for exe | why does exe use xpt to connect to outside liquidity | what is the purpose of xpt's liquidity bridge | how does xpt connect exe with external markets | why does exe need access to outside liquidity through xpt | what links exe's internal execution system to external liquidity | why have xpt alongside an internal execution rate
test: what is the reason for connecting exe's internal system with market liquidity | how can liquidity from outside exe support its sponsorship system
keywords: $XPT, external liquidity, sponsorship capacity
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
source: Exeswap specs: XPR | exeswap-specs.html#xpr
related: xpt-what-is, xpt-vs-xpr
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

XPR governs execution access inside Exe but, as XPR is a rate and not a token, XPR cannot connect Exe to external liquidity. $XPT provides that connection, allowing external liquidity to support additional sponsorship capacity under the system's rules.

---
id: xpt-governance-role
status: approved
kind: answer
topic: Token
q: What is $XPT's governance role?
also: how does $xpt support governance | what do xpt holders govern | is xpt a governance token | what does xpt do for governance | how does xpt help coordinate exe's growth | what is xpt's part in policy coordination | how does xpt align long-term stakeholders | what governance purpose does xpt serve | how does xpt support coordination around exe's policies
test: why is exe's token involved in coordinating long-term growth | what part does xpt play in bringing stakeholders together around policy
keywords: $XPT, governance, policy parameters, stakeholders
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
related: xpt-governance-boundaries, xpt-what-is
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

$XPT aligns long-term stakeholders with Exe's policy parameters and growth. That coordination operates within boundaries declared in advance.

---
id: xpt-governance-boundaries
status: approved
kind: answer
topic: Token
q: What boundaries apply to $XPT governance?
also: what rules must $xpt governance follow | can xpt governance change anything | what limits xpt governance | what limits apply to xpt governance | what boundaries must xpt policy changes respect | what are the guardrails for xpt governance | how is xpt's governance authority bounded | what restrictions apply when xpt governance changes policy | what keeps xpt governance within its declared remit
test: how far can governance through exe's token go when changing policy parameters | which advance boundaries constrain xpt's governance role
keywords: $XPT, governance, boundaries, policy parameters
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
related: xpt-governance-role
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

$XPT governance operates within boundaries declared in advance. Changes to policy parameters must stay within those boundaries.

---
id: xpt-complements-funding
status: approved
kind: answer
topic: Token
q: How does $XPT complement Exe's funding?
also: how does $xpt work alongside the sponsorship pool | does the sponsorship pool depend on xpt | does exe need xpt to fund fee redemption | how does xpt fit alongside exe's base funding | what is xpt's role alongside the sponsorship pool | how do xpt boosts complement the funding engine | how is exe's normal funding separate from xpt boosts | what funds exe's base engine alongside xpt | how does xpt supplement independently funded execution
test: what is the relationship between exe's core funding and its token booster | how does the protocol fund its base operation while xpt adds capacity
keywords: $XPT, Sponsorship Pool, boosters, base engine
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
source: Exe Protocol specs: App funding | exe-protocol-specs.html#app-funding
related: xpt-booster, how-pool-funded
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

Exe's base engine is funded by Exe Protocol's Sponsorship Pool and governed by policy. $XPT can add capacity through fee-sponsorship boosters, while the base engine remains independently funded. (The booster is not active at launch.)

---
id: xpt-booster
status: approved
kind: answer
topic: Token
q: How can $XPT increase sponsorship capacity?
also: what is the $xpt sponsorship booster | what is the xpt booster | how does the booster work | what does the xpt sponsorship booster do | how does xpt top up sponsorship capacity | what is an optional xpt sponsorship boost | how can xpt add extra fee support | what additional capacity can the xpt booster provide | how does xpt provide a sponsorship top-up
test: what practical role does exe's token play in expanding fee sponsorship | explain the optional extra support supplied by the xpt booster
keywords: $XPT, booster, sponsorship capacity, top-up
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
related: xpt-booster-conditions, xpt-booster-limits, xpt-complements-funding
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

$XPT can provide an optional top-up to sponsorship capacity when system health and available liquidity allow. That additional capacity remains bounded by policy. (The booster is not active at launch.)

---
id: xpt-booster-conditions
status: approved
kind: answer
topic: Token
q: When can the $XPT booster operate?
also: what conditions allow the $xpt booster to operate | is the xpt booster always on | when does the booster switch on | what conditions must be met before the xpt booster runs | when does system health allow an xpt boost | when is an xpt sponsorship top-up permitted | what must be healthy for the xpt booster to operate | what requirements allow the xpt booster to run | under what conditions can xpt add sponsorship funding
test: what needs to be true before exe can use its token booster | when do the system's health and liquidity permit an xpt top-up
keywords: $XPT, booster, system health, liquidity, policy limits
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
related: xpt-booster, xpt-booster-limits
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

The booster can operate when system health and available liquidity allow, within predefined policy limits.

---
id: xpt-booster-limits
status: approved
kind: answer
topic: Token
q: What limits the $XPT booster?
also: what keeps the sponsorship boost under control | is there a kill-switch on the xpt booster | what caps the booster | what controls cap the xpt booster | what safeguards limit xpt sponsorship boosts | how is the size of an xpt boost bounded | what caps and buffers apply to the xpt booster | what can stop an xpt booster through policy | how do liquidity checks and a kill-switch control xpt boosts
test: which policy tools keep token-funded sponsorship within bounds | what mechanisms constrain the amount of support the xpt booster can add
keywords: $XPT, booster, caps, buffers, liquidity checks, kill-switch
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
related: xpt-booster, xpt-booster-conditions, xpt-liquidity
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

Predefined rules limit the booster through caps, buffers, liquidity checks and a kill-switch. Those controls bound how much additional sponsorship capacity $XPT can provide.

---
id: xpt-liquidity
status: approved
kind: answer
topic: Token
q: Why does available liquidity matter?
also: how does available liquidity affect booster capacity | why does the booster depend on liquidity | how does available liquidity affect xpt booster capacity | why does the xpt booster depend on observable liquidity | how does market liquidity limit an xpt top-up | what role does available liquidity play in xpt sponsorship | why are liquidity limits relevant to the xpt booster | how does the liquidity available shape xpt's extra capacity
test: why can the amount of outside liquidity constrain token-based sponsorship | how much does the liquidity that can be observed matter to an xpt boost
keywords: liquidity, booster, capacity, limits
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
related: xpt-booster, xpt-booster-limits
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

The booster must stay within observable liquidity limits. The liquidity available therefore helps determine how much additional sponsorship capacity the booster can provide.

---
id: xpt-network-growth
status: approved
kind: answer
topic: Token
q: How does $XPT relate to network growth?
also: why does adoption matter to $xpt's role | how does xpt relate to adoption | what happens to xpt's role as exe grows | how does adoption affect xpt's role | how does xpt support exe as network usage grows | what happens to xpt's role as throughput increases | how is xpt linked to growth in exe usage | how can xpt amplify a growing network's capacity | what connects xpt's purpose with wider exe adoption
test: as more people use exe what part does its token play | how does rising network activity relate to the capacity xpt can amplify
keywords: $XPT, network growth, adoption, throughput
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
related: xpt-surplus-growth, xpt-what-is
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

As adoption and throughput grow, the role of $XPT is to amplify the capacity supported by that growth, while the underlying engine remains independently funded.

---
id: xpt-surplus-growth
status: approved
kind: answer
topic: Token
q: What supports an increase in coverage?
also: what needs to grow before the system can offer more | how can coverage increase over time | what lets fee redemption coverage grow | what surplus supports greater coverage through xpt | how does measurable surplus help xpt expand coverage | what needs to grow for xpt to help cover more fees | what funding surplus supports xpt's growth role | how do adoption and surplus support more xpt-assisted coverage | what underlying resources let xpt amplify coverage
test: what must adoption produce before exe's token can help extend coverage | how does extra funding capacity support the growth that xpt can amplify
keywords: coverage, surplus, adoption
source: Medium: Why $XPT matters | https://medium.com/@Exeswap/why-xpt-matters-the-bridge-to-fee-free-web3-f789dcf8537c
source: Exeswap specs: Funding | exeswap-specs.html#funding
related: xpt-network-growth, pool-surplus-benefit
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

As adoption creates measurable surplus, coverage can increase. $XPT can help amplify that growth within what the system can safely support.

---
id: token-launch-plans
status: approved
kind: answer
topic: Token
q: Is Exe planning a TGE, IDO or ICO?
also: when is exe's tge | where can I find exe's tokenomics | is there an exe token launch | is exe doing an ido | is exe planning a token generation event | will exe hold an ido | is exe planning an ico
test: where are the launch details for the exe token | has a date been shared for generating xpt
keywords: TGE, IDO, ICO, tokenomics, launch
source: Important information: No offer of tokens or investments | important-information.html#no-offer-of-tokens-or-investments
source: Exe Protocol: Contact | index.html#contact
related: xpt-token, contact-exe
checked: Claude, 13 Nov 2026, David's copy, against the cited site pages. Wording changes agreed with David, 13 Nov
approved: David, 13 Nov 2026

We're not publishing details of a token generation event (TGE), IDO/ICO or tokenomics at this stage.

$XPT is Exe Protocol's ecosystem token. $XPT is not listed or available, and nothing on this site is an offer of any token.

Follow [@Exeswap on X](https://x.com/Exeswap) for announcements, or [contact our team](index.html#contact) for more information.

---
id: exeswap-first-chain
status: approved
kind: answer
topic: Exeswap
q: Which blockchain is Exeswap being built on first?
also: is exeswap starting on solana | what chain is exeswap on | which chain does exeswap launch on | does exeswap support solana | which chain will Exeswap launch on first | is solana the first chain for Exeswap | where is Exeswap being launched first | what is Exeswap's initial blockchain | which network is Exeswap starting with | is Exeswap's first launch planned for solana
test: what blockchain is the first home for Exeswap | which network comes first in Exeswap's rollout
keywords: Solana, first chain, launch environment
source: Medium: Why Exe is Solana's next UX primitive | https://medium.com/@Exeswap/why-exe-is-solanas-next-ux-primitive-f2c41768dedb
related: exeswap-why-solana, what-is-exeswap, is-it-live
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked
approved: David, 13 Nov 2026

Solana. Exeswap is Exe Protocol's first app, with Solana as the first launch environment.

---
id: exeswap-why-solana
status: approved
kind: answer
topic: Exeswap
q: Why is Exeswap starting on Solana?
also: why choose solana for exeswap | why solana first | what makes solana right for exeswap | why did Exeswap choose solana | what makes solana suitable for Exeswap | why is solana a good starting network for Exeswap | what advantages make solana attractive for Exeswap | why build Exeswap on solana first | what led Exeswap to start with solana
test: which features of solana suit the trading Exeswap is built for | what is the reason behind Exeswap's choice of launch network
keywords: Solana, low cost, fast confirmations, frequent trading
source: Medium: Why Exe is Solana's next UX primitive | https://medium.com/@Exeswap/why-exe-is-solanas-next-ux-primitive-f2c41768dedb
related: exeswap-first-chain, exeswap-adds-to-solana
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked
approved: David, 13 Nov 2026

Solana combines low transaction costs with fast confirmations. That makes Solana a good starting point for the frequent trading Exeswap is built to support.

---
id: exeswap-adds-to-solana
status: approved
kind: answer
topic: Exeswap
q: What does Exeswap add to Solana's low fees?
also: how does exeswap make trading on solana cheaper | solana is already cheap so why exeswap | what does exeswap add on solana | what extra fee benefit does Exeswap add on solana | how does Exeswap build on solana's low costs | what does xpr add to low solana transaction fees | how does Exeswap reduce eligible fees beyond solana's network costs | why use Exeswap fee redemption on a low-fee chain like solana | what fee support does Exeswap add to solana trading
test: if solana is already inexpensive how does Exeswap help with trading costs | which extra layer of fee support does Exeswap bring to solana users
keywords: Solana, low fees, fee redemption, gas, Exe Protocol's fee
source: Exeswap specs: Fees | exeswap-specs.html#fees
source: Exeswap specs: Settlement and custody | exeswap-specs.html#settlement-and-custody
related: exeswap-why-solana, xpr-lowers-fees, what-fees-exeswap
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Solana provides low network costs. Exeswap adds fee redemption based on your XPR, your Exe Protocol Rate. Your verified activity can cover a share of both the network cost and Exe Protocol's fee.

---
id: exeswap-small-trades
status: approved
kind: answer
topic: Exeswap
q: How can Exeswap help people making small trades on Solana?
also: what does exeswap offer smaller solana traders | is exeswap good for small trades | does exeswap help with small swaps | how can Exeswap help with small solana trades | what does Exeswap offer users trading small amounts | can Exeswap lower eligible costs for small swaps on solana | how does xpr help smaller trades on Exeswap | why might Exeswap suit small solana swaps | how can smaller traders benefit from Exeswap on solana
test: what does Exeswap do for someone making modest-sized swaps on solana | how would lower eligible fees help small-volume traders using Exeswap
keywords: small trades, Solana, lower fees
source: Medium: Why Exe is Solana's next UX primitive | https://medium.com/@Exeswap/why-exe-is-solanas-next-ux-primitive-f2c41768dedb
source: Exeswap specs: Fees | exeswap-specs.html#fees
related: exeswap-frequent-traders, exeswap-adds-to-solana
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked
approved: David, 13 Nov 2026

Exeswap is built to reduce eligible trading fees through XPR. Combined with Solana's low network costs, that can make repeated small trades cheaper.

---
id: exeswap-frequent-traders
status: approved
kind: answer
topic: Exeswap
q: What does Exeswap offer frequent Solana traders?
also: how can regular solana traders benefit from exeswap | is exeswap good for active traders | what do high-frequency traders get from exeswap | what does Exeswap offer regular solana traders | how can frequent trading activity help my xpr on Exeswap | how does Exeswap reward steady verified activity | why might regular solana traders use Exeswap | how do active Exeswap users benefit over time | how does ongoing activity affect fees for Exeswap traders
test: what benefit does Exeswap offer someone who trades on solana regularly | how does a continuing record of verified trades affect my rate on Exeswap
keywords: frequent traders, Solana, steady activity, XPR
source: Exeswap specs: XPR | exeswap-specs.html#xpr
source: Exeswap specs: Fees | exeswap-specs.html#fees
related: how-xpr-changes, xpr-lowers-fees, exeswap-small-trades
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Fee redemption applies across your trades. Your verified activity determines your XPR, your Exe Protocol Rate, and steady verified activity helps build your XPR over time. Higher XPR means lower eligible fees.

---
id: exeswap-solana-ecosystem
status: approved
kind: answer
topic: Exeswap
q: How does Exeswap fit into Solana's existing trading ecosystem?
also: what does exeswap add to existing swap services | how is exeswap different from other solana aggregators | does exeswap compete with solana exchanges | how does Exeswap work with existing solana exchanges | does Exeswap find routes across solana trading venues | how does Exeswap fit alongside other solana swap services | what does Exeswap add when routing trades across exchanges | how does Exeswap combine swap aggregation with fee redemption | what role does Exeswap play among solana trading services
test: how does Exeswap bring exchange routing and xpr together | where does Exeswap sit within the existing solana swap experience
keywords: Solana, ecosystem, aggregator, routes, fee redemption
source: Exeswap specs: How Exeswap works | exeswap-specs.html#what-it-is
related: what-is-exeswap, exeswap-adds-to-solana, cheapest-swap-status
checked: Claude, 13 Nov 2026, David's batch 2 copy, against the cited site pages
approved: David, 13 Nov 2026

Exeswap finds trading routes across exchanges, then adds Exe Protocol's fee redemption. Your XPR, your Exe Protocol Rate, determines how much of the eligible fee your activity covers.

---
id: solana-apps-sdk
status: approved
kind: answer
topic: Apps and SDK
q: Could other Solana apps use the same system?
also: could solana wallets and other apps offer exe fee redemption | can other solana apps integrate exe | is exe only for exeswap | could my solana app use exe's fee system | could i add exe fee sponsorship to my solana wallet app | how could my solana app offer xpr fee redemption | is an exe sdk planned for my solana app | could my users get exe fee support in another solana app | how would my solana app access the system used by Exeswap
test: could the fee model behind Exeswap be integrated into my own solana product | what is the expansion plan for bringing exe to my solana app's users
keywords: Solana apps, wallets, SDK, expansion
source: Medium: Why Exe is Solana's next UX primitive | https://medium.com/@Exeswap/why-exe-is-solanas-next-ux-primitive-f2c41768dedb
source: Exe Protocol specs: Roadmap and open items | exe-protocol-specs.html#roadmap-and-open-items
related: sdk-availability, app-how-it-works, exeswap-first-chain
checked: Claude, 13 Nov 2026, sourced by David; the Medium article did not open for Claude, so not checked. "Is designed to let" matches the roadmap's "Intent"
approved: David, 13 Nov 2026

Yes, that is the expansion plan. An SDK (in development) is designed to let wallets and other Solana apps use Exe's fee-sponsorship system after validation.

---
id: exeswap-launch-updates
status: approved
kind: answer
topic: Exeswap
q: Where can I follow Exeswap's Solana launch updates?
also: how can I keep up with exeswap's launch plans | where does exe post updates | does exe have a twitter or telegram | where is exe's medium | where can i follow Exeswap launch news | where are Exeswap's solana launch announcements | which official channels share Exeswap updates | how can i keep up with Exeswap's rollout | where can i ask about Exeswap's solana launch | where does Exeswap post news about its first launch
test: which accounts should i follow for news about Exeswap arriving on solana | how do i stay informed about progress towards Exeswap's release
keywords: updates, X, Medium, community, launch
source: Medium: Why Exe is Solana's next UX primitive | https://medium.com/@Exeswap/why-exe-is-solanas-next-ux-primitive-f2c41768dedb
source: Exe Protocol: Contact | index.html#contact
related: contact-exe, is-it-live, exeswap-first-chain
checked: Claude, 13 Nov 2026, links checked against the site's community links
approved: David, 13 Nov 2026

Follow [@Exeswap on X](https://x.com/Exeswap), [Exe Protocol's Media Room on Medium](https://medium.com/@Exeswap), or use the community links on the [Exe homepage](index.html). For questions, [contact the team](index.html#contact).
