"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import clsx from "clsx";

interface CopyLinkButtonProps {
  path: string;
  label?: string;
  className?: string;
}

export default function CopyLinkButton({
  path,
  label = "Copiar enlace",
  className,
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copia el enlace:", url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-brand-400/50 hover:bg-white/5",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-400" /> Enlace copiado
        </>
      ) : (
        <>
          <Link2 className="h-4 w-4" /> {label}
        </>
      )}
    </button>
  );
}
