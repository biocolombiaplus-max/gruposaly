"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/services";
import clsx from "clsx";

interface WhatsAppButtonProps {
  message: string;
  label?: string;
  variant?: "solid" | "outline" | "dark";
  size?: "md" | "lg";
  className?: string;
}

export default function WhatsAppButton({
  message,
  label = "Consultar por WhatsApp",
  variant = "solid",
  size = "md",
  className,
}: WhatsAppButtonProps) {
  const href = whatsappLink(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group relative inline-flex items-center justify-center",
        className
      )}
    >
      {variant === "solid" && (
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-70 blur-md animate-soft-glow" />
      )}
      <span
        className={clsx(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 focus:outline-none group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-ink-950",
          size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm",
          variant === "solid" &&
            "bg-gradient-to-br from-[#2fe377] to-[#1da851] text-ink-950 shadow-lg shadow-black/30 group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-focus-visible:ring-[#25D366]",
          variant === "outline" &&
            "border-2 border-[#25D366] text-[#25D366] group-hover:bg-[#25D366] group-hover:text-ink-950 group-hover:-translate-y-0.5 group-focus-visible:ring-[#25D366]",
          variant === "dark" &&
            "border border-white/10 bg-ink-900 text-white group-hover:border-[#25D366]/60 group-hover:-translate-y-0.5 group-focus-visible:ring-[#25D366]"
        )}
      >
        <span
          className={clsx(
            "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full",
            variant !== "solid" && "hidden"
          )}
        />
        <MessageCircle className="relative h-5 w-5 shrink-0" strokeWidth={2.3} />
        <span className="relative">{label}</span>
      </span>
    </a>
  );
}
