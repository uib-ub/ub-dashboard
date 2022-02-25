import { Box, GridItem, Heading } from '@chakra-ui/react';
import IllustrationWithCaption from '../../components/PortableTextComponents/IllustrationWithCaption';
import { PortableText } from '../../lib/sanity';

const myPortableTextComponents = {
  types: {
    IllustrationWithCaption: ({ value }) => <IllustrationWithCaption {...value} />,
  },
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => <Heading size={'lg'}>{children}</Heading>,
    h2: ({ children }) => <Heading size={'md'}>{children}</Heading>,
    h3: ({ children }) => <Heading size={'sm'}>{children}</Heading>,
    blockquote: ({ children }) => <blockquote className="border-l-purple-500">{children}</blockquote>,
  },
}


export default function AbstractWidget({ value }) {
  return (
    <GridItem
      colSpan={[6, null, 3]}
    >
      <Box
        borderRight={"1px solid"}
        borderColor={"gray.200"}
        px={5}
        pb={5}
      >
        <PortableText value={value} components={myPortableTextComponents} />
      </Box>
    </GridItem>
  )
}