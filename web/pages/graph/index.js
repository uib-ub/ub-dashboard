import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Heading, Text } from '@chakra-ui/react'
import Layout from "../../components/Layout"
import cleanDeep from "clean-deep"
import { entries, flatten, flattenDeep, forIn } from 'lodash-es'

/**
 * Flatten a multidimensional object
 *
 * For example:
 *   flattenObject({ a: 1, b: { c: 2 } })
 * Returns:
 *   { a: 1, c: 2}
 */
export const flattenObject = (obj) => {
  const flattened = {}

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key]))
    } else {
      flattened[key] = obj[key]
    }
  })

  return flattened
}

const GraphComponentWithoutSSR = dynamic(
  () => import('../../components/Graph/GraphComponent'),
  { ssr: false }
)

const myQuery = groq`{
  "nodes": *[_type in ['Service', "Software", "Language"]] {
    "id": _id,
    label,
    "size": count(*[references(^._id)]) * 7,
    "style": {
      _type == 'Service' => {
        "color": "#DB1D16"
      },
      _type == 'Software' => {
        "color": "#0B7EDB"
      },
      _type == 'Language' => {
        "color": "#DB8E16"
      }
    }
  },
  "edges": *[_type in ['Service', 'Software', 'Language'] && defined(uses)] {
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
          <GraphComponentWithoutSSR edges={data.edges} nodes={data.nodes} />
        </Box>

        {/* <PortableText blocks={data.content} /> */}
      </Container>
    </Layout >
  )
}
