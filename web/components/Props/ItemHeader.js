import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Image, Grid, Text, VStack, IconButton } from '@chakra-ui/react'
import { urlFor } from "../../lib/sanity"
import Link from '../Link'

const ItemHeader = ({ label, blurb, image, continued, continuedBy, children }) => {
  return (
    <Grid>
      <Flex columnGap={'30px'}>
        <Box>

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
          {(continued || continuedBy) && (
            <Flex
              mt={2}
              justifyContent={'space-between'}
            >
              {continued && (
                <VStack>
                  {continued.map(e => (
                    <Link key={e.id} href={`/project/${e.id}`}>
                      <IconButton
                        isRound
                        aria-label={e.label}
                        icon={<ChevronLeftIcon />}
                      />
                    </Link>
                  ))}
                </VStack>
              )}

              {continuedBy && (
                <VStack>
                  {continuedBy.map(e => (
                    <Link key={e.id} href={`/project/${e.id}`}>
                      <IconButton
                        isRound
                        aria-label={e.label}
                        icon={<ChevronRightIcon />}
                      />
                    </Link>
                  ))}
                </VStack>
              )}

            </Flex>
          )}
        </Box>

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
