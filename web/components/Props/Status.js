import { Tag } from '@chakra-ui/react'

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
    <Tag colorScheme={colors[status]} {...rest}>{status}</Tag>
  )
}

export default Status
