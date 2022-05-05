import * as React from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { arrayToTree } from "performant-array-to-tree";
import { Box, Container, Flex, Heading, Icon, Image, Tabs, Tab, TabPanels, TabPanel, TabList, List, ListItem, UnorderedList, Button } from '@chakra-ui/react'
import Link from "next/link"
import Layout from "../../components/Layout"
import { DataTable } from '../../components/DataTable'
import { urlFor } from '../../lib/sanity'
import { MdDashboard } from "react-icons/md"
import { GrHistory, GrFormEdit } from "react-icons/gr"

const studio = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL

const allActor = groq`{
  "list": *[_type in ['Actor'] && !(_id in path("drafts.**"))] | order(label asc)  {
    "id": _id,
    "type": _type,
    "label": label,
    image,
    shortDescription,
    "description": pt::text(referredToBy[0].body),
    "memberOf": *[_type == "Group" && references(^._id)].label
  }
}`

export const getStaticProps = async ({ preview = false }) => {
  const now = new Date()
  let data = await getClient(preview).fetch(allActor)

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
        <Link href={`/actor/${row.values.id}`}>
          {row.values.label}
        </Link>
      </Flex>
    )
  },
  {
    Header: "Medlem av",
    accessor: "memberOf",
    Cell: ({ row }) => (
      <Flex rowGap={3} direction="column">
        {row.values.memberOf?.map((t, i) => (
          <Box key={i}>
            {t}
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

export default function Persons({ data }) {
  const { list, tree } = data

  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Personer
        </Heading>
        <Box my={5}>
          <DataTable columns={columns} data={list} />
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