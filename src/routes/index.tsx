import { Link, createFileRoute } from '@tanstack/react-router'
import { seo } from '../seo'

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: 'Fintan Dunleavy — Software Engineer, Dublin',
      description:
        'Senior Software Engineer at Shutterstock. Design systems, Core Web Vitals, and accessible UI at scale.',
      path: '/',
    }),
  component: Home,
})

const linkStyle =
  'underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-current dark:decoration-neutral-600'

function Home() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20 leading-relaxed sm:py-28">
      <header>
        <h1 className="font-semibold text-neutral-950 dark:text-neutral-50">
          Fintan Dunleavy —
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Software engineer.
        </p>
      </header>

      <p className="mt-8">
        I build fast, accessible web interfaces — and the design systems that
        keep them consistent. Senior Software Engineer at{' '}
        <a href="https://www.shutterstock.com" className={linkStyle}>
          Shutterstock
        </a>
        , working from Dublin, where I&rsquo;m usually either on a bike or
        watching Formula&nbsp;1 when I&rsquo;m not shipping UI.
      </p>

      <section id="work" className="mt-16">
        <h2 className="font-semibold text-neutral-950 dark:text-neutral-50">
          Selected work
        </h2>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Most of my work lives inside Shutterstock&rsquo;s products, so
          here&rsquo;s the shape of it rather than a list of repos.
        </p>

        <article className="mt-10">
          <h3 className="font-medium text-neutral-950 dark:text-neutral-50">
            Design system
          </h3>
          <p className="mt-2">
            I built and maintain Shutterstock&rsquo;s design system — React
            components on Base UI and Tailwind CSS, documented in Storybook.
            Dropdowns, menus, and the shared interaction patterns that product
            teams reach for by default. The point isn&rsquo;t the component
            library; it&rsquo;s that consistency stopped being something each
            team had to remember and became the path of least resistance.
          </p>
        </article>

        <article className="mt-10">
          <h3 className="font-medium text-neutral-950 dark:text-neutral-50">
            Core Web Vitals
          </h3>
          <p className="mt-2">
            I led the work that brought Core Web Vitals into the green across
            Shutterstock&rsquo;s key product surfaces. CrUX dashboards and New
            Relic told us where the real bottlenecks were — often not where we
            guessed — and the fixes ran from parallelising server-side requests
            to hydration and caching changes. Field data over lab data,
            measured before and after.
          </p>
        </article>
      </section>

      <footer className="mt-16 flex gap-5 text-neutral-500 dark:text-neutral-400">
        <a href="https://github.com/fintand" className={linkStyle}>
          github
        </a>
        <a href="mailto:fintan.dunleavy@gmail.com" className={linkStyle}>
          email
        </a>
        <Link to="/cv" className={linkStyle}>
          cv
        </Link>
      </footer>
    </main>
  )
}
