// ============================================================
//  PROJECT WORLD - the five artifact cards
//  This is the ONLY file you need to edit when you finish an artifact.
//
//  For each card:
//    status:     "shipped"  -> green pin (finished)
//                "rumored"  -> red pin (still just an idea)
//    title:      name of what you built
//    link:       URL to what you built ("" if there isn't one yet)
//    reflection: a few sentences on how it went and what you learned
//    idea:       brainstorm text shown while status is "rumored"
//    theme:      colour of the island (see THEMES in main.js)
//    x, y:       pin position on the map, in percent
//
//  Layer 2 (later): each card will also get a "scene" for its
//  zoomed-in world with NPCs. The "theme" key is the hook for that.
// ============================================================

window.SITE = {
  title: "PROJECT WORLD",
  name: "Adrian Alemany",
  tagline: "CS student at UW Tacoma | Java, Python | Washington",
  about: [
    "I write clean, maintainable software that solves real problems. I'm strongest in Java and Python, and I'm learning JavaScript to broaden the tools I bring to a project.",
    "I like working with teams, trading ideas, and iterating. Right now I'm sharpening my fundamentals: testing, debugging, version control, data structures and algorithms.",
    "Outside of code I collect video games and comic books. This site is my map: every artifact I build this quarter gets its own island, and eventually its own world."
  ],
  links: [
    { label: "GITHUB", url: "https://github.com/aalemany00" },
    { label: "LINKEDIN", url: "https://www.linkedin.com/in/adrian-alemany-843321277" }
  ]
};

window.CARDS = [
  {
    id: 1,
    name: "Artifact 1: Your Portfolio",
    status: "shipped",
    title: "Project World (this site)",
    link: "./",
    reflection:
      "I built this in a web chat by starting with an interview instead of a prompt, so the AI knew who the site was for before it wrote any code. I designed the map first, then built it in layers so something submittable existed early. I learned that the clearer my goals were up front, the less I had to fix later.",
    idea: "",
    theme: "hub",
    x: 24, y: 58
  },
  {
    id: 2,
    name: "Artifact 2: Something You Will Use",
    status: "shipped",
    title: "Shelf Scanner",
    link: "https://aalemany00.github.io/shelf-scanner/",
    reflection:
      "I built a PWA that scans a barcode or searches by title to catalog my games, figures, comics, and movies, synced between my phone and laptop with Firebase. The barcode scanning turned out to be the hardest part. A live camera feed looked like it should work but failed on iPhone, so I switched to snapping a single photo and decoding that instead. Looking at how a real comic-tracking site organizes its collection pushed me to add series grouping and Have/Want/Read status to the comics side, which taught me that “it runs” and “it’s actually useful” aren’t the same. I learned to verify things myself rather than assume a library or API worked just because the code looked right. Several of the real bugs only showed up once I tested on an actual phone.",
    idea:
      "Scan a barcode with my phone camera, and it pulls the item's name, info, and cover image, then files it into the right category on a visual bookshelf. Built for my video game and comic collection.",
    theme: "cyber",
    x: 47, y: 30
  },
  {
    id: 3,
    name: "Artifact 3: AI Inside It",
    status: "shipped",
    title: "Upkeep",
    link: "https://aalemany00.github.io/upkeep/",
    reflection:
      "TODO - write this yourself: a few sentences on how it went and what you learned.",
    idea:
      "A health tracker for food/calories/protein, gym workouts, water, steps, weight, and vitamins, synced across devices. Every week, Claude Code reads your logged data (headless, no API key) and writes back a short coaching note on what's working and what to try next.",
    theme: "ocean",
    x: 73, y: 62
  },
  {
    id: 4,
    name: "Artifact 4: For Someone Else",
    status: "rumored",
    title: "Watch Party for Two",
    link: "",
    reflection: "",
    idea:
      "A watch-party site for long-distance couples: play the same video in sync (YouTube, Twitch, and more), with a chat room and camera and mic so my partner and I can watch and talk in one place.",
    theme: "dusk",
    x: 60, y: 82
  },
  {
    id: 5,
    name: "Artifact 5: The Moonshot",
    status: "rumored",
    title: "Platform Fighter",
    link: "",
    reflection: "",
    idea:
      "A 2D platform fighter with about six characters, simple controls, great visuals, and gameplay that is easy to pick up and hard to put down. Possibly deployed so anyone can play.",
    theme: "dark",
    x: 84, y: 24
  }
];
