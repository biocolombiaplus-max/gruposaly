import clsx from "clsx";
import { ImageIcon } from "lucide-react";

interface MediaFrameProps {
  src?: string | null;
  alt: string;
  aspect?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export default function MediaFrame({
  src,
  alt,
  aspect = "aspect-[4/3]",
  className,
  imgClassName,
  priority,
}: MediaFrameProps) {
  return (
    <div className={clsx("media-frame", aspect, className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={clsx(
            "h-full w-full object-cover transition-transform duration-700",
            imgClassName
          )}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/25">
          <ImageIcon className="h-8 w-8" strokeWidth={1.4} />
          <span className="text-xs">Sin imagen</span>
        </div>
      )}
    </div>
  );
}
