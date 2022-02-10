import * as React from "react"
import dynamic from 'next/dynamic'
// import { Milestones } from 'react-milestones-vis'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Center, Container, Divider, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Head from "next/head"
import Link from "next/link"
import Layout from "../../components/Layout"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const myQuery = groq`[
  ...*[_type in ['Actor', 'Group'] && !(_id in path("drafts.**"))] | order(label asc)  {
    "id": _id,
    "label": label,
    shortDescription,
    "description": pt::text(referredToBy[0].body),
    "entries": [
      {
        "timestamp": $now,
        "text": "Nå",
      },
      ...activityStream[timespan.beginOfTheBegin != ""] | order(timespan.beginOfTheBegin desc) -> {
        "timestamp": timespan.beginOfTheBegin,
        "text": label,
      },
      ...*[_type in ['Project', 'Product'] && references(^._id)] {
        ...select(defined(hadParticipant) => {
          "text": ^.label + ' deltar i ' + label,
          ...hadParticipant[assignedActor._ref == ^.^._id][0] {
            "timestamp": timespan.beginOfTheBegin
          }
        }),
        ...select(^._id in carriedOutBy[]._ref => {
          "text": ^.label + ' leder ' + label,
          "timestamp": timespan.beginOfTheBegin
        })
      },
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

export default function Persons({ data }) {
  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Personer {data.length ? `(${data.length})` : ''}
        </Heading>
        {data.map(item => (
          <Grid key={item.id} maxW="full" templateColumns={'repeat(12, 1fr)'} my="12" gap={{ base: "3", md: "6" }}>
            <GridItem colSpan={{ base: '12', md: "5" }}>
              <Heading size="lg"><Link href={`/actor/${item.id}`}>{item.label}</Link></Heading>
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