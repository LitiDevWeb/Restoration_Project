# Fennec Restoration & Remodeling — website

Marketing and lead-generation site for **Fennec Restoration & Remodeling LLC**, a licensed Arizona
general contractor (ROC 355657) serving the Phoenix Valley and surrounding areas.

## Stack

- Next.js 15 (Pages Router) + React 18 + TypeScript
- SCSS Modules on top of shared design tokens (`src/styles/`)
- Prisma 7 (SQLite) through the `better-sqlite3` driver adapter for the crew availability calendar
- Axios for the calendar availability endpoint

## Commands

```bash
npm run dev      # local development on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (eslint .)
npx tsc --noEmit -p tsconfig.json   # type check

npm run db:migrate   # prisma migrate dev — create and apply a migration
npm run db:deploy    # prisma migrate deploy — apply pending migrations (containers)
npm run db:seed      # prisma db seed — create the admin user from .env
npm run db:studio    # prisma studio — browse the database
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

## Database

The availability calendar is backed by **SQLite** through Prisma, so there is no database server to
run. Everything lives in a single file, `data/dev.db`, addressed by `DATABASE_URL`
(`file:./data/dev.db` — since Prisma 7 the URL lives in `prisma.config.ts`, not in the schema, and
relative SQLite paths resolve from the project root) and gitignored like the rest of `data/`.

- `prisma/schema.prisma` — `Admin` (credentials for `/admin`) and `Unavailabilities` (`type` + `value`)
- `prisma.config.ts` — Prisma CLI config: schema, migrations, the seed command and `DATABASE_URL`
- `prisma/seed.ts` — creates the admin account from `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- `src/lib/prisma.ts` — the single `PrismaClient`, wrapped in the `better-sqlite3` driver adapter,
shared by the API routes and the seed script
- `src/generated/prisma` — the generated Prisma 7 client, gitignored and rebuilt by `postinstall`

Prisma has no `enum` or `Json` column type on SQLite, so both `Unavailabilities` columns are
plain `TEXT`:

- `type` — one of `DAY`, `WEEK`, `MONTH`, `FROM_TO`, `WEEK_END`
- `value` — the payload (`.day`, `.from`, `.to`) stored as a JSON string

`src/types/unavailability.ts` owns those conventions (`UnavailabilityType`, `UnavailabilityValue`,
`isUnavailabilityType`, `parseUnavailabilityValue`, `serializeUnavailabilityValue`). The API route
serialises on write and parses on read, so `/api/unavailabilities` keeps returning
`{ id, type, value: { day?, from?, to? } }`. **Never return a raw row**: if `value` leaves the API as a
string, the page's `normalize()` reads no dates and the calendar shows every day as free.

The weekend switch is a toggle, not a range: `POST` with `type: WEEK_END` creates the single sentinel
row when it is missing and clears it when it is present, answering `{ data: { removed: n } }` on the way
off. `next build` type-checks against the generated client, so run `npm run db:generate` (also wired to
`postinstall`) after pulling a schema change and before building — a client left over from the previous
PostgreSQL schema types `value` as `JsonValue`, which fails the build on `unavailabilities.map(...)`.

To change the schema, edit `prisma/schema.prisma` and run `npm run db:migrate`. Containers run
`npm run db:deploy` instead, because `migrate dev` is interactive.

## Toolchain notes

- **Keep `moduleResolution: "bundler"` in `tsconfig.json`.** Prisma 7 generates the client as
TypeScript that imports its own modules with ESM `.js` specifiers (`./internal/class.js`) pointing
at the sibling `.ts` files, and Next derives the `.js` — `.ts` extension alias for its bundler
from that setting. Under `"node"` the build fails with `Module not found: Can't resolve
'./internal/class.js'`.
- Node 22.12 or newer is what Prisma 7 asks for (`dockerfile` uses `node:22-slim`), and `better-sqlite3`
stays on 12.x, the peer range `@prisma/adapter-better-sqlite3` declares.
- `next.config.mjs` instead of `next.config.js` because `package.json` is `"type": "module"`, and `eslint`
is pinned to 8.57 because `eslint-config-next` 15 cannot find the pages directory on older 8.x
releases.
- React stays on 18: `react-modal` and `react-swipe` still call `findDOMNode`, which React 19 removed.
- `npm run lint` runs the ESLint CLI directly; `next lint` is deprecated in Next 15 and removed in Next 16.

## Environment variables

Copy `.env.example` to `.env` and fill in the values.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | SQLite file Prisma uses for the availability calendar (`file:./data/dev.db`, from the project root) |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Account created by `npm run db:seed` for `/admin` |
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
