import * as React from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { arrayToTree } from "performant-array-to-tree";
import { Box, Container, Flex, Heading, Icon, Image, Tabs, Tab, TabPanels, TabPanel, TabList, List, ListItem, UnorderedList, Button, Tag } from '@chakra-ui/react'
import Link from "next/link"
import Layout from "../../components/Layout"
import { DataTable } from '../../components/DataTable'
import { urlFor } from '../../lib/sanity'
import { MdDashboard } from "react-icons/md"
import { GrHistory, GrFormEdit } from "react-icons/gr"

const studio = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL

const allActor = groq`{
  "list": *[_type in ['Group'] && !(_id in path("drafts.**"))] | order(label asc)  {
    "id": _id,
    "type": _type,
    label,
    hasType[]-> {
      "id": _id,
      label,
    },
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
          "type": _type,
          label,
          hasType[]-> {
            label
          },
          hasMember[] {
            "id": assignedActor->._id,
            "label": assignedActor->.label,
            "timespan": timespan.edtf,
          }
        }
      }
    }
  }
}`

const TreeList = ({ value }) => {
  if (!value) return null
  const tree = arrayToTree(value, { rootParentIds: 'parent', id: "_key", parentId: "parent" })

  return (
    <UnorderedList>
      {tree.map(node => (
        <TreeListItem value={node} key={node.data.value.reference.id} />
      ))}
    </UnorderedList>
  )
}

const TreeListItem = ({ value }) => {
  const pageType = value.data.value.reference.type === "Actor" ? "actor" : "group"
  return (
    <ListItem key={value.data.value.reference.id}>
      <Flex gap={2} my={2}>
        <Heading size={'md'} py={1}>
          <Link href={`/${pageType}/${value.data.value.reference.id}`}>
            {value.data.value.reference.label}
          </Link>
        </Heading>
        {value.data.value.reference.hasType && value.data.value.reference.hasType.map((type, index) => (
          <Tag key={index} size='sm'>{type.label}</Tag>
        ))}
      </Flex>
      <UnorderedList>
        {value.children.map(child => (
          <TreeListItem key={child._key} value={child} />
        ))}
      </UnorderedList>

      {/* Add a list with group members */}
      <UnorderedList>
        {value.data.value.reference.hasMember && value.data.value.reference.hasMember.map(member => (
          <ListItem key={member.id}>
            <Heading size={'sm'}>
              <Link href={`/actor/${member.id}`}>
                {member.label}
              </Link>
            </Heading>
          </ListItem>
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
        <Link href={`/group/${row.values.id}`}>
          {row.values.label}
        </Link>
      </Flex>
    )
  },
  {
    Header: "Type",
    accessor: "hasType",
    Cell: ({ row }) => (
      <Flex rowGap={3} direction="column">
        {row.values.hasType?.map((t, i) => (
          <Box key={i}>
            {t.label}
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

export default function Groups({ data }) {
  const { list, tree } = data

  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Grupper
        </Heading>

        <Tabs lazy colorScheme='green' my={10}>
          <TabList>
            <Tab><Icon as={GrHistory} mr={2} /> Hierarki</Tab>
            <Tab><Icon as={MdDashboard} mr={2} /> Liste</Tab>
          </TabList>

          <TabPanels mt={3}>
            <TabPanel>
              <Box my={5}>
                <TreeList value={tree} />
              </Box>
            </TabPanel>

            <TabPanel>
              <Box my={5}>
                <DataTable columns={columns} data={list} />
              </Box>
            </TabPanel>
          </TabPanels>

        </Tabs>
      </Container>
    </Layout>
  )
}
