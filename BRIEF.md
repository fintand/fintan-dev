# fintan.dev rebuild — project brief

*Output of the /grill-me session, 2026-07-03.*

## Why

The current site is outdated and no longer represents Fintan professionally. This is a
presentation refresh, not a feature project. Nothing on the current site is worth
preserving structurally — clean slate, no redirects needed.

## Stack (decided, eyes open)

- **TanStack Start** — acknowledged overkill for a static personal site; chosen
  deliberately as a learning vehicle. Use static prerendering for all v1 pages so the
  overkill costs nothing at runtime.
- **Tailwind v4** for styling.
- **Vercel** for hosting and deploys.
- TypeScript, new git repo in this directory.

## v1 scope (everything else is scope creep)

1. **Home/about** — who Fintan is, what he does.
2. **Selected work** — project showcase. Constraint: best work is mostly
   private/proprietary, so this is prose descriptions ("what I built and why it
   mattered"), not a grid of GitHub links. Depth over breadth.
3. **Contact/links** — GitHub, email, CV. No dedicated contact page needed.

**Explicitly out of v1:** blog (routing/nav must leave room for a future `/posts`,
but zero MDX/content tooling now), analytics, comments, anything dynamic.

## Design

**Ultra-minimal text** aesthetic — type, spacing, links; reads like a well-set
document. No design phase: design in the browser, starting from:

```
fintan.dev

Fintan —
Software engineer.

I build ______ and care about ______.
Currently at ______.

Selected work
  · Project one — one-line hook
  · Project two — one-line hook
  · Project three — one-line hook

github · email · cv
```

This aesthetic conveniently suits the private-work constraint: prose-first, no
screenshot grids to fill.

## Copy (the real risk)

Nothing is written. Copy is drafted as part of this project, from three sources:

1. Scrape the current fintan.dev for salvageable text as a draft base.
2. A CV/resume file Fintan will drop into the project.
3. Interviewing Fintan to fill gaps (same Q&A format as the grilling).

Copy drafting runs in parallel with the build, not after it — it is the likelier
blocker.

## Shipping

**Deadline struck (grilling session 2026-07-04).** This is a hobby project; the fixed
2026-07-17 date is officially dead. The surviving commitment: **cutover happens soon,
decoupled from any new feature work** — v1 is finished and deployed, so the DNS/MX
check and cutover proceed on their own (no ceremony, next week or so), and `/now`
ships to the live domain whenever it's ready. Do not couple new features to launch.

Pre-cutover checklist:
- [x] Home/about with real copy — drafted in `COPY.md` (2026-07-03)
- [x] Selected work write-ups chosen and drafted — design system + Core Web Vitals
- [x] Contact links live (github/email/cv)
- [x] `/cv` page rendering `content/cv.md` (phone number stripped from web copy; verified absent in deployed HTML)
- [x] Meta tags + favicon (dedicated OG image still open — low priority)
- [x] Deployed on Vercel — live at https://fintan-dev.vercel.app (project `fintan-dev`, both pages statically prerendered)
- [x] Confirm DNS/domain control for fintan.dev — no MX records on the zone, email was never tangled with it (2026-07-04)
- [x] DNS cutover: fintan.dev live on Vercel, apex 308s to www.fintan.dev (2026-07-04)

## v1.1 — `/now` page with Strava stats

*Output of the /grill-me session, 2026-07-04. First post-launch feature; does not
block cutover.*

**What it is.** A real now-page at `/now` (nownownow.com style): hand-written
"currently" prose (work, projects, reading, training) plus two auto-updating lines —
**YTD ride km and YTD run km** from Strava. Linked from the home footer. A page that
is only two numbers was considered and rejected as too thin.

**Freshness contract.** Daily is fine. The site stays 100% static — numbers are baked
into the prerendered HTML at build time.

**Pipeline (decided).**
1. Push this repo to **GitHub, public** (nothing in it isn't already on the site;
   phone already stripped from CV). Connect it to the Vercel project for
   push-to-deploy — this closes the existing open item.
2. One-time setup: create a Strava API app, run the one-time OAuth dance with scope
   **`activity:read_all`** (plain `activity:read` silently excludes private
   activities from the totals). Store client id, client secret, and refresh token in
   **GitHub Actions secrets** — never in the repo.
3. **Daily GitHub Action**: exchange the refresh token (Strava access tokens die
   every 6h; no long-lived personal tokens exist), call the athlete-stats endpoint,
   write `content/strava.json` (ytd ride km, ytd run km, fetched-at date),
   **commit only if changed** → push triggers the Vercel rebuild.
   - Implementation caveat: Strava may rotate the refresh token on exchange; handle
     or at least detect this (the failure mode below catches it either way).
4. Builds never call Strava, so an unrelated copy tweak can't fail on a Strava outage,
   and the JSON's git history is a free record of the numbers over time.

**Failure mode (decided).** The page always renders the last committed JSON with an
"as of \<date\>" line. A failed fetch means no commit — the site is untouched, the
stale "as of" date is the user-visible signal, and the failed Action email is the
operator alert. No hiding, no broken builds.

**Anything beyond the stats-endpoint buckets is out of scope** — no charts, monthly
history, or per-activity data (that means the activities API, pagination, and owned
storage; explicitly rejected for v1.1).

**Copy.** The "currently" prose is drafted via interview into `COPY.md`, same format
as the home-page copy, in parallel with the build — copy remains the likelier blocker.

**Status (2026-07-04):** built. `/now` route, `content/strava.json`,
`scripts/fetch-strava.mjs`, and the daily `strava-sync` GitHub Action are all in the
repo; copy drafted via interview (in `COPY.md`); page prerenders and renders both the
pre-first-sync state and real numbers (verified with simulated data). Remaining: the
one-time Strava app + OAuth setup and the three Actions secrets.

## Open items

- ~~DNS/MX check, then cutover~~ — done 2026-07-04; live, no MX entanglement.
- One-time Strava setup: create the API app, OAuth dance with `activity:read_all`,
  add `STRAVA_CLIENT_ID` / `STRAVA_CLIENT_SECRET` / `STRAVA_REFRESH_TOKEN` to GitHub
  Actions secrets, then run the workflow once manually (`workflow_dispatch`).
- Canonical-host nit: `src/seo.ts` canonicals/OG URLs point at `https://fintan.dev`,
  but the apex 308-redirects to `www.fintan.dev` — either flip the Vercel redirect
  (www → apex) or change `SITE_URL` to the www host so canonicals don't redirect.
- Review/tune the copy on the live site — hero's bike/F1 clause is the first candidate to cut (fallback in `COPY.md`).
- Optional: dedicated OG image.
