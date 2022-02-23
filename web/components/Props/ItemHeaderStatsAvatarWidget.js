import { Avatar, AvatarGroup, Heading, VStack } from '@chakra-ui/react'

const ItemHeaderStatsAvatarWidget = ({ heading, data, size, ...rest }) => {
  if (!data || !heading) return null

  return (
    <VStack spacing={1} align={'flex-start'}>
      <Heading fontSize={'md'} color={'gray.600'}>{heading}</Heading>
      <AvatarGroup size={size}>
        {Array.isArray(data) && data.map(item => (
          <Avatar key={item.id} name={item.label} />
        ))}
        {!Array.isArray(data) &&
          <Avatar key={data.id} name={data.label} />
        }
      </AvatarGroup>
    </VStack>
  )
}

export default ItemHeaderStatsAvatarWidget
