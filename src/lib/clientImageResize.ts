"use client";

// Vercel's serverless functions reject request bodies over ~4.5MB, which a
// single unedited phone photo can easily exceed. Downscaling in the browser
// first keeps every upload well under that limit regardless of the
// original file size — the server still does the authoritative resize/
// WEBP conversion afterwards, this is just to get the bytes there safely.
const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 0.85;
const SKIP_BELOW_BYTES = 1.5 * 1024 * 1024; // already small enough, don't bother

export async function shrinkImageForUpload(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.size <= SKIP_BELOW_BYTES) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
    );
    if (!blob || blob.size >= file.size) return file;

    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    // Any failure (unsupported format, decode error, etc.) — fall back to
    // the original file and let the server decide.
    return file;
  }
}
