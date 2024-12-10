import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'

function ClientForm({ onSubmit, initialData = {}, onClose }) {
  const [formData, setFormData] = useState({
    nombre: initialData.nombre || '',
    telefono: initialData.telefono || '',
    correo: initialData.correo || '',
    empresa: initialData.empresa || ''
  })
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await onSubmit(formData)
      toast({
        title: 'Cliente guardado exitosamente',
        status: 'success',
        duration: 3000
      })
      onClose()
    } catch (error) {
      toast({
        title: 'Error al guardar cliente',
        description: error.message,
        status: 'error',
        duration: 3000
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Teléfono</FormLabel>
          <Input
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Correo</FormLabel>
          <Input
            type="email"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Empresa</FormLabel>
          <Input
            value={formData.empresa}
            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" w="100%">
          {initialData.id ? 'Actualizar' : 'Crear'} Cliente
        </Button>
      </VStack>
    </form>
  )
}

export default ClientForm
