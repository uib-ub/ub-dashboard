import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, Grid, SimpleGrid, Tag, Icon, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { actorQuery } from "../../lib/queries"
import ItemHeader from "../../components/Props/ItemHeader"
import { MdDashboard } from 'react-icons/md'
import { GrHistory } from 'react-icons/gr'
import MissingBlock from "../../components/MissingBlock"

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const allActorsQuery = groq`
  *[_type in ['Actor', 'Group', 'Team']] {
    _id,
  }
`;

export async function getStaticPaths() {
  const all = await getClient(false).fetch(allActorsQuery)
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
  let timeline = await getClient(preview).fetch(actorQuery, { id: params.id, now: now })
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}

export default function Person({ data }) {
  const { item, milestones } = data
  return (
    <Layout>
      <Container variant="wrapper">
        <ItemHeader
          label={item.label}
          image={item.image}
          blurb={item.shortDescription}
        >
        </ItemHeader>

        <Tabs colorScheme='green' my={10}>
          <TabList>
            <Tab><Icon as={MdDashboard} mr={2} /> Oversikt</Tab>
            <Tab><Icon as={GrHistory} mr={2} /> Historikk</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {item.competence && (
                <Box my={10}>
                  <Heading size={'md'} mb={2}>Kompetanse</Heading>
                  <Flex gap={3}>
                    {item.competence.map(i => (
                      <Tag key={i.id} size={'lg'}>
                        {i.label}
                      </Tag>
                    ))}
                  </Flex>
                </Box>
              )}

              <Box w="100%" mb={16} display={{ base: 'none', md: 'inherit' }}>
                <MilestonesWithoutSSR
                  mapping={{
                    category: 'label',
                    entries: 'entries'
                  }}
                  data={milestones}
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
                {item.referredToBy && (
                  <Box borderRadius={"8"} border={"1px solid"} borderColor={"gray.200"} boxShadow={"lg"} my={"15"} px="6" pb={"6"}>
                    <Box overflowY={"scroll"} maxH={"20vh"}>
                      <Heading as="h2" size={"md"} mt={4} borderBottom={"1px solid"} fontWeight={"light"}>Biografi</Heading>
                      <PortableText blocks={item.referredToBy[0].body} />
                    </Box>
                  </Box>
                )}
              </SimpleGrid>

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

          </TabPanels>
        </Tabs>


      </Container>
    </Layout>
  )
}