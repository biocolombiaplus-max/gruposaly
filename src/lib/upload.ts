import sharp from "sharp";
import crypto from "crypto";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15MB source cap

// Single source of truth: the route handler validates incoming requests
// against this array, so adding a new folder here is enough — no second
// list to remember to update.
export const UPLOAD_FOLDERS = ["services", "properties", "site"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

function getPublicBaseUrl() {
  const base = process.env.R2_PUBLIC_URL;
  if (!base) {
    throw new Error(
      "Falta la variable de entorno R2_PUBLIC_URL (ver README.md, sección Cloudflare R2)."
    );
  }
  return base.replace(/\/+$/, "");
}

function getBucketName() {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) {
    throw new Error(
      "Falta la variable de entorno R2_BUCKET_NAME (ver README.md, sección Cloudflare R2)."
    );
  }
  return bucket;
}

let client: S3Client | null = null;

function getR2Client() {
  if (client) return client;

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Faltan variables de entorno de Cloudflare R2. Define R2_ACCOUNT_ID, " +
        "R2_ACCESS_KEY_ID y R2_SECRET_ACCESS_KEY (ver README.md)."
    );
  }

  client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
  return client;
}

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

  const key = `${folder}/${Date.now()}-${crypto.randomUUID()}.webp`;

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: getBucketName(),
      Key: key,
      Body: outputBuffer,
      ContentType: "image/webp",
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return `${getPublicBaseUrl()}/${key}`;
}

export function isManagedMediaUrl(url: string) {
  const base = process.env.R2_PUBLIC_URL;
  if (!base) return false;
  return url.startsWith(base.replace(/\/+$/, "") + "/");
}

export async function deleteUploadedImage(mediaUrl: string) {
  if (!isManagedMediaUrl(mediaUrl)) return;
  const key = mediaUrl.slice(getPublicBaseUrl().length + 1);
  await getR2Client()
    .send(new DeleteObjectCommand({ Bucket: getBucketName(), Key: key }))
    .catch(() => undefined);
}
