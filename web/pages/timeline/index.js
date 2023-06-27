/* eslint-disable react/no-unescaped-entities */
import * as React from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Grid, GridItem, Heading, ListIcon, ListItem, OrderedList, Tag, Text, useColorMode } from '@chakra-ui/react'
import Layout from "../../components/Layout"
import { groupBy, lowerCase, orderBy, sortBy } from 'lodash-es'
import Link from '../../components/Link'
import { GrCalendar } from 'react-icons/gr'

const timelineQuery = groq`[
  ...*[_type in ['Event', 'Activity', 'Move', 'Joining', 'Leaving', 'BeginningOfExistence', 'EndOfExistence', 'Formation', 'Dissolution'] && defined(timespan) && !(_id in path("drafts.**"))] {
    "label": coalesce(label, 'Uten label'),
    "period": timespan.edtf,
    "connectedTo": {...*[references(^._id)][0]{
        "id": _id,
        "type": _type,
        label,
    }},
    "timestamp": coalesce(
      select(
        timespan.date != "" => timespan.date
      ), 
      select(
        timespan.beginOfTheBegin != "" => timespan.beginOfTheBegin
      )
    )
  },
  ...*[_type in ['Project'] && defined(timespan.endOfTheEnd)] {
      ...select(defined(timespan.endOfTheEnd) => {
        "id": _id,
        "type": _type,
        "label": label + " avsluttes",
        "period": timespan.edtf,
        "timestamp": timespan.endOfTheEnd,
      }
    )
  },
  ...*[_type in ['Project'] && defined(timespan.beginOfTheBegin)] {
      ...select(defined(timespan.beginOfTheBegin) => {
        "id": _id,
        "type": _type,
        "label": label + " starter",
        "period": timespan.edtf,
        "timestamp": timespan.beginOfTheBegin,
      }
    )
  }
]`;


export const getStaticProps = async ({ preview = false }) => {
  let timeline = await getClient(preview).fetch(timelineQuery)
  const sortedByYear = sortBy(timeline, ['timestamp'])
  const groupedByYear = groupBy(sortedByYear, function (item) {
    if (!item.timestamp) return 'Udatert'
    return item.timestamp.substring(0, 4);
  })

  return {
    props: {
      preview,
      data: groupedByYear,
    },
  }
}

export default function ActivityTimeline({ data }) {
  const { colorMode } = useColorMode()
  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"} mb="5">
          Tidslinje
        </Heading>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        {data && Object.entries(data).reverse().map(([key, value]) => (
          <section key={key}>
            <OrderedList
              borderLeft={'solid #ccc 1px'}
              listStyleType={'none'}
              display={'flex'}
              flexDirection={'column'}
              gap={4}
            >
              <ListItem
                display={'flex'}
                alignItems={'center'}
                flexWrap={'wrap'}
                bgColor={colorMode === 'light' ? '#fff' : 'rgb(26, 32, 44)'}
                borderRadius={'sm'}
                px={1}
                pt={1}
                w={'fit-content'}
                fontWeight={'bold'}
                color={'gray.500'}
                ml={'-22px'}
                transform={'translateY(8px)'}
                justifyContent={'center'}
                boxShadow={colorMode === 'light' ? '0 0 0 8px #fff' : '0 0 0 8px rgb(26, 32, 44)'}
              >
                {key}
              </ListItem>
              {value.reverse().map(e => (
                <ListItem
                  key={e.key}
                  display={'flex'}
                  gap={2}
                  alignItems={'start'}
                >
                  <ListIcon
                    as={GrCalendar}
                    bgColor={'red.400'}
                    borderRadius={'full'}
                    p={'2px'}
                    w={7}
                    h={7}
                    ml={'-14px'}
                    boxShadow={colorMode === 'light' ? '0 0 0 10px #fff' : '0 0 0 10px rgb(26, 32, 44)'}
                  />

                  <Flex direction={'column'}>
                    <Heading as={'h3'} size={'sm'} my={1}>{e.label}</Heading>
                    {e.type === 'Project' && (
                      <Tag w='fit-content'><Link href={`${lowerCase(e.type)}/${e.id}`}>Les om prosjektet</Link></Tag>
                    )}
                    {e.type !== 'Project' && (
                      <Tag w='fit-content'><Link href={`${lowerCase(e.connectedTo.type)}/${e.connectedTo.id}`}>{e.connectedTo.label}</Link></Tag>
                    )}
                    <Box color={'gray.500'}>
                      <time>{e.period}</time>
                    </Box>
                  </Flex>
                  {e.description && (<Box
                    w={'full'}
                    ml={10}
                    border={'1px solid'}
                    borderRadius={'lg'}
                    px={4}
                    borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
                  >
                    <Text>I've sent him the assignment we discussed recently, he is coming back to us this week. Regarding to our last call, I really enjoyed talking to him and so far he has the profile we are looking for. Can't wait to see his technical test, I'll keep you posted and we'll debrief it all together!😊</Text>
                  </Box>)}
                </ListItem>
              ))}
            </OrderedList>
          </section>
        ))}

      </Container>
    </Layout >
  )
}
