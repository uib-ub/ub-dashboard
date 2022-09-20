import * as React from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Button, Container, Flex, Heading, Icon, IconButton, Image } from '@chakra-ui/react'
import Link from "next/link"
import Layout from "../../components/Layout"
import { DataTable } from "../../components/DataTable"
import { urlFor } from "../../lib/sanity"
import { GrFormEdit } from 'react-icons/gr'
import { useState } from 'react'

const studio = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL

const allSoftwareQuery = groq`[
  ...*[_type in ['Software'] && !(_id in path("drafts.**"))] | order(currentOrFormerMaintainerTeam[0].assignedActor->.label asc)  {
    ...,
    "id": _id,
    "description": coalesce(shortDescription, pt::text(referredToBy[0].body), '–'),
    "manager": coalesce(currentOrFormerManager[0].assignedActor->.label, '–'),
    "team": coalesce(
      currentOrFormerMaintainerTeam[0].assignedActor->.label, 
      externalSoftware, 
      '–'
    ),
  },
]`

export const getStaticProps = async ({ preview = false }) => {
  const now = new Date()
  let data = await getClient(preview).fetch(allSoftwareQuery, { now: now })

  return {
    props: {
      preview,
      data: data,
    },
  }
}

const columns = [
  {
    Header: "",
    accessor: "logo",
    isVisible: 'false'
  },
  {
    Header: "Navn",
    accessor: "label",
    Cell: ({ row }) => (
      <Flex columnGap={3} alignItems={'center'}>
        {row.values.logo ? (
          <Image
            border={'solid #eee 1px'}
            src={urlFor(row.values.logo).url()}
            boxSize='30px'
            objectFit='cover'
            alt=''
          />
        ) :
          <Box boxSize='30px' borderRadius={'50%'} bg={'gray.100'}></Box>
        }
        <Link href={`/software/${row.values.id}`}>
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
    Header: "Forvalter",
    accessor: "manager"
  },
  {
    Header: "Team",
    accessor: "team",
    Cell: ({ row }) => (
      row.values.team === true ? 'Ekstern' : row.values.team
    )
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


export default function Softwares({ data }) {
  const [activeFilter, setActiveFilter] = useState(true)
  const now = new Date()

  const handleActiveFilter = () => {
    setActiveFilter(!activeFilter)
  }

  return (
    <Layout>
      <Container variant="wrapper">
        <Flex align={'baseline'} mb={5}>
          <Heading size={"3xl"}>
            Programvare {data.length ? `(${data.length})` : ''}
          </Heading>

          <Button size={'sm'} ml={3} onClick={() => handleActiveFilter()}>
            {activeFilter ? 'Vis ekstern software' : 'Vis bare UBB software'}
          </Button>

        </Flex>

        <DataTable size='sm' columns={columns} data={data.filter(m => {
          return activeFilter ? m.externalSoftware != true : m
        })} />


        {/*         <Heading size={"3xl"}>
          Programvare {data.length ? `(${data.length})` : ''}
        </Heading>

        <Box my={5}>
          <DataTable columns={columns} data={data} />
        </Box> */}
      </Container>
    </Layout>
  )
}