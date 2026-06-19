# Noor Date Nights 💕

A cute, romantic little date-night planner built for Noor. Browse date ideas
around the University of Pittsburgh (Oakland) campus, then drop your favorites
onto a shared calendar.

## What's inside

- **Date Ideas** — a gallery of spots all within ~15 min drive or ~30 min bus
  of Pitt's campus, filterable by category (dinner, culture, outdoors, movies,
  active, views, summer events).
- **Summer 2026** — special events happening **June 30 – August 30, 2026**
  (Summer Fridays at the Frick, Fourth of July fireworks, Cinema in the Park,
  and more). Dated events drop straight onto the right day.
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

Built following the **UI/UX Pro Max** design system:

- **Style:** Claymorphism — soft, chunky, playful 3D surfaces
- **Palette:** romantic pink (`#DB2777`) + elegant gold (`#CA8A04`)
- **Fonts:** Great Vibes (display) · Quicksand (UI) · Cormorant Infant (body)

## Structure

```
index.html        # markup + layout
css/styles.css    # claymorphism theme
js/data.js        # the date-idea data (edit to add your own!)
js/app.js         # tabs, calendar, and scheduling logic
```

Want to add your own date idea? Drop a new entry into the `IDEAS` array in
`js/data.js`.

## Sources

Date spots and summer events gathered from Visit Pittsburgh, The Pitt News,
Discover the Burgh, The Frick Pittsburgh, NEXTpittsburgh, Cozymeal, and
University of Pittsburgh transit info (links live on each card's **Info**
button).
