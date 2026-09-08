import { getDb } from "./firebaseAdmin";
import { slugify, type Property } from "./propertyTypes";

export type { Property, PropertyStatus, PropertyType } from "./propertyTypes";
export {
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
  slugify,
} from "./propertyTypes";

const COLLECTION = "properties";

function collection() {
  return getDb().collection(COLLECTION);
}

export async function getAllProperties(): Promise<Property[]> {
  const snapshot = await collection().get();
  const properties = snapshot.docs.map((doc) => doc.data() as Property);
  return properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getPropertyBySlug(slug: string) {
  const snapshot = await collection().where("slug", "==", slug).limit(1).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as Property;
}

export async function getPropertyById(id: string) {
  const doc = await collection().doc(id).get();
  return doc.exists ? (doc.data() as Property) : null;
}

async function uniqueSlug(base: string, excludeId?: string) {
  const baseSlug = slugify(base) || "inmueble";
  let slug = baseSlug;
  let counter = 1;
  // Small collection (property listings), a query per candidate is fine.
  while (true) {
    const snapshot = await collection().where("slug", "==", slug).limit(2).get();
    const clashes = snapshot.docs.some((doc) => doc.id !== excludeId);
    if (!clashes) return slug;
    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
}

export async function createProperty(
  data: Omit<Property, "id" | "slug" | "createdAt" | "updatedAt"> & {
    slug?: string;
  }
): Promise<Property> {
  const ref = collection().doc();
  const slug = await uniqueSlug(data.slug || data.title);
  const now = new Date().toISOString();
  const property: Property = {
    ...data,
    id: ref.id,
    slug,
    createdAt: now,
    updatedAt: now,
  };
  await ref.set(property);
  return property;
}

export async function updateProperty(
  id: string,
  data: Partial<Omit<Property, "id" | "createdAt">>
): Promise<Property | null> {
  const ref = collection().doc(id);
  const existing = await ref.get();
  if (!existing.exists) return null;
  const current = existing.data() as Property;

  const slug =
    data.slug && data.slug !== current.slug
      ? await uniqueSlug(data.slug, id)
      : current.slug;

  const updated: Property = {
    ...current,
    ...data,
    slug,
    id: current.id,
    createdAt: current.createdAt,
    updatedAt: new Date().toISOString(),
  };
  await ref.set(updated);
  return updated;
}

export async function deleteProperty(id: string): Promise<boolean> {
  const ref = collection().doc(id);
  const existing = await ref.get();
  if (!existing.exists) return false;
  await ref.delete();
  return true;
}
