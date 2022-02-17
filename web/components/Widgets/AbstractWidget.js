import { Box, GridItem, Heading } from '@chakra-ui/react';
import { PortableText } from '../../lib/sanity';

export default function AbstractWidget({ value }) {
  return (
    <GridItem
      colSpan={[6, null, 3]}
    >
      <Heading size={'lg'} mb={5}>Sammendrag</Heading>
      <Box
        borderRadius={"8"}
        border={"1px solid"}
        borderColor={"gray.200"}
        boxShadow={"md"}
        px={10}
        pb={5}
      >
        <PortableText value={value} />
      </Box>
    </GridItem>
  )
}