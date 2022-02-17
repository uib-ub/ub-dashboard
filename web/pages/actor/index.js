import * as React from "react"
import dynamic from 'next/dynamic'
// import { Milestones } from 'react-milestones-vis'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Center, Container, Divider, Flex, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Head from "next/head"
import Link from "next/link"
import Layout from "../../components/Layout"
import { DataTable } from '../../components/DataTable'
import { urlFor } from '../../lib/sanity'

const MilestonesWithoutSSR = dynamic(
  () => import('../../components/MilestonesComponent'),
  { ssr: false }
)

const myQuery = groq`[
  ...*[_type in ['Actor', 'Group'] && !(_id in path("drafts.**"))] | order(label asc)  {
    "id": _id,
    "type": _type,
    "label": label,
    image,
    shortDescription,
    "description": pt::text(referredToBy[0].body),
  },
]`

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

const columns = [
  {
    Header: "id",
    accessor: "id",
    isVisible: 'false'
  },
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
            src={urlFor(row.values.image).url()}
            boxSize='30px'
            objectFit='cover'
            alt=''
          />
        ) :
          <Box boxSize='30px' borderRadius={'50%'} bg={'gray.100'}></Box>
        }
        <Link href={`/actor/${row.values.id}`}>
          {row.values.label}
        </Link>
      </Flex>
    )
  },
  {
    Header: "Beskrivelse",
    accessor: "description"
  },
  {
    Header: "Type",
    accessor: "type"
  }
];

export default function Persons({ data }) {
  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Personer {data.length ? `(${data.length})` : ''}
        </Heading>

        <Box my={5}>
          <DataTable columns={columns} data={data} />
        </Box>

      </Container>
    </Layout>
  )
}
{/* <Grid key={item.id} maxW="full" templateColumns={'repeat(12, 1fr)'} my="5" gap={{ base: "3", md: "6" }}>
            <GridItem colSpan={{ base: '12', md: "12" }}>
              <Heading size="lg"><Link href={`/actor/${item.id}`}>{item.label}</Link></Heading>
              <Text noOfLines={4} fontSize={"xl"} m="0">{item.description ?? item.shortDescription}</Text>
            </GridItem>
          </Grid> */}