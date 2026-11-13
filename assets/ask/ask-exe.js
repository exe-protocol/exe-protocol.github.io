// Ask Exe: answers from the approved knowledge bank, searched in the visitor's browser.
// No server, no LLM: every answer shown is a checked entry from ask/knowledge.md, never generated text.
import { makeEmbedder, makeKeywordIndex, rank, b64ToF32, sameQuestion } from "./ask-core.mjs";

const BASE = new URL("./", import.meta.url);
const CONTACT = { email: "mailto:Richexeswap@proton.me", telegram: "https://t.me/Exeswap" };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const SPARK = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>';

// History: the visitor's questions are kept for the life of the browser tab, under one key shared by the Exe AI panel and
// ask.html. A turn is saved as the question, the result level and the entry ids with scores; on the next page the turn is
// rebuilt from the current bank by id, with no new search. Storage can be blocked, so every access is wrapped.
const HIST_KEY = "exe-ask-history-v1", HIST_MAX = 12;
const LEVELS = ["answer", "suggest", "none"];
const store = {
  load() {
    try {
      const v = JSON.parse(sessionStorage.getItem(HIST_KEY) || "null");
      if (!v || v.v !== 1 || !Array.isArray(v.turns)) return [];
      return v.turns.filter((t) => t && typeof t.q === "string" && LEVELS.includes(t.level) && Array.isArray(t.ids) &&
        t.ids.every((x) => Array.isArray(x) && typeof x[0] === "string" && typeof x[1] === "number")).slice(-HIST_MAX);
    } catch { return []; }
  },
  save(turns) { try { sessionStorage.setItem(HIST_KEY, JSON.stringify({ v: 1, turns })); } catch { /* storage blocked or full */ } },
  clear() { try { sessionStorage.removeItem(HIST_KEY); } catch { /* storage blocked */ } },
};

// opts.url === false: do not read or write the page address (used when mounted inside the Exe AI panel).
// opts.scroll: where a new answer lands in view, "nearest" (default) or "start" (the panel: the question at the top).
export async function mountAskExe(root, opts = {}) {
  const useUrl = opts.url !== false;
  const form = root.querySelector("[data-ax-form]"), input = root.querySelector("[data-ax-input]");
  const log = root.querySelector("[data-ax-log]"), startersEl = root.querySelector("[data-ax-starters]");
  const status = root.querySelector("[data-ax-status]");

  const kb = await (await fetch(new URL("knowledge.json", BASE))).json();
  kb.entries.forEach((e) => { e.vecs = (e.vecs || []).map(b64ToF32); });
  const byId = new Map(kb.entries.map((e) => [e.id, e]));
  const kwIndex = makeKeywordIndex(kb.entries);

  if (kb.preview) root.querySelector("[data-ax-preview]")?.removeAttribute("hidden");
  const chip = (e) => `<button type="button" class="ax-chip" data-ax-ask="${esc(e.q)}">${esc(e.q)}</button>`;
  startersEl.innerHTML = kb.starters.map((id) => byId.get(id)).filter(Boolean).map(chip).join("");

  // Smarter search: the embedding model loads in the background. Until it is ready, keyword search answers.
  let embedder = null, loading = null;
  function loadModel() {
    if (loading) return loading;
    const saveData = navigator.connection && navigator.connection.saveData;
    if (saveData) { setStatus(""); return (loading = Promise.resolve(null)); }
    setStatus("Loading smarter search…");
    loading = (async () => {
      const ort = await import(new URL("ort/ort.wasm.min.mjs", BASE).href);
      ort.env.wasm.wasmPaths = new URL("ort/", BASE).href;
      ort.env.wasm.numThreads = 1;
      const [m, v] = await Promise.all([
        fetch(new URL(kb.model.file, BASE)).then((r) => { if (!r.ok) throw new Error("model " + r.status); return r.arrayBuffer(); }),
        fetch(new URL("model/vocab.txt", BASE)).then((r) => r.text()),
      ]);
      embedder = await makeEmbedder(ort, new Uint8Array(m), v);
      setStatus("");
      return embedder;
    })().catch((err) => { console.warn("Ask Exe: smarter search unavailable, using keyword search", err); setStatus(""); return null; });
    return loading;
  }
  function setStatus(t) { if (status) { status.textContent = t; status.hidden = !t; } }

  async function search(q) {
    let r = rank(kb, q, embedder ? await embedder.embed(q) : null, kwIndex);
    if (r.mode === "fixed") return r;
    if (!embedder && r.level !== "answer" && loading) {
      // The model is still loading and keywords alone are not sure: wait for it (up to 20 s).
      const emb = await Promise.race([loading, new Promise((res) => setTimeout(() => res(null), 20000))]);
      if (emb) r = rank(kb, q, await emb.embed(q), kwIndex);
    }
    return r;
  }

  function sourcesHtml(e) {
    return '<div class="ax-src"><span>Source' + (e.sources.length > 1 ? "s" : "") + ":</span> " +
      e.sources.map((s) => `<a href="${esc(s.href)}"${/^https?:/.test(s.href) ? ' target="_blank" rel="noopener"' : ""}>${esc(s.title)}</a>`).join(" · ") + "</div>";
  }
  function relatedHtml(e, results) {
    const ids = [...(e.related || []), ...results.filter((r) => r.entry !== e && r.score >= kb.thresholds.suggest).map((r) => r.entry.id)];
    const list = [...new Set(ids)].map((id) => byId.get(id)).filter((x) => x && x !== e).slice(0, 4);
    return list.length ? '<div class="ax-rel"><span class="ax-label">Related</span>' + list.map(chip).join("") + "</div>" : "";
  }
  const previewTag = (e) => (e.preview ? `<span class="ax-tag" title="Not yet approved">${esc(e.status)}</span>` : "");

  // The answer opens with its question only when the visitor did not just ask that question: a clicked suggestion or an
  // exact question already shows it above, and a looser match needs the heading to show which question was answered.
  function draw(q, level, results, scroll) {
    let body;
    if (level === "answer") {
      const e = results[0].entry;
      const repeats = sameQuestion(q) === sameQuestion(e.q || "");
      const head = repeats ? (e.preview ? `<div class="ax-q">${previewTag(e)}</div>` : "") : `<h3 class="ax-q">${esc(e.q)}${previewTag(e)}</h3>`;
      body = `${head}<div class="ax-a">${e.html}</div>${sourcesHtml(e)}${relatedHtml(e, results)}`;
    } else if (level === "suggest") {
      body = `<p class="ax-note">Did you mean one of these?</p><div class="ax-rel">${results.filter((x) => x.score >= kb.thresholds.suggest).map((x) => chip(x.entry)).join("")}</div>`;
    } else {
      body = `<p class="ax-note">That isn't covered here yet. Try one of these, or ask the team by <a href="${CONTACT.email}">email</a> or on <a href="${CONTACT.telegram}" target="_blank" rel="noopener">Telegram</a>.</p>` +
        `<div class="ax-rel">${kb.starters.slice(0, 4).map((id) => byId.get(id)).filter(Boolean).map(chip).join("")}</div>`;
    }
    const item = document.createElement("div");
    item.className = "ax-turn";
    item.innerHTML = `<div class="ax-me">${esc(q)}</div><div class="ax-bot"><span class="ax-av">${SPARK}</span><div class="ax-card">${body}</div></div>`;
    log.appendChild(item);
    log.hidden = false;
    bar.hidden = false;
    if (scroll) item.scrollIntoView({ block: opts.scroll || "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    return item;
  }

  // Rebuild a saved turn from the current bank. A turn whose answer entry is gone is dropped.
  function restore(t) {
    const results = t.ids.map(([id, score]) => ({ entry: byId.get(id), score })).filter((x) => x.entry);
    if (t.level === "answer" && (!results.length || results[0].entry.id !== t.ids[0][0])) return null;
    if (t.level === "suggest" && !results.some((x) => x.score >= kb.thresholds.suggest)) return null;
    return draw(t.q, t.level, results, false);
  }
  function remember(q, r) {
    turns.push({ q, level: r.level, ids: r.results.map((x) => [x.entry.id, Math.round(x.score * 1000) / 1000]) });
    if (turns.length > HIST_MAX) { turns.shift(); log.firstElementChild?.remove(); }
    store.save(turns);
  }
  function clearHistory() {
    turns = []; store.clear();
    log.replaceChildren(); log.hidden = true; bar.hidden = true;
    if (useUrl) { const u = new URL(location.href); if (u.searchParams.has("q")) { u.searchParams.delete("q"); history.replaceState(null, "", u); } } // a reload must not bring the last question back
    if (!matchMedia("(pointer: coarse)").matches) input.focus({ preventScroll: true });
  }

  // "Clear history" sits just above the log and shows only while the log has turns.
  const bar = document.createElement("div");
  bar.className = "ax-histbar"; bar.hidden = true;
  bar.innerHTML = '<button type="button" class="ax-clear">Clear history</button>';
  log.parentNode.insertBefore(bar, log);
  bar.addEventListener("click", clearHistory);
  let turns = [];

  let busy = false;
  async function ask(q) {
    q = (q || "").trim().slice(0, 300);
    if (!q || busy) return;
    busy = true; input.value = ""; form.setAttribute("aria-busy", "true");
    try {
      const r = await search(q);
      draw(q, r.level, r.results, true);
      remember(q, r);
      if (useUrl) { const u = new URL(location.href); u.searchParams.set("q", q); u.hash = ""; history.replaceState(null, "", u); }
    } finally { busy = false; form.removeAttribute("aria-busy"); }
  }

  form.addEventListener("submit", (ev) => { ev.preventDefault(); ask(input.value); });
  root.addEventListener("click", (ev) => { const b = ev.target.closest("[data-ax-ask]"); if (b) { ev.preventDefault(); ask(b.dataset.axAsk); } });
  loadModel();

  // Bring back the earlier turns (no search, no scrolling), then ask ?q= unless it is the question just asked.
  const saved = store.load();
  turns = saved.filter((t) => restore(t));
  if (turns.length !== saved.length) store.save(turns);
  const q0 = useUrl ? new URL(location.href).searchParams.get("q") : null;
  if (q0 && !(turns.length && sameQuestion(q0) === sameQuestion(turns[turns.length - 1].q))) ask(q0);
  return { ask };
}
