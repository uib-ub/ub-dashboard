import { Box, Container, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Link from '../components/Link'
import styles from '../styles/Home.module.css'

export default function Home() {
  const background = useColorModeValue(styles.background, styles.backgroundDark)
  return (
    <Layout>
      <Head>
        <title>UB-Dev history</title>
        <meta name="description" content="The UB-dev history" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW={"full"} h="100vh" className={background}>
        <Heading fontWeight={"bold"} fontSize={["2xl", "5xl", "9xl", ""]}>
          Hvem, hva, hvor, hvorfor?
        </Heading>

        <Heading as="h2" fontWeight={"bold"} fontSize={["sm", "md", "xl", "2xl"]}>
          Datamodell
        </Heading>
        <Text>
          Delvis inspirert av <Link href="https://zenodo.org/record/2575465#.YeFvMhOZOls">PARTHENOS D5.5 Report on the Common Semantic Framework</Link>.
        </Text>
      </Container>

      <footer>
      </footer>
    </Layout >
  )
}
