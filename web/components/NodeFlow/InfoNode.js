import { Box, Container, Flex, Grid, Heading, Image, Tag, Text } from '@chakra-ui/react';
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { urlFor } from '../../lib/sanity';

const InfoNode = ({ data }) => {
  /* console.log(data) */
  return (
    <Box
      border="2px solid black"
      borderRadius={'sm'}
      p={5}
      bg={'white'}
    >
      <Handle type="target" position={Position.Top} />

      <Flex columnGap={5}>
        {data.logo && <Image
          border={'solid #eee 1px'}
          src={urlFor(data.logo).url()}
          boxSize='50px'
          objectFit='cover'
          alt=''
        />}
        <Box>
          <Heading size={'xs'}>{data.label}</Heading>
          <Tag size={'sm'}>{data.subtitle}</Tag>
        </Box>
      </Flex>

      <Grid as="dl" templateColumns={'1fr 3fr'} columnGap={2} mt={2}>
        {data.info && Object.entries(data.info).map(([key, value], index) => (
          <React.Fragment key={index}>
            <Heading as="dt" fontWeight="semibold" fontSize="xs">
              {key}
            </Heading>

            <Text as="dd" fontSize="xs" wordBreak={'break-all'}>
              {Array.isArray(value) ? value.join(', ') : value}
            </Text>
          </React.Fragment>
        ))}
      </Grid>

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
      />
    </Box >
  );
};

export default InfoNode