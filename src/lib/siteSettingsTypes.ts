export type LogoSize = "md" | "lg" | "xl";
export type LogoAlign = "left" | "center" | "right";

export interface SiteSettings {
  logoSize: LogoSize;
  logoAlign: LogoAlign;
  announcements: string[];
}

export const DEFAULT_ANNOUNCEMENTS: string[] = [
  "Cotización y visita técnica 100% gratis",
  "+120 proyectos entregados en toda Colombia",
  "Respuesta inmediata por WhatsApp",
  "Garantía por escrito en cada obra",
  "Nuevos inmuebles disponibles — aparta el tuyo hoy",
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  logoSize: "lg",
  logoAlign: "left",
  announcements: DEFAULT_ANNOUNCEMENTS,
};

export const LOGO_SIZE_LABELS: Record<LogoSize, string> = {
  md: "Mediano",
  lg: "Grande",
  xl: "Extra grande",
};

export const LOGO_ALIGN_LABELS: Record<LogoAlign, string> = {
  left: "Izquierda",
  center: "Centro",
  right: "Derecha",
};
