import * as React from "react"
import dynamic from 'next/dynamic'
// import { Milestones } from 'react-milestones-vis'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Heading, Text } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const projectsQuery = groq`
  *[_type in ['Project']] {
    _id,
  }
`;

const myQuery = groq`[
  ...*[_id == $id || references($id) ] | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "label": @.label,
    "description": pt::text(referredToBy[0].body),
    "entries": [
      {
        "timestamp": "2022-02-01T00:00:00.000Z",
        "text": "Nå",
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
      })
    ]
  },
  ...*[_id == $id].resultedIn[]->usedService[].assignedService-> | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "label": label,
    "description": pt::text(referredToBy[0].body),
    "entries": [
      {
        "timestamp": "2022-02-01T00:00:00.000Z",
        "text": "Nå",
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
      })
    ]
  },
]`;


export async function getStaticPaths() {
  const all = await getClient(false).fetch(projectsQuery)
  return {
    paths:
      all?.map((item) => ({
        params: {
          id: item._id,
        },
      })) || [],
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  let timeline = await getClient(preview).fetch(myQuery, { id: params.id })
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}

export default function Projects({ data }) {
  return (
    <Layout>
      <Container maxW="full" p="10" centerContent>
        <Heading my="5">{data[0].label}</Heading>
        <Text>{data[0].description}</Text>

        <Heading as="h2" size={"lg"} my="5">Tidslinje</Heading>
        <Box w="100%">
          <MilestonesWithoutSSR
            mapping={{
              category: 'label',
              entries: 'entries'
            }}
            data={data}
          />
        </Box>

        {/* <PortableText blocks={data.content} /> */}
      </Container>
    </Layout>
  )
}