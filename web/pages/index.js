import { LockIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Grid, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Link from '../components/Link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>UB-Dev history</title>
        <meta name="description" content="The UB-dev history" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid maxW="full" h="98vh" className={styles.background} alignContent={"center"} justifyContent={"center"} >
        <Heading fontWeight={"extrabold"} fontSize={["2xl", "5xl", "9xl", ""]}>
          Historien til UB-dev
        </Heading>
        <Container centerContent>
          <LockIcon w={40} h={40} />
          <Button m={10} size={"lg"} variant={"ghost"}>
            <Link href="/project">
              Logg inn
            </Link>
          </Button>
        </Container>
      </Grid>

      <footer>
      </footer>
    </Layout >
  )
}
