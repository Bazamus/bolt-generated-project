import { supabase } from '../lib/supabase'

export const budgetService = {
  async getBudgets() {
    const { data, error } = await supabase
      .from('presupuestos')
      .select(`
        *,
        clientes (
          id,
          nombre,
          telefono,
          correo,
          empresa
        ),
        presupuesto_materiales (
          id,
          material_id,
          cantidad,
          precio_unitario,
          subtotal,
          materiales (
            id,
            nombre,
            precio
          )
        ),
        fotos (
          id,
          url
        )
      `)
      .order('fecha_creacion', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createBudget(budget, materials = []) {
    const { data: budgetData, error: budgetError } = await supabase
      .from('presupuestos')
      .insert(budget)
      .select()
    
    if (budgetError) throw budgetError

    if (materials.length > 0) {
      const materialsToInsert = materials.map(m => ({
        presupuesto_id: budgetData[0].id,
        material_id: m.material_id,
        cantidad: m.cantidad,
        precio_unitario: m.precio_unitario,
        subtotal: m.cantidad * m.precio_unitario
      }))

      const { error: materialsError } = await supabase
        .from('presupuesto_materiales')
        .insert(materialsToInsert)

      if (materialsError) throw materialsError
    }

    return budgetData[0]
  },

  async updateBudget(id, budget, materials = []) {
    const { data: budgetData, error: budgetError } = await supabase
      .from('presupuestos')
      .update(budget)
      .eq('id', id)
      .select()
    
    if (budgetError) throw budgetError

    // Eliminar materiales existentes
    await supabase
      .from('presupuesto_materiales')
      .delete()
      .eq('presupuesto_id', id)

    if (materials.length > 0) {
      const materialsToInsert = materials.map(m => ({
        presupuesto_id: id,
        material_id: m.material_id,
        cantidad: m.cantidad,
        precio_unitario: m.precio_unitario,
        subtotal: m.cantidad * m.precio_unitario
      }))

      const { error: materialsError } = await supabase
        .from('presupuesto_materiales')
        .insert(materialsToInsert)

      if (materialsError) throw materialsError
    }

    return budgetData[0]
  },

  async deleteBudget(id) {
    const { error } = await supabase
      .from('presupuestos')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async uploadPhoto(budgetId, file) {
    const fileName = `${budgetId}/${Date.now()}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('presupuesto-fotos')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from('presupuesto-fotos')
      .getPublicUrl(fileName)

    const { data: photoData, error: photoError } = await supabase
      .from('fotos')
      .insert({
        presupuesto_id: budgetId,
        url: urlData.publicUrl
      })
      .select()

    if (photoError) throw photoError
    return photoData[0]
  },

  async deletePhoto(id) {
    const { error } = await supabase
      .from('fotos')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
