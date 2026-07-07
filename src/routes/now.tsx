import { Link, createFileRoute } from '@tanstack/react-router'
import activityJson from '../../content/activity.json'
import { seo } from '../seo'

// Written by the daily intervals-sync GitHub Action; null until the first run.
type ActivityStats = {
  ytdRideKm: number | null
  ytdRunKm: number | null
  asOf: string | null
}

const activity = activityJson as ActivityStats

const km = (n: number) => `${n.toLocaleString('en-IE')} km`
const asOfDate = activity.asOf
  ? new Date(activity.asOf).toLocaleDateString('en-IE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })
  : null

export const Route = createFileRoute('/now')({
  head: () =>
    seo({
      title: 'Now — Fintan Dunleavy',
      description:
        'What Fintan is doing now — work, side projects, and this year’s riding and running, updated daily from Intervals.icu.',
      path: '/now',
    }),
  component: NowPage,
})

const headingStyle = 'font-semibold text-neutral-950 dark:text-neutral-50'

function NowPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20 leading-relaxed sm:py-28">
      <nav className="mb-12 text-neutral-500 dark:text-neutral-400">
        <Link
          to="/"
          className="underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-current dark:decoration-neutral-600"
        >
          ← fintan.dev
        </Link>
      </nav>

      <header>
        <h1 className={headingStyle}>Now</h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          What I&rsquo;m up to at the moment.
        </p>
      </header>

      <section className="mt-16">
        <h2 className={headingStyle}>Work</h2>
        <p className="mt-2">
          Mostly design-system work at Shutterstock — evolving the component
          library product teams build on.
        </p>
      </section>

      <section className="mt-10">
        <h2 className={headingStyle}>Building</h2>
        <p className="mt-2">
          This site. Rebuilt with TanStack Start — deliberately more framework
          than a static page needs, as a learning exercise — including the
          daily pipeline that feeds the numbers below.
        </p>
      </section>

      <section className="mt-10">
        <h2 className={headingStyle}>Sport</h2>
        <p className="mt-2">Getting back to cycling regularly. This year so far:</p>
        {activity.ytdRideKm !== null && activity.ytdRunKm !== null ? (
          <p className="mt-2">
            {km(activity.ytdRideKm)} ridden · {km(activity.ytdRunKm)} run
            <span className="text-neutral-500 dark:text-neutral-400">
              {' '}
              — as of {asOfDate}
            </span>
          </p>
        ) : (
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Numbers arrive with the first Intervals.icu sync.
          </p>
        )}
      </section>

      <section className="mt-10">
        <h2 className={headingStyle}>Otherwise</h2>
        <p className="mt-2">
          Formula&nbsp;1, raising two kids, and reading in the time left over.
        </p>
      </section>
    </main>
  )
}
