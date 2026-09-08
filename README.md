# Grupo Saly — Sitio Web

Landing page corporativa + módulo administrativo para Grupo Saly (construcción,
remodelación e inmobiliaria). Construido con Next.js 16 (App Router),
TypeScript, Tailwind CSS y Framer Motion.

## Qué incluye

- **Landing page** con hero, las 6 secciones de servicios (Remodelaciones,
  Infraestructura Hospitalaria, Casas, Edificios, Locales Comerciales,
  Bodegas), estadísticas, proceso de trabajo, testimonios y CTA — cada
  sección con botón de WhatsApp con mensaje predefinido.
- **Subpáginas por servicio** (`/servicios/[slug]`) con galería de fotos,
  características y WhatsApp específico de ese servicio.
- **Módulo de ventas** (`/proyectos`) para casas, edificios, locales y
  bodegas en venta, con filtros, ficha de cada inmueble
  (`/proyectos/[slug]`) y botón para copiar la URL y enviarla a un cliente.
- **Panel administrativo** (`/admin`) protegido por contraseña:
  - Pestaña **Inmuebles**: publicar/editar/eliminar inmuebles en segundos
    (fotos, precio, ubicación, características). Aparecen de inmediato en
    la home y en `/proyectos`.
  - Pestaña **Fotos de Servicios**: subir/eliminar las fotos de cada
    servicio.
  - Cualquier foto subida (de cualquier tamaño o proporción) se
    redimensiona y convierte a WEBP automáticamente, y se muestra siempre
    recortada de forma uniforme (`object-fit: cover`) en toda la web.

## Requisitos

- Node.js 20+

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Crea un archivo `.env.local` (no se sube a git) con:

```bash
ADMIN_PASSWORD=elige-una-contraseña-segura
ADMIN_SESSION_SECRET=una-cadena-aleatoria-larga
```

- `ADMIN_PASSWORD`: contraseña para entrar a `/admin/login`. Si no se
  define, se usa `gruposaly2024` por defecto — **cámbiala antes de
  publicar el sitio**.
- `ADMIN_SESSION_SECRET`: clave usada para firmar la cookie de sesión del
  panel admin. Si no se define, se usa `ADMIN_PASSWORD` como clave.

## Build y producción

```bash
npm run build
npm run start
```

### ⚠️ Importante: dónde desplegar

Los datos (inmuebles, fotos) se guardan en el disco del servidor:

- `data/properties.json` y `data/service-images.json` — información de
  inmuebles y galerías.
- `uploads/` (fuera de `public/`, servido mediante `/api/media/...`) —
  las imágenes subidas desde el panel admin.

Esto significa que el servidor necesita **disco persistente** entre
peticiones y despliegues. Funciona perfecto en:

- Un VPS o servidor propio (con `pm2`, `systemd`, Docker + volumen, etc.)
- Render, Railway, Fly.io u otro proveedor con disco persistente.

**No funciona correctamente en plataformas serverless "stateless" como
Vercel/Netlify sin un volumen persistente configurado**, porque el
sistema de archivos se reinicia en cada despliegue (o incluso entre
peticiones). Si más adelante quieres desplegar ahí, lo siguiente sería
migrar el almacenamiento de imágenes a un servicio externo (S3,
Cloudflare R2, Cloudinary) y los datos a una base de datos (Postgres,
etc.) — el código ya está organizado por capas (`src/lib/upload.ts`,
`src/lib/properties.ts`, `src/lib/serviceImages.ts`) para facilitar ese
cambio cuando se necesite.

## WhatsApp

El número de WhatsApp y los mensajes predefinidos de cada botón están en
`src/lib/services.ts` (`WHATSAPP_NUMBER`) y en la definición de cada
servicio (`whatsappMessage`). Los inmuebles arman su mensaje
automáticamente con el nombre del inmueble y su URL.
