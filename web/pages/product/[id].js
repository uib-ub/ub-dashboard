import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, VStack, Image, Grid, GridItem, Spacer, Tag, Text, Icon, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText, urlFor } from "../../lib/sanity"
import { productQuery } from "../../lib/queries"
import Participants from "../../components/Props/Participants"
import Files from "../../components/Props/Files"
import Links from "../../components/Props/Links"
import Team from "../../components/Props/Team"
import { flatMap } from "lodash-es"
import ResultedIn from "../../components/Props/ResultedIn"
import Link from "../../components/Link"
import Funding from "../../components/Props/Funding"
import ItemHeader from "../../components/Props/ItemHeader"
import { MdDashboard } from "react-icons/md"
import { BiNetworkChart } from "react-icons/bi"
import Period from "../../components/Props/Period"
import MissingBlock from "../../components/MissingBlock"
import { GiEvilBook } from "react-icons/gi"
import { GrHistory } from "react-icons/gr"
import Status from "../../components/Props/Status"
import Ids from "../../components/Props/Ids"
import AbstractWidget from '../../components/Widgets/AbstractWidget'
import { VscFileCode } from 'react-icons/vsc'
import ItemDataWidget from '../../components/Widgets/ItemDataWidget'

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
  const flattenedMilestones = cleanDeep(flatMap(milestones.map(e => e.entries)))

  return (
    <Layout>
      <Container variant="wrapper">
        <ItemHeader
          id={item.id}
          label={item.label}
          blurb={item.shortDescription}
          image={item.logo}
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

        <Tabs
          colorScheme='green'
          my={10}
          display='flex'
          flexDirection='column'
          maxW={'full'}
        >
          <TabList overflowY='scroll'>
            <Tab><Icon as={MdDashboard} mr={2} /> Oversikt</Tab>
            <Tab isDisabled><Icon as={GrHistory} mr={2} /> Historikk</Tab>
            <Tab isDisabled><Icon as={BiNetworkChart} mr={2} /> Graph</Tab>
            <Tab isDisabled><Icon as={GiEvilBook} mr={2} /> Dokumentasjon</Tab>
            <Spacer />
            <Tab><Icon as={VscFileCode} mr={2} /> Data</Tab>
          </TabList>

          <TabPanels mt={3}>
            <TabPanel>
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
                  <AbstractWidget value={item.referredToBy[0].body} />
                )}

                {(item.hasTeam || item.usedService || item.hasFile || item.link) && (
                  <GridItem
                    colSpan={[6, null, 3]}
                    borderRadius={"8"}
                    border={"1px solid"}
                    borderColor={"gray.200"}
                    boxShadow={"md"}
                    px="6"
                    pb={"6"}
                  >
                    {item.funding && <Funding stream={item.funding} />}

                    {item.hasTeam && item.hasTeam.map(team => (
                      <Team key={team.id} team={team} />
                    ))}

                    {item.usedService && (
                      <ResultedIn results={item.usedService} />
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

            <TabPanel>
              <ItemDataWidget value={item} />
            </TabPanel>

          </TabPanels>
        </Tabs>


      </Container>
    </Layout>
  )
}