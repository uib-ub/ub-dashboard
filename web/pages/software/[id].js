import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, Grid, GridItem, Text, Icon, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { softwareQuery } from "../../lib/queries"
import MaintainedBy from "../../components/Props/MaintainedBy"
import { MdDashboard } from 'react-icons/md'
import { GiEvilBook } from 'react-icons/gi'
import { BiNetworkChart } from 'react-icons/bi'
import ItemHeader from "../../components/Props/ItemHeader"
import MissingBlock from "../../components/MissingBlock"
import { GrHistory } from "react-icons/gr"
import GraphComponent from '../../components/Graph/GraphComponent'

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const GraphComponentWithoutSSR = dynamic(
  () => import('../../components/Graph/GraphComponent'),
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
          label={item.label}
          blurb={item.shortDescription}
          image={item.image}
        >
        </ItemHeader>

        <Tabs colorScheme='green' my={10}>
          <TabList>
            <Tab><Icon as={MdDashboard} mr={2} /> Oversikt</Tab>
            <Tab><Icon as={GrHistory} mr={2} /> Historikk</Tab>
            <Tab><Icon as={BiNetworkChart} mr={2} /> Graph</Tab>
            <Tab><Icon as={GiEvilBook} mr={2} /> Dokumentasjon</Tab>
          </TabList>

          <TabPanels mt={3}>
            <TabPanel>
              <Grid
                my={10}
                maxW={'full'}
                gap={5}
                templateColumns='repeat(6, 1fr)'
              >
                {item.maintainedBy && (
                  <GridItem
                    colSpan={[6]}
                    border={'solid #eee 1px'}
                    borderRadius={3}
                    py={3}
                  >
                    <MaintainedBy maintainers={item.maintainedBy} />
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
                      <PortableText value={item.referredToBy[0].body} />
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
                <Box
                  className="graphpaper-background"
                  maxH={"50vh"} overflow={"hidden"}
                  my="5"
                  borderRadius={"8"}
                  border={"1px solid"}
                  borderColor={"gray.200"}
                  boxShadow={"lg"}
                >
                  <GraphComponentWithoutSSR
                    edges={graph.edges}
                    nodes={graph.nodes}
                  />
                </Box>
                <Box>
                  <pre>{JSON.stringify(graph, null, 2)}</pre>
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
                  heading="Dokumentasjonskomponenten er ikke ferdig..."
                  text="TODO: hent README eller annen lenket dokumentasjon fra Sanity"
                  icon={GiEvilBook}
                />
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>

      </Container>
    </Layout>
  )
}