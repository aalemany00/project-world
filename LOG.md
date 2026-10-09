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

## Open items

- [ ] Rewrite the Artifact 1 reflection in my own words (it is a draft in `cards.js`).
- [ ] Put the live GitHub Pages link into the Artifact 1 card (and submit it on Canvas).
- [ ] Pick a better world name than "Project World".
- [ ] Decide which theme goes with which artifact (currently: A2 cyberpunk, A3 ocean, A4 dusk village, A5 dark neighborhood, all tentative).
- [ ] Layer 2: zoom-in scenes.
