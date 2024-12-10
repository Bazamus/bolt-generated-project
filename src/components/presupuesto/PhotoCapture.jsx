import { useState } from 'react'
import Webcam from 'react-webcam'
import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton
} from '@chakra-ui/react'

export default function PhotoCapture({ photos = [], onPhotoAdd, onPhotoRemove }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const webcamRef = React.useRef(null)

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot()
    if (imageSrc) {
      try {
        // Convertir base64 a blob
        const res = await fetch(imageSrc)
        const blob = await res.blob()
        onPhotoAdd(blob)
        onClose()
      } catch (error) {
        console.error('Error al capturar foto:', error)
      }
    }
  }

  return (
    <Box>
      <Button onClick={onOpen} mb={4}>
        Capturar Foto
      </Button>

      <SimpleGrid columns={[2, 3, 4]} spacing={4}>
        {photos.map((photo, index) => (
          <Box key={index} position="relative">
            <Image
              src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)}
              alt={`Foto ${index + 1}`}
              borderRadius="md"
            />
            <IconButton
              position="absolute"
              top={1}
              right={1}
              size="sm"
              colorScheme="red"
              onClick={() => onPhotoRemove(index)}
              aria-label="Eliminar foto"
            />
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Capturar Foto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
            />
            <Button onClick={capture} colorScheme="blue" mt={4} w="100%">
              Capturar
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
