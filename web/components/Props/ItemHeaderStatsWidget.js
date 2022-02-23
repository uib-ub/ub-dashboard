import { Flex, Heading, Tag, VStack } from '@chakra-ui/react'
import Link from '../Link'

const ItemHeaderStatsWidget = ({ heading, data, ...rest }) => {
  if (!data || !heading) return null

  return (
    <VStack spacing={1} align={'flex-start'}>
      <Heading fontSize={'md'} color={'gray.600'}>{heading}</Heading>
      <Flex>
        {Array.isArray(data) && data.map(item => (
          <Tag key={item.id} variant={'outline'} mr={"2"} mb="2">{item.label}</Tag>
        ))}
        {!Array.isArray(data) &&
          <span>
            {data.label}
          </span>
        }
      </Flex>
    </VStack>
  )
}

export default ItemHeaderStatsWidget
