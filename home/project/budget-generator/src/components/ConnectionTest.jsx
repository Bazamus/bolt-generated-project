import { useEffect, useState } from 'react'
import { Box, Text, Spinner, List, ListItem, ListIcon } from '@chakra-ui/react'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { supabase } from '../lib/supabase'

function ConnectionTest() {
  const [status, setStatus] = useState({
    checking: true,
    database: false,
    storage: false,
    tables: {
      clientes: false,
      materiales: false,
      presupuestos: false,
      presupuesto_materiales: false,
      fotos: false
    }
  })

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      // Verificar conexión a la base de datos
      const { data: dbCheck, error: dbError } = await supabase
        .from('clientes')
        .select('count(*)', { count: 'exact' })
      
      // Verificar acceso al storage
      const { data: storageCheck, error: storageError } = await supabase
        .storage
        .getBucket('presupuesto-fotos')

      // Verificar tablas
      const tables = ['clientes', 'materiales', 'presupuestos', 'presupuesto_materiales', 'fotos']
      const tableStatus = {}
      
      for (const table of tables) {
        const { error } = await supabase
          .from(table)
          .select('count(*)', { count: 'exact' })
          .limit(1)
        
        tableStatus[table] = !error
      }

      setStatus({
        checking: false,
        database: !dbError,
        storage: !storageError,
        tables: tableStatus
      })

    } catch (error) {
      console.error('Error checking connection:', error)
      setStatus(prev => ({
        ...prev,
        checking: false,
        database: false,
        storage: false
      }))
    }
  }

  if (status.checking) {
    return (
      <Box p={4} display="flex" alignItems="center">
        <Spinner mr={4} />
        <Text>Verificando conexión...</Text>
      </Box>
    )
  }

  return (
    <Box p={4}>
      <List spacing={3}>
        <ListItem display="flex" alignItems="center">
          <ListIcon
            as={status.database ? FiCheckCircle : FiXCircle}
            color={status.database ? 'green.500' : 'red.500'}
          />
          Conexión a la base de datos: {status.database ? 'OK' : 'Error'}
        </ListItem>
        
        <ListItem display="flex" alignItems="center">
          <ListIcon
            as={status.storage ? FiCheckCircle : FiXCircle}
            color={status.storage ? 'green.500' : 'red.500'}
          />
          Conexión al storage: {status.storage ? 'OK' : 'Error'}
        </ListItem>

        <ListItem>
          <Text fontWeight="bold" mb={2}>Estado de las tablas:</Text>
          <List pl={4} spacing={2}>
            {Object.entries(status.tables).map(([table, status]) => (
              <ListItem key={table} display="flex" alignItems="center">
                <ListIcon
                  as={status ? FiCheckCircle : FiXCircle}
                  color={status ? 'green.500' : 'red.500'}
                />
                {table}: {status ? 'OK' : 'Error'}
              </ListItem>
            ))}
          </List>
        </ListItem>
      </List>
    </Box>
  )
}

export default ConnectionTest
