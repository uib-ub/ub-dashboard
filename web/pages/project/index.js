import * as React from "react"
import dynamic from 'next/dynamic'
// import { Milestones } from 'react-milestones-vis'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Center, Container, Divider, Flex, Grid, GridItem, Heading, Tag, Text } from '@chakra-ui/react'
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
    timespan,
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
  const now = new Date()
  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Prosjekt {data.length ? `(${data.length})` : ''}
        </Heading>
        <Text fontSize={"2xl"}>Prosjekt-oversikten inkluderer også prosjekt UB-dev ikke har vært involvert i, men som vi har en kobling til på en eller annen måte.</Text>
        {data.map(item => (
          <Grid key={item.id} maxW="full" templateColumns={'repeat(12, 1fr)'} my="12" gap={{ sm: "3", md: "6" }}>
            <GridItem colSpan={{ sm: '12', md: "5" }}>
              <Heading size="lg"><Link href={`/project/${item.id}`}>{item.label}</Link></Heading>
              <Flex py={"2"} wrap={"wrap"}>
                {item.carriedOutBy && (
                  <Tag colorScheme={"orange"} mr={"2"} mb="2">{item.carriedOutBy[0].label}</Tag>
                )}
                {item.timespan?.edtf ? <Tag variant={"outline"} mr={"2"} mb="2">{item.timespan?.edtf}</Tag> : ''}
                {new Date(item.timespan?.endOfTheEnd) < now ? <Tag colorScheme={"red"} mr={"2"} mb="2">Avsluttet</Tag> : ''}

              </Flex>
            </GridItem>
            <GridItem colSpan={"1"} display={{ sm: 'none', md: 'inherit' }}>
              <Center height='100%'>
                <Divider orientation='vertical' />
              </Center>
            </GridItem>
            <GridItem colSpan={{ sm: '12', md: "6" }}>
              <Text noOfLines={4} fontSize={"xl"} m="0">{item.description ?? item.shortDescription}</Text>
            </GridItem>

            <GridItem colSpan={"12"} rowSpan={"1"} mb={{ base: "10", md: '0' }}>
              <MilestonesWithoutSSR
                pattern
                p="5"
                mb={"6"}
                mapping={{
                  /* category: 'label', */
                  /* entries: 'entries' */
                }}
                data={item.entries}
                borderRadius={"8"}
                border={"1px solid"}
                borderColor={"gray.200"}
                boxShadow={"lg"}
              />
            </GridItem>
          </Grid>
        ))}
      </Container>
    </Layout>
  )
}