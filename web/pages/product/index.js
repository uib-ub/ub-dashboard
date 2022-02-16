import * as React from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Container, Grid, GridItem, Heading, Text, Flex, Tag, Divider } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Link from "next/link"
import Layout from "../../components/Layout"
import Period from "../../components/Props/Period"
import Funding from "../../components/Props/Funding"
import Status from "../../components/Props/Status"

const myQuery = groq`[
  ...*[_type in ['Product'] && !(_id in path("drafts.**"))] | order(timespan.beginOfTheBegin desc)  {
    "id": _id,
    "label": label,
    timespan,
    "description": pt::text(referredToBy[0].body),
    carriedOutBy[]->,
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

export default function Products({ data }) {
  const now = new Date()

  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Produkt {data.length ? `(${data.length})` : ''}
        </Heading>

        <Text fontSize={"2xl"}>Produkt som definert nå er digitale produkt tilgjengelig på nettet.</Text>

        <Grid maxW="full" templateColumns={'repeat(12, 1fr)'} my="12" gap={{ base: "3", md: "6" }}>
          {data.map(item => (
            <GridItem
              key={item.id}
              colSpan={{ base: '12', md: "6", xl: '4' }}
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
                <Link href={`/product/${item.id}`}>{item.label}</Link>
              </Heading>

              <Text noOfLines={4} fontSize={"xl"} m="0">{item.description ?? item.shortDescription}</Text>

              <Divider my={3} />

              <Flex wrap={"wrap"} columnGap={'20px'}>
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