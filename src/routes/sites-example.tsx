import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { seo } from '../seo'

export const Route = createFileRoute('/sites-example')({
  head: () => seo({
    title: 'Launchpad — Codex Sites example',
    description: 'A compact internal project command center.',
    path: '/sites-example',
  }),
  component: Launchpad,
})

type Project = {
  name: string
  owner: string
  status: 'On track' | 'At risk' | 'Shipped'
  progress: number
  accent: string
  due: string
}

const projects: Project[] = [
  { name: 'Mobile refresh', owner: 'Maeve', status: 'On track', progress: 72, accent: '#ff5c35', due: '18 Jul' },
  { name: 'Atlas migration', owner: 'Noah', status: 'At risk', progress: 48, accent: '#335cff', due: '24 Jul' },
  { name: 'Summer campaign', owner: 'Iris', status: 'On track', progress: 86, accent: '#18a875', due: '12 Jul' },
  { name: 'Billing cleanup', owner: 'Dan', status: 'Shipped', progress: 100, accent: '#b774ff', due: '09 Jul' },
]

function Launchpad() {
  const [filter, setFilter] = useState<'All' | Project['status']>('All')
  const [done, setDone] = useState<string[]>([])
  const [notice, setNotice] = useState(false)
  const visible = useMemo(() => projects.filter((p) => filter === 'All' || p.status === filter), [filter])

  const toggle = (task: string) => setDone((items) => items.includes(task) ? items.filter((x) => x !== task) : [...items, task])

  return (
    <main className="launchpad-shell">
      <aside className="lp-rail" aria-label="Primary navigation">
        <a className="lp-mark" href="#top" aria-label="Launchpad home">L<span>●</span></a>
        <nav>
          <a className="active" href="#overview">Overview</a>
          <a href="#projects">Projects</a>
          <a href="#tasks">My tasks</a>
        </nav>
        <div className="lp-person"><span>FD</span><div><b>Fintan</b><small>Admin</small></div></div>
      </aside>

      <section className="lp-main" id="top">
        <header className="lp-topbar">
          <p>LAUNCHPAD / <span>WEEK 28</span></p>
          <button onClick={() => { setNotice(true); window.setTimeout(() => setNotice(false), 2200) }}>+ New project</button>
        </header>

        <div className="lp-content" id="overview">
          <section className="lp-hero">
            <div><p className="eyebrow">SATURDAY, 11 JULY</p><h1>Good morning.<br />Here’s the pulse.</h1></div>
            <div className="lp-score"><strong>84</strong><span>TEAM<br />MOMENTUM</span><i>↗ 6%</i></div>
          </section>

          <section className="lp-metrics" aria-label="Weekly metrics">
            <article><span>01</span><strong>4</strong><p>Active projects</p></article>
            <article><span>02</span><strong>12</strong><p>Tasks this week</p></article>
            <article><span>03</span><strong>92%</strong><p>On-time rate</p></article>
            <article className="signal"><span>04</span><strong>1</strong><p>Needs attention</p></article>
          </section>

          <section className="lp-section" id="projects">
            <div className="lp-heading"><div><p className="eyebrow">ACTIVE WORK</p><h2>Projects in motion</h2></div><div className="lp-filters" role="group" aria-label="Filter projects by status">{(['All', 'On track', 'At risk', 'Shipped'] as const).map((x) => <button className={filter === x ? 'selected' : ''} aria-pressed={filter === x} onClick={() => setFilter(x)} key={x}>{x}</button>)}</div></div>
            <div className="lp-projects">
              {visible.map((project, index) => <article className="lp-project" key={project.name} style={{ '--accent': project.accent } as React.CSSProperties}>
                <div className="project-number">0{index + 1}</div>
                <div><span className={`status ${project.status.replace(' ', '-').toLowerCase()}`}>{project.status}</span><h3>{project.name}</h3><p>{project.owner} · Due {project.due}</p></div>
                <div className="progress"><span><i style={{ width: `${project.progress}%` }} /></span><b>{project.progress}%</b></div>
              </article>)}
            </div>
          </section>

          <section className="lp-bottom" id="tasks">
            <div className="lp-tasks"><p className="eyebrow">YOUR FOCUS</p><h2>Today’s three</h2>{['Review mobile handoff', 'Approve campaign copy', 'Prep Monday stand-up'].map((task) => <button className={done.includes(task) ? 'done' : ''} aria-pressed={done.includes(task)} onClick={() => toggle(task)} key={task}><span aria-hidden="true">{done.includes(task) ? '✓' : ''}</span>{task}<i aria-hidden="true">↗</i></button>)}</div>
            <div className="lp-note"><p className="eyebrow">CODEX NOTE</p><blockquote>“Atlas has been blocked for 3 days. The API contract is the likely dependency.”</blockquote><button onClick={() => setFilter('At risk')}>View project →</button></div>
          </section>
        </div>
      </section>
      <div role="status" aria-live="polite">{notice && <div className="lp-toast">Project draft created <span aria-hidden="true">✓</span></div>}</div>
    </main>
  )
}
