import { CalendarCheck, FileCheck2, ShieldCheck, UserCheck } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const ITEMS = [
  {
    icon: FileCheck2,
    title: "Presupuesto sin compromiso",
    text: "Cotización clara, sin letra pequeña",
  },
  {
    icon: ShieldCheck,
    title: "Garantía por escrito",
    text: "Respaldo real sobre cada obra entregada",
  },
  {
    icon: CalendarCheck,
    title: "Cronogramas cumplidos",
    text: "Fechas de entrega que se respetan",
  },
  {
    icon: UserCheck,
    title: "Un solo interlocutor",
    text: "Acompañamiento directo en toda la obra",
  },
];

export default function TrustBar() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink-950 py-10 sm:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,125,22,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/40 hover:bg-brand-500/[0.06]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 transition-colors group-hover:bg-brand-500/25">
                  <item.icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-white/50">
                    {item.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
