import sharp from "sharp";
import crypto from "crypto";
import { getBucket } from "./firebaseAdmin";

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

  const objectPath = `${folder}/${Date.now()}-${crypto.randomUUID()}.webp`;
  const bucket = getBucket();
  const blob = bucket.file(objectPath);
  const saveOptions = {
    metadata: {
      contentType: "image/webp",
      cacheControl: "public, max-age=31536000, immutable",
    },
  };

  try {
    // Ask for a public-read ACL on upload (one request instead of an
    // upload + a separate makePublic() call).
    await blob.save(outputBuffer, { ...saveOptions, public: true });
  } catch {
    // Buckets with "uniform bucket-level access" enabled reject per-object
    // ACLs outright — retry without one. The file is still publicly
    // readable as long as the bucket's IAM grants allUsers the
    // "Storage Object Viewer" role (see README).
    await blob.save(outputBuffer, saveOptions);
  }

  return `https://storage.googleapis.com/${bucket.name}/${objectPath}`;
}

export function isManagedMediaUrl(url: string) {
  return url.startsWith("https://storage.googleapis.com/");
}

export async function deleteUploadedImage(mediaUrl: string) {
  if (!isManagedMediaUrl(mediaUrl)) return;
  const bucket = getBucket();
  const prefix = `https://storage.googleapis.com/${bucket.name}/`;
  if (!mediaUrl.startsWith(prefix)) return;
  const objectPath = decodeURIComponent(mediaUrl.slice(prefix.length));
  await bucket.file(objectPath).delete({ ignoreNotFound: true }).catch(() => undefined);
}
