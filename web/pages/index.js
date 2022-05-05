import { Box, Container, Grid, GridItem, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Link from '../components/Link'
import styles from '../styles/Home.module.css'

export default function Home() {
  const background = useColorModeValue(styles.background, styles.backgroundDark)
  return (
    <Layout>
      <Head>
        <title>UB dashboard</title>
        <meta name="description" content="UB-dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW={"full"} py={10}>
        <Grid maxW={'4xl'} mx="auto" gap={5} templateColumns={'repeat(12, 1fr)'} my={10}>

          <GridItem
            colSpan={6}
            p={5}
            bg={'blue.300'}
            borderRadius={"8"}
            border={"1px solid"}
            borderColor={"gray.200"}
            boxShadow={"md"}
          >
            <Heading as="h2" fontWeight={"bold"} fontSize={["2xl", "3xl", "3xl", "4xl"]} textTransform={'uppercase'}>
              <Link href={`/actor`}>
                Personer
              </Link>
            </Heading>
          </GridItem>

          <GridItem
            colSpan={6}
            p={5}
            bg={'red.300'}
            borderRadius={"8"}
            border={"1px solid"}
            borderColor={"gray.200"}
            boxShadow={"md"}
          >
            <Heading as="h2" fontWeight={"bold"} fontSize={["2xl", "3xl", "3xl", "4xl"]} textTransform={'uppercase'}>
              <Link href={`/group`}>
                Grupper
              </Link>
            </Heading>
          </GridItem>

          <GridItem
            colSpan={6}
            p={5}
            bg={'yellow.300'}
            borderRadius={"8"}
            border={"1px solid"}
            borderColor={"gray.200"}
            boxShadow={"md"}
          >
            <Heading as="h2" fontWeight={"bold"} fontSize={["2xl", "3xl", "3xl", "4xl"]} textTransform={'uppercase'}>
              <Link href={`/project`}>
                Prosjekt
              </Link>
            </Heading>
          </GridItem>


          <GridItem
            colSpan={6}
            p={5}
            bg={'yellow.500'}
            borderRadius={"8"}
            border={"1px solid"}
            borderColor={"gray.200"}
            boxShadow={"md"}
          >
            <Heading as="h2" fontWeight={"bold"} fontSize={["2xl", "3xl", "3xl", "4xl"]} textTransform={'uppercase'}>
              <Link href={`/software`}>
                Programvare
              </Link>
            </Heading>
          </GridItem>

          <GridItem
            colSpan={6}
            p={5}
            bg={'cyan.300'}
            borderRadius={"8"}
            border={"1px solid"}
            borderColor={"gray.200"}
            boxShadow={"md"}
          >
            <Heading as="h2" fontWeight={"bold"} fontSize={["2xl", "3xl", "3xl", "4xl"]} textTransform={'uppercase'}>
              <Link href={`/dataset`}>
                Datasett
              </Link>
            </Heading>
          </GridItem>

          <GridItem colSpan={12}>
            <Heading as="h2" fontWeight={"bold"} fontSize={["sm", "md", "xl", "2xl"]}>
              Datamodell
            </Heading>
            <Text>
              Delvis inspirert av <Link href="https://zenodo.org/record/2575465#.YeFvMhOZOls">PARTHENOS D5.5 Report on the Common Semantic Framework</Link>.
            </Text>
          </GridItem>

          <GridItem colSpan={12}>
            <Heading as="h2" fontWeight={"bold"} fontSize={["sm", "md", "xl", "2xl"]}>
              Presentasjon
            </Heading>
            <Text>
              <Link href="/presentation">Erfaringer og sånt</Link>.
            </Text>

            <Heading as="h2" fontWeight={"bold"} fontSize={["sm", "md", "xl", "2xl"]}>
              Fases ut....
            </Heading>
            <Text>
              <Link href={`/service`}>
                Tjenester
              </Link>
            </Text>
            <Text>
              <Link href={`/product`}>
                Produkt
              </Link>
            </Text>
          </GridItem>
        </Grid>
      </Container>
    </Layout >
  )
}
