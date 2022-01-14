import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, HStack, Spacer, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import { FaCode, FaLanguage } from 'react-icons/fa'
import { FcServices } from 'react-icons/fc'
import Layout from "../../components/Layout"
import cleanDeep from "clean-deep"
import { flattenDeep } from 'lodash-es'

const GraphComponentWithoutSSR = dynamic(
  () => import('../../components/Graph/GraphComponent'),
  { ssr: false }
)

const colors = {
  service: "#DB1D16",
  software: "#0B7EDB",
  language: "#DB8E16",
}

const myQuery = groq`{
  "graph": {
    "nodes": *[_type in ['Service', "Software", "Language"]] {
      "id": _id,
      label,
      "size": 12 + (count(*[references(^._id)]) * 4),
      "style": {
        _type == 'Service' && !defined(timespan.endOfTheEnd) => {
          "color": $colors.service
        },
        _type == 'Service' && defined(timespan.endOfTheEnd) => {
          "color": "gray"
        },
        _type == 'Software' => {
          "color": $colors.software
        },
        _type == 'Language' => {
          "color": $colors.language
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
  "languages": *[_type == 'Language'] | order(label asc) {
    "id": _id,
    label,
    "count": count(*[references(^._id)]),
  },
  "softwares": *[_type == 'Software'] | order(label asc) {
    "id": _id,
    label,
    "count": count(*[references(^._id)]),
  }
}`;

export const getStaticProps = async ({ preview = false }) => {
  let data = await getClient(preview).fetch(myQuery, { colors })
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
        <Heading size={"3xl"}>
          Tek-graf
        </Heading>
        <HStack>
          <Spacer />
          <Tag size={"md"} variant='subtle'>
            <TagLeftIcon boxSize='22px' as={FcServices} color={colors.service} />
            <TagLabel>Tjeneste</TagLabel>
          </Tag>
          <Tag size={"md"} variant='subtle'>
            <TagLeftIcon boxSize='22px' as={FaCode} color={colors.software} />
            <TagLabel>Programvare</TagLabel>
          </Tag>
          <Tag size={"md"} variant='subtle'>
            <TagLeftIcon boxSize='22px' as={FaLanguage} color={colors.language} />
            <TagLabel>Språk</TagLabel>
          </Tag>
        </HStack>
        <Box
          className="graphpaper-background"
          maxH={"50vh"} overflow={"hidden"}
          my="5"
          borderRadius={"8"}
          border={"1px solid"}
          borderColor={"gray.200"}
          boxShadow={"lg"}
        >
          <GraphComponentWithoutSSR
            edges={data.graph.edges}
            nodes={data.graph.nodes}
          />
        </Box>
        <Flex>
          <Box mr={"8"}>
            <Heading as="h2" size={"lg"}>Programeringsspråk</Heading>
            {data?.languages && data?.languages.map(lang => (
              <Heading key={lang.id} as="h3" size={"md"}>{lang.label} ({lang.count})</Heading>
            ))}
          </Box>
          <Box mr={"8"}>
            <Heading as="h2" size={"lg"}>Software</Heading>
            {data?.softwares && data?.softwares.map(software => (
              <Heading key={software.id} as="h3" size={"md"}>{software.label} ({software.count})</Heading>
            ))}
          </Box>

        </Flex>

        {/* <PortableText blocks={data.content} /> */}
      </Container>
    </Layout >
  )
}
