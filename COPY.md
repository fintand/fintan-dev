# fintan.dev — site copy (draft 1)

*Drafted 2026-07-03 from the June 2026 CV, the current fintan.dev, and the copy
interview. Tune in the browser; treat this as the source of truth until the site
renders it.*

---

## Home (`/`)

### Hero / positioning

> **Fintan Dunleavy —**
> Software engineer.
>
> I build fast, accessible web interfaces — and the design systems that keep them
> consistent. Senior Software Engineer at Shutterstock, working from Dublin, where
> I'm usually either on a bike or watching Formula 1 when I'm not shipping UI.

*(Personal texture woven in per the interview. If the last clause feels too cute in
situ, the fallback is ending at "…working from Dublin.")*

### Selected work

Intro line:

> Most of my work lives inside Shutterstock's products, so here's the shape of it
> rather than a list of repos.

**Design system**

> I built and maintain Shutterstock's design system — React components on Base UI
> and Tailwind CSS, documented in Storybook. Dropdowns, menus, and the shared
> interaction patterns that product teams reach for by default. The point isn't the
> component library; it's that consistency stopped being something each team had to
> remember and became the path of least resistance.

**Core Web Vitals**

> I led the work that brought Core Web Vitals into the green across Shutterstock's
> key product surfaces. CrUX dashboards and New Relic told us where the real
> bottlenecks were — often not where we guessed — and the fixes ran from
> parallelising server-side requests to hydration and caching changes. Field data
> over lab data, measured before and after.

### Footer / contact

> selected work · [github](https://github.com/fintand) ·
> [email](mailto:fintan.dunleavy@gmail.com) · [cv](/cv)

*(No LinkedIn in the footer — it lives on the CV page. Add it here if you disagree.)*

---

## CV (`/cv`)

Rendered as a styled HTML page from `content/cv.md` (copied from the June 2026 CV).
Same typographic system as the homepage — this is a second view, not a second design.

Header adds the links the print CV carries:
[LinkedIn](https://www.linkedin.com/in/fintandunleavy) ·
[fintan.dunleavy@gmail.com](mailto:fintan.dunleavy@gmail.com)

**Omit from the web version:** phone number (keep that on the PDF/print copy only —
no reason to publish it to scrapers).

---

## Now (`/now`)

*Drafted from the 2026-07-04 interview. The Sport numbers are not copy — they render
from `content/activity.json`, updated daily by the intervals-sync Action.*

> **Now**
> What I'm up to at the moment.
>
> **Work** — Mostly design-system work at Shutterstock — evolving the component
> library product teams build on.
>
> **Building** — This site. Rebuilt with TanStack Start — deliberately more framework
> than a static page needs, as a learning exercise — including the daily pipeline
> that feeds the numbers below.
>
> **Sport** — Getting back to cycling regularly. This year so far:
> *{ytd ride} km ridden · {ytd run} km run — as of {date}*
> (Pre-first-sync fallback: "Numbers arrive with the first Intervals.icu sync.")
>
> **Otherwise** — Formula 1, raising two kids, and reading in the time left over.

Interview decisions: work line names design systems, not a specific project; no
training goal implied (nothing to go stale); no book titles (same reason); linked
from the home footer as `now`.

---

## Meta

- `<title>`: `Fintan Dunleavy — Software Engineer, Dublin`
- Description: `Senior Software Engineer at Shutterstock. Design systems, Core Web
  Vitals, and accessible UI at scale.`
- OG image: plain text card, same type system. Low priority, pre-cutover checklist item.

## Deliberately left out (decided in the interview)

- WCAG remediation and AI-steering work as standalone write-ups — depth over
  breadth; both are still visible on the CV page.
- Hobbies section — folded into the hero instead.
- Any blog/posts nav — route space reserved, nothing rendered.
