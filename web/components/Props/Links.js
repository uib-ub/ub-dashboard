import { ExternalLinkIcon } from '@chakra-ui/icons'
import { HStack, StackItem, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import Link from '../Link'

const Links = ({ links }) => {
  if (!links) return

  return (
    <HStack my={"2"}>
      {links.map(link => (
        <StackItem key={link._key} display={"flex"}>
          <Link href={link.url}>
            <Tag variant='subtle' colorScheme='cyan' mr="2">
              <TagLeftIcon boxSize='12px' as={ExternalLinkIcon} />
              <TagLabel>{link.label}</TagLabel>
            </Tag>
          </Link>
        </StackItem>
      ))}
    </HStack>
  )
}

export default Links