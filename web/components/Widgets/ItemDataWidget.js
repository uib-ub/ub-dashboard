import { Box } from '@chakra-ui/react';
import { CodeBlock, dracula } from 'react-code-blocks'

export default function ItemDataWidget({ value }) {
  if (!value) return

  return (
    <Box
      overflowX={'scroll'}
      fontFamily={'mono'}
      fontSize={'sm'}
    >
      <CodeBlock
        style={{ overflowX: 'scroll' }}
        text={JSON.stringify(value, null, 2)}
        theme={dracula}
        language="json"
      />
    </Box>
  )
}