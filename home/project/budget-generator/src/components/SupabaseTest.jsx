import { useEffect, useState } from 'react'
import {
  Box,
  VStack,
  Text,
  Code,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  useToast
} from '@chakra-ui/react'
import { supabase } from '../lib/supabase'

function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState({
    checking: true,
    connected: false,
    error: null,
    credentials: {
      url: import.meta.env.VITE_SUPABASE_URL || 'No configurada',
      hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
    }
  })
  const toast = useToast()

  const testConnection = async () => {
    setConnectionStatus(prev => ({ ...prev, checking: true, error: null }))
    
    try {
      // Test básico de conexión
      const { data, error } = await supabase.from('clientes').select('count()', { count: 'exact' })
      
      if (error) throw error

      setConnectionStatus(prev => ({
        ...prev,
        checking: false,
        connected: true
      }))

      toast({
        title: 'Conexión exitosa',
        description: 'La conexión con Supabase se ha establecido correctamente.',
        status: 'success',
        duration: 3000
      })

    } catch (error) {
      console.error('Error de conexión:', error)
      
      setConnectionStatus(prev => ({
        ...prev,
        checking: false,
        connected: false,
        error: error.message
      }))

      toast({
        title: 'Error de conexión',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <VStack spacing={4} align="stretch">
      <Box p={4} borderWidth={1} borderRadius="md">
        <Text fontWeight="bold" mb={2}>Estado de las Credenciales:</Text>
        <VStack align="stretch" spacing={2}>
          <Text>
            URL: <Code>{connectionStatus.credentials.url}</Code>
          </Text>
          <Text>
            Clave Anon: <Code>{connectionStatus.credentials.hasKey ? 'Configurada' : 'No configurada'}</Code>
          </Text>
        </VStack>
      </Box>

      {connectionStatus.error ? (
        <Alert status="error">
          <AlertIcon />
          <Box>
            <AlertTitle>Error de conexión</AlertTitle>
            <AlertDescription>
              {connectionStatus.error}
            </AlertDescription>
          </Box>
        </Alert>
      ) : connectionStatus.connected ? (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Conexión establecida</AlertTitle>
        </Alert>
      ) : null}

      <Button
        onClick={testConnection}
        isLoading={connectionStatus.checking}
        colorScheme={connectionStatus.connected ? "green" : "blue"}
      >
        Probar conexión
      </Button>
    </VStack>
  )
}

export default SupabaseTest
