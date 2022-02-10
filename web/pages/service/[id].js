import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, Spacer, VStack, Grid, GridItem, Tag, TagLabel, Text } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { serviceQuery } from "../../lib/queries"
import Participants from "../../components/Props/Participants"
import Files from "../../components/Props/Files"
import Links from "../../components/Props/Links"
import Status from "../../components/Props/Status"
import Ids from "../../components/Props/Ids"
import Team from "../../components/Props/Team"
import ResultedIn from "../../components/Props/ResultedIn"
import Link from "../../components/Link"
import { flatMap } from 'lodash-es'

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
  const flattenedMilestones = cleanDeep(flatMap(milestones.map(e => e.entries)))
  console.log(item)

  return (
    <Layout>
      <Container variant="wrapper">
        <Flex>
          <span style={{ paddingInlineEnd: '0.5rem' }}>{item.type}</span>
          <span style={{ paddingInlineEnd: '0.5rem' }}>|</span>
          <span style={{ paddingInlineEnd: '0.5rem' }}>{item.period}</span>
          {item.status && (
            <>
              <span style={{ paddingInlineEnd: '0.5rem' }}>|</span>
              <Status size={'md'} status={item.status} />
            </>
          )}
          {item.identifier && (
            <Ids size={'md'} identifier={item.identifier} />
          )}
        </Flex>

        <Heading mt="5" fontSize={{ base: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}>
          {item.label}

        </Heading>

        {item.shortDescription && (
          <Text fontSize='xl' m="0">
            {item.shortDescription}
          </Text>
        )}

        <Grid
          my={10}
          maxW={'full'}
          gap={5}
          templateColumns='repeat(6, 1fr)'
        >

          {item.carriedOutBy && (
            <GridItem
              colSpan={[6]}
            >
              <Participants participants={item.carriedOutBy} />
            </GridItem>
          )}

          {item.hadParticipant && (
            <GridItem
              colSpan={6}
            >
              <Participants participants={item.hadParticipant} />
            </GridItem>
          )}


          <GridItem colSpan={6}>
            <Flex direction={['column', null, 'row']}>
              {item.continued && (
                <Box display={"inline-block"} m={3}>
                  <span>Fortsettelse av </span>
                  <VStack display={"inline-block"}>
                    {item.continued.map(e => (
                      <Heading key={e.id} size={"md"}>
                        <Link href={`/project/${e.id}`}>
                          {e.label}
                        </Link>
                      </Heading>
                    ))}
                  </VStack>
                </Box>
              )}

              <Spacer />

              {item.continuedBy && (
                <Box display={"inline-block"} m={3}>
                  <span>Fortsatt av </span>
                  <VStack display={"inline-block"}>
                    {item.continuedBy?.map(e => (
                      <Heading key={e.id} size={"md"}>
                        <Link href={`/project/${e.id}`}>
                          {e.label}
                        </Link>
                      </Heading>
                    ))}
                  </VStack>
                </Box>
              )}
            </Flex>
          </GridItem>


          {flattenedMilestones.length > 1 && (
            <GridItem
              colSpan={6}
            >
              <Box w="100%" display={{ base: 'none', md: 'inherit' }}>
                <MilestonesWithoutSSR
                  data={flattenedMilestones}
                  pattern
                  // p="5"
                  pb="10"
                  borderRadius={"8"}
                  border={"1px solid"}
                  borderColor={"gray.200"}
                  boxShadow={"md"}
                />
              </Box>
            </GridItem>
          )}



          {item.referredToBy && (
            <GridItem
              colSpan={[6, null, 3]}
              borderRadius={"8"}
              border={"1px solid"}
              borderColor={"gray.200"}
              boxShadow={"md"}
              px="6"
              pb={"6"}
            >
              <Box>
                <Heading as="h2" size={"md"} mt={4} borderBottom={"1px solid"} fontWeight={"light"}>Beskrivelse</Heading>
                <PortableText blocks={item.referredToBy[0].body} />
              </Box>
            </GridItem>
          )}

          {(item.hasTeam || item.endpoint || item.hasFile || item.link) && (
            <GridItem
              colSpan={[6, null, 3]}
              borderRadius={"8"}
              border={"1px solid"}
              borderColor={"gray.200"}
              boxShadow={"md"}
              px="6"
              pb={"6"}
            >

              {item.hasTeam && item.hasTeam.map(team => (
                <Team key={team.id} team={team} />
              ))}

              {item.endpoint && (
                <ResultedIn results={item.endpoint} />
              )}

              {(item.hasFile || item.link) && (
                <>
                  <Heading as="h2" size={"md"} my={4} borderBottom={"1px solid"} fontWeight={"light"}>Ressurser</Heading>
                  {item.link && (
                    <Links links={item.link} />
                  )}

                  {item.hasFile && (
                    <Files files={item.hasFile} />
                  )}
                </>
              )}
            </GridItem>
          )}

          {(item.uses || item.usedPlatform) && (
            <GridItem
              colSpan={[6, null, 3]}
              borderRadius={"8"}
              border={"1px solid"}
              borderColor={"gray.200"}
              boxShadow={"lg"}
              px="6"
              pb={"6"}
            >

              <Heading as="h2" size={"md"} mt={4} borderBottom={"1px solid"} fontWeight={"light"}>Bruker</Heading>
              {item.uses && item.uses.map(u => (
                <Tag key={u.id} size={"lg"} mt={"3"} mr={"3"}>{u.label}</Tag>
              ))}
              {item.usedPlatform && item.usedPlatform.map(u => (
                <Tag key={u.id} size={"lg"} mt={"3"} mr={"3"}>{u.label}</Tag>
              ))}

            </GridItem>
          )}
        </Grid>


      </Container>
    </Layout>
  )
}