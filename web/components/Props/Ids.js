import { Tooltip } from '@chakra-ui/react'

const Ids = ({ identifier, ...rest }) => {
  if (!identifier) return

  const colors = {
    planning: 'pink',
    ongoing: 'blue',
    completed: 'green',
    rejected: 'red',
    abandoned: 'gray',
  }

  return (
    <>
      {identifier.map(i => (
        <>
          <span style={{ paddingInlineEnd: '0.5rem' }}>|</span>
          <Tooltip label={i.type} aria-label={i.type}>
            {i.content}
          </Tooltip>
        </>
      ))}
    </>
  )
}

export default Ids
