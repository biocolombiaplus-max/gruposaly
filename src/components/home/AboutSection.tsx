import { Award, HeartHandshake, ShieldCheck, Timer } from "lucide-react";
import clsx from "clsx";
import FadeIn from "@/components/FadeIn";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  const hasPhoto = Boolean(backgroundImage);

  return (
    <section
      id="nosotros"
      className={clsx(
        "relative overflow-hidden py-24 sm:py-32",
        hasPhoto ? "bg-ink-900" : "bg-white"
      )}
    >
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
          <p
            className={clsx(
              "text-xs font-semibold uppercase tracking-[0.25em]",
              hasPhoto ? "text-brand-400" : "text-brand-600"
            )}
          >
            Sobre Grupo Saly
          </p>
          <h2
            className={clsx(
              "mt-4 text-balance font-display text-3xl font-black tracking-tight sm:text-4xl",
              hasPhoto ? "text-white" : "text-ink-950"
            )}
          >
            Estándares de las constructoras más grandes,
            <span className={hasPhoto ? "text-brand-400" : "text-brand-600"}>
              {" "}
              equipo cercano y local
            </span>
          </h2>
          <p
            className={clsx(
              "mt-6 text-balance leading-relaxed",
              hasPhoto ? "text-white/65" : "text-ink-950/65"
            )}
          >
            Somos una empresa colombiana de construcción, remodelación e
            inmobiliaria. Integramos arquitectura, ingeniería estructural,
            gerencia de proyectos y ejecución de obra para entregar espacios
            seguros, funcionales y con acabados de alto nivel — desde
            infraestructura hospitalaria hasta vivienda, comercio e industria.
          </p>
          <p
            className={clsx(
              "mt-4 text-balance leading-relaxed",
              hasPhoto ? "text-white/65" : "text-ink-950/65"
            )}
          >
            Cada proyecto tiene un interlocutor único que responde por el
            cronograma, el presupuesto y la calidad, para que tú te enfoques
            en tu negocio o tu familia mientras nosotros construimos.
          </p>
          <div className="mt-8">
            <WhatsAppButton
              message="Hola, quiero conocer más sobre Grupo Saly y sus proyectos."
              label="Conoce Más por WhatsApp"
            />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {POINTS.map((point, i) => (
            <FadeIn key={point.title} delay={i * 0.08}>
              <div
                className={clsx(
                  "h-full rounded-2xl border p-6 transition-colors hover:border-brand-500/40",
                  hasPhoto
                    ? "border-white/10 bg-ink-950/60"
                    : "border-stone-200 bg-stone-50 shadow-sm"
                )}
              >
                <point.icon
                  className={clsx("h-8 w-8", hasPhoto ? "text-brand-400" : "text-brand-600")}
                  strokeWidth={1.6}
                />
                <h3
                  className={clsx(
                    "mt-4 font-display text-base font-bold",
                    hasPhoto ? "text-white" : "text-ink-950"
                  )}
                >
                  {point.title}
                </h3>
                <p
                  className={clsx(
                    "mt-2 text-sm leading-relaxed",
                    hasPhoto ? "text-white/55" : "text-ink-950/55"
                  )}
                >
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
