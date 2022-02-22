import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, Grid, GridItem, Text, Icon, Tabs, TabList, TabPanels, Tab, TabPanel, Spacer } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { softwareQuery } from "../../lib/queries"
import MaintainedBy from "../../components/Props/MaintainedBy"
import { MdDashboard } from 'react-icons/md'
import { GiEvilBook } from 'react-icons/gi'
import { BiNetworkChart } from 'react-icons/bi'
import { GrHistory } from "react-icons/gr"
import { VscFileCode } from "react-icons/vsc"
import ItemHeader from "../../components/Props/ItemHeader"
import MissingBlock from "../../components/MissingBlock"
import AbstractWidget from '../../components/Widgets/AbstractWidget'
import ItemDataWidget from '../../components/Widgets/ItemDataWidget'
import ItemHeaderStatsWidget from "../../components/Props/ItemHeaderStatsWidget"
import ItemHeaderStatsAvatarWidget from "../../components/Props/ItemHeaderStatsAvatarWidget"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

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

        <ItemHeader
          id={item.id}
          label={item.label}
          blurb={item.shortDescription}
          image={item.logo}
        >
          <Flex columnGap={'30px'} mt={4}>
            <ItemHeaderStatsWidget data={item.hasType} heading="Type" />
            <ItemHeaderStatsWidget data={item.systemOwner} heading="Systemeier" />
            <ItemHeaderStatsWidget data={item.productOwner} heading="Produkteier" />
            <ItemHeaderStatsAvatarWidget data={item.maintainedBy} heading="Team" size="sm" />
          </Flex>
        </ItemHeader>

        <Tabs
          colorScheme='green'
          my={10}
          display='flex'
          flexDirection='column'
          maxW={'full'}
        >
          <TabList overflowX='scroll'>
            <Tab><Icon as={MdDashboard} mr={2} /> Oversikt</Tab>
            <Tab><Icon as={BiNetworkChart} mr={2} /> Graph</Tab>
            <Tab isDisabled><Icon as={GrHistory} mr={2} /> Historikk</Tab>
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

                {item.referredToBy && (
                  <AbstractWidget value={item.referredToBy[0].body} />
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
                  boxShadow={"lg"}
                  minHeight={'80vh'}
                >
                  <NodeFlowComponentWithoutSSR
                    data={graph}
                  />
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