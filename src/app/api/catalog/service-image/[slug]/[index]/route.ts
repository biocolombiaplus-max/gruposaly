import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServiceImages } from "@/lib/serviceImages";
import { fetchImageForPdf } from "@/lib/brochure/fetchImageForPdf";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Same re-encoding as /api/catalog/image/[id]/[index], but for service
// cover photos (keyed by slug instead of a Firestore property id).
export async function GET(
  _request: NextRequest,
  { params }: RouteContext<"/api/catalog/service-image/[slug]/[index]">
) {
  const { slug, index } = await params;
  const i = Number(index);
  const images = Number.isInteger(i) ? await getServiceImages(slug).catch(() => []) : [];
  const url = images[i];

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
