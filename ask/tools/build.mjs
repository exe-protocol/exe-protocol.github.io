// Build assets/ask/knowledge.json from ask/knowledge.md.
//   node build.mjs            published build: approved entries only
//   node build.mjs --preview  also includes sample, draft and needs-input entries (marked as preview on the page)
import fs from "node:fs";
import crypto from "node:crypto";
import * as ort from "onnxruntime-web/wasm";
import { makeEmbedder } from "../../assets/ask/ask-core.mjs";
import { parseKnowledge, answerHtml, answerText, KB_JSON, MODEL, VOCAB } from "./kb.mjs";

const preview = process.argv.includes("--preview");
ort.env.wasm.numThreads = 1;

// Search thresholds. Set from the check report (check.mjs prints every score); change only with a note here.
// 10 Nov 2026, core batch (38 answers, 76 held-out test phrasings, 10 off-topic probes), answer vectors added:
//   answer  >= 0.40, and at least 0.05 ahead of the runner-up: show the best answer
//   suggest >= 0.30: show the top questions as "Did you mean"
//   below: "not covered yet"
// Chosen to cut confidently wrong answers (24 -> 9 of 76) at the cost of more "Did you mean" (direct answers 41 -> 32);
// all 10 off-topic probes refused. Re-check on fresh test phrasings before publishing (these were used to choose).
// Keyword-only mode (while the model loads): answer when the entry covers half the question's words.
const THRESHOLDS = { answer: 0.40, margin: 0.05, suggest: 0.30, keyword: 0.35, keywordCover: 0.5, keywordSuggest: 0.34 };

const { entries, starters, errors } = parseKnowledge();
if (errors.length) { console.error("knowledge.md has errors:\n- " + errors.join("\n- ")); process.exit(1); }

const keep = entries.filter((e) => e.status === "approved" || preview);
const keepIds = new Set(keep.map((e) => e.id));
const modelBytes = fs.readFileSync(MODEL);
const modelSha = crypto.createHash("sha256").update(modelBytes).digest("hex");
const E = await makeEmbedder(ort, new Uint8Array(modelBytes), fs.readFileSync(VOCAB, "utf8"));

const f32b64 = (v) => Buffer.from(v.buffer, v.byteOffset, v.byteLength).toString("base64");
const out = [];
for (const e of keep) {
  const phrasings = [e.q, ...(e.also || [])];
  // One vector per phrasing, plus one for the answer text (helps questions phrased around the answer's content).
  const vecs = e.kind === "answer" ? await Promise.all([...phrasings, answerText(e.answer)].map((p) => E.embed(p))) : [];
  out.push({
    id: e.id, kind: e.kind, topic: e.topic || "", q: e.q, also: e.also || [], keywords: e.keywords || [],
    triggers: e.trigger, html: answerHtml(e.answer), sources: e.sources,
    related: (e.related || []).filter((r) => keepIds.has(r)),
    preview: e.status !== "approved", status: e.status,
    vecs: vecs.map(f32b64),
  });
}

const kb = {
  built: new Date().toISOString(),
  preview,
  model: { file: "model/model_quantized.onnx", sha256: modelSha },
  thresholds: THRESHOLDS,
  starters: starters.filter((s) => keepIds.has(s)),
  entries: out,
};
fs.writeFileSync(KB_JSON, JSON.stringify(kb));
console.log(`${preview ? "PREVIEW" : "Published"} build: ${out.length} of ${entries.length} entries -> assets/ask/knowledge.json ` +
  `(${(fs.statSync(KB_JSON).size / 1024).toFixed(0)} KB), model sha256 ${modelSha.slice(0, 12)}…`);
