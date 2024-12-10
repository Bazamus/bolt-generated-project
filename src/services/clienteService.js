import { supabase } from '../lib/supabaseClient'

export const clienteService = {
  async getClientes() {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('nombre')
    
    if (error) throw error
    return data
  },

  async createCliente(cliente) {
    const { data, error } = await supabase
      .from('clientes')
      .insert(cliente)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateCliente(id, cliente) {
    const { data, error } = await supabase
      .from('clientes')
      .update(cliente)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteCliente(id) {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
