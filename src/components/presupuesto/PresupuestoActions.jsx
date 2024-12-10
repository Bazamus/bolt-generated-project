import { useState } from 'react'
import {
  Button,
  ButtonGroup,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack
} from '@chakra-ui/react'
import { generatePDF } from '../../services/pdfService'

export default function PresupuestoActions({ presupuesto, photos }) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const toast = useToast()

  const handleDownloadPDF = () => {
    try {
      const doc = generatePDF(presupuesto, photos)
      doc.save(`presupuesto-${presupuesto.id}.pdf`)
    } catch (error) {
      toast({
        title: 'Error al generar PDF',
        status: 'error',
        duration: 3000
      })
    }
  }

  const handleSendEmail = async () => {
    try {
      const doc = generatePDF(presupuesto, photos)
      const pdfBlob = doc.output('blob')
      
      // Aquí implementarías la lógica de envío de email
      // Podrías usar un servicio como SendGrid o similar
      
      setIsEmailModalOpen(false)
      toast({
        title: 'Presupuesto enviado',
        status: 'success',
        duration: 3000
      })
    } catch (error) {
      toast({
        title: 'Error al enviar email',
        status: 'error',
        duration: 3000
      })
    }
  }

  const handleShareWhatsApp = () => {
    // Implementar compartir por WhatsApp
    // Podrías generar un link para compartir o usar la API de WhatsApp Business
  }

  return (
    <>
      <ButtonGroup spacing={4}>
        <Button onClick={handleDownloadPDF}>
          Descargar PDF
        </Button>
        <Button onClick={() => setIsEmailModalOpen(true)}>
          Enviar por Email
        </Button>
        <Button onClick={handleShareWhatsApp}>
          Compartir por WhatsApp
        </Button>
      </ButtonGroup>

      <Modal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enviar Presupuesto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Email del cliente</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Button onClick={handleSendEmail} colorScheme="blue">
                Enviar
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
