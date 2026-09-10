"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import MediaFrame from "@/components/MediaFrame";
import ImageUploader from "./ImageUploader";
import { SITE_IMAGE_SLOTS, type SiteImagesMap } from "@/lib/siteImageTypes";

export default function SiteImagesManager({
  initialImages,
}: {
  initialImages: SiteImagesMap;
}) {
  const [images, setImages] = useState<SiteImagesMap>(initialImages);
  const [removing, setRemoving] = useState<string | null>(null);

  async function handleUploaded(slot: string, url: string) {
    await fetch(`/api/site-images/${slot}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    setImages((prev) => ({ ...prev, [slot]: url }));
  }

  async function handleRemove(slot: string) {
    setRemoving(slot);
    try {
      await fetch(`/api/site-images/${slot}`, { method: "DELETE" });
      setImages((prev) => {
        const next = { ...prev };
        delete next[slot as keyof SiteImagesMap];
        return next;
      });
    } finally {
      setRemoving(null);
    }
  }

  return (
    <div>
      <p className="text-sm text-white/55">
        Estas imágenes son únicas (no galería): al subir una nueva se
        reemplaza la anterior. Aparecen de inmediato en la página
        principal.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {SITE_IMAGE_SLOTS.map((item) => {
          const current = images[item.slot];
          return (
            <div
              key={item.slot}
              className="rounded-2xl border border-white/10 bg-ink-950/50 p-5"
            >
              <h3 className="font-display text-sm font-bold">{item.label}</h3>
              <p className="mt-1 text-xs text-white/45">{item.hint}</p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
                <ImageUploader
                  folder="site"
                  label={current ? "Reemplazar imagen" : "Subir imagen"}
                  onUploaded={(url) => handleUploaded(item.slot, url)}
                />
                {current && (
                  <div className="group relative h-28 w-full sm:w-40">
                    <MediaFrame
                      src={current}
                      alt={item.label}
                      aspect={
                        item.slot === "logo"
                          ? "aspect-square"
                          : item.slot === "heroCard"
                            ? "aspect-[4/5]"
                            : "aspect-[4/3]"
                      }
                      objectFit={item.slot === "logo" ? "contain" : "cover"}
                      imgClassName={item.slot === "logo" ? "p-3" : undefined}
                      className={item.slot === "logo" ? "bg-white/5" : undefined}
                    />
                    <button
                      onClick={() => handleRemove(item.slot)}
                      disabled={removing === item.slot}
                      aria-label="Quitar imagen"
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/90 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-60"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
