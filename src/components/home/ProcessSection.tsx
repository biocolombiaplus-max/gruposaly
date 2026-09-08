import { ClipboardList, Compass, HardHat, KeyRound } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const STEPS = [
  {
    icon: Compass,
    title: "Diagnóstico y diseño",
    text: "Visita técnica, levantamiento de necesidades y diseño arquitectónico o de remodelación.",
  },
  {
    icon: ClipboardList,
    title: "Presupuesto y planeación",
    text: "Presupuesto detallado, cronograma de obra y definición de materiales y acabados.",
  },
  {
    icon: HardHat,
    title: "Ejecución de obra",
    text: "Construcción con supervisión permanente, control de calidad y reportes de avance.",
  },
  {
    icon: KeyRound,
    title: "Entrega llave en mano",
    text: "Revisión final, garantía sobre la obra entregada y acompañamiento post-entrega.",
  },
];

export default function ProcessSection() {
  return (
    <section id="proceso" className="relative bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">
            Cómo Trabajamos
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-black tracking-tight sm:text-4xl">
            Un proceso claro, de principio a fin
          </h2>
        </FadeIn>

        <div className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
          {STEPS.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.1} className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-500/30 bg-ink-950 text-brand-400 shadow-lg shadow-black/30">
                <step.icon className="h-7 w-7" strokeWidth={1.6} />
              </div>
              <span className="absolute -left-1 -top-2 font-display text-5xl font-black text-white/5">
                0{i + 1}
              </span>
              <h3 className="relative mt-5 font-display text-lg font-bold">
                {step.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                {step.text}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
