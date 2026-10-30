import type { Property, PropertyStatus } from "@/lib/propertyTypes";
import { PROPERTY_TYPE_LABELS } from "@/lib/propertyTypes";
import type { ServiceDefinition } from "@/lib/services";
import type { ServiceImagesMap } from "@/lib/serviceImages";

const SITE_URL = "https://gruposaly.com";

const META_COLUMNS = [
  "id",
  "title",
  "description",
  "availability",
  "condition",
  "price",
  "link",
  "image_link",
  "additional_image_link",
  "brand",
  "custom_label_0",
  "custom_label_1",
] as const;

type MetaRow = Record<(typeof META_COLUMNS)[number], string | number>;

// Meta's catalog feed only accepts a fixed set of availability values — map
// our own listing status onto the closest one instead of dropping sold or
// reserved properties from the feed (keeping them lets Commerce Manager
// retain their ad/catalog history instead of starting over if they come
// back on the market).
const AVAILABILITY_BY_STATUS: Record<PropertyStatus, string> = {
  disponible: "in stock",
  reservado: "out of stock",
  vendido: "discontinued",
};

function csvField(value: string | number): string {
  const text = String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function rowToCsv(row: MetaRow): string {
  return META_COLUMNS.map((col) => csvField(row[col])).join(",");
}

function propertyImageUrl(propertyId: string, index: number): string {
  return `${SITE_URL}/api/catalog/image/${propertyId}/${index}`;
}

function serviceImageUrl(slug: string, index: number): string {
  return `${SITE_URL}/api/catalog/service-image/${slug}/${index}`;
}

function buildPropertyRow(p: Property): MetaRow {
  return {
    id: p.id,
    title: p.title,
    description: p.description || p.title,
    availability: AVAILABILITY_BY_STATUS[p.status],
    condition: "new",
    price: `${Math.round(p.price)} COP`,
    link: `${SITE_URL}/proyectos/${p.slug}`,
    image_link: propertyImageUrl(p.id, 0),
    additional_image_link: p.images
      .slice(1, 10)
      .map((_, i) => propertyImageUrl(p.id, i + 1))
      .join(","),
    brand: "Grupo Saly",
    custom_label_0: PROPERTY_TYPE_LABELS[p.type],
    custom_label_1: p.location,
  };
}

function buildServiceRow(service: ServiceDefinition, price: number, images: string[]): MetaRow {
  return {
    id: `service-${service.slug}`,
    title: service.title,
    description: service.description,
    availability: "in stock",
    condition: "new",
    price: `${Math.round(price)} COP`,
    link: `${SITE_URL}/servicios/${service.slug}`,
    image_link: serviceImageUrl(service.slug, 0),
    additional_image_link: images
      .slice(1, 10)
      .map((_, i) => serviceImageUrl(service.slug, i + 1))
      .join(","),
    brand: "Grupo Saly",
    custom_label_0: service.category === "remodelacion" ? "Remodelación" : "Construcción",
    custom_label_1: "Servicio",
  };
}

export function buildMetaFeedCsv(
  properties: Property[],
  services: ServiceDefinition[],
  servicePrices: Record<string, number>,
  serviceImages: ServiceImagesMap
): string {
  const propertyRows = properties.filter((p) => p.images.length > 0).map(buildPropertyRow);

  const serviceRows = services
    .filter((s) => servicePrices[s.slug] > 0 && (serviceImages[s.slug]?.length ?? 0) > 0)
    .map((s) => buildServiceRow(s, servicePrices[s.slug], serviceImages[s.slug]));

  const rows = [...serviceRows, ...propertyRows].map(rowToCsv);

  return [META_COLUMNS.join(","), ...rows].join("\r\n") + "\r\n";
}
