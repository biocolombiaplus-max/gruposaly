import sharp from "sharp";

export interface PdfImage {
  data: Buffer;
  format: "jpg" | "png";
}

// All images uploaded through the admin are stored as WEBP (see
// src/lib/upload.ts), but @react-pdf/renderer's image resolver only
// understands JPEG, PNG and SVG — a raw WEBP src silently fails the whole
// PDF render. Fetch the source bytes ourselves and re-encode with sharp
// (already a dependency) before handing them to the PDF document, so the
// brochure never depends on react-pdf's own format sniffing.
export async function fetchImageForPdf(
  url: string | null | undefined,
  format: "jpg" | "png" = "jpg"
): Promise<PdfImage | null> {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const pipeline = sharp(Buffer.from(arrayBuffer));
    const data =
      format === "png"
        ? await pipeline.png().toBuffer()
        : await pipeline.jpeg({ quality: 85 }).toBuffer();
    return { data, format };
  } catch {
    return null;
  }
}
