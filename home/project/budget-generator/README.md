# Generador de Presupuestos

Aplicación web para generar y gestionar presupuestos, desarrollada con React, Vite y Supabase.

## Características

- Gestión de clientes
- Creación de presupuestos
- Gestión de materiales
- Generación de PDF
- Captura de fotos
- Dashboard con estadísticas

## Tecnologías

- React
- Vite
- Chakra UI
- Supabase
- React Router DOM

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instala las dependencias:
```bash
cd budget-generator
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_de_supabase
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
budget-generator/
├── src/
│   ├── components/    # Componentes reutilizables
│   ├── pages/        # Páginas de la aplicación
│   ├── lib/          # Utilidades y configuración
│   ├── services/     # Servicios de API
│   ├── App.jsx       # Componente principal
│   └── main.jsx      # Punto de entrada
├── public/           # Archivos estáticos
└── package.json      # Dependencias y scripts
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa de la versión de producción
