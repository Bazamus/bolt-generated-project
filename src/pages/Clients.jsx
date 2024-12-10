import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  HStack,
  useToast
} from '@chakra-ui/react'
import { clienteService } from '../services/clienteService'
import ClienteForm from '../components/cliente/ClienteForm'

export default function Clients() {
  const [clientes, setClientes] = useState([])
  const [selectedCliente, setSelectedCliente] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const loadClientes = async () => {
    try {
      const data = await clienteService.getClientes()
      setClientes(data)
    } catch (error) {
      toast({
        title: 'Error al cargar clientes',
        description: error.message,
        status: 'error',
        duration: 3000
      })
    }
  }

  useEffect(() => {
    loadClientes()
  }, [])

  const handleSubmit = async (formData) => {
    try {
      if (selectedCliente) {
        await clienteService.updateCliente(selectedCliente.id, formData)
      } else {
        await clienteService.createCliente(formData)
      }
      onClose()
      loadClientes()
    } catch (error) {
      throw error
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      try {
        await clienteService.deleteCliente(id)
        loadClientes()
        toast({
          title: 'Cliente eliminado',
          status: 'success',
          duration: 3000
        })
      } catch (error) {
        toast({
          title: 'Error al eliminar',
          description: error.message,
          status: 'error',
          duration: 3000
        })
      }
    }
  }

  const openModal = (cliente = null) => {
    setSelectedCliente(cliente)
    onOpen()
  }

  return (
    <Box>
      <Button colorScheme="blue" mb={4} onClick={() => openModal()}>
        Nuevo Cliente
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Teléfono</Th>
            <Th>Correo</Th>
            <Th>Empresa</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clientes.map((cliente) => (
            <Tr key={cliente.id}>
              <Td>{cliente.nombre}</Td>
              <Td>{cliente.telefono}</Td>
              <Td>{cliente.correo}</Td>
              <Td>{cliente.empresa}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" onClick={() => openModal(cliente)}>
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    Eliminar
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ClienteForm
              onSubmit={handleSubmit}
              initialData={selectedCliente}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
