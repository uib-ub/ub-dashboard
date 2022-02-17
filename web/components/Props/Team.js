import { Table, Thead, Tbody, Th, Tr, Td, Heading } from '@chakra-ui/react'
import Link from '../Link'

const Team = ({ team, size = 'sm' }) => {
  if (!team) return

  return (
    <>
      <Heading
        as="h2"
        size={"md"}
      >
        {team.label}
      </Heading>
      <Table size={size} mx={0}>
        <Thead>
          <Tr>
            <Th>Navn</Th>
            <Th>Rolle</Th>
            <Th>Periode</Th>
          </Tr>
        </Thead>
        <Tbody>
          {team.hasMember.map(member => (
            <Tr key={member._key}>
              <Td>
                <Link href={`/actor/${member.assignedActor.id}`}>
                  {member.assignedActor.label}
                </Link>
              </Td>
              <Td>
                {member.assignedRole && (<>
                  {member.assignedRole[0].label}
                </>)}
              </Td>
              <Td>
                {member.timespan}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export default Team
