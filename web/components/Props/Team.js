import { useState } from 'react'
import { Heading, Flex, Image, Icon, Button } from '@chakra-ui/react'
import { DataTable } from "../DataTable"
import Link from '../Link'
import { GrFormEdit } from 'react-icons/gr'

const studio = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL

const checkMembership = (arr) => {
  if (arr.every(m => m.retired === true)) {
    return false
  }
  if (!arr.every(m => m.retired === true) && arr.some(m => m.retired === true)) {
    return true
  }
  return false
}

const TeamMembers = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState(checkMembership(data ?? []))
  const columns = [
    {
      Header: "",
      accessor: "image",
      isVisible: 'false'
    },
    {
      Header: "Navn",
      accessor: "assignedActor",
      Cell: ({ row }) => (
        <Flex columnGap={3} alignItems={'center'}>
          {row.values.image ? (
            <Image
              border={'solid #eee 1px'}
              borderRadius='full'
              src={urlFor(row.values.assignedActor.image).url()}
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
          <Link href={`/actor/${row.values.assignedActor.id}`}>
            {row.values.assignedActor.label}
          </Link>
        </Flex>
      )
    },
    {
      Header: "Rolle",
      accessor: "assignedRole",
      Cell: ({ row }) => (
        <>{row.values.assignedRole?.map(role =>
          role.label
        )}</>
      )
    },
    {
      Header: "Periode",
      accessor: "timespan"
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

  const handleActiveFilter = () => {
    setActiveFilter(!activeFilter)
  }

  return (
    <>
      <Flex align={'baseline'} mb={5}>
        <Heading size={'lg'}>Medlemmer</Heading>
        {data.some(m => m.retired === true) && (
          <Button size={'sm'} ml={3} onClick={() => handleActiveFilter()}>
            {activeFilter ? 'Vis inaktive medlemmer' : 'Vis aktive medlemmer'}
          </Button>
        )}
      </Flex>

      <DataTable size='sm' columns={columns} data={data.filter(m => {
        return activeFilter ? m.retired != true : m
      })} />
    </>
  )
}


const Team = ({ data }) => {
  if (!data) return null

  return (
    <>
      <Heading
        as="h2"
        size={"md"}
      >
        {data.label}
      </Heading>
      <TeamMembers data={data.hasMember} />
    </>
  )
}

export default Team
