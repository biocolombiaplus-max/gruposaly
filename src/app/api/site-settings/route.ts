import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIsAdminAuthenticated } from "@/lib/auth";
import { getSiteSettings, updateSiteSettings } from "@/lib/siteSettings";
import type { LogoAlign, LogoSize } from "@/lib/siteSettingsTypes";

export const dynamic = "force-dynamic";

const VALID_SIZES: LogoSize[] = ["md", "lg", "xl"];
const VALID_ALIGNS: LogoAlign[] = ["left", "center", "right"];
const MAX_ANNOUNCEMENTS = 12;
const MAX_ANNOUNCEMENT_LENGTH = 120;

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const update: Record<string, unknown> = {};

  if (body.logoSize !== undefined) {
    if (!VALID_SIZES.includes(body.logoSize)) {
      return NextResponse.json({ error: "Tamaño de logo inválido." }, { status: 400 });
    }
    update.logoSize = body.logoSize;
  }

  if (body.logoAlign !== undefined) {
    if (!VALID_ALIGNS.includes(body.logoAlign)) {
      return NextResponse.json({ error: "Posición de logo inválida." }, { status: 400 });
    }
    update.logoAlign = body.logoAlign;
  }

  if (body.announcements !== undefined) {
    if (!Array.isArray(body.announcements)) {
      return NextResponse.json({ error: "Lista de anuncios inválida." }, { status: 400 });
    }
    const announcements = body.announcements
      .filter((a: unknown) => typeof a === "string" && a.trim())
      .map((a: string) => a.trim().slice(0, MAX_ANNOUNCEMENT_LENGTH))
      .slice(0, MAX_ANNOUNCEMENTS);
    update.announcements = announcements;
  }

  try {
    await updateSiteSettings(update);
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo guardar la configuración.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
