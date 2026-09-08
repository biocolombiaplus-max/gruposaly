"use client";

import Link from "next/link";
import { BedDouble, Bath, Car, MessageCircle, Ruler } from "lucide-react";
import MediaFrame from "@/components/MediaFrame";
import {
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
  type Property,
} from "@/lib/propertyTypes";
import { formatCOP } from "@/lib/format";
import { whatsappLink } from "@/lib/services";

interface PropertyCardProps {
  property: Property;
  origin?: string;
}

export default function PropertyCard({ property, origin }: PropertyCardProps) {
  const url = `${origin ?? ""}/proyectos/${property.slug}`;
  const message = `Hola, estoy interesado en el inmueble "${property.title}" (${PROPERTY_TYPE_LABELS[property.type]} - ${property.location}). ${url}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-500/40 hover:shadow-2xl hover:shadow-brand-900/30">
      <Link href={`/proyectos/${property.slug}`} className="block">
        <div className="relative">
          <MediaFrame
            src={property.images[0]}
            alt={property.title}
            aspect="aspect-[4/3]"
            imgClassName="group-hover:scale-110"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-ink-950/85 px-3 py-1 text-xs font-semibold text-brand-300 backdrop-blur">
              {PROPERTY_TYPE_LABELS[property.type]}
            </span>
            <span
              className={
                "rounded-full px-3 py-1 text-xs font-semibold backdrop-blur " +
                (property.status === "disponible"
                  ? "bg-emerald-500/90 text-emerald-950"
                  : property.status === "reservado"
                  ? "bg-amber-400/90 text-amber-950"
                  : "bg-white/20 text-white")
              }
            >
              {PROPERTY_STATUS_LABELS[property.status]}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/proyectos/${property.slug}`}>
          <h3 className="line-clamp-1 font-display text-lg font-bold tracking-tight transition-colors group-hover:text-brand-300">
            {property.title}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-sm text-white/50">{property.location}</p>

        <p className="mt-3 font-display text-xl font-black text-brand-400">
          {property.priceLabel || formatCOP(property.price)}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/55">
          {typeof property.areaM2 === "number" && (
            <span className="inline-flex items-center gap-1.5">
              <Ruler className="h-3.5 w-3.5" /> {property.areaM2} m²
            </span>
          )}
          {typeof property.bedrooms === "number" && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5" /> {property.bedrooms}
            </span>
          )}
          {typeof property.bathrooms === "number" && (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-3.5 w-3.5" /> {property.bathrooms}
            </span>
          )}
          {typeof property.parking === "number" && (
            <span className="inline-flex items-center gap-1.5">
              <Car className="h-3.5 w-3.5" /> {property.parking}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Link
            href={`/proyectos/${property.slug}`}
            className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-center text-xs font-semibold text-white/85 transition-colors hover:border-brand-400/50 hover:bg-white/5"
          >
            Ver Detalle
          </Link>
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar por WhatsApp"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-ink-950 transition-transform hover:scale-110"
          >
            <MessageCircle className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
