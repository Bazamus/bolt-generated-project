export type Cliente = {
  id: string;
  nombre: string;
  telefono?: string;
  correo?: string;
  empresa?: string;
  fecha_creacion: string;
  updated_at: string;
}

export type Material = {
  id: string;
  nombre: string;
  precio: number;
  descripcion?: string;
  created_at: string;
}

export type EstadoPresupuesto = 
  | 'en_edicion'
  | 'pendiente_respuesta'
  | 'aceptado'
  | 'finalizado';

export type Presupuesto = {
  id: string;
  cliente_id: string;
  estado: EstadoPresupuesto;
  total: number;
  mano_obra: number;
  desplazamiento: number;
  imprevistos: number;
  notas?: string;
  fecha_creacion: string;
  updated_at: string;
}

export type PresupuestoMaterial = {
  id: string;
  presupuesto_id: string;
  material_id: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export type Foto = {
  id: string;
  presupuesto_id: string;
  url: string;
  created_at: string;
}
