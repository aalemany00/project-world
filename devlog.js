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

window.DEVLOG = [
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
