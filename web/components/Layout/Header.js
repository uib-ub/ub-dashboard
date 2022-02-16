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

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const borderColor = useColorModeValue('#ccdfe0', '#023632')

  return (
    <Container
      as="header"
      maxW="full"
      display="flex"
      boxSizing="border-box"
      px="4"
      py="2"
      borderBottom="solid 1px"
      borderColor={borderColor}
    >
      <Flex direction="row" alignItems="center">
        <Heading
          fontSize={['lg', 'xl', '2xl', '2xl']}
          fontWeight={{ base: 'normal' }}
          fontFamily={"Menlo, monospace"}
        >
          <NextLink href="/">
            <a>UB-dev</a>
          </NextLink>
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
          <ActiveLink href={`/software`} activeClassName="active">
            <a>Programvare</a>
          </ActiveLink>
        </Box>
        <Box px="2">
          <ActiveLink href={`/dataset`} activeClassName="active">
            <a>Datasett</a>
          </ActiveLink>
        </Box>
        {/* <Box px="2">
          <ActiveLink href={`/service`} activeClassName="active">
            <a>Tjenester</a>
          </ActiveLink>
        </Box> */}
        <Box px="2">
          <ActiveLink href={`/actor`} activeClassName="active">
            <a>Aktører</a>
          </ActiveLink>
        </Box>
        <Box px="2">
          <ActiveLink href={`/timeline`} activeClassName="active">
            <a>Tidslinje</a>
          </ActiveLink>
        </Box>
        <Box px="2">
          <ActiveLink href={`/technology`} activeClassName="active">
            <a>Teknologi</a>
          </ActiveLink>
        </Box>
        <Link href='https://ubdevhistory.sanity.studio/' isExternal>
          <Icon as={FaPencilAlt} mt={"1"} ml={"3"} />
        </Link>
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
              <ActiveLink href={`/software`} activeClassName="active">
                <a>Programvare</a>
              </ActiveLink>
            </MenuItem>
            <MenuItem>
              <ActiveLink href={`/dataset`} activeClassName="active">
                <a>Datasett</a>
              </ActiveLink>
            </MenuItem>
            {/* <MenuItem>
              <ActiveLink href={`/service`} activeClassName="active">
                <a>Tjenester</a>
              </ActiveLink>
            </MenuItem> */}
            <MenuItem>
              <ActiveLink href={`/actor`} activeClassName="active">
                <a>Aktører</a>
              </ActiveLink>
            </MenuItem>
            <MenuItem>
              <ActiveLink href={`/timeline`} activeClassName="active">
                <a>Tidslinje</a>
              </ActiveLink>
            </MenuItem>
            <MenuItem>
              <ActiveLink href={`/technology`} activeClassName="active">
                <a>Teknologi</a>
              </ActiveLink>
            </MenuItem>
            <MenuItem>
              <Link href='https://ubdevhistory.sanity.studio/' isExternal>
                <Icon as={FaPencilAlt} ml={"1"} />
              </Link>
            </MenuItem>
            <MenuItem>
              <Button
                aria-label="Skift mellom dagmodus eller nattmodus"
                p={3}

                onClick={toggleColorMode}
                leftIcon={colorMode === 'light' ? (
                  <Icon as={MoonIcon} />
                ) : (
                  <Icon as={SunIcon} color="white" />
                )
                }
              >
                {/* {colorMode === 'light' ? (
                  <Icon as={MoonIcon} />
                ) : (
                  <Icon as={SunIcon} color="white" />
                )} */}
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Container>
  )
}
