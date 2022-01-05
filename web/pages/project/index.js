import * as React from "react"
import Timeline from 'react-visjs-timeline'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Container, Heading } from '@chakra-ui/react'

const myQuery = groq`{ 
  "groups": *[_type in ['Project']] | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "content": label, 
  },
  "items": [
    ...*[_type in ['Project']] {
      "id": coalesce('item-' + _id, _key),
      "content": label,
      "start": string(timespan.beginOfTheBegin),
      "end": string(timespan.endOfTheEnd),
      "group": _id,
    },
    ...*[_type in ['Project'] && defined(activityStream)].activityStream[] {
      "id": coalesce('item-' + _id, _key),
      "content": label,
      "start": string(timespan.beginOfTheBegin),
      "end": string(timespan.endOfTheEnd),
      "group": ^._id,
    }
  ]
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


export default function Projects({ data }) {
  const { groups, items } = data
  const options = {
    width: '100%',
    height: '60px',
    stack: false,
    zoomMin: 10000000,
    type: 'box',
    format: {
      minorLabels: {
        minute: 'h:mma',
        hour: 'ha'
      }
    }
  }


  return (
    <Container maxW="full" centerContent>
      <Timeline
        options={options}
        groups={groups}
        items={items}
      />

      {/* <PortableText blocks={data.content} /> */}
    </Container>
  )
}