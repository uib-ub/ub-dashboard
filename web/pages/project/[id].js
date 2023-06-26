import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Grid, GridItem, Heading, Icon, Image, Tabs, TabList, TabPanels, Tab, TabPanel, Spacer, Breadcrumb, BreadcrumbLink, BreadcrumbItem } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { projectQuery } from "../../lib/queries"
import Participants from "../../components/Props/Participants"
import Links from "../../components/Props/Links"
import Files from "../../components/Props/Files"
import Team from "../../components/Props/Team"
import { flatMap } from 'lodash-es'
import ResultedIn from "../../components/Props/ResultedIn"
import Status from "../../components/Props/Status"
import Funding from "../../components/Props/Funding"
import Ids from "../../components/Props/Ids"
import ItemHeader from "../../components/Props/ItemHeader"
import { MdDashboard } from 'react-icons/md'
import Period from "../../components/Props/Period"
import { BiNetworkChart } from "react-icons/bi"
import MissingBlock from "../../components/Widgets/MissingBlock"
import { GrHistory } from "react-icons/gr"
import { AiOutlineTeam } from "react-icons/ai"
import AbstractWidget from '../../components/Widgets/AbstractWidget'
import CurrentMembersWidget from '../../components/Widgets/CurrentMembersWidget'
import { VscFileCode } from 'react-icons/vsc'
import ItemDataWidget from '../../components/Widgets/ItemDataWidget'
import HasType from "../../components/Props/HasType"
import ItemHeaderStatsWidget from "../../components/Props/ItemHeaderStatsWidget"
import { urlFor } from '../../lib/sanity'


const MilestonesWithoutSSR = dynamic(
  () => import('../../components/Timeline/MilestonesComponent'),
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
        <Breadcrumb color={'GrayText'} mb={3}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/project'>prosjekt</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#' textTransform={'lowercase'}>
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <ItemHeader
          id={item.id}
          label={item.label}
          blurb={item.shortDescription}
          image={item.logo}
          continued={item.continued}
          continuedBy={item.continuedBy}
        >
          <Flex columnGap={'30px'} mt={4}>
            <Period size={'md'} period={item.period} />
            <Status size={'md'} status={item.status} />
            <Ids size={'md'} identifiers={item.identifier} />
            <ItemHeaderStatsWidget types={item.hasType} />
          </Flex>
        </ItemHeader>

        <Tabs
          colorScheme='green'
          my={10}
          display='flex'
          flexDirection='column'
          maxW={'full'}
        >
          <TabList>
            <Tab><Icon as={MdDashboard} mr={2} /> Oversikt</Tab>
            <Tab isDisabled><Icon as={GrHistory} mr={2} /> Historikk</Tab>
            <Tab isDisabled><Icon as={BiNetworkChart} mr={2} /> Graph</Tab>
            <Spacer />
            <Tab><Icon as={VscFileCode} mr={2} /> Data</Tab>
          </TabList>

          <TabPanels
            mt={3}
          >
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
                    {item.carriedOutBy && (
                      <Participants participants={item.carriedOutBy} />
                    )}

                    {item.hadParticipant && (
                      <Participants participants={item.hadParticipant} />
                    )}
                  </GridItem>
                )}

                {(item.resultedIn || item.hasFile || item.link) && (
                  <GridItem
                    colSpan={[6, null, 3]}
                  >

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

                {item.hasTeam && item.hasTeam.map(team => (
                  <GridItem
                    colSpan={[6]}
                  >
                    <Team key={team.id} data={team} />
                  </GridItem>
                ))}

                {item.image && (
                  <GridItem colSpan={3}>
                    <Heading size={'lg'} mb={5}>Forhåndsvisning</Heading>
                    <Image
                      border={'solid #eee 1px'}
                      borderRadius={3}
                      src={urlFor(item.image[0]).width(500).url()}
                      mb={"5"}

                      objectFit='contain'
                      alt=''
                    />
                  </GridItem>
                )}

                {flattenedMilestones.length > 1 && (
                  <GridItem
                    colSpan={6}
                    display={{ base: 'none', md: 'inherit' }}
                  >
                    <Heading size={'lg'} mb={5}>Tidslinje</Heading>
                    <Box
                      w="100%"
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
                  <GridItem colSpan={[6, null, 3]}>
                    <AbstractWidget value={item.referredToBy[0].body} />
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
              <ItemDataWidget value={item} />
            </TabPanel>

          </TabPanels>
        </Tabs>

      </Container>
    </Layout >
  )
}
