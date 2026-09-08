import { readJson, writeJson } from "./db";

export type ServiceImagesMap = Record<string, string[]>;

const FILE = "service-images.json";
const EXAMPLE = "service-images.example.json";

export async function getAllServiceImages(): Promise<ServiceImagesMap> {
  return readJson<ServiceImagesMap>(FILE, EXAMPLE, {});
}

export async function getServiceImages(slug: string): Promise<string[]> {
  const all = await getAllServiceImages();
  return all[slug] ?? [];
}

export async function addServiceImage(slug: string, url: string) {
  const all = await readJson<ServiceImagesMap>(FILE, EXAMPLE, {});
  all[slug] = [...(all[slug] ?? []), url];
  await writeJson(FILE, all);
  return all[slug];
}

export async function removeServiceImage(slug: string, url: string) {
  const all = await readJson<ServiceImagesMap>(FILE, EXAMPLE, {});
  all[slug] = (all[slug] ?? []).filter((img) => img !== url);
  await writeJson(FILE, all);
  return all[slug];
}
