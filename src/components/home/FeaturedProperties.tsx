import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import FadeIn from "@/components/FadeIn";
import type { Property } from "@/lib/properties";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <section className="bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">
              Venta de Proyectos de Vivienda
            </p>
            <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-black tracking-tight sm:text-4xl">
              Inmuebles disponibles para invertir
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/85 transition-all hover:border-brand-400/50 hover:bg-white/5"
          >
            Ver todos los inmuebles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 6).map((property, i) => (
            <FadeIn key={property.id} delay={(i % 3) * 0.08}>
              <PropertyCard property={property} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
