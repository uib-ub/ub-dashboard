import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, HStack, list, List, ListItem, Spacer, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react'
import { FaCode, FaLanguage, FaCogs } from 'react-icons/fa'
import { MdOutlineDisabledByDefault } from 'react-icons/md'
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
  discontinued: "gray",
}

const myQuery = groq`{
  "graph": {
    "nodes": *[_type in ['Service', "Software", "ProgrammingLanguage", "Language" ] && !(_id in path("drafts.**"))] {
      "id": _id,
      label,
      "size": 12 + (count(*[references(^._id)]) * 4),
      "style": {
        _type == 'Service' && !defined(timespan.endOfTheEnd) => {
          "color": $colors.service
        },
        _type == 'Service' && defined(timespan.endOfTheEnd) => {
          "color": $colors.discontinued
        },
        _type == 'Software' => {
          "color": $colors.software
        },
        _type in ['ProgrammingLanguage', 'Language'] => {
          "color": $colors.language
        },
      }
    },
    "edges": *[_type in ['Service', 'Software'] && !(_id in path("drafts.**")) && defined(uses)] {
      uses[] {
        "id": ^._id + _ref,
        "source": ^._id,
        "target": _ref,
        "label": "uses",
      }
    }
  },
  "languages": *[_type  in ["ProgrammingLanguage"] && !(_id in path("drafts.**"))] | order(label asc) {
    "id": _id,
    label,
    "count": count(*[references(^._id)]),
  },
  "softwares": *[_type == 'Software' && !(_id in path("drafts.**"))] | order(label asc) {
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


export default function Technologies({ data }) {
  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Teknologi
        </Heading>
        <Text fontSize={"2xl"}>Modellen her er ikke 100%, men gir en viss oversikt.</Text>

        <HStack>
          <Spacer />
          <Tag size={"md"} variant='subtle'>
            <TagLeftIcon boxSize='22px' as={FaCogs} color={colors.service} />
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
          <Tag size={"md"} variant='subtle'>
            <TagLeftIcon boxSize='22px' as={MdOutlineDisabledByDefault} color={colors.discontinued} />
            <TagLabel>Avviklet</TagLabel>
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

        <Flex mt="16">
          <Box mr={"8"}>
            <Heading as="h2" size={"lg"}>Programmeringsspråk</Heading>
            <List>
              {data?.languages && data?.languages.map(lang => (
                <ListItem key={lang.id} as="h3" size={"md"}>{lang.label} ({lang.count})</ListItem>
              ))}
            </List>
          </Box>

          <Box mr={"8"}>
            <Heading as="h2" size={"lg"}>Software</Heading>
            <List>
              {data?.softwares && data?.softwares.map(software => (
                <ListItem key={software.id} as="h3" size={"md"}>{software.label} ({software.count})</ListItem>
              ))}
            </List>
          </Box>

        </Flex>

        {/* <PortableText value={data.content} /> */}
      </Container>
    </Layout >
  )
}
