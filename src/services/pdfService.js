import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export const generatePDF = (presupuesto, photos) => {
  const doc = new jsPDF()
  
  // Título y datos del cliente
  doc.setFontSize(20)
  doc.text('Presupuesto', 105, 20, { align: 'center' })
  
  doc.setFontSize(12)
  doc.text(`Cliente: ${presupuesto.clientes.nombre}`, 20, 40)
  doc.text(`Fecha: ${new Date(presupuesto.fecha_creacion).toLocaleDateString()}`, 20, 50)
  doc.text(`Estado: ${presupuesto.estado.replace('_', ' ')}`, 20, 60)

  // Tabla de materiales
  const materialesData = presupuesto.presupuesto_materiales.map(m => [
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
  doc.text(`Mano de obra: ${presupuesto.mano_obra}€`, 20, y)
  doc.text(`Desplazamiento: ${presupuesto.desplazamiento}€`, 20, y + 10)
  doc.text(`Imprevistos: ${presupuesto.imprevistos}€`, 20, y + 20)
  
  // Total
  doc.setFontSize(14)
  doc.text(`Total: ${presupuesto.total}€`, 20, y + 40)

  // Notas
  if (presupuesto.notas) {
    doc.setFontSize(12)
    doc.text('Notas:', 20, y + 60)
    doc.setFontSize(10)
    const splitNotes = doc.splitTextToSize(presupuesto.notas, 170)
    doc.text(splitNotes, 20, y + 70)
  }

  // Fotos
  if (photos && photos.length > 0) {
    doc.addPage()
    doc.setFontSize(14)
    doc.text('Fotos adjuntas', 105, 20, { align: 'center' })

    let yPos = 40
    const imageWidth = 80
    const imageHeight = 60

    photos.forEach((photo, index) => {
      if (index > 0 && index % 2 === 0) {
        yPos += imageHeight + 10
      }

      const xPos = index % 2 === 0 ? 20 : 110
      doc.addImage(photo, 'JPEG', xPos, yPos, imageWidth, imageHeight)
    })
  }

  return doc
}
