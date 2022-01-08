import React from 'react'
import Link from 'next/link'
import {
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  useColorMode,
  Spacer,
  Box,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import ActiveLink from '../Link/ActiveLink'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container
      as="header"
      maxW="full"
      display="flex"
      boxSizing="border-box"
      px="4"
      py="2"
      borderBottom="solid 1px"
    >
      <Flex direction="row" alignItems="center">
        <Heading
          fontSize={['lg', 'xl', '2xl', '2xl']}
          fontWeight={{ base: 'normal' }}
          fontFamily={"Menlo, monospace"}
        >
          <Link href="/">
            <a>UB-dev history</a>
          </Link>
        </Heading>
      </Flex>

      <Spacer />

      <Flex
        placement="auto-end"
        alignItems={"center"}
        fontFamily={"Menlo, monospace"}
      >
        <Box px="2">
          <ActiveLink href={`/project`} activeClassName="active">
            <a>Prosjekt</a>
          </ActiveLink>
        </Box>
        <Box px="2">
          <ActiveLink href={`/product`} activeClassName="active">
            <a>Produkt</a>
          </ActiveLink>
        </Box>
        <Box px="2">
          <ActiveLink href={`/timeline`} activeClassName="active">
            <a>Tidslinje</a>
          </ActiveLink>
        </Box>
      </Flex>

      <Button
        aria-label="Skift mellom dagmodus eller nattmodus"
        display={{ base: 'none', md: 'inherit' }}
        px="0"
        ml="5"
        onClick={toggleColorMode}
      >
        {colorMode === 'light' ? (
          <Icon as={MoonIcon} />
        ) : (
          <Icon as={SunIcon} color="white" />
        )}
      </Button>
    </Container>
  )
}
