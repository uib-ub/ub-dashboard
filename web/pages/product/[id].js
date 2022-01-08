import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Heading, Tag, Text } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { productQuery } from "../../lib/queries"
import Participants from "../../components/Props/Participants"
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

export default function Projects({ data }) {
  const { item, milestones } = data
  return (
    <Layout>
      <Container maxW="full" p="10" centerContent>
        <Tag size={"lg"}>{item.type}</Tag>
        <Heading textAlign={"center"} mt="5">{item.label}{` (${item.period})`}</Heading>
        {item.shortDescription && (
          <Text fontSize='xl'>
            {item.shortDescription}
          </Text>
        )}

        {item.link && (
          <Links links={item.link} />
        )}

        {item.hadParticipant && (
          <Participants participants={item.hadParticipant} />
        )}

        {item.referredToBy && (
          <Container maxW={"3xl"} borderRadius={"8"} border={"1px solid"} borderColor={"gray.400"} my={"15"} boxShadow={"md"} >
            <PortableText blocks={item.referredToBy[0].body} />
          </Container>
        )}

        <Heading as="h2" size={"lg"} my="5">Tidslinje</Heading>
        <Box w="100%">
          <MilestonesWithoutSSR
            mapping={{
              category: 'label',
              entries: 'entries'
            }}
            data={milestones}
          />
        </Box>

      </Container>
    </Layout>
  )
}