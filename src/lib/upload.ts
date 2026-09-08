import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15MB source cap

export type UploadFolder = "services" | "properties";

// Uploaded media lives outside `public/` and is streamed back through
// /api/media/[...path] (see that route handler). Next's production server
// only serves files that existed in `public/` at build time, so anything an
// admin uploads at runtime would 404 there — this directory + route avoids
// that entirely and works the same in dev and in production.
export const MEDIA_ROOT = path.join(process.cwd(), "uploads");

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

  const fileName = `${Date.now()}-${crypto.randomUUID()}.webp`;
  const uploadDir = path.join(MEDIA_ROOT, folder);
  await fs.mkdir(uploadDir, { recursive: true });
  const destPath = path.join(uploadDir, fileName);

  // Normalize every upload to the same web-friendly format and a bounded
  // resolution, regardless of the original file's size or orientation, so
  // every image displays consistently across the site.
  await sharp(inputBuffer)
    .rotate()
    .resize({
      width: MAX_WIDTH,
      height: MAX_HEIGHT,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toFile(destPath);

  return `/api/media/${folder}/${fileName}`;
}

export async function deleteUploadedImage(mediaUrl: string) {
  if (!mediaUrl.startsWith("/api/media/")) return;
  const relative = mediaUrl.replace("/api/media/", "");
  const filePath = path.join(MEDIA_ROOT, relative);
  if (!filePath.startsWith(MEDIA_ROOT)) return;
  await fs.unlink(filePath).catch(() => undefined);
}
