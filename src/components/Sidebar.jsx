import { Box, VStack, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function Sidebar() {
  return (
    <Box w="250px" bg="gray.100" p="4">
      <VStack spacing="4" align="stretch">
        <Link as={RouterLink} to="/">Dashboard</Link>
        <Link as={RouterLink} to="/clients">Clientes</Link>
        <Link as={RouterLink} to="/budgets">Presupuestos</Link>
      </VStack>
    </Box>
  )
}

export default Sidebar
