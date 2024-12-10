import { useState } from 'react'
import { ChakraProvider, Box, Flex, Text } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
      <Box p={5}>
        <Text fontSize="2xl">Generador de Presupuestos</Text>
        <Text>La aplicación está funcionando correctamente</Text>
      </Box>
    </ChakraProvider>
  )
}

export default App
