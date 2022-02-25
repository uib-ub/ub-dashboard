import { Box, Flex, Grid, Heading, Icon, Image, Tag, Text } from '@chakra-ui/react';
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { GiEyeTarget } from 'react-icons/gi';
import { VscCode } from 'react-icons/vsc';
import { urlFor } from '../../lib/sanity';

const InfoNode = ({ data }) => {
  /* console.log(data) */
  return (
    <Box
      border="2px solid black"
      borderRadius={'sm'}
      p={3}
      bg={'white'}
      w={'sm'}
    >
      <Handle type="target" position={Position.Top} style={{ left: '40%', borderRadius: 0 }} />
      <Handle type="target" position={Position.Top} id="p" style={{ left: '60%', borderRadius: 0 }} />

      <Flex columnGap={3}>
        {data.logo &&
          <Image
            border={'solid #eee 1px'}
            src={urlFor(data.logo).url()}
            boxSize='50px'
            objectFit='cover'
            alt=''
            draggable='false'
          />
        }
        {!data.logo && data.subtitle == 'Kildekode' &&
          <Icon as={VscCode} h={'40px'} w={'40px'} />
        }
        {!data.logo && data.subtitle == 'Endpoint' &&
          <Icon as={GiEyeTarget} h={'40px'} w={'40px'} />
        }
        <Box>
          <Heading size={'md'}>{data.label}</Heading>
          {data.shortDescription &&
            <Text size={'md'} m={0}>{data.shortDescription}</Text>
          }
          <Tag size={'sm'}>{data.subtitle}</Tag>
        </Box>
      </Flex>

      <Grid as="dl" templateColumns={'1fr 3fr'} columnGap={2} mt={2}>
        {data.info && Object.entries(data.info).map(([key, value]) => (
          <React.Fragment key={key}>
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
