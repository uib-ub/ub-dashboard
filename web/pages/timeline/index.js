import * as React from "react"
import { groq } from 'next-sanity'
import { getClient } from '../../lib/sanity.server'
import { Container, Grid, GridItem, Heading, Tag, Text } from '@chakra-ui/react'
import Layout from "../../components/Layout"
import { groupBy, sortBy } from 'lodash-es'

const EVENT_TYPES = ['Event', 'Activity', 'Move', 'Joining', 'Leaving', 'BeginningOfExistence', 'EndOfExistence', 'Formation', 'Dissolution']

const timelineQuery = groq`[
  ...*[_type in ['Event', 'Activity', 'Move', 'Joining', 'Leaving', 'BeginningOfExistence', 'EndOfExistence', 'Formation', 'Dissolution'] && defined(timespan) && !(_id in path("drafts.**"))] {
    "label": coalesce(label, 'Uten label'),
    "period": timespan.edtf,
    "timestamp": coalesce(
      select(
        timespan.date != "" => timespan.date
      ), 
      select(
        timespan.beginOfTheBegin != "" => timespan.beginOfTheBegin
      )
    )
  },
  ...*[_type in ['Project'] && defined(timespan.endOfTheEnd)] {
      ...select(defined(timespan.endOfTheEnd) => {
        "label": label + " avsluttes",
        "period": timespan.edtf,
        "timestamp": timespan.endOfTheEnd,
      }
    )
  },
  ...*[_type in ['Project'] && defined(timespan.beginOfTheBegin)] {
      ...select(defined(timespan.beginOfTheBegin) => {
        "label": label + " starter",
        "period": timespan.edtf,
        "timestamp": timespan.beginOfTheBegin,
      }
    )
  }
]`;


export const getStaticProps = async ({ preview = false }) => {
  let timeline = await getClient(preview).fetch(timelineQuery)
  const sortedByYear = sortBy(timeline, ['timestamp'])
  const groupedByYear = groupBy(sortedByYear, function (item) {
    return item.timestamp.substring(0, 4);
  })


  return {
    props: {
      preview,
      data: groupedByYear,
    },
  }
}


export default function ActivityTimeline({ data }) {
  return (
    <Layout>
      <Container variant="wrapper">
        <Heading size={"3xl"}>
          Tidslinje
        </Heading>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        {data && Object.entries(data).map(([key, value]) => (

          <section key={key}>
            <Heading as={'h2'}>{key}</Heading>
            <Grid templateColumns={'1fr 1fr 1fr 1fr'} gap={5}>

              {value.map(e => (
                <GridItem
                  key={e.timestamp}
                  p={5}
                  borderRadius={"8"}
                  border={"1px solid"}
                  borderColor={"gray.200"}
                  boxShadow={"md"}
                >
                  <Tag>{e.period}</Tag>
                  <Heading as={'h3'} size={'sm'}>{e.label}</Heading>
                </GridItem>

              ))}


            </Grid>
          </section>
        ))}

      </Container>
    </Layout>
  )
}
