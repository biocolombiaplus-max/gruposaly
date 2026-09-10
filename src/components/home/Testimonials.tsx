import { Star } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import WhatsAppButton from "@/components/WhatsAppButton";

const TESTIMONIALS = [
  {
    name: "Clínica Vitalis IPS",
    role: "Infraestructura Hospitalaria",
    quote:
      "Grupo Saly entendió los requisitos técnicos y de habilitación de nuestra sede. La obra cumplió el cronograma y pasó la visita de la autoridad sanitaria sin observaciones.",
  },
  {
    name: "Andrés Molina",
    role: "Construcción de Vivienda",
    quote:
      "Construyeron mi casa desde los cimientos hasta la entrega. El seguimiento fotográfico semanal me dio total tranquilidad durante todo el proceso.",
  },
  {
    name: "Retail Group S.A.S",
    role: "Locales Comerciales",
    quote:
      "Adecuaron tres locales antes de la fecha de apertura, cumpliendo nuestro manual de marca al detalle. Excelente comunicación con el equipo de obra.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">
            Testimonios
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-black tracking-tight sm:text-4xl">
            Clientes que confiaron su proyecto en nosotros
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-ink-900 to-ink-950 p-8">
                <div className="flex gap-1 text-brand-400">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 flex-1 text-balance leading-relaxed text-white/70">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-display font-bold">{t.name}</p>
                  <p className="text-xs text-white/45">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25} className="mt-14 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-white/50">
            Sé el próximo cliente satisfecho de Grupo Saly.
          </p>
          <WhatsAppButton
            message="Hola, quiero que mi proyecto sea el próximo caso de éxito de Grupo Saly."
            label="Quiero mi Proyecto"
          />
        </FadeIn>
      </div>
    </section>
  );
}
