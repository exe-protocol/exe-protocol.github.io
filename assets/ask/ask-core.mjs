// Ask Exe core: tokenizer, embedding, keyword search and ranking.
// Shared by the browser (assets/ask/ask-exe.js) and the build/check scripts (ask/tools/*.mjs),
// so entry vectors and visitor questions are always made by the same code and the same model.

// ---------- BERT uncased WordPiece tokenizer (matches BertTokenizer, do_lower_case=True) ----------
const ASCII_PUNCT = (cp) => (cp >= 33 && cp <= 47) || (cp >= 58 && cp <= 64) || (cp >= 91 && cp <= 96) || (cp >= 123 && cp <= 126);
const isPunct = (ch) => ASCII_PUNCT(ch.codePointAt(0)) || /\p{P}/u.test(ch);
const isWhite = (ch) => ch === " " || ch === "\t" || ch === "\n" || ch === "\r" || /\p{Zs}/u.test(ch);
const isControl = (ch) => !(ch === "\t" || ch === "\n" || ch === "\r") && /[\p{Cc}\p{Cf}]/u.test(ch);
const isCJK = (cp) =>
  (cp >= 0x4e00 && cp <= 0x9fff) || (cp >= 0x3400 && cp <= 0x4dbf) || (cp >= 0x20000 && cp <= 0x2a6df) ||
  (cp >= 0x2a700 && cp <= 0x2b73f) || (cp >= 0x2b740 && cp <= 0x2b81f) || (cp >= 0x2b820 && cp <= 0x2ceaf) ||
  (cp >= 0xf900 && cp <= 0xfaff) || (cp >= 0x2f800 && cp <= 0x2fa1f);

export function makeTokenizer(vocabText, maxLen = 128) {
  const vocab = new Map();
  vocabText.split("\n").forEach((t, i) => { if (t !== "" || i === 0) vocab.set(t.replace(/\r$/, ""), i); });
  const UNK = vocab.get("[UNK]"), CLS = vocab.get("[CLS]"), SEP = vocab.get("[SEP]");

  function basic(text) {
    let out = "";
    for (const ch of text) {
      const cp = ch.codePointAt(0);
      if (cp === 0 || cp === 0xfffd || isControl(ch)) continue;
      if (isCJK(cp)) out += " " + ch + " ";
      else out += isWhite(ch) ? " " : ch;
    }
    const tokens = [];
    for (let w of out.trim().split(/ +/)) {
      if (!w) continue;
      w = w.toLowerCase().normalize("NFD").replace(/\p{Mn}/gu, "");
      let cur = "";
      for (const ch of w) {
        if (isPunct(ch)) { if (cur) tokens.push(cur); tokens.push(ch); cur = ""; }
        else cur += ch;
      }
      if (cur) tokens.push(cur);
    }
    return tokens;
  }

  function wordpiece(word) {
    const chars = Array.from(word);
    if (chars.length > 100) return [UNK];
    const ids = [];
    let start = 0;
    while (start < chars.length) {
      let end = chars.length, found = null;
      while (start < end) {
        let sub = chars.slice(start, end).join("");
        if (start > 0) sub = "##" + sub;
        if (vocab.has(sub)) { found = vocab.get(sub); break; }
        end--;
      }
      if (found === null) return [UNK];
      ids.push(found);
      start = end;
    }
    return ids;
  }

  function encode(text) {
    let ids = [];
    for (const w of basic(text)) ids.push(...wordpiece(w));
    ids = ids.slice(0, maxLen - 2);
    return [CLS, ...ids, SEP];
  }
  return { encode, basic };
}

// ---------- Embedding (mean or CLS pooling + L2 normalisation, as sentence-transformers) ----------
export async function makeEmbedder(ort, modelBytes, vocabText, pooling = "mean") {
  const tok = makeTokenizer(vocabText);
  const session = await ort.InferenceSession.create(modelBytes, { executionProviders: ["wasm"] });
  async function embed(text) {
    const ids = tok.encode(text);
    const n = ids.length;
    const big = (a) => BigInt64Array.from(a, (x) => BigInt(x));
    const feeds = {
      input_ids: new ort.Tensor("int64", big(ids), [1, n]),
      attention_mask: new ort.Tensor("int64", big(ids.map(() => 1)), [1, n]),
      token_type_ids: new ort.Tensor("int64", big(ids.map(() => 0)), [1, n]),
    };
    const out = await session.run(feeds);
    const h = out.last_hidden_state.data, d = 384, v = new Float32Array(d);
    if (pooling === "cls") for (let j = 0; j < d; j++) v[j] = h[j];
    else { for (let t = 0; t < n; t++) for (let j = 0; j < d; j++) v[j] += h[t * d + j]; for (let j = 0; j < d; j++) v[j] /= n; }
    let norm = 0;
    for (let j = 0; j < d; j++) norm += v[j] * v[j];
    norm = Math.sqrt(norm) || 1;
    for (let j = 0; j < d; j++) v[j] /= norm;
    return v;
  }
  return { embed, encode: tok.encode };
}

export const dot = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };

export function b64ToF32(b64) {
  const bin = typeof atob === "function" ? atob(b64) : Buffer.from(b64, "base64").toString("binary");
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return new Float32Array(u8.buffer);
}

// ---------- Keyword search (BM25 over question + phrasings + keywords) ----------
const STOP = new Set("a an and are as at be by can do does for from how i if in is it its me my of on or so that the this to was we what when where which who why will with you your our us about".split(" "));
export const words = (s) =>
  s.toLowerCase().normalize("NFD").replace(/\p{Mn}/gu, "").replace(/\$/g, " $").split(/[^\p{L}\p{N}$]+/u)
    .filter((w) => w && !STOP.has(w)).map((w) => (w.length > 4 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w));

export function makeKeywordIndex(entries) {
  const docs = entries.map((e) => e.kind === "fixed" ? [] : words([e.q, ...(e.also || []), ...(e.keywords || []), e.topic || ""].join(" ")));
  const df = new Map();
  docs.forEach((d) => new Set(d).forEach((w) => df.set(w, (df.get(w) || 0) + 1)));
  const N = docs.length, avg = docs.reduce((s, d) => s + d.length, 0) / Math.max(N, 1), k1 = 1.2, b = 0.75;
  return function score(query) {
    const qw = [...new Set(words(query))];
    return docs.map((d) => {
      let s = 0;
      for (const w of qw) {
        const f = d.filter((x) => x === w).length;
        if (!f) continue;
        const idf = Math.log(1 + (N - df.get(w) + 0.5) / (df.get(w) + 0.5));
        s += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.length / avg));
      }
      // share of the question's words that this entry covers, 0..1
      const cover = qw.length ? qw.filter((w) => d.includes(w)).length / qw.length : 0;
      return { s, cover };
    });
  };
}

// ---------- Ranking ----------
// The keyword index must be built over the same kb.entries list.
// Thresholds are set in ask/tools/check.mjs against the held-out test phrasings and recorded in knowledge.json.
export function rank(kb, query, qvec, keywordScore) {
  // Fixed replies (e.g. token questions) win whenever one of their trigger patterns matches.
  for (const e of kb.entries) {
    if (e.kind === "fixed" && (e.triggers || []).some((t) => new RegExp(t, "i").test(query))) {
      return { mode: "fixed", level: "answer", ok: true, results: [{ entry: e, score: 1 }] };
    }
  }
  const kw = keywordScore(query);
  const maxKw = Math.max(1e-9, ...kw.filter((k, i) => kb.entries[i].kind !== "fixed").map((k) => k.s));
  const scored = kb.entries.map((e, i) => {
    let sem = null;
    if (qvec && e.vecs) for (const v of e.vecs) { const c = dot(qvec, v); if (sem === null || c > sem) sem = c; }
    const k = kw[i];
    const score = sem === null ? k.cover * (k.s / maxKw) : 0.8 * sem + 0.2 * k.cover;
    return { entry: e, score, sem, cover: k.cover };
  }).filter((r) => r.entry.kind !== "fixed").sort((a, b) => b.score - a.score);
  const t = kb.thresholds;
  const top = scored[0];
  // level: "answer" (show the best answer), "suggest" (show the top questions as "Did you mean"), "none" (not covered yet)
  let level = "none";
  // A close second place means the match is ambiguous: offer both as "Did you mean" rather than pick one.
  const gap = scored[1] ? top.score - scored[1].score : 1;
  if (top && qvec) level = top.score >= t.answer && gap >= (t.margin || 0) ? "answer" : top.score >= t.suggest ? "suggest" : "none";
  else if (top) level = top.cover >= t.keywordCover && top.score >= t.keyword ? "answer" : top.cover >= t.keywordSuggest ? "suggest" : "none";
  return { mode: qvec ? "semantic" : "keyword", level, ok: level === "answer", results: scored.slice(0, 3) };
}
