import { HStack, StackItem, } from '@chakra-ui/react'
import Link from '../Link'

const Links = ({ links }) => {
  if (!links) return

  return (
    <HStack my={"3"}>
      {links.map(link => (
        <StackItem key={link._key} display={"flex"}>
          <Link href={link.url}>{link.label}</Link>
        </StackItem>
      ))}
    </HStack>
  )
}

export default Links