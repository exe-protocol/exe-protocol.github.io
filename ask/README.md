# Ask Exe

Visitors type a question on `ask.html`; the page finds the closest approved entry in `knowledge.md` and shows it with
its sources. Everything runs in the visitor's browser. No server, no LLM, no running cost, and no generated text.

## Files

- `ask/knowledge.md`: the knowledge bank. The only file to edit for content.
- `ask/wording-rules.md`: banned and flagged wording, read by the check.
- `ask/tools/`: build and check scripts (Node 22+). Not used by the live page.
- `ask.html`: the page.
- `assets/ask/`: what the page loads: `ask-exe.js` and `ask-core.mjs` (search), `ask-exe.css`, `knowledge.json`
  (built), `model/` (the sentence-embedding model, all-MiniLM-L6-v2, int8, Apache-2.0) and `ort/` (ONNX Runtime Web
  1.31.1, MIT).

## Where visitors meet it

- **The Exe AI panel** (`assets/exe-ai.js`, on the homepage and the simulator): the panel's question box is Ask Exe.
  The panel loads `assets/ask/ask-exe.js` when it first opens and answers in place.
- **`ask.html`:** the same search as a full page. `ask.html?q=…` opens with that question asked.

Both use the same code, bank and model, so an answer is the same in either place.

## How search works

1. **Fixed replies first:** questions about $XPT or investing always get the approved fixed reply.
2. **Exact questions:** a question typed or clicked exactly as an entry's own question always gets that entry.
3. **Keyword search:** answers at once while the model loads, about 90 KB in total.
4. **Smarter search:** a small embedding model loads in the background (about 38 MB, once; the browser keeps it). The
   model compares the question's meaning with every approved phrasing. Skipped when the visitor has Save-Data on.
5. **Result:** a close match shows the answer; a near match shows "Did you mean"; anything else shows "not covered
   yet" with suggested questions and the team's email and Telegram.

The build and the page use the same tokenizer code, the same model file and the same runtime, so stored vectors and
visitors' questions always match. The build records the model's sha256; the check fails if they differ.

## Run

```
cd ask/tools
npm install --ignore-scripts
node build.mjs              # published build: approved entries only
node build.mjs --preview    # preview build: every status, marked on the page
node check.mjs              # add --preview for a preview build; --out report.md saves the report
```

Upload `assets/ask/knowledge.json` after every published build.

<!-- Republished 12 Nov 2026 -->
