# Kavinda Dissanayaka — Human Interface

A calm, futuristic personal portfolio built with **Next.js 16 (App Router)**, **React 19** and **TypeScript**.
No UI framework: plain CSS Modules plus design tokens, so every style is easy to find and change.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Requires Node.js 20.9 or newer.

## Edit your content

**All the text lives in one file: `src/data/profile.ts`.** Anything in `[brackets]` is a placeholder.
Replace those values and the whole site updates. You shouldn't need to touch the components for content changes.

- **Portrait:** replace `public/portrait.webp` (a square image works best).
- **Project cards & link previews:** every project in `profile.projects` becomes an equal-size card with its summary. If `href` is a real URL, a link preview (picture, title, description, domain) is fetched on the server and shown on the card. Use `"#"` or `""` for projects without a public link. Previews refresh daily.
- **Project images:** put files in `public/projects/` and set `image: "/projects/name.jpg"` on a project.
- **Timezone for the live clock:** `profile.timezone` (the year shown everywhere is the real current year).

## Project structure

```
src/
  app/
    layout.tsx        Fonts, metadata, and the no-flash atmosphere script
    page.tsx          Puts the sections together in order
    globals.css       Design tokens (the three atmospheres), base styles, shared utilities
  components/
    Header.tsx              Floating top bar; decides when the portrait button shows   (client)
    NavOrb.tsx              Portrait action button + robotic navigation panel          (client)
    LiveClock.tsx           Ticking live clock               (client)
    AtmosphereSwitch.tsx    Day / Dawn / Dusk theme switch  (client)
    Hero.tsx                Name, intro, portrait lens with orbit rings
    Marquee.tsx             Scrolling statement band
    ProfileBento.tsx        01 — Profile bento grid
    Capabilities.tsx        02 — Expanding capability list  (client)
    Trajectory.tsx          03 — Timeline
    Archive.tsx             04 — Selected work (cards + link previews)
    Contact.tsx             05 — Contact form + links       (client)
    Footer.tsx              Large name across the bottom
    icons.tsx               Inline stroke icons
  data/
    profile.ts        ← your content
```

## Portrait navigation menu

The round portrait button (top-left) is hidden while the hero portrait is on screen. Once the hero portrait scrolls away it
appears with a warning-alarm animation (hazard ring, siren pings, shake, blinking "!"). Clicking it opens the robotic menu;
Esc, an outside click, or scrolling back to the top closes it.

- **Menu items:** edit `nav` in `src/data/profile.ts`. `href: "#archive"` jumps inside the page, `https://…` opens a new tab,
  and `href: ""` shows the item as **OFFLINE** until you paste a real link (LinkedIn starts this way).
- **Button image:** replace `public/nav-portrait.png` (square, transparent corners work best).
- **Styling:** `src/components/NavOrb.module.css`.

## Atmospheres (themes)

Colors are CSS variables defined in `src/app/globals.css` under `[data-atmosphere="day" | "dawn" | "dusk"]`.
The visitor's choice is saved in `localStorage` and applied before first paint.
To add a new one, copy a block in `globals.css` and add it to `ATMOSPHERES` in `AtmosphereSwitch.tsx`.

## Contact form

Right now the form opens the visitor's email app with the message filled in (`mailto:`), so it works with no server.
To deliver messages straight to you, replace `handleSubmit` in `Contact.tsx` with a call to a Next.js route handler
(`src/app/api/contact/route.ts`) or a form service such as Formspree or Resend.

## Fonts

The fonts are self-hosted from npm, so builds need no network access:
Geist and Geist Mono (`geist` package) and Instrument Serif (`@fontsource/instrument-serif`).

## Deploy

Push to GitHub and import the repo on Vercel, or run `npm run build && npm start` on any Node host.
Set `metadataBase` in `layout.tsx` to your domain so social preview images resolve correctly.

## Accessibility & motion

Uses real buttons, labels and `aria-expanded`/`aria-pressed` states, with visible focus rings.
Animations (orbits, marquee, pulse) turn off automatically when the visitor's system asks for reduced motion.

## In-site pages (menu → YouTube / GitHub / Facebook / LinkedIn)

Every menu item opens inside the portfolio (same tab) — the portrait button stays available on every page.

| Route | What it shows |
|---|---|
| `/youtube` | Latest uploads from the channel feed. Click a video and it plays in an embedded player on the page. |
| `/github` | All public repositories from the GitHub API, with search, language filter, sort and a hide-forks switch. |
| `/facebook` | A portal page with a button to your profile (a whole profile can't be embedded), plus any **public posts/videos** you list in `socials.facebook.posts` shown right on the page. A Facebook *Page* can also show its timeline via `socials.facebook.pageUrl`. |
| `/linkedin` | A portal page with a button to your profile. LinkedIn forbids being embedded, so it opens in a new tab. |

**Accounts live in one place:** `socials` in `src/data/profile.ts` (GitHub username, YouTube handle, Facebook and LinkedIn URLs).

- **YouTube:** set `socials.youtube.channelId` (already filled in). The page lists the channel's 15 most recent public videos; if the video feed is ever unreachable it falls back to YouTube's own "all uploads" player, so videos still play.
- **GitHub:** data refreshes every 30 minutes. Anonymous requests are limited by GitHub, so for reliable results add an environment variable `GITHUB_TOKEN` (a classic token with **no scopes** is enough) — in Vercel: Project → Settings → Environment Variables.
- If either service can't be reached, the page shows a short notice with a link to the real profile instead of an error.
