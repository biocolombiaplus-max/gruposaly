"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import MediaFrame from "./MediaFrame";

interface GalleryProps {
  images: string[];
  alt: string;
}

export default function Gallery({ images, alt }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? i : (i - 1 + images.length) % images.length
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, images.length]);

  if (images.length === 0) {
    return <MediaFrame src={null} alt={alt} aspect="aspect-[16/9]" />;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpenIndex(i)}
            className={
              "group relative overflow-hidden rounded-xl " +
              (i === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : "")
            }
          >
            <MediaFrame
              src={src}
              alt={`${alt} - foto ${i + 1}`}
              aspect={i === 0 ? "aspect-square sm:aspect-[4/3]" : "aspect-square"}
              imgClassName="group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
              <Expand className="h-5 w-5 text-white" />
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm">
          <button
            onClick={() => setOpenIndex(null)}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setOpenIndex((i) =>
                    i === null ? i : (i - 1 + images.length) % images.length
                  )
                }
                aria-label="Anterior"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() =>
                  setOpenIndex((i) => (i === null ? i : (i + 1) % images.length))
                }
                aria-label="Siguiente"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative h-[75vh] w-full max-w-5xl">
            <MediaFrame
              src={images[openIndex]}
              alt={`${alt} - foto ${openIndex + 1}`}
              aspect="h-full"
              className="rounded-2xl"
            />
          </div>
          <p className="absolute bottom-5 text-sm text-white/50">
            {openIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
