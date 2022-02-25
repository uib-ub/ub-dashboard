import { ArrowUpDownIcon } from '@chakra-ui/icons'
import { Heading, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, PopoverAnchor, Tooltip, VStack, Text, } from '@chakra-ui/react'

const Ids = ({ identifiers }) => {
  if (!identifiers) return null

  return (
    <VStack spacing={1} align={'flex-start'}>
      <Heading fontSize={'md'} color={'gray.600'}>Prosjekt ID</Heading>

      {identifiers.length === 1 && identifiers.map((i) => (
        <Tooltip key={i.id} label={i.type} aria-label={i.type}>
          {i.content}
        </Tooltip>
      ))}

      {identifiers.length > 1 && (
        <Popover size={'sm'}>
          <PopoverTrigger>
            <Text>{identifiers[0].content} <ArrowUpDownIcon w={4} h={4} /></Text>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Alle ID-er</PopoverHeader>
            <PopoverBody>
              {identifiers.map((i) => (
                <Text key={i.id} my={0} size={'xs'} >
                  <strong>{i.type}</strong>: {i.content}
                </Text>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </VStack>
  )
}

export default Ids
