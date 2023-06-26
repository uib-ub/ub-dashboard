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
    <div>
      <PortableText value={value} components={myPortableTextComponents} />
    </div>
  )
}