import { draftMode } from 'next/headers'
import { LiveQuery } from 'next-sanity/preview/live-query'
import Timeline, { query } from './components/timeline'
import PreviewPersons from './components/preview-timeline'
import { sanityFetch } from '@/sanity/lib/fetch'
import { MainShell } from '@/components/main-shell'

export default async function TimelinePage() {
  const data = await sanityFetch<any[]>({ query, tags: ['timeline'] })

  return (
    <MainShell>
      <h1>Tidslinje</h1>
      <LiveQuery
        enabled={draftMode().isEnabled}
        query={query}
        initialData={data}
        as={PreviewPersons}
      >
        <Timeline data={data} />
      </LiveQuery>
    </MainShell>
  )
}