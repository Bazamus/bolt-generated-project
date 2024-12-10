-- Habilitar la extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear enum para estados de presupuesto
CREATE TYPE estado_presupuesto AS ENUM (
  'en_edicion',
  'pendiente_respuesta',
  'aceptado',
  'finalizado'
);

-- Tabla de Clientes
CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  telefono TEXT,
  correo TEXT,
  empresa TEXT,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL
);

-- Tabla de Materiales
CREATE TABLE materiales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL
);

-- Tabla de Presupuestos
CREATE TABLE presupuestos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  estado estado_presupuesto DEFAULT 'en_edicion',
  total DECIMAL(10,2),
  mano_obra DECIMAL(10,2) DEFAULT 0,
  desplazamiento DECIMAL(10,2) DEFAULT 0,
  imprevistos DECIMAL(10,2) DEFAULT 0,
  notas TEXT,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL
);

-- Tabla de Materiales en Presupuesto
CREATE TABLE presupuesto_materiales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  presupuesto_id UUID REFERENCES presupuestos(id) ON DELETE CASCADE,
  material_id UUID REFERENCES materiales(id),
  cantidad INTEGER NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL
);

-- Tabla de Fotos
CREATE TABLE fotos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  presupuesto_id UUID REFERENCES presupuestos(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL
);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('UTC'::TEXT, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para cada tabla que necesita updated_at
CREATE TRIGGER update_clientes_updated_at
  BEFORE UPDATE ON clientes
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_presupuestos_updated_at
  BEFORE UPDATE ON presupuestos
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Políticas de seguridad (RLS)
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE materiales ENABLE ROW LEVEL SECURITY;
ALTER TABLE presupuestos ENABLE ROW LEVEL SECURITY;
ALTER TABLE presupuesto_materiales ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios autenticados
CREATE POLICY "Allow full access to authenticated users" ON clientes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow full access to authenticated users" ON materiales
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow full access to authenticated users" ON presupuestos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow full access to authenticated users" ON presupuesto_materiales
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow full access to authenticated users" ON fotos
  FOR ALL USING (auth.role() = 'authenticated');

-- Índices para mejorar el rendimiento
CREATE INDEX idx_presupuestos_cliente_id ON presupuestos(cliente_id);
CREATE INDEX idx_presupuesto_materiales_presupuesto_id ON presupuesto_materiales(presupuesto_id);
CREATE INDEX idx_fotos_presupuesto_id ON fotos(presupuesto_id);

-- Datos de ejemplo para materiales
INSERT INTO materiales (nombre, precio, descripcion) VALUES
  ('Material 1', 10.50, 'Descripción del material 1'),
  ('Material 2', 15.75, 'Descripción del material 2'),
  ('Material 3', 20.00, 'Descripción del material 3');
