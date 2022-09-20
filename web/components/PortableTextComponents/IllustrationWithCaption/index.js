import { Flex, Box, Container, Image, Text } from '@chakra-ui/react'
import { urlFor } from "../../../lib/sanity"

export default function IllustrationWithCaption(props) {
  if ((!props && !props.illustration) || props.disabled === true) {
    return null
  }
  const { title, content, illustration, source } = props

  return (
    <>
      {illustration ? (
        <Box as='figure' w="100%">
          {illustration && (
            <Image
              alt=""
              src={urlFor(illustration.image).width(1000).url()}
              layout="fill"
              objectFit={'contain'}
            />
          )}
          <Text>
            {title && (
              <strong>{title}. </strong>
            )}
            {/* {content} */}
          </Text>
        </Box>
      ) : (
        <Flex>Mangler illustrasjon</Flex>
      )}


    </>
  )
}
