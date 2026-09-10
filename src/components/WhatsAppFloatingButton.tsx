"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/services";

export default function WhatsAppFloatingButton() {
  const href = whatsappLink(DEFAULT_WHATSAPP_MESSAGE);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-4 right-4 z-50 flex h-13 w-13 items-center justify-center pb-[env(safe-area-inset-bottom)] sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] blur-lg animate-soft-glow" />
      <span className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#2fe377] to-[#1da851] shadow-2xl shadow-black/40 ring-4 ring-white/10">
        <MessageCircle
          className="h-5.5 w-5.5 text-ink-950 sm:h-7 sm:w-7"
          strokeWidth={2.3}
        />
        <span className="absolute right-0.5 top-0.5 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-75" />
          <span className="relative inline-flex h-full w-full rounded-full bg-white ring-2 ring-[#1da851]" />
        </span>
      </span>
    </motion.a>
  );
}
