import * as React from "react"
import dynamic from 'next/dynamic'
// import { Milestones } from 'react-milestones-vis'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Grid, GridItem, Heading, Tag, Text } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Head from "next/head"
import Link from "next/link"
import Layout from "../../components/Layout"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const myQuery = groq`[
  ...*[_type in ['Project']] | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "label": label,
    "period": timespan.edtf,
    "description": pt::text(referredToBy[0].body),
    carriedOutBy[]->,
    "entries": [
      {
        "timestamp": $now,
        "text": "Nå",
      },
      select(defined(timespan.endOfTheEnd) => {
        "timestamp": timespan.endOfTheEnd,
        "text": "Avslutning",
      }),
      ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
        "timestamp": timespan.beginOfTheBegin,
        "text": label,
      },
      select(defined(timespan.beginOfTheBegin) => {
        "timestamp": timespan.beginOfTheBegin,
        "text": "Start",
      }),
      {
        "timestamp": "1980-01-01T00:00:00.000Z",
        "text": "Steinalderen",
      },
    ]
  },
]`;

export const getStaticProps = async ({ preview = false }) => {
  const now = new Date()
  let data = await getClient(preview).fetch(myQuery, { now: now })
  data = cleanDeep(data)

  return {
    props: {
      preview,
      data: data,
    },
  }
}

export default function Projects({ data }) {
  return (
    <Layout>
      <Container variant="wrapper">
        <Heading>
          Prosjekt {data.length ? `(${data.length})` : ''}
        </Heading>
        <Grid maxW="full" templateColumns={{ sm: '1fr', md: 'repeat(5, 1fr)' }} my="12" gap={{ sm: "3", md: "10" }}>
          {data.map(item => (
            <React.Fragment key={item.id}>
              <GridItem colSpan={{ sm: 1, md: 1 }}>
                <Heading fontSize="xl"><Link href={`/project/${item.id}`}>{item.label}</Link>{item.period ? ` (${item.period})` : ''}</Heading>
                {item.carriedOutBy && (
                  <Tag colorScheme={"orange"} mt={"2"}>{item.carriedOutBy[0].label}</Tag>
                )}
                <Text noOfLines={4}>{item.description ?? item.shortDescription}</Text>
              </GridItem>
              <GridItem colSpan={{ sm: 1, md: 4 }} mb={{ base: "10", md: '0' }}>
                <MilestonesWithoutSSR
                  pattern
                  p="0"
                  mapping={{
                    /* category: 'label', */
                    /* entries: 'entries' */
                  }}
                  data={item.entries}
                />
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>
        <Box w="100%">
        </Box>

        {/* <PortableText blocks={data.content} /> */}
      </Container>
    </Layout>
  )
}