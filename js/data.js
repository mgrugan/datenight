/* ============================================================
   Noor Date Nights — date idea data
   All spots are within ~15 min drive or ~30 min bus of the
   University of Pittsburgh (Oakland) campus.
   Summer picks are tuned for June 30 – August 30, 2026.
   ============================================================ */

// Category metadata: label, soft background, accent, and a Lucide-style SVG icon.
const CATEGORIES = {
  outdoors: {
    label: "Outdoors",
    soft: "#E7F3EC",
    accent: "#2E7D55",
    icon: '<path d="M12 2 3 21h18L12 2z"/><path d="M12 9l-4 9h8l-4-9z"/>',
  },
  dinner: {
    label: "Dinner",
    soft: "#FCE7F0",
    accent: "#C0397B",
    icon: '<path d="M4 3v7a3 3 0 0 0 3 3v8M7 3v7M10 3v7M18 3c-1.7 0-3 2.7-3 6 0 2.5 1 3.5 2 4v8"/>',
  },
  culture: {
    label: "Culture",
    soft: "#EDE7FA",
    accent: "#6B3FB0",
    icon: '<path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/>',
  },
  movies: {
    label: "Movies",
    soft: "#FBF1D9",
    accent: "#9A6B00",
    icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  },
  active: {
    label: "Active",
    soft: "#E2F4F3",
    accent: "#1E7E78",
    icon: '<circle cx="12" cy="5" r="2"/><path d="M12 7v6l-3 8M12 13l3 8M7 10l5-1 5 1"/>',
  },
  views: {
    label: "Views",
    soft: "#FDEAE0",
    accent: "#C2591F",
    icon: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
  },
  events: {
    label: "Summer Event",
    soft: "#FCE2EE",
    accent: "#DB2777",
    icon: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2M9 12v4M15 12v4"/>',
  },
};

/* Each idea:
   id, title, category, blurb, where, transit, season ('all' | 'summer'),
   eventDate (optional 'YYYY-MM-DD' for dated summer events), source (url) */
const IDEAS = [
  // ---------- Walkable from campus ----------
  {
    id: "phipps",
    title: "Phipps Conservatory & Botanical Gardens",
    category: "culture",
    blurb:
      "Wander a glowing glass palace of orchids, a Victorian palm court and seasonal flower shows. Free for Noor with a Pitt ID — a classic, dreamy Oakland date.",
    where: "Schenley Park, Oakland",
    transit: "~10 min walk from campus",
    season: "all",
    source: "https://www.cozymeal.com/magazine/date-ideas-pittsburgh",
  },
  {
    id: "cathedral",
    title: "Nationality Rooms at the Cathedral of Learning",
    category: "culture",
    blurb:
      "Tour 31 hand-built rooms hidden inside Pitt's gothic skyscraper, each one a different country. Quiet, gorgeous, and right outside your door.",
    where: "Cathedral of Learning, Pitt campus",
    transit: "On campus",
    season: "all",
    source: "https://www.cozymeal.com/magazine/date-ideas-pittsburgh",
  },
  {
    id: "schenley",
    title: "Sunset stroll through Schenley Park",
    category: "outdoors",
    blurb:
      "456 acres of trails, the Panther Hollow lake and shady woods minutes from the dorms. Pack a blanket and watch the city go gold.",
    where: "Schenley Park, Oakland",
    transit: "Adjacent to campus",
    season: "all",
    source: "https://www.cozymeal.com/magazine/date-ideas-pittsburgh",
  },
  {
    id: "carnegie-museums",
    title: "Carnegie Museums of Art & Natural History",
    category: "culture",
    blurb:
      "Dinosaurs, Impressionists and the Hall of Architecture under one roof. A rainy-day-proof date you can lose a whole afternoon in.",
    where: "4400 Forbes Ave, Oakland",
    transit: "~8 min walk from campus",
    season: "all",
    source: "https://www.tripadvisor.com/Attractions-g53449-Activities-zft12169-Pittsburgh_Pennsylvania.html",
  },
  {
    id: "carnegie-library",
    title: "Cozy up at the Carnegie Library + Craig St coffee",
    category: "culture",
    blurb:
      "Pick books for each other in the grand main library, then drift onto Craig Street for espresso and people-watching.",
    where: "Main Library + S Craig St, Oakland",
    transit: "Walkable from campus",
    season: "all",
    source: "https://theculturetrip.com/north-america/usa/pennsylvania/articles/the-10-best-restaurants-in-around-oakland-pittsburgh",
  },

  // ---------- Dinner & dessert ----------
  {
    id: "lucca",
    title: "Dinner at Lucca Ristorante",
    category: "dinner",
    blurb:
      "\"Pittsburgh's best kept secret\" — fresh pasta made daily and a charming outdoor terrace for al fresco summer nights on Craig Street.",
    where: "317 S Craig St, Oakland",
    transit: "~7 min walk from campus",
    season: "all",
    source: "https://www.opentable.com/neighborhood/n/pittsburgh/oakland-restaurants",
  },
  {
    id: "spice-island",
    title: "Spice Island Tea House",
    category: "dinner",
    blurb:
      "Malaysian & Thai favorites served family-style since 1995. Order the things the chefs tell you to — it's half the fun.",
    where: "253 Atwood St, Oakland",
    transit: "~5 min walk from campus",
    season: "all",
    source: "https://leverageedu.com/learn/best-restaurants-near-university-of-pittsburgh/",
  },
  {
    id: "butterjoint",
    title: "Cocktails & French bistro at Butterjoint",
    category: "dinner",
    blurb:
      "A comfy, candle-lit bar pairing Pittsburgh comfort food with French classics and pierogies. Perfect for a milestone night.",
    where: "214 N Craig St, Oakland",
    transit: "~10 min walk from campus",
    season: "all",
    source: "https://theculturetrip.com/north-america/usa/pennsylvania/articles/the-10-best-restaurants-in-around-oakland-pittsburgh",
  },
  {
    id: "fuel-fuddle",
    title: "Burgers & happy hour at Fuel and Fuddle",
    category: "dinner",
    blurb:
      "Juicy burgers, waffle-cut fries and late-night deals a block from campus. Easy, fun, no reservations needed.",
    where: "212 Oakland Ave, Oakland",
    transit: "~5 min walk from campus",
    season: "all",
    source: "https://leverageedu.com/learn/best-restaurants-near-university-of-pittsburgh/",
  },
  {
    id: "the-porch",
    title: "The Porch at Schenley",
    category: "dinner",
    blurb:
      "Wood-fired pizza and a sunny patio looking over Schenley Plaza. Grab a seat, split a pie, watch the carousel spin.",
    where: "221 Schenley Dr, Oakland",
    transit: "On campus edge",
    season: "all",
    source: "https://www.cozymeal.com/magazine/date-ideas-pittsburgh",
  },
  {
    id: "strip-district",
    title: "Strip District morning + cannoli crawl",
    category: "dinner",
    blurb:
      "Wander the market stalls, sip coffee, and hunt down the city's best cannoli together on a lazy weekend morning.",
    where: "Penn Ave, Strip District",
    transit: "~10 min drive from campus",
    season: "all",
    source: "https://www.discovertheburgh.com/things-to-do-in-pittsburgh/",
  },

  // ---------- Movies, views & adventures (short drive / bus) ----------
  {
    id: "amc-waterfront",
    title: "Movie night at AMC Waterfront 22",
    category: "movies",
    blurb:
      "The big one you asked for — catch a new release at the Waterfront theatre, then grab dessert and browse Barnes & Noble next door.",
    where: "The Waterfront, Homestead",
    transit: "57 or 61C bus (~25 min) / ~12 min drive",
    season: "all",
    source: "https://www.pc.pitt.edu/buses-shuttles/popular-destinations",
  },
  {
    id: "mt-washington",
    title: "Sunset at Mount Washington overlook",
    category: "views",
    blurb:
      "The most romantic skyline view in America. Ride up, watch the three rivers light up, and splurge on cocktails at Altius if you're feeling fancy.",
    where: "Grandview Ave, Mt. Washington",
    transit: "~12 min drive from campus",
    season: "all",
    source: "https://www.classpop.com/magazine/date-ideas-in-pittsburgh",
  },
  {
    id: "kayak",
    title: "Kayak the three rivers",
    category: "active",
    blurb:
      "Rent a tandem kayak and paddle past the city skyline. Sunny, silly and surprisingly serene for a summer afternoon.",
    where: "Riverfront launches, Pittsburgh",
    transit: "~10–15 min drive from campus",
    season: "all",
    source: "https://www.classpop.com/magazine/date-ideas-in-pittsburgh",
  },
  {
    id: "ascend",
    title: "Bouldering at Ascend South Side",
    category: "active",
    blurb:
      "Climb the walls together (literally) at this bouldering gym with stellar city views. Great for first-timers and the competitive type.",
    where: "Ascend, South Side",
    transit: "54 bus / ~10 min drive",
    season: "all",
    source: "https://www.discovertheburgh.com/things-to-do-in-pittsburgh/",
  },
  {
    id: "carson-st",
    title: "South Side stroll + dessert on Carson St",
    category: "dinner",
    blurb:
      "Window-shop the funky storefronts of East Carson Street and split a late-night sweet. Lively, neon and full of character.",
    where: "E Carson St, South Side",
    transit: "54 bus (~20 min) from Oakland",
    season: "all",
    source: "https://www.discovertheburgh.com/things-to-do-in-pittsburgh/",
  },
  {
    id: "frick-park",
    title: "Walk the woods at Frick Park",
    category: "outdoors",
    blurb:
      "Pittsburgh's wildest city park — shady ravines and miles of trails, with the Frick mansion, cafe and gardens right beside it.",
    where: "Frick Park, Point Breeze",
    transit: "~12 min drive from campus",
    season: "all",
    source: "https://www.thefrickpittsburgh.org/Event-Summer-Fridays-at-the-Frick",
  },

  // ---------- Summer 2026 special (June 30 – Aug 30) ----------
  {
    id: "frick-fridays-jul",
    title: "Summer Fridays at the Frick",
    category: "events",
    blurb:
      "Free Friday evenings of live music, food trucks, artmaking and lawn-lounging on the Frick's beautiful grounds. A perfect easy summer date.",
    where: "The Frick Pittsburgh, Point Breeze",
    transit: "~12 min drive from campus",
    season: "summer",
    eventDate: "2026-07-24",
    source: "https://www.thefrickpittsburgh.org/Event-Summer-Fridays-at-the-Frick",
  },
  {
    id: "frick-fridays-aug",
    title: "Summer Fridays at the Frick (August)",
    category: "events",
    blurb:
      "The last Frick Friday of the summer — music, food trucks and golden-hour picnics on the lawn. Bring a blanket and stay till dark.",
    where: "The Frick Pittsburgh, Point Breeze",
    transit: "~12 min drive from campus",
    season: "summer",
    eventDate: "2026-08-28",
    source: "https://www.thefrickpittsburgh.org/Event-Summer-Fridays-at-the-Frick",
  },
  {
    id: "july4-fireworks",
    title: "Fourth of July fireworks at the Point",
    category: "events",
    blurb:
      "Pack a picnic and watch the rivers explode in color over Point State Park. The biggest, brightest date night of the summer.",
    where: "Point State Park, Downtown",
    transit: "~12 min drive / bus downtown",
    season: "summer",
    eventDate: "2026-07-04",
    source: "https://www.visitpittsburgh.com/blog/pittsburgh-summer-festivals/",
  },
  {
    id: "cinema-in-park",
    title: "Cinema in the Park (Schenley)",
    category: "events",
    blurb:
      "Free outdoor movies under the stars in Schenley Park all summer long. Blanket, popcorn, and a film a short walk from campus.",
    where: "Schenley Park, Oakland",
    transit: "Walkable from campus",
    season: "summer",
    source: "https://www.visitpittsburgh.com/blog/pittsburgh-summer-festivals/",
  },
  {
    id: "northside-music",
    title: "Northside Music Festival",
    category: "events",
    blurb:
      "A free festival sending hundreds of bands into quirky indoor and outdoor venues across the Northside. Wander, dance, discover a new favorite.",
    where: "Various venues, Northside",
    transit: "~12 min drive from campus",
    season: "summer",
    source: "https://nextpittsburgh.com/events/pittsburgh-summer-music-festivals-2026-everything-you-need-to-know/",
  },
  {
    id: "kennywood",
    title: "Kennywood amusement park day",
    category: "events",
    blurb:
      "Old-school roller coasters, funnel cake and the Potato Patch fries. A whole-day summer splurge for the thrill-seekers.",
    where: "Kennywood, West Mifflin",
    transit: "~20 min drive from campus",
    season: "summer",
    source: "https://www.discovertheburgh.com/things-to-do-in-pittsburgh/",
  },
];

// Window the summer date-picker defaults to.
const SEASON_START = "2026-06-30";
const SEASON_END = "2026-08-30";
