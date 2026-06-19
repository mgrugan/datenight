# Noor Date Nights

A modern, animated date-night planner built for Noor. Browse curated date
ideas, restaurants and **July 2026 events** around the University of Pittsburgh
(Oakland) campus — all categorized — then drop your favorites onto a calendar.

## Stack

- **React 18** + **Vite**
- **Tailwind CSS** for styling
- **Framer Motion** for animations (staggered hero, animated tab/filter pills,
  card hover glow, spring modal, animated calendar)
- Distinctive typography: **Fraunces** (display) + **Satoshi** (UI/body) — not a
  generic system font
- Plans persist in the browser via `localStorage`

## What's inside

- **Date Ideas** — one categorized grid of everything: evergreen ideas,
  dinner spots (each with a "~$80 after tip" plan), and the full July 2026
  event lineup (each event keeps its date, time, location and official link).
  Filter by Events, Dinner, Culture, Movies, Outdoors, Active or Views.
- **Calendar** — a month view (opens on July 2026) showing everything you've
  planned, with a tap-a-day detail panel and a running list of all your date
  nights. Dated events drop straight onto the correct day.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

`vite.config.js` sets `base: "./"`, so the built `dist/` works on static hosts
(e.g. GitHub Pages).

## Project structure

```
index.html              # Vite entry + font links
src/
  main.jsx              # React entry
  App.jsx               # tabs, filtering, state, localStorage
  data.js               # all ideas, restaurants & events (edit to add more)
  icons.jsx             # inline SVG icons
  index.css             # base theme + Tailwind layers
  components/
    Hero.jsx            # animated hero
    Card.jsx            # idea / restaurant / event card
    Calendar.jsx        # month calendar + plans list
    Modal.jsx           # add-to-calendar dialog
    Toast.jsx           # confirmation toast
```

## Sources

Events and venues link out to their official pages — Phipps Conservatory,
Carnegie Museum of Art (Inside Out series), Pittsburgh Parks, Picklesburgh, the
Pittsburgh Vintage Grand Prix, Dollar Bank Cinema in the Park, BikePGH, the
Pittsburgh Cultural Trust, and each restaurant's own menu. Always double-check
dates and prices on the official page before you go — event dates can shift.
