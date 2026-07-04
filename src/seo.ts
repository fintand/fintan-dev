const SITE_URL = 'https://fintan.dev'

export function seo({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  const url = `${SITE_URL}${path}`
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'fintan.dev' },
      { name: 'twitter:card', content: 'summary' },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
