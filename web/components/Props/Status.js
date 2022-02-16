import { Heading, Tag, VStack } from '@chakra-ui/react'
import { upperCase } from 'lodash-es'

const Status = ({ status, ...rest }) => {
  if (!status) return

  const colors = {
    planning: 'pink',
    ongoing: 'blue',
    completed: 'green',
    rejected: 'red',
    abandoned: 'gray',
  }

  return (
    <VStack spacing={1} align={'flex-start'}>
      <Heading fontSize={'md'} color={'gray.600'}>Status</Heading>
      <Tag mr={2} colorScheme={colors[status]} {...rest}>{upperCase(status)}</Tag>
    </VStack>
  )
}

export default Status
