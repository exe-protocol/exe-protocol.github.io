# Fresh test set: first and only run before any tuning

2026-11-13T19:52:17.901Z · 214 phrasings from ../fresh-test-set-3_20261113.md

On-topic answer questions (210): direct correct answer 93; correct "Did you mean" 89; "Did you mean" without the right entry 20; wrong answer first 7; refused ("not covered") 0.
Fixed-reply questions (4): caught correctly 4; missed 0. Ordinary or fixed questions sent to the wrong fixed reply: 1.

| intended entry | phrasing | result | top match, score |
|---|---|---|---|
| what-is-exe-protocol | I understand the trading app, but what is the underlying Exe system meant to do? | suggestRight | app-how-it-works 0.68 |
| what-is-exe-protocol | If my wallet uses several apps built on Exe, what connects my activity to the cost of using them? | suggestWrong | app-redemption-funds 0.64 |
| what-problem-exe-addresses | Why would thousands of agents paying each other need something beyond ordinary on-chain transfers? | suggestRight | agents-use-exe 0.52 |
| what-problem-exe-addresses | I'm worried about both transaction costs and an autonomous agent overspending; how does Exe approach those problems? | suggestRight | agents-use-exe 0.61 |
| who-is-exe-for | I'm building a Telegram service with automated payments; am I the sort of developer Exe is aimed at? | suggestWrong | exeswap-launch-updates 0.52 |
| who-is-exe-for | Is Exe intended just for human traders, or would wallets and autonomous services use it too? | suggestRight | who-is-exe-for 0.67 |
| what-is-exeswap | I landed on the Exeswap page; is this a trading venue, a route finder, or something else? | wrongFirst | exeswap-solana-ecosystem 0.61 |
| what-is-exeswap | What is the first actual app demonstrating Exe's approach to swap fees? | suggestRight | app-how-it-works 0.65 |
| is-it-live | If I press swap in this demo, will anything happen to real tokens? | suggestWrong | quote-shows-cost 0.39 |
| is-it-live | Are the transactions shown here happening on a network, or am I looking at a prototype? | suggestRight | is-it-live 0.38 |
| what-can-i-try | I've got five minutes to explore the demo; which parts can I interact with? | direct | what-can-i-try 0.49 |
| what-can-i-try | Can I experiment with more than swaps here, such as agent payments or different pool conditions? | suggestWrong | quote-shows-cost 0.46 |
| what-is-xpr | There's an XPR number on the screen; what does it represent for me as a user? | wrongFirst | personal-xpr-today 0.65 |
| what-is-xpr | What is the activity-based rate that is supposed to follow my wallet between Exe apps? | suggestWrong | personal-xpr-today 0.68 |
| is-xpr-optional | I only want to compare swap routes; can I use Exeswap without opting into its activity-based fee system? | suggestWrong | exeswap-solana-ecosystem 0.59 |
| is-xpr-optional | What happens to my trading fee if I leave XPR switched off? | wrongFirst | xpr-lowers-fees 0.74 |
| how-xpr-changes | If I stop trading for a while, does my activity rate collapse or ease down? | direct | how-xpr-changes 0.57 |
| how-xpr-changes | Could a single very busy week dramatically change my XPR, or does my longer history matter? | direct | how-xpr-changes 0.61 |
| what-are-tiers | I see three levels in the demo; what do I gain by moving beyond the starting level? | suggestRight | tier-one 0.43 |
| what-are-tiers | Can a higher tier make the same activity rate go further, particularly during a quiet month? | suggestRight | how-xpr-changes 0.45 |
| xpr-range | The slider shows 1.10 at a higher tier; is that a valid XPR reading? | direct | xpr-range 0.64 |
| xpr-range | Does having XPR above one mean fee redemption can exceed the amount I paid? | suggestWrong | maximum-fee-redemption 0.72 |
| what-affects-fee-redemption | My friend and I have matching XPR readings but different quotes; what else affects the cost? | direct | what-affects-fee-redemption 0.63 |
| what-affects-fee-redemption | When comparing fees between wallets, should I check their tier, network and pool conditions as well as their rate? | suggestRight | what-affects-fee-redemption 0.51 |
| tier-one | I'm on the starting tier with XPR 0.60 and a fully supported pool; what share of my fee is covered? | suggestRight | maximum-fee-redemption 0.58 |
| tier-one | Before making any budget commitment, what fee coverage and XPR ceiling does the basic tier offer? | suggestWrong | what-fees-exeswap 0.56 |
| tier-two | I've set aside some money in my wallet; how much is needed for the next tier, and when does it start counting? | suggestRight | tier-two 0.51 |
| tier-two | To qualify beyond Tier 1, do I send funds to Exe or keep a qualifying amount under my own control? | suggestRight | withdraw-tier-budget 0.54 |
| tier-three | I've maintained XPR above 0.75 at Tier 2; how long must that continue before I qualify for the top tier? | direct | tier-three 0.73 |
| tier-three | Once I'm at the highest tier, would two weak months change my status? | suggestRight | tier-three 0.56 |
| budget-increases-xpr | If I commit twice the qualifying budget, will my activity rate improve? | direct | budget-increases-xpr 0.57 |
| budget-increases-xpr | Is there any benefit to setting aside more than the minimum besides allowing for a busier trading month? | suggestRight | budget-increases-xpr 0.46 |
| withdraw-tier-budget | I need to use the money I set aside for a higher tier; can I release it, and which tier would I have afterwards? | direct | withdraw-tier-budget 0.62 |
| withdraw-tier-budget | Does ending my budget commitment require Exe to return funds it holds for me? | suggestRight | withdraw-tier-budget 0.54 |
| what-fees-exeswap | Before XPR is applied, which charges make up the cost of an Exeswap trade? | suggestRight | what-fees-exeswap 0.72 |
| what-fees-exeswap | Does the protocol percentage stay the same on Ethereum as on a low-fee network? | suggestRight | xpr-lowers-fees 0.50 |
| xpr-example | Can you walk through the dollars and cents for a simulated thousand-dollar swap at XPR 0.60? | direct | xpr-example 0.63 |
| xpr-example | In the Tier 1 example with a strong pool, how does a $1.01 charge become roughly forty cents? | suggestWrong | pool-surplus-benefit 0.49 |
| quote-shows-cost | Before I sign a swap, can I see both the original charge and the amount I actually owe? | direct | quote-shows-cost 0.50 |
| quote-shows-cost | Once I've accepted the displayed swap quote, can its quoted fee change? | suggestRight | quote-shows-cost 0.51 |
| what-is-sponsorship-pool | I keep seeing a shared fund mentioned alongside XPR; what is it there to pay for? | suggestWrong | what-fees-exeswap 0.54 |
| what-is-sponsorship-pool | What covers the eligible part of fee redemption after the user's own fees have contributed? | suggestWrong | app-redemption-funds 0.71 |
| how-pool-funded | What keeps money flowing into the shared fee fund, and is any of it taken from users' wallet budgets? | suggestRight | how-pool-funded 0.56 |
| how-pool-funded | Out of the revenue Exe earns, how much replenishes sponsorship and how much runs the operation? | suggestRight | protocol-business-model 0.60 |
| own-fees-and-pool | When my fee is reduced, how much can come from fees I paid myself before shared support is used? | suggestRight | pool-under-load 0.66 |
| own-fees-and-pool | If the shared fund becomes weaker, does that reduce the portion covered by my own protocol fees too? | suggestRight | pool-under-load 0.56 |
| pool-under-load | If lots of users request fee support at once, how does Exe scale down the shared contribution? | suggestRight | app-funds-reach-users 0.63 |
| pool-under-load | During a pool shortage, which part of my fee support remains tied to my XPR rather than the pool's strength? | suggestRight | own-fees-and-pool 0.61 |
| app-accounts | Could a busy app use the sponsorship money generated by users of my smaller app? | suggestWrong | app-pool-held 0.63 |
| app-accounts | When a new app joins, does it receive a separate account and an initial balance rather than sharing everyone else's allocation? | suggestRight | app-accounts 0.64 |
| app-cost | I'd like lower fees for my users, but I have no sponsorship budget; does that rule out my app? | suggestWrong | app-redemption-funds 0.64 |
| app-cost | Is paying towards my users' fee redemption compulsory, or can my app choose whether to contribute? | suggestRight | app-cost 0.83 |
| sdk-availability | I'm ready to start integrating this week; is there an SDK I can use yet? | direct | sdk-availability 0.58 |
| sdk-availability | Who should I approach about a future integration while the developer kit is still being built? | suggestRight | sdk-availability 0.44 |
| who-pays-agent-fees | If I fund an agent for my customers, whose money covers its payment charges? | suggestRight | who-pays-agent-fees 0.73 |
| who-pays-agent-fees | After an agent's budget and limits are set, must a person handle the fee payment each time? | suggestRight | who-pays-agent-fees 0.62 |
| x402-relationship | My service already uses x402; would Exe sit alongside that rail or replace it? | direct | x402-relationship 0.71 |
| x402-relationship | What would Exe contribute to an x402 setup beyond moving money between parties? | suggestRight | x402-open-question 0.68 |
| net-settlement | How can an agent's payment be approved now but only reach on-chain settlement later? | suggestRight | verify-net-position 0.59 |
| net-settlement | Why combine recorded agent payments before settling instead of sending every one separately on-chain? | suggestRight | net-settlement 0.60 |
| agent-budget-custody | Under the proposed design, would I hand my agent's spending funds to Exe itself? | suggestRight | agents-use-exe 0.66 |
| agent-budget-custody | What is supposed to prevent a settlement batch from including payments my agent never signed? | suggestRight | verify-net-position 0.58 |
| rail-partnerships | I saw Coinbase and Stripe mentioned; does that mean they are officially working with Exe? | direct | rail-partnerships 0.60 |
| rail-partnerships | Should I read the named wallets and trading services on the site as endorsements? | direct | rail-partnerships 0.48 |
| evidence-labels | Some numbers say measured and others say sourced; how should I interpret those labels? | direct | evidence-labels 0.52 |
| evidence-labels | If a performance figure has no special label, is it a live result or a model output? | suggestRight | evidence-labels 0.35 |
| stress-test-results | How long did the pool stress scenarios run, and did any of them exhaust the fund? | direct | stress-test-results 0.61 |
| stress-test-results | What happened to the simulated pool when the scenarios included large wallets, bots and wallet farms? | suggestRight | pool-farming-defences 0.54 |
| is-exe-audited | Has an independent security audit been completed, or is that still ahead of the project? | direct | is-exe-audited 0.55 |
| is-exe-audited | Are the two AI reviews the same as an audit, and what review is planned before real funds? | direct | is-exe-audited 0.66 |
| prototype-speed | That 0.054 ms figure looks fast; what operation was timed and where was it running? | direct | prototype-speed 0.60 |
| prototype-speed | Do you have measured timings for both fee calculations and netting a large batch of agent payments? | direct | prototype-speed 0.58 |
| roadmap-open-items | What remains unfinished between this prototype and the planned wider system? | direct | roadmap-open-items 0.52 |
| roadmap-open-items | Are linking several wallets and carrying XPR between chains already resolved? | suggestRight | personal-xpr-today 0.51 |
| contact-exe | I'd like to discuss the project directly with someone rather than browse more pages; where should I write? | direct | contact-exe 0.49 |
| contact-exe | Is there a team email address for general Exe enquiries? | suggestRight | contact-exe 0.56 |
| xpt-token | Which exchange could I use to purchase XPT right now? | fixedRight | xpt-token 1.00 |
| xpt-token | Is there a current market quote for the XPT token? | fixedRight | xpt-token 1.00 |
| invest-in-exe | I'm interested in backing the Exe project financially; who should I speak to? | fixedRight | invest-in-exe 1.00 |
| invest-in-exe | Is this website inviting me to make an investment in Exe? | fixedRight | invest-in-exe 1.00 |
| exe-ai-purpose | Beyond answering questions, what is distinctive about what your AI is being trained to reward? | wrongFirst | exe-ai-alignment-training 0.62 |
| exe-ai-purpose | Is Exe AI's claimed difference a demonstrated advantage already, or a goal centred on users' contributions? | suggestRight | exe-ai-primary-goal 0.68 |
| alignment-current-approaches | How could an AI pass its evaluators' checks and still fail to become trustworthy? | direct | alignment-current-approaches 0.77 |
| alignment-current-approaches | In Exe's view, why might teaching ethics through rules and feedback leave the underlying incentives unchanged? | suggestRight | exe-ai-ethics-philosophy 0.60 |
| exe-ai-alignment-training | What behaviour is the training setup meant to reward instead of extraction? | wrongFirst | ai-value-extraction-premise 0.65 |
| exe-ai-alignment-training | Why train Exe AI within a decentralised economic environment rather than the commercial setting you criticise? | suggestRight | exe-ai-economic-model 0.72 |
| exe-ai-only-approach | Do you know of another team teaching AI the process that produces ethical rules in the way Exe proposes? | suggestRight | exe-ai-only-approach 0.71 |
| exe-ai-only-approach | Is the proposed ethical self-improvement loop something Exe considers distinctive among AI projects? | suggestRight | exe-ai-only-approach 0.67 |
| exe-ai-primary-goal | In practical human terms, what is your AI ultimately meant to help us obtain? | direct | exe-ai-primary-goal 0.60 |
| exe-ai-primary-goal | How does Exe AI's overall aim account for people's needs as well as AI's need for energy, data and compute? | direct | exe-ai-primary-goal 0.77 |
| economic-model-more-info | I'd like to read the economic model behind this; has the full thing been published? | direct | economic-model-more-info 0.73 |
| economic-model-more-info | While the model itself is unpublished, where can I learn more or discuss it with the team? | direct | economic-model-more-info 0.48 |
| exe-ai-economic-model | In the economy used to train Exe AI, are values set centrally or defined in relation to each other? | suggestRight | exe-ai-economic-model 0.67 |
| exe-ai-economic-model | What feature of your economic structure makes contributing value the behaviour the AI is meant to learn? | suggestRight | exe-ai-economic-model 0.56 |
| exe-ai-ethics-philosophy | What connects a machine's need for resources with the human ethics you want it to learn? | direct | exe-ai-ethics-philosophy 0.66 |
| exe-ai-ethics-philosophy | Why express ethical principles as economics when designing your AI training environment? | direct | exe-ai-ethics-philosophy 0.71 |
| ai-value-extraction-premise | Are you saying AI companies deliberately teach extraction, or that it emerges from their incentives? | direct | ai-value-extraction-premise 0.70 |
| ai-value-extraction-premise | Could commercially optimised training data encourage extractive behaviour even without that being an explicit objective? | direct | ai-value-extraction-premise 0.54 |
| exe-ai-fix-alignment | When you say deception should stop making economic sense, what are you aiming to change? | direct | exe-ai-fix-alignment 0.55 |
| exe-ai-fix-alignment | Is the idea to make cooperation more worthwhile than corruption for both people and AI? | direct | exe-ai-fix-alignment 0.56 |
| exe-ai-values-activity | Will your AI explain why my wallet's contribution deserves a particular level of fee redemption? | suggestWrong | own-fees-and-pool 0.59 |
| exe-ai-values-activity | Can I read the detailed activity-scoring method yet, or only the goal of the valuation work? | direct | exe-ai-values-activity 0.53 |
| exe-ai-rule-authority | If the AI improves its valuation methods, does that also give it authority to rewrite the economic policy? | direct | exe-ai-rule-authority 0.67 |
| exe-ai-rule-authority | Could the AI increase protocol fees on its own, or is its role confined to valuation within existing rules? | suggestRight | exe-ai-rule-authority 0.61 |
| maximum-fee-redemption | Could eligible fee coverage reach the full amount I paid, and what would it depend on? | direct | maximum-fee-redemption 0.53 |
| maximum-fee-redemption | Is complete fee redemption possible on every trade, or is there a ceiling and a set of conditions? | direct | maximum-fee-redemption 0.72 |
| xpr-lowers-fees | Suppose my verified activity earns me a better personal exchange rate; how would that change what I pay to transact? | suggestRight | xpr-lowers-fees 0.52 |
| xpr-lowers-fees | What is the connection between the rate my wallet earns and the reduction shown on its fee? | suggestRight | what-affects-fee-redemption 0.56 |
| pool-farming-defences | Could someone create lots of fresh wallets to draw excessive support from the shared fund? | suggestRight | pool-farming-defences 0.46 |
| pool-farming-defences | What limits stop one risky wallet from taking an outsized share of pool resources? | direct | pool-farming-defences 0.66 |
| agents-use-exe | I'm wiring an agent into a payment service; what would the Exe SDK do between checking its budget and recording its payment? | direct | agents-use-exe 0.72 |
| agents-use-exe | How would my agent's own XPR be applied after I set its spending limits? | suggestRight | agents-use-exe 0.62 |
| exe-ai-generated-answers | Is this chat composing a new response to me, or selecting material the project has already approved? | suggestRight | exe-ai-generated-answers 0.34 |
| exe-ai-generated-answers | Can I trace the replies here to published information rather than treating them as live LLM output? | suggestRight | exe-ai-generated-answers 0.38 |
| personal-xpr-today | I changed the rate in the demo; does that number say anything about my actual wallet history? | suggestRight | how-xpr-changes 0.50 |
| personal-xpr-today | I'd like a personal activity assessment now; can this prototype inspect my wallet to provide one? | direct | personal-xpr-today 0.56 |
| protocol-business-model | Where does Exe's income originate, and what share is retained to run the business? | direct | protocol-business-model 0.75 |
| protocol-business-model | Does the protocol's revenue model involve both its own trading app and fees from users of other integrated apps? | suggestWrong | app-fee-who-pays 0.65 |
| app-owner-benefits | My app's agents already have fast payment rails; what additional benefit would integrating Exe give us? | direct | app-owner-benefits 0.77 |
| app-owner-benefits | Why should my app care about pricing payments using verified activity when it can already send them automatically? | suggestWrong | app-cost 0.49 |
| dumb-spend-smart-layer | When you call a spend dumb, are you referring to its fixed charge ignoring the agent's history? | direct | dumb-spend-smart-layer 0.66 |
| dumb-spend-smart-layer | What makes your smart layer different in terms of when fees are set and what funds the reduction? | direct | dumb-spend-smart-layer 0.63 |
| x402-open-question | If x402 already handles moving money, which pricing issue does Exe say sits outside that job? | direct | x402-open-question 0.72 |
| x402-open-question | In your explanation of x402, where does an agent's past activity enter the question of payment cost? | direct | x402-open-question 0.71 |
| other-paymasters | If my app pays everyone's gas through a conventional paymaster, what happens to our treasury costs as usage increases? | direct | other-paymasters 0.67 |
| other-paymasters | Why can ordinary gas sponsorship put an app's growth budget under pressure? | direct | other-paymasters 0.76 |
| exe-paymaster-difference | Solana already lets another account pay a transaction's fees; what does Exe's policy layer add to that? | suggestRight | app-funds-reach-users 0.67 |
| exe-paymaster-difference | For my Solana app, does sponsored execution require ERC-4337, or can Exe build its XPR approach on the chain's existing fee-paying arrangement? | suggestRight | exe-paymaster-difference 0.66 |
| app-how-it-works | Once my app is connected, what charges would each user's transaction carry and how would XPR apply? | suggestRight | app-how-it-works 0.72 |
| app-how-it-works | Would integrating Exe change the separate fee my app keeps, or apply redemption to gas and the protocol charge? | suggestRight | app-own-fee 0.80 |
| app-fee-who-pays | Does my app need to collect the protocol charge from customers and forward it to Exe? | suggestRight | app-fee-who-pays 0.78 |
| app-fee-who-pays | When a user transacts through my app, is Exe's fee taken from our revenue or paid directly by that user? | suggestRight | app-fee-who-pays 0.84 |
| app-redemption-funds | If our treasury contributes nothing, what pays for the fee support offered to my app's users? | direct | app-redemption-funds 0.77 |
| app-redemption-funds | Do protocol fees generated by my users replenish their support account, and who supplies its initial balance? | suggestRight | app-fee-who-pays 0.63 |
| app-funds-reach-users | What would my app's customers actually notice at payment time when part of their fee is covered? | suggestWrong | app-how-it-works 0.60 |
| app-funds-reach-users | In the fully supported Tier 1 example, what would my users pay on a thousand-dollar trade at rates of 0.60 and 1.00? | suggestRight | xpr-example 0.56 |
| app-own-fee | I want XPR to discount the fee my business charges too; what extra arrangement would that require? | direct | app-own-fee 0.73 |
| app-own-fee | Does the standard fee coverage include our app's own charge, or would we fund that separately? | suggestRight | app-own-fee 0.70 |
| app-commitment | Before I plan an integration, what is my app expected to provide and which commercial terms remain open? | suggestRight | app-commitment 0.57 |
| app-commitment | Am I committing my app to a sponsorship budget when I adopt the SDK, or just to integration and its users paying the protocol fee? | suggestRight | app-commitment 0.66 |
| app-pool-account | Do I have to create a sponsorship fund myself before my app can participate? | direct | app-pool-account 0.78 |
| app-pool-account | When my app joins, who opens its fee-support account and arranges the opening balance? | suggestWrong | app-pool-held 0.75 |
| app-pool-held | Where would the support account assigned to my app physically sit within Exe's funding structure? | suggestRight | app-starting-amount 0.70 |
| app-pool-held | Are my users' balances mixed into the pool account Exe runs for my app? | suggestRight | app-pool-held 0.77 |
| app-pool-rules | What account-level controls govern my app's buffer, newer wallets and reductions when support runs low? | suggestRight | app-pool-rules 0.62 |
| app-pool-rules | How are wallets flagged in the previous month treated within my app's monthly pool allocation? | wrongFirst | flagged-wallet-treatment 0.70 |
| app-starting-amount | My app wants its first funding allocation; what trading evidence do we need to show? | direct | app-starting-amount 0.78 |
| app-starting-amount | Why might my users receive less fee support early on if the opening balance is paid over time? | direct | app-starting-amount 0.71 |
| app-starting-buffer | If my app is assigned an opening balance, is only four-fifths available for fee support? | suggestRight | app-starting-buffer 0.68 |
| app-starting-buffer | Can the reserved portion of my app's initial allocation ever be spent on users' fees? | suggestRight | app-starting-buffer 0.64 |
| pool-surplus-benefit | I'm at Tier 2 with an unchanged XPR; could spare pool funds still improve the coverage I receive? | suggestRight | pool-surplus-benefit 0.61 |
| pool-surplus-benefit | When the shared fund has more than it needs, how do higher-tier users and the reserve benefit? | direct | pool-surplus-benefit 0.55 |
| flagged-wallet-treatment | My wallet has been flagged this month; what happens to my tier and access to shared support? | direct | flagged-wallet-treatment 0.70 |
| flagged-wallet-treatment | After a wallet flag is cleared, does my past XPR record still exist or must I rebuild it from scratch? | direct | flagged-wallet-treatment 0.73 |
| verify-net-position | I want my agent to check its recorded settlement amount without inspecting the entire batch; what proof would it use? | direct | verify-net-position 0.69 |
| verify-net-position | In the thousand-agent example, how much proof data is needed to check one agent's net position? | direct | verify-net-position 0.71 |
| netting-comparison-baseline | Why is the reported reduction 22.8 times rather than one million divided by 24,000? | direct | netting-comparison-baseline 0.54 |
| netting-comparison-baseline | Is the comparison based on settling each buyer-seller pair or settling every individual payment? | direct | netting-comparison-baseline 0.68 |
| facilitator-cost-scope | Should I budget only $24 a day based on that example, or are other payment charges outside the figure? | direct | facilitator-cost-scope 0.70 |
| facilitator-cost-scope | How do 24,000 transfers at a tenth of a cent each relate to the separate protocol fee? | direct | facilitator-cost-scope 0.58 |
| netting-workload-dependence | My agents make only a handful of payments each; should I expect the same reduction as your busy simulated network? | suggestRight | net-settlement 0.56 |
| netting-workload-dependence | Would spreading activity differently across services change the settlement savings shown in the example? | direct | netting-workload-dependence 0.53 |
| offchain-approval-comparison | If another system approves off-chain as quickly as the network allows, what remains distinctive about Exe? | direct | offchain-approval-comparison 0.75 |
| offchain-approval-comparison | Does x402's batching approach also permit instant approval, or is that exclusive to Exe? | direct | offchain-approval-comparison 0.81 |
| automated-engine-tests | I see both 752 and 767 test passes mentioned; why are there two totals? | direct | automated-engine-tests 0.55 |
| automated-engine-tests | Do the automated implementation checks remove the need for a developer review and security audit? | suggestRight | is-exe-audited 0.46 |
| mutation-testing | Did you deliberately break the code to check whether the test suite would notice? | direct | mutation-testing 0.63 |
| mutation-testing | Catching all 77 inserted faults sounds encouraging, but does it establish that the code has no other bugs? | direct | mutation-testing 0.70 |
| signal-value-validation | Have real users demonstrated better contributions because of these rewards, or is that still a pilot hypothesis? | direct | signal-value-validation 0.62 |
| signal-value-validation | Do simulations of fee redemption establish that people will actually change their behaviour? | wrongFirst | what-affects-fee-redemption 0.65 |
| batch-fingerprint-location | My agent needs the published root to verify a batch; has the place to retrieve it been specified? | direct | batch-fingerprint-location 0.62 |
| batch-fingerprint-location | Is there an announced publication location for the settlement fingerprints, or is that still a roadmap item? | direct | batch-fingerprint-location 0.66 |
| xpt-what-is | Apart from the rate used for my fees, what job does the ecosystem's token perform? | direct | xpt-what-is 0.59 |
| xpt-what-is | I'm trying to understand XPT's purpose rather than buy it; what does it connect and support? | fixedWrong | xpt-token 1.00 |
| xpt-vs-xpr | I've seen two similar names: which one is my personal rate and which one is the ecosystem token? | suggestRight | xpt-what-is 0.41 |
| xpt-vs-xpr | Does the XPR attached to my activity serve the same function as XPT's liquidity and governance role? | suggestWrong | xpt-governance-role 0.66 |
| xpt-external-liquidity | Since XPR is an internal rate, what gives Exe a connection to liquidity outside its own system? | direct | xpt-external-liquidity 0.77 |
| xpt-external-liquidity | What is the reason for linking external markets to additional execution sponsorship through XPT? | suggestRight | xpt-external-liquidity 0.69 |
| xpt-governance-role | How is XPT meant to bring long-term participants together around the protocol's direction? | direct | xpt-governance-role 0.64 |
| xpt-governance-role | Beyond its liquidity role, what part does the token play in coordinating growth and policy? | suggestRight | xpt-governance-role 0.48 |
| xpt-governance-boundaries | If policy parameters change through XPT governance, must the changes remain inside previously declared limits? | direct | xpt-governance-boundaries 0.77 |
| xpt-governance-boundaries | Does the token's governance role grant open-ended authority, or a defined remit? | suggestRight | xpt-governance-role 0.51 |
| xpt-complements-funding | Is the ordinary execution engine funded separately from any extra support the token might provide? | direct | xpt-complements-funding 0.52 |
| xpt-complements-funding | How would core funding continue while the XPT booster is inactive at launch? | suggestRight | xpt-booster 0.62 |
| xpt-booster | In practical terms, what additional fee-sponsorship support could the token provide? | suggestRight | xpt-booster 0.60 |
| xpt-booster | Is the proposed XPT boost an optional top-up to capacity, and is that feature active at launch? | suggestRight | xpt-booster 0.68 |
| xpt-booster-conditions | What needs to be true about system health and liquidity before an XPT top-up can run? | suggestRight | xpt-booster-conditions 0.70 |
| xpt-booster-conditions | Does permission for an XPT boost depend on current conditions rather than just the existence of the token? | suggestRight | xpt-governance-role 0.51 |
| xpt-booster-limits | Which controls prevent an optional token boost from adding more sponsorship than policy permits? | suggestRight | xpt-booster-limits 0.64 |
| xpt-booster-limits | Is there a way to halt the XPT boost as well as caps and buffers restricting it? | direct | xpt-booster-limits 0.68 |
| xpt-liquidity | If less external liquidity is available, how does that affect the amount of support an XPT boost can add? | direct | xpt-liquidity 0.75 |
| xpt-liquidity | Why must the booster use observable market liquidity when setting its capacity? | direct | xpt-liquidity 0.78 |
| xpt-network-growth | As more people use Exe and throughput rises, how is the token meant to support the extra capacity? | suggestRight | xpt-external-liquidity 0.59 |
| xpt-network-growth | Does XPT's role grow alongside adoption while the underlying engine keeps its separate funding? | suggestRight | xpt-network-growth 0.71 |
| xpt-surplus-growth | What must increased adoption actually produce before broader coverage can be supported? | direct | xpt-surplus-growth 0.62 |
| xpt-surplus-growth | Is extra fee coverage tied to measurable surplus that XPT can amplify? | direct | xpt-surplus-growth 0.76 |
| token-launch-plans | Have you released a timetable for a token generation event or published the tokenomics yet? | direct | token-launch-plans 0.53 |
| token-launch-plans | Where should I watch for official information about an Exe IDO or ICO? | direct | token-launch-plans 0.66 |
| exeswap-first-chain | Which network should I associate with the initial Exeswap rollout? | direct | exeswap-first-chain 0.75 |
| exeswap-first-chain | Is Solana the first home for the trading app, rather than a later expansion? | suggestRight | exeswap-first-chain 0.56 |
| exeswap-why-solana | What about Solana's transaction performance suits the kind of trading Exeswap is intended for? | suggestRight | exeswap-adds-to-solana 0.74 |
| exeswap-why-solana | Was the choice of Solana driven by confirmation speed and network costs? | suggestRight | exeswap-why-solana 0.65 |
| exeswap-adds-to-solana | Solana transactions are already inexpensive; what further fee benefit would Exeswap provide? | direct | exeswap-adds-to-solana 0.81 |
| exeswap-adds-to-solana | On Solana, can verified activity cover part of both gas and Exe's protocol charge? | suggestRight | exeswap-adds-to-solana 0.56 |
| exeswap-small-trades | I only swap small amounts on Solana; could reduced eligible fees make those trades cheaper? | direct | exeswap-small-trades 0.71 |
| exeswap-small-trades | What would Exeswap offer someone making several modest-sized swaps rather than large trades? | direct | exeswap-small-trades 0.64 |
| exeswap-frequent-traders | I trade on Solana regularly; would a continuing record of verified activity help reduce my eligible fees? | suggestRight | exeswap-adds-to-solana 0.54 |
| exeswap-frequent-traders | Does Exeswap apply fee redemption across my trades as I build XPR over time? | suggestWrong | exeswap-solana-ecosystem 0.71 |
| exeswap-solana-ecosystem | Where does Exeswap fit if Solana already has exchanges and swap services? | direct | exeswap-solana-ecosystem 0.85 |
| exeswap-solana-ecosystem | Does Exeswap combine routes across existing exchanges with its own XPR-based fee redemption? | direct | exeswap-solana-ecosystem 0.80 |
| solana-apps-sdk | I build a Solana wallet; could my users eventually access the same fee system as Exeswap users? | direct | solana-apps-sdk 0.82 |
| solana-apps-sdk | Is the plan to keep this within the launch trading app or make it available to my Solana product through an SDK? | direct | solana-apps-sdk 0.61 |
| exeswap-launch-updates | I'd like to keep track of the Solana rollout; which official accounts or publications should I follow? | direct | exeswap-launch-updates 0.57 |
| exeswap-launch-updates | Where can I find Exeswap release news and a way to ask the team about launch progress? | direct | exeswap-launch-updates 0.75 |
