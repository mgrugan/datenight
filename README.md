
A cute, romantic little date-night planner built for Noor. Browse date ideas
around the University of Pittsburgh (Oakland) campus, then drop your favorites
onto a shared calendar.

## What's inside

- **Date Ideas** — curated evergreen ideas plus a hand-picked set of dinner
  spots (each with a "~$80 after tip" plan), filterable by category (dinner,
  culture, outdoors, active, views, movies).
- **July Events** — a chronological list of real things happening around
  Oakland and the city in **July 2026** (Cinema in the Park, the Inside Out
  series, Picklesburgh, the Vintage Grand Prix, Phipps garden evenings and
  more). Dated events drop straight onto the right day; every item links out
  to its official page.
- **Calendar** — a month view (defaults to July 2026) showing everything you've
  planned, plus a running list of all your date nights. Tap any day to see the
  plans, add notes, or remove them.

Your planned dates are saved in the browser via `localStorage`, so they stick
around between visits on the same device.

## Running it

It's a plain static site — no build step. Either open `index.html` directly, or
serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

To publish it, enable **GitHub Pages** on this repo (Settings → Pages → deploy
from branch) and it'll be live.

## Design

Built following the **UI/UX Pro Max** design system — a clean, editorial,
minimal-single-column aesthetic:

- **Style:** refined editorial — generous whitespace, hairline borders, restrained color
- **Palette:** warm ivory (`#FAF7F2`) + deep wine accent (`#8E2C48`)
- **Fonts:** Playfair Display (display) · Inter (UI / body)

## Structure

```
index.html        # markup + layout
css/styles.css    # editorial theme
js/data.js        # ideas, restaurants and events (edit to add your own!)
js/app.js         # tabs, calendar, and scheduling logic
```

Want to add your own? Drop entries into the `IDEAS`, `RESTAURANTS` or `EVENTS`
arrays in `js/data.js`.

## Sources

Events and venues link out to their official pages — Phipps Conservatory,
Carnegie Museum of Art (Inside Out series), Pittsburgh Parks, Picklesburgh, the
Pittsburgh Vintage Grand Prix, Dollar Bank Cinema in the Park, BikePGH, the
Pittsburgh Cultural Trust, and each restaurant's own menu. Always double-check
dates and prices on the official page before you go — annual event dates can
shift.
