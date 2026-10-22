import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getIsAdminAuthenticated } from "@/lib/auth";
import { getSiteImage } from "@/lib/siteImages";
import { getAllServiceImages } from "@/lib/serviceImages";
import { getAllProperties } from "@/lib/properties";
import { getSiteSettings } from "@/lib/siteSettings";
import { SERVICES, VENTAS_SERVICE, type ServiceDefinition } from "@/lib/services";
import type { ServiceImagesMap } from "@/lib/serviceImages";
import BrochureDocument from "@/lib/brochure/BrochureDocument";
import type { BrochureSection } from "@/lib/brochure/brochureTypes";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALL_SERVICE_DEFS: ServiceDefinition[] = [
  ...SERVICES,
  {
    ...VENTAS_SERVICE,
    category: "ventas",
    longDescription: [
      VENTAS_SERVICE.description,
      "Te acompañamos en todo el proceso de compra: visitas guiadas, asesoría legal y la posibilidad de aplicar a crédito directo — analizamos tu caso y hacemos la consulta para ayudarte a conseguir la financiación.",
    ],
    features: [
      "Casas, edificios, locales comerciales y bodegas",
      "Proyectos nuevos y sobre planos disponibles",
      "Crédito directo: te ayudamos con todo el trámite",
      "Visitas guiadas y asesoría personalizada",
      "Acompañamiento legal en la compra",
      "Inventario actualizado en gruposaly.com",
    ],
  },
];

function parseList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function GET(request: NextRequest) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const selectedServiceSlugs = parseList(searchParams.get("services"));
  const sections = new Set(parseList(searchParams.get("sections")) as BrochureSection["id"][]);

  const [logoUrl, heroImage, serviceImages, allProperties, siteSettings] = await Promise.all([
    getSiteImage("logo").catch(() => null),
    getSiteImage("hero").catch(() => null),
    getAllServiceImages().catch((): ServiceImagesMap => ({})),
    getAllProperties().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);

  const services = ALL_SERVICE_DEFS.filter((s) => selectedServiceSlugs.includes(s.slug)).map(
    (service) => ({
      service,
      photo: serviceImages[service.slug]?.[0] ?? null,
    })
  );

  const properties = sections.has("properties")
    ? allProperties.filter((p) => p.status === "disponible").slice(0, 4)
    : [];

  const document = (
    <BrochureDocument
      logoUrl={logoUrl}
      heroImage={heroImage}
      services={services}
      includeAbout={sections.has("about")}
      includeProcess={sections.has("process")}
      includeStats={sections.has("stats")}
      properties={properties}
      includeContact={sections.has("contact")}
      socialLinks={siteSettings?.socialLinks ?? {}}
    />
  );

  try {
    const buffer = await renderToBuffer(document);

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Brochure-Grupo-Saly.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo generar el brochure.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
