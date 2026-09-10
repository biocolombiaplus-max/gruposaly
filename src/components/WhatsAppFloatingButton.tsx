"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { whatsappLink } from "@/lib/services";

const BUBBLE_SESSION_KEY = "gs_wa_bubble_shown";

export default function WhatsAppFloatingButton() {
  const [showBubble, setShowBubble] = useState(false);
  const href = whatsappLink(
    "Hola, quiero información sobre los servicios de Grupo Saly."
  );

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(BUBBLE_SESSION_KEY) === "1";
    } catch {
      // sessionStorage unavailable (private mode, etc.) — just skip the bubble.
      alreadyShown = true;
    }
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setShowBubble(true);
      try {
        sessionStorage.setItem(BUBBLE_SESSION_KEY, "1");
      } catch {
        // ignore
      }
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative max-w-[15.5rem] rounded-2xl rounded-br-sm border border-white/10 bg-ink-900/95 p-4 pr-8 text-sm text-white/85 shadow-2xl shadow-black/40 backdrop-blur"
          >
            <button
              onClick={() => setShowBubble(false)}
              aria-label="Cerrar mensaje"
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="font-display font-semibold text-white">
              ¿Tienes un proyecto en mente?
            </p>
            <p className="mt-1 text-white/60">
              Escríbenos y un asesor te responde directo por WhatsApp.
            </p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:text-[#2ee578]"
            >
              Iniciar conversación →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

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
        className="relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] blur-lg animate-soft-glow" />
        <span className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#2fe377] to-[#1da851] shadow-2xl shadow-black/40 ring-4 ring-white/10">
          <MessageCircle
            className="h-6 w-6 text-ink-950 sm:h-7 sm:w-7"
            strokeWidth={2.3}
          />
        </span>
      </motion.a>
    </div>
  );
}
