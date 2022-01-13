import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, SimpleGrid, Spacer, Tag, Text } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { productQuery } from "../../lib/queries"
import Participants from "../../components/Props/Participants"
import Files from "../../components/Props/Files"
import Links from "../../components/Props/Links"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const projectsQuery = groq`
  *[_type in ['Product']] {
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
  let timeline = await getClient(preview).fetch(productQuery, { id: params.id, now: now })
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}

export default function Product({ data }) {
  const { item, milestones } = data
  return (
    <Layout>
      <Container variant="wrapper">
        <Tag size={"lg"}>{item.type}</Tag>
        <Flex>
          <Heading mt="5" size={"3xl"}>{item.label}</Heading>

          <Spacer />

          {item.link && (
            <Links links={item.link} />
          )}
        </Flex>

        {item.shortDescription && (
          <Text fontSize='lg' m="0">
            {item.shortDescription}
          </Text>
        )}

        {item.hadParticipant && (
          <Participants participants={item.hadParticipant} />
        )}

        <SimpleGrid columns={2} spacing={10}>
          {item.referredToBy && (
            <Box borderRadius={"8"} border={"1px solid"} borderColor={"gray.200"} boxShadow={"lg"} my={"15"} px="6" pb={"6"}>
              <Box overflowY={"scroll"} maxH={"20vh"}>
                <Heading as="h2" size={"md"} mt={4} borderBottom={"1px solid"} fontWeight={"light"}>Beskrivelse</Heading>
                <PortableText blocks={item.referredToBy[0].body} />
              </Box>
            </Box>
          )}

          {item.hasFile && (
            <Box maxW={"3xl"} borderRadius={"8"} border={"1px solid"} borderColor={"gray.200"} boxShadow={"lg"} my={"15"} px="6" pb={"6"}>
              <Heading as="h2" size={"md"} mt={4} borderBottom={"1px solid"} fontWeight={"light"} mb="4">Filer</Heading>
              <Files files={item.hasFile} />
            </Box>
          )}
        </SimpleGrid>

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

      </Container>
    </Layout>
  )
}