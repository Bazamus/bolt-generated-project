import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  NumberInput,
  NumberInputField,
  Textarea
} from '@chakra-ui/react'
import { useState } from 'react'

function MaterialForm({ onSubmit, initialData = {}, onClose }) {
  const [formData, setFormData] = useState({
    nombre: initialData.nombre || '',
    precio: initialData.precio || '',
    descripcion: initialData.descripcion || ''
  })
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await onSubmit(formData)
      toast({
        title: 'Material guardado exitosamente',
        status: 'success',
        duration: 3000
      })
      onClose()
    } catch (error) {
      toast({
        title: 'Error al guardar material',
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

        <FormControl isRequired>
          <FormLabel>Precio</FormLabel>
          <NumberInput
            value={formData.precio}
            onChange={(value) => setFormData({ ...formData, precio: value })}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Descripción</FormLabel>
          <Textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" w="100%">
          {initialData.id ? 'Actualizar' : 'Crear'} Material
        </Button>
      </VStack>
    </form>
  )
}

export default MaterialForm
