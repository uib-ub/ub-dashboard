import * as React from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, Image } from '@chakra-ui/react'
import Link from "next/link"
import Layout from "../../components/Layout"
import { DataTable } from "../../components/DataTable"
import { urlFor } from "../../lib/sanity"

const myQuery = groq`[
  ...*[_type in ['Software'] && !(_id in path("drafts.**"))] | order(timespan.beginOfTheBegin desc)  {
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
    isVisible: 'false'
  },
  {
    Header: "Navn",
    accessor: "name",
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
        <Link href={`/software/${row.values.id}`}>
          {row.values.name}
        </Link>
      </Flex>
    )
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


export default function Softwares({ data }) {
  const now = new Date()

  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Programvare {data.length ? `(${data.length})` : ''}
        </Heading>

        {/* <Text fontSize={"2xl"}>Programvare...</Text> */}
        <Box my={5}>
          <DataTable columns={columns} data={data} />
        </Box>
      </Container>
    </Layout>
  )
}