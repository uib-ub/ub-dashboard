import { Suspense } from 'react'
import { Flex, Skeleton, StatGroup, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import useSwr from 'swr'
import { formatRelative } from 'date-fns'
import { nb } from 'date-fns/locale'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function RepositoryInfo({ id, host }) {
  const { data, error } = useSwr(
    id ? `/api/${host.toLowerCase()}/${id}` : null,
    fetcher
  )

  console.log(id, host)
  if (error) return <div>Failed to load repository</div>
  if (!data) return <div>Loading...</div>

  return (
    <Suspense fallback={<Skeleton height='60px' />}>
      <Flex>
        <StatGroup>
          {data?.open_issues_count > 0 && (
            <Stat>
              <StatLabel>Åpne saker</StatLabel>
              <StatNumber>{data.open_issues_count}</StatNumber>
            </Stat>
          )}
          {data?.last_activity_at && (
            <Stat>
              <StatLabel>Sist oppdatert</StatLabel>
              <StatNumber>{formatRelative(new Date(data.last_activity_at), new Date(), { locale: nb })}</StatNumber>
            </Stat>
          )}
        </StatGroup>
      </Flex>
    </Suspense>
  )
}
/* updated: project.last_activity_at,
description: project.description,
readme_url: project.readme_url,
visibility: project.visibility,
archived: project.archived,
open_issues_count: project.open_issues_count, */