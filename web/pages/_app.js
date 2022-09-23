import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import '../styles/globals.css'

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp