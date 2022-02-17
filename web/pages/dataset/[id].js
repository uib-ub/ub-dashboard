import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, Grid, GridItem, Text, Icon, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { datasetQuery } from "../../lib/queries"
import MaintainedBy from "../../components/Props/MaintainedBy"
import { MdDashboard, MdMenuBook } from 'react-icons/md'
import { BiNetworkChart } from 'react-icons/bi'
import ItemHeader from "../../components/Props/ItemHeader"
import MissingBlock from "../../components/MissingBlock"
import { GiEvilBook } from "react-icons/gi"
import { FaRegSadTear } from "react-icons/fa"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const allSoftwareQuery = groq`
  *[_type in ['Dataset']] {
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
  let timeline = await getClient(preview).fetch(datasetQuery, { id: params.id, now: now })
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}

export default function Dataset({ data }) {
  const { item } = data

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
                <GridItem
                  minHeight={'20vh'}
                  border={'solid #eee 1px'}
                  borderRadius={3}
                  colSpan={[6]}
                >
                  <MissingBlock
                    heading="Uffda, her mangler mye"
                    text="TODO: lag GROQ-spørringer og visualiser!"
                    icon={FaRegSadTear}
                  />
                </GridItem>

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
                      <PortableText blocks={item.referredToBy[0].body} />
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
    </Layout>
  )
}