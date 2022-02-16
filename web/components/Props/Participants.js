import { Avatar, Badge, Box, Flex, Wrap, WrapItem, Text } from '@chakra-ui/react'

const Participants = ({ participants }) => {
  if (!participants) return

  return (
    <Wrap maxW={'full'}>
      {participants.map(participant => (
        <WrapItem key={participant.assignedActor.id} pr={4} pb={4}>
          <Flex>

            <Avatar size='sm' name={participant.assignedActor.label} />
            <Box ml="3">
              <Text fontWeight='bold' my={"0"}>
                {participant.assignedActor.label}
              </Text>
              <Text fontSize='sm' my={"0"}>
                <Badge colorScheme='green'>
                  {participant.assignedRole && (<>
                    {participant.assignedRole[0].label}
                  </>)}
                  {participant.timespan && (<>
                    {` (${participant.timespan})`}
                  </>)}
                </Badge>
              </Text>
            </Box>
          </Flex>
        </WrapItem>
      ))
      }
    </Wrap >
  )
}

export default Participants
