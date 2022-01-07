import { Box, Grid } from '@chakra-ui/react'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <Box as="main">
        {children}
      </Box>
    </>
  )
}