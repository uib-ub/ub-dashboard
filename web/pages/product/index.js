import * as React from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Container, Grid, GridItem, Heading, Text, Flex, Tag } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Link from "next/link"
import Layout from "../../components/Layout"

const myQuery = groq`[
  ...*[_type in ['Product']] | order(timespan.beginOfTheBegin desc)  {
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
                <Link href={`/product/${item.id}`}>{item.label}</Link>
              </Heading>

              <Flex py={"2"} wrap={"wrap"}>
                {item.carriedOutBy && (
                  <Tag colorScheme={"orange"} mr={"2"} mb="2">{item.carriedOutBy[0].label}</Tag>
                )}
                {item.timespan?.edtf ? <Tag variant={"outline"} mr={"2"} mb="2">{item.timespan?.edtf}</Tag> : ''}
                {new Date(item.timespan?.endOfTheEnd) < now ? <Tag colorScheme={"red"} mr={"2"} mb="2">Avsluttet</Tag> : ''}
              </Flex>
              <Text noOfLines={4} fontSize={"xl"} m="0">{item.description ?? item.shortDescription}</Text>
            </GridItem>

          ))}
        </Grid>
      </Container>
    </Layout>
  )
}