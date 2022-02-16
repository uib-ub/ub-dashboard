import { Heading, Tooltip, VStack } from '@chakra-ui/react'

const Ids = ({ identifier, ...rest }) => {
  if (!identifier) return

  return (
    <VStack spacing={1} align={'flex-start'}>
      <Heading fontSize={'md'} color={'gray.600'}>Prosjekt ID</Heading>

      {identifier.map(i => (
        <Tooltip label={i.type} aria-label={i.type}>
          {i.content}
        </Tooltip>
      ))}
    </VStack>
  )
}

export default Ids
