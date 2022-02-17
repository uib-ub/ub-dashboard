import { Box, Container } from '@chakra-ui/react'
import Header from './Header'
import Link from '../Link'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <Box as="main">
        {children}
      </Box>

      {/* <Footer /> */}
    </>
  )
}