import * as React from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Heading, Text, Flex, Image, Icon } from '@chakra-ui/react'
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
    accessor: "logo",
    isVisible: 'false'
  },
  {
    Header: "Navn",
    accessor: "name",
    Cell: ({ row }) => (
      <Flex columnGap={3} alignItems={'center'}>
        {row.values.logo ? (
          <Image
            border={'solid #eee 1px'}
            borderRadius='full'
            src={urlFor(row.values.logo).url()}
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
        <Link href={`/dataset/${row.values.id}`}>
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

      </Container>
    </Layout>
  )
}