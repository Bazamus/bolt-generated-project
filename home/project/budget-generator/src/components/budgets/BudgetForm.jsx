// Añadir al BudgetForm existente después del último FormControl y antes del botón de submit

<FormControl>
  <FormLabel>Fotos</FormLabel>
  <PhotoCapture
    photos={photos}
    onPhotoAdd={handlePhotoAdd}
    onPhotoRemove={handlePhotoRemove}
  />
</FormControl>

// Añadir estos estados y funciones al inicio del componente
const [photos, setPhotos] = useState([])

const handlePhotoAdd = async (photo) => {
  setPhotos([...photos, photo])
}

const handlePhotoRemove = (index) => {
  const newPhotos = [...photos]
  newPhotos.splice(index, 1)
  setPhotos(newPhotos)
}

// Modificar el handleSubmit para incluir las fotos
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const budgetData = await onSubmit({ ...formData, materials, photos })
    toast({
      title: 'Presupuesto guardado exitosamente',
      status: 'success',
      duration: 3000
    })
    onClose()
  } catch (error) {
    toast({
      title: 'Error al guardar presupuesto',
      description: error.message,
      status: 'error',
      duration: 3000
    })
  }
}
