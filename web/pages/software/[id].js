import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, Grid, GridItem, Text, Icon, Tabs, TabList, TabPanels, Tab, TabPanel, Spacer, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { softwareQuery } from "../../lib/queries"
import { MdDashboard } from 'react-icons/md'
import { GiEvilBook } from 'react-icons/gi'
import { BiNetworkChart } from 'react-icons/bi'
import { GrHistory } from "react-icons/gr"
import { VscFileCode } from "react-icons/vsc"
import ItemHeader from "../../components/Props/ItemHeader"
import AbstractWidget from '../../components/Widgets/AbstractWidget'
import ItemDataWidget from '../../components/Widgets/ItemDataWidget'
import ItemHeaderStatsWidget from "../../components/Props/ItemHeaderStatsWidget"
import ItemHeaderStatsAvatarWidget from "../../components/Props/ItemHeaderStatsAvatarWidget"
import RepositoryInfo from '../../components/Repository/RepositoryInfo.client'
import NodeFlow from '../../components/NodeFlow'
const NodeFlowComponentWithoutSSR = dynamic(
  () => import('../../components/NodeFlow'),
  { ssr: false }
)

const allSoftwareQuery = groq`
  *[_type in ['Software']] {
    _id,
  }
`;

export async function getStaticPaths() {
  const all = await getClient(false).fetch(allSoftwareQuery)
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
  let timeline = await getClient(preview).fetch(softwareQuery, { id: params.id, now: now })
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}

export default function Software({ data }) {
  const { item, graph } = data

  return (
    <Layout>
      <Container variant="wrapper">
        <Breadcrumb color={'GrayText'} mb={3}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/software'>software</BreadcrumbLink>
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
        >
          <Flex columnGap={'30px'} mt={4}>
            <ItemHeaderStatsWidget data={item.hasType} heading="Type" />
            <ItemHeaderStatsWidget data={item.currentOrFormerSystemOwner?.[0]} heading="Systemeier" linkBase={"group"} />
            <ItemHeaderStatsWidget data={item.currentOrFormerManager?.[0]} heading="Forvalter" linkBase={"actor"} />
            <ItemHeaderStatsAvatarWidget data={item.currentOrFormerMaintainerTeam?.[0]} heading="Team" size="sm" />
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
            <Tab><Icon as={BiNetworkChart} mr={2} /> Graph</Tab>
            {item.referredToBy && (
              <Tab><Icon as={GiEvilBook} mr={2} /> Dokumentasjon</Tab>
            )}
            {/* <Tab isDisabled><Icon as={GrHistory} mr={2} /> Historikk</Tab> */}
            <Spacer />
            <Tab><Icon as={VscFileCode} mr={2} /> Data</Tab>
          </TabList>

          <TabPanels mt={3}>
            <TabPanel>
              {item.hasSoftwarePart && (
                <Tabs
                  flexGrow={0}
                  orientation='vertical'
                  size={'sm'}
                  variant={'unstyled'}
                  isLazy
                >
                  <TabList>
                    {item.hasSoftwarePart && item.hasSoftwarePart.map(part => (
                      <Tab _selected={{ color: 'white', bg: 'blue.500' }} key={part.id}>{part.label}</Tab>
                    ))}
                  </TabList>

                  <TabPanels overflowX='scroll'>
                    {item.hasSoftwarePart && item.hasSoftwarePart.map(part => (
                      <TabPanel key={part.id} mb={5} ml={5} overflowX='scroll'>
                        {part.hostedBy && part.hostedBy.map(i => (
                          <Box key={i.id} mb={10}>
                            <Heading size={'md'}>
                              <a href={i.url} target={'_blank'} rel={'noreferrer'}>{i.label} - {i.componentOf.label}</a>
                            </Heading>
                            {i.mainId && i.componentOf.label && (
                              <RepositoryInfo id={i.mainId} host={i.componentOf.label} />
                            )}
                          </Box>
                        ))}

                        {/* {part.runBy && part.runBy.map(i => (
                          <Box key={i.id} ml={5}>
                            <Heading size={'sm'}>
                              {i.label} - {i.providedBy.label}
                            </Heading>
                            <Text size={'sm'} ml={5} my={1}>
                              <a href={i.url} target={'_blank'} rel={'noreferrer'}>
                                {i.url}
                              </a>
                            </Text>
                          </Box>
                        ))}

                        {part.provisionedBy && part.provisionedBy.map(i => (
                          <Box key={i.id} ml={5}>
                            <Heading size={'md'}>
                              {i.label}
                            </Heading>
                            <Text size={'sm'} ml={5} my={1}>
                              <a href={i.url} target={'_blank'} rel={'noreferrer'}>
                                {i.url}
                              </a>
                            </Text>
                          </Box>
                        ))} */}
                      </TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              )}
            </TabPanel>

            <TabPanel>
              <Grid
                minHeight={'20vh'}
                border={'solid #eee 1px'}
                borderRadius={3}
              >
                <Box
                  boxShadow={"lg"}
                  minHeight={'90vh'}
                >
                  <NodeFlowComponentWithoutSSR
                    data={graph}
                  />
                </Box>
              </Grid>
            </TabPanel>

            {item.referredToBy && (
              <TabPanel>
                <Grid
                  minHeight={'20vh'}
                  border={'solid #eee 1px'}
                  borderRadius={3}
                >
                  {item.referredToBy && (
                    <AbstractWidget value={item.referredToBy[0].body} />
                  )}
                </Grid>
              </TabPanel>
            )}

            {/* <TabPanel>
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
            </TabPanel> */}

            <TabPanel>
              <ItemDataWidget value={item} />
            </TabPanel>

          </TabPanels>
        </Tabs>

      </Container>
    </Layout>
  )
}