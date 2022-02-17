import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Grid, GridItem, Heading, Icon, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { projectQuery } from "../../lib/queries"
import Participants from "../../components/Props/Participants"
import Links from "../../components/Props/Links"
import Files from "../../components/Props/Files"
import Team from "../../components/Props/Team"
import Link from "../../components/Link"
import { flatMap } from 'lodash-es'
import ResultedIn from "../../components/Props/ResultedIn"
import Status from "../../components/Props/Status"
import Funding from "../../components/Props/Funding"
import Ids from "../../components/Props/Ids"
import ItemHeader from "../../components/Props/ItemHeader"
import { MdDashboard, MdMenuBook } from 'react-icons/md'
import Period from "../../components/Props/Period"
import { BiNetworkChart } from "react-icons/bi"
import MissingBlock from "../../components/MissingBlock"
import { GiEvilBook } from "react-icons/gi"
import { GrHistory } from "react-icons/gr"
import { AiOutlineTeam } from "react-icons/ai"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const projectsQuery = groq`
  *[_type in ['Project']] {
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
  let timeline = await getClient(preview).fetch(projectQuery, { id: params.id, now: now })
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}

export default function Project({ data }) {
  const { item, milestones } = data
  const flattenedMilestones = cleanDeep(flatMap(milestones.map(e => e.entries)))

  return (
    <Layout>
      <Container variant="wrapper">

        <ItemHeader
          label={item.label}
          blurb={item.shortDescription}
          image={item.image?.[0]}
          continued={item.continued}
          continuedBy={item.continuedBy}
        >
          <Flex columnGap={'30px'} mt={4}>
            {item.period && (
              <Period size={'md'} period={item.period} />
            )}
            {item.status && (
              <Status size={'md'} status={item.status} />
            )}
            {item.identifier && (
              <Ids size={'md'} identifiers={item.identifier} />
            )}
          </Flex>
        </ItemHeader>

        <Tabs colorScheme='green' my={10}>
          <TabList>
            <Tab><Icon as={MdDashboard} mr={2} /> Oversikt</Tab>
            <Tab><Icon as={AiOutlineTeam} mr={2} /> Medlemmer</Tab>
            <Tab><Icon as={GrHistory} mr={2} /> Historikk</Tab>
            <Tab><Icon as={BiNetworkChart} mr={2} /> Graph</Tab>
            <Tab><Icon as={MdMenuBook} mr={2} /> Dokumentasjon</Tab>
          </TabList>

          <TabPanels mt={3}>
            <TabPanel>
              <Grid
                maxW={'full'}
                gap={5}
                templateColumns='repeat(6, 1fr)'
              >

                {(item.carriedOutBy || item.hadParticipant) && (
                  <GridItem
                    colSpan={[6, null, 3]}
                  >
                    <Heading size={'lg'} mb={5}>Institusjoner</Heading>
                    <Box
                      borderRadius={"8"}
                      border={"1px solid"}
                      borderColor={"gray.200"}
                      boxShadow={"md"}
                      p={5}
                    >
                      {item.carriedOutBy && (
                        <Participants participants={item.carriedOutBy} />
                      )}

                      {item.hadParticipant && (
                        <Participants participants={item.hadParticipant} />
                      )}
                    </Box>
                  </GridItem>
                )}

                {item.hasTeam && (
                  <GridItem
                    colSpan={[6, null, 3]}
                  >
                    <Heading size={'lg'} mb={5}>Medlemmer</Heading>
                    <Box
                      borderRadius={"8"}
                      border={"1px solid"}
                      borderColor={"gray.200"}
                      boxShadow={"md"}
                      p={5}
                    >
                      {item.hasTeam && item.hasTeam.map(team => (
                        <Participants key={team.id} participants={team.hasMember} />
                      ))}
                    </Box>
                  </GridItem>
                )}

                {flattenedMilestones.length > 1 && (
                  <GridItem
                    colSpan={6}
                  >
                    <Heading size={'lg'} mb={5}>Tidslinje</Heading>
                    <Box
                      w="100%"
                      display={{ base: 'none', md: 'inherit' }}
                    >
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
                  >
                    <Heading size={'lg'} mb={5}>Sammendrag</Heading>
                    <Box
                      borderRadius={"8"}
                      border={"1px solid"}
                      borderColor={"gray.200"}
                      boxShadow={"md"}
                      px={10}
                      pb={5}
                    >
                      <PortableText value={item.referredToBy[0].body} />
                    </Box>
                  </GridItem>
                )}

                {(item.resultedIn || item.hasFile || item.link) && (
                  <GridItem
                    colSpan={[6, null, 3]}
                  >
                    <Heading size={'lg'} mb={5}>Diverse</Heading>
                    <Box
                      borderRadius={"8"}
                      border={"1px solid"}
                      borderColor={"gray.200"}
                      boxShadow={"md"}
                      p={5}
                    >
                      {item.funding && <Funding stream={item.funding} />}


                      {item.resultedIn && (
                        <ResultedIn results={item.resultedIn} />
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
                    </Box>
                  </GridItem>
                )}
              </Grid>
            </TabPanel>

            <TabPanel>
              <Grid
                minHeight={'20vh'}
                border={'solid #eee 1px'}
                borderRadius={3}
              >
                <Box
                  borderRadius={"8"}
                  border={"1px solid"}
                  borderColor={"gray.200"}
                  boxShadow={"md"}
                  p={5}
                >
                  {item.hasTeam && item.hasTeam.map(team => (
                    <Team key={team.id} team={team} size="md" />
                  ))}
                </Box>
              </Grid>
            </TabPanel>

            <TabPanel>
              <Grid
                minHeight={'20vh'}
                border={'solid #eee 1px'}
                borderRadius={3}
              >
                <MissingBlock
                  heading="Historikk-komponenten er ikke ferdig..."
                  text='Alt tar tid, også visualisering av historien :-(. Det blir nok en enklere liste enn "tidslinjen".'
                  icon={GrHistory}
                />
              </Grid>
            </TabPanel>

            <TabPanel>
              <Grid
                minHeight={'20vh'}
                border={'solid #eee 1px'}
                borderRadius={3}
              >
                <MissingBlock
                  heading="Graph-komponenten er ikke ferdig..."
                  text="Alt tar tid, også grafer :-("
                  icon={BiNetworkChart}
                />
              </Grid>
            </TabPanel>

            <TabPanel>
              <Grid
                minHeight={'20vh'}
                border={'solid #eee 1px'}
                borderRadius={3}
              >
                <MissingBlock
                  heading="Dokumentasjonskomponenten er ikke ferdig..."
                  text="TODO: hent README eller annen lenket dokumentasjon fra Sanity"
                  icon={GiEvilBook}
                />
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>

      </Container>
    </Layout >
  )
}
