import { readJson, writeJson } from "./db";
import { slugify, type Property } from "./propertyTypes";

export type { Property, PropertyStatus, PropertyType } from "./propertyTypes";
export {
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
  slugify,
} from "./propertyTypes";

const FILE = "properties.json";
const EXAMPLE = "properties.example.json";

export async function getAllProperties(): Promise<Property[]> {
  const properties = await readJson<Property[]>(FILE, EXAMPLE, []);
  return properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getPropertyBySlug(slug: string) {
  const properties = await getAllProperties();
  return properties.find((p) => p.slug === slug) ?? null;
}

export async function getPropertyById(id: string) {
  const properties = await getAllProperties();
  return properties.find((p) => p.id === id) ?? null;
}

export async function createProperty(
  data: Omit<Property, "id" | "slug" | "createdAt" | "updatedAt"> & {
    slug?: string;
  }
): Promise<Property> {
  const properties = await readJson<Property[]>(FILE, EXAMPLE, []);
  const baseSlug = slugify(data.slug || data.title) || "inmueble";
  let slug = baseSlug;
  let counter = 1;
  while (properties.some((p) => p.slug === slug)) {
    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
  const now = new Date().toISOString();
  const property: Property = {
    ...data,
    id: crypto.randomUUID(),
    slug,
    createdAt: now,
    updatedAt: now,
  };
  properties.push(property);
  await writeJson(FILE, properties);
  return property;
}

export async function updateProperty(
  id: string,
  data: Partial<Omit<Property, "id" | "createdAt">>
): Promise<Property | null> {
  const properties = await readJson<Property[]>(FILE, EXAMPLE, []);
  const index = properties.findIndex((p) => p.id === id);
  if (index === -1) return null;

  let slug = properties[index].slug;
  if (data.slug && data.slug !== slug) {
    const baseSlug = slugify(data.slug) || slug;
    let candidate = baseSlug;
    let counter = 1;
    while (
      properties.some((p) => p.slug === candidate && p.id !== id)
    ) {
      counter += 1;
      candidate = `${baseSlug}-${counter}`;
    }
    slug = candidate;
  }

  const updated: Property = {
    ...properties[index],
    ...data,
    slug,
    id: properties[index].id,
    createdAt: properties[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  properties[index] = updated;
  await writeJson(FILE, properties);
  return updated;
}

export async function deleteProperty(id: string): Promise<boolean> {
  const properties = await readJson<Property[]>(FILE, EXAMPLE, []);
  const next = properties.filter((p) => p.id !== id);
  if (next.length === properties.length) return false;
  await writeJson(FILE, next);
  return true;
}
