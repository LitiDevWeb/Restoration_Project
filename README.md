# Fennec Restoration & Remodeling — website

Marketing and lead-generation site for **Fennec Restoration & Remodeling LLC**, a licensed Arizona
general contractor (ROC 355657) serving the Phoenix Valley and surrounding areas.

## Stack

- Next.js (Pages Router) + React 18 + TypeScript
- SCSS Modules on top of shared design tokens (`src/styles/`)
- Prisma (PostgreSQL) for the crew availability calendar
- Axios for the calendar availability endpoint

## Commands

```bash
npm run dev      # local development on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (next lint)
npx tsc --noEmit -p tsconfig.json   # type check
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Permanent redirect to `/home` (the canonical home URL) |
| `/contact` | Permanent redirect to `/home` (legacy URL, kept for inbound links) |
| `/home` | Conversion-focused landing page |
| `/services` | Core and specialized service catalog |
| `/work` | Filterable project gallery with before/after comparisons |
| `/about` | Company narrative, credentials and process |
| `/calendar` | Crew availability calendar (reads live unavailabilities) |
| `/sitemap.xml`, `/robots.txt` | Search engine directives |
| `/admin` | Internal booking tool (not linked publicly, disallowed in `robots.txt`) |

## Content and data

All copy, navigation, services, FAQs and NAP details live in data files — edit them there, never in
components:

- `src/data/site.ts` — company details, navigation, services, process, FAQs
- `src/data/projects.ts` — projects, photo stages (before / progress / after) and gallery stats
- `src/data/schema.ts` — JSON-LD structured data helpers

## Environment variables

Copy `.env.example` to `.env` and fill in the values.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL`, `POSTGRES_*` | Prisma connection for the availability calendar |
| `JWT_KEY` | Signing key for the `/admin` API routes |

## Editing notes

- Fonts are self-hosted: the woff2 files in `public/fonts/` are copied out of the `@fontsource/*`
  packages so only the latin subset and the four weights actually used ship to browsers. The
  `@font-face` rules live in `src/styles/fonts.scss` (imported once from `globals.scss`) and the two
  above-the-fold files are preloaded in `_document.tsx`. If you need another weight, copy its
  `latin-<weight>-normal.woff2` from the package into `public/fonts/` and add a matching `@font-face`
  block instead of importing the package in JS.

- Both `/` and `/home` resolve to the same page; `/home` is the canonical URL used in canonicals,
  the sitemap and navigation.
- There is **no estimate form**: every call to action is a `Call for estimate` button that dials
  `site.phoneHref`, paired with an email button that opens `site.emailHref`. The home hero, the interior
  page heroes, the CTA bands, the calendar side panel and the mobile sticky bar all use that pair.
  Estimates are quoted over the phone — keep the pairing when adding new CTAs.
- Because `tel:` links are handed to the operating system, a browser without a dialer — desktop machines,
in-app browsers, preview frames — just cancels the hand-off (`tel:+16022451768 (canceled)` in DevTools)
and the button looks dead. `src/helpers/dial-fallback.ts` watches the click and, when nothing took over,
copies `site.phoneDisplay` and shows it in a toast. `CtaLink` wires this up automatically for `tel:`/`sms:`
hrefs; plain `<a href={site.phoneHref}>` anchors pass `onClick={onDialClick(site.phoneHref)}`.
- Photos are portrait-heavy, so gallery cards use 4:5 frames (3:4 on mobile) and the dialog viewer uses
  4:3 (3:4 on mobile).
- Every photo carries reviewed alt text and a truthful stage label — do not relabel a `progress` photo
  as `after`.
