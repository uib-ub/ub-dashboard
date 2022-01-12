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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons'
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
            <a>Historien til UB-dev</a>
          </Link>
        </Heading>
      </Flex>

      <Spacer />

      <Flex
        display={{ base: 'none', md: 'inherit' }}
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
          <ActiveLink href={`/person`} activeClassName="active">
            <a>Personer (WIP)</a>
          </ActiveLink>
        </Box>
        <Box px="2">
          <ActiveLink href={`/service`} activeClassName="active">
            <a>Tjenester (WIP)</a>
          </ActiveLink>
        </Box>
        <Box px="2">
          <ActiveLink href={`/timeline`} activeClassName="active">
            <a>Tidslinje</a>
          </ActiveLink>
        </Box>
        <Box px="2">
          <ActiveLink href={`/graph`} activeClassName="active">
            <a>Tek-graf</a>
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

      <Box display={{ sm: 'inherit', md: 'none' }}>
        <Menu >
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          />
          <MenuList>
            <MenuItem>
              <ActiveLink href={`/project`} activeClassName="active">
                <a>Prosjekt</a>
              </ActiveLink>
            </MenuItem>
            <MenuItem>
              <ActiveLink href={`/product`} activeClassName="active">
                <a>Produkt</a>
              </ActiveLink>
            </MenuItem>
            <MenuItem>
              <ActiveLink href={`/service`} activeClassName="active">
                <a>Tjenester (WIP)</a>
              </ActiveLink>
            </MenuItem>
            <MenuItem>
              <ActiveLink href={`/person`} activeClassName="active">
                <a>Personer (WIP)</a>
              </ActiveLink>
            </MenuItem>
            <MenuItem>
              <ActiveLink href={`/timeline`} activeClassName="active">
                <a>Tidslinje</a>
              </ActiveLink>
            </MenuItem>
            <MenuItem>
              <ActiveLink href={`/graph`} activeClassName="active">
                <a>Tek-graf</a>
              </ActiveLink>
            </MenuItem>
            <MenuItem>
              <Button
                aria-label="Skift mellom dagmodus eller nattmodus"
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
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>


    </Container>
  )
}
