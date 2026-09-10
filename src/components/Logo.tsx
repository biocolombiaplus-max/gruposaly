import clsx from "clsx";

interface LogoProps {
  src?: string | null;
  className?: string;
  markClassName?: string;
  showText?: boolean;
  textClassName?: string;
}

export default function Logo({
  src,
  className,
  markClassName,
  showText = true,
  textClassName,
}: LogoProps) {
  if (src) {
    return (
      <span className={clsx("inline-flex items-center justify-center", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Grupo Saly"
          className={clsx("h-20 w-auto object-contain sm:h-24", markClassName)}
        />
      </span>
    );
  }

  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 100 116"
        className={clsx("h-8 w-auto sm:h-9", markClassName)}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gs-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff9a35" />
            <stop offset="100%" stopColor="#bb4c0c" />
          </linearGradient>
        </defs>
        <path
          d="M50 0 L100 29 V87 L50 116 L0 87 V29 Z"
          fill="url(#gs-grad)"
        />
        <path
          d="M28 47 L68 20 L79 27 L39 54 Z"
          fill="#0c0d0f"
          opacity="0.14"
        />
        <path d="M22 42 L67 12 V26 L36 47 Z" fill="#fff" />
        <path d="M33 69 L78 39 V53 L47 74 Z" fill="#fff" />
      </svg>
      {showText && (
        <span
          className={clsx(
            "font-display text-lg font-black uppercase tracking-tight sm:text-xl",
            textClassName
          )}
        >
          Grupo Saly
        </span>
      )}
    </span>
  );
}
