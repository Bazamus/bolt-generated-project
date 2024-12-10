import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export const generatePDF = async (budget, photos = []) => {
  const doc = new jsPDF()
  
  // Título y datos del cliente
  doc.setFontSize(20)
  doc.text('Presupuesto', 105, 20, { align: 'center' })
  
  doc.setFontSize(12)
  doc.text(`Cliente: ${budget.clientes.nombre}`, 20, 40)
  doc.text(`Fecha: ${new Date(budget.fecha_creacion).toLocaleDateString()}`, 20, 50)
  doc.text(`Estado: ${budget.estado.replace('_', ' ')}`, 20, 60)

  // Tabla de materiales
  const materialesData = budget.presupuesto_materiales.map(m => [
    m.materiales.nombre,
    m.cantidad,
    `${m.precio_unitario}€`,
    `${m.subtotal}€`
  ])

  doc.autoTable({
    startY: 70,
    head: [['Material', 'Cantidad', 'Precio Unit.', 'Subtotal']],
    body: materialesData,
  })

  // Costos adicionales
  let y = doc.lastAutoTable.finalY + 10
  doc.text(`Mano de obra: ${budget.mano_obra}€`, 20, y)
  doc.text(`Desplazamiento: ${budget.desplazamiento}€`, 20, y + 10)
  doc.text(`Imprevistos: ${budget.imprevistos}€`, 20, y + 20)
  
  // Total
  doc.setFontSize(14)
  doc.text(`Total: ${budget.total}€`, 20, y + 40)

  // Notas
  if (budget.notas) {
    doc.setFontSize(12)
    doc.text('Notas:', 20, y + 60)
    doc.setFontSize(10)
    const splitNotes = doc.splitTextToSize(budget.notas, 170)
    doc.text(splitNotes, 20, y + 70)
  }

  // Fotos
  if (photos.length > 0) {
    doc.addPage()
    doc.setFontSize(14)
    doc.text('Fotos adjuntas', 105, 20, { align: 'center' })

    let yPos = 40
    const imageWidth = 80
    const imageHeight = 60

    for (let i = 0; i < photos.length; i++) {
      if (i > 0 && i % 2 === 0) {
        yPos += imageHeight + 10
      }

      const xPos = i % 2 === 0 ? 20 : 110
      
      try {
        const imgData = await getImageData(photos[i])
        doc.addImage(imgData, 'JPEG', xPos, yPos, imageWidth, imageHeight)
      } catch (error) {
        console.error('Error al añadir imagen:', error)
      }
    }
  }

  return doc
}

const getImageData = (photo) => {
  return new Promise((resolve, reject) => {
    if (typeof photo === 'string') {
      // Si es una URL
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/jpeg'))
      }
      img.onerror = reject
      img.src = photo
    } else {
      // Si es un blob
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(photo)
    }
  })
}
