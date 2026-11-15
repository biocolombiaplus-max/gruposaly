"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import type { BillingReminder } from "@/lib/billingReminder";

const SUPPORT_NUMBER = "573505457420";
const SUPPORT_MESSAGE =
  "Hola, soy Linda de Grupo Saly 👋. Vi el aviso de pago pendiente de mi plan de mantenimiento web — quiero confirmar el pago para que todo quede al día. ¿Me ayudan con el proceso?";

const DISMISS_KEY = "gs-billing-reminder-dismissed";

function daysOverdue(dueDateIso: string) {
  const due = new Date(dueDateIso + "T00:00:00");
  const now = new Date();
  const diff = Math.floor((now.getTime() - due.getTime()) / 86400000);
  return Math.max(0, diff);
}

function formatDueDate(dueDateIso: string) {
  const due = new Date(dueDateIso + "T00:00:00");
  return due.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

export default function PaymentReminderModal({
  reminder,
}: {
  reminder: BillingReminder;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!reminder.active) return;
    Promise.resolve().then(() => {
      try {
        if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
      } catch {
        // ignore storage errors, show it anyway
      }
      setVisible(true);
    });
  }, [reminder.active]);

  if (!visible) return null;

  function handleDismiss() {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  const waLink = `https://wa.me/${SUPPORT_NUMBER}?text=${encodeURIComponent(SUPPORT_MESSAGE)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
      <div className="relative w-full max-w-[420px] rounded-[20px] border border-red-500/35 bg-ink-900 p-7 shadow-[0_0_0_1px_rgba(239,68,68,0.08),0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(239,68,68,0.12)]">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-red-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.25)]" />
          Pago pendiente
        </span>

        <h2 className="mb-2.5 font-display text-xl font-bold leading-tight text-white">
          Tu plan de mantenimiento está vencido
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-white/60">
          El soporte y las actualizaciones de tu sitio web dependen de tener el
          plan al día. Regulariza el pago para seguir contando con
          mantenimiento continuo.
        </p>

        <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-ink-800 px-4.5 py-4">
          <span className="text-[11px] font-bold uppercase tracking-wide text-white/40">
            Valor a pagar
          </span>
          <span className="font-display text-2xl font-bold text-white">
            US$ {reminder.amountUsd}
          </span>
        </div>

        <div className="mb-5 flex items-center justify-between rounded-2xl border border-red-500/25 bg-red-500/[0.08] px-4.5 py-3.5">
          <span className="text-[11px] font-bold uppercase tracking-wide text-red-400">
            Días en mora
          </span>
          <span className="font-display text-lg font-bold text-red-400">
            {daysOverdue(reminder.dueDate)} días
          </span>
        </div>

        <p className="mb-5 text-xs text-white/40">
          Vencimiento: <b className="text-white/80">{formatDueDate(reminder.dueDate)}</b>
        </p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 py-3.5 text-sm font-extrabold text-ink-950 transition-transform hover:scale-[1.02]"
        >
          <MessageCircle className="h-4 w-4" /> Ya pagué / Hablar con soporte
        </a>
        <button
          type="button"
          onClick={handleDismiss}
          className="w-full py-1.5 text-xs font-semibold text-white/40 hover:text-white/60"
        >
          Recordármelo después
        </button>
      </div>
    </div>
  );
}
