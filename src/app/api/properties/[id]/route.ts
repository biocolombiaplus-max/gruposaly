import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIsAdminAuthenticated } from "@/lib/auth";
import {
  deleteProperty,
  getPropertyById,
  updateProperty,
  type NewProjectDetails,
  type NewProjectStage,
  type PropertyStatus,
  type PropertyType,
} from "@/lib/properties";
import { deleteUploadedImage } from "@/lib/upload";

export const dynamic = "force-dynamic";

const VALID_TYPES: PropertyType[] = [
  "casa",
  "edificio",
  "local",
  "bodega",
  "proyecto_nuevo",
];
const VALID_STATUSES: PropertyStatus[] = ["disponible", "reservado", "vendido"];
const VALID_STAGES: NewProjectStage[] = [
  "planos",
  "construccion",
  "entrega_inmediata",
];

function parseNewProject(
  body: Record<string, unknown>,
  type: PropertyType,
  existing?: NewProjectDetails
): NewProjectDetails | undefined {
  if (type !== "proyecto_nuevo") return undefined;
  if (typeof body.newProject !== "object" || !body.newProject) return existing;
  const raw = body.newProject as Record<string, unknown>;
  const details: NewProjectDetails = {};

  const separationAmount = Number(raw.separationAmount);
  if (Number.isFinite(separationAmount) && raw.separationAmount !== "") {
    details.separationAmount = separationAmount;
  }
  if (typeof raw.separationLabel === "string" && raw.separationLabel.trim()) {
    details.separationLabel = raw.separationLabel.trim();
  }
  if (typeof raw.paymentPlan === "string" && raw.paymentPlan.trim()) {
    details.paymentPlan = raw.paymentPlan.trim();
  }
  if (typeof raw.deliveryDate === "string" && raw.deliveryDate.trim()) {
    details.deliveryDate = raw.deliveryDate.trim();
  }
  if (VALID_STAGES.includes(raw.stage as NewProjectStage)) {
    details.stage = raw.stage as NewProjectStage;
  }
  if (typeof raw.financingAvailable === "boolean") {
    details.financingAvailable = raw.financingAvailable;
  }
  if (typeof raw.additionalConditions === "string" && raw.additionalConditions.trim()) {
    details.additionalConditions = raw.additionalConditions.trim();
  }

  return Object.keys(details).length > 0 ? details : undefined;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext<"/api/properties/[id]">
) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) {
    return NextResponse.json({ error: "Inmueble no encontrado." }, { status: 404 });
  }
  return NextResponse.json({ property });
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext<"/api/properties/[id]">
) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  const { id } = await params;
  const existing = await getPropertyById(id);
  if (!existing) {
    return NextResponse.json({ error: "Inmueble no encontrado." }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : existing.title;
  const type = VALID_TYPES.includes(body.type) ? (body.type as PropertyType) : existing.type;
  const status = VALID_STATUSES.includes(body.status)
    ? (body.status as PropertyStatus)
    : existing.status;
  const location =
    typeof body.location === "string" && body.location.trim()
      ? body.location.trim()
      : existing.location;
  const price = Number.isFinite(Number(body.price)) ? Number(body.price) : existing.price;
  const images = Array.isArray(body.images)
    ? body.images.filter((u: unknown) => typeof u === "string")
    : existing.images;
  const features = Array.isArray(body.features)
    ? body.features.filter((f: unknown) => typeof f === "string" && f.trim())
    : existing.features;

  const removedImages = existing.images.filter((img) => !images.includes(img));

  try {
    const property = await updateProperty(id, {
      title,
      type,
      status,
      price,
      priceLabel: typeof body.priceLabel === "string" ? body.priceLabel : existing.priceLabel,
      location,
      areaM2: body.areaM2 === "" ? undefined : Number.isFinite(Number(body.areaM2)) ? Number(body.areaM2) : existing.areaM2,
      bedrooms: body.bedrooms === "" ? undefined : Number.isFinite(Number(body.bedrooms)) ? Number(body.bedrooms) : existing.bedrooms,
      bathrooms: body.bathrooms === "" ? undefined : Number.isFinite(Number(body.bathrooms)) ? Number(body.bathrooms) : existing.bathrooms,
      parking: body.parking === "" ? undefined : Number.isFinite(Number(body.parking)) ? Number(body.parking) : existing.parking,
      description: typeof body.description === "string" ? body.description : existing.description,
      features,
      images,
      newProject: parseNewProject(body, type, existing.newProject),
      slug: typeof body.slug === "string" && body.slug.trim() ? body.slug : undefined,
    });

    await Promise.all(removedImages.map((img) => deleteUploadedImage(img)));

    return NextResponse.json({ property });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo actualizar el inmueble.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext<"/api/properties/[id]">
) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  const { id } = await params;
  const existing = await getPropertyById(id);
  if (!existing) {
    return NextResponse.json({ error: "Inmueble no encontrado." }, { status: 404 });
  }

  await deleteProperty(id);
  await Promise.all(existing.images.map((img) => deleteUploadedImage(img)));

  return NextResponse.json({ ok: true });
}
