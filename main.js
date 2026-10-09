/* ============ PROJECT WORLD - main.js ============
   Layer 1: pixel map, pins, card popups, menu, ticker.
   Everything is drawn in code, so there are no image files to manage.
   Card content lives in cards.js.
=================================================== */
(function () {
  "use strict";

  var CARDS = window.CARDS || [];
  var SITE = window.SITE || {};

  // ---------- tiny seeded random so the map looks the same every load ----------
  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---------- island colour themes (one per future world) ----------
  var THEMES = {
    hub:   { land: "#4fae5a", land2: "#3f9a4c", shore: "#e8d9a0", deep: "#1c3a7a" },
    cyber: { land: "#5b3fa8", land2: "#4a3290", shore: "#ff4fd8", deep: "#1c2160" },
    ocean: { land: "#2aa6a0", land2: "#1f8a8c", shore: "#bff5f0", deep: "#0f4a73" },
    dusk:  { land: "#b8658a", land2: "#9d5075", shore: "#ffd1a6", deep: "#1e2a6a" },
    dark:  { land: "#4b4a52", land2: "#37363e", shore: "#8f2d2d", deep: "#10162f" }
  };

  // ---------- draw the map ----------
  function drawMap() {
    var canvas = document.getElementById("map");
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;
    var rand = rng(20261008);

    // sea with dithered depth bands
    for (var y = 0; y < H; y++) {
      for (var x = 0; x < W; x++) {
        var band = (y / H) * 0.5 + (x / W) * 0.15;
        var checker = (x + y) % 2 === 0;
        var base = band < 0.28 ? "#0d1740" : band < 0.5 ? "#0f1d4d" : "#12235a";
        if (checker && rand() < 0.08) base = "#16296b";
        ctx.fillStyle = base;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    // faint grid lines (like a game map)
    ctx.fillStyle = "rgba(111,195,224,0.10)";
    for (var gx = 0; gx < W; gx += 24) ctx.fillRect(gx, 0, 1, H);
    for (var gy = 0; gy < H; gy += 18) ctx.fillRect(0, gy, W, 1);

    // islands
    CARDS.forEach(function (card, i) {
      var t = THEMES[card.theme] || THEMES.hub;
      var cx = Math.round(card.x / 100 * W);
      var cy = Math.round(card.y / 100 * H);
      var r = card.id === 1 ? 17 : 13;
      var ph1 = i * 1.7 + 0.5, ph2 = i * 2.3 + 1.1;

      for (var py = cy - r - 6; py <= cy + r + 6; py++) {
        for (var px = cx - r - 8; px <= cx + r + 8; px++) {
          if (px < 0 || py < 0 || px >= W || py >= H) continue;
          var dx = (px - cx) * 0.85, dy = (py - cy) * 1.15;
          var ang = Math.atan2(dy, dx);
          var wob = 1 + 0.22 * Math.sin(ang * 3 + ph1) + 0.12 * Math.sin(ang * 5 + ph2);
          var d = Math.sqrt(dx * dx + dy * dy) / (r * wob);
          if (d < 1.35 && d >= 1.0) {
            // shallow water ring
            if ((px + py) % 2 === 0) { ctx.fillStyle = t.deep; ctx.fillRect(px, py, 1, 1); }
          } else if (d < 1.0) {
            var c = d > 0.88 ? t.shore : ((px + py * 2) % 7 === 0 ? t.land2 : t.land);
            ctx.fillStyle = c;
            ctx.fillRect(px, py, 1, 1);
          }
        }
      }

      // little decorations per theme
      var deco = rng(100 + i);
      for (var k = 0; k < 9; k++) {
        var a = deco() * Math.PI * 2, rr = deco() * r * 0.55;
        var dx2 = Math.round(cx + Math.cos(a) * rr), dy2 = Math.round(cy + Math.sin(a) * rr * 0.8);
        if (card.theme === "hub") {            // trees
          ctx.fillStyle = "#1d6b34"; ctx.fillRect(dx2, dy2 - 2, 2, 2);
          ctx.fillStyle = "#6b4423"; ctx.fillRect(dx2, dy2, 1, 1);
        } else if (card.theme === "cyber") {   // neon towers
          ctx.fillStyle = "#2a1f5c"; ctx.fillRect(dx2, dy2 - 3, 2, 4);
          ctx.fillStyle = k % 2 ? "#22e6ff" : "#ff4fd8"; ctx.fillRect(dx2, dy2 - 3, 1, 1);
        } else if (card.theme === "ocean") {   // bubbles
          ctx.fillStyle = "#bff5f0"; ctx.fillRect(dx2, dy2, 1, 1);
        } else if (card.theme === "dark") {    // gravestones
          ctx.fillStyle = "#9a99a3"; ctx.fillRect(dx2, dy2 - 2, 2, 3);
        } else {                                // dusk houses
          ctx.fillStyle = "#ffd1a6"; ctx.fillRect(dx2, dy2 - 1, 2, 2);
          ctx.fillStyle = "#6b2d4a"; ctx.fillRect(dx2, dy2 - 2, 2, 1);
        }
      }
    });

    // little waves
    var wave = rng(7);
    ctx.fillStyle = "rgba(191,233,255,0.35)";
    for (var n = 0; n < 40; n++) {
      var wx = Math.floor(wave() * W), wy = Math.floor(wave() * H);
      ctx.fillRect(wx, wy, 3, 1);
      ctx.fillRect(wx + 1, wy + 1, 1, 1);
    }
  }

  // ---------- pin sprites (octagon badge with a star or a "?") ----------
  function drawPin(canvas, status) {
    var ctx = canvas.getContext("2d");
    var shipped = status === "shipped";
    var fill = shipped ? "#3fbf6a" : "#e0453f";
    var dark = shipped ? "#1d7a3f" : "#8e1f1b";
    var light = shipped ? "#8cf0ae" : "#ff8b85";
    var rows = [
      "..oooooooo..",
      ".oLLLLLLLLo.",
      "oLLffffffffo",
      "oLfffffffffo",
      "oLfffffffffo",
      "oLfffffffffo",
      "oLfffffffffo",
      "oLfffffffffo",
      "oLfffffffDDo",
      "oLfffffffDDo",
      ".oDDDDDDDDo.",
      "..oooooooo.."
    ];
    var map = { o: "#0a0f26", L: light, f: fill, D: dark };
    rows.forEach(function (row, y) {
      for (var x = 0; x < 12; x++) {
        var ch = row[x];
        if (ch !== ".") { ctx.fillStyle = map[ch]; ctx.fillRect(x, y, 1, 1); }
      }
    });
    // icon
    ctx.fillStyle = "#fff";
    if (shipped) {
      // star
      [[5,3],[6,3],[4,4],[5,4],[6,4],[7,4],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[4,6],[5,6],[6,6],[7,6],[4,7],[5,7],[6,7],[7,7],[3,8],[4,8],[7,8],[8,8]]
        .forEach(function (p) { ctx.fillRect(p[0], p[1], 1, 1); });
    } else {
      // question mark
      [[4,3],[5,3],[6,3],[7,3],[7,4],[7,5],[6,6],[5,6],[5,7],[5,9]]
        .forEach(function (p) { ctx.fillRect(p[0], p[1], 1, 1); });
    }
  }

  // ---------- hero sprite (original character: explorer in an orange cap) ----------
  function drawHero() {
    var canvas = document.getElementById("heroCanvas");
    var ctx = canvas.getContext("2d");
    var rows = [
      "...oooooo...",
      "..oOOOOOOo..",
      ".oOOOOOOOOo.",
      ".ooooooooooo",
      "..osssssso..",
      "..osksskso..",
      "..osssssso..",
      "...osmmso...",
      "..obbbbbbo..",
      ".obbbbbbbbo.",
      ".osbbbbbbso.",
      "..obbbbbbo..",
      "..opp..ppo..",
      "..ooo..ooo.."
    ];
    var map = {
      o: "#0a0f26", O: "#f08a24", s: "#f2c79b", k: "#0a0f26",
      m: "#c76b5a", b: "#2c6fb3", p: "#3b3f78"
    };
    rows.forEach(function (row, y) {
      for (var x = 0; x < 12; x++) {
        var ch = row[x];
        if (ch !== ".") { ctx.fillStyle = map[ch]; ctx.fillRect(x, y, 1, 1); }
      }
    });
  }

  // ---------- pins ----------
  var lastFocus = null;

  function buildPins() {
    var host = document.getElementById("pins");
    CARDS.forEach(function (card) {
      var btn = document.createElement("button");
      btn.className = "pin";
      btn.type = "button";
      btn.style.left = card.x + "%";
      btn.style.top = card.y + "%";
      btn.setAttribute("aria-label", card.name + ": " + card.title + " (" + (card.status === "shipped" ? "shipped" : "idea") + ")");
      var c = document.createElement("canvas");
      c.width = 12; c.height = 12;
      drawPin(c, card.status);
      btn.appendChild(c);
      var tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = "ARTIFACT " + card.id;
      btn.appendChild(tag);
      btn.addEventListener("click", function () { openCard(card, btn); });
      host.appendChild(btn);
    });
  }

  // ---------- card popup ----------
  var overlay, card, aboutOverlay, aboutCard;

  function openCard(data, opener) {
    lastFocus = opener || document.activeElement;
    document.getElementById("cardKicker").textContent = data.name.toUpperCase();
    document.getElementById("cardTitle").textContent = data.title;

    var st = document.getElementById("cardStatus");
    var shipped = data.status === "shipped";
    st.textContent = shipped ? "SHIPPED" : "IDEA - NOT BUILT YET";
    st.className = "status " + (shipped ? "shipped" : "rumored");

    var body = document.getElementById("cardBody");
    body.textContent = shipped ? (data.reflection || "Reflection coming soon.") : (data.idea || "Idea coming soon.");

    var link = document.getElementById("cardLink");
    if (shipped && data.link) {
      link.hidden = false;
      link.href = data.link;
      link.target = data.link === "./" ? "_self" : "_blank";
    } else {
      link.hidden = true;
    }
    overlay.hidden = false;
    card.focus();
  }

  function closeCard() {
    overlay.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function openAbout(opener) {
    lastFocus = opener || document.activeElement;
    document.getElementById("aboutTitle").textContent = SITE.name || "About";
    document.getElementById("aboutTag").textContent = SITE.tagline || "";
    document.getElementById("aboutTag").className = "status plain";
    var body = document.getElementById("aboutBody");
    body.textContent = "";
    (SITE.about || []).forEach(function (t) {
      var p = document.createElement("p");
      p.textContent = t;
      body.appendChild(p);
    });
    var row = document.getElementById("aboutLinks");
    row.textContent = "";
    (SITE.links || []).forEach(function (l) {
      var a = document.createElement("a");
      a.href = l.url; a.target = "_blank"; a.rel = "noopener";
      a.textContent = l.label;
      row.appendChild(a);
    });
    aboutOverlay.hidden = false;
    aboutCard.focus();
  }

  function closeAbout() {
    aboutOverlay.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // ---------- drawer menu ----------
  function buildDrawer() {
    var list = document.getElementById("drawerList");

    function item(content) {
      var li = document.createElement("li");
      li.appendChild(content);
      list.appendChild(li);
    }

    var about = document.createElement("button");
    about.type = "button";
    about.textContent = "ABOUT ME";
    about.addEventListener("click", function () { setDrawer(false); openAbout(about); });
    item(about);

    var head = document.createElement("li");
    head.style.cssText = "padding:16px 4px 6px;font-size:8px;color:#8aa4d6;";
    head.textContent = "QUEST LOG";
    list.appendChild(head);

    CARDS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      var dot = document.createElement("span");
      dot.className = "dot " + c.status;
      b.appendChild(dot);
      b.appendChild(document.createTextNode("ARTIFACT " + c.id));
      b.addEventListener("click", function () { setDrawer(false); openCard(c, b); });
      item(b);
    });

    SITE.links && SITE.links.forEach(function (l) {
      var a = document.createElement("a");
      a.href = l.url; a.target = "_blank"; a.rel = "noopener";
      a.textContent = l.label;
      item(a);
    });
  }

  function setDrawer(open) {
    var d = document.getElementById("drawer");
    var b = document.getElementById("menuBtn");
    d.classList.toggle("open", open);
    d.setAttribute("aria-hidden", open ? "false" : "true");
    b.setAttribute("aria-expanded", open ? "true" : "false");
    b.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    // keep hidden drawer links out of the tab order
    var els = d.querySelectorAll("button, a");
    for (var i = 0; i < els.length; i++) els[i].tabIndex = open ? 0 : -1;
  }

  // ---------- ticker ----------
  function buildTicker() {
    var shipped = CARDS.filter(function (c) { return c.status === "shipped"; }).length;
    var parts = [
      "WELCOME TO PROJECT WORLD",
      shipped + " OF " + CARDS.length + " ARTIFACTS SHIPPED",
      "NEW ISLANDS UNLOCK AS I BUILD",
      "TAP A PIN TO VISIT"
    ];
    CARDS.forEach(function (c) {
      if (c.status === "shipped") parts.push("ARTIFACT " + c.id + " SHIPPED: " + c.title.toUpperCase());
    });
    document.getElementById("ticker").textContent = parts.join("   ▪   ");
  }

  // ---------- hero chatter ----------
  var LINES = [
    "Welcome to Project World!",
    "Every pin is a project I built.",
    "Red pins are ideas. Green pins are shipped!",
    "More islands unlock as the quarter goes on.",
    "Psst... try the menu in the corner."
  ];
  var lineIdx = 0, bubbleTimer = null;

  function speak() {
    var b = document.getElementById("bubble");
    b.textContent = LINES[lineIdx % LINES.length];
    lineIdx++;
    b.hidden = false;
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () { b.hidden = true; }, 3200);
  }

  // ---------- keyboard: Esc and focus trapping ----------
  function trapTab(e, container) {
    if (e.key !== "Tab") return;
    var f = container.querySelectorAll("a[href]:not([hidden]), button");
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === container)) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  // ---------- init ----------
  function init() {
    overlay = document.getElementById("overlay");
    card = document.getElementById("card");
    aboutOverlay = document.getElementById("aboutOverlay");
    aboutCard = document.getElementById("aboutCard");

    if (SITE.title) document.getElementById("siteTitle").textContent = SITE.title;

    drawMap();
    drawHero();
    buildPins();
    buildDrawer();
    setDrawer(false);
    buildTicker();

    document.getElementById("closeCard").addEventListener("click", closeCard);
    document.getElementById("closeAbout").addEventListener("click", closeAbout);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeCard(); });
    aboutOverlay.addEventListener("click", function (e) { if (e.target === aboutOverlay) closeAbout(); });

    document.getElementById("menuBtn").addEventListener("click", function () {
      setDrawer(!document.getElementById("drawer").classList.contains("open"));
    });
    document.getElementById("aboutBtn").addEventListener("click", function (e) { openAbout(e.currentTarget); });

    var hero = document.getElementById("hero");
    hero.addEventListener("click", speak);
    hero.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); speak(); } });
    setTimeout(speak, 900);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (!overlay.hidden) closeCard();
        else if (!aboutOverlay.hidden) closeAbout();
        else if (document.getElementById("drawer").classList.contains("open")) setDrawer(false);
      }
      if (!overlay.hidden) trapTab(e, card);
      if (!aboutOverlay.hidden) trapTab(e, aboutCard);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
