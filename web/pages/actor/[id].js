import React, { useState } from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import useWindowSize from 'react-use/lib/useWindowSize'
import { Box, Container, Flex, Heading, Grid, SimpleGrid, Tag, Icon, Tabs, TabList, TabPanels, Tab, TabPanel, GridItem, List, ListItem, VStack, Spacer, Wrap, WrapItem, Avatar, Text, Button, Badge } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { PortableText } from "../../lib/sanity"
import { actorQuery } from "../../lib/queries"
import ItemHeader from "../../components/Props/ItemHeader"
import { MdDashboard } from 'react-icons/md'
import { GrHistory, GrCode } from 'react-icons/gr'
import { BsQuestionDiamond } from 'react-icons/bs'
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

const ConfettiWithoutSSR = dynamic(
  () => import('react-confetti'),
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

const colors = [
  'red.600',
  'red.500',
  'yellow.500',
  'yellow.400',
  'yellow.300',
  'green.300',
  'green.400',
  'green.500',
  'green.600',
  'green.700',
]

const columns = [
  {
    Header: "Felt",
    accessor: "label",
  },
  {
    Header: "Niv?? (1-10)",
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


const checkMembership = (arr) => {
  if (arr.every(m => m.retired === true)) {
    return false
  }
  if (!arr.every(m => m.retired === true) && arr.some(m => m.retired === true)) {
    return true
  }
  return false
}

export default function Person({ data }) {
  const [activeFilter, setActiveFilter] = useState(checkMembership(data.item.memberOf ?? []))

  const { width, height } = useWindowSize()
  const { item, milestones } = data
  const flattenedMilestones = cleanDeep(flatMap(milestones.map(e => e.entries)))

  const handleActiveFilter = () => {
    setActiveFilter(!activeFilter)
  }

  return (
    <Layout>

      {item.label === "Tarje S??len Lavik" && (
        <ConfettiWithoutSSR
          recycle={false}
          numberOfPieces={1000}
          width={width}
          height={height}
        />
      )}

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
            <Tab><Icon as={GrCode} mr={2} /> Data</Tab>
          </TabList>

          <TabPanels mt={3}>
            <TabPanel>
              <Grid
                maxW={'full'}
                gap={5}
                templateColumns='repeat(6, 1fr)'
              >

                <GridItem
                  colSpan={6}
                  display={{ base: 'none', md: 'inherit' }}
                >

                  {item.memberOf && (
                    <>
                      <Flex>
                        <Heading size={'lg'} mb={5}>Medlem av</Heading>
                        {item.memberOf.some(m => m.retired === true) && (
                          <Button size={'xs'} ml={3} onClick={() => handleActiveFilter()}>
                            {activeFilter ? 'Vis inaktive grupper' : 'Vis aktive'}
                          </Button>
                        )}
                      </Flex>
                      <Wrap maxW={'full'}>
                        {item.memberOf.filter(m => {
                          return activeFilter ? m.retired != true : m
                        }).map(group => (
                          <WrapItem key={group.id} pr={4} pb={4}>
                            <Flex>
                              <Avatar size='sm' name={group.label} />

                              <Box ml="3">
                                <Text fontWeight='bold' my={"0"}>
                                  <Link href={`/group/${group.id}`}>
                                    {group.label}
                                  </Link>
                                </Text>
                                <Text my={"0"}>
                                  {group.hasType && group.hasType.map(type => (
                                    <Tag>{type.label}</Tag>
                                  ))}
                                </Text>
                                <Text my={"0"} fontSize={'sm'}>
                                  {group.timespan}
                                </Text>
                              </Box>
                            </Flex>
                          </WrapItem>)
                        )}
                      </Wrap>
                    </>
                  )}


                  {/* {item.memberOf && (
                    <Wrap maxW={'full'}>
                      {item.memberOf.map(group => (
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
                    </Wrap >
                  )} */}

                  {!item.memberOf && (
                    <Box
                      minHeight={'20vh'}
                      border={'solid #eee 1px'}
                      borderRadius={3}
                    >
                      <MissingBlock
                        heading="Ingen n??v??rende eller registrerte medlemskap"
                        text='Alt kan registreres, alt kan repeteres, alt kan reserveres, alt kan ...'
                        icon={BsQuestionDiamond}
                      />
                    </Box>
                  )}
                </GridItem>

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

                {item.hasSkill && (
                  <GridItem
                    colSpan={[6, null, 3]}
                  >
                    <Heading size={'lg'} mb={5}>Kompetanse</Heading>
                    <Box
                      borderRadius={"8"}
                      border={"1px solid"}
                      borderColor={"gray.200"}
                      boxShadow={"md"}
                      p={5}
                    >

                      <DataTable columns={columns} data={item.hasSkill} size="sm" />

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
                  text='Alt tar tid, ogs?? visualisering av historien :-(. Det blir nok en enklere liste enn "tidslinjen".'
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
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>

      </Container>
    </Layout>
  )
}