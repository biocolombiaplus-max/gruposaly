import type { Property, PropertyStatus } from "@/lib/propertyTypes";
import { PROPERTY_TYPE_LABELS } from "@/lib/propertyTypes";

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

function imageProxyUrl(propertyId: string, index: number): string {
  return `${SITE_URL}/api/catalog/image/${propertyId}/${index}`;
}

export function buildMetaFeedCsv(properties: Property[]): string {
  const rows = properties
    .filter((p) => p.images.length > 0)
    .map((p) => {
      const fields: Record<(typeof META_COLUMNS)[number], string | number> = {
        id: p.id,
        title: p.title,
        description: p.description || p.title,
        availability: AVAILABILITY_BY_STATUS[p.status],
        condition: "new",
        price: `${Math.round(p.price)} COP`,
        link: `${SITE_URL}/proyectos/${p.slug}`,
        image_link: imageProxyUrl(p.id, 0),
        additional_image_link: p.images
          .slice(1, 10)
          .map((_, i) => imageProxyUrl(p.id, i + 1))
          .join(","),
        brand: "Grupo Saly",
        custom_label_0: PROPERTY_TYPE_LABELS[p.type],
        custom_label_1: p.location,
      };
      return META_COLUMNS.map((col) => csvField(fields[col])).join(",");
    });

  return [META_COLUMNS.join(","), ...rows].join("\r\n") + "\r\n";
}
