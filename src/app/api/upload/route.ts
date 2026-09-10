import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIsAdminAuthenticated } from "@/lib/auth";
import { saveUploadedImage, UPLOAD_FOLDERS, type UploadFolder } from "@/lib/upload";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: `No se pudo leer la imagen enviada (${message}). Prueba con una foto más liviana o revisa tu conexión.`,
      },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  const folderRaw = formData.get("folder");
  const folder =
    typeof folderRaw === "string" && UPLOAD_FOLDERS.includes(folderRaw as UploadFolder)
      ? (folderRaw as UploadFolder)
      : null;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
  }
  if (!folder) {
    return NextResponse.json(
      { error: `Carpeta de destino inválida: "${String(folderRaw)}".` },
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
