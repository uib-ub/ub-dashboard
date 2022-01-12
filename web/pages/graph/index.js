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
      }
    }
  },
  "edges": *[_type in ['Service', 'Software'] && defined(uses)] {
     uses[] {
      "id": ^._id + _ref,
      "source": ^._id,
      "target": _ref,
      "label": "uses"
    }
  }
}`;

export const getStaticProps = async ({ preview = false }) => {
  let graph = await getClient(preview).fetch(myQuery)
  graph.edges = flattenDeep(graph.edges.map(edge => { return ([...edge.uses.map(use => { return { ...use } })]) }))
  graph = cleanDeep(graph)

  return {
    props: {
      preview,
      data: graph,
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
        <Box className="graphpaper-background" maxH={"70vh"} overflow={"hidden"} my="5">
          <Box></Box>
          <GraphComponentWithoutSSR edges={data.edges} nodes={data.nodes} />
        </Box>

        {/* <PortableText blocks={data.content} /> */}
      </Container>
    </Layout >
  )
}
