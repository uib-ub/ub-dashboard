import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Table, Thead, Tbody, Th, Tr, Td, Icon } from '@chakra-ui/react'

const Links = ({ links }) => {
  if (!links) return null

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
              <a href={link.url} target={'_blank'} rel='noreferrer'>
                {link.label}
                <Icon ml={2} as={ExternalLinkIcon} color='green.500' />
              </a>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default Links
