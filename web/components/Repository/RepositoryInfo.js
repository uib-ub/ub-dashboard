import { Suspense } from 'react'
import { Flex, Skeleton, StatGroup, Stat, StatLabel, StatNumber, Tag, TagLeftIcon, TagLabel, Badge, HStack } from '@chakra-ui/react'
import useSwr from 'swr'
import { formatRelative } from 'date-fns'
import { nb } from 'date-fns/locale'
import { VscIssues } from 'react-icons/vsc'

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
      <Flex alignItems={'center'} gap={3} my={3}>
        {data?.open_issues_count > 0 && (
          <Tag size={'lg'} variant={'outline'}>
            <TagLeftIcon boxSize='12px' as={VscIssues} />
            <TagLabel>Saker <Badge colorScheme={'red'}>{data.open_issues_count}</Badge></TagLabel>
          </Tag>
        )}

        {data?.last_activity_at && (
          <Tag size={'lg'} variant={'outline'}>
            <TagLeftIcon boxSize='12px' as={VscIssues} />
            <TagLabel>Oppdatert {formatRelative(new Date(data.last_activity_at), new Date(), { locale: nb })}</TagLabel>
          </Tag>
        )}

        {data?.languages && (
          <HStack spacing={3}>
            {data.languages.map((lang) => (
              <Tag size={'lg'} key={lang} variant='outline' colorScheme='blue'>
                {lang}
              </Tag>
            ))}
          </HStack>
        )}
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