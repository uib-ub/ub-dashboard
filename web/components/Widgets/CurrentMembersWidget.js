import { Box, GridItem, Heading } from '@chakra-ui/react';
import Participants from '../Props/Participants';

export default function CurrentMembersWidget({ value }) {
  if (!value) return

  return (
    <GridItem
      colSpan={[6, null, 3]}
    >
      <Heading size={['lg']} mb={5}>Aktive medlemmer</Heading>
      <Box
        borderRadius={"8"}
        border={"1px solid"}
        borderColor={"gray.200"}
        boxShadow={"md"}
        p={5}
      >
        {value.map(team => (
          <Participants key={team.id} participants={team.hasMember} />
        ))}
      </Box>
    </GridItem>
  )
}