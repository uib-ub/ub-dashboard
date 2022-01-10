import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Container, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import Link from '../Link'

const Links = ({ links }) => {
  if (!links) return

  return (
    <Container maxW={"3xl"} borderTop={"1px solid"} borderColor={"gray.400"} boxShadow={"sm"} py="3" my="3">
      <Heading size={"xs"}>Lenker</Heading>
      <List spacing={3} my={"2"}>
        {links.map(link => (
          <ListItem key={link._key} display={"flex"}>
            <ListIcon as={ExternalLinkIcon} color='green.500' />
            <Link href={link.url}>
              {link.label}
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default Links