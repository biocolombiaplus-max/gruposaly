import WhatsAppButton from "@/components/WhatsAppButton";
import FadeIn from "@/components/FadeIn";
import { WHATSAPP_DISPLAY } from "@/lib/services";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(251,125,22,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-noise opacity-10" />
      <FadeIn className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-balance font-display text-3xl font-black tracking-tight sm:text-5xl">
          ¿Listo para construir tu próximo proyecto?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-balance text-white/60">
          Escríbenos ahora por WhatsApp y un asesor de Grupo Saly te
          contactará para agendar una visita técnica sin costo.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <WhatsAppButton
            size="lg"
            message="Hola, quiero agendar una asesoría con Grupo Saly."
            label="Escribir por WhatsApp"
          />
          <span className="text-sm text-white/45">{WHATSAPP_DISPLAY}</span>
        </div>
      </FadeIn>
    </section>
  );
}
