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
  "list": *[_type in ['Actor', 'Group'] && !(_id in path("drafts.**"))] | order(label asc)  {
    "id": _id,
    "type": _type,
    "label": label,
    image,
    shortDescription,
    "description": pt::text(referredToBy[0].body),
  },
  ...*[_id == "org-hierarchy"][0]{
    tree[] {
      // Make sure you include each item's _key and parent
      _key,
      parent,
      value {
        reference->{
          "id": _id,
          label,
        }
      }
    }
  }
}`

const TreeList = ({ data }) => {
  if (!data) return null
  const tree = arrayToTree(data, { rootParentIds: 'parent', id: "_key", parentId: "parent" })

  return (
    <UnorderedList>
      {tree.map(node => (
        <TreeListItem key={node._key} data={node} />
      ))}
    </UnorderedList>
  )
}

const TreeListItem = ({ data }) => {
  return (
    <ListItem>
      <Heading size={'sm'}>
        <Link href={`/actor/${data.data.value.reference.id}`}>
          {data.data.value.reference.label}
        </Link>
      </Heading>
      <UnorderedList>
        {data.children.map(child => (
          <TreeListItem key={child._key} data={child} />
        ))}
      </UnorderedList>
    </ListItem>
  )
}

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
    Header: "Beskrivelse",
    accessor: "description"
  },
  {
    Header: "Type",
    accessor: "type"
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
          Personer og grupper
        </Heading>

        <Tabs lazy colorScheme='green' my={10}>
          <TabList>
            <Tab><Icon as={MdDashboard} mr={2} /> Liste</Tab>
            <Tab><Icon as={GrHistory} mr={2} /> Hierarki</Tab>
          </TabList>

          <TabPanels mt={3}>
            <TabPanel>
              <Box my={5}>
                <DataTable columns={columns} data={list} />
              </Box>
            </TabPanel>

            <TabPanel>
              <Box my={5}>
                <TreeList data={tree} />
                {/* <pre>{JSON.stringify(tree, null, 2)}</pre> */}
              </Box>
            </TabPanel>
          </TabPanels>

        </Tabs>


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