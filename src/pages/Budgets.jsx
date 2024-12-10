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
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  HStack,
  useToast
} from '@chakra-ui/react'
import { presupuestoService } from '../services/presupuestoService'
import PresupuestoForm from '../components/presupuesto/PresupuestoForm'

export default function Budgets() {
  const [presupuestos, setPresupuestos] = useState([])
  const [selectedPresupuesto, setSelectedPresupuesto] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const loadPresupuestos = async () => {
    try {
      const data = await presupuestoService.getPresupuestos()
      setPresupuestos(data)
    } catch (error) {
      toast({
        title: 'Error al cargar presupuestos',
        description: error.message,
        status: 'error',
        duration: 3000
      })
    }
  }

  useEffect(() => {
    loadPresupuestos()
  }, [])

  const handleSubmit = async (formData) => {
    try {
      if (selectedPresupuesto) {
        await presupuestoService.updatePresupuesto(
          selectedPresupuesto.id,
          formData,
          formData.materiales
        )
      } else {
        await presupuestoService.createPresupuesto(formData, formData.materiales)
      }
      onClose()
      loadPresupuestos()
    } catch (error) {
      throw error
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este presupuesto?')) {
      try {
        await presupuestoService.deletePresupuesto(id)
        loadPresupuestos()
        toast({
          title: 'Presupuesto eliminado',
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

  const getEstadoBadge = (estado) => {
    const colors = {
      en_edicion: 'gray',
      pendiente_respuesta: 'yellow',
      aceptado: 'green',
      finalizado: 'blue'
    }
    return <Badge colorScheme={colors[estado]}>{estado.replace('_', ' ')}</Badge>
  }

  const openModal = (presupuesto = null) => {
    setSelectedPresupuesto(presupuesto)
    onOpen()
  }

  return (
    <Box>
      <Button colorScheme="blue" mb={4} onClick={() => openModal()}>
        Nuevo Presupuesto
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Cliente</Th>
            <Th>Estado</Th>
            <Th>Total</Th>
            <Th>Fecha</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {presupuestos.map((presupuesto) => (
            <Tr key={presupuesto.id}>
              <Td>{presupuesto.clientes?.nombre}</Td>
              <Td>{getEstadoBadge(presupuesto.estado)}</Td>
              <Td>{presupuesto.total}€</Td>
              <Td>{new Date(presupuesto.fecha_creacion).toLocaleDateString()}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" onClick={() => openModal(presupuesto)}>
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(presupuesto.id)}
                  >
                    Eliminar
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedPresupuesto ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <PresupuestoForm
              onSubmit={handleSubmit}
              initialData={selectedPresupuesto}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
