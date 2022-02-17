import React, { useState } from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Button, Container, Divider, Flex, Grid, GridItem, Heading, Tag, Text, useColorModeValue } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Link from "next/link"
import Layout from "../../components/Layout"
import Status from "../../components/Props/Status"
import Funding from "../../components/Props/Funding"
import Period from "../../components/Props/Period"

const myQuery = groq`[
  ...*[_type in ['Project'] && !(_id in path("drafts.**"))] | order(timespan.beginOfTheBegin desc)  {
    "id": _id,
    "label": label,
    status,
    timespan,
    "description": pt::text(referredToBy[0].body),
    carriedOutBy[]->,
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

  const now = new Date()
  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Prosjekt {data.length ? `(${data.length})` : ''}
        </Heading>
        <Text fontSize={"2xl"}>Prosjekt-oversikten inkluderer også prosjekt UB-dev ikke har vært involvert i, men som vi har en kobling til på en eller annen måte.</Text>

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
                isTruncated
              >
                <Link href={`/project/${item.id}`}>{item.label}</Link>
              </Heading>

              <Text noOfLines={4} fontSize={"xl"} m="0">{item.description ?? item.shortDescription}</Text>

              {item.carriedOutBy && (
                <Tag colorScheme={"orange"} mr={"2"} mb="2">{item.carriedOutBy[0].label}</Tag>
              )}

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
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}