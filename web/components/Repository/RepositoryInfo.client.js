import { Suspense } from 'react'
import { Flex, Skeleton, Tag, TagLeftIcon, TagLabel, Badge } from '@chakra-ui/react'
import useSwr from 'swr'
import { formatRelative } from 'date-fns'
import { nb } from 'date-fns/locale'
import { VscCalendar, VscIssues } from 'react-icons/vsc'
import ReactMarkdown from 'react-markdown'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function RepositoryInfo({ id, host }) {
  const { data, error } = useSwr(
    id ? `/api/${host.toLowerCase()}/${id}` : null,
    fetcher
  )

  if (error) return <div>Failed to load repository</div>
  if (!data) return <div>Loading...</div>


  return (
    <Suspense fallback={<Skeleton height='60px' />}>
      <Flex alignItems={'center'} gap={3} my={3} wrap="wrap">
        {data?.open_issues_count > 0 && (
          <Tag size={'lg'} variant={'outline'}>
            <TagLeftIcon boxSize='12px' as={VscIssues} />
            <TagLabel>Saker <Badge colorScheme={'red'}>{data.open_issues_count}</Badge></TagLabel>
          </Tag>
        )}

        {data?.last_activity_at && (
          <Tag size={'lg'} variant={'outline'}>
            <TagLeftIcon boxSize='12px' as={VscCalendar} />
            <TagLabel>Oppdatert {formatRelative(new Date(data.last_activity_at), new Date(), { locale: nb })}</TagLabel>
          </Tag>
        )}

        {data?.languages && data.languages.map((lang) => (
          <Tag size={'lg'} key={lang} variant='outline' colorScheme='blue'>
            {lang}
          </Tag>
        ))}

      </Flex>

      {data.readme && (<ReactMarkdown>{data.readme}</ReactMarkdown>)}
    </Suspense>
  )
}
