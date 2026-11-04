/* Exe AI preview overlay (in development) — shared by index.html and simulator.html.
   Every question returns the same "under development" reply, on purpose. */
(function () {
  if (document.getElementById("xaiFab")) return;
  var spark = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>';
  var send = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  var Q = [
    "What makes Exe AI different from other AI?",
    "Why is most AI built to extract value?",
    "How does Exe AI value my activity?",
    "Can Exe AI change the rules?",
    "How do I redeem the value I add?",
    "How does my XPR lower my fees?",
    "What stops bots farming the pool?",
    "How will AI agents use Exe Protocol?"
  ];
  var W = [
    ["Values what you add", "Reads your verified on-chain signal to determine your XPR. The more value your activity adds, the more of your fees you redeem, from 0–100%."],
    ["Keeps it fair", "Spots bots and wallet farms, so redemption reaches genuine users, not bad actors gaming the system."],
    ["Can’t take a bigger slice", "Exe AI can’t raise fees or change the rules. It can only grow what you redeem."],
    ["Explains itself", "Tells you clearly why your XPR is what it is—and how you can improve it."]
  ];
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

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
    '<div class="xai" role="dialog" aria-modal="true" aria-labelledby="xaiTitle">' +
    '<button type="button" class="xai-x" id="xaiClose" aria-label="Close">×</button>' +
    '<div class="xai-grid"><div class="xai-left">' +
    '<div class="xai-eyebrow">' + spark + ' Exe AI <span class="xai-badge"><i></i>In development</span></div>' +
    '<h2 class="xai-h" id="xaiTitle">Built to add, not extract</h2>' +
    '<p class="xai-lede">Exe AI is being trained on our economic model, with one primary reward function: <b>adding value for its users.</b></p>' +
    '<ul class="xai-will">' + W.map(function (w, i) { return '<li><span class="n">' + (i + 1) + '</span><span><b>' + w[0] + '</b>' + w[1] + '</span></li>'; }).join("") + '</ul>' +
    '</div><div class="xai-right">' +
    '<div class="xai-msg" id="xaiMsg" hidden aria-live="polite"></div>' +
    '<form class="xai-form" id="xaiForm" autocomplete="off"><label class="xai-sr" for="xaiIn">Ask Exe AI</label>' +
    '<input id="xaiIn" type="text" placeholder="Ask us anything…" maxlength="300">' +
    '<button type="submit" class="xai-send" aria-label="Send">' + send + '</button></form>' +
    '<div class="xai-label">Try asking</div>' +
    '<div class="xai-chips">' + Q.map(function (q) { return '<button type="button" class="xai-chip">' + q + '</button>'; }).join("") + '</div>' +
    '<p class="xai-foot">Exe AI is in development and being built in public. Answers go live stage by stage.</p>' +
    '</div></div></div>';

  document.body.appendChild(fab);
  document.body.appendChild(scrim);
  document.body.classList.add("has-xai");

  var msg = scrim.querySelector("#xaiMsg"), input = scrim.querySelector("#xaiIn"), lastFocus = null;

  function open() {
    lastFocus = document.activeElement;
    scrim.hidden = false;
    document.body.classList.add("xai-lock");
    requestAnimationFrame(function () { scrim.classList.add("open"); });
    setTimeout(function () { input.focus({ preventScroll: true }); }, 30);
  }
  function close() {
    scrim.classList.remove("open");
    document.body.classList.remove("xai-lock");
    scrim.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function ask(q) {
    q = (q || "").trim();
    if (!q) return;
    msg.innerHTML =
      '<div class="xai-me">' + esc(q) + '</div>' +
      '<div class="xai-bot"><span class="av">' + spark + '</span><div class="b"><b>Exe AI is under development.</b><br>' +
      'We’re building it in public, one stage at a time. Follow <a href="https://x.com/Exeswap" target="_blank" rel="noopener">@Exeswap</a> on X to see each stage as it goes live.</div></div>';
    msg.hidden = false;
    input.value = "";
    var box = scrim.querySelector(".xai"), r = msg.getBoundingClientRect(), br = box.getBoundingClientRect();
    if (r.top < br.top || r.bottom > br.bottom) box.scrollTop += r.top - br.top - 16;
  }

  fab.addEventListener("click", open);
  if (pill) pill.addEventListener("click", open);
  document.querySelectorAll("[data-xai-open]").forEach(function (el) { el.addEventListener("click", open); });
  scrim.querySelector("#xaiClose").addEventListener("click", close);
  scrim.addEventListener("click", function (e) { if (e.target === scrim) close(); });
  scrim.querySelector("#xaiForm").addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); });
  scrim.querySelectorAll(".xai-chip").forEach(function (b) { b.addEventListener("click", function () { ask(b.textContent); }); });
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
