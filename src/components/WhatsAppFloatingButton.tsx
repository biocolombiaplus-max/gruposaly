"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/services";

const BUBBLE_SESSION_KEY = "gs_wa_bubble_shown";
const BUBBLE_SHOW_DELAY = 3200;
const BUBBLE_AUTO_HIDE_DELAY = 9000;
// Don't let the auto-popup cover the footer: skip/hide it whenever the
// bottom of the page is this close to the bottom of the viewport.
const FOOTER_PROXIMITY_PX = 320;

function isNearPageBottom() {
  const scrollBottom = window.scrollY + window.innerHeight;
  return document.documentElement.scrollHeight - scrollBottom < FOOTER_PROXIMITY_PX;
}

export default function WhatsAppFloatingButton() {
  const [showBubble, setShowBubble] = useState(false);
  const href = whatsappLink(DEFAULT_WHATSAPP_MESSAGE);

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(BUBBLE_SESSION_KEY) === "1";
    } catch {
      // sessionStorage unavailable (private mode, etc.) — just skip the bubble.
      alreadyShown = true;
    }
    if (alreadyShown) return;

    const showTimer = setTimeout(() => {
      try {
        sessionStorage.setItem(BUBBLE_SESSION_KEY, "1");
      } catch {
        // ignore
      }
      // If the visitor already scrolled down to the footer/contact area by
      // the time the delay elapses, showing the bubble would just cover the
      // links they're looking at — skip it instead of nagging.
      if (isNearPageBottom()) return;
      setShowBubble(true);
    }, BUBBLE_SHOW_DELAY);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showBubble) return;
    const hideTimer = setTimeout(() => setShowBubble(false), BUBBLE_AUTO_HIDE_DELAY);
    const handleScroll = () => {
      if (isNearPageBottom()) setShowBubble(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(hideTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showBubble]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2.5 pb-[env(safe-area-inset-bottom)] sm:bottom-8 sm:right-8 sm:gap-3">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-[min(15.5rem,calc(100vw-2rem))] rounded-2xl rounded-br-sm border border-white/10 bg-ink-900/95 p-3.5 pr-8 text-sm text-white/85 shadow-2xl shadow-black/40 backdrop-blur sm:max-w-[15.5rem] sm:p-4"
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
        className="relative flex h-13 w-13 items-center justify-center sm:h-16 sm:w-16"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] blur-lg animate-soft-glow" />
        <span className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#2fe377] to-[#1da851] shadow-2xl shadow-black/40 ring-4 ring-white/10">
          <MessageCircle
            className="h-5.5 w-5.5 text-ink-950 sm:h-7 sm:w-7"
            strokeWidth={2.3}
          />
        </span>
      </motion.a>
    </div>
  );
}
