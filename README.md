# Meetup

<img src="img/logo.svg" alt="Meetup logo" width="140">

A responsive clone of the Meetup landing page and events listing, built with plain HTML, CSS and vanilla JavaScript — no frameworks, no build step.

**Live:** https://kreal-exe.github.io/meetup/

## Pages

- `index.html` — landing page: hero, events near you, upcoming online events, top categories, popular cities, how Meetup works, friendship stories, footer
- `events_near.html` — events listing with client-side filters (category, type, distance, date), an empty state, and an embedded map

## Features

- Mobile-first responsive layout (375px phones up to 1200px+ desktops) with no horizontal overflow
- Semantic HTML with proper heading hierarchy and accessible labels on form controls
- CSS custom properties for the color palette, a single stylesheet, no preprocessor
- Event filters that work on local calendar dates, with the date options generated from the data itself

## Run locally

Any static file server works, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

The site is published with GitHub Pages from the `main` branch root. Every push to `main` redeploys automatically.
