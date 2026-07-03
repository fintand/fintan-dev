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

## Shipping — hard deadline

DNS cutover happens on a fixed date with whatever exists, no vibes veto.

**Proposed deadline: Friday 2026-07-17** (two weeks from kickoff). Confirm or adjust,
then it's fixed.

Pre-cutover checklist:
- [x] Home/about with real copy — drafted in `COPY.md` (2026-07-03)
- [x] Selected work write-ups chosen and drafted — design system + Core Web Vitals
- [ ] Contact links live (github/email/cv — decided in `COPY.md`)
- [ ] `/cv` page rendering `content/cv.md` (added to v1 scope 2026-07-03; phone number stripped from web copy)
- [ ] OG/meta tags + favicon
- [ ] Deployed on Vercel preview URL
- [ ] Confirm DNS/domain control for fintan.dev (check email/MX isn't tangled with it)

## Open items

- Confirm the 2026-07-17 cutover date.
- Review/tune the draft copy in `COPY.md` once it renders in the browser.
- Scaffold the TanStack Start + Tailwind v4 app.
