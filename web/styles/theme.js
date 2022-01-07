import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      p: {
        my: '5',
      },
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
      '.active': {
        borderBottom: 'solid 2px',
        borderColor: 'red.300',
      },
    },
  },
})

export default theme