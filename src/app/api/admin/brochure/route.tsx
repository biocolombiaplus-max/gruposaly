import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getIsAdminAuthenticated } from "@/lib/auth";
import { getSiteImage } from "@/lib/siteImages";
import { getAllServiceImages } from "@/lib/serviceImages";
import { getAllProperties } from "@/lib/properties";
import { getSiteSettings } from "@/lib/siteSettings";
import { DEFAULT_STATS } from "@/lib/siteSettingsTypes";
import { SERVICES, VENTAS_SERVICE, type ServiceDefinition } from "@/lib/services";
import type { ServiceImagesMap } from "@/lib/serviceImages";
import BrochureDocument from "@/lib/brochure/BrochureDocument";
import type { BrochureSection } from "@/lib/brochure/brochureTypes";
import { fetchImageForPdf } from "@/lib/brochure/fetchImageForPdf";

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

  const selectedServices = ALL_SERVICE_DEFS.filter((s) =>
    selectedServiceSlugs.includes(s.slug)
  );
  const featuredProperties = sections.has("properties")
    ? allProperties.filter((p) => p.status === "disponible").slice(0, 4)
    : [];

  // All images uploaded through the admin are stored as WEBP, which
  // @react-pdf/renderer's image resolver can't decode — fetch + re-encode
  // every image we'll actually embed (JPEG/PNG) before handing it to the
  // PDF document, instead of passing raw source URLs.
  const [logoImage, heroImg, servicePhotos, propertyPhotos] = await Promise.all([
    fetchImageForPdf(logoUrl, "png"),
    fetchImageForPdf(heroImage, "jpg"),
    Promise.all(
      selectedServices.map((s) => fetchImageForPdf(serviceImages[s.slug]?.[0] ?? null, "jpg"))
    ),
    Promise.all(featuredProperties.map((p) => fetchImageForPdf(p.images[0] ?? null, "jpg"))),
  ]);

  const services = selectedServices.map((service, i) => ({
    service,
    photo: servicePhotos[i],
  }));

  const properties = featuredProperties.map((property, i) => ({
    property,
    photo: propertyPhotos[i],
  }));

  const document = (
    <BrochureDocument
      logoImage={logoImage}
      heroImage={heroImg}
      services={services}
      includeAbout={sections.has("about")}
      includeProcess={sections.has("process")}
      includeStats={sections.has("stats")}
      stats={siteSettings?.stats ?? DEFAULT_STATS}
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
