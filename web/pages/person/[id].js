import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Heading, SimpleGrid, Tag, Text } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { actorQuery } from "../../lib/queries"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const projectsQuery = groq`
  *[_type in ['Actor']] {
    _id,
  }
`;

export async function getStaticPaths() {
  const all = await getClient(false).fetch(projectsQuery)
  return {
    paths:
      all?.map((item) => ({
        params: {
          id: item._id,
        },
      })) || [],
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  const now = new Date()
  let timeline = await getClient(preview).fetch(actorQuery, { id: params.id, now: now })
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}

export default function Person({ data }) {
  const { item, milestones } = data
  return (
    <Layout>
      <Container variant="wrapper">
        <Tag size={"lg"}>{item.type}</Tag>
        <Heading mt="5" size={"3xl"}>{item.label}</Heading>

        {item.shortDescription && (
          <Text fontSize='xl' m="0">
            {item.shortDescription}
          </Text>
        )}

        <Box w="100%" mb={16} display={{ base: 'none', md: 'inherit' }}>
          <MilestonesWithoutSSR
            mapping={{
              category: 'label',
              entries: 'entries'
            }}
            data={milestones}
            pattern
            // p="5"
            pb="10"
            my="5"
            borderRadius={"8"}
            border={"1px solid"}
            borderColor={"gray.200"}
            boxShadow={"lg"}
          />
        </Box>

        <SimpleGrid columns={2} spacing={10}>
          {item.referredToBy && (
            <Box borderRadius={"8"} border={"1px solid"} borderColor={"gray.200"} boxShadow={"lg"} my={"15"} px="6" pb={"6"}>
              <Box overflowY={"scroll"} maxH={"20vh"}>
                <Heading as="h2" size={"md"} mt={4} borderBottom={"1px solid"} fontWeight={"light"}>Biografi</Heading>
                <PortableText blocks={item.referredToBy[0].body} />
              </Box>
            </Box>
          )}
        </SimpleGrid>

      </Container>
    </Layout>
  )
}