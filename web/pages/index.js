import { Container, Grid, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>UB-Dev history</title>
        <meta name="description" content="The UB-dev history" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid maxW="full" mt="60" alignItems={"center"} justifyContent={"center"}>
        <Heading fontWeight={"hairline"} fontSize={"9xl"}>
          UB-dev history
        </Heading>
      </Grid>

      <footer>
      </footer>
    </Layout>
  )
}
