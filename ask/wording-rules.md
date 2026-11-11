# Ask Exe wording rules

Draft for David's approval (10 November 2026). `ask/tools/check.mjs` reads the table below and fails the build if any
published answer, question or phrasing matches a pattern. Patterns are JavaScript regular expressions, case-insensitive
unless the rule says "case-sensitive". "fail" stops the build; "warn" lists the entry for a hand check. To add a rule,
add a row.

Some rules are hard to express as a pattern (for example, "only claim what the sources say"). Those are listed under
"Checked by hand" and are part of Claude's per-entry check.

## Checked by the script

| id | level | pattern | rule |
|---|---|---|---|
| exeswap-spelling | fail | `ExeSwap\|Exe Swap\|EXESWAP` | Case-sensitive. The app is "Exeswap": one word, capital E only. |
| decides | fail | `\bdecid(e\|es\|ed\|ing)\b` | Never "decide/decides/decided" for what Exe Protocol, XPR or Exe AI does. Use "determine(s)". |
| redeem-alone | fail | `(?<!fees?\b.{0,40})\bredeem(s\|ed\|ing)?\b(?!\s+(part\|a share\|more\|less\|up to\|\d\|the\|your\|its\|their\|each\|what\|everything\|some\|all\|fees?))` | "Redeem" never on its own: say what is redeemed (fees, part of each fee). |
| redemption-alone | warn | `(?<!fee )\bredemption\b(?!\s+from)` | Prefer "fee redemption". A warning, because the site uses "redemption" after "fee redemption" has been set up in the same passage. |
| rebate | fail | `\b(rebate\|cashback\|cash back\|fees? back\|get back\|money back)\b` | Exe is not a rebate or cashback scheme. "Your activity pays for your execution." |
| staking | fail | `\bstak(e\|ed\|es\|ing)\b` | No staking language. Use "budget" or "liquidity" framing. |
| xpr-token | fail | `\$XPR\|XPR token\|XPR coin` | XPR is a rate, never a token and never "$XPR". |
| xpt-price | fail | `\$XPT[^.]{0,40}(price\|worth\|\$\d)` | Never give or imply an $XPT price. $XPT is not yet listed. |
| vibe-coding | fail | `vibe[- ]?cod` | Never used. The build is "AI as lead coder, built to David's architecture and models, independently verified against the spec". |
| signal-settles-signal | fail | `signal settles signal` | Retired phrase. |
| guarantee | warn | `\bguarantee(d\|s)?\b` | No guarantees of outcomes in public answers. |
| advice | fail | `\byou should (buy\|sell\|invest\|hold)\b` | No financial advice. |
| live-claim | warn | `\b(is\|are) (live\|launched)\b` | Nothing is live yet. Allowed only in "not live" phrasing; check by hand if flagged. |

## Checked by hand (Claude, every entry)

- Every claim is in the cited source, at the same strength. "Designed to", "intent", "planned", "hypothesis" and
  "simulated" stay as the source has them.
- Figures are labelled simulated, measured or sourced, as on the site.
- Statements of intent (cheapest route, SDK, x402 and other rails, escrow) stay marked as intent.
- Plain copy voice: lead with the plain answer, short sentences, no academic register.
- No attacks on other projects or systems. x402 is "the pipe, not the rival".
- Private background (for example the long-term currency vision) is never published.
- Pending-legal points (custody wording for agent payments, $XPT buybacks, order flow): no public claim.
- No unassigned "it" or "this" in quick succession: name the subject.
