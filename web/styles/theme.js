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
  components: {
    Container: {
      variants: {
        'wrapper': {
          maxW: "full",
          p: { sm: '3', md: "10" },
        },
      },
    },
  },
})

export default theme
