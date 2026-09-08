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
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
        size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm",
        variant === "solid" &&
          "bg-[#25D366] text-ink-950 shadow-[0_0_0_0_rgba(37,211,102,0.5)] hover:shadow-[0_0_28px_4px_rgba(37,211,102,0.55)] hover:-translate-y-0.5 focus-visible:ring-[#25D366]",
        variant === "outline" &&
          "border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-ink-950 hover:-translate-y-0.5 focus-visible:ring-[#25D366]",
        variant === "dark" &&
          "bg-ink-900 text-white border border-white/10 hover:border-[#25D366]/60 hover:-translate-y-0.5 focus-visible:ring-[#25D366]",
        className
      )}
    >
      <span
        className={clsx(
          "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full",
          variant !== "solid" && "hidden"
        )}
      />
      <MessageCircle className="relative h-5 w-5 shrink-0" strokeWidth={2.3} />
      <span className="relative">{label}</span>
    </a>
  );
}
