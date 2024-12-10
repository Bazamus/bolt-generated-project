// Añadir estas funciones al presupuestoService existente

async uploadPhoto(presupuestoId, photoBlob) {
  const fileName = `${presupuestoId}/${Date.now()}.jpg`
  const { data, error } = await supabase.storage
    .from('presupuesto-fotos')
    .upload(fileName, photoBlob)
  
  if (error) throw error

  const { data: urlData } = supabase.storage
    .from('presupuesto-fotos')
    .getPublicUrl(fileName)

  const { error: dbError } = await supabase
    .from('fotos')
    .insert({
      presupuesto_id: presupuestoId,
      url: urlData.publicUrl
    })

  if (dbError) throw dbError
  return urlData.publicUrl
},

async getPhotos(presupuestoId) {
  const { data, error } = await supabase
    .from('fotos')
    .select('*')
    .eq('presupuesto_id', presupuestoId)
  
  if (error) throw error
  return data
},

async deletePhoto(id) {
  const { error } = await supabase
    .from('fotos')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}
