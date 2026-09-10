import { Award, HeartHandshake, ShieldCheck, Timer } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const POINTS = [
  {
    icon: ShieldCheck,
    title: "Cumplimiento Normativo",
    text: "Trabajamos bajo NSR-10 y normativa de habilitación en salud para cada tipo de proyecto.",
  },
  {
    icon: Timer,
    title: "Cronogramas Reales",
    text: "Planeación de obra con fechas de entrega claras y seguimiento constante.",
  },
  {
    icon: Award,
    title: "Calidad Certificada",
    text: "Materiales certificados y personal calificado en cada etapa de construcción.",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento Total",
    text: "Un solo equipo te acompaña desde el diseño hasta la entrega final del proyecto.",
  },
];

interface AboutSectionProps {
  backgroundImage?: string | null;
}

export default function AboutSection({ backgroundImage }: AboutSectionProps) {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
      {backgroundImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/55 to-ink-900/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-transparent to-ink-900" />
        </>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(251,125,22,0.1),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">
            Sobre Grupo Saly
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-black tracking-tight sm:text-4xl">
            Estándares de las constructoras más grandes,
            <span className="text-brand-400"> equipo cercano y local</span>
          </h2>
          <p className="mt-6 text-balance leading-relaxed text-white/65">
            Somos una empresa colombiana de construcción, remodelación e
            inmobiliaria. Integramos arquitectura, ingeniería estructural,
            gerencia de proyectos y ejecución de obra para entregar espacios
            seguros, funcionales y con acabados de alto nivel — desde
            infraestructura hospitalaria hasta vivienda, comercio e industria.
          </p>
          <p className="mt-4 text-balance leading-relaxed text-white/65">
            Cada proyecto tiene un interlocutor único que responde por el
            cronograma, el presupuesto y la calidad, para que tú te enfoques
            en tu negocio o tu familia mientras nosotros construimos.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {POINTS.map((point, i) => (
            <FadeIn key={point.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-ink-950/60 p-6 transition-colors hover:border-brand-500/40">
                <point.icon className="h-8 w-8 text-brand-400" strokeWidth={1.6} />
                <h3 className="mt-4 font-display text-base font-bold">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {point.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
