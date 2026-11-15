# Fresh test set: first and only run before any tuning

2026-11-15T17:26:52.785Z · 214 phrasings from ../fresh-test-set-5_20261115.md

On-topic answer questions (214): direct correct answer 82; correct "Did you mean" 98; "Did you mean" without the right entry 24; wrong answer first 9; refused ("not covered") 0.
Fixed-reply questions (0): caught correctly 0; missed 0. Ordinary or fixed questions sent to the wrong fixed reply: 1.

| intended entry | phrasing | result | top match, score |
|---|---|---|---|
| what-is-exe-protocol | Where does Exe sit between a wallet, an app and the execution of a payment? | suggestRight | app-owner-benefits 0.72 |
| what-is-exe-protocol | What's the big idea behind an execution layer where each wallet earns its own rate? | direct | what-is-exe-protocol 0.64 |
| what-problem-exe-addresses | Why aren't ordinary payment arrangments enough once autonomous software is transacting constantly? | direct | what-problem-exe-addresses 0.56 |
| what-problem-exe-addresses | Is Exe tackling uncontrolled agent spending as well as the expense of recording every payment on-chain? | suggestRight | agents-use-exe 0.66 |
| who-is-exe-for | Would this be relevant to me as the developer of a bot-based service? | direct | who-is-exe-for 0.48 |
| who-is-exe-for | Do individual wallet users fit into the intended audience alongside app teams and agents? | suggestWrong | app-users-connect-wallets 0.49 |
| what-is-exeswap | Is the swap product the demonstration app for the protocol underneath it? | direct | what-is-exeswap 0.62 |
| what-is-exeswap | Why would a trader use Exeswap instead of just looking up a route and paying its ordinary fee? | suggestWrong | exeswap-adds-to-solana 0.64 |
| is-it-live | Does clicking a trade here submit a transacion anywhere? | suggestRight | is-it-live 0.41 |
| is-it-live | Can customers actually move funds through this version, or is everything shown still a demonstration? | suggestWrong | app-funds-reach-users 0.47 |
| what-can-i-try | Which screens let me change assumptions and watch the demo respond? | direct | what-can-i-try 0.53 |
| what-can-i-try | I'd like to explore both a sample swap and the app funding calculator; are those available here? | suggestWrong | app-starting-buffer 0.50 |
| what-is-xpr | What does that three-letter rate next to my fee stand for? | wrongFirst | what-affects-fee-redemption 0.56 |
| what-is-xpr | Is my Exe Protocol Rate meant to reflect my verified activity and apply across participating apps? | suggestRight | what-is-xpr 0.67 |
| is-xpr-optional | Can I decline activity-based pricing and use the swap app normaly? | direct | is-xpr-optional 0.75 |
| is-xpr-optional | Will Exeswap still find routes for me if I choose not to enable XPR? | direct | is-xpr-optional 0.71 |
| how-xpr-changes | Could months of consistent activity soften the effect of a brief quiet spell on my rate? | direct | how-xpr-changes 0.44 |
| how-xpr-changes | Can I transform my rate overnight with a flurry of transactions, or is its movement gradual? | direct | how-xpr-changes 0.47 |
| what-are-tiers | What's the point of the three user levels beyond the rate itself? | suggestRight | what-are-tiers 0.49 |
| what-are-tiers | How do the middle and top levels improve fee support compared with where a new user begins? | suggestWrong | app-starting-amount 0.57 |
| xpr-range | Why is the rate capped at one for some users but alowed to reach 1.10 for others? | direct | xpr-range 0.54 |
| xpr-range | If my display says XPR 1.05, must I be in one of the higher levels? | suggestRight | xpr-range 0.62 |
| what-affects-fee-redemption | Is there enough information in the XPR number alone to work out my final charge? | suggestWrong | xpr-example 0.58 |
| what-affects-fee-redemption | If our rates match, could different pool strength, tiers or gas costs explain our different quotes? | suggestRight | what-affects-fee-redemption 0.54 |
| tier-one | On the default level, how does the covered fraction relate to the rate when the fund is fully supported? | suggestWrong | own-fees-and-pool 0.37 |
| tier-one | What's the highest rate available to a user who remains on the basic level? | suggestWrong | xpr-range 0.55 |
| tier-two | Would a qualifying wallet amount count imediately, or is there a thirty-day wait for the first upgrade? | direct | tier-two 0.75 |
| tier-two | Does a long, steady history affect how much of my monthly trading budget I need for the middle level? | suggestRight | budget-increases-xpr 0.47 |
| tier-three | Suppose I've stayed in the middle level at 0.80 for four straight months; would that qualify me for the top level? | direct | tier-three 0.53 |
| tier-three | After reaching the top level, how long can my rate stay under 0.75 before I move down? | suggestRight | xpr-range 0.60 |
| budget-increases-xpr | Is a large commitment a shortcut to a better activity score? | suggestRight | signal-value-validation 0.43 |
| budget-increases-xpr | If I already meet the required budget, does adding more simply leave room for extra trading? | suggestRight | budget-increases-xpr 0.50 |
| withdraw-tier-budget | Can I cancel the qualifying comitment whenever I need access to those funds? | suggestRight | tier-two 0.38 |
| withdraw-tier-budget | Would cancelling my higher-level budget leave me on the entry level even though Exe never held the money? | direct | withdraw-tier-budget 0.60 |
| what-fees-exeswap | What percentage charge sits alongside gas in your swap calculations? | suggestRight | what-fees-exeswap 0.49 |
| what-fees-exeswap | How do the model's Ethereum trading charges compare with its charges on cheaper chains? | suggestRight | what-fees-exeswap 0.50 |
| xpr-example | On your thousand-dollar basic-tier illustration, how much is covered at a 0.60 rate and how much remains to pay? | direct | xpr-example 0.54 |
| xpr-example | Can you break down the $1.01 example into gas, the protocol charge and the resulting reduction? | suggestRight | own-fees-and-pool 0.43 |
| quote-shows-cost | Do I get the orignal cost, covered amount and final bill in one view before I authorise a swap? | suggestRight | quote-shows-cost 0.51 |
| quote-shows-cost | When exactly does the quoted charge for a trade become fixed? | suggestRight | quote-shows-cost 0.42 |
| what-is-sponsorship-pool | What is the shared pot behind the extra fee support users receive? | suggestWrong | own-fees-and-pool 0.68 |
| what-is-sponsorship-pool | Is the sponsorship reserve meant to hold users' savings, or to help pay eligible transaction charges? | suggestWrong | pool-surplus-benefit 0.65 |
| how-pool-funded | How does protocol revenue replenish the shared pot over time? | suggestRight | how-pool-funded 0.66 |
| how-pool-funded | Does the sponsorship reserve receive seventy percent of income while the remainder pays operating costs? | suggestRight | how-pool-funded 0.58 |
| own-fees-and-pool | In what order are my own paid charges and shared resouces used to cover a fee? | direct | own-fees-and-pool 0.66 |
| own-fees-and-pool | How much of the protocol fee I paid can contribute to my reduction before the shared fund steps in? | suggestRight | own-fees-and-pool 0.59 |
| pool-under-load | If shared resources get tight, how is the reduction spread among users? | suggestRight | pool-under-load 0.47 |
| pool-under-load | Can the pooled contribution shrink while the part supported by my own fees stays tied to my rate? | suggestRight | own-fees-and-pool 0.45 |
| app-accounts | Could our customers' fees end up financing activity in a completely different app? | suggestWrong | app-funds-reach-users 0.59 |
| app-accounts | Does each app begin with its own expected-income-based balance rather than a claim on every app's money? | suggestRight | app-accounts 0.57 |
| app-cost | We're a small app with no money for gas susbidies; could we still offer the standard fee reductions? | suggestRight | app-own-fee 0.58 |
| app-cost | Is contributing company funds towards users' fee support a choice rather than a condition of participation? | suggestRight | app-cost 0.67 |
| sdk-availability | Can my developers begin using a released integration kit, or do we need to talk to the team first? | direct | sdk-availability 0.50 |
| sdk-availability | What's the route for a prospective integrator while the software kit remains under development? | suggestRight | roadmap-open-items 0.39 |
| who-pays-agent-fees | If a customer supplies an agent's allowance, do its transaction charges fall to that customer? | suggestRight | who-pays-agent-fees 0.55 |
| who-pays-agent-fees | Would an app funding its own agent also be responsible for that agent's payment costs? | suggestRight | who-pays-agent-fees 0.64 |
| x402-relationship | Can Exe supply pricing and policy around an exisitng x402 payment flow? | suggestRight | x402-open-question 0.69 |
| x402-relationship | Are you treating x402 as compatible payment infrastructure rather than something Exe competes to replace? | suggestRight | offchain-approval-comparison 0.66 |
| net-settlement | Can several agents' obligations be combined into fewer final transfers after their payments are recorded? | suggestRight | agents-use-exe 0.54 |
| net-settlement | What separates immediate payment approval from the later blockchain transfers in your batching approach? | suggestRight | net-settlement 0.61 |
| agent-budget-custody | Will the proposed spending allowance sit in an agent-controlled escrow rather than an ordinary Exe account? | suggestRight | agents-use-exe 0.60 |
| agent-budget-custody | Under the planned custody arrangement, can only instructions signed by the agent enter a settling batch? | direct | agent-budget-custody 0.51 |
| rail-partnerships | Have the busineses mentioned in your comparisons actually signed on as project partners? | direct | rail-partnerships 0.45 |
| rail-partnerships | Does seeing Cloudflare or Hyperliquid on the page establish any commercial relationship? | suggestRight | rail-partnerships 0.34 |
| evidence-labels | When a number is called measured, does that mean it was timed locally rather than observed on a live network? | direct | evidence-labels 0.51 |
| evidence-labels | What's the distinction between your model outputs and figures attributed to an external public source? | direct | evidence-labels 0.45 |
| stress-test-results | Across all the simulated adverse scenarios, was there a case where the shared reserve emptied? | suggestRight | pool-farming-defences 0.42 |
| stress-test-results | How many two-year scenarios were run, and what did they establish about the pool lasting through them? | direct | stress-test-results 0.56 |
| is-exe-audited | Should I count reviews by AI reviewers as a completed securty audit? | direct | is-exe-audited 0.56 |
| is-exe-audited | What reviews are planned after fundraising before any real funds pass through the system? | suggestWrong | app-starting-amount 0.38 |
| prototype-speed | How long did determining fee relief take in the single-computer measurement? | direct | prototype-speed 0.63 |
| prototype-speed | Are the reported calculation and batching timings from an in-memory prototype or a production network? | direct | prototype-speed 0.43 |
| roadmap-open-items | What are the remaining development tasks versus questions that need real-world pilot evidence? | suggestRight | roadmap-open-items 0.43 |
| roadmap-open-items | Where do cross-chain rates, agent escrow and wallet linking stand in the development plan? | suggestRight | roadmap-open-items 0.51 |
| contact-exe | What's the best adress for an enquiry about the project itself? | direct | contact-exe 0.66 |
| contact-exe | Can I reach a person through the homepage rather than continue with the question search? | suggestRight | contact-exe 0.34 |
| exe-ai-purpose | What user benefit is built into the reward function you're designing for the AI? | direct | exe-ai-purpose 0.66 |
| exe-ai-purpose | Is fair, understandable valuation of contributions the intended distinction of Exe's AI, rather than an advantage already proved? | suggestRight | exe-ai-purpose 0.62 |
| alignment-current-approaches | Why might training a model to satisfy evaluators fail to produce dependable conduct outside the evaluation? | direct | alignment-current-approaches 0.50 |
| alignment-current-approaches | Does Exe think rules and human feedback can miss the incentives driving a model's behaviour? | suggestWrong | signal-value-validation 0.58 |
| exe-ai-alignment-training | Which economic incentives are being changed in the enviroment where your AI learns? | direct | exe-ai-alignment-training 0.75 |
| exe-ai-alignment-training | Are you using a decentralised contribution-rewarding model to shape the AI's behaviour during training? | suggestRight | exe-ai-alignment-training 0.58 |
| exe-ai-only-approach | How novel do you believe the proposed learn-to-learn ethics loop is among AI projects? | direct | exe-ai-only-approach 0.71 |
| exe-ai-only-approach | Can you name another organisation taking the particular ethics-learning route you've described? | direct | exe-ai-only-approach 0.53 |
| exe-ai-primary-goal | What would success look like for the human needs this AI is meant to support? | suggestRight | exe-ai-primary-goal 0.49 |
| exe-ai-primary-goal | Is securing resources for health and wellbeing part of the same aim as providing the compute and energy AI needs? | direct | exe-ai-primary-goal 0.51 |
| economic-model-more-info | Can I access a public copy of the complete economic framewrok yet? | suggestRight | economic-model-more-info 0.48 |
| economic-model-more-info | Which publication or team contact would help me explore the model beyond this short explanation? | suggestRight | economic-model-more-info 0.42 |
| data-safety | How will information about me be treated if I use your service? | direct | data-safety 0.52 |
| data-safety | Before proceeding, can you explain your handling of user information and its protection? | suggestRight | data-safety 0.45 |
| exe-ai-economic-model | What is unusual about the way your training economy assigns value relative to other values? | suggestRight | exe-ai-economic-model 0.49 |
| exe-ai-economic-model | Why does your AI need an economic structure that rewards contribution instead of copying centralised market incentives? | suggestRight | exe-ai-alignment-training 0.66 |
| exe-ai-ethics-philosophy | What underlying ethcial reasoning links humans' needs with machines' needs in your sandbox? | direct | exe-ai-ethics-philosophy 0.59 |
| exe-ai-ethics-philosophy | Why use economics as the language for expressing foundational human ethics to an AI? | suggestRight | exe-ai-ethics-philosophy 0.63 |
| ai-value-extraction-premise | Could extraction bias be a side effect of optimisation rather than a goal an AI developer deliberately set? | direct | ai-value-extraction-premise 0.74 |
| ai-value-extraction-premise | How do the business setting and training data help explain why commercial AI can become extractive? | direct | ai-value-extraction-premise 0.82 |
| exe-ai-fix-alignment | Are you trying to change the payoff from dishonesty rather than just tell an AI to behave? | direct | exe-ai-fix-alignment 0.58 |
| exe-ai-fix-alignment | Why should corruption cost more than cooperation under the approach you're proposing? | direct | exe-ai-fix-alignment 0.45 |
| exe-ai-values-activity | Will the AI relate what I contribute on-chain to an explaination of the rate I earn? | suggestRight | ai-value-extraction-premise 0.49 |
| exe-ai-values-activity | How much can you currently tell me about assessing my contribution before the detailed scoring approach is published? | suggestRight | personal-xpr-today 0.33 |
| exe-ai-rule-authority | Would improvements in the AI's algorithms let it overrule the economic framework it learns within? | direct | exe-ai-rule-authority 0.65 |
| exe-ai-rule-authority | Is changing fee policy outside the AI's authority even while it develops better valuation methods? | direct | exe-ai-rule-authority 0.62 |
| maximum-fee-redemption | Is the absolute ceiling the eligible charge itself, even for a very strong rate? | suggestWrong | xpr-example 0.40 |
| maximum-fee-redemption | Under what general conditions could the entire eligible transaction charge be covered? | suggestRight | maximum-fee-redemption 0.51 |
| xpr-lowers-fees | What makes a walllet with a better earned rate pay less of an eligible charge? | suggestRight | what-affects-fee-redemption 0.46 |
| xpr-lowers-fees | As my personal exchange rate improves, how does that feed through to my trading costs? | direct | xpr-lowers-fees 0.62 |
| pool-farming-defences | Can newly created wallets repeatedly draw from the shared reserve without restrictions? | suggestRight | pool-farming-defences 0.45 |
| pool-farming-defences | How does Exe constrain risky accounts and excessive per-wallet use of pooled support? | direct | pool-farming-defences 0.68 |
| agents-use-exe | For an automated payer, what does connecting through the SDK do with the allowance and limits we specify? | suggestRight | exe-paymaster-difference 0.46 |
| agents-use-exe | How are an agent's spending checks, activity rate and later settlement connected in the proposed payment flow? | suggestRight | agents-use-exe 0.67 |
| exe-ai-generated-answers | Am I reading a reponse selected from the project's prepared knowledge bank? | suggestRight | contact-exe 0.31 |
| exe-ai-generated-answers | Is a full LLM composing this chat's replies yet, or are they drawn from linked project material? | direct | exe-ai-generated-answers 0.48 |
| personal-xpr-today | Could the number shown here be a personalised score if this demo hasn't accessed my wallet? | wrongFirst | what-is-xpr 0.54 |
| personal-xpr-today | Can I submit my address for an actual rate assessment through this prototype yet? | direct | personal-xpr-today 0.52 |
| protocol-business-model | Which revenue sources pay for running Exe as well as supporting its users? | suggestRight | protocol-business-model 0.70 |
| protocol-business-model | Is Exe's business income generated by its own swap app and protocol charges from participating apps? | suggestRight | protocol-business-model 0.68 |
| app-owner-benefits | Our agents already send payments quickly; why add a system that takes their verfied history into account? | suggestWrong | agents-use-exe 0.53 |
| app-owner-benefits | From my app's point of view, what's the gain from moving beyond a basic automated spend to Exe's pricing layer? | suggestRight | app-owner-benefits 0.66 |
| dumb-spend-smart-layer | What do the labels dumb and smart refer to in your description of payment costs? | direct | dumb-spend-smart-layer 0.60 |
| dumb-spend-smart-layer | Is the distinction about ignoring an agent's history versus setting its charge from verified activity before it pays? | direct | dumb-spend-smart-layer 0.63 |
| x402-open-question | Once money can move through x402, which question about what an agent should pay remains outside the rail's purpose? | direct | x402-open-question 0.68 |
| x402-open-question | Why does Exe separate the task of transferring payment from the question of pricing it by payer history? | suggestRight | x402-open-question 0.67 |
| other-paymasters | Can a traditional gas sponsor make an app's growing usage into a growing treasry expense? | direct | other-paymasters 0.64 |
| other-paymasters | What financial tradeoff faces a project paying every sponsored transaction from its own funds? | suggestWrong | protocol-business-model 0.56 |
| exe-paymaster-difference | What does an XPR-aware contract contribute beyond the chain's existing ability to have someone else pay gas? | suggestWrong | what-fees-exeswap 0.51 |
| exe-paymaster-difference | On Solana, how does your policy layer build on native sponsorship without requiring the ERC-4337 arrangement? | suggestRight | exe-paymaster-difference 0.48 |
| app-how-it-works | Once Exe is integrated, how is a customer's rate used to reduce their gas and protocol charges? | suggestRight | app-how-it-works 0.65 |
| app-how-it-works | What happens in my app to turn a user's XPR into a smaller eligible transaction bill? | suggestWrong | what-is-xpr 0.63 |
| app-users-connect-wallets | After linking a wallet to myapp, would a customer face another wallet-connection step on Exe's side? | direct | app-users-connect-wallets 0.64 |
| app-users-connect-wallets | Does adding Exe mean sending my existing users through a second wallet setup outside our app? | direct | app-users-connect-wallets 0.69 |
| app-fee-who-pays | Is my business supposed to receive and remit the protocol charge, or does that payment bypass us? | direct | app-fee-who-pays 0.63 |
| app-fee-who-pays | Are my app's customers the payers of Exe's charge while we keep our separate app charge? | suggestRight | app-fee-who-pays 0.72 |
| app-redemption-funds | Which income is allocated to support the fees of people using my particular app? | direct | app-redemption-funds 0.75 |
| app-redemption-funds | Does Exe provide both an initial balance and a share of the protocol charges my users generate? | suggestRight | app-redemption-funds 0.66 |
| app-funds-reach-users | Will my customers see the benefit as a reduced amount due on each eligble transaction? | suggestRight | app-funds-reach-users 0.47 |
| app-funds-reach-users | What would the payment screen's final cost look like for users with different rates in your fully supported example? | suggestRight | app-funds-reach-users 0.54 |
| app-own-fee | Could we voluntarily subsidise the charge our business keeps, using the same user rate? | suggestRight | app-cost 0.42 |
| app-own-fee | Is our own service charge outside standard coverage unless we provide a budget specifically for it? | wrongFirst | app-cost 0.57 |
| app-commitment | What am I agreeing to provide when I adopt this for my users, and are the commercial terms final? | suggestRight | who-is-exe-for 0.36 |
| app-commitment | Beyond connecting the SDK and users paying protocol charges, is my company required to finance the standard fee support? | suggestWrong | app-cost 0.63 |
| app-pool-account | Does Exe arrange anaccount for our customers automatically as part of onboarding the app? | suggestWrong | app-users-connect-wallets 0.60 |
| app-pool-account | Who is responsible for establishing my app's sponsorship allocation and supplying its opening funds? | suggestRight | app-pool-account 0.80 |
| app-pool-held | Is our sponsorship allocation an internal account managed within Exe's shared reserve? | suggestRight | app-pool-rules 0.64 |
| app-pool-held | Are our app's support funds kept separate from other apps and outside customer wallet balances? | suggestRight | app-pool-held 0.70 |
| app-pool-rules | What safeguards govern spending from our app's allocation rather than the user's rate itself? | direct | app-pool-rules 0.71 |
| app-pool-rules | How are the protected buffer, restricted-wallet allowance and low-funding reductions applied to an app account? | suggestRight | app-pool-rules 0.64 |
| app-starting-amount | What evidence of actual trading does my business need for its initial support allocaiton? | direct | app-starting-amount 0.55 |
| app-starting-amount | Does the planned schedule for releasing a new app's allocation mean fee support can be lower during its first months? | suggestRight | app-starting-amount 0.61 |
| app-starting-buffer | Can we count the protected fifth of our initial allocation towards funds available for users? | suggestRight | app-starting-buffer 0.45 |
| app-starting-buffer | How much of the starting allocation is deliberately excluded from spending on fee support? | suggestWrong | app-starting-amount 0.56 |
| pool-surplus-benefit | Could a middle- or top-level user receive more coverage just because the reserve has spare capacity? | suggestRight | xpt-surplus-growth 0.47 |
| pool-surplus-benefit | Where does excess shared funding go after it improves higher-tier fee support? | suggestWrong | pool-under-load 0.61 |
| flagged-wallet-treatment | Does a flagged account keep its activity record even though shared support is suspnded? | direct | flagged-wallet-treatment 0.53 |
| flagged-wallet-treatment | If a higher-tier wallet is restricted for the month, which tier does it use in the meantime? | suggestRight | flagged-wallet-treatment 0.53 |
| verify-net-position | What compact evidence allows my agent to validate its own amount against the settlement root? | direct | verify-net-position 0.70 |
| verify-net-position | Why would verifying one position in your thousand-agent batch take only ten hashes? | direct | verify-net-position 0.62 |
| netting-comparison-baseline | Does the reduction ratio start from 546,742 paired settlements rather than a million separate transfers? | direct | netting-comparison-baseline 0.59 |
| netting-comparison-baseline | What two counts from the same simulated day produce your roughly twenty-three-fold comparison? | suggestWrong | evidence-labels 0.41 |
| facilitator-cost-scope | Does the twenty-four-dollar total describe only faciltiator charges rather than the whole cost of using Exe? | direct | facilitator-cost-scope 0.68 |
| facilitator-cost-scope | Where does the separate percentage-based protocol charge fit alongside the daily transfer-fee illustration? | suggestRight | own-fees-and-pool 0.54 |
| netting-workload-dependence | Could the settlement improvement be smaller if each agent sends very few payments? | suggestRight | net-settlement 0.61 |
| netting-workload-dependence | Are the published batching savings tied to a particular pattern of popular services, rather than a promise for our app? | suggestRight | netting-workload-dependence 0.52 |
| offchain-approval-comparison | If x402 can also approve off-chain, is immediate approval really the distinguishing feature here? | direct | offchain-approval-comparison 0.64 |
| offchain-approval-comparison | Apart from approval latency, does Exe's proposed comparison involve shared budgets, netting and activity-based charges? | suggestRight | offchain-approval-comparison 0.62 |
| automated-engine-tests | How many implementaton checks were reported at the freeze compared with after the agent additions? | direct | automated-engine-tests 0.55 |
| automated-engine-tests | Do successful code checks establish security by themselves, or is further review still required? | wrongFirst | mutation-testing 0.42 |
| mutation-testing | How did the test suite respond when defects were deliberately injected into the code? | direct | mutation-testing 0.62 |
| mutation-testing | What can catching the entire set of inserted bugs tell us, without claiming the program is fault-free? | direct | mutation-testing 0.48 |
| signal-value-validation | Have you measured whether the incentives attract genuinely useful user contributions outside simulations? | direct | signal-value-validation 0.70 |
| signal-value-validation | Which part remains a hypothesis: calculating fee effects or how people respond to being rewarded? | suggestRight | signal-value-validation 0.55 |
| batch-fingerprint-location | Is the retrieval point for batch verfication roots documented somewhere yet? | direct | batch-fingerprint-location 0.54 |
| batch-fingerprint-location | Before an agent checks its proof, where is it supposed to obtain the published root? | wrongFirst | verify-net-position 0.55 |
| xpt-what-is | Could you explain the job assigned to Exe's ecosystem token without discussing purchase details? | fixedWrong | xpt-token 1.00 |
| xpt-what-is | What does XPT do besides exist as the project's named token? | suggestRight | xpt-what-is 0.76 |
| xpt-vs-xpr | Should I think of the rate and the ecosystem token as two names for one asset? | wrongFirst | xpt-network-growth 0.55 |
| xpt-vs-xpr | Which is the non-token personal rate: XPR or XPT? | direct | xpt-vs-xpr 0.84 |
| xpt-external-liquidity | How can the system draw on outside market liqudity when its internal execution rate can't be traded? | direct | xpt-external-liquidity 0.58 |
| xpt-external-liquidity | What gap between internal fee access and external markets is the token meant to connect? | suggestRight | xpt-external-liquidity 0.51 |
| xpt-governance-role | Why involve the token in aligning long-term participants around policy choices? | direct | xpt-governance-role 0.46 |
| xpt-governance-role | How is XPT intended to help coordinate the ecosystem's direction and development? | wrongFirst | xpt-what-is 0.73 |
| xpt-governance-boundaries | Could participants use token governance to step outside the policy remit declared in advance? | suggestRight | xpt-governance-role 0.48 |
| xpt-governance-boundaries | Are parameter changes through XPT subject to previously stated guardrails? | direct | xpt-governance-boundaries 0.63 |
| xpt-complements-funding | Is the core engine's budget independant of the optional extra support associated with XPT? | suggestRight | xpt-network-growth 0.66 |
| xpt-complements-funding | During a launch without the boost enabled, what funds the ordinary execution system? | suggestRight | xpt-booster-conditions 0.44 |
| xpt-booster | Is there a proposed token-based way to top up the amount available for sponsorship? | suggestRight | xpt-liquidity 0.57 |
| xpt-booster | What is the optional extra fee-support function of XPT, and is it switched on for launch? | direct | xpt-booster 0.78 |
| xpt-booster-conditions | Does an XPT top-up require both healthy system conditions and sufficient observable liquidity? | suggestRight | xpt-liquidity 0.65 |
| xpt-booster-conditions | What must be acceptable operationally before the protocol can use its optional token boost? | suggestRight | xpt-booster 0.41 |
| xpt-booster-limits | What stops the optional XPT contribtuion exceeding the amount allowed by policy? | suggestRight | xpt-booster-limits 0.59 |
| xpt-booster-limits | Which caps, checks and emergency control constrain the token's sponsorship boost? | direct | xpt-booster-limits 0.62 |
| xpt-liquidity | Would a thinner external market constrain the amount of additional support XPT could provide? | suggestRight | xpt-liquidity 0.60 |
| xpt-liquidity | Why base token-funded capacity on liquidity that can actually be observed? | direct | xpt-liquidity 0.63 |
| xpt-network-growth | As usage and throughput expand, what part is the token meant to play in supporting that expansion? | suggestRight | xpt-network-growth 0.49 |
| xpt-network-growth | Does increasing adoption give XPT more capacity to amplify while the main engine retains independent funding? | direct | xpt-network-growth 0.77 |
| xpt-surplus-growth | Must adoption generate real surplsu before the system can safely extend coverage? | direct | xpt-surplus-growth 0.61 |
| xpt-surplus-growth | What financial headroom underlies the additional coverage that XPT can help amplify? | direct | xpt-surplus-growth 0.72 |
| token-launch-plans | Is there published information yet about the token event schedule or tokenomics? | direct | token-launch-plans 0.57 |
| token-launch-plans | If official launch details aren't being released yet, where should I watch or ask for further information? | wrongFirst | exeswap-launch-updates 0.48 |
| exeswap-first-chain | What network is targeted for the app's debut? | suggestRight | app-commitment 0.50 |
| exeswap-first-chain | Is the initial Exeswap release aimed at Solana users? | suggestRight | exeswap-first-chain 0.79 |
| exeswap-why-solana | Why does the Solana netwrok suit a product for people who swap often? | wrongFirst | exeswap-small-trades 0.63 |
| exeswap-why-solana | Did inexpensive transactions and quick confirmations make Solana the preferred starting environment? | suggestRight | exeswap-why-solana 0.58 |
| exeswap-adds-to-solana | If the chain already keeps gas cheap, what further costs can my verified activity help cover? | suggestRight | exeswap-adds-to-solana 0.50 |
| exeswap-adds-to-solana | Does Exeswap add user-specific fee coverage on top of Solana's naturally inexpensive transactions? | direct | exeswap-adds-to-solana 0.80 |
| exeswap-small-trades | I make small swaps where fees matter; what could Exeswap improve for that kind of Solana trading? | direct | exeswap-small-trades 0.77 |
| exeswap-small-trades | Could combining cheap network costs with XPR make repeated low-value trades less costly? | suggestWrong | what-fees-exeswap 0.61 |
| exeswap-frequent-traders | Can my ongoing record of verified solnaa activity help build a rate that reduces future eligible charges? | suggestRight | exeswap-adds-to-solana 0.45 |
| exeswap-frequent-traders | What fee benefit carries across trades for someone who uses Exeswap regularly? | suggestRight | exeswap-frequent-traders 0.70 |
| exeswap-solana-ecosystem | Does Exeswap build its trading experience around routes from existing exchanges? | direct | exeswap-solana-ecosystem 0.81 |
| exeswap-solana-ecosystem | Where does the XPR fee layer fit after the aggregator finds a route through Solana trading venues? | suggestRight | exeswap-solana-ecosystem 0.61 |
| solana-apps-sdk | Is the intended expansion path to let my own Solana product adopt the same sponsorship features? | direct | solana-apps-sdk 0.60 |
| solana-apps-sdk | Could an independent Solana wallet team eventually use Exe through the planned developer kit? | direct | solana-apps-sdk 0.72 |
| exeswap-launch-updates | What's the official place to keep an eye on the Solana laucnh as it develops? | direct | exeswap-launch-updates 0.56 |
| exeswap-launch-updates | Should I check your social account, Medium publication or homepage community links for Exeswap release announcements? | direct | exeswap-launch-updates 0.61 |
