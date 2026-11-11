// Checks for Ask Exe. Run after build.mjs:  node check.mjs [--preview] [--out report.md]
// 1 structure  2 sources and links  3 wording rules  4 placeholders  5 fixed replies
// 6 search quality (held-out test phrasings in the top 3; off-topic probes below the threshold)  7 model match
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import * as ort from "onnxruntime-web/wasm";
import { makeEmbedder, makeKeywordIndex, rank, b64ToF32 } from "../../assets/ask/ask-core.mjs";
import { parseKnowledge, parseRules, answerText, ROOT, KB_JSON, MODEL, VOCAB } from "./kb.mjs";

const args = process.argv.slice(2);
const preview = args.includes("--preview");
const outFile = args.includes("--out") ? args[args.indexOf("--out") + 1] : null;
ort.env.wasm.numThreads = 1;

const OFF_TOPIC = [
  "What's the weather in Cork today?", "Tell me a joke", "Who won the football last night?", "Recipe for pancakes",
  "How do I reset my password?", "What is the capital of France?", "Write me a poem about the sea",
  "Can you help with my homework?", "What time is it?", "Book me a flight to London",
];

const report = [], fails = [], warns = [];
const say = (s = "") => report.push(s);
const fail = (s) => { fails.push(s); say(`- FAIL ${s}`); };
const warn = (s) => { warns.push(s); say(`- warn ${s}`); };

// 1 structure
const { entries, starters, errors } = parseKnowledge();
say("## 1 Structure");
errors.forEach(fail);
const scope = entries.filter((e) => preview || e.status === "approved");
say(`- ${scope.length} entries in scope (${preview ? "preview: all statuses" : "approved only"}); ${entries.length} in knowledge.md`);
for (const s of ["sample", "draft", "needs-input", "approved"]) say(`  - ${s}: ${entries.filter((e) => e.status === s).length}`);

// 2 sources and links
say("\n## 2 Sources and links");
const external = new Set();
const htmlCache = new Map();
function checkHref(href, where) {
  if (/^https?:/.test(href)) { external.add(href); return; }
  if (/^mailto:/.test(href)) return;
  const [file, anchor] = href.split("#");
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return fail(`${where}: link target missing: ${href}`);
  // The simulator opens screens by route (#swap, #rate, …), not by element id; routes checked in a browser 10 Nov 2026.
  const SIM_ROUTES = ["swap", "trade", "rate", "quote", "pool", "stress", "calc", "speed"];
  if (anchor && file === "simulator.html" && SIM_ROUTES.includes(anchor)) return;
  if (anchor) {
    if (!htmlCache.has(p)) htmlCache.set(p, fs.readFileSync(p, "utf8"));
    if (!new RegExp(`id=["']${anchor}["']`).test(htmlCache.get(p))) fail(`${where}: anchor #${anchor} not found in ${file}`);
  }
}
for (const e of scope) {
  if (!e.sources.length) fail(`${e.id}: no source`);
  e.sources.forEach((s) => checkHref(s.href, `${e.id} source`));
  for (const m of e.answer.matchAll(/\]\(([^)\s]+)\)/g)) checkHref(m[1], `${e.id} answer link`);
}
say(`- internal links checked; ${external.size} external link(s) to check online:`);
[...external].forEach((u) => say(`  - ${u}`));

// 3 wording rules
say("\n## 3 Wording rules");
const rules = parseRules();
say(`- ${rules.length} rules from ask/wording-rules.md`);
for (const e of scope) {
  const fields = { q: e.q, also: (e.also || []).join(" | "), answer: answerText(e.answer) };
  for (const r of rules) {
    for (const [field, text] of Object.entries(fields)) {
      const hits = [...text.matchAll(r.re)].map((m) => m[0]);
      if (!hits.length) continue;
      const msg = `${e.id} [${r.id}] in ${field}: "${hits.join('", "')}"`;
      if (e.allowed[r.id] !== undefined) say(`- allowed ${msg} (reason: ${e.allowed[r.id]})`);
      else if (r.level === "fail") fail(msg);
      else warn(msg);
    }
  }
}

// 4 placeholders
say("\n## 4 Placeholders");
for (const e of scope) {
  const n = (e.answer.match(/\[PLACEHOLDER:/g) || []).length;
  if (!n) continue;
  if (e.status === "approved") fail(`${e.id}: published entry still has ${n} placeholder(s)`);
  else warn(`${e.id}: ${n} placeholder(s) to fill before approval`);
}

// 5 fixed replies: each must catch its own question, and must not catch other entries' questions
say("\n## 5 Fixed replies");
const fixed = scope.filter((e) => e.kind === "fixed");
const hit = (e, q) => e.trigger.some((t) => new RegExp(t, "i").test(q));
for (const f of fixed) {
  if (!hit(f, f.q)) fail(`${f.id}: does not catch its own question "${f.q}"`);
  for (const e of scope.filter((x) => x.kind === "answer")) {
    for (const q of [e.q, ...(e.also || []), ...(e.test || [])]) if (hit(f, q)) warn(`${f.id} catches "${q}" (meant for ${e.id})`);
  }
  say(`- ${f.id}: ${f.trigger.length} trigger(s)`);
}

// 6 search quality
say("\n## 6 Search quality");
const kb = JSON.parse(fs.readFileSync(KB_JSON, "utf8"));
const modelBytes = fs.readFileSync(MODEL);
const sha = crypto.createHash("sha256").update(modelBytes).digest("hex");
const E = await makeEmbedder(ort, new Uint8Array(modelBytes), fs.readFileSync(VOCAB, "utf8"));
kb.entries.forEach((e) => { e.vecs = e.vecs.map(b64ToF32); });
const kwIndex = makeKeywordIndex(kb.entries);
const sem = [], kwd = [];
let direct = 0, wrongAns = 0;
say("| entry | test phrasing | semantic: rank, score, result | keyword-only: rank, result |");
say("|---|---|---|---|");
for (const e of scope.filter((x) => x.kind === "answer")) {
  if (!(e.test || []).length) { warn(`${e.id}: no test phrasings`); continue; }
  for (const t of e.test) {
    const qv = await E.embed(t);
    const rs = rank(kb, t, qv, kwIndex), rk = rank(kb, t, null, kwIndex);
    const ps = rs.results.findIndex((r) => r.entry.id === e.id), pk = rk.results.findIndex((r) => r.entry.id === e.id);
    const caught = rs.mode === "fixed";
    const shown = (r, p) => p >= 0 && (r.level === "answer" || r.level === "suggest");
    const okS = shown(rs, ps) && !caught;
    sem.push(okS); kwd.push(shown(rk, pk));
    if (rs.level === "answer" && ps === 0 && !caught) direct++;
    if (rs.level === "answer" && ps !== 0 && !caught) wrongAns++;
    const sc = ps >= 0 ? rs.results[ps].score.toFixed(2) : "-";
    say(`| ${e.id} | ${t} | ${ps >= 0 ? ps + 1 : "miss"}, ${sc}, ${caught ? "fixed reply" : rs.level} | ${pk >= 0 ? pk + 1 : "miss"}, ${rk.level} |`);
    if (!okS) warn(`${e.id}: test phrasing "${t}" not shown (answer or "did you mean") in the top 3`);
  }
}
say(`\n- semantic (normal mode): ${direct}/${sem.length} answered directly; ${sem.filter(Boolean).length}/${sem.length} shown as an answer or "did you mean"; ${wrongAns}/${sem.length} given a wrong answer first`);
say(`- keyword-only (while the model loads, or if it fails): ${kwd.filter(Boolean).length}/${kwd.length} shown`);
// Publishing gate (set 10 Nov 2026, after the first runs; David to approve): at least 80% of test phrasings shown as an
// answer or "Did you mean" with the right entry, and at most 10% given a wrong answer first.
const GATE = { shown: 0.8, wrongFirst: 0.1 };
if (sem.length && sem.filter(Boolean).length / sem.length < GATE.shown) fail(`search: ${sem.filter(Boolean).length}/${sem.length} shown, below the ${GATE.shown * 100}% gate`);
if (sem.length && wrongAns / sem.length > GATE.wrongFirst) fail(`search: ${wrongAns}/${sem.length} wrong answers first, above the ${GATE.wrongFirst * 100}% gate`);
say(`- gate: at least ${GATE.shown * 100}% shown, at most ${GATE.wrongFirst * 100}% wrong answer first`);
say("\nOff-topic probes (must show \"not covered yet\"):");
for (const t of OFF_TOPIC) {
  const r = rank(kb, t, await E.embed(t), kwIndex);
  say(`- "${t}": top ${r.results[0].entry.id} ${r.results[0].score.toFixed(2)} -> ${r.level}`);
  if (r.level !== "none") fail(`off-topic probe not refused: "${t}" (${r.level})`);
}
say(`- thresholds in use: answer ${kb.thresholds.answer}, suggest ${kb.thresholds.suggest}`);

// 7 model match
say("\n## 7 Model");
if (kb.model.sha256 !== sha) fail(`knowledge.json was built with a different model (${kb.model.sha256.slice(0, 12)} vs ${sha.slice(0, 12)}): rebuild`);
else say(`- knowledge.json and model file match (sha256 ${sha})`);
if (kb.preview && !preview) fail("knowledge.json is a preview build: run build.mjs without --preview before publishing");

const head = `# Ask Exe check report\n\n${new Date().toISOString()} · ${preview ? "preview" : "publish"} mode · ` +
  `${fails.length} fail(s), ${warns.length} warning(s)\n`;
const text = head + "\n" + report.join("\n") + "\n";
if (outFile) fs.writeFileSync(outFile, text);
console.log(text);
process.exit(fails.length ? 1 : 0);
