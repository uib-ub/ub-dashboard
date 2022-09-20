import * as React from "react"
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Box, Container, Flex, Heading, Grid, GridItem, Text, Icon, Tabs, TabList, TabPanels, Tab, TabPanel, Spacer, UnorderedList, ListItem } from '@chakra-ui/react'
import Layout from "../../components/Layout"
import { endpointsQuery, } from "../../lib/queries"
import Link from '../../components/Link'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export async function getStaticProps({ params, preview = false }) {
  const now = new Date()
  let data = await getClient(preview).fetch(endpointsQuery, { now: now })

  return {
    props: {
      preview,
      data: data,
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
          Endpoints
        </Heading>

        {/* <Text fontSize={"2xl"}>Programvare...</Text> */}
        <Grid
          maxW={'full'}
          gap={5}
          templateColumns='repeat(6, 1fr)'
          mt={5}
        >
          <GridItem
            colSpan={[6]}
          >
            <UnorderedList>
              {data && data.map(endpoint => (
                <React.Fragment key={endpoint._id}>
                  {endpoint.accessPoint.map(accessPoint => (
                    <ListItem key={accessPoint._id}>
                      <Link href={accessPoint.value} isExternal>
                        {accessPoint.value} <ExternalLinkIcon />
                      </Link>
                      {' '}({endpoint.providedBy.label})
                    </ListItem>
                  ))}
                </React.Fragment>
              ))}
            </UnorderedList>
          </GridItem>
        </Grid>

      </Container>
    </Layout>
  )
}