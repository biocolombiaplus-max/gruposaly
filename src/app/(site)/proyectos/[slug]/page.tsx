import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import {
  BedDouble,
  Bath,
  Car,
  CheckCircle2,
  MapPin,
  Ruler,
} from "lucide-react";
import { getAllProperties, getPropertyBySlug } from "@/lib/properties";
import { PROPERTY_STATUS_LABELS, PROPERTY_TYPE_LABELS } from "@/lib/properties";
import { formatCOP } from "@/lib/format";
import Gallery from "@/components/Gallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import CopyLinkButton from "@/components/CopyLinkButton";
import PropertyCard from "@/components/PropertyCard";
import FadeIn from "@/components/FadeIn";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: property.title,
    description: property.description || property.title,
    openGraph: {
      title: property.title,
      description: property.description || property.title,
      images: property.images[0] ? [{ url: property.images[0] }] : undefined,
    },
  };
}

export default async function PropertyPage({
  params,
}: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const [property, allProperties, headerList] = await Promise.all([
    getPropertyBySlug(slug),
    getAllProperties(),
    headers(),
  ]);
  if (!property) notFound();

  const host = headerList.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  const origin = host ? `${protocol}://${host}` : "";
  const path = `/proyectos/${property.slug}`;
  const message = `Hola, estoy interesado en el inmueble "${property.title}" (${PROPERTY_TYPE_LABELS[property.type]} - ${property.location}). ${origin}${path}`;

  const related = allProperties
    .filter((p) => p.id !== property.id && p.type === property.type)
    .slice(0, 3);

  return (
    <div className="bg-ink-950 pt-28 pb-24 sm:pt-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-white/45">
          <Link href="/" className="hover:text-brand-400">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/proyectos" className="hover:text-brand-400">
            Proyectos en Venta
          </Link>
          <span>/</span>
          <span className="text-white/70">{property.title}</span>
        </nav>

        <FadeIn>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-300">
              {PROPERTY_TYPE_LABELS[property.type]}
            </span>
            <span
              className={
                "rounded-full px-3 py-1 text-xs font-semibold " +
                (property.status === "disponible"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : property.status === "reservado"
                  ? "bg-amber-400/15 text-amber-300"
                  : "bg-white/10 text-white/60")
              }
            >
              {PROPERTY_STATUS_LABELS[property.status]}
            </span>
          </div>
          <h1 className="mt-4 text-balance font-display text-3xl font-black tracking-tight sm:text-4xl">
            {property.title}
          </h1>
          <p className="mt-2 inline-flex items-center gap-1.5 text-white/55">
            <MapPin className="h-4 w-4 text-brand-400" /> {property.location}
          </p>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <FadeIn>
              <Gallery images={property.images} alt={property.title} />
            </FadeIn>

            {property.description && (
              <FadeIn delay={0.1} className="mt-10">
                <h2 className="font-display text-xl font-bold">Descripción</h2>
                <p className="mt-4 whitespace-pre-line text-balance leading-relaxed text-white/65">
                  {property.description}
                </p>
              </FadeIn>
            )}

            {property.features.length > 0 && (
              <FadeIn delay={0.15} className="mt-10">
                <h2 className="font-display text-xl font-bold">
                  Características
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {property.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-white/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}
          </div>

          <FadeIn delay={0.1}>
            <div className="sticky top-28 rounded-3xl border border-white/10 bg-ink-900 p-7">
              <p className="text-xs uppercase tracking-widest text-white/40">
                Precio
              </p>
              <p className="mt-2 font-display text-3xl font-black text-brand-400">
                {property.priceLabel || formatCOP(property.price)}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 border-y border-white/10 py-5">
                {typeof property.areaM2 === "number" && (
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Ruler className="h-4.5 w-4.5 text-brand-400" />
                    {property.areaM2} m²
                  </div>
                )}
                {typeof property.bedrooms === "number" && (
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <BedDouble className="h-4.5 w-4.5 text-brand-400" />
                    {property.bedrooms} habitaciones
                  </div>
                )}
                {typeof property.bathrooms === "number" && (
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Bath className="h-4.5 w-4.5 text-brand-400" />
                    {property.bathrooms} baños
                  </div>
                )}
                {typeof property.parking === "number" && (
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Car className="h-4.5 w-4.5 text-brand-400" />
                    {property.parking} parqueaderos
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <WhatsAppButton
                  message={message}
                  label="Consultar por WhatsApp"
                  className="w-full"
                  size="lg"
                />
                <CopyLinkButton path={path} className="w-full" />
              </div>
            </div>
          </FadeIn>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Otros inmuebles similares
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} origin={origin} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
