import { Heading, VStack } from '@chakra-ui/react'

const Period = ({ period }) => {
  if (!period) return null

  return (
    <VStack spacing={1} align={'flex-start'}>
      <Heading fontSize={'md'} color={'gray.600'}>Periode</Heading>
      <span>
        {period}
      </span>
    </VStack>
  )
}

export default Period
