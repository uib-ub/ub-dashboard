import * as React from "react"
import dynamic from 'next/dynamic'
// import { Milestones } from 'react-milestones-vis'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Grid, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react'
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
    "description": pt::text(referredToBy[0].body),
    "entries": [
      {
        "timestamp": "2023-01-01T00:00:00.000Z",
        "text": "x",
      },
      select(timespan.endOfTheEnd != "" => {
        "timestamp": timespan.endOfTheEnd,
        "text": "Avslutning",
      }),
      ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
        "timestamp": timespan.beginOfTheBegin,
        "text": label,
      },
      select(defined(timespan.beginOfTheBegin) != "" => {
        "timestamp": timespan.beginOfTheBegin,
        "text": "Start",
      }),
      {
        "timestamp": "1980-01-01T00:00:00.000Z",
        "text": "x",
      },
    ]
  },
]`;

export const getStaticProps = async ({ preview = false }) => {
  let data = await getClient(preview).fetch(myQuery)
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
      <Container maxW="full" p="10">
        {data.map(project => (
          <Grid maxW="full" templateColumns='repeat(5, 1fr)' my="12" gap="10">
            <GridItem colSpan={1}>
              <Heading fontSize="md"><Link href={`/project/${project.id}`}>{project.label}</Link></Heading>
              <Text noOfLines={4}>{project.description}</Text>
            </GridItem>
            <GridItem colSpan={4}>

              <MilestonesWithoutSSR
                mapping={{
                  /* category: 'label', */
                  /* entries: 'entries' */
                }}
                data={project.entries}
              />
            </GridItem>
          </Grid>
        ))}
        <Box w="100%">
        </Box>

        {/* <PortableText blocks={data.content} /> */}
      </Container>
    </Layout>
  )
}