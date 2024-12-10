-- Ejecutar en el SQL Editor de Supabase

-- Crear políticas para el bucket de fotos
BEGIN;

-- Política para insertar archivos (solo usuarios autenticados)
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'presupuesto-fotos');

-- Política para leer archivos (acceso público)
CREATE POLICY "Allow public downloads" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'presupuesto-fotos');

-- Política para eliminar archivos (solo usuarios autenticados)
CREATE POLICY "Allow authenticated deletes" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'presupuesto-fotos');

COMMIT;
