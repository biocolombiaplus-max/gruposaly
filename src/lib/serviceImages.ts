import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "./firebaseAdmin";

export type ServiceImagesMap = Record<string, string[]>;

const COLLECTION = "serviceImages";

function collection() {
  return getDb().collection(COLLECTION);
}

export async function getAllServiceImages(): Promise<ServiceImagesMap> {
  const snapshot = await collection().get();
  const all: ServiceImagesMap = {};
  snapshot.docs.forEach((doc) => {
    const images = doc.data().images;
    all[doc.id] = Array.isArray(images) ? images : [];
  });
  return all;
}

export async function getServiceImages(slug: string): Promise<string[]> {
  const doc = await collection().doc(slug).get();
  const images = doc.data()?.images;
  return Array.isArray(images) ? images : [];
}

export async function addServiceImage(slug: string, url: string) {
  const ref = collection().doc(slug);
  await ref.set(
    { images: FieldValue.arrayUnion(url) },
    { merge: true }
  );
  return getServiceImages(slug);
}

export async function removeServiceImage(slug: string, url: string) {
  const ref = collection().doc(slug);
  await ref.set(
    { images: FieldValue.arrayRemove(url) },
    { merge: true }
  );
  return getServiceImages(slug);
}
