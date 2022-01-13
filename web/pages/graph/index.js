import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Heading, Text } from '@chakra-ui/react'
import Layout from "../../components/Layout"
import cleanDeep from "clean-deep"
import { flattenDeep } from 'lodash-es'

const GraphComponentWithoutSSR = dynamic(
  () => import('../../components/Graph/GraphComponent'),
  { ssr: false }
)

const myQuery = groq`{
  "graph": {
    "nodes": *[_type in ['Service', "Software", "Language"]] {
      "id": _id,
      label,
      "size": 12 + (count(*[references(^._id)]) * 4),
      "style": {
        _type == 'Service' && !defined(timespan.endOfTheEnd) => {
          "color": "#DB1D16"
        },
        _type == 'Service' && defined(timespan.endOfTheEnd) => {
          "color": "gray"
        },
        _type == 'Software' => {
          "color": "#0B7EDB"
        },
        _type == 'Language' => {
          "color": "#DB8E16"
        },
      }
    },
    "edges": *[_type in ['Service', 'Software'] && defined(uses)] {
      uses[] {
        "id": ^._id + _ref,
        "source": ^._id,
        "target": _ref,
        "label": "uses",
      }
    }
  },
  "languages": *[_type == 'Language'] {
    "id": _id,
    label,
    "count": count(*[references(^._id)]),
  }
}`;

export const getStaticProps = async ({ preview = false }) => {
  let data = await getClient(preview).fetch(myQuery)
  data.graph.edges = flattenDeep(data.graph.edges.map(edge => { return ([...edge.uses.map(use => { return { ...use } })]) }))
  data = cleanDeep(data)

  return {
    props: {
      preview,
      data: data,
    },
  }
}


export default function TechGraph({ data }) {
  return (
    <Layout>
      <Container variant="wrapper">
        <Heading>
          Tek-graf
        </Heading>
        <Box className="graphpaper-background" maxH={"50vh"} overflow={"hidden"} my="5">
          <Box></Box>
          <GraphComponentWithoutSSR edges={data.graph.edges} nodes={data.graph.nodes} />
        </Box>
        <Box>
          {data?.languages && data?.languages.map(lang => (
            <Heading as="h2" size={"lg"}>{lang.label} ({lang.count})</Heading>
          ))}
        </Box>

        {/* <PortableText blocks={data.content} /> */}
      </Container>
    </Layout >
  )
}
