import type { Metadata } from "next";
import { getAllProperties } from "@/lib/properties";
import PropertiesExplorer from "@/components/PropertiesExplorer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FadeIn from "@/components/FadeIn";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Venta de Proyectos de Vivienda",
  description:
    "Casas, edificios, locales comerciales y bodegas disponibles para la venta con Grupo Saly.",
};

export default async function ProyectosPage() {
  const properties = await getAllProperties();

  return (
    <div className="bg-ink-950 pt-32 pb-24 sm:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">
            Módulo de Ventas
          </p>
          <h1 className="mt-4 text-balance font-display text-3xl font-black tracking-tight sm:text-5xl">
            Venta de Proyectos de Vivienda
          </h1>
          <p className="mt-4 text-balance text-white/60">
            Casas, edificios, locales comerciales y bodegas listos para
            invertir. Consulta directamente por WhatsApp sobre el inmueble
            que te interese.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton
              message="Hola, quiero información sobre los proyectos de vivienda en venta de Grupo Saly."
              label="Hablar con un asesor"
            />
          </div>
        </FadeIn>

        <div className="mt-16">
          <PropertiesExplorer properties={properties} />
        </div>
      </div>
    </div>
  );
}
