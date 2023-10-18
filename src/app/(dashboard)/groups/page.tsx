import { draftMode } from 'next/headers'
import { LiveQuery } from 'next-sanity/preview/live-query'
import Groups, { query } from './_components/groups'
import { sanityFetch } from '@/sanity/lib/fetch'
import { MainShell } from '@/components/main-shell'
import PreviewGroups from './_components/preview-groups'

export default async function GroupsPage() {
  const data = await sanityFetch<any[]>({ query, tags: ['groups'] })

  return (
    <MainShell>
      <h1>Grupper</h1>
      <LiveQuery
        enabled={draftMode().isEnabled}
        query={query}
        initialData={data}
        as={PreviewGroups}
      >
        <Groups data={data} />
      </LiveQuery>
    </MainShell>
  )
}