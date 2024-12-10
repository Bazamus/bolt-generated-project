import { Box, Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react'
import { FiMoon, FiSun } from 'react-icons/fi'

function Header() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box bg="white" shadow="sm" px="4" py="2">
      <Flex justify="space-between" align="center">
        <Heading size="md">Generador de Presupuestos</Heading>
        <IconButton
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
          variant="ghost"
        />
      </Flex>
    </Box>
  )
}

export default Header
