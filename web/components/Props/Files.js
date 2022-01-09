import { ViewIcon } from '@chakra-ui/icons'
import { VStack, StackItem, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import Link from '../Link'

const Files = ({ files }) => {
  if (!files) return

  return (
    <VStack my={"2"}>
      {files.map(file => (
        <StackItem key={file._key} display={"flex"}>
          <Link href={file.url}>
            <Tag variant='subtle' colorScheme='cyan' mr="2">
              <TagLeftIcon boxSize='12px' as={ViewIcon} />
              <TagLabel>{file.extension}</TagLabel>
            </Tag>
            {file.label}
          </Link>
        </StackItem>
      ))}
    </VStack>
  )
}

export default Files