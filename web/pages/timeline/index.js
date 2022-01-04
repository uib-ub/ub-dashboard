import * as React from "react"
import * as d3 from "d3"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Container, Heading } from '@chakra-ui/react'
import Timeline from '../../components/Timeline'

const myQuery = groq`{ 
  "timelines": [
  ...*[_type in ['Product', 'Project']] | order(timespan.beginOfTheBegin asc)  {
    _id,
    label,
    "timelines": [
      {
        "timelineName": @.label,
        "events": {
          "versions": [
            [string(@.timespan.beginOfTheBegin), "Oppstart"],
            [string(@.timespan.endOfTheEnd), "Avvikling"]
          ]
        }
      },
      ...usedService[] {
      "timelineName": assignedService->label,
      "events": {
        "versions": [
          [string(timespan.beginOfTheBegin), "Oppstart"],
          [string(timespan.endOfTheEnd), "Avvikling"]
        ]
      }
    }
    ]
  }
],
"slot": 
  *[_type in ['Product', 'Project', 'Service'] && defined(timespan)]{
   "d": [string(timespan.beginOfTheBegin), string(timespan.endOfTheEnd)]
  }
}`;

export const getStaticProps = async ({ preview = false }) => {
  const timeline = await getClient(preview).fetch(myQuery)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}


export default function ServicesPage({ data }) {
  return (
    <Container maxW="full" centerContent>
      {/* {data.timelines.map(p => (
        <Heading key={p._id}>{p?.label}</Heading>
      ))} */}

      <Timeline data={data} />

      {/* <PortableText blocks={data.content} /> */}
    </Container>
  )
}