# Grupo Saly — Sitio Web

Landing page corporativa + módulo administrativo para Grupo Saly (construcción,
remodelación e inmobiliaria). Construido con Next.js 16 (App Router),
TypeScript, Tailwind CSS y Framer Motion. Los datos viven en **Firestore**
(gratis, plan Spark) y las imágenes en **Vercel Blob** (gratis, plan Hobby) —
ninguno de los dos pide tarjeta para el uso de este sitio. Pensado para
desplegarse en **Vercel**.

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
    redimensiona y convierte a WEBP automáticamente, se sube a **Vercel
    Blob**, y se muestra siempre recortada de forma uniforme
    (`object-fit: cover`) en toda la web.

## Por qué Firestore + Vercel Blob

Vercel es **serverless**: el disco no persiste entre peticiones ni entre
despliegues. Por eso los inmuebles, las galerías de servicios y las
imágenes subidas desde el panel admin se guardan afuera:

- **Firestore** → datos de inmuebles y galerías de servicios. El servidor
  de Next.js (API routes) usa el **Firebase Admin SDK** con una cuenta de
  servicio — el navegador nunca habla directo con Firebase, así que no
  hay que tocar reglas de seguridad.
- **Vercel Blob** → los archivos de imagen (ya redimensionados a WEBP).
  Como el sitio ya se despliega en Vercel, no hace falta crear cuenta en
  otro proveedor ni agregar tarjeta: el plan Hobby de Vercel incluye Blob
  Storage gratis dentro de sus límites.

## 1. Configurar Firestore (Firebase)

1. Entra a [console.firebase.google.com](https://console.firebase.google.com)
   y crea un proyecto (o usa uno que ya tengas).
2. En el menú, entra a **"Bases de datos y almacenamiento" → Firestore
   Database** (no "Realtime Database", son productos distintos) → **Crear
   base de datos** → elige cualquier ubicación → modo producción →
   Habilitar. Esto sí es gratis en el plan Spark, sin tarjeta.
3. Ve a **Configuración del proyecto** (ícono de engranaje) →
   **Cuentas de servicio** → **"Generar nueva clave privada"**. Se
   descarga un archivo `.json` — **no lo subas al repositorio**.
4. De ese JSON necesitas 3 valores:
   - `project_id`
   - `client_email`
   - `private_key`

## 2. Configurar Vercel Blob

1. En el dashboard de tu proyecto en [vercel.com](https://vercel.com) →
   pestaña **Storage** → **Create Database** → elige **Blob**.
2. Dale un nombre (ej. `gruposaly-media`) y conéctalo a tu proyecto.
3. Vercel crea automáticamente la variable `BLOB_READ_WRITE_TOKEN` y la
   agrega a las Environment Variables del proyecto — no tienes que
   copiarla a mano para producción.
4. Para desarrollo local, copia ese mismo valor a tu `.env.local` (lo ves
   en Storage → tu Blob store → pestaña **".env.local"**, o en Settings →
   Environment Variables → revela el valor).

## 3. Variables de entorno

Crea `.env.local` para desarrollo local (no se sube a git):

```bash
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-proyecto-id.iam.gserviceaccount.com
# Pega la private_key completa, con \n literales (no saltos de línea reales):
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"

BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxx

ADMIN_PASSWORD=elige-una-contraseña-segura
ADMIN_SESSION_SECRET=una-cadena-aleatoria-larga
```

- `ADMIN_PASSWORD`: contraseña para entrar a `/admin/login`. Si no se
  define, se usa `gruposaly2024` por defecto — **cámbiala antes de
  publicar el sitio**.
- `ADMIN_SESSION_SECRET`: clave para firmar la cookie de sesión del panel
  admin. Si no se define, se usa `ADMIN_PASSWORD` como clave.

## 4. Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El panel admin
(`/admin/login`) ya funciona en local usando el mismo Firestore/Blob
configurado arriba.

## 5. Desplegar en Vercel

1. Sube el repositorio a GitHub (o el que ya tengas conectado).
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importa
   el repo.
3. Sigue el paso **"2. Configurar Vercel Blob"** de arriba (crea el store
   y conéctalo — esto ya deja `BLOB_READ_WRITE_TOKEN` puesta sola).
4. En **Settings → Environment Variables** agrega las 3 de Firebase
   (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`)
   y `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`.
   - Importante con `FIREBASE_PRIVATE_KEY`: pégala tal cual, con los `\n`
     literales como en `.env.local` (Vercel la guarda como string; el
     código ya la convierte a saltos de línea reales).
5. Deploy. Cada vez que subas una imagen o publiques un inmueble desde
   `/admin`, queda guardado en Firestore/Vercel Blob — persiste sin
   importar cuántas veces vuelvas a desplegar.

No se necesita ninguna configuración adicional de `vercel.json`.

## WhatsApp

El número de WhatsApp y los mensajes predefinidos de cada botón están en
`src/lib/services.ts` (`WHATSAPP_NUMBER`) y en la definición de cada
servicio (`whatsappMessage`). Los inmuebles arman su mensaje
automáticamente con el nombre del inmueble y su URL.
