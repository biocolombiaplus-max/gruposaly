import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIsAdminAuthenticated } from "@/lib/auth";
import {
  createProperty,
  getAllProperties,
  type PropertyStatus,
  type PropertyType,
} from "@/lib/properties";

export const dynamic = "force-dynamic";

const VALID_TYPES: PropertyType[] = ["casa", "edificio", "local", "bodega"];
const VALID_STATUSES: PropertyStatus[] = ["disponible", "reservado", "vendido"];

export async function GET() {
  const properties = await getAllProperties();
  return NextResponse.json({ properties });
}

export async function POST(request: NextRequest) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const type = VALID_TYPES.includes(body.type) ? (body.type as PropertyType) : null;
  const location = typeof body.location === "string" ? body.location.trim() : "";
  const price = Number(body.price);

  if (!title || !type || !location || !Number.isFinite(price) || price < 0) {
    return NextResponse.json(
      { error: "Título, tipo, ubicación y precio son obligatorios." },
      { status: 400 }
    );
  }

  const status = VALID_STATUSES.includes(body.status) ? body.status : "disponible";
  const images = Array.isArray(body.images)
    ? body.images.filter((u: unknown) => typeof u === "string")
    : [];
  const features = Array.isArray(body.features)
    ? body.features.filter((f: unknown) => typeof f === "string" && f.trim())
    : [];

  const property = await createProperty({
    title,
    type,
    status,
    price,
    priceLabel: typeof body.priceLabel === "string" ? body.priceLabel : undefined,
    location,
    areaM2: Number.isFinite(Number(body.areaM2)) && body.areaM2 !== "" ? Number(body.areaM2) : undefined,
    bedrooms: Number.isFinite(Number(body.bedrooms)) && body.bedrooms !== "" ? Number(body.bedrooms) : undefined,
    bathrooms: Number.isFinite(Number(body.bathrooms)) && body.bathrooms !== "" ? Number(body.bathrooms) : undefined,
    parking: Number.isFinite(Number(body.parking)) && body.parking !== "" ? Number(body.parking) : undefined,
    description: typeof body.description === "string" ? body.description : "",
    features,
    images,
  });

  return NextResponse.json({ property }, { status: 201 });
}
