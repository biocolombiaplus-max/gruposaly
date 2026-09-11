// Types and constants shared between server code and client components.
// Kept separate from `properties.ts` so client bundles never pull in the
// Node `fs`-based storage layer used for reads/writes.

export type PropertyType =
  | "casa"
  | "edificio"
  | "local"
  | "bodega"
  | "proyecto_nuevo";
export type PropertyStatus = "disponible" | "reservado" | "vendido";
export type NewProjectStage = "planos" | "construccion" | "entrega_inmediata";

export interface NewProjectDetails {
  separationAmount?: number;
  separationLabel?: string;
  paymentPlan?: string;
  deliveryDate?: string;
  stage?: NewProjectStage;
  financingAvailable?: boolean;
  additionalConditions?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  priceLabel?: string;
  location: string;
  areaM2?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  description: string;
  features: string[];
  images: string[];
  newProject?: NewProjectDetails;
  createdAt: string;
  updatedAt: string;
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  casa: "Casa",
  edificio: "Edificio",
  local: "Local Comercial",
  bodega: "Bodega",
  proyecto_nuevo: "Proyecto Nuevo",
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  disponible: "Disponible",
  reservado: "Reservado",
  vendido: "Vendido",
};

export const NEW_PROJECT_STAGE_LABELS: Record<NewProjectStage, string> = {
  planos: "En planos",
  construccion: "En construcción",
  entrega_inmediata: "Entrega inmediata",
};

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
