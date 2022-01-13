import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Heading, Tag, Text } from '@chakra-ui/react'
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
      <Container variant="wrapper" centerContent>
        <Tag size={"lg"}>{item.type}</Tag>
        <Heading textAlign={"center"} mt="5" size={"3xl"}>{item.label}</Heading>
        {item.shortDescription && (
          <Text fontSize='xl'>
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
            p="5"
            pb="10"
            my="5"
          />
        </Box>

        {item.referredToBy && (
          <Container maxW={"3xl"} borderRadius={"8"} border={"1px solid"} borderColor={"gray.400"} boxShadow={"md"} my={"15"} pb="4">
            <Box overflowY={"scroll"} maxH={"40vh"}>
              <PortableText blocks={item.referredToBy[0].body} />
            </Box>
          </Container>
        )}

      </Container>
    </Layout>
  )
}