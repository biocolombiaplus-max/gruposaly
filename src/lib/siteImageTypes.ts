// Types and constants shared between server code and client components.
// Kept separate from `siteImages.ts` so client bundles never pull in the
// Firebase Admin SDK (and its Node-only gRPC dependencies) used there.

export type SiteImageSlot = "logo" | "hero" | "heroCard" | "about" | "cta";

export const SITE_IMAGE_SLOTS: { slot: SiteImageSlot; label: string; hint: string }[] = [
  {
    slot: "logo",
    label: "Logo de Grupo Saly",
    hint: "Se usa en el menú y en el pie de página. Idealmente un PNG con fondo transparente.",
  },
  {
    slot: "hero",
    label: "Imagen principal (Hero)",
    hint: "Foto de fondo grande en la parte superior de la página de inicio.",
  },
  {
    slot: "heroCard",
    label: "Tarjeta destacada del Hero",
    hint: "Foto dentro del cuadrado que aparece junto al titular principal (solo se ve en pantallas grandes).",
  },
  {
    slot: "about",
    label: "Fondo — Sección \"Sobre Grupo Saly\"",
    hint: "Foto de ambiente detrás del texto de la sección Nosotros.",
  },
  {
    slot: "cta",
    label: "Fondo — Sección final de contacto",
    hint: "Foto de fondo detrás del llamado a la acción antes del pie de página.",
  },
];

export type SiteImagesMap = Partial<Record<SiteImageSlot, string>>;
