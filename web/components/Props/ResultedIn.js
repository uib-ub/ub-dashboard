import { Table, Thead, Tbody, Th, Tr, Td, Heading } from '@chakra-ui/react'
import { lowerCase } from 'lodash-es'
import Link from '../Link'

const ResultedIn = ({ results }) => {
  if (!results) return null

  return (
    <>
      <Heading
        as="h2"
        size={"md"}
        my={4}
        borderBottom={"1px solid"}
        fontWeight={"light"}
      >
        Produkt/Tjenester
      </Heading>
      <Table size='sm' mx={0}>
        <Thead>
          <Tr>
            <Th>Navn</Th>
            <Th>Type</Th>
            <Th>Periode</Th>
          </Tr>
        </Thead>
        <Tbody>
          {results.map(r => (
            <>
              <Tr key={r.id}>
                <Td>
                  <Link href={`/${lowerCase(r.type)}/${r.id}`}>
                    {r.label}
                  </Link>
                </Td>
                <Td>
                  {r.type}
                </Td>
                <Td>
                  {r.period}
                </Td>
              </Tr>
              {r.usedService && r.usedService.map(s => (
                <Tr key={s.id}>
                  <Td>
                    <Link href={`/${lowerCase(s.type)}/${s.id}`}>
                      <span style={{ display: 'inline-block', transform: 'rotate(90deg)' }}><>&#8626;</></span> {s.label}
                    </Link>
                  </Td>
                  <Td>
                    {s.type}
                  </Td>
                  <Td>
                    {s.period}
                  </Td>
                </Tr>
              ))}
            </>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export default ResultedIn
