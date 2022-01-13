import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, SimpleGrid, Spacer, Table, Tbody, Thead, Th, Td, Tr, Tag, TagLabel, Text } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { serviceQuery } from "../../lib/queries"
import Participants from "../../components/Props/Participants"
import Files from "../../components/Props/Files"
import Links from "../../components/Props/Links"
import Link from "../../components/Link"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const servicesQuery = groq`
  *[_type in ['Service']] {
    _id,
  }
`;

export async function getStaticPaths() {
  const all = await getClient(false).fetch(servicesQuery)
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
  let timeline = await getClient(preview).fetch(serviceQuery, { id: params.id, now: now })
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}

export default function Service({ data }) {
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
          <Text fontSize='xl' m="0">
            {item.shortDescription}
          </Text>
        )}

        {item.hadParticipant && (
          <Participants participants={item.hadParticipant} />
        )}

        <Box w="100%" mb={16} display={{ base: 'none', md: 'block' }}>
          <MilestonesWithoutSSR
            mapping={{
              category: 'label',
              entries: 'entries'
            }}
            data={milestones}
            display="block"
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
          {(item.uses || item.usedPlatform) && (
            <Box borderRadius={"8"} border={"1px solid"} borderColor={"gray.200"} boxShadow={"lg"} my={"15"} px="6" pb={"6"}>
              <Box overflowY={"scroll"} maxH={"20vh"}>
                <Heading as="h2" size={"md"} mt={4} borderBottom={"1px solid"} fontWeight={"light"}>Bruker</Heading>
                {item.uses && item.uses.map(u => (
                  <Tag key={u.id} size={"lg"} mt={"3"} mr={"3"}>{u.label}</Tag>
                ))}
                {item.usedPlatform && item.usedPlatform.map(u => (
                  <Tag key={u.id} size={"lg"} mt={"3"} mr={"3"}>{u.label}</Tag>
                ))}
              </Box>
            </Box>
          )}

          {item.endpoint && (
            <Box maxW={"3xl"} borderRadius={"8"} border={"1px solid"} borderColor={"gray.200"} boxShadow={"lg"} my={"15"} px="6" pb={"6"}>
              <Heading as="h2" size={"md"} mt={4} borderBottom={"1px solid"} fontWeight={"light"} mb="4">Endpoints</Heading>
              <Table size='sm' mx={0}>
                <Thead>
                  <Tr>
                    <Th>Navn</Th>
                    <Th>Url</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {item.endpoint.map(e => (
                    <Tr key={e.id}>
                      <Td>
                        <Link href={e.url}>
                          {e.label}
                        </Link>
                      </Td>
                      <Td>
                        <Tag variant='subtle' colorScheme='cyan' mr="2">
                          <TagLabel>{e.url}</TagLabel>
                        </Tag>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                {/* <Tfoot>
                  <Tr>
                    <Th>Fil</Th>
                    <Th>Format</Th>
                  </Tr>
                </Tfoot> */}
              </Table>
            </Box>
          )}
        </SimpleGrid>

      </Container>
    </Layout>
  )
}