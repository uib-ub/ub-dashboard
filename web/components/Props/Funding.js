import { Box, StatHelpText, StatLabel, StatNumber, Stat } from '@chakra-ui/react'

const Funding = ({ stream, ...rest }) => {
  if (!stream) return

  return (
    <Box my={5}>
      {stream.length > 0 && stream.map((f, i) => (
        <Stat key={i}>
          <StatLabel>Finansiering</StatLabel>
          <StatNumber>{f.amount} {f.currency}</StatNumber>
          <StatHelpText><strong>{f.awarder}</strong> ({f.period})</StatHelpText>
        </Stat>
      ))}

    </Box>
  )
}

export default Funding
