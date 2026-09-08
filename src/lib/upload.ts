import sharp from "sharp";
import crypto from "crypto";
import { put, del } from "@vercel/blob";

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15MB source cap

export type UploadFolder = "services" | "properties";

export async function saveUploadedImage(
  file: File,
  folder: UploadFolder
): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      "Formato de imagen no soportado. Usa JPG, PNG, WEBP o AVIF."
    );
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("La imagen supera el tamaño máximo permitido (15MB).");
  }

  const arrayBuffer = await file.arrayBuffer();
  const inputBuffer = Buffer.from(arrayBuffer);

  // Normalize every upload to the same web-friendly format and a bounded
  // resolution, regardless of the original file's size or orientation, so
  // every image displays consistently across the site.
  const outputBuffer = await sharp(inputBuffer)
    .rotate()
    .resize({
      width: MAX_WIDTH,
      height: MAX_HEIGHT,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toBuffer();

  const pathname = `${folder}/${Date.now()}-${crypto.randomUUID()}.webp`;

  const blob = await put(pathname, outputBuffer, {
    access: "public",
    contentType: "image/webp",
    cacheControlMaxAge: 31536000,
  });

  return blob.url;
}

export function isManagedMediaUrl(url: string) {
  return url.includes(".public.blob.vercel-storage.com/");
}

export async function deleteUploadedImage(mediaUrl: string) {
  if (!isManagedMediaUrl(mediaUrl)) return;
  await del(mediaUrl).catch(() => undefined);
}
