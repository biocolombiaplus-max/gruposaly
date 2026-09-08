"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/services";

export default function WhatsAppFloatingButton() {
  const href = whatsappLink(
    "Hola, quiero información sobre los servicios de Grupo Saly."
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ink-950 shadow-xl animate-pulse-glow transition-transform hover:scale-110 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
    >
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.3} />
    </a>
  );
}
