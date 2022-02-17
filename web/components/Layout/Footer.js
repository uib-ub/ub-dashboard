import React from 'react'
import NextLink from 'next/link'
import {
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  useColorMode,
  Spacer,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons'
import { FaPencilAlt } from 'react-icons/fa'
import ActiveLink from '../Link/ActiveLink'

export default function Footer() {
  const { colorMode, toggleColorMode } = useColorMode()
  const borderColor = useColorModeValue('#ccdfe0', '#023632')

  return (
    <Container
      as="footer"
      maxW="full"
      display="flex"
      boxSizing="border-box"
      px="4"
      py="2"
      borderTop="solid 1px"
      borderColor={borderColor}
      centerContent
    >
      <Flex
        display={{ base: 'none', md: 'inherit' }}
        placement="auto-end"
        alignItems={"center"}
        fontFamily={"Menlo, monospace"}
      >


        <Link href='https://ubdevhistory.sanity.studio/' isExternal>
          <Icon as={FaPencilAlt} mt={"1"} ml={"3"} />
        </Link>

        <IconButton
          aria-label="Skift mellom dagmodus eller nattmodus"
          display={{ base: 'none', md: 'inherit' }}
          px="0"
          ml="5"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? (
            <Icon as={MoonIcon} />
          ) : (
            <Icon as={SunIcon} color="white" />
          )}
        />
      </Flex>

    </Container>
  )
}
