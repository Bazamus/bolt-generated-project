import { supabase } from '../lib/supabase'

export const materialService = {
  async getMaterials() {
    const { data, error } = await supabase
      .from('materiales')
      .select('*')
      .order('nombre')
    
    if (error) throw error
    return data
  },

  async createMaterial(material) {
    const { data, error } = await supabase
      .from('materiales')
      .insert(material)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateMaterial(id, material) {
    const { data, error } = await supabase
      .from('materiales')
      .update(material)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteMaterial(id) {
    const { error } = await supabase
      .from('materiales')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
