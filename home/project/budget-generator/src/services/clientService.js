import { supabase } from '../lib/supabase'

export const clientService = {
  async getClients() {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('nombre')
    
    if (error) throw error
    return data
  },

  async createClient(client) {
    const { data, error } = await supabase
      .from('clientes')
      .insert(client)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateClient(id, client) {
    const { data, error } = await supabase
      .from('clientes')
      .update(client)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteClient(id) {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
