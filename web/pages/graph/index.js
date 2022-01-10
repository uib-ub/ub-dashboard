import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Container, Heading, Text } from '@chakra-ui/react'
import Layout from "../../components/Layout"
import GraphComponent from "../../components/Graph/GraphComponent"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/Graph/GraphComponent'),
  { ssr: false }
)

const myQuery = groq`{
  "nodes": *[_type in ['Service', "Software"]] {
    "id": _id,
    label,
    "radius": 18
  },
  "edges": *[_type in ['Service']].uses[]-> {
    "id": ^._id + _id,
    "source": ^._id,
    "target": _id,
    "label": "uses"
  }
}`;

/* export const getStaticProps = async ({ preview = false }) => {
  const graph = await getClient(preview).fetch(myQuery)

  return {
    props: {
      preview,
      data: graph,
    },
  }
} */


export default function TechGraph({ data }) {

  return (
    <Layout>
      <Container maxW="full" my="10" p={{ sm: '3', md: "10" }} mt="8">
        <Heading>
          Tech-graf
        </Heading>
        <Text fontSize={"2xl"}>Graf med tjenester og programvare kommer...</Text>

        {/* <GraphComponent edges={edges} nodes={nodes} /> */}

        {/* <PortableText blocks={data.content} /> */}
      </Container>
    </Layout >
  )
}
