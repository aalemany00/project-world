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

window.DEVLOG = [{date: "2026-10-18", title: "Round 12: visual bookshelf for Books & Manga", items: ["First real Layer 2 piece - moved Books & Manga off the grid everything else uses and onto something that actually looks like a shelf. Explored a few directions as design mockups first instead of guessing straight into code: a classic wood shelf with loosely leaning covers, a cartridge-rack take on the Famicom theme, a tight packed ledge, and a hybrid.", "Looked at Shelfy, a real book-tracking app, for reference and borrowed its tightly-packed, no-gap covers on a wood-plank shelf row - but skipped its decorative mixed-in photos and props since I didn't want random images between my books and manga.", "Covers now sit edge to edge on a wood-plank row, split into separate Books and Manga sections instead of one mixed shelf. Since nothing on a saved item recorded which it was, added a Book/Manga toggle when adding or editing one, defaulting from a signal Open Library actually provides for manga editions - always changeable either way.", "Added real drag-and-drop reordering: press and hold a cover to pick it up, drag it over another cover in the same section, drop it there. Built this by hand instead of using the browser's built-in drag-and-drop, which doesn't work on touchscreens at all - this only ever runs on a phone.", "Comics keeps its old series-grouped grid untouched - this new shelf is Books & Manga only, since 300+ issues of the same comic series doesn't fit a flat packed shelf the way a couple copies of a book does.", "Verified against my real collection: searched a real manga ISBN and a real book ISBN and confirmed the toggle defaulted correctly both times, dragged a book into a new position and confirmed it survived a full reload, then removed all the test entries and confirmed Comics, Figures, and Games were untouched."]},{date: "2026-10-18", title: "Round 11: duplicate warning + editing an item", items: ["With 300+ comics it's easy to scan or search the same thing twice without noticing, so added a non-blocking warning - 'You already have this in your collection' - on the confirm screen and live while typing in manual entry. It still lets you add it anyway, since sometimes a second copy is intentional.", "Added an Edit button to every item's detail screen, since before today the only options after saving something were Remove, Move, or toggling its status - no way to fix a typo in the title or swap the cover without deleting and starting over.", "Verified both against my real collection: triggered the duplicate warning on a figure I actually own, edited its notes and confirmed the change survived a full reload before reverting it, then added a real test book, confirmed the duplicate warning fired on a second search for it, and removed the test entry."]},{date: "2026-10-18", title: "Round 10: fixed the add-item sync bug", items: ["Tracked down the bug from last round where adding an item right as sync refreshes could make it vanish - turned out to be two separate bugs, not one.", "The sync code was replacing my whole local list with whatever Firestore last sent, with no regard for a change still in flight from the same session - so an add or delete that hadn't finished saving yet could get wiped out or brought back by a refresh that didn't know about it yet. Fixed by tracking in-flight changes and protecting them until their own save actually confirms.", "Testing that fix immediately showed the real reason books were vanishing: it wasn't a timing issue at all - the security rules on the shared database still only recognized the old category list and had never been updated for Books, so every single save from that category was being rejected outright, not just sometimes. Added Books to the allowed list and redeployed the rules.", "Verified for real this time: added a book, reloaded the page completely, and confirmed it was still there - meaning it actually reached the shared database, not just this one device. Deleted the test entry afterward and reloaded again to confirm the real collection was left clean."]},{date: "2026-10-18", title: "Round 9: split Books & Manga out of Comics", items: ["Realized I have a plain book collection too, so manga is moving out of Comics into a new Books & Manga category instead of staying lumped in with western comics.", "Books & Manga supports all three ways I wanted: scan the barcode (a book's barcode is its ISBN, so this reuses the same Open Library lookup as the typed ISBN search - the general UPC database resolves books badly), type the title in manually, or search by ISBN. Comics goes back to being just western comics, searched by title through ComicVine.", "Both categories keep the Have It / Want It / Read It shelves from before - that logic used to be hardcoded to comics only, now it runs off a shared list so adding Books didn't mean duplicating it.", "There's no way to tell an existing comic entry was actually manga versus a western comic (both were saved the same way before today), so old items can't be auto-sorted - added a 'Move to Books & Manga' / 'Move to Comics' button on each item so I can reassign the manga ones by hand instead.", "Found a real bug while testing, not caused by this change: adding an item right as the phone/laptop sync refreshes can make it vanish if the save hasn't finished yet. Confirmed nothing was actually lost from the real synced collection, and logged it to fix separately later."]},{date: "2026-10-18", title: "Round 8: ISBN search for Comics & Manga", items: ["Manga and graphic-novel volumes carry a real ISBN-13 barcode on the back cover, separate from the barcode path comics already skip - added a 'Search by ISBN' option next to Enter Manually for that category.", "First tried Google Books for the ISBN lookup since it's free and keyless, but its anonymous quota turned out to be exhausted globally (confirmed by hitting its API directly and getting a quota error, not something fixable on my end) - switched to Open Library instead, which is also free and keyless and built specifically for ISBN lookups.", "Verified end to end: searched a real ISBN, got back the title, real cover art, and year, added it to the collection, and confirmed it showed up correctly before removing the test entry."]},{date: "2026-10-17", title: "Round 7: comic shelves, collection search, ordering fixes", items: ["Comics & Manga now has three shelves - Have It / Want It / Read It - instead of one mixed grid, since scrolling 300+ comics in one list to check whether I already own something doesn't work.", "Added a search box over every category's grid so I can actually find something already in a large collection instead of scrolling.", "Found and fixed two real bugs while testing: ComicVine was sorting issue numbers as text (1, 10, 11, 12, 2...) instead of numerically, and separately was silently cutting off long-running series at the first 100 issues fetched (caught on a 205-issue Green Lantern run) - now paginated up to 500 issues per series.", "Centered the category tabs row and relabeled it Comics & Manga, since it looked like manga had been dropped rather than merged in."]},{date: "2026-10-17", title: "Round 6: Shelf Scanner restyle + cache fix", items: ["Replaced the dark/neon look with a retro Japanese Famicom box-art theme (cream background, Famicom-red header with a sunburst, a bold Japanese-gothic display font, thick black borders, game-cartridge-style grid tiles) - landed on it after previewing several other directions as mockups first and getting feedback on each.", "Verified movie barcode scanning actually works with a real Blu-ray UPC, which had never specifically been tested before.", "Found and fixed a real bug: the service worker was caching the app cache-first, which kept serving an old stale version of the site even after deploying updates, requiring a manual force-quit-and-reopen of the browser to see changes. Switched it to network-first, which always fetches the latest version when online."]},
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
