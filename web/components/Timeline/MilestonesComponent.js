import { Box } from '@chakra-ui/react'
import React from 'react'
import { Milestones } from 'react-milestones-vis/'
import styles from './MilestonesComponent.module.css'

const MilestonesComponent = ({ data, mapping, width, pattern, ...rest }) => {
  return (
    <Box
      w={"full"}
      overflowX={width ? "scroll" : ''}
      position={"relative"}
      className={pattern ? styles.background : ''}
      shadow={"md"}
      {...rest}
    >
      <Box w={width} className='timelines' p={"5"}>
        <Milestones
          aggregateBy="day"
          mapping={mapping}
          parseTime="%Y-%m-%dT%H:%M:%S.%LZ"
          autoResize="true"
          optimize
          data={data}
        />
      </Box>
    </Box >
  )
}

export default MilestonesComponent
