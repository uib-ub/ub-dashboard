import { Link as ChakraLink, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Link({ href, children }) {
  if (!href) {
    return null
  }
  const color = useColorModeValue('teal.700', 'gray.100')

  return (
    <NextLink href={href} passHref prefetch={false}>
      <ChakraLink color={color}>{children}</ChakraLink>
    </NextLink>
  )
}