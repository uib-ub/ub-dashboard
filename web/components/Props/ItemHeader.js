import { Box, Flex, Heading, Image, Grid, Text } from '@chakra-ui/react'
import { urlFor } from "../../lib/sanity"

const ItemHeader = ({ label, blurb, image, children }) => {
  return (
    <Grid>
      <Flex columnGap={'30px'}>
        {image ? (
          <Image
            border={'solid #eee 1px'}
            borderRadius={3}
            src={urlFor(image).url()}
            mb={"5"}
            boxSize='100px'
            objectFit='cover'
          />
        ) :
          <Box
            border={'solid #eee 1px'}
            bg={'gray.100'}
            boxSize='100px'
          >
          </Box>
        }
        <Grid>
          <Heading size={"xl"}>
            {label}
          </Heading>
          {blurb && (
            <Text fontSize='md' m="0">
              {blurb}
            </Text>
          )}
          {children}
        </Grid>
      </Flex>
    </Grid>
  )
}

export default ItemHeader
