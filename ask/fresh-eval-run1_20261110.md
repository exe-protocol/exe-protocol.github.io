# Fresh test set: first and only run before any tuning

2026-11-10T18:20:30.506Z · 80 phrasings from /home/claude/untrusted/batch1b/FRESH_TEST_SET.md

On-topic answer questions (76): direct correct answer 40; correct "Did you mean" 23; "Did you mean" without the right entry 5; wrong answer first 7; refused ("not covered") 1.
Fixed-reply questions (4): caught correctly 4; missed 0. Ordinary or fixed questions sent to the wrong fixed reply: 0.

| intended entry | phrasing | result | top match, score |
|---|---|---|---|
| what-is-exe-protocol | can you explain the whole exe idea in a couple of sentences | suggestRight | what-is-exe-protocol 0.62 |
| what-is-exe-protocol | what sort of product are you building here | wrongFirst | what-can-i-try 0.40 |
| what-problem-exe-addresses | why would payments need another layer like this | suggestRight | what-problem-exe-addresses 0.53 |
| what-problem-exe-addresses | what pain is exe supposed to fix for people | suggestRight | what-is-exe-protocol 0.55 |
| who-is-exe-for | is this something a wallet company would use | suggestRight | who-is-exe-for 0.46 |
| who-is-exe-for | who is the customer for the protocol | direct | who-is-exe-for 0.63 |
| what-is-exeswap | how is the swap app connected to exe protocol | suggestRight | what-is-exeswap 0.58 |
| what-is-exeswap | does exeswap find trades on other exchanges | direct | what-is-exeswap 0.56 |
| is-it-live | if I press approve will it spend anything | wrongFirst | quote-shows-cost 0.54 |
| is-it-live | are people actually buying and selling through this now | direct | is-it-live 0.44 |
| what-can-i-try | which bit of the website should I click to try it out | refused | what-can-i-try 0.26 |
| what-can-i-try | can I play around with an example without signing up | suggestWrong | quote-shows-cost 0.36 |
| what-is-xpr | what is that xpr number meant to tell me | direct | what-is-xpr 0.68 |
| what-is-xpr | explain the rate thing without the technical language | suggestRight | what-affects-fee-redemption 0.48 |
| is-xpr-optional | can I trade without signing up for xpr | direct | is-xpr-optional 0.57 |
| is-xpr-optional | am I forced to have my activity rated to use the swap app | suggestWrong | app-cost 0.37 |
| how-xpr-changes | is my rate worked out afresh or does the previous month count | direct | how-xpr-changes 0.68 |
| how-xpr-changes | if my activity changes how fast does the rate catch up | suggestRight | how-xpr-changes 0.53 |
| xpr-range | is 1.10 allowed or is that a mistake | direct | xpr-range 0.44 |
| xpr-range | what is the highest xpr a wallet can have | direct | xpr-range 0.64 |
| what-affects-fee-redemption | my friend has my rate so why is their swap fee lower | suggestRight | what-affects-fee-redemption 0.57 |
| what-affects-fee-redemption | do different tiers change the bill even at identical xpr | direct | what-affects-fee-redemption 0.68 |
| tier-one | what does the entry tier cover when the pool is full | wrongFirst | pool-under-load 0.56 |
| tier-one | what fee treatment do I start with when I opt in | suggestWrong | what-fees-exeswap 0.51 |
| tier-two | how much of my monthly trading must I commit for the second tier | direct | tier-two 0.58 |
| tier-two | what do I need to do to qualify for tier 2 | direct | tier-two 0.90 |
| tier-three | when does staying above point seven five move me up | suggestWrong | tier-two 0.36 |
| tier-three | what makes someone qualify for the third tier and then lose it | direct | tier-three 0.67 |
| budget-increases-xpr | would setting aside twice the minimum give me a better xpr | suggestRight | what-is-xpr 0.51 |
| budget-increases-xpr | does a richer wallet get a better rate just for committing more | direct | budget-increases-xpr 0.57 |
| withdraw-tier-budget | if I cancel my commitment do I go back to the basic tier | direct | withdraw-tier-budget 0.74 |
| withdraw-tier-budget | what happens to my higher tier after I pull out the budget | direct | withdraw-tier-budget 0.77 |
| what-fees-exeswap | before any reduction what charges are added to a trade | suggestRight | what-affects-fee-redemption 0.35 |
| what-fees-exeswap | are the network charge and your charge two different things | suggestRight | what-affects-fee-redemption 0.44 |
| xpr-example | can you walk through the 1000 dollar example at an xpr of 0.6 | suggestRight | xpr-range 0.59 |
| xpr-example | how did you calculate the forty cent payment in that example | wrongFirst | prototype-speed 0.45 |
| quote-shows-cost | when do I get to see the amount before agreeing to the swap | suggestRight | xpr-example 0.49 |
| quote-shows-cost | does the quote separate the original fee from what I actually owe | suggestRight | what-affects-fee-redemption 0.49 |
| cheapest-swap-status | do you have real trade evidence that this beats the other prices | direct | cheapest-swap-status 0.57 |
| cheapest-swap-status | is being cheapest something you have demonstrated or still want to do | direct | cheapest-swap-status 0.42 |
| what-is-sponsorship-pool | what is the shared pot you keep mentioning | direct | what-is-sponsorship-pool 0.80 |
| what-is-sponsorship-pool | can you explain what the sponsorship pool is used for | suggestRight | what-is-sponsorship-pool 0.78 |
| how-pool-funded | is fee income what fills the pool | suggestRight | how-pool-funded 0.66 |
| how-pool-funded | are my committed funds used to pay other people through the pool | direct | how-pool-funded 0.60 |
| own-fees-and-pool | why does the fee example have two different funding columns | direct | own-fees-and-pool 0.59 |
| own-fees-and-pool | how much comes from fees I paid versus the shared pot | wrongFirst | how-pool-funded 0.68 |
| pool-under-load | if the shared pot gets stretched do users pay a larger bill | wrongFirst | how-pool-funded 0.61 |
| pool-under-load | what changes for my fees when pool capacity is tight | direct | pool-under-load 0.61 |
| app-accounts | could another app use up the money in our pool account | suggestRight | how-pool-funded 0.61 |
| app-accounts | does each app keep the support generated by its own users | direct | app-accounts 0.60 |
| app-cost | as an app owner am I obliged to add money for customer fee support | direct | app-cost 0.67 |
| app-cost | what is the optional budget for my apps own charges | direct | app-cost 0.60 |
| sdk-availability | can our developers start integrating this into our wallet yet | suggestRight | sdk-availability 0.53 |
| sdk-availability | is there an sdk ready for a production app | direct | sdk-availability 0.69 |
| who-pays-agent-fees | when a bot pays who ends up with the fee bill | direct | who-pays-agent-fees 0.55 |
| who-pays-agent-fees | is it the app or the owner who funds an agents payment costs | direct | who-pays-agent-fees 0.73 |
| x402-relationship | would this sit alongside x402 rather than replace it | direct | x402-relationship 0.45 |
| x402-relationship | where does exe fit if I already use x402 for payments | direct | x402-relationship 0.72 |
| net-settlement | do you send every payment to the chain or just the final balances | direct | net-settlement 0.48 |
| net-settlement | why can a batch have fewer transfers than the payments inside it | direct | net-settlement 0.78 |
| agent-budget-custody | is the agent escrow contract working already or only proposed | direct | agent-budget-custody 0.71 |
| agent-budget-custody | where does the demo keep an agents budget compared with the plan | direct | agent-budget-custody 0.64 |
| rail-partnerships | does showing a companys name mean they have agreed to work with you | direct | rail-partnerships 0.50 |
| rail-partnerships | are those payment services official partners of exe | suggestRight | rail-partnerships 0.58 |
| evidence-labels | which figures did you time yourself and which came from elsewhere | suggestWrong | prototype-speed 0.30 |
| evidence-labels | what is the difference between the three evidence labels | direct | evidence-labels 0.70 |
| stress-test-results | did the shared pot survive every one of the nine scenarios | suggestRight | what-is-sponsorship-pool 0.50 |
| stress-test-results | how many simulated months did the stress testing cover | direct | stress-test-results 0.73 |
| is-exe-audited | have human auditors signed this off yet | direct | is-exe-audited 0.46 |
| is-exe-audited | does the AI review count as a proper audit | direct | is-exe-audited 0.65 |
| prototype-speed | is the fifty four microsecond figure just the fee calculation | suggestRight | prototype-speed 0.55 |
| prototype-speed | does that benchmark include sending money over a real network | suggestRight | prototype-speed 0.47 |
| roadmap-open-items | what work remains before this is more than a demo | wrongFirst | what-can-i-try 0.54 |
| roadmap-open-items | which questions about wallets and chains are still unresolved | direct | roadmap-open-items 0.46 |
| contact-exe | where can our business reach someone about using exe | direct | contact-exe 0.74 |
| contact-exe | I would like a conversation about the product where do I go | suggestRight | contact-exe 0.37 |
| xpt-token | is there somewhere I can buy the XPT token today | fixedRight | xpt-token 1.00 |
| xpt-token | has XPT been listed for purchase yet | fixedRight | xpt-token 1.00 |
| invest-in-exe | who handles enquiries about investing in Exe | fixedRight | invest-in-exe 1.00 |
| invest-in-exe | how can I ask about an Exe investment opportunity | fixedRight | invest-in-exe 1.00 |
