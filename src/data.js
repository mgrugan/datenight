/* ============================================================
   Noor Date Nights — data
   Date ideas, restaurants and July 2026 events around the
   University of Pittsburgh (Oakland) campus, all categorized.
   ============================================================ */

export const DEFAULT_DATE = "2026-07-01";
export const SEASON_START = "2026-06-30";
export const SEASON_END = "2026-08-30";

// Category metadata — bright accents tuned for the dark theme.
export const CATEGORIES = {
  dinner: { label: "Dinner", accent: "#ff5d8f" },
  culture: { label: "Culture", accent: "#b388ff" },
  outdoors: { label: "Outdoors", accent: "#5fe0a8" },
  movies: { label: "Movies", accent: "#ffb877" },
  active: { label: "Active", accent: "#5ad1e0" },
  views: { label: "Views", accent: "#ff8a6b" },
  event: { label: "Event", accent: "#ff7ab0" },
};

export const FILTERS = [
  { key: "all", label: "All" },
  { key: "event", label: "Events" },
  { key: "dinner", label: "Dinner" },
  { key: "culture", label: "Culture" },
  { key: "movies", label: "Movies" },
  { key: "outdoors", label: "Outdoors" },
  { key: "active", label: "Active" },
  { key: "views", label: "Views" },
];

/* Each item:
   id, category, title, blurb, where, [transit], [budget],
   [date 'YYYY-MM-DD'], [dateLabel], [time], link, linkLabel  */
export const ITEMS = [
  /* ---------- Evergreen date ideas ---------- */
  {
    id: "phipps", category: "culture",
    title: "Phipps Conservatory & Botanical Gardens",
    blurb:
      "A glowing glass palace of orchids and seasonal flower shows, free for Noor with a Pitt ID. A calm, beautiful afternoon minutes from campus.",
    where: "1 Schenley Drive, Oakland", transit: "~10 min walk from campus",
    link: "https://www.phipps.conservatory.org/exhibits-and-events/calendar", linkLabel: "Phipps calendar",
  },
  {
    id: "cathedral", category: "culture",
    title: "Nationality Rooms at the Cathedral of Learning",
    blurb:
      "Tour 31 hand-built rooms hidden inside Pitt's gothic tower, each a different country — quiet, gorgeous, and right outside your door.",
    where: "Cathedral of Learning, Pitt campus", transit: "On campus",
    link: "https://www.nationalityrooms.pitt.edu/", linkLabel: "Tour info",
  },
  {
    id: "schenley", category: "outdoors",
    title: "Sunset walk through Schenley Park",
    blurb:
      "456 acres of trails, Panther Hollow lake and shady woods next to the dorms. Bring a blanket and watch the city go gold.",
    where: "Schenley Park, Oakland", transit: "Adjacent to campus",
    link: "https://pittsburghparks.org/parks/schenley-park/", linkLabel: "Park info",
  },
  {
    id: "carnegie-museums", category: "culture",
    title: "Carnegie Museums of Art & Natural History",
    blurb:
      "Dinosaurs, Impressionists and the Hall of Architecture under one roof. A rainy-day-proof date you can lose a whole afternoon in.",
    where: "4400 Forbes Ave, Oakland", transit: "~8 min walk from campus",
    link: "https://carnegiemuseums.org/", linkLabel: "Museum info",
  },
  {
    id: "amc-waterfront", category: "movies",
    title: "Movie night at AMC Waterfront 22",
    blurb:
      "Catch a new release at the Waterfront, then grab dessert and browse the bookshop next door. An easy, classic night out.",
    where: "The Waterfront, Homestead", transit: "57 / 61C bus (~25 min) or ~12 min drive",
    link: "https://www.amctheatres.com/movie-theatres/pittsburgh/amc-waterfront-22", linkLabel: "Showtimes",
  },
  {
    id: "mt-washington", category: "views",
    title: "Sunset at the Mount Washington overlook",
    blurb:
      "The most romantic skyline view in the city. Ride the incline up, watch the three rivers light up, linger as long as you like.",
    where: "Grandview Ave, Mt. Washington", transit: "~12 min drive from campus",
    link: "https://www.visitpittsburgh.com/neighborhoods/mount-washington/", linkLabel: "Overlook info",
  },
  {
    id: "kayak", category: "active",
    title: "Kayak the three rivers",
    blurb:
      "Rent a tandem kayak and paddle past the skyline. Sunny, a little silly, and surprisingly serene on a summer afternoon.",
    where: "Riverfront launches, Pittsburgh", transit: "~10–15 min drive from campus",
    link: "https://kayakpittsburgh.org/", linkLabel: "Rentals",
  },
  {
    id: "ascend", category: "active",
    title: "Bouldering at Ascend South Side",
    blurb:
      "Climb the walls together at this bouldering gym with skyline views. Great for first-timers and the competitive type alike.",
    where: "Ascend, South Side", transit: "54 bus or ~10 min drive",
    link: "https://www.ascendclimbing.com/south-side/", linkLabel: "Gym info",
  },
  {
    id: "frick-park", category: "outdoors",
    title: "Walk the woods at Frick Park",
    blurb:
      "Pittsburgh's wildest city park — shady ravines and miles of trails, with the Frick mansion, cafe and gardens right beside it.",
    where: "Frick Park, Point Breeze", transit: "~12 min drive from campus",
    link: "https://www.thefrickpittsburgh.org/", linkLabel: "Frick info",
  },

  /* ---------- Restaurants (dinner, aiming ~$80 after tip) ---------- */
  {
    id: "girasole", category: "dinner", title: "Girasole",
    blurb:
      "Higher-end-feeling Italian — romantic and rustic without the wild pricing. Pastas run high-teens to high-20s (penne marinara $17, several around $27–28).",
    where: "Shadyside", budget: "Two pasta entrées, split a cheaper starter, skip drinks.",
    link: "https://www.girasolepgh.com/seasonal-menu", linkLabel: "Menu",
  },
  {
    id: "point-brugge", category: "dinner", title: "Point Brugge Cafe",
    blurb:
      "A cozy neighborhood bistro that feels like a real date restaurant without being too formal — Belgian-leaning, with mussels, flatbreads and a $19 mezze.",
    where: "Point Breeze", budget: "Split a starter + two lower/mid entrées, or do mussels & flatbread.",
    link: "https://www.pointbrugge.com/point-brugge-dinner-menu", linkLabel: "Menu",
  },
  {
    id: "butterjoint", category: "dinner", title: "Butterjoint",
    blurb:
      "Closest to Pitt and the most elevated of the cozy spots — North Oakland food and drinks with French-bistro leanings at 208 N. Craig St.",
    where: "North Oakland · Craig Street", budget: "Best on happy hour: $6 appetizers and $8 classic cocktails, 4–6 PM.",
    link: "https://butterjoint.com/the-menu/", linkLabel: "Menu",
  },
  {
    id: "pasha", category: "dinner", title: "Pasha Cafe & Lounge",
    blurb:
      "An elevated Mediterranean & Turkish date spot in Shadyside. Appetizers around $7.50–$8.50, salads around $14 — easy to share generously.",
    where: "Shadyside", budget: "Split hummus or grape leaves + two mains, skip alcohol.",
    link: "https://pashacafe.net/menu", linkLabel: "Menu",
  },
  {
    id: "piccolo-forno", category: "dinner", title: "Piccolo Forno",
    blurb:
      "Warm, handmade-pasta-and-pizza Italian in Lawrenceville. It's BYOB with an $8 cork fee, so you can bring wine without the restaurant markup.",
    where: "Lawrenceville", budget: "Split one app + two pastas/pizzas; BYOB only if you want wine.",
    link: "https://www.piccolo-forno.com/menu/", linkLabel: "Menu",
  },
  {
    id: "mercurios", category: "dinner", title: "Mercurio's Shadyside",
    blurb:
      "Casual-but-charming Neapolitan pizza, wine and house gelato on Walnut Street (5523 Walnut St). A relaxed, feel-good dinner.",
    where: "Shadyside", budget: "Two pizzas + gelato, or one app — easy to stay near $80.",
    link: "https://mercuriosgelatopizza.com/pittsburgh-shadyside-mercurio-s-shadyside-food-menu", linkLabel: "Menu",
  },
  {
    id: "senti", category: "dinner", title: "Senti",
    blurb:
      "A more upscale Italian wine-bar in Lawrenceville — the upper edge of the budget. Starters like meatballs ($11), arancini ($13) and apps around $20–22.",
    where: "Lawrenceville", budget: "Two modest mains or one app + lighter plates, no drinks.",
    link: "https://www.sentirestaurant.com/senti-restaurant-menus/", linkLabel: "Menu",
  },
  {
    id: "union-grill", category: "dinner", title: "Union Grill",
    blurb:
      "Less romantic but reliable and a short walk from Pitt — an old-school Oakland tradition that's a notch above fast-casual.",
    where: "Oakland · Craig Street", budget: "Two entrées + maybe an appetizer.",
    link: "https://www.uniongrilloakland.com/menus/", linkLabel: "Menu",
  },

  /* ---------- July 2026 events ---------- */
  {
    id: "phipps-wonderland", category: "culture",
    title: "Phipps Summer Flower Show: Alice's Adventures in Wonderland",
    blurb: "Not free, but reasonable and very pretty — themed flower displays and photo spots right by Pitt.",
    where: "Phipps Conservatory, 1 Schenley Drive", dateLabel: "Any day in July",
    link: "https://www.phipps.conservatory.org/exhibits-and-events/calendar", linkLabel: "Phipps calendar",
  },
  {
    id: "carnegie-international", category: "culture",
    title: "59th Carnegie International",
    blurb: "Artsy and calm, easy to pair with coffee or food in Oakland after. Student discounts may help.",
    where: "Carnegie Museum of Art, 4400 Forbes Ave", dateLabel: "Any day in July",
    link: "https://carnegiemuseums.org/events/", linkLabel: "Museum events",
  },
  {
    id: "delta", category: "event",
    title: "Delta (Inside Out series)",
    blurb: "Free outdoor music and performance right in Oakland — a great low-pressure first date.",
    where: "Carnegie Museum of Art Sculpture Court, 4400 Forbes Ave",
    date: "2026-07-02", dateLabel: "Thu, Jul 2", time: "5:00 PM",
    link: "https://carnegieart.org/series/inside-out/", linkLabel: "Inside Out series",
  },
  {
    id: "yoga-plaza", category: "active",
    title: "Yoga in Schenley Plaza",
    blurb: "A cute, active date literally across the street from Pitt.",
    where: "Schenley Plaza, 4100 Forbes Ave",
    date: "2026-07-02", dateLabel: "Thu, Jul 2", time: "6:00–7:00 PM",
    link: "https://pittsburghparks.org/events/", linkLabel: "Parks events",
  },
  {
    id: "neighborhood-flea", category: "event",
    title: "Neighborhood Flea — Schenley Plaza",
    blurb: "Browse vintage and handmade finds, grab food, and wander around Oakland.",
    where: "Schenley Plaza, 4100 Forbes Ave",
    date: "2026-07-05", dateLabel: "Sun, Jul 5", time: "11:00 AM–4:00 PM",
    link: "https://pittsburghparks.org/venue/schenley-plaza/", linkLabel: "Schenley Plaza",
  },
  {
    id: "northside-music", category: "event",
    title: "Northside Music Festival",
    blurb: "Free live music, food trucks and art vendors — a very solid summer date.",
    where: "Deutschtown / Northside",
    date: "2026-07-10", dateLabel: "Fri–Sun, Jul 10–12",
    link: "https://www.visitpittsburgh.com/blog/pittsburghs-northside-music-festival/", linkLabel: "Festival info",
  },
  {
    id: "art-summer-rhythms", category: "event",
    title: "Art and Summer Rhythms",
    blurb: "Free daytime art, music and performance in Oakland.",
    where: "Carnegie Museum of Art Sculpture Court, 4400 Forbes Ave",
    date: "2026-07-11", dateLabel: "Sat, Jul 11", time: "12:00 PM",
    link: "https://carnegieart.org/series/inside-out/", linkLabel: "Inside Out series",
  },
  {
    id: "hoppy-hour-11", category: "event",
    title: "Hoppy Hour with Rabbit Wranglers",
    blurb: "One of the cutest options — rabbits plus the Phipps flower show. Reasonably priced for what it is.",
    where: "Phipps Conservatory, 1 Schenley Drive",
    date: "2026-07-11", dateLabel: "Sat, Jul 11", time: "10:30 AM–12:00 PM",
    link: "https://www.phipps.conservatory.org/exhibits-and-events/calendar", linkLabel: "Phipps calendar",
  },
  {
    id: "walnut-car-show", category: "event",
    title: "Walnut Street Invitational Car Show",
    blurb: "A walk-around date in Shadyside with an easy dessert, coffee or dinner add-on.",
    where: "Walnut Street, Shadyside",
    date: "2026-07-13", dateLabel: "Mon, Jul 13", time: "5:00–9:00 PM",
    link: "https://pvgp.org/events/schenley-park-race-weekend/", linkLabel: "Event info",
  },
  {
    id: "tune-up", category: "event",
    title: "Tune-Up @ SouthSide Works",
    blurb: "An outdoor evening event with plenty of food options nearby.",
    where: "SouthSide Works",
    date: "2026-07-15", dateLabel: "Wed, Jul 15", time: "6:00–9:00 PM",
    link: "https://pvgp.org/events/schenley-park-race-weekend/", linkLabel: "Event info",
  },
  {
    id: "osmosis", category: "event",
    title: "Osmosis (Inside Out series)",
    blurb: "Free Oakland music and performance — easy to fold into dinner after.",
    where: "Carnegie Museum of Art Sculpture Court, 4400 Forbes Ave",
    date: "2026-07-16", dateLabel: "Thu, Jul 16", time: "5:00 PM",
    link: "https://carnegieart.org/series/inside-out/", linkLabel: "Inside Out series",
  },
  {
    id: "picklesburgh", category: "event",
    title: "Picklesburgh 2026",
    blurb: "Free admission, funny, memorable and very Pittsburgh.",
    where: "Downtown — Sister Bridges, Market Square & PPG Plaza",
    date: "2026-07-16", dateLabel: "Thu–Sun, Jul 16–19",
    link: "https://www.picklesburgh.com/", linkLabel: "Picklesburgh",
  },
  {
    id: "vintage-grand-prix", category: "event",
    title: "Pittsburgh Vintage Grand Prix Race Weekend",
    blurb: "A huge Schenley event with vintage cars, food and vendors — super convenient from Pitt.",
    where: "Schenley Park, Schenley Dr & Darlington Rd",
    date: "2026-07-18", dateLabel: "Sat–Sun, Jul 18–19", time: "9:30 AM–5:00 PM",
    link: "https://pvgp.org/events/schenley-park-race-weekend/", linkLabel: "Race weekend",
  },
  {
    id: "cinema-phoenician", category: "movies",
    title: "Cinema in the Park: The Phoenician Scheme",
    blurb: "A free outdoor movie date right next to Pitt — bring a blanket.",
    where: "Schenley Plaza",
    date: "2026-07-22", dateLabel: "Wed, Jul 22", time: "Sunset",
    link: "https://www.pittsburghpa.gov/Recreation-Events/Events/Dollar-Bank-Cinema-In-The-Park/Schenley-Plaza", linkLabel: "Cinema in the Park",
  },
  {
    id: "jazz-garden", category: "event",
    title: "Jazz in the Garden",
    blurb: "A romantic evening option — worth it if the ticket price fits your budget.",
    where: "Phipps Conservatory, 1 Schenley Drive",
    date: "2026-07-23", dateLabel: "Thu, Jul 23", time: "6:30–9:00 PM",
    link: "https://www.phipps.conservatory.org/", linkLabel: "Phipps",
  },
  {
    id: "adios-agave", category: "event",
    title: "Adiós Agave Night at Phipps",
    blurb: "An evening garden event — keep it if the ticket price is reasonable.",
    where: "Phipps Conservatory, 1 Schenley Drive",
    date: "2026-07-24", dateLabel: "Fri, Jul 24", time: "5:00–10:00 PM",
    link: "https://www.phipps.conservatory.org/", linkLabel: "Phipps",
  },
  {
    id: "yoga-garden", category: "active",
    title: "Yoga in the Garden",
    blurb: "A calm morning date, likely cheaper than the formal Phipps evening events.",
    where: "Phipps Conservatory, 1 Schenley Drive",
    date: "2026-07-25", dateLabel: "Sat, Jul 25", time: "9:00–10:00 AM",
    link: "https://www.phipps.conservatory.org/exhibits-and-events/calendar", linkLabel: "Phipps calendar",
  },
  {
    id: "hoppy-hour-25", category: "event",
    title: "Hoppy Hour with Rabbit Wranglers",
    blurb: "Another very cute Phipps-and-rabbits option if you miss the first one.",
    where: "Phipps Conservatory, 1 Schenley Drive",
    date: "2026-07-25", dateLabel: "Sat, Jul 25", time: "10:30 AM–12:00 PM",
    link: "https://www.phipps.conservatory.org/exhibits-and-events/calendar", linkLabel: "Phipps calendar",
  },
  {
    id: "mary-schenley-day", category: "event",
    title: "Mary Schenley Day / Family Day",
    blurb: "Free carousel rides, music and activities — a very easy Oakland date.",
    where: "Schenley Plaza",
    date: "2026-07-25", dateLabel: "Sat, Jul 25", time: "11:00 AM–6:00 PM",
    link: "https://pittsburghparks.org/family-days/", linkLabel: "Family days",
  },
  {
    id: "launching-peace", category: "event",
    title: "Launching Peace (Inside Out series)",
    blurb: "A free, artsy daytime date near Pitt.",
    where: "Carnegie Museum of Art Sculpture Court, 4400 Forbes Ave",
    date: "2026-07-25", dateLabel: "Sat, Jul 25", time: "12:00 PM",
    link: "https://carnegieart.org/series/inside-out/", linkLabel: "Inside Out series",
  },
  {
    id: "openstreets", category: "active",
    title: "OpenStreetsPGH",
    blurb: "Walk, bike or scooter the car-free streets, grab coffee and food, and let it feel spontaneous.",
    where: "Strip District + Lawrenceville",
    date: "2026-07-26", dateLabel: "Sun, Jul 26", time: "10:00 AM–2:00 PM",
    link: "https://bikepgh.org/2026/05/18/just-announced-openstreetspgh-returns-for-2026/", linkLabel: "OpenStreets info",
  },
  {
    id: "cinema-reelabilities", category: "movies",
    title: "Cinema in the Park: ReelAbilities Summer Shorts",
    blurb: "A free outdoor movie night with a more unique short-film format.",
    where: "Schenley Plaza",
    date: "2026-07-26", dateLabel: "Sun, Jul 26", time: "Sunset",
    link: "https://www.pittsburghpa.gov/Recreation-Events/Events/Dollar-Bank-Cinema-In-The-Park/Schenley-Plaza", linkLabel: "Cinema in the Park",
  },
  {
    id: "cinema-badlands", category: "movies",
    title: "Cinema in the Park: Badlands (1973)",
    blurb: "A classic outdoor movie date right near campus.",
    where: "Schenley Plaza",
    date: "2026-07-29", dateLabel: "Wed, Jul 29", time: "Sunset",
    link: "https://www.pittsburghpa.gov/Recreation-Events/Events/Dollar-Bank-Cinema-In-The-Park/Schenley-Plaza", linkLabel: "Cinema in the Park",
  },
  {
    id: "cusp", category: "event",
    title: "Cusp (Inside Out series)",
    blurb: "Free outdoor music and performance in Oakland.",
    where: "Carnegie Museum of Art Sculpture Court, 4400 Forbes Ave",
    date: "2026-07-30", dateLabel: "Thu, Jul 30", time: "5:00 PM",
    link: "https://carnegieart.org/series/inside-out/", linkLabel: "Inside Out series",
  },
  {
    id: "hprizm", category: "culture",
    title: "Hprizm: Sound of the City (opening)",
    blurb: "A gallery opening downtown — a quieter, artsy date-night option.",
    where: "Wood Street Galleries, Downtown",
    date: "2026-07-31", dateLabel: "Fri, Jul 31",
    link: "https://trustarts.org/calendar", linkLabel: "Trust calendar",
  },
];
