import React, { useState } from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import useWindowSize from 'react-use/lib/useWindowSize'
import { Box, Container, Flex, Heading, Grid, SimpleGrid, Tag, Icon, Tabs, TabList, TabPanels, Tab, TabPanel, GridItem, List, ListItem, VStack, Spacer, Wrap, WrapItem, Avatar, Text, Button } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { groupQuery } from "../../lib/queries"
import ItemHeader from "../../components/Props/ItemHeader"
import { MdDashboard } from 'react-icons/md'
import { GrHistory } from 'react-icons/gr'
import MissingBlock from "../../components/Widgets/MissingBlock"
import { flatMap } from "lodash-es"
import Link from "../../components/Link"
import { DataTable } from "../../components/DataTable"
import AbstractWidget from '../../components/Widgets/AbstractWidget'
import { FaHatWizard } from 'react-icons/fa'
import Period from '../../components/Props/Period'
import ItemHeaderStatsWidget from '../../components/Props/ItemHeaderStatsWidget'
import Participants from '../../components/Props/Participants'

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/Timeline/MilestonesComponent'),
  { ssr: false }
)

const allActorsQuery = groq`
  *[_type in ['Group', 'Team']] {
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
  let timeline = await getClient(preview).fetch(groupQuery, { id: params.id, now: now })
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}

const columns = [
  {
    Header: "Felt",
    accessor: "label",
  },
  {
    Header: "Nivå (1-10)",
    accessor: "level",
    Cell: ({ row }) => (
      <Flex columnGap={1} alignItems="center">
        {[...Array(10)].map((x, i) =>
          <Box w={5} h={2} key={i} borderRadius={'25%'} bg={row.values.level > i ? colors[i] : 'gray.200'} />
        )}
        {row.values.level === 10 &&
          <Icon as={FaHatWizard} ml={2} color={'green.900'} />
        }
      </Flex>
    )
  },
];

export default function Person({ data }) {
  const [activeFilter, setActiveFilter] = useState(true)

  const { width, height } = useWindowSize()
  const { item, milestones } = data
  const flattenedMilestones = cleanDeep(flatMap(milestones.map(e => e.entries)))

  const handleActiveFilter = () => {
    setActiveFilter(!activeFilter)
  }

  return (
    <Layout>
      <Container variant="wrapper">
        <ItemHeader
          id={item.id}
          label={item.label}
          blurb={item.shortDescription}
          image={item.logo ?? item.image}
          continued={item.continued}
          continuedBy={item.continuedBy}
        >
          <Flex columnGap={'30px'} mt={4}>
            <Period size={'md'} period={item.period} />
            <ItemHeaderStatsWidget heading="Type" data={item.hasType} />
          </Flex>
        </ItemHeader>

        <Tabs colorScheme='green' my={10}>
          <TabList>
            <Tab><Icon as={MdDashboard} mr={2} /> Oversikt</Tab>
            <Tab><Icon as={GrHistory} mr={2} /> Historikk</Tab>
          </TabList>

          <TabPanels mt={3}>
            <TabPanel>
              <Grid
                maxW={'full'}
                gap={5}
                templateColumns='repeat(6, 1fr)'
              >


                {(item.subGroupOf?.length > 0 || item.hasSubGroup?.length > 0 || item.hasMember) && (
                  <GridItem
                    colSpan={6}
                    display={{ base: 'none', md: 'inherit' }}
                  >
                    {item.subGroupOf && (
                      <>
                        <Heading size={'lg'} mb={5}>Del av</Heading>
                        <Wrap maxW={'full'}>
                          {item.subGroupOf.map(group => (
                            <WrapItem key={group.id} pr={4} pb={4}>
                              <Flex>
                                <Avatar size='sm' name={group.label} />

                                <Box ml="3">
                                  <Text fontWeight='bold' my={"0"}>
                                    <Link href={`/group/${group.id}`}>
                                      {group.label}
                                    </Link>
                                  </Text>
                                </Box>
                              </Flex>
                            </WrapItem>
                          ))}
                        </Wrap>
                      </>
                    )}

                    {item.hasMember && (
                      <>
                        <Flex>
                          <Heading size={'lg'} mb={5}>Medlemmer</Heading>
                          {item.hasMember.filter(m => m.retired == "true").length > 0 && (<Button size={'xs'} ml={3} onClick={() => handleActiveFilter()}>{activeFilter ? 'Vis tidligere medlemmer' : 'Vis aktive'}</Button>)}
                        </Flex>
                        {item.hasMember && (
                          <Participants participants={item.hasMember.filter(m => {
                            return activeFilter ? m.retired != true : m
                          })} />
                        )}
                      </>
                    )}

                    {item.hasSubGroup && (
                      <>
                        <Heading size={'lg'} mb={5}>Har undergrupper</Heading>
                        <Wrap maxW={'full'}>
                          {item.hasSubGroup.map(group => (
                            <WrapItem key={group.id} pr={4} pb={4}>
                              <Flex>
                                <Avatar size='sm' name={group.label} />

                                <Box ml="3">
                                  <Text fontWeight='bold' my={"0"}>
                                    <Link href={`/group/${group.id}`}>
                                      {group.label}
                                    </Link>
                                  </Text>
                                </Box>
                              </Flex>
                            </WrapItem>
                          ))}
                        </Wrap>
                      </>
                    )}
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

                {item.mentions && (
                  <GridItem
                    colSpan={[6, null, 3]}
                  >
                    <Heading size={'lg'} mb={5}>Forbundet med</Heading>
                    <Box
                      borderRadius={"8"}
                      border={"1px solid"}
                      borderColor={"gray.200"}
                      boxShadow={"md"}
                      p={5}
                    >
                      <List>
                        {item.mentions.map(item => (
                          <ListItem key={item.id}>
                            {item.label}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </GridItem>
                )}

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
                <MissingBlock
                  heading="Historikk-komponenten er ikke ferdig..."
                  text='Alt tar tid, også visualisering av historien :-(. Det blir nok en enklere liste enn "tidslinjen".'
                  icon={GrHistory}
                />
              </Grid>
            </TabPanel>

          </TabPanels>
        </Tabs>

        {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
      </Container>
    </Layout>
  )
}