import { Box, StatHelpText, StatLabel, StatNumber, Stat } from '@chakra-ui/react'
import millify from "millify"

const Funding = ({ stream, ...rest }) => {
  if (!stream) return

  return (
    <Box my={5}>
      {stream.length > 0 && stream.map((f, i) => (
        <Stat key={i}>
          <StatLabel>Finansiering</StatLabel>
          <StatNumber>{f.amount > 999999.99 ? millify(f.amount, { precision: 2, decimalSeparator: ',', space: true, units: ['', '', 'MILL', 'MRD'] }) : f.amount}  {f.currency}</StatNumber>
          <StatHelpText><strong>{f.awarder}</strong> ({f.period})</StatHelpText>
        </Stat>
      ))}

    </Box>
  )
}

export default Funding
