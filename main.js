/* ============ PROJECT WORLD - main.js ============
   Layer 1: pixel map, pins, card popups, menu, ticker,
   how-to panel, About panel, and dev log.
   Everything is drawn in code, so there are no image files.
   Card content lives in cards.js. Dev log lives in devlog.js.
=================================================== */
(function () {
  "use strict";

  var CARDS = window.CARDS || [];
  var SITE = window.SITE || {};
  var DEVLOG = window.DEVLOG || [];

  var HELP = [
    "Click any pin on the map to open that project's card.",
    "Green pins are projects I have shipped. Red pins are ideas I have not built yet.",
    "The menu (top left) has About Me, the Quest Log to jump to any artifact, and the Dev Log.",
    "Click the little guide in the bottom-left corner for tips.",
    "On a keyboard: Tab moves between pins, Enter opens one, Esc closes anything.",
    "Coming soon: each pin will zoom into its own themed world."
  ];

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
    ctx.fillStyle = "#fff";
    if (shipped) {
      [[5,3],[6,3],[4,4],[5,4],[6,4],[7,4],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[4,6],[5,6],[6,6],[7,6],[4,7],[5,7],[6,7],[7,7],[3,8],[4,8],[7,8],[8,8]]
        .forEach(function (p) { ctx.fillRect(p[0], p[1], 1, 1); });
    } else {
      [[4,3],[5,3],[6,3],[7,3],[7,4],[7,5],[6,6],[5,6],[5,7],[5,9]]
        .forEach(function (p) { ctx.fillRect(p[0], p[1], 1, 1); });
    }
  }

  // ---------- guide sprite: a pixel version of Adrian ----------
  //  h/H hair, s/S skin, g glasses frame, e eyes, m mustache + goatee,
  //  w teeth, t shirt, b backpack strap, p jeans, k shoes, o outline
  function drawHero() {
    var canvas = document.getElementById("heroCanvas");
    var ctx = canvas.getContext("2d");
    var rows = [
      "....oooooooo....",
      "...ohhHhhhhho...",
      "..ohhhhhhhhhho..",
      "..ohhHhhhhhhho..",
      "...ohhsssshho...",
      "...ohssssssho...",
      "...oggggggggo...",
      "...ogseggesgo...",
      "...ogggssgggo...",
      "...osssSSssso...",
      "...osmmmmmmso...",
      "...osmwwwwmso...",
      "...ossmmmmsso...",
      "....osmmmmso....",
      ".ottttsssstttto.",
      ".otbtttsstttbto.",
      ".otbttttttttbto.",
      ".otbttttttttbto.",
      "..ottttttttttto.".slice(0, 16),
      "...oppppppppo...",
      "...opppooppppo..".slice(0, 16),
      "...okkkookkko..."
    ];
    var map = {
      o: "#0a0f26", h: "#3b2619", H: "#5b3a26",
      s: "#e2a57a", S: "#c98a62", g: "#6b4a2f", e: "#1a0f0a",
      m: "#2c1b12", w: "#ffffff", t: "#222638", b: "#454c70",
      p: "#2f4a85", k: "#aab0c8"
    };
    rows.forEach(function (row, y) {
      for (var x = 0; x < 16; x++) {
        var ch = row[x];
        if (ch && ch !== ".") { ctx.fillStyle = map[ch]; ctx.fillRect(x, y, 1, 1); }
      }
    });
  }

  // ---------- panels (card, about, help, dev log) ----------
  var lastFocus = null;
  var openPanel = null;

  function showPanel(overlayEl, cardEl, opener) {
    lastFocus = opener || document.activeElement;
    openPanel = { overlay: overlayEl, card: cardEl };
    overlayEl.hidden = false;
    cardEl.focus();
  }

  function hidePanel() {
    if (!openPanel) return;
    openPanel.overlay.hidden = true;
    openPanel = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function byId(id) { return document.getElementById(id); }

  function openCard(data, opener) {
    byId("cardKicker").textContent = data.name.toUpperCase();
    byId("cardTitle").textContent = data.title;

    var st = byId("cardStatus");
    var shipped = data.status === "shipped";
    st.textContent = shipped ? "SHIPPED" : "IDEA - NOT BUILT YET";
    st.className = "status " + (shipped ? "shipped" : "rumored");

    byId("cardBody").textContent = shipped
      ? (data.reflection || "Reflection coming soon.")
      : (data.idea || "Idea coming soon.");

    var link = byId("cardLink");
    if (shipped && data.link) {
      link.hidden = false;
      link.href = data.link;
      link.target = data.link === "./" ? "_self" : "_blank";
    } else {
      link.hidden = true;
    }
    showPanel(byId("overlay"), byId("card"), opener);
  }

  function openAbout(opener) {
    byId("aboutTitle").textContent = SITE.name || "About";
    var tag = byId("aboutTag");
    tag.textContent = SITE.tagline || "";
    tag.className = "status plain";

    var body = byId("aboutBody");
    body.textContent = "";
    (SITE.about || []).forEach(function (t) {
      var p = document.createElement("p");
      p.textContent = t;
      body.appendChild(p);
    });

    var row = byId("aboutLinks");
    row.textContent = "";
    (SITE.links || []).forEach(function (l) {
      var a = document.createElement("a");
      a.href = l.url; a.target = "_blank"; a.rel = "noopener";
      a.textContent = l.label;
      row.appendChild(a);
    });
    showPanel(byId("aboutOverlay"), byId("aboutCard"), opener);
  }

  function openHelp(opener) {
    var list = byId("helpBody");
    list.textContent = "";
    HELP.forEach(function (t) {
      var li = document.createElement("li");
      var span = document.createElement("span");
      span.textContent = t;
      li.appendChild(span);
      list.appendChild(li);
    });
    showPanel(byId("helpOverlay"), byId("helpCard"), opener);
  }

  function openDevlog(opener) {
    var body = byId("devlogBody");
    body.textContent = "";
    DEVLOG.forEach(function (entry) {
      var wrap = document.createElement("section");
      wrap.className = "log-entry";

      var h = document.createElement("h3");
      h.textContent = entry.date + " | " + entry.title;
      wrap.appendChild(h);

      var ul = document.createElement("ul");
      (entry.items || []).forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        ul.appendChild(li);
      });
      wrap.appendChild(ul);

      if (entry.misreads && entry.misreads.length) {
        var sub = document.createElement("p");
        sub.className = "log-sub";
        sub.textContent = "WHERE THE AI MISREAD ME";
        wrap.appendChild(sub);
        var ul2 = document.createElement("ul");
        entry.misreads.forEach(function (t) {
          var li = document.createElement("li");
          li.textContent = t;
          ul2.appendChild(li);
        });
        wrap.appendChild(ul2);
      }
      body.appendChild(wrap);
    });
    if (!DEVLOG.length) body.textContent = "No entries yet.";
    showPanel(byId("devlogOverlay"), byId("devlogCard"), opener);
  }

  // ---------- pins ----------
  function buildPins() {
    var host = byId("pins");
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

  // ---------- drawer menu (no external links: those live in About Me) ----------
  function buildDrawer() {
    var list = byId("drawerList");
    var menuBtn = byId("menuBtn");

    function item(el) {
      var li = document.createElement("li");
      li.appendChild(el);
      list.appendChild(li);
    }
    function group(text) {
      var li = document.createElement("li");
      li.className = "group";
      li.textContent = text;
      list.appendChild(li);
    }
    function button(label, onClick) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.addEventListener("click", function () { setDrawer(false); onClick(menuBtn); });
      return b;
    }

    item(button("ABOUT ME", openAbout));

    group("QUEST LOG");
    CARDS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      var dot = document.createElement("span");
      dot.className = "dot " + c.status;
      b.appendChild(dot);
      b.appendChild(document.createTextNode("ARTIFACT " + c.id));
      b.addEventListener("click", function () { setDrawer(false); openCard(c, menuBtn); });
      item(b);
    });

    group("THE SITE");
    item(button("HOW TO USE", openHelp));
    item(button("DEV LOG", openDevlog));
  }

  function setDrawer(open) {
    var d = byId("drawer");
    var b = byId("menuBtn");
    d.classList.toggle("open", open);
    d.setAttribute("aria-hidden", open ? "false" : "true");
    b.setAttribute("aria-expanded", open ? "true" : "false");
    b.setAttribute("aria-label", open ? "Close menu" : "Open menu");
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
    byId("ticker").textContent = parts.join("   ▪   ");
  }

  // ---------- guide chatter ----------
  var LINES = [
    "Welcome to Project World!",
    "Every pin is a project I built.",
    "Red pins are ideas. Green pins are shipped!",
    "More islands unlock as the quarter goes on.",
    "Open the menu to read the dev log."
  ];
  var lineIdx = 0, bubbleTimer = null;

  function speak() {
    var b = byId("bubble");
    b.textContent = LINES[lineIdx % LINES.length];
    lineIdx++;
    b.hidden = false;
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () { b.hidden = true; }, 3200);
  }

  // ---------- keyboard: focus trap ----------
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
    if (SITE.title) byId("siteTitle").textContent = SITE.title;

    drawMap();
    drawHero();
    buildPins();
    buildDrawer();
    setDrawer(false);
    buildTicker();

    ["closeCard", "closeAbout", "closeHelp", "closeDevlog"].forEach(function (id) {
      byId(id).addEventListener("click", hidePanel);
    });
    ["overlay", "aboutOverlay", "helpOverlay", "devlogOverlay"].forEach(function (id) {
      var el = byId(id);
      el.addEventListener("click", function (e) { if (e.target === el) hidePanel(); });
    });

    byId("menuBtn").addEventListener("click", function () {
      setDrawer(!byId("drawer").classList.contains("open"));
    });
    byId("helpBtn").addEventListener("click", function (e) { openHelp(e.currentTarget); });

    var hero = byId("hero");
    hero.addEventListener("click", speak);
    hero.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); speak(); }
    });
    setTimeout(speak, 900);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (openPanel) hidePanel();
        else if (byId("drawer").classList.contains("open")) setDrawer(false);
      }
      if (openPanel) trapTab(e, openPanel.card);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
