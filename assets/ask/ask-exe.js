// Ask Exe: answers from the approved knowledge bank, searched in the visitor's browser.
// No server, no LLM: every answer shown is a checked entry from ask/knowledge.md, never generated text.
import { makeEmbedder, makeKeywordIndex, rank, b64ToF32, sameQuestion, makeSpeller, smartRank } from "./ask-core.mjs";

const BASE = new URL("./", import.meta.url);
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
  let embedder = null, loading = null, speller = null;
  // Small file (the model's word list): lets the search mend simple typos even before the model itself has loaded.
  fetch(new URL("model/vocab.txt", BASE)).then((r) => (r.ok ? r.text() : "")).then((t) => { if (t) speller = makeSpeller(kb, t); }).catch(() => {});
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

  // Router (24 Nov 2026): when the search is unsure, a small AI service picks the best approved entry. It never writes an answer.
  // Only unsure typed questions leave the browser. Any failure, delay or limit falls back to the search result unchanged.
  const ROUTER_URL = "";                      // set to the router address to switch the router on; "" keeps the search only
  const ROUTER_MAX = 25, ROUTER_WAIT = 4000;
  let routerUsed = 0;
  const plain = (h) => String(h || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 220);
  async function route(q, r) {
    if (!ROUTER_URL || r.mode === "fixed" || r.level === "answer" || !r.results || !r.results.length || routerUsed >= ROUTER_MAX) return r;
    routerUsed++;
    const cands = r.results.slice(0, 6).map((x) => ({ id: x.entry.id, q: x.entry.q, also: (x.entry.also || []).slice(0, 5), a: plain(x.entry.html) }));
    const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), ROUTER_WAIT);
    try {
      const res = await fetch(ROUTER_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question: q, candidates: cands }), signal: ctl.signal });
      if (!res.ok) return r;
      const j = await res.json(), id = j.picks && j.picks[0], e = id && byId.get(id);
      if (!e || !cands.some((c) => c.id === id)) return r;
      const rest = r.results.filter((x) => x.entry.id !== id);
      const first = r.results.find((x) => x.entry.id === id) || { entry: e, score: 1 };
      return j.sure ? { ...r, level: "answer", results: [{ ...first, score: Math.max(first.score, 1) }, ...rest.slice(0, 2)] }
                    : { ...r, level: "suggest", results: [{ ...first, score: Math.max(first.score, 1) }, ...rest] };
    } catch (e) { return r; } finally { clearTimeout(timer); }
  }

  async function search(q) {
    const prev = turns.length ? turns[turns.length - 1].q : null;
    const find = (emb) => smartRank(async (x) => rank(kb, x, emb ? await emb.embed(x) : null, kwIndex), q, { fix: speller, prev });
    let r = await find(embedder);
    if (r.mode === "fixed") return r;
    if (!embedder && r.level !== "answer" && loading) {
      // The model is still loading and keywords alone are not sure: wait for it (up to 20 s).
      const emb = await Promise.race([loading, new Promise((res) => setTimeout(() => res(null), 20000))]);
      if (emb) r = await find(emb);
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
      body = `<p class="ax-note">That isn't covered here yet. Try one of these, or <a href="https://exe-protocol.github.io/index.html#contact">contact our team</a>.</p>` +
        `<div class="ax-rel">${kb.starters.slice(0, 4).map((id) => byId.get(id)).filter(Boolean).map(chip).join("")}</div>`;
    }
    const item = document.createElement("div");
    item.className = "ax-turn";
    item.innerHTML = `<div class="ax-mewrap"><div class="ax-me">${esc(q)}</div></div><div class="ax-bot"><span class="ax-av">${SPARK}</span><div class="ax-card">${body}</div></div>`;
    log.appendChild(item);
    log.hidden = false;
    bar.hidden = false;
    if (scroll) place(item);
    return item;
  }

  // The question is king (17 Nov): a new question lands just under "Clear history", and each question stays
  // pinned there while its answer scrolls past, on the Exe AI page and in the panel alike.
  function scroller() {
    for (let el = log.parentElement; el && el !== document.body; el = el.parentElement) {
      const o = getComputedStyle(el).overflowY;
      if (o === "auto" || o === "scroll") return el;
    }
    return null;
  }
  function stickTop() {
    const sc = scroller();
    // the question band meets the bar with no gap; if the bar sits outside the scrolling area (phone panel header), the band goes to the very top
    const v = sc && !sc.contains(bar) ? -(parseFloat(getComputedStyle(sc).paddingTop) || 0) : (parseFloat(getComputedStyle(bar).top) || 0) + bar.offsetHeight;
    root.style.setProperty("--ax-stick", v + "px");
    return v;
  }
  // Lock a new answer under its question, and keep it there (17 Nov). The target is worked out from the answer's own
  // position, not the sticky question, so it holds whether or not the question is already pinned. After the scroll
  // settles, and whenever the layout moves (the window or phone keyboard resizing, late layout changes), the position
  // is corrected again. The lock lets go only when the visitor scrolls, touches or presses a key.
  let lock = null;
  function releaseLock() { if (lock) { lock.stop(); lock = null; } }
  function place(item) {
    releaseLock();
    const sc = scroller(), root_ = sc || document.documentElement;
    root_.style.overflowAnchor = "none";                     // the browser must not shift the view by itself
    const wrap = item.firstElementChild;
    const delta = parseFloat(getComputedStyle(wrap).marginTop) || 0;   // the question's own offset; never read from its sticky position
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = () => (sc ? sc.scrollTop : scrollY);
    const target = () => {
      const st = stickTop();
      if (sc) {
        const pad = parseFloat(getComputedStyle(sc).paddingTop) || 0;
        return pos() + item.getBoundingClientRect().top + delta - sc.getBoundingClientRect().top - pad - st;
      }
      return pos() + item.getBoundingClientRect().top + delta - st;
    };
    const go = (top, behavior) => (sc ? sc.scrollTo({ top, behavior }) : scrollTo({ top, behavior }));
    const room = (top) => {                                   // room for a short last answer to reach the top
      const h = sc ? sc.clientHeight : innerHeight, sh = sc ? sc.scrollHeight : document.documentElement.scrollHeight;
      const have = parseFloat(root.style.paddingBottom) || 0, r = top + h - (sh - have);
      root.style.paddingBottom = r > 0 ? Math.ceil(r) + "px" : "0px";
    };
    const align = (behavior) => { const t = target(); room(t); if (behavior === "auto" ? Math.abs(pos() - t) > 1 : true) go(t, behavior); };
    let moving = true, raf = 0, timer = 0;
    const fix = () => { if (!moving) align("auto"); };       // late layout changes: snap back, no animation
    const settle = () => {                                    // wait until the smooth scroll has stopped, then check once
      let last = -1, still = 0, frames = 0;
      const tick = () => {
        const y = pos(); still = y === last ? still + 1 : 0; last = y;
        if (still >= 6 || ++frames > 120) { moving = false; align("auto"); return; }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(fix) : null;
    ro && (ro.observe(log), sc && ro.observe(sc));
    const ev = ["wheel", "touchstart", "keydown", "mousedown"], vv = window.visualViewport;
    const user = (e) => { if (e.type === "keydown" && e.target.closest && e.target.closest("form")) return; releaseLock(); };
    ev.forEach((n) => addEventListener(n, user, { capture: true, passive: true }));
    addEventListener("resize", fix); vv && vv.addEventListener("resize", fix);
    lock = { stop() { cancelAnimationFrame(raf); clearTimeout(timer); ro && ro.disconnect(); ev.forEach((n) => removeEventListener(n, user, true)); removeEventListener("resize", fix); vv && vv.removeEventListener("resize", fix); } };
    align(reduced ? "auto" : "smooth");
    reduced ? (moving = false) : settle();
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
    releaseLock();
    root.style.paddingBottom = "";
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
      let r = await search(q);
      r = await route(q, r);
      remember(q, r);                          // drops the oldest turn first, so nothing moves after the new answer is placed
      draw(q, r.level, r.results, true);
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

  // Remember where the visitor was in the thread, so closing the panel or moving to another page and reopening it
  // brings them back to the same spot, with the pinned question in its right place (17 Nov).
  const SCROLL_KEY = "exe-ask-scroll-v1";
  const sc0 = scroller();
  const saveScroll = () => {
    if (!sc0 || !sc0.offsetParent || !turns.length) return;   // hidden panel reads 0: never save that
    try { sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ top: Math.round(sc0.scrollTop), pad: parseFloat(root.style.paddingBottom) || 0, n: turns.length, q: turns[turns.length - 1].q })); } catch (e) {}
  };
  let saveT = 0;
  sc0 && sc0.addEventListener("scroll", () => { clearTimeout(saveT); saveT = setTimeout(saveScroll, 120); }, { passive: true });
  addEventListener("pagehide", saveScroll);
  const resume = () => {
    if (!log.hidden && bar) stickTop();                       // the pinned question's offset, measured now that the panel is on screen
    if (!sc0 || !turns.length) return;
    let st = null; try { st = JSON.parse(sessionStorage.getItem(SCROLL_KEY) || "null"); } catch (e) {}
    if (!st || st.n !== turns.length || st.q !== turns[turns.length - 1].q) return;   // a different thread: leave it
    releaseLock();
    root.style.paddingBottom = st.pad ? st.pad + "px" : "";
    sc0.style.scrollBehavior = "auto"; sc0.scrollTop = st.top;
  };
  if (typeof ResizeObserver === "function" && sc0) { const r2 = new ResizeObserver(() => { if (sc0.offsetParent && !log.hidden) stickTop(); }); r2.observe(sc0); r2.observe(bar); }
  bar.addEventListener("click", () => { try { sessionStorage.removeItem(SCROLL_KEY); } catch (e) {} });
  return { ask, resume, saveScroll };
}
