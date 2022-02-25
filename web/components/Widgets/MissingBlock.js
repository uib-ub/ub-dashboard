import { Container, Flex, Heading, Icon, Text, VStack } from '@chakra-ui/react'

const MissingBlock = ({ heading, text, icon }) => {
  return (
    <Flex p={5}>
      <Container maxW={'full'} centerContent alignContent={'center'} justifyContent={'center'}>
        <VStack>
          <Icon as={icon} w={20} h={20} />
          <Heading size={'sm'}>{heading}</Heading>
          <Text>{text}</Text>
        </VStack>
      </Container>
    </Flex>
  )
}

export default MissingBlock
