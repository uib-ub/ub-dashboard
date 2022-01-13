import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Flex, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react'
import Link from '../Link'

const Links = ({ links }) => {
  if (!links) return

  return (
    <Flex alignSelf={"center"} justifyContent={"flex-end"} maxW={"30vw"}>
      {links.map(link => (
        <Text key={link._key} maxW={"200px"} isTruncated>
          <Tag display={"flex"} m="3" size={"lg"}>
            <TagLeftIcon as={ExternalLinkIcon} color='green.500' />
            <TagLabel>
              <Link href={link.url}>
                {link.label}
              </Link>
            </TagLabel>
          </Tag>
        </Text>
      ))}
    </Flex>
  )
}

export default Links