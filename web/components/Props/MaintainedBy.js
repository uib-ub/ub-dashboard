import { Avatar, Box, Flex, Wrap, WrapItem, Text } from '@chakra-ui/react'

const MaintainedBy = ({ maintainers }) => {
  if (!maintainers) return null

  return (
    <Wrap maxW={'full'}>
      {maintainers.map(maintainer => (
        <WrapItem key={maintainer.id} px={"4"}>
          <Flex>
            <Avatar size='sm' name={maintainer.label} />
            <Box ml="3">
              <Text fontWeight='bold' my={"0"}>
                {maintainer.label}
              </Text>
            </Box>
          </Flex>
        </WrapItem>
      ))}
    </Wrap>
  )
}

export default MaintainedBy
