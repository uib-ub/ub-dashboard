import * as React from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Center, Container, Divider, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Link from "next/link"
import Layout from "../../components/Layout"


const myQuery = groq`[
  ...*[_type in ['Service'] && !(_id in path("drafts.**"))] | order(label asc)  {
    "id": _id,
    "label": label,
    shortDescription,
    "description": pt::text(referredToBy[0].body),
    "entries": [
      {
        "timestamp": $now,
        "text": "Nå",
      },
      ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
        "timestamp": timespan.beginOfTheBegin,
        "text": label,
      },
      {
        "timestamp": "1980-01-01T00:00:00.000Z",
        "text": "Steinalderen",
      },
    ]
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

export default function Services({ data }) {
  const now = new Date()

  return (
    <Layout>
      <Container variant="wrapper">
        <Heading>
          Tjenester {data.length ? `(${data.length})` : ''}
        </Heading>
        <Grid maxW="full" templateColumns={'repeat(12, 1fr)'} my="12" gap={{ sm: "3", md: "6" }}>
          {data.map(item => (
            <GridItem
              key={item.id}
              colSpan={{ sm: '12', md: "6", xl: '4' }}
              p={5}
              borderRadius={"8"}
              border={"1px solid"}
              borderColor={"gray.200"}
              boxShadow={"md"}
              bg={
                new Date(item.timespan?.endOfTheEnd) < now ? 'gray.100' : ''
              }
            >

              <Heading
                fontSize={['xl', '2xl', '2xl', '2xl', '3xl']}
                isTruncated
              >
                <Link href={`/service/${item.id}`}>{item.label}</Link>
              </Heading>

              <Text noOfLines={4} fontSize={"xl"} m="0">{item.description ?? item.shortDescription}</Text>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}