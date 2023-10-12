import { draftMode } from 'next/headers'
import { LiveQuery } from 'next-sanity/preview/live-query'
import Persons, { query } from './components/persons'
import PreviewPersons from './components/preview-persons'
import { sanityFetch } from '@/sanity/lib/fetch'
import { MainShell } from '@/components/main-shell'

export default async function PersonsPage() {
  const data = await sanityFetch<any[]>({ query, tags: ['persons'] })

  return (
    <MainShell>
      <h1>Personer</h1>
      <LiveQuery
        enabled={draftMode().isEnabled}
        query={query}
        initialData={data}
        as={PreviewPersons}
      >
        <Persons data={data} />
      </LiveQuery>
    </MainShell>
  )
}