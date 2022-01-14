import * as React from "react"
import { AspectRatio, Container, Heading, useColorModeValue } from '@chakra-ui/react'
import Layout from "../../components/Layout"
import styles from '../../styles/Home.module.css'

export default function Presentation() {
  const background = useColorModeValue(styles.background, styles.backgroundDark)

  return (
    <Layout>
      <Container variant="wrapper" h="96vh" className={background} mt="0" >
        <Heading size={"3xl"}>
          Presentasjon
        </Heading>

        <AspectRatio
          ratio={16 / 9}
          mt="20"
          boxShadow={"dark-lg"}
        >
          <iframe src="https://slides.com/tarjelavik/sprint-2022/embed" title="Erfaringer" scrolling="no" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
        </AspectRatio>
        {/* <PortableText blocks={data.content} /> */}
      </Container>
    </Layout >
  )
}