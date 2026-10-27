"use client";

import { useState } from "react";
import clsx from "clsx";
import { ImageIcon, RefreshCw } from "lucide-react";

interface MediaFrameProps {
  src?: string | null;
  alt: string;
  aspect?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
}

export default function MediaFrame({
  src,
  alt,
  aspect = "aspect-[4/3]",
  className,
  imgClassName,
  priority,
  objectFit = "cover",
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={clsx("media-frame", aspect, className)}>
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className={clsx(
            "h-full w-full transition-transform duration-700",
            objectFit === "contain" ? "object-contain" : "object-cover",
            imgClassName
          )}
        />
      ) : src && failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-red-500/5 px-2 text-center text-red-300/80">
          <RefreshCw className="h-6 w-6" strokeWidth={1.4} />
          <span className="text-[11px] leading-tight">
            No se pudo cargar — súbela de nuevo
          </span>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/25">
          <ImageIcon className="h-8 w-8" strokeWidth={1.4} />
          <span className="text-xs">Sin imagen</span>
        </div>
      )}
    </div>
  );
}
