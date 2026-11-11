// One-off evaluation on a held-out phrasing list (id | phrasing). Uses the same search code and thresholds as the page.
//   node fresh-eval.mjs <list.md> [--out report.md]
import fs from "node:fs";
import * as ort from "onnxruntime-web/wasm";
import { makeEmbedder, makeKeywordIndex, rank, b64ToF32 } from "../../assets/ask/ask-core.mjs";
import { KB_JSON, MODEL, VOCAB } from "./kb.mjs";
ort.env.wasm.numThreads = 1;
const [listFile] = process.argv.slice(2);
const outFile = process.argv.includes("--out") ? process.argv[process.argv.indexOf("--out") + 1] : null;
const items = fs.readFileSync(listFile, "utf8").split("\n").map((l) => l.match(/^([a-z0-9-]+) \| (.+)$/)).filter(Boolean).map((m) => ({ id: m[1], t: m[2].trim() }));
const kb = JSON.parse(fs.readFileSync(KB_JSON, "utf8"));
kb.entries.forEach((e) => { e.vecs = e.vecs.map(b64ToF32); });
const kw = makeKeywordIndex(kb.entries);
const E = await makeEmbedder(ort, new Uint8Array(fs.readFileSync(MODEL)), fs.readFileSync(VOCAB, "utf8"));
const kind = Object.fromEntries(kb.entries.map((e) => [e.id, e.kind]));
const c = { direct: 0, suggestRight: 0, suggestWrong: 0, wrongFirst: 0, refused: 0, fixedRight: 0, fixedWrong: 0, fixedMissed: 0 };
const rows = [];
for (const { id, t } of items) {
  const r = rank(kb, t, await E.embed(t), kw);
  const top = r.results.map((x) => x.entry.id);
  let res;
  if (kind[id] === "fixed") res = r.mode === "fixed" && top[0] === id ? "fixedRight" : r.mode === "fixed" ? "fixedWrong" : "fixedMissed";
  else if (r.mode === "fixed") res = "fixedWrong";
  else if (r.level === "answer") res = top[0] === id ? "direct" : "wrongFirst";
  else if (r.level === "suggest") res = top.includes(id) ? "suggestRight" : "suggestWrong";
  else res = "refused";
  c[res]++;
  rows.push(`| ${id} | ${t} | ${res} | ${top[0]} ${r.results[0] ? r.results[0].score.toFixed(2) : ""} |`);
}
const n = items.length, nf = items.filter((x) => kind[x.id] === "fixed").length, na = n - nf;
const text = `# Fresh test set: first and only run before any tuning\n\n${new Date().toISOString()} · ${items.length} phrasings from ${listFile}\n\n` +
  `On-topic answer questions (${na}): direct correct answer ${c.direct}; correct "Did you mean" ${c.suggestRight}; ` +
  `"Did you mean" without the right entry ${c.suggestWrong}; wrong answer first ${c.wrongFirst}; refused ("not covered") ${c.refused}.\n` +
  `Fixed-reply questions (${nf}): caught correctly ${c.fixedRight}; missed ${c.fixedMissed}. Ordinary or fixed questions sent to the wrong fixed reply: ${c.fixedWrong}.\n\n` +
  `| intended entry | phrasing | result | top match, score |\n|---|---|---|---|\n` + rows.join("\n") + "\n";
if (outFile) fs.writeFileSync(outFile, text);
console.log(text.split("\n").slice(0, 6).join("\n"));
