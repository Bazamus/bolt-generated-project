import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'

function Dashboard() {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4">
        <Stat p="4" shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Presupuestos Totales</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>Este mes</StatHelpText>
        </Stat>
        <Stat p="4" shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Clientes Activos</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>Total</StatHelpText>
        </Stat>
        <Stat p="4" shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Presupuestos Pendientes</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>Por aprobar</StatHelpText>
        </Stat>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard
