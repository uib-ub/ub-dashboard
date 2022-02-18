import { Flex, Heading, Tag, VStack } from '@chakra-ui/react'

const HasType = ({ types, ...rest }) => {
  if (!types) return

  return (
    <VStack spacing={1} align={'flex-start'}>
      <Heading fontSize={'md'} color={'gray.600'}>Type</Heading>
      <Flex>
        {types.map(tag => (
          <Tag key={tag.id} variant={'outline'} mr={"2"} mb="2">{tag.label}</Tag>
        ))}
      </Flex>
    </VStack>
  )
}

export default HasType
