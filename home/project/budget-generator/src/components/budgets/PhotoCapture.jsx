import { useState, useRef } from 'react'
import {
  Box,
  Button,
  SimpleGrid,
  Image,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { FiCamera, FiTrash2 } from 'react-icons/fi'
import Webcam from 'react-webcam'

function PhotoCapture({ photos = [], onPhotoAdd, onPhotoRemove }) {
  const webcamRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const capture = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        // Convertir base64 a blob
        const res = await fetch(imageSrc)
        const blob = await res.blob()
        await onPhotoAdd(blob)
        onClose()
      }
    } catch (error) {
      toast({
        title: 'Error al capturar foto',
        description: error.message,
        status: 'error',
        duration: 3000
      })
    }
  }

  return (
    <Box>
      <Button leftIcon={<FiCamera />} onClick={onOpen} mb={4}>
        Capturar Foto
      </Button>

      <SimpleGrid columns={[2, 3, 4]} spacing={4}>
        {photos.map((photo, index) => (
          <Box key={index} position="relative">
            <Image
              src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)}
              alt={`Foto ${index + 1}`}
              borderRadius="md"
              objectFit="cover"
              h="150px"
              w="100%"
            />
            <IconButton
              icon={<FiTrash2 />}
              position="absolute"
              top={2}
              right={2}
              size="sm"
              colorScheme="red"
              onClick={() => onPhotoRemove(index)}
            />
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Capturar Foto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={{
                facingMode: 'environment'
              }}
            />
            <Button
              onClick={capture}
              colorScheme="blue"
              w="100%"
              mt={4}
              leftIcon={<FiCamera />}
            >
              Capturar
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default PhotoCapture
