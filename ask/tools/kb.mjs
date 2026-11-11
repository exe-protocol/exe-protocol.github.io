// Reads ask/knowledge.md and ask/wording-rules.md. Shared by build.mjs and check.mjs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const KB_MD = path.join(ROOT, "ask", "knowledge.md");
export const RULES_MD = path.join(ROOT, "ask", "wording-rules.md");
export const KB_JSON = path.join(ROOT, "assets", "ask", "knowledge.json");
export const MODEL = path.join(ROOT, "assets", "ask", "model", "model_quantized.onnx");
export const VOCAB = path.join(ROOT, "assets", "ask", "model", "vocab.txt");

const LIST = new Set(["also", "test"]);
const COMMA = new Set(["keywords", "related", "starters"]);
const MULTI = new Set(["source", "trigger", "allow"]);
const STATUSES = ["approved", "sample", "draft", "needs-input"];

export function parseKnowledge(text = fs.readFileSync(KB_MD, "utf8")) {
  const blocks = text.split(/^---\s*$/m);
  const intro = blocks.shift();
  const sm = intro.match(/^starters:\s*(.+)$/m);
  const starters = sm ? sm[1].split(",").map((s) => s.trim()).filter(Boolean) : [];
  const errors = [];
  const entries = blocks.map((block, n) => {
    const lines = block.replace(/^\s*\n/, "").split("\n");
    const e = { source: [], trigger: [], allow: [] };
    let i = 0;
    for (; i < lines.length && lines[i].trim() !== ""; i++) {
      const m = lines[i].match(/^([a-z]+):\s?(.*)$/);
      if (!m) { errors.push(`entry ${n + 1}: header line not understood: "${lines[i]}"`); continue; }
      const [, k, v] = m;
      if (MULTI.has(k)) e[k].push(v.trim());
      else if (LIST.has(k)) e[k] = v.split("|").map((s) => s.trim()).filter(Boolean);
      else if (COMMA.has(k)) e[k] = v.split(",").map((s) => s.trim()).filter(Boolean);
      else e[k] = v.trim();
    }
    e.answer = lines.slice(i).join("\n").trim();
    e.sources = e.source.map((s) => {
      const [title, href] = s.split("|").map((x) => x.trim());
      return { title, href };
    });
    e.allowed = Object.fromEntries(e.allow.map((a) => { const [id, ...why] = a.split(":"); return [id.trim(), why.join(":").trim()]; }));
    delete e.source; delete e.allow;
    const where = `entry ${n + 1} (${e.id || "no id"})`;
    if (!e.id || !/^[a-z0-9-]+$/.test(e.id)) errors.push(`${where}: id missing or not lowercase-with-dashes`);
    if (!STATUSES.includes(e.status)) errors.push(`${where}: status must be one of ${STATUSES.join(", ")}`);
    if (!["answer", "fixed"].includes(e.kind)) errors.push(`${where}: kind must be answer or fixed`);
    if (!e.q) errors.push(`${where}: q missing`);
    if (!e.answer) errors.push(`${where}: answer missing`);
    if (!e.sources.length || e.sources.some((s) => !s.title || !s.href)) errors.push(`${where}: every entry needs at least one "source: Title | link"`);
    if (e.kind === "fixed" && !e.trigger.length) errors.push(`${where}: fixed entries need at least one trigger`);
    if (e.kind === "fixed") for (const t of e.trigger) { try { new RegExp(t, "i"); } catch (x) { errors.push(`${where}: bad trigger ${t}: ${x.message}`); } }
    if (e.status === "approved" && !e.approved) errors.push(`${where}: approved entries need "approved: initials, date"`);
    return e;
  });
  const ids = new Map();
  for (const e of entries) { if (ids.has(e.id)) errors.push(`duplicate id ${e.id}`); ids.set(e.id, e); }
  for (const e of entries) for (const r of e.related || []) if (!ids.has(r)) errors.push(`${e.id}: related id ${r} not found`);
  for (const s of starters) if (!ids.has(s)) errors.push(`starter id ${s} not found`);
  return { entries, starters, errors };
}

export function parseRules(text = fs.readFileSync(RULES_MD, "utf8")) {
  const rules = [];
  for (const line of text.split("\n")) {
    const m = line.match(/^\| ([a-z0-9-]+) \| (fail|warn) \| `(.+)` \| (.+) \|$/);
    if (!m) continue;
    const [, id, level, raw, rule] = m;
    const pattern = raw.replace(/\\\|/g, "|");
    const caseSensitive = /^Case-sensitive/.test(rule);
    rules.push({ id, level, re: new RegExp(pattern, caseSensitive ? "g" : "gi"), rule });
  }
  return rules;
}

// Answer text -> safe HTML. Only the small set of formatting described in knowledge.md.
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
function inline(s) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, h) => {
      const ext = /^https?:/.test(h);
      return `<a href="${h}"${ext ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`;
    })
    .replace(/\[PLACEHOLDER:([^\]]*)\]/g, '<mark class="ax-ph">[PLACEHOLDER:$1]</mark>');
}
export function answerHtml(text) {
  return text.split(/\n\s*\n/).map((para) => {
    const ls = para.split("\n");
    if (ls.every((l) => /^- /.test(l) || /^\s+\S/.test(l))) {
      const items = [];
      for (const l of ls) { if (/^- /.test(l)) items.push(l.slice(2)); else items[items.length - 1] += " " + l.trim(); }
      return "<ul>" + items.map((x) => `<li>${inline(x)}</li>`).join("") + "</ul>";
    }
    return `<p>${inline(ls.join(" "))}</p>`;
  }).join("");
}
// Visible text of an answer, for the wording check.
export const answerText = (text) => text.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
