import { Flex, Heading, Tag, VStack } from '@chakra-ui/react'
import React from 'react'
import Link from '../Link'

const ItemHeaderStatsWidget = ({ heading, data, linkBase, ...rest }) => {
  if (!data || !heading) return null

  return (
    <VStack spacing={1} align={'flex-start'}>
      <Heading fontSize={'md'} color={'gray.600'}>{heading}</Heading>
      <Flex>
        {Array.isArray(data) && data.map(item => (
          <React.Fragment key={item.id}>
            {linkBase &&
              <Link key={item.id} href={`/${linkBase}/${item.id}`}><Tag key={item.id} variant={'outline'} mr={"2"} mb="2">{item.label}</Tag></Link>
            }
            {!linkBase &&
              <Tag key={item.id} variant={'outline'} mr={"2"} mb="2">{item.label}</Tag>
            }
          </React.Fragment>
        ))}
        {!Array.isArray(data) &&
          <>
            {linkBase &&
              <Link href={`/${linkBase}/${data.id}`}>
                <span>
                  {data.label}
                </span>
              </Link>
            }
            {!linkBase &&
              <span>
                {data.label}
              </span>
            }
          </>

        }
      </Flex>
    </VStack>
  )
}

export default ItemHeaderStatsWidget
