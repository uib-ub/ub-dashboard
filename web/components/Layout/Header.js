import React from 'react'
import Link from 'next/link'
import {
  Button,
  Container,
  Flex,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Heading,
  Icon,
  useColorMode,
  useColorModeValue,
  Spacer,
  Portal,
  Box,
  // Image,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import ActiveLink from '../Link/ActiveLink'
// import { imageBuilder } from '../../lib/sanity'

export default function Header(props) {
  if (!props) {
    return null
  }

  const { colorMode, toggleColorMode } = useColorMode()

  const bg = useColorModeValue('white', 'gray.800')
  const menuButtonText = useColorModeValue('gray.900', 'gray.100')

  const { ...rest } = props

  return (
    <Container
      as="header"
      maxW="full"
      display="flex"
      boxSizing="border-box"
      bgColor={bg}
      px="4"
      py="2"
      borderBottom="solid 1px"
      {...rest}
    >
      <Flex direction="row" alignItems="center">
        {/* <Image
            src={imageBuilder.image(logo).height(100).url()}
            alt="site logo"
            h={{ base: '25px' }}
            mr="4"
          /> */}
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
