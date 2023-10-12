import { MainShell } from '@/components/main-shell'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { draftMode } from 'next/headers'
import Person, { query } from './_components/person'
import previewPerson from './_components/preview-person'
import { sanityFetch } from '@/lib/fetch'

export default async function PersonPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const data = await sanityFetch<any>({ query, params: { id }, tags: ['person', id] })

  return (
    <MainShell>
      <LiveQuery
        enabled={draftMode().isEnabled}
        query={query}
        initialData={data}
        as={previewPerson}
      >
        <Person data={data} />
      </LiveQuery>
    </MainShell>
  )
}