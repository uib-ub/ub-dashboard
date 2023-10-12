import { draftMode } from 'next/headers'
import { LiveQuery } from 'next-sanity/preview/live-query'
import Projects, { query } from './components/projects'
import PreviewProjects from './components/preview-projects'
import { sanityFetch } from '@/sanity/lib/fetch'
import { MainShell } from '@/components/main-shell'

export default async function ProjectsPage() {
  const data = await sanityFetch<any[]>({ query, tags: ['projects'] })

  return (
    <MainShell>
      <h1>Prosjekt</h1>
      <LiveQuery
        enabled={draftMode().isEnabled}
        query={query}
        initialData={data}
        as={PreviewProjects}
      >
        <Projects data={data} />
      </LiveQuery>
    </MainShell>
  )
}