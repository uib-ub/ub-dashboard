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

      <Grid maxW="full" py="40" className={styles.background} alignContent={"center"} justifyContent={"center"} >
        <Heading fontWeight={"bold"} fontSize={["2xl", "5xl", "9xl", ""]}>
          Historien til UB-dev
        </Heading>
      </Grid>

      <footer>
      </footer>
    </Layout >
  )
}
