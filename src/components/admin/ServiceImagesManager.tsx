"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { SERVICES } from "@/lib/services";
import MediaFrame from "@/components/MediaFrame";
import ImageUploader from "./ImageUploader";
import type { ServiceImagesMap } from "@/lib/serviceImages";

export default function ServiceImagesManager({
  initialImages,
}: {
  initialImages: ServiceImagesMap;
}) {
  const [activeSlug, setActiveSlug] = useState(SERVICES[0].slug);
  const [images, setImages] = useState<ServiceImagesMap>(initialImages);
  const [deleting, setDeleting] = useState<string | null>(null);

  const activeService = SERVICES.find((s) => s.slug === activeSlug)!;
  const currentImages = images[activeSlug] ?? [];

  async function handleUploaded(url: string) {
    await fetch(`/api/services/${activeSlug}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    setImages((prev) => ({
      ...prev,
      [activeSlug]: [...(prev[activeSlug] ?? []), url],
    }));
  }

  async function handleDelete(url: string) {
    setDeleting(url);
    try {
      await fetch(`/api/services/${activeSlug}/images`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      setImages((prev) => ({
        ...prev,
        [activeSlug]: (prev[activeSlug] ?? []).filter((img) => img !== url),
      }));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <p className="text-sm text-white/55">
        Selecciona un servicio y sube las fotos que quieres mostrar en su
        galería. Las imágenes se ajustan automáticamente al tamaño correcto,
        sin importar sus dimensiones originales.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {SERVICES.map((service) => (
          <button
            key={service.slug}
            onClick={() => setActiveSlug(service.slug)}
            className={
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors " +
              (activeSlug === service.slug
                ? "border-brand-500 bg-brand-500 text-ink-950"
                : "border-white/15 text-white/70 hover:border-brand-400/50 hover:text-white")
            }
          >
            {service.shortTitle}
            <span className="ml-1.5 text-xs opacity-70">
              ({(images[service.slug] ?? []).length})
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr]">
        <ImageUploader folder="services" onUploaded={handleUploaded} />

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white/50">
            Galería de {activeService.shortTitle} ({currentImages.length})
          </h3>
          {currentImages.length === 0 ? (
            <p className="mt-4 text-sm text-white/40">
              Aún no hay fotos para este servicio.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {currentImages.map((url) => (
                <div key={url} className="group relative">
                  <MediaFrame src={url} alt={activeService.title} aspect="aspect-square" />
                  <button
                    onClick={() => handleDelete(url)}
                    disabled={deleting === url}
                    aria-label="Eliminar imagen"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/90 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-60"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
