# Maderas Caroya — Sistema de Carga de Pedidos

App React + TypeScript para cargar piezas en una planilla Excel existente, preservando imágenes y formato original.

## Estructura

```
maderas-caroya/
├── src/
│   ├── types/index.ts         # Tipos: Pieza, PiezaFormData
│   ├── hooks/
│   │   ├── usePiezas.ts       # Estado del listado de piezas
│   │   ├── useExport.ts       # Lógica de carga/descarga (llama al backend)
│   │   └── useToast.ts        # Notificaciones
│   └── components/
│       ├── PiezaForm          # Formulario de carga
│       ├── PiezasTable        # Tabla con listado
│       ├── ExportBar          # Cargar archivo + botón descargar
│       └── Toast              # Notificaciones visuales
├── servidor.py                # Backend Flask (preserva imágenes del Excel)
├── requirements.txt
├── Procfile                   # Para Railway/Render
└── vercel.json                # Para Vercel (frontend)
```

## Desarrollo local

### 1. Frontend
\`\`\`bash
cp .env.example .env
npm install
npm start
\`\`\`

### 2. Backend Python
\`\`\`bash
pip install -r requirements.txt
python servidor.py
\`\`\`

Frontend en http://localhost:3000 · Backend en http://localhost:5055

## Deploy

### Frontend → Vercel
\`\`\`bash
npm run build
npx vercel --prod
\`\`\`
Variable de entorno en Vercel: `REACT_APP_BACKEND_URL=https://tu-backend.railway.app/insertar`

### Backend → Railway / Render
1. Subí el repo a GitHub y conectalo
2. Railway detecta el Procfile automáticamente
3. Variable de entorno: `ALLOWED_ORIGIN=https://tu-app.vercel.app`
