import { Box, VStack, Link, Text, Icon } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FiHome, FiUsers, FiFileText, FiBox } from 'react-icons/fi'

function Sidebar() {
  const menuItems = [
    { icon: FiHome, text: 'Dashboard', path: '/' },
    { icon: FiUsers, text: 'Clientes', path: '/clients' },
    { icon: FiFileText, text: 'Presupuestos', path: '/budgets' },
    { icon: FiBox, text: 'Materiales', path: '/materials' }
  ]

  return (
    <Box
      w="250px"
      bg="blue.600"
      color="white"
      p="4"
      minH="100vh"
    >
      <Text fontSize="xl" fontWeight="bold" mb="6" textAlign="center">
        Generador de Presupuestos
      </Text>
      <VStack spacing="4" align="stretch">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            as={RouterLink}
            to={item.path}
            p="2"
            borderRadius="md"
            _hover={{ bg: 'blue.500' }}
            display="flex"
            alignItems="center"
          >
            <Icon as={item.icon} mr="3" />
            <Text>{item.text}</Text>
          </Link>
        ))}
      </VStack>
    </Box>
  )
}

export default Sidebar
