# Grupo Saly — Sitio Web

Landing page corporativa + módulo administrativo para Grupo Saly (construcción,
remodelación e inmobiliaria). Construido con Next.js 16 (App Router),
TypeScript, Tailwind CSS y Framer Motion. Los datos viven en **Firestore**
(gratis, plan Spark) y las imágenes en **Cloudflare R2** (gratis, 10GB) —
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
  - Pestaña **Logo e Imágenes del Sitio**: subir el logo real (se usa en
    el menú y el pie de página) y las fotos de fondo del Hero, de la
    sección "Sobre Grupo Saly" y del CTA final — cada una es una imagen
    única que se reemplaza al subir una nueva.
  - Cualquier foto subida (de cualquier tamaño o proporción) se
    redimensiona y convierte a WEBP automáticamente, se sube a
    **Cloudflare R2**, y se muestra siempre recortada de forma uniforme
    (`object-fit: cover`) en toda la web.

## Por qué Firestore + Cloudflare R2

Vercel es **serverless**: el disco no persiste entre peticiones ni entre
despliegues. Por eso los inmuebles, las galerías de servicios y las
imágenes subidas desde el panel admin se guardan afuera:

- **Firestore** → datos de inmuebles y galerías de servicios. El servidor
  de Next.js (API routes) usa el **Firebase Admin SDK** con una cuenta de
  servicio — el navegador nunca habla directo con Firebase, así que no
  hay que tocar reglas de seguridad.
- **Cloudflare R2** → los archivos de imagen (ya redimensionados a WEBP).
  R2 tiene un plan gratis genuino: 10GB de almacenamiento y, a
  diferencia de casi cualquier otro proveedor, **nunca cobra por tráfico
  de salida** (ver fotos en la web no gasta la cuota) — así que no hay
  sorpresas de facturación que puedan suspender el almacenamiento.

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

## 2. Configurar Cloudflare R2

1. Entra a [dash.cloudflare.com](https://dash.cloudflare.com) y crea una
   cuenta gratis (no pide tarjeta para R2 dentro del límite gratuito).
2. En el menú lateral, busca **R2 Object Storage** → **Create bucket**.
   Dale un nombre, por ejemplo `gruposaly-media`, y créalo (ubicación
   automática está bien).
3. Entra al bucket recién creado → pestaña **Settings** → sección
   **Public access** → **Allow Access** (confirma la advertencia). Esto
   te da una URL pública del tipo
   `https://pub-xxxxxxxxxxxx.r2.dev` — esa es tu `R2_PUBLIC_URL`
   (cópiala tal cual, sin `/` al final).
4. Para las credenciales: en el menú **R2 Object Storage** (no dentro del
   bucket) → **Manage API tokens** → **Create API token**. Dale permisos
   **Object Read & Write**, y si te deja limitarlo a un bucket específico,
   elige el que creaste. Al crearlo te muestra (una sola vez, guárdalos):
   - **Access Key ID** → `R2_ACCESS_KEY_ID`
   - **Secret Access Key** → `R2_SECRET_ACCESS_KEY`
5. El **Account ID** (`R2_ACCOUNT_ID`) lo ves en la misma pantalla de R2
   Object Storage, en la barra lateral derecha, o en la URL del
   dashboard (`dash.cloudflare.com/<account-id>/r2/...`).

Con eso tienes las 5 variables que necesitas: `R2_ACCOUNT_ID`,
`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME` (el nombre
que le pusiste al bucket) y `R2_PUBLIC_URL`.

> Si ya tienes un dominio propio y quieres que las imágenes se vean en
> `media.tudominio.com` en vez de `pub-xxxx.r2.dev`, puedes conectar un
> dominio personalizado desde la misma pestaña **Settings → Custom
> Domains** del bucket (requiere que ese dominio esté en Cloudflare) —
> es opcional, el `.r2.dev` público funciona igual de bien para este
> sitio.

## 3. Variables de entorno

Crea `.env.local` para desarrollo local (no se sube a git):

```bash
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-proyecto-id.iam.gserviceaccount.com
# Pega la private_key completa, con \n literales (no saltos de línea reales):
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"

R2_ACCOUNT_ID=tu-account-id-de-cloudflare
R2_ACCESS_KEY_ID=tu-access-key-id
R2_SECRET_ACCESS_KEY=tu-secret-access-key
R2_BUCKET_NAME=gruposaly-media
R2_PUBLIC_URL=https://pub-xxxxxxxxxxxx.r2.dev

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
(`/admin/login`) ya funciona en local usando el mismo Firestore/R2
configurado arriba.

## 5. Desplegar en Vercel

1. Sube el repositorio a GitHub (o el que ya tengas conectado).
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importa
   el repo.
3. En **Settings → Environment Variables** agrega las 3 de Firebase
   (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`),
   las 5 de Cloudflare R2 (`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`,
   `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`) y
   `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`.
   - Importante con `FIREBASE_PRIVATE_KEY`: pégala tal cual, con los `\n`
     literales como en `.env.local` (Vercel la guarda como string; el
     código ya la convierte a saltos de línea reales).
4. Deploy. Cada vez que subas una imagen o publiques un inmueble desde
   `/admin`, queda guardado en Firestore/Cloudflare R2 — persiste sin
   importar cuántas veces vuelvas a desplegar, y R2 nunca se suspende
   por consumo de tráfico dentro del plan gratis.

No se necesita ninguna configuración adicional de `vercel.json`.

## WhatsApp

El número de WhatsApp y los mensajes predefinidos de cada botón están en
`src/lib/services.ts` (`WHATSAPP_NUMBER`) y en la definición de cada
servicio (`whatsappMessage`). Los inmuebles arman su mensaje
automáticamente con el nombre del inmueble y su URL.
