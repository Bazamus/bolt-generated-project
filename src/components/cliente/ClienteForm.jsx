import { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast
} from '@chakra-ui/react'

export default function ClienteForm({ onSubmit, initialData = {} }) {
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
        title: 'Cliente guardado',
        status: 'success',
        duration: 3000
      })
    } catch (error) {
      toast({
        title: 'Error al guardar',
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
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Teléfono</FormLabel>
          <Input
            value={formData.telefono}
            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Correo</FormLabel>
          <Input
            type="email"
            value={formData.correo}
            onChange={(e) => setFormData({...formData, correo: e.target.value})}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Empresa</FormLabel>
          <Input
            value={formData.empresa}
            onChange={(e) => setFormData({...formData, empresa: e.target.value})}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          {initialData.id ? 'Actualizar' : 'Crear'}
        </Button>
      </VStack>
    </form>
  )
}
