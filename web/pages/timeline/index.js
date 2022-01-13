import * as React from "react"
import dynamic from 'next/dynamic'

import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Container, Heading } from '@chakra-ui/react'
import Layout from "../../components/Layout"
import cleanDeep from "clean-deep"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const myQuery = groq`[
  ...*[_type in ['Event', 'Activity', 'Move', 'Joining', 'Leaving', 'BeginningOfExistence', 'EndOfExistence', 'Formation', 'Dissolution'] && defined(timespan)] | order(timespan.beginOfTheBegin asc) {
    "text": coalesce(label, 'Uten label'),
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
        "timestamp": timespan.endOfTheEnd,
        "text": label + " avsluttes",
      }
    )
  },
  ...*[_type in ['Project'] && defined(timespan.beginOfTheBegin)] {
      ...select(defined(timespan.beginOfTheBegin) => {
        "timestamp": timespan.beginOfTheBegin,
        "text": label + " starter",
      }
    )
  }
]`;

export const getStaticProps = async ({ preview = false }) => {
  let timeline = await getClient(preview).fetch(myQuery)
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}


export default function ActivityTimeline({ data }) {
  return (
    <Layout>
      {/* <Container maxW="full" my="10" px={{ sm: '3', md: "10" }} pt={{ sm: '3', md: "10" }} > */}
      <Container variant="wrapper">
        <Heading>
          Tidslinje
        </Heading>

        <MilestonesWithoutSSR
          mapping={{
            /* category: 'label', */
            /* entries: 'entries' */
          }}
          data={data}
          pattern={true}
          width="10500px"
          maxH="70vh"
          px="5"
          my="5"
        />

        {/* <PortableText blocks={data.content} /> */}
      </Container>
    </Layout>
  )
}