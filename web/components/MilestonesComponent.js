import { Box } from '@chakra-ui/react'
import React from 'react'
import { Milestones } from 'react-milestones-vis/'

const MilestonesComponent = ({ data, mapping }) => {
  return (
    <Box w="100%">
      <Milestones
        aggregateBy="month"
        mapping={mapping}
        parseTime="%Y-%m-%dT%H:%M:%S.%LZ"
        autoResize="true"
        optimize
        data={data}
      />
    </Box>
  )
}

export default MilestonesComponent