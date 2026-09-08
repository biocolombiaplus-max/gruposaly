# Grupo Saly — Sitio Web

Landing page corporativa + módulo administrativo para Grupo Saly (construcción,
remodelación e inmobiliaria). Construido con Next.js 16 (App Router),
TypeScript, Tailwind CSS, Framer Motion y **Firebase** (Firestore + Storage)
como base de datos y almacenamiento de imágenes — pensado para desplegarse
en **Vercel**.

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
    redimensiona y convierte a WEBP automáticamente, se sube a **Firebase
    Storage**, y se muestra siempre recortada de forma uniforme
    (`object-fit: cover`) en toda la web.

## Por qué Firebase

Vercel es **serverless**: el disco no persiste entre peticiones ni entre
despliegues. Por eso los inmuebles, las galerías de servicios y las
imágenes subidas desde el panel admin se guardan en:

- **Firestore** → datos de inmuebles y galerías de servicios.
- **Firebase Storage** → los archivos de imagen (ya redimensionados a
  WEBP).

El servidor de Next.js (API routes) usa el **Firebase Admin SDK** con una
cuenta de servicio — el navegador nunca habla directo con Firebase, así
que no hay que tocar las reglas de seguridad de Firestore/Storage.

## 1. Configurar Firebase

1. Entra a [console.firebase.google.com](https://console.firebase.google.com)
   y crea un proyecto (o usa uno que ya tengas).
2. Activa **Firestore Database** (modo producción, cualquier región).
3. Activa **Storage** (bucket por defecto).
4. **Haz el bucket de Storage público para lectura** (las fotos del sitio
   deben poder verse sin iniciar sesión). En
   [Google Cloud Console → Storage → Buckets](https://console.cloud.google.com/storage/browser),
   abre tu bucket → pestaña **Permisos** → **Otorgar acceso** → principal
   `allUsers` → rol **"Storage Object Viewer" (Lector de objetos de
   Storage)**. Esto es un paso único; no afecta la escritura (solo el
   servidor, con la cuenta de servicio, puede subir o borrar archivos).
5. Ve a **Configuración del proyecto → Cuentas de servicio** y genera una
   nueva clave privada (botón "Generar nueva clave privada"). Se descarga
   un archivo `.json` — **no lo subas al repositorio**.
6. De ese JSON necesitas 3 valores:
   - `project_id`
   - `client_email`
   - `private_key`
7. El nombre del bucket de Storage lo ves en Firebase Console → Storage
   (arriba, algo como `tu-proyecto.appspot.com` o
   `tu-proyecto.firebasestorage.app`).

## 2. Variables de entorno

Crea `.env.local` para desarrollo local (no se sube a git):

```bash
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-proyecto-id.iam.gserviceaccount.com
# Pega la private_key completa, con \n literales (no saltos de línea reales):
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=tu-proyecto-id.appspot.com

ADMIN_PASSWORD=elige-una-contraseña-segura
ADMIN_SESSION_SECRET=una-cadena-aleatoria-larga
```

- `ADMIN_PASSWORD`: contraseña para entrar a `/admin/login`. Si no se
  define, se usa `gruposaly2024` por defecto — **cámbiala antes de
  publicar el sitio**.
- `ADMIN_SESSION_SECRET`: clave para firmar la cookie de sesión del panel
  admin. Si no se define, se usa `ADMIN_PASSWORD` como clave.

## 3. Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El panel admin
(`/admin/login`) ya funciona en local usando el mismo Firestore/Storage
del proyecto configurado arriba.

## 4. Desplegar en Vercel

1. Sube el repositorio a GitHub (o el que ya tengas conectado).
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importa
   el repo.
3. En **Settings → Environment Variables** agrega las mismas variables del
   paso 2 (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`,
   `FIREBASE_PRIVATE_KEY`, `FIREBASE_STORAGE_BUCKET`, `ADMIN_PASSWORD`,
   `ADMIN_SESSION_SECRET`).
   - Importante con `FIREBASE_PRIVATE_KEY`: pégala tal cual, con los `\n`
     literales como en `.env.local` (Vercel la guarda como string; el
     código ya la convierte a saltos de línea reales).
4. Deploy. Cada vez que subas una imagen o publiques un inmueble desde
   `/admin`, queda guardado en Firebase — persiste sin importar cuántas
   veces vuelvas a desplegar.

No se necesita ninguna configuración adicional de `vercel.json`.

## WhatsApp

El número de WhatsApp y los mensajes predefinidos de cada botón están en
`src/lib/services.ts` (`WHATSAPP_NUMBER`) y en la definición de cada
servicio (`whatsappMessage`). Los inmuebles arman su mensaje
automáticamente con el nombre del inmueble y su URL.
