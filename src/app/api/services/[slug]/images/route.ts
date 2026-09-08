import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIsAdminAuthenticated } from "@/lib/auth";
import { getServiceBySlug } from "@/lib/services";
import {
  addServiceImage,
  getServiceImages,
  removeServiceImage,
} from "@/lib/serviceImages";
import { deleteUploadedImage, isManagedMediaUrl } from "@/lib/upload";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: RouteContext<"/api/services/[slug]/images">
) {
  const { slug } = await params;
  const images = await getServiceImages(slug);
  return NextResponse.json({ images });
}

export async function POST(
  request: NextRequest,
  { params }: RouteContext<"/api/services/[slug]/images">
) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  const { slug } = await params;
  if (!getServiceBySlug(slug)) {
    return NextResponse.json({ error: "Servicio no encontrado." }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const url = typeof body?.url === "string" ? body.url : "";
  if (!isManagedMediaUrl(url)) {
    return NextResponse.json({ error: "URL de imagen inválida." }, { status: 400 });
  }

  const images = await addServiceImage(slug, url);
  return NextResponse.json({ images });
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext<"/api/services/[slug]/images">
) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  const { slug } = await params;
  const body = await request.json().catch(() => null);
  const url = typeof body?.url === "string" ? body.url : "";
  if (!url) {
    return NextResponse.json({ error: "Falta la URL de la imagen." }, { status: 400 });
  }

  const images = await removeServiceImage(slug, url);
  await deleteUploadedImage(url);
  return NextResponse.json({ images });
}
