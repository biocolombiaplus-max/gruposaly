"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import MediaFrame from "@/components/MediaFrame";
import CopyLinkButton from "@/components/CopyLinkButton";
import PropertyForm from "./PropertyForm";
import {
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
  type Property,
} from "@/lib/propertyTypes";
import { formatCOP } from "@/lib/format";

export default function PropertiesManager({
  initialProperties,
}: {
  initialProperties: Property[];
}) {
  const [properties, setProperties] = useState(initialProperties);
  const [view, setView] = useState<"list" | "form">("list");
  const [editing, setEditing] = useState<Property | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function openCreate() {
    setEditing(undefined);
    setView("form");
  }

  function openEdit(property: Property) {
    setEditing(property);
    setView("form");
  }

  function handleSaved(property: Property) {
    setProperties((prev) => {
      const exists = prev.some((p) => p.id === property.id);
      return exists
        ? prev.map((p) => (p.id === property.id ? property : p))
        : [property, ...prev];
    });
    setView("list");
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este inmueble? Esta acción no se puede deshacer.")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/properties/${id}`, { method: "DELETE" });
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  if (view === "form") {
    return (
      <PropertyForm
        initial={editing}
        onSaved={handleSaved}
        onCancel={() => setView("list")}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/55">
          Publica un inmueble en segundos: fotos, características y precio.
          Aparecerá de inmediato en la página principal y en Proyectos en
          Venta, listo para compartir su enlace con un cliente.
        </p>
        <button
          onClick={openCreate}
          className="ml-4 inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-ink-950 transition-transform hover:scale-105"
        >
          <Plus className="h-4 w-4" /> Nuevo
        </button>
      </div>

      {properties.length === 0 ? (
        <p className="mt-10 text-sm text-white/40">
          Aún no has publicado inmuebles.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-ink-950/60 p-4 sm:flex-row sm:items-center"
            >
              <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl sm:w-32">
                <MediaFrame
                  src={property.images[0]}
                  alt={property.title}
                  aspect="aspect-[4/3]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="truncate font-display font-bold">{property.title}</h4>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60">
                    {PROPERTY_TYPE_LABELS[property.type]}
                  </span>
                  <span
                    className={
                      "rounded-full px-2.5 py-0.5 text-xs " +
                      (property.status === "disponible"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : property.status === "reservado"
                        ? "bg-amber-400/15 text-amber-300"
                        : "bg-white/10 text-white/50")
                    }
                  >
                    {PROPERTY_STATUS_LABELS[property.status]}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-white/50">
                  {property.location}
                </p>
                <p className="mt-1 font-semibold text-brand-400">
                  {property.priceLabel || formatCOP(property.price)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <CopyLinkButton path={`/proyectos/${property.slug}`} label="Copiar URL" />
                <button
                  onClick={() => openEdit(property)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-brand-400/50 hover:text-white"
                  aria-label="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  disabled={deletingId === property.id}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-red-400/50 hover:text-red-400 disabled:opacity-60"
                  aria-label="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
