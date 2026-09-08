import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIsAdminAuthenticated } from "@/lib/auth";
import { saveUploadedImage, type UploadFolder } from "@/lib/upload";

export const dynamic = "force-dynamic";

const VALID_FOLDERS: UploadFolder[] = ["services", "properties"];

export async function POST(request: NextRequest) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  const folderRaw = formData?.get("folder");
  const folder =
    typeof folderRaw === "string" && VALID_FOLDERS.includes(folderRaw as UploadFolder)
      ? (folderRaw as UploadFolder)
      : null;

  if (!(file instanceof File) || !folder) {
    return NextResponse.json(
      { error: "Falta el archivo o la carpeta de destino." },
      { status: 400 }
    );
  }

  try {
    const url = await saveUploadedImage(file, folder);
    return NextResponse.json({ url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo procesar la imagen.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
