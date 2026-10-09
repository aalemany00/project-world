# Project World

My portfolio: an interactive pixel map where every project is its own island. Built for the AI course, Artifact 1.

Plain HTML, CSS, and JavaScript. No build step, no dependencies. The only outside request is the Press Start 2P font from Google Fonts (the site falls back to a monospace font without it).

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page structure |
| `style.css` | Pixel frame, pins, cards, menu |
| `cards.js` | **The content.** The five artifact cards and the About text |
| `main.js` | Draws the map and sprites, handles clicks, menu, and popups |
| `LOG.md` | Plans and changes log (required by the course) |

1. Create a new public repository on GitHub, for example `project-world`.
2. Upload all of these files to the repository root (keep `index.html` at the top level).
3. In the repository go to **Settings, then Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a branch", choose the `main` branch and the `/ (root)` folder, then Save.
5. After a minute or two the site is live at `https://aalemany00.github.io/project-world/`.
6. Put that link in the Artifact 1 card's `link` in `cards.js` and submit it on Canvas.

## Roadmap

- **Layer 1 (done):** map, pins, card popups, menu, ticker, About panel.
- **Layer 2:** click a pin to zoom into a full-screen themed scene with the card inside.
- **Layer 3:** build each world (NPCs walking and talking) as each artifact is finished.
