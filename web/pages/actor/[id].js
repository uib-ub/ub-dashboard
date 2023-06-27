/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import useWindowSize from 'react-use/lib/useWindowSize'
import { Box, Container, Flex, Heading, Grid, SimpleGrid, Image, Tag, Icon, Tabs, TabList, TabPanels, Tab, TabPanel, GridItem, List, ListItem, VStack, Spacer, Wrap, WrapItem, Avatar, Text, Button, Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, OrderedList, ListIcon, useColorMode } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { actorQuery } from "../../lib/queries"
import ItemHeader from "../../components/Props/ItemHeader"
import { MdDashboard } from 'react-icons/md'
import { GrHistory, GrCode, GrFormEdit, GrCalendar } from 'react-icons/gr'
import { flatMap, groupBy, sortBy } from "lodash-es"
import Link from "../../components/Link"
import { DataTable } from "../../components/DataTable"
import AbstractWidget from '../../components/Widgets/AbstractWidget'
import { FaHatWizard } from 'react-icons/fa'
import Period from '../../components/Props/Period'
import ItemHeaderStatsWidget from '../../components/Props/ItemHeaderStatsWidget'

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/Timeline/MilestonesComponent'),
  { ssr: false }
)

const ConfettiWithoutSSR = dynamic(
  () => import('react-confetti'),
  { ssr: false }
)

const studio = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL

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

const MemberOfTable = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState(checkMembership(data ?? []))
  const columns = [
    {
      Header: "",
      accessor: "image",
      isVisible: 'false'
    },
    {
      Header: "Navn",
      accessor: "label",
      Cell: ({ row }) => (
        <Flex columnGap={3} alignItems={'center'}>
          {row.values.image ? (
            <Image
              border={'solid #eee 1px'}
              borderRadius='full'
              src={urlFor(row.values.image).url()}
              boxSize='30px'
              objectFit='cover'
              alt=''
            />
          ) :
            <Icon viewBox='0 0 200 200' w={'30px'} h={'30px'} color='gray.200'>
              <path
                fill='currentColor'
                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
              />
            </Icon>
          }
          <Link href={`/group/${row.values.id}`}>
            {row.values.label}
          </Link>
        </Flex>
      )
    },
    {
      Header: "Rolle",
      accessor: "hasMember",
      Cell: ({ row }) => (
        <Flex rowGap={3} direction="column">
          {row.values.hasMember?.map((t, i) => (
            <Box key={i}>
              {t.assignedRole?.map((r, i) => (
                <Tag key={i} size={'sm'} variant='solid' colorScheme='gray'>
                  {r.label} {t.timespan ? `(${t.timespan})` : null}
                </Tag>
              ))}
            </Box>
          ))}
        </Flex>
      )
    },
    {
      Header: "Type",
      accessor: "hasType",
      Cell: ({ row }) => (
        <Flex rowGap={3} direction="column">
          {row.values.hasType?.map((t, i) => (
            <Box key={i}>
              {t.label}
            </Box>
          ))}
        </Flex>
      )
    },
    {
      Header: "Periode",
      accessor: "timespan"
    },
    {
      Header: "",
      accessor: "id",
      Cell: ({ row }) => (
        <a href={`${studio}/desk/intent/edit/id=${row.values.id}`} target={'_blank'} rel={'noreferrer'}>
          <Button leftIcon={<Icon as={GrFormEdit} />} size={'sm'}>
            Redigér
          </Button>
        </a>
      )
    },
  ];

  const handleActiveFilter = () => {
    setActiveFilter(!activeFilter)
  }

  return (
    <>
      <Flex align={'baseline'} mb={5}>
        <Heading size={'lg'}>Medlem av</Heading>
        {data.some(m => m.active === true) && (
          <Button size={'sm'} ml={3} onClick={() => handleActiveFilter()}>
            {activeFilter ? 'Vis inaktive grupper' : 'Vis aktive'}
          </Button>
        )}
      </Flex>
      <DataTable size='sm' columns={columns} data={data.filter(m => {
        return activeFilter ? m.active != true : m
      })} />
    </>
  )
}

const CurrentOrFormerManagerOfTable = ({ data }) => {
  const columns = [
    {
      Header: "Navn",
      accessor: "label",
      Cell: ({ row }) => (
        <Link href={`/software/${row.values.id}`}>
          {row.values.label}
        </Link>
      )
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Periode",
      accessor: "timespan"
    },
    {
      Header: "",
      accessor: "id",
      Cell: ({ row }) => (
        <a href={`${studio}/desk/intent/edit/id=${row.values.id}`} target={'_blank'} rel={'noreferrer'}>
          <Button leftIcon={<Icon as={GrFormEdit} />} size={'sm'}>
            Redigér
          </Button>
        </a>
      )
    },
  ];

  return (
    <>
      <Heading size={'lg'} mb={5}>Forvaltningsansvar</Heading>
      <DataTable size='sm' columns={columns} data={data} />
    </>
  )
}

const checkMembership = (arr) => {
  if (arr.every(m => m.active === true)) {
    return false
  }
  if (!arr.every(m => m.active === true) && arr.some(m => m.active === true)) {
    return true
  }
  return false
}

export default function Person({ data }) {
  const { colorMode } = useColorMode()
  const { width, height } = useWindowSize()
  const { item, milestones } = data
  const flattenedMilestones = cleanDeep(flatMap(milestones.map(e => e.entries)))
  const sortedByYear = sortBy(flattenedMilestones, ['timestamp'])
  const groupedByYear = groupBy(sortedByYear, function (item) {
    if (!item.timestamp) return 'Udatert'
    return item.timestamp.substring(0, 4);
  })

  return (
    <Layout>
      {item.label === "Tarje Sælen Lavik" && (
        <ConfettiWithoutSSR
          recycle={false}
          numberOfPieces={1000}
          width={width}
          height={height}
        />
      )}

      <Container variant="wrapper">
        <Breadcrumb color={'GrayText'} mb={3}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/actor'>personer</BreadcrumbLink>
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
          image={item.logo ?? item.image}
          quote={item.quote}
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
            <Spacer />
            <Tab><Icon as={GrCode} mr={2} /> Data</Tab>
          </TabList>

          <TabPanels mt={3}>
            <TabPanel>
              <Grid
                maxW={'full'}
                gap={5}
                templateColumns='repeat(6, 1fr)'
              >
                {item.currentOrFormerManagerOf && (
                  <GridItem
                    colSpan={[6, null, 3]}
                    borderRadius={"8"}
                    border={"1px solid"}
                    borderColor={"gray.200"}
                    boxShadow={"md"}
                    p={5}
                  >
                    <CurrentOrFormerManagerOfTable data={item.currentOrFormerManagerOf} />
                  </GridItem>
                )}

                {item.hasSkill && (
                  <GridItem
                    colSpan={[6, null, 3]}
                    borderRadius={"8"}
                    border={"1px solid"}
                    borderColor={"gray.200"}
                    boxShadow={"md"}
                    p={5}
                  >
                    <Heading size={'lg'} mb={5}>Kompetanse</Heading>
                    <DataTable columns={columns} data={item.hasSkill} size="sm" />
                  </GridItem>
                )}

                {item.memberOf && (
                  <GridItem
                    colSpan={[6]}
                    borderRadius={"8"}
                    border={"1px solid"}
                    borderColor={"gray.200"}
                    boxShadow={"md"}
                    p={5}
                  >
                    <MemberOfTable data={item.memberOf} />
                  </GridItem>
                )}

                {item.referredToBy && (
                  <GridItem
                    colSpan={[3]}
                    borderRadius={"8"}
                    border={"1px solid"}
                    borderColor={"gray.200"}
                    boxShadow={"md"}
                    p={5}
                  >
                    <AbstractWidget value={item.referredToBy[0].body} />
                  </GridItem>
                )}

                {item.mentions && (
                  <GridItem
                    colSpan={[6, null, 3]}
                    borderRadius={"8"}
                    border={"1px solid"}
                    borderColor={"gray.200"}
                    boxShadow={"md"}
                    p={5}
                  >
                    <Heading size={'lg'} mb={5}>Forbundet med</Heading>
                    <List>
                      {item.mentions.map(item => (
                        <ListItem key={item.id}>
                          {item.label}
                        </ListItem>
                      ))}
                    </List>
                  </GridItem>
                )}
              </Grid>
            </TabPanel>

            <TabPanel>
              <Grid
                minHeight={'20vh'}
              >
                {groupedByYear && Object.entries(groupedByYear).reverse().map(([key, value]) => (
                  <section key={key}>
                    <OrderedList
                      borderLeft={'solid #ccc 1px'}
                      listStyleType={'none'}
                      display={'flex'}
                      flexDirection={'column'}
                      gap={4}
                    >
                      <ListItem
                        display={'flex'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        bgColor={colorMode === 'light' ? '#fff' : 'rgb(26, 32, 44)'}
                        borderRadius={'sm'}
                        px={1}
                        pt={1}
                        w={'fit-content'}
                        fontWeight={'bold'}
                        color={'gray.500'}
                        ml={'-22px'}
                        transform={'translateY(8px)'}
                        justifyContent={'center'}
                        boxShadow={colorMode === 'light' ? '0 0 0 8px #fff' : '0 0 0 8px rgb(26, 32, 44)'}
                      >
                        {key}
                      </ListItem>
                      {value.reverce().map(e => (
                        <ListItem
                          key={e.key}
                          display={'flex'}
                          gap={2}
                          alignItems={'start'}
                        >
                          <ListIcon
                            as={GrCalendar}
                            bgColor={'red.400'}
                            borderRadius={'full'}
                            p={'2px'}
                            w={7}
                            h={7}
                            ml={'-14px'}
                            boxShadow={colorMode === 'light' ? '0 0 0 10px #fff' : '0 0 0 10px rgb(26, 32, 44)'}
                          />

                          <Flex direction={'column'}>
                            <Text fontWeight={'semibold'} m={0}>
                              {e.text}
                            </Text>
                            <Box color={'gray.500'}>
                              <time>{e.period}</time>
                            </Box>
                          </Flex>
                          {e.description && (<Box
                            w={'full'}
                            ml={10}
                            border={'1px solid'}
                            borderRadius={'lg'}
                            px={4}
                            borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
                          >
                            <Text>I've sent him the assignment we discussed recently, he is coming back to us this week. Regarding to our last call, I really enjoyed talking to him and so far he has the profile we are looking for. Can't wait to see his technical test, I'll keep you posted and we'll debrief it all together!😊</Text>
                          </Box>)}
                        </ListItem>
                      ))}
                    </OrderedList>
                  </section>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel>
              <Grid
                minHeight={'20vh'}
                border={'solid #eee 1px'}
                borderRadius={3}
              >
                <pre>{JSON.stringify(milestones, null, 2)}</pre>
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>

      </Container>
    </Layout>
  )
}