import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPropertyById } from "@/lib/properties";
import { fetchImageForPdf } from "@/lib/brochure/fetchImageForPdf";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Meta's catalog crawler expects JPEG/PNG images — the admin stores every
// upload as WEBP (see lib/upload.ts), so this re-encodes on the fly instead
// of pointing the feed straight at the WEBP source, the same way the
// brochure PDF does.
export async function GET(
  _request: NextRequest,
  { params }: RouteContext<"/api/catalog/image/[id]/[index]">
) {
  const { id, index } = await params;
  const property = await getPropertyById(id).catch(() => null);
  const i = Number(index);
  const url = property && Number.isInteger(i) ? property.images[i] : undefined;

  if (!url) {
    return NextResponse.json({ error: "Imagen no encontrada." }, { status: 404 });
  }

  const image = await fetchImageForPdf(url, "jpg");
  if (!image) {
    return NextResponse.json({ error: "No se pudo cargar la imagen." }, { status: 502 });
  }

  return new NextResponse(image.data as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
