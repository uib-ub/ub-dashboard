import * as React from "react"
import { AspectRatio, Box, Container, Heading, useColorModeValue } from '@chakra-ui/react'
import Layout from "../../components/Layout"
import styles from '../../styles/Home.module.css'

export default function Presentation() {
  const background = useColorModeValue(styles.background, styles.backgroundDark)

  return (
    <Layout>
      <Container variant="wrapper" h="full" className={background} mt="0">
        <Heading size={"3xl"}>
          Presentasjon
        </Heading>

        <Box position={"relative"}>
          <AspectRatio
            ratio={16 / 9}
            my="20"
            boxShadow={"dark-lg"}
          >
            <iframe src="https://slides.com/tarjelavik/sprint-2022/embed" title="Erfaringer" scrolling="no" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
          </AspectRatio>
        </Box>
        {/* <PortableText value={data.content} /> */}
      </Container>
    </Layout >
  )
}