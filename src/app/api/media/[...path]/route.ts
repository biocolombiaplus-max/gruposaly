import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { MEDIA_ROOT } from "@/lib/upload";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: RouteContext<"/api/media/[...path]">
) {
  const { path: segments } = await params;

  if (segments.some((segment) => segment.includes("..") || segment.includes("/"))) {
    return NextResponse.json({ error: "Ruta inválida." }, { status: 400 });
  }

  const filePath = path.join(MEDIA_ROOT, ...segments);
  if (!filePath.startsWith(MEDIA_ROOT)) {
    return NextResponse.json({ error: "Ruta inválida." }, { status: 400 });
  }

  try {
    const file = await fs.readFile(filePath);
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Imagen no encontrada." }, { status: 404 });
  }
}
