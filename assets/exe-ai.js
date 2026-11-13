/* Exe AI preview overlay (in development) — shared by index.html and simulator.html.
   The question box runs the Ask Exe code (assets/ask/): the same search and approved Q&A bank as ask.html. Answers
   come from that bank. The code loads when the panel first opens.
   Layout: the panel does not scroll. .xai-body scrolls; the header (.xai-head, with the close button) and the
   question box (.xai-dock) stay put. */
(function () {
  if (document.getElementById("xaiFab")) return;
  var here = (document.currentScript && document.currentScript.src) || new URL("assets/exe-ai.js", document.baseURI).href;
  var ASK_JS = new URL("ask/ask-exe.js", here).href, ASK_CSS = new URL("ask/ask-exe.css", here).href;
  var spark = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>';
  var send = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  var Q = [
    "How does Exe Protocol work for my app?",
    "What is Exe Protocol?",
    "What is XPR?",
    "What is Exeswap?",
    "Is any of this live?",
    "Has Exe been audited?",
    "How can I contact Exe about the project?"
  ];
  var W = [
    ["Values what you add", "Reads your verified on-chain signal to determine your XPR. The more value your activity adds, the more of your fees you redeem, from 0–100%."],
    ["Keeps it fair", "Spots bots and wallet farms, so fee redemption reaches genuine users, not bad actors gaming the system."],
    ["Can’t take a bigger slice", "Exe AI can’t raise fees or change the rules. It can only grow the share of your fees you redeem."],
    ["Explains itself", "Tells you clearly why your XPR is what it is—and how you can improve it."]
  ];

  var fab = document.createElement("button");
  fab.type = "button"; fab.id = "xaiFab"; fab.className = "xai-fab";
  fab.setAttribute("aria-haspopup", "dialog");
  fab.setAttribute("aria-label", "Ask Exe AI"); fab.title = "Ask Exe AI";
  fab.innerHTML = spark;

  var eye = document.querySelector(".exe-home-hero .xh-eye, #p-swap .xh-eye"), pill = null;
  if (eye) {
    pill = document.createElement("button");
    pill.type = "button"; pill.className = "xai-pill";
    pill.setAttribute("aria-haspopup", "dialog");
    pill.innerHTML = '<span class="new">' + spark.replace('width="18" height="18"', 'width="14" height="14"') + 'New</span><span>Meet Exe AI<span class="long">: built to add, not extract</span></span><span class="ar" aria-hidden="true">\u2192</span>';
    eye.parentNode.insertBefore(pill, eye);
  }

  var scrim = document.createElement("div");
  scrim.className = "xai-scrim"; scrim.id = "xaiScrim"; scrim.hidden = true;
  scrim.innerHTML =
    '<div class="xai" role="dialog" aria-modal="true" aria-labelledby="xaiTitle" tabindex="-1">' +
    '<div class="xai-head"><div class="xai-eyebrow">' + spark + ' Exe AI <span class="xai-badge"><i></i>In development</span></div>' +
    '<button type="button" class="xai-x" id="xaiClose" aria-label="Close">×</button></div>' +
    '<div class="xai-body"><div class="xai-grid"><div class="xai-left">' +
    '<h2 class="xai-h" id="xaiTitle">Built to add, not extract</h2>' +
    '<p class="xai-lede">Exe AI is being trained on our economic model, with one primary reward function: adding value for its users.</p>' +
    '<ul class="xai-will">' + W.map(function (w, i) { return '<li><span class="n">' + (i + 1) + '</span><span><b>' + w[0] + '</b>' + w[1] + '</span></li>'; }).join("") + '</ul>' +
    '</div><div class="xai-right">' +
    '<div class="ax-log" data-ax-log hidden aria-live="polite"></div>' +
    '<div class="xai-label">Try asking</div>' +
    '<div class="xai-chips" data-ax-starters>' + Q.map(function (q) { return '<button type="button" class="ax-chip" data-ax-ask="' + q + '">' + q + '</button>'; }).join("") + '</div>' +
    '<p class="xai-foot">Exe AI is in development and being built in public. Ask Exe AI about our project and progress: all information comes from approved sources, with links supplied.</p>' +
    '</div></div></div>' +
    '<div class="xai-dock">' +
    '<form class="xai-form ax-form" id="xaiForm" data-ax-form autocomplete="off"><label class="xai-sr" for="xaiIn">Ask Exe AI</label>' +
    '<input id="xaiIn" data-ax-input type="text" placeholder="Ask us anything…" maxlength="300" enterkeyhint="send">' +
    '<button type="submit" class="xai-send ax-send" aria-label="Send">' + send + '</button></form>' +
    '<p class="ax-status" data-ax-status hidden></p>' +
    '</div></div>';

  document.body.appendChild(fab);
  document.body.appendChild(scrim);
  document.body.classList.add("has-xai");

  var input = scrim.querySelector("#xaiIn"), lastFocus = null;
  var panel = scrim.querySelector(".xai"), form = scrim.querySelector("#xaiForm");
  var touch = !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
  var statusEl = scrim.querySelector("[data-ax-status]");

  // Ask Exe loads once, when the panel first opens. A question asked before loading finishes is kept and asked then.
  var mounting = null, mounted = false, pending = "";
  function mountAsk() {
    if (mounting) return mounting;
    if (!document.querySelector('link[data-ax-css]')) {
      var l = document.createElement("link"); l.rel = "stylesheet"; l.href = ASK_CSS; l.setAttribute("data-ax-css", "");
      document.head.appendChild(l);
    }
    mounting = import(ASK_JS).then(function (m) { return m.mountAskExe(panel, { url: false, scroll: "start" }); }).then(function (api) {
      mounted = true; form.removeAttribute("aria-busy");
      if (pending) { var q = pending; pending = ""; api.ask(q); }
      return api;
    }).catch(function (err) {
      console.warn("Exe AI panel: Ask Exe could not load", err);
      mounting = null; pending = ""; form.removeAttribute("aria-busy");
      statusEl.innerHTML = 'Answers could not load. Check your connection and try again, or open the <a href="ask.html">full Exe AI page</a>.';
      statusEl.hidden = false;
    });
    return mounting;
  }
  function askEarly(q) {
    q = (q || "").trim();
    if (!q) return;
    pending = q; input.value = ""; statusEl.hidden = true; form.setAttribute("aria-busy", "true");
    mountAsk();
  }

  // Phones: when the on-screen keyboard opens, the visible area shrinks but the page does not. Fit the panel to the
  // visible area, so the header stays at the top and the question box sits just above the keyboard.
  var vv = window.visualViewport;
  function fit() {
    if (!vv || scrim.hidden) return;
    if (Math.abs(vv.scale - 1) > 0.01) { scrim.style.top = scrim.style.height = scrim.style.bottom = ""; return; } // pinch-zoomed: leave alone
    scrim.style.top = vv.offsetTop + "px"; scrim.style.height = vv.height + "px"; scrim.style.bottom = "auto";
  }
  if (vv) { vv.addEventListener("resize", fit); vv.addEventListener("scroll", fit); }

  function open() {
    lastFocus = document.activeElement;
    scrim.hidden = false;
    fit();
    document.body.classList.add("xai-lock");
    requestAnimationFrame(function () { scrim.classList.add("open"); });
    // On touch screens, focusing the question box would open the keyboard over the panel; focus the panel instead.
    setTimeout(function () { (touch ? panel : input).focus({ preventScroll: true }); }, 30);
    mountAsk();
  }
  function close() {
    scrim.classList.remove("open");
    document.body.classList.remove("xai-lock");
    scrim.hidden = true;
    scrim.style.top = scrim.style.height = scrim.style.bottom = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  fab.addEventListener("click", open);
  if (pill) pill.addEventListener("click", open);
  document.querySelectorAll("[data-xai-open]").forEach(function (el) { el.addEventListener("click", open); });
  scrim.querySelector("#xaiClose").addEventListener("click", close);
  scrim.addEventListener("click", function (e) { if (e.target === scrim) close(); });
  // Once Ask Exe is mounted it handles the form and the question chips itself; these cover the moment before.
  form.addEventListener("submit", function (e) { e.preventDefault(); if (!mounted) askEarly(input.value); });
  panel.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-ax-ask]");
    if (b && !mounted) askEarly(b.getAttribute("data-ax-ask"));
  });
  document.addEventListener("keydown", function (e) {
    if (scrim.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key === "Tab") {
      var f = scrim.querySelectorAll("button, input, a[href]");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
