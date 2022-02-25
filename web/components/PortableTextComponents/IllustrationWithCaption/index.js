import { Flex, Box, Container, Image } from '@chakra-ui/react'
import { urlFor } from "../../../lib/sanity"

export default function IllustrationWithCaption(props) {
  if ((!props && !props.illustration) || props.disabled === true) {
    return null
  }
  const { title, content, illustration, source } = props

  return (
    <Container>
      {illustration ? (
        <Box w="100%">
          {illustration && (
            <Image
              alt=""
              src={urlFor(illustration.image).width(200).url()}
              layout="fill"
            />
          )}
        </Box>
      ) : (
        <Flex>Mangler illustrasjon</Flex>
      )}


    </Container>
  )
}
