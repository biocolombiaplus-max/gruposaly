import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIsAdminAuthenticated } from "@/lib/auth";
import { deleteUploadedImage, isManagedMediaUrl } from "@/lib/upload";
import {
  SITE_IMAGE_SLOTS,
  getSiteImage,
  removeSiteImage,
  setSiteImage,
  type SiteImageSlot,
} from "@/lib/siteImages";

export const dynamic = "force-dynamic";

function isValidSlot(slot: string): slot is SiteImageSlot {
  return SITE_IMAGE_SLOTS.some((s) => s.slot === slot);
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext<"/api/site-images/[slot]">
) {
  const { slot } = await params;
  if (!isValidSlot(slot)) {
    return NextResponse.json({ error: "Slot inválido." }, { status: 400 });
  }
  const url = await getSiteImage(slot);
  return NextResponse.json({ url });
}

export async function POST(
  request: NextRequest,
  { params }: RouteContext<"/api/site-images/[slot]">
) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  const { slot } = await params;
  if (!isValidSlot(slot)) {
    return NextResponse.json({ error: "Slot inválido." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const url = typeof body?.url === "string" ? body.url : "";
  if (!isManagedMediaUrl(url)) {
    return NextResponse.json({ error: "URL de imagen inválida." }, { status: 400 });
  }

  const previous = await getSiteImage(slot);
  await setSiteImage(slot, url);
  if (previous && previous !== url) {
    await deleteUploadedImage(previous);
  }

  return NextResponse.json({ url });
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext<"/api/site-images/[slot]">
) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  const { slot } = await params;
  if (!isValidSlot(slot)) {
    return NextResponse.json({ error: "Slot inválido." }, { status: 400 });
  }

  const previous = await getSiteImage(slot);
  await removeSiteImage(slot);
  if (previous) {
    await deleteUploadedImage(previous);
  }

  return NextResponse.json({ ok: true });
}
