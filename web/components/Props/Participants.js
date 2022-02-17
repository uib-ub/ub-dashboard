import { Avatar, Badge, Box, Flex, Wrap, WrapItem, Text } from '@chakra-ui/react'
import Link from '../Link'

const Participants = ({ participants }) => {
  if (!participants) return

  return (
    <Wrap maxW={'full'}>
      {participants.filter(i => i.active !== false).map(participant => (
        <WrapItem key={participant.assignedActor.id} pr={4} pb={4}>
          <Flex>
            <Avatar size='sm' name={participant.assignedActor.label} />

            <Box ml="3">
              <Text fontWeight='bold' my={"0"}>
                <Link href={`/actor/${participant.assignedActor.id}`}>
                  {participant.assignedActor.label}
                </Link>
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
