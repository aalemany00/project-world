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
      "I built a health tracker that logs food, gym, water, steps, weight, and vitamins across devices, with a weekly AI coaching note. Firebase was the most confusing part — I'd barely touched it in Artifact 2, so this time I actually had to understand Auth and Firestore instead of just following steps. The AI coach was trickier: every example I found online ran its AI feedback through a paid API key, and I didn't want to build something that only worked if I kept paying for it. That mattered even more once I realized classmates and friends might use this too — giving everyone their own AI account would mean someone eventually has to pay for it. Claude actually misread me here: it assumed I wanted everyone supplying their own setup, when what I actually wanted was pure convenience — tracking health stuff is already a hassle, and I didn't want to add more friction on top of it. We landed on one script, run by me, that generates everyone's note instead.",
    idea:
      "A health tracker for food/calories/protein, gym workouts, water, steps, weight, and vitamins, synced across devices. Every week, Claude Code reads your logged data (headless, no API key) and writes back a short coaching note on what's working and what to try next.",
    theme: "ocean",
    x: 73, y: 62
  },
  {
    id: 4,
    name: "Artifact 4: For Someone Else",
    status: "shipped",
    title: "CouchCrew",
    link: "https://couch-crew.vercel.app",
    reflection:
      "I built CouchCrew with Henry and John — a watch-party site for people who can't be in the same room: synced YouTube playback, chat, mic/camera, and screen share, all in one link. The real test case is me and my long-distance partner. We split the work into three pieces (rooms/chat, video, watch-sync) and PR'd into one shared repo instead of three separate codebases, which meant actually dealing with collisions — Henry and I independently built the same server endpoint for video rooms on separate branches before either of us knew, and I had to pick one implementation (his, since it handled a race condition mine didn't) and resolve the conflict by hand. The biggest surprise was Daily.co, the video service we picked first: it advertised a free tier but still required a credit card on the account just to use it at all, which I only found out after our video calls started failing in production. Rather than hand a teammate that card risk, I switched the whole team to Jitsi Meet's public server instead, which needs no account at all — a reminder that \"free\" and \"no setup\" aren't the same claim. I also looked into syncing Netflix/Hulu directly and confirmed it's blocked by DRM, so screen-share is the fallback for anything outside YouTube. Once the core worked, I pushed the look further than the assignment needed — a retro drive-in theater shell with genre-based room themes and a few hidden interactions — because a tool I'll actually keep using with my partner should feel like somewhere, not just work.",
    idea: "",
    theme: "dusk",
    x: 60, y: 82
  },
  {
    id: 5,
    name: "Artifact 5: The Moonshot",
    status: "shipped",
    title: "TomeAndTile",
    link: "https://github.com/Henry-theBinaryBuddies/TomeAndTile",
    reflection:
      "I'm building this one with Henry and John: a virtual tabletop for running D&D sessions, with real-time video, dice, and a map/token renderer, built contracts-first so our three areas (server and rules, the web client, and my piece — importers and the video module) can't drift out of sync with each other. I own integrations and web/media/, so I had Claude build an importer field map for a monster-stat-block tool, a pipeline that inspects uploaded map and token images, and the video/voice client wrapper around LiveKit. The field map round-tripped twice: a teammate's review caught real mistakes the first time, and a merged contract change made my first round of fixes stale before it even merged. I had Claude go check what had actually landed on GitHub instead of assuming the document still held up, which is the only reason the second round was right. The image-pipeline piece is the one I'm least sure of so far — there was no Rust compiler anywhere in my setup to actually run it, so it's verified by careful reading, not by a real test run, and I said that plainly instead of pretending otherwise. Still mid-build, with milestones through December.",
    idea: "",
    theme: "dark",
    x: 84, y: 24
  },
  {
    id: 6,
    name: "Extra Artifact: Build Another Artifact",
    status: "shipped",
    title: "OS Quest",
    link: "https://aalemany00.github.io/os-quest/",
    reflection:
      "A study game for my TCSS 422 (Operating Systems) class: flashcards, quizzes, matching, and two things I actually wanted to see work — a scheduler simulator that computes FIFO/SJF/STCF/RR/MLFQ schedules for real instead of having hand-typed answers, and a step-through race-condition visualizer. I kept adding to it all quarter as new lectures landed instead of building it once and walking away, which is closer to how I actually study than any of my other artifacts. The profile system turned into its own small project — once I realized I'd use this on more than one device, I added export/import, then swapped file-based sync for a copy-paste code because the file picker was more friction than it was worth, then added an optional PIN so a shared-computer profile can't just be clicked open. The most useful bug was a dead-end: the Readings tab had no way back to the hub, which only showed up because I was actually using the thing to study, not just testing that it loaded.",
    idea: "",
    theme: "ocean",
    x: 15, y: 20
  }
];
