"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/services";

export default function QuickWhatsAppIcon({
  message,
  ariaLabel,
}: {
  message: string;
  ariaLabel: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      aria-label={ariaLabel}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 backdrop-blur transition-all hover:border-[#25D366] hover:bg-[#25D366]/15 hover:text-[#25D366]"
    >
      <MessageCircle className="h-4.5 w-4.5" />
    </a>
  );
}
