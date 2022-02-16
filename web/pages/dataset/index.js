import * as React from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Grid, GridItem, Heading, Text, Flex, Tag, Image } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Link from "next/link"
import Layout from "../../components/Layout"
import { DataTable } from "../../components/DataTable"
import { urlFor } from "../../lib/sanity"

const myQuery = groq`[
  ...*[_type in ['Dataset'] && !(_id in path("drafts.**"))] | order(timespan.beginOfTheBegin desc)  {
    "id": _id,
    image,
    "name": label,
    "description": coalesce(shortDescription, pt::text(referredToBy[0].body), '–'),
    "owner": coalesce(maintainedBy[0]->.label, '–'),
  },
]`;

export const getStaticProps = async ({ preview = false }) => {
  const now = new Date()
  let data = await getClient(preview).fetch(myQuery, { now: now })
  /* data = cleanDeep(data) */

  return {
    props: {
      preview,
      data: data,
    },
  }
}

const columns = [
  {
    Header: "id",
    accessor: "id",
    isVisible: 'false'
  },
  {
    Header: "",
    accessor: "image",
    sortable: false,
    Cell: ({ row }) => (
      row.values.image ? (
        <Image
          border={'solid #eee 1px'}
          src={urlFor(row.values.image).url()}
          boxSize='50px'
          objectFit='cover'
        />
      ) :
        null
    )
  },
  {
    Header: "Navn",
    accessor: "name",
    Cell: ({ row }) => (<Link href={`/dataset/${row.values.id}`}>{row.values.name}</Link>)
  },
  {
    Header: "Beskrivelse",
    accessor: "description"
  },
  {
    Header: "Eier",
    accessor: "owner"
  }
];


export default function Datasets({ data }) {
  const now = new Date()

  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Datasett {data.length ? `(${data.length})` : ''}
        </Heading>

        {/* <Text fontSize={"2xl"}>Programvare...</Text> */}
        <Box my={5}>
          <DataTable columns={columns} data={data} />
        </Box>

        {/* <Grid maxW="full" templateColumns={'repeat(12, 1fr)'} my="12" gap={{ base: "3", md: "6" }}>
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
        </Grid> */}
      </Container>
    </Layout>
  )
}