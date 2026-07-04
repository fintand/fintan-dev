import { Link, createFileRoute } from '@tanstack/react-router'
import { marked } from 'marked'
import cvMarkdown from '../../content/cv.md?raw'
import { seo } from '../seo'

const cvHtml = marked.parse(cvMarkdown, { async: false })

export const Route = createFileRoute('/cv')({
  head: () =>
    seo({
      title: 'CV — Fintan Dunleavy',
      description:
        'CV of Fintan Dunleavy, Senior Software Engineer at Shutterstock, Dublin.',
      path: '/cv',
    }),
  component: CvPage,
})

function CvPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20 sm:py-28">
      <nav className="mb-12 text-neutral-500 dark:text-neutral-400">
        <Link
          to="/"
          className="underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-current dark:decoration-neutral-600"
        >
          ← fintan.dev
        </Link>
      </nav>
      <article
        className="prose prose-neutral prose-sm sm:prose-base dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: cvHtml }}
      />
    </main>
  )
}
