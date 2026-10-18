// ============================================================
//  DEV LOG - shown in the site under MENU > DEV LOG
//  Newest entry first. Add a new object at the top of the list
//  whenever you make a round of changes.
//
//    date:      "YYYY-MM-DD"
//    title:     short name for the round
//    items:     what happened (decisions, changes, what was built)
//    misreads:  (optional) where the AI misunderstood and I corrected it
// ============================================================

window.DEVLOG = [{date: "2026-10-17", title: "Round 7: comic shelves, collection search, ordering fixes", items: ["Comics & Manga now has three shelves - Have It / Want It / Read It - instead of one mixed grid, since scrolling 300+ comics in one list to check whether I already own something doesn't work.", "Added a search box over every category's grid so I can actually find something already in a large collection instead of scrolling.", "Found and fixed two real bugs while testing: ComicVine was sorting issue numbers as text (1, 10, 11, 12, 2...) instead of numerically, and separately was silently cutting off long-running series at the first 100 issues fetched (caught on a 205-issue Green Lantern run) - now paginated up to 500 issues per series.", "Centered the category tabs row and relabeled it Comics & Manga, since it looked like manga had been dropped rather than merged in."]},{date: "2026-10-17", title: "Round 6: Shelf Scanner restyle + cache fix", items: ["Replaced the dark/neon look with a retro Japanese Famicom box-art theme (cream background, Famicom-red header with a sunburst, a bold Japanese-gothic display font, thick black borders, game-cartridge-style grid tiles) - landed on it after previewing several other directions as mockups first and getting feedback on each.", "Verified movie barcode scanning actually works with a real Blu-ray UPC, which had never specifically been tested before.", "Found and fixed a real bug: the service worker was caching the app cache-first, which kept serving an old stale version of the site even after deploying updates, requiring a manual force-quit-and-reopen of the browser to see changes. Switched it to network-first, which always fetches the latest version when online."]},{date: "2026-10-17", title: "Round 5: Artifact 2 shipped - Shelf Scanner", items: ["Built Shelf Scanner: a PWA that scans a barcode (or searches by title) and files games, figures, comics, and movies into a collection, synced between my phone and laptop via Firebase.", "Barcode scanning takes a single photo through the phone's native camera and decodes it with ZXing, instead of a live camera feed - the live-video approach hit an unfixable bug in iOS Safari where the camera preview worked but never actually detected anything.", "Lookup runs through a small Cloudflare Worker I deployed, pulling from OMDb (movies), RAWG (games), and ComicVine (comics) - UPC databases turned out to require a paid plan, so title search became the main path instead of pure barcode lookup.", "After watching how a real comic-tracking site (League of Comic Geeks) organizes a collection, I folded manga into the Comics category, grouped the comics grid by series instead of one tile per issue, and added Have It / Want It / Read It status instead of a single add action.", "Deployed to GitHub Pages and tested live on my phone; fixed a few real bugs that only showed up there (a sync timing bug, barcode photos needing to be zoomed way in, and a button row overflowing on a narrow screen).", "Still to do: my own reflection on this artifact, and more Layer 2 polish (the comic-box interaction, the visual bookshelf) later."]},
  {
    date: "2026-10-09",
    title: "Round 4: new character sprite and green background",
    items: [
      "Replaced the guide with the exact sprite image I supplied (cut out of its blue background): big spiky hair, brown glasses, a navy tee, brown shorts, and gray sneakers. He still blinks and looks around; his eyes are redrawn on top of the picture.",
      "Changed the page background to the same dark green as the title plate.",
      "Still to do: sound effects (I will supply the audio), then the zoom-in worlds."
    ],
    misreads: [
      "The AI kept redrawing my character by hand and it never matched the picture I gave it. It only got right when I told it to use the actual image, and to show me a preview before putting it in the site."
    ]
  },
  {
    date: "2026-10-09",
    title: "Round 3: handheld look, new character, intro",
    items: [
      "Changed the colors to an old handheld console: gray shell, dark screen bezel, maroon buttons, green screen text, and a teal background. No more purple or orange.",
      "Made the game screen as wide and tall as the Spidey Tracker's, so it fills the page like theirs does.",
      "Redrew the guide from a reference sprite I picked: skinny, spiky anime hair, big eyes, glasses, and no facial hair.",
      "Gave the guide animation: he blinks and looks around.",
      "Added a boot-up intro: the guide drops in, a welcome message types out, a loading bar fills, then PRESS START.",
      "Still to do: sound effects (I will supply the audio), then the zoom-in worlds."
    ],
    misreads: [
      "The AI copied my selfie too literally and gave the character a beard and a heavier build. I wanted a skinny anime-style character with spiky hair, like the sprite I showed it.",
      "The AI picked purple and orange/gold colors I did not like. I asked for a gray handheld-console look instead."
    ]
  },
  {
    date: "2026-10-09",
    title: "Round 2: feedback after deploying",
    items: [
      "Moved the guide character to the bottom-left corner so his speech bubble stops covering the map.",
      "Redrew the guide to look like me, based on a photo: swept dark hair, tortoiseshell glasses, mustache and goatee, black tee, backpack straps.",
      "GitHub and LinkedIn now live only inside About Me, and I removed them from the menu.",
      "New color scheme (carved wood frame, plum night sky, gold buttons) so it no longer looks like the Spidey Tracker. The map water stays blue.",
      "Added this dev log to the site.",
      "Still to do: sound effects (I will supply the audio), then the zoom-in worlds."
    ],
    misreads: [
      "The AI used the ? button for an About panel. I wanted it to explain how to use the site, so it now opens a how-to panel and About Me lives in the menu."
    ]
  },
  {
    date: "2026-10-08",
    title: "Day 1: interview, plan, and Layer 1",
    items: [
      "Started by having the AI interview me one question at a time: who the site is for (professors now, employers later), what jobs I want (undecided), and what to show (only the five course artifacts for now).",
      "Picked the look: a playful, old-video-game map inspired by the Spidey Tracker app from Spider-Man: Brand New Day. I sent screenshots so the AI could see the pixel frame, pins, and slide-out menu.",
      "Chose a custom drawn map instead of Google Maps to avoid API keys and billing before the deadline.",
      "Agreed on a layered plan: Layer 1 is the map, pins, and cards; Layer 2 is zooming into a themed world per project; Layer 3 is building each world as I finish its artifact.",
      "Moved my platform fighter idea to Artifact 5, because Artifact 3 needs an AI model working inside the app. Artifact 3 became the learning improver.",
      "Built Layer 1: five islands, pins, card popups, a menu, a ticker, and an About panel. Deployed it on GitHub Pages."
    ]
  }
];
