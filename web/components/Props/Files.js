import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Icon, Table, Thead, Tbody, Th, Tr, Td, Tag, TagLabel } from '@chakra-ui/react'
import Link from '../Link'

const Files = ({ files }) => {
  if (!files) return

  return (
    <Table size='sm'>
      <Thead>
        <Tr>
          <Th>Filer</Th>
          <Th isNumeric>Format</Th>
        </Tr>
      </Thead>
      <Tbody>
        {files.map(file => (
          <Tr key={file._key}>
            <Td>
              <Link href={file.url} isExternal>
                {file.label}
                <Icon ml={2} as={ExternalLinkIcon} color='green.500' />
              </Link>
            </Td>
            <Td isNumeric>
              <Tag variant='subtle' size={'sm'} colorScheme='cyan' mr="2">
                <TagLabel>{file.extension}</TagLabel>
              </Tag>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default Files
