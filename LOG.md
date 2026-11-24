# Project World: Plans and Changes Log

Artifact 1 (Your Portfolio) for the AI course. Built in a web chat with Claude, front end only (HTML, CSS, JavaScript), deployed on GitHub Pages.

## What I set out to build

A portfolio that will be my main long-term site for employers and professors, not just a class hand-in. It needs five artifact cards (title, link, short reflection) that are easy to edit, and I wanted it to feel like an old video game.

## How the work started

I asked Claude to interview me one question at a time before building anything. What came out of it:

- **Audience:** professors now, potential employers later. I do not plan on grad programs.
- **Direction:** I have not picked one job type yet (front end, back end, full stack, or even low-coding roles). I would like a big company and I'd also like remote work. So the site should show range, not a single specialty.
- **Content:** only the five course artifacts for now. I will add my older projects after the class and I'm fine editing the site then.
- **Look:** inspired by the app from Spider-Man: Brand New Day (spideytracker.com). I sent screenshots. What I liked: an interactive map, chunky pixel-art frame, pixel font, badge-style pins, a slide-out menu, and a playful tone.
- **My idea:** every project lives on its own island with its own themed world (an underwater city, a creepy neighborhood, a cyberpunk city), and clicking a pin should zoom into that world with NPCs walking around and talking.

## Decisions

- **Build in layers** so something submittable exists early:
  1. Layer 1 (this version): pixel map, five pins, card popups, slide-out menu, ticker, About panel, log, deployed site.
  2. Layer 2: a reusable "scene" system. Clicking a pin zooms into a full-screen themed world, with the card shown inside it.
  3. Layer 3: build out each world, one per artifact, as I finish that artifact.
- **Original art only.** I'm borrowing the vibe and the mechanics of the Spider-Man tracker (map, pins, HUD, pixel style), not its characters, logos, or art. The hero sprite, pins, and islands are all drawn in code.
- **Custom map, not Google Maps.** A real map needs an API key and billing, which adds risk for a one-week deadline. A drawn map is simpler and looks more like a game.
- **No libraries, no build step.** Plain HTML/CSS/JS so it works on GitHub Pages as is.
- **Cards live in one file (`cards.js`)** so finishing an artifact means editing one entry.
- **Title:** "Project World" for now, until I come up with a better name.
- **Location text:** just "Washington". Contact info can come later.
- **Placeholder ideas:**
  - Artifact 2: a barcode-scanning shelf app for my game and comic collection.
  - Artifact 3: a learning improver that finds sources, explains a topic, builds a study plan, and quizzes me.
  - Artifact 4: a watch-party site for long-distance couples, for me and my partner.
  - Artifact 5: a 2D platform fighter, moved here from Artifact 3 because the course's Artifact 3 needs an AI model working inside the app, and a fighter is a big build.

## What changed along the way

- Moved the fighting game from Artifact 3 to Artifact 5 (see above).
- Replaced the idea of a real world map with a custom pixel map.
- Switched Artifact 3 from the fighter to the learning improver, which actually fits the "AI inside it" requirement.

## Abandoned

- Real Google Maps map (key and billing risk).
- Showing my existing projects on the site for now (planned for after the class).
- Contact email on the site (can add later).

## Where Claude misread or I had to correct it

- Add entries here as I notice them. (Required by the course: where did the AI misread what I wanted?)

## 2026-11-15 — Artifact 5 card and dev log

The Artifact 5 card was still the "Platform Fighter" placeholder from the original
brainstorm. Replaced it with the real build: TomeAndTile, a virtual tabletop built
with two teammates (Henry, John), my part being the monster-stat-block importer and
the video/voice module. Status moved from "rumored" to "shipped" — it's no longer just
an idea, even though the moonshot itself runs through December. Link points at the
team's GitHub repo for now, since nothing is deployed yet. Added two rounds to the
in-site dev log (`devlog.js`) covering the field map's two review passes and the two
new pieces built this round (the image-inspection pipeline, the LiveKit wrapper).

## 2026-11-16 — Extra Artifact card: OS Quest

Added card 6: OS Quest, a TCSS 422 study game I'd already been building all quarter, filed
under the course's "build another artifact" extra-credit option (+0.3 to the final grade).
Linked it to its live GitHub Pages site. Its own repo had 21 commits but no plans/changes log,
so added one there too, then enriched it with detail from a longer technical build log I added
myself. Also logged the extra-labor policy itself into this project's shared `COURSE_GUIDE.md`.
Added a matching dev-log entry (`devlog.js`).

## 2026-11-17 — Status pins, and an island-color fix

Gave every card a status pin (shipped / in-progress / rumored, color-coded) instead of
a flat shipped-or-not, and set Artifact 5 to in-progress (yellow) now that TomeAndTile
is clearly a multi-week build, not something to show as finished. Noticed in the same
pass that Artifact 6's (OS Quest) map island was reusing Artifact 3's color — gave it
its own.

## 2026-11-19 — Fixed the order of two Upkeep dev log entries

Two new Upkeep rounds (the animated-coach PR review/merge, and the mobile fixes before
it) had landed oldest-first in `devlog.js` instead of matching the rest of the log.
Swapped them back to newest-first.

## 2026-11-22 — Kept the Artifact 5 dev log current

Added the week's TomeAndTile round to `devlog.js`: the CI outage that turned out to be
an ordinary merge conflict in the shared dev log file, plus the device-handling and
track-management pull requests for the video module.

## 2026-11-24 — Dev log audit across every artifact

Asked to improve and catch up every artifact's dev log, not just this site's. Went
through each artifact's own repo (Shelf Scanner, Upkeep, CouchCrew, TomeAndTile) and
this site's own `LOG.md`/`devlog.js`, comparing each against its actual git history
instead of trusting what was on disk.

- Found Upkeep's (`artifact-3/`) local clone was just stale — hadn't been fetched since
  Nov 17, so its `LOG.md` looked like it was missing the animated-coach merge and the
  autonomous-animation-toggle round. Fetched/fast-forwarded it and confirmed both were
  already recorded on GitHub; nothing was actually lost, the local copy was just behind.
- Found a real gap: this site's `devlog.js` hadn't been updated with TomeAndTile's
  2026-11-23 round (two real bugs — a duplicate-identity reconnect loop and a "waiting
  for video" state that never showed — both caught by Henry's first live call test
  against LiveKit Cloud). Added that entry.
- Reformatted every `devlog.js` entry into the same multi-line, indented object style.
  Several recent rounds had been appended as a single unbroken line instead of matching
  the format the earlier entries use, which made the file hard to read and risky to
  diff/merge (this is also what caused the real merge conflict in the Nov 19 entry
  above).
- Caught up this file (`LOG.md`) itself, which hadn't gotten an entry since 2026-11-16
  despite several portfolio-only changes landing since then (the status-pin feature and
  the Artifact 6 island-color fix, and a dev-log ordering fix) — added them above.
- Checked artifact-2, artifact-4, and TomeAndTile's own per-person dev log
  (`docs/devlog/aalemany00.md`) the same way; all three were already current with their
  repos' actual commit history, so nothing needed changing there.

## Open items

- [ ] Rewrite the Artifact 1 reflection in my own words (it is a draft in `cards.js`).
- [ ] Put the live GitHub Pages link into the Artifact 1 card (and submit it on Canvas).
- [ ] Pick a better world name than "Project World".
- [ ] Decide which theme goes with which artifact (currently: A2 cyberpunk, A3 ocean, A4 dusk village, A5 dark/moonshot, all tentative).
- [ ] Layer 2: zoom-in scenes.
