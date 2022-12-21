import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, Grid, GridItem, Text, Icon, Tabs, TabList, TabPanels, Tab, TabPanel, Spacer } from '@chakra-ui/react'
import cleanDeep from 'clean-deep'
import Layout from "../../components/Layout"
import { infrastructureQuery } from "../../lib/queries"
import { BiNetworkChart } from 'react-icons/bi'
import { VscFileCode } from "react-icons/vsc"
import ItemHeader from "../../components/Props/ItemHeader"
import ItemDataWidget from '../../components/Widgets/ItemDataWidget'
import NodeFlowGraph from '../../components/NodeFlow'

/* const NodeFlowComponentWithoutSSR = dynamic(
  () => import('../../components/NodeFlow/Infrastructure'),
  { ssr: false }
)
 */
export async function getStaticProps({ params, preview = false }) {
  const now = new Date()
  let timeline = await getClient(preview).fetch(infrastructureQuery, { now: now })
  timeline = cleanDeep(timeline)

  return {
    props: {
      preview,
      data: timeline,
    },
  }
}

export default function Software({ data }) {

  /* 
    TODO: view off all our software packages
  */
  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Infrastruktur
        </Heading>

        {/* <Text fontSize={"2xl"}>Programvare...</Text> */}
        <Box
          borderRadius={"8"}
          border={"1px solid"}
          borderColor={"gray.200"}
          boxShadow={"lg"}
          minHeight={'90vh'}
          my={5}
        >
          <NodeFlowGraph
            data={data}
          />
        </Box>
      </Container>
    </Layout>
  )
}