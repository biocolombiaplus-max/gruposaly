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
    <section className="relative border-y border-white/10 bg-ink-900/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
          {ITEMS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="flex items-start gap-3 sm:flex-col sm:items-start sm:border-l sm:border-white/10 sm:pl-4 sm:first:border-l-0 sm:first:pl-0">
                <item.icon
                  className="h-5 w-5 shrink-0 text-brand-400 sm:h-6 sm:w-6"
                  strokeWidth={1.8}
                />
                <div>
                  <p className="text-sm font-semibold leading-tight text-white/90">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-white/45">
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
