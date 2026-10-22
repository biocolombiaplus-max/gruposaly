// Client-safe types/constants for the brochure selector UI. Kept separate
// from the PDF document builder so client bundles never pull in
// @react-pdf/renderer or firebase-admin.

export interface BrochureSection {
  id: "about" | "process" | "stats" | "properties" | "contact";
  label: string;
  hint: string;
}

export const BROCHURE_SECTIONS: BrochureSection[] = [
  {
    id: "about",
    label: "Sobre Grupo Saly",
    hint: "Presentación de la empresa y nuestros diferenciales.",
  },
  {
    id: "process",
    label: "Nuestro Proceso",
    hint: "Las 4 etapas de cómo trabajamos, de diagnóstico a entrega.",
  },
  {
    id: "stats",
    label: "Cifras y Resultados",
    hint: "Años de experiencia, proyectos entregados, m² construidos.",
  },
  {
    id: "properties",
    label: "Proyectos Destacados en Venta",
    hint: "Hasta 4 inmuebles disponibles, con foto y precio.",
  },
  {
    id: "contact",
    label: "Contacto",
    hint: "WhatsApp, correo y redes — página final de cierre.",
  },
];

export const DEFAULT_BROCHURE_SECTIONS = BROCHURE_SECTIONS.map((s) => s.id);
