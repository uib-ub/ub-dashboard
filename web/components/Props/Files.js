import { Table, Thead, Tbody, Th, Tr, Td, Tfoot, Tag, TagLabel, Container, Heading } from '@chakra-ui/react'
import Link from '../Link'

const Files = ({ files }) => {
  if (!files) return

  return (
    <Container maxW={"3xl"} borderRadius={"8"} border={"1px solid"} borderColor={"gray.400"} boxShadow={"md"} py={"5"} my={"5"}>
      {/* <Heading as="h2" size={"lg"} mb={2} borderBottom={"1px solid"}>Filer</Heading> */}
      <Table size='sm' mx={0}>
        <Thead>
          <Tr>
            <Th>Fil</Th>
            <Th>Format</Th>
          </Tr>
        </Thead>
        <Tbody>
          {files.map(file => (
            <Tr key={file._key}>
              <Td>
                <Link href={file.url}>
                  {file.label}
                </Link>
              </Td>
              <Td>
                <Tag variant='subtle' colorScheme='cyan' mr="2">
                  {/* <TagLeftIcon boxSize='12px' as={ViewIcon} /> */}
                  <TagLabel>{file.extension}</TagLabel>
                </Tag>
              </Td>
            </Tr>
          ))}
        </Tbody>
        {/* <Tfoot>
          <Tr>
            <Th>Fil</Th>
            <Th>Format</Th>
          </Tr>
        </Tfoot> */}
      </Table>
    </Container>
  )
}

export default Files
