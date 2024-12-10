// Actualizar el PresupuestoForm existente añadiendo la sección de fotos

// Añadir este import
import PhotoCapture from './PhotoCapture'

// Añadir al estado inicial
const [photos, setPhotos] = useState([])

// Añadir después de loadClientes en useEffect
const loadPhotos = async () => {
  if (initialData?.id) {
    try {
      const data = await presupuestoService.getPhotos(initialData.id)
      setPhotos(data.map(p => p.url))
    } catch (error) {
      toast({
        title: 'Error al cargar fotos',
        status: 'error',
        duration: 3000
      })
    }
  }
}

useEffect(() => {
  loadClientes()
  loadPhotos()
}, [initialData])

// Añadir estas funciones para manejar las fotos
const handlePhotoAdd = async (photoBlob) => {
  if (initialData?.id) {
    try {
      const url = await presupuestoService.uploadPhoto(initialData.id, photoBlob)
      setPhotos([...photos, url])
    } catch (error) {
      toast({
        title: 'Error al subir foto',
        status: 'error',
        duration: 3000
      })
    }
  } else {
    setPhotos([...photos, photoBlob])
  }
}

const handlePhotoRemove = async (index) => {
  try {
    if (initialData?.id && typeof photos[index] === 'string') {
      await presupuestoService.deletePhoto(photos[index])
    }
    const newPhotos = [...photos]
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)
  } catch (error) {
    toast({
      title: 'Error al eliminar foto',
      status: 'error',
      duration: 3000
    })
  }
}

// Añadir antes del último FormControl
<FormControl>
  <FormLabel>Fotos</FormLabel>
  <PhotoCapture
    photos={photos}
    onPhotoAdd={handlePhotoAdd}
    onPhotoRemove={handlePhotoRemove}
  />
</FormControl>
