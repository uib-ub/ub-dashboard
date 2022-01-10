import * as React from "react"
import dynamic from 'next/dynamic'

import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Container, Heading } from '@chakra-ui/react'
import Layout from "../../components/Layout"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const myQuery = groq`[
  ...*[_type in ['Event', 'Activity', 'Joining', 'Leaving', 'BeginningOfExistence', 'EndOfExistence', 'Formation', 'Dissolution'] && defined(timespan)] | order(timespan.beginOfTheBegin asc) {
    "text": coalesce(label, 'Uten label'),
    "timestamp": coalesce(
      select(
        timespan.date != "" => timespan.date
      ), 
      select(
        timespan.beginOfTheBegin != "" => timespan.beginOfTheBegin
      )
    )
  }
]`;

export const getStaticProps = async ({ preview = false }) => {
  const timeline = await getClient(preview).fetch(myQuery)

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
      <Container maxW="full" p="10">
        <Heading>
          Timeline
        </Heading>

        <MilestonesWithoutSSR
          mapping={{
            /* category: 'label', */
            /* entries: 'entries' */
          }}
          data={data}
          pattern={true}
          width="2000px"
          p="5"
        />

        {/* <PortableText blocks={data.content} /> */}
      </Container>
    </Layout>
  )
}