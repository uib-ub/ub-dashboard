import React, { useState } from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Button, Container, Divider, Flex, Grid, GridItem, Heading, Icon, Image, Spacer, StatHelpText, StatNumber, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Link from "next/link"
import Layout from "../../components/Layout"
import Status from "../../components/Props/Status"
import Funding from "../../components/Props/Funding"
import Period from "../../components/Props/Period"
import HasType from "../../components/Props/HasType"
import { DataTable } from '../../components/DataTable'
import { GrFormEdit, GrHistory } from 'react-icons/gr'
import { MdDashboard } from 'react-icons/md'
import millify from 'millify'
import { BsCardHeading, BsListUl } from 'react-icons/bs'

const studio = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL
const myQuery = groq`[
  ...*[_type in ['Project'] && !(_id in path("drafts.**"))] | order(timespan.beginOfTheBegin desc)  {
    "id": _id,
    "label": label,
    hasType[]-> {
      "id": _id,
      label
    },
    status,
    timespan,
    "description": pt::text(referredToBy[0].body),
    carriedOutBy[] {
      "id": assignedActor->._id,
      "label": assignedActor->.label
    },
    "funding": activityStream[]-> {
      _type == 'FundingActivity' =>  {
        "id": _id,
        "type": _type,
        label,
        "awarder": awarder->label,
        "amount": fundingAmount.value,
        "currency": fundingAmount.hasCurrency->label,
        "period": timespan.edtf,
      }
    },
  },
]`;

export const getStaticProps = async ({ preview = false }) => {
  const now = new Date()
  let data = await getClient(preview).fetch(myQuery, { now: now })
  data = cleanDeep(data)

  return {
    props: {
      preview,
      data: data,
    },
  }
}

export default function Projects({ data }) {
  const [activeFilter, setActiveFilter] = useState(false)
  const bg = useColorModeValue('gray.100', 'gray.600')

  const handleActiveFilter = () => {
    setActiveFilter(!activeFilter)
  }

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
      accessor: "timespan.edtf"
    },
    {
      Header: "Finansiering",
      accessor: "funding",
      Cell: ({ row }) => (
        <Flex rowGap={3} direction={'column'}>
          {row.values.funding?.map((f, i) => (
            <Box key={i}>
              <StatNumber>{f.amount > 999999.99 ? millify(f.amount, { precision: 2, decimalSeparator: ',', space: true, units: ['', '', 'MILL', 'MRD'] }) : f.amount}  {f.currency}</StatNumber>
              <StatHelpText><strong>{f.awarder}</strong> ({f.period})</StatHelpText>
            </Box>
          ))}
        </Flex>

      )
    },
    {
      Header: "Beskrivelse",
      accessor: "description"
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

  const now = new Date()
  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Prosjekt {data.length ? `(${data.length})` : ''}
        </Heading>
        <Text fontSize={"2xl"}>Prosjekt-oversikten inkluderer også prosjekt UB-dev ikke har vært involvert i, men som vi har en kobling til på en eller annen måte.</Text>

        <Tabs lazy colorScheme='green' my={10}>
          <TabList>
            <Tab><Icon as={BsCardHeading} mr={2} /> Kort</Tab>
            <Tab><Icon as={BsListUl} mr={2} /> Liste</Tab>
          </TabList>

          <TabPanels mt={3}>
            <TabPanel>
              <Box my={5}>
                <Flex>
                  <Button mr={3} onClick={() => handleActiveFilter()}>{activeFilter ? 'Vis alle' : 'Vis aktive'}</Button>
                  {/* <Button mr={3} isDisabled>Vis UBBs</Button> */}
                </Flex>

                <Grid
                  maxW="full"
                  templateColumns={'repeat(12, 1fr)'}
                  my="12"
                  gap={{ base: "3", md: "6" }}
                >
                  {data.filter(f => { return activeFilter ? f.status == 'ongoing' : f }).map(item => (
                    <GridItem
                      key={item.id}
                      colSpan={{ base: '12', md: "6", xl: '4' }}
                      p={5}
                      borderRadius={"8"}
                      border={"1px solid"}
                      borderColor={"gray.200"}
                      boxShadow={"md"}
                      bg={
                        ['rejected', 'completed'].includes(item.status) ? bg : ''
                      }
                    >
                      <Heading
                        fontSize={['xl', '2xl', '2xl', '2xl', '3xl']}
                      >
                        <Link href={`/project/${item.id}`}>{item.label}</Link>
                      </Heading>

                      <Text noOfLines={4} fontSize={"xl"} m="0">{item.description ?? item.shortDescription}</Text>

                      <Divider my={3} />

                      <Flex wrap={"wrap"} columnGap={'20px'} rowGap={'10px'}>
                        {item.funding && <Funding stream={item.funding} />}

                        {item.timespan?.edtf &&
                          <Period period={item.timespan?.edtf} />
                        }

                        {item.status &&
                          <Status status={item.status} />
                        }

                        {!item.status && new Date(item.timespan?.endOfTheEnd) < now ? <Tag colorScheme={"red"} mr={"2"} mb="2">completed or overdue</Tag> : ''}

                        {item.hasType && (
                          <HasType types={item.hasType} />
                        )}

                        {item.carriedOutBy && (
                          <VStack spacing={1} align={'flex-start'}>
                            <Heading fontSize={'md'} color={'gray.600'}>Eier</Heading>
                            <Flex>
                              {item.carriedOutBy.map(tag => (
                                <Tag key={tag.id} colorScheme={'orange'} mr={"2"} mb="2">{tag.label}</Tag>
                              ))}
                            </Flex>
                          </VStack>
                        )}
                      </Flex>
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            </TabPanel>

            <TabPanel>
              <Box my={5}>
                <DataTable size='sm' columns={columns} data={data} />
              </Box>
            </TabPanel>
          </TabPanels>

        </Tabs>
      </Container>
    </Layout>
  )
}