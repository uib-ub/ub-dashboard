import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Table, Thead, Tbody, Th, Tr, Td, Icon } from '@chakra-ui/react'
import Link from '../Link'

const Links = ({ links }) => {
  if (!links) return

  return (
    <Table size='sm' mx={0}>
      <Thead>
        <Tr>
          <Th>Lenker</Th>
        </Tr>
      </Thead>
      <Tbody>
        {links.map(link => (
          <Tr key={link._key}>
            <Td>
              <Link href={link.url} isExternal>
                {link.label}
                <Icon ml={2} as={ExternalLinkIcon} color='green.500' />
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default Links
