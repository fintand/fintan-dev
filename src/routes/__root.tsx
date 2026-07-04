import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Fintan Dunleavy — Software Engineer, Dublin' },
      {
        name: 'description',
        content:
          'Senior Software Engineer at Shutterstock. Design systems, Core Web Vitals, and accessible UI at scale.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

const personJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Fintan Dunleavy',
  jobTitle: 'Senior Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Shutterstock',
    url: 'https://www.shutterstock.com',
  },
  url: 'https://fintan.dev',
  sameAs: ['https://github.com/fintand'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dublin',
    addressCountry: 'IE',
  },
})

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personJsonLd }}
        />
      </head>
      <body className="bg-white text-neutral-800 antialiased dark:bg-neutral-950 dark:text-neutral-300">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
