import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, VENTAS_SERVICE } from "@/lib/services";
import { SERVICE_ICON_MAP } from "@/lib/icons";
import MediaFrame from "@/components/MediaFrame";
import FadeIn from "@/components/FadeIn";
import QuickWhatsAppIcon from "@/components/QuickWhatsAppIcon";

interface ServicesGridProps {
  serviceImages: Record<string, string[]>;
  ventasCover?: string | null;
  ventasCount: number;
}

export default function ServicesGrid({
  serviceImages,
  ventasCover,
  ventasCount,
}: ServicesGridProps) {
  return (
    <section id="servicios" className="relative bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">
            Nuestros Servicios
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Un equipo. Todas las etapas de tu proyecto.
          </h2>
          <p className="mt-4 text-balance text-white/60">
            Desde la remodelación de un espacio hasta la construcción integral
            de infraestructura hospitalaria, edificios o bodegas — y la venta
            de proyectos de vivienda listos para invertir.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICON_MAP[service.icon];
            const cover = serviceImages[service.slug]?.[0];
            return (
              <FadeIn key={service.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/servicios/${service.slug}`}
                  className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-500/40 hover:shadow-2xl hover:shadow-brand-900/40"
                >
                  <div className="absolute inset-0">
                    {cover ? (
                      <MediaFrame
                        src={cover}
                        alt={service.title}
                        aspect="h-full"
                        imgClassName="opacity-60 group-hover:scale-110 group-hover:opacity-70"
                      />
                    ) : (
                      <div
                        className={`h-full w-full bg-gradient-to-br ${service.heroGradient} opacity-25 transition-opacity duration-500 group-hover:opacity-35`}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/20" />
                  </div>

                  <div className="relative flex items-center justify-between p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-400/30 bg-brand-500/15 text-brand-300 backdrop-blur transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <QuickWhatsAppIcon
                      message={service.whatsappMessage}
                      ariaLabel={`Consultar ${service.shortTitle} por WhatsApp`}
                    />
                  </div>

                  <div className="relative p-6 pt-0">
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      {service.shortTitle}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/60">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400">
                      Ver más
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}

          <FadeIn delay={0.5} className="sm:col-span-2 lg:col-span-3">
            <Link
              href="/proyectos"
              className="group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-600/20 via-ink-900 to-ink-900 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/60 sm:flex-row sm:items-center sm:p-10"
            >
              <div className="absolute inset-0 -z-10">
                {ventasCover && (
                  <MediaFrame
                    src={ventasCover}
                    alt={VENTAS_SERVICE.title}
                    aspect="h-full"
                    imgClassName="opacity-20 group-hover:scale-110"
                  />
                )}
              </div>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-300">
                  Módulo de Ventas
                </span>
                <h3 className="mt-4 font-display text-2xl font-black tracking-tight sm:text-3xl">
                  {VENTAS_SERVICE.title}
                </h3>
                <p className="mt-2 max-w-xl text-white/60">
                  {VENTAS_SERVICE.description}{" "}
                  {ventasCount > 0
                    ? `Actualmente tenemos ${ventasCount} inmueble${ventasCount === 1 ? "" : "s"} disponible${ventasCount === 1 ? "" : "s"}.`
                    : "Muy pronto nuevos proyectos disponibles."}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-ink-950 shadow-lg shadow-brand-900/40 transition-transform group-hover:translate-x-1">
                Ver Inmuebles
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
