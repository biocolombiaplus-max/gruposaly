"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { PROPERTY_TYPE_LABELS, type Property, type PropertyType } from "@/lib/propertyTypes";

const FILTERS: { value: PropertyType | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "casa", label: PROPERTY_TYPE_LABELS.casa },
  { value: "edificio", label: PROPERTY_TYPE_LABELS.edificio },
  { value: "local", label: PROPERTY_TYPE_LABELS.local },
  { value: "bodega", label: PROPERTY_TYPE_LABELS.bodega },
];

export default function PropertiesExplorer({
  properties,
}: {
  properties: Property[];
}) {
  const [filter, setFilter] = useState<PropertyType | "todos">("todos");

  const filtered = useMemo(
    () =>
      filter === "todos"
        ? properties
        : properties.filter((p) => p.type === filter),
    [filter, properties]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/40">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filtrar
        </span>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors " +
              (filter === f.value
                ? "border-brand-500 bg-brand-500 text-ink-950"
                : "border-white/15 text-white/70 hover:border-brand-400/50 hover:text-white")
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 rounded-3xl border border-dashed border-white/15 py-20 text-center">
          <p className="font-display text-lg font-bold text-white/70">
            {properties.length === 0
              ? "Muy pronto nuevos proyectos disponibles"
              : "No hay inmuebles en esta categoría por ahora"}
          </p>
          <p className="mt-2 text-sm text-white/45">
            Escríbenos por WhatsApp y te avisamos apenas tengamos nuevas
            opciones para ti.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
