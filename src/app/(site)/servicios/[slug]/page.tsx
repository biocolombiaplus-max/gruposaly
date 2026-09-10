import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES, getServiceBySlug } from "@/lib/services";
import { SERVICE_ICON_MAP } from "@/lib/icons";
import { getServiceImages } from "@/lib/serviceImages";
import { getSiteImage } from "@/lib/siteImages";
import WhatsAppButton from "@/components/WhatsAppButton";
import Gallery from "@/components/Gallery";
import FadeIn from "@/components/FadeIn";
import FinalCTA from "@/components/home/FinalCTA";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const [images, ctaBackground] = await Promise.all([
    getServiceImages(service.slug),
    getSiteImage("cta"),
  ]);
  const Icon = SERVICE_ICON_MAP[service.icon];
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 pt-[10.25rem] pb-20 sm:pt-[12.25rem] sm:pb-28">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.heroGradient} opacity-[0.14]`}
        />
        <div className="absolute inset-0 bg-noise opacity-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <FadeIn>
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs text-white/45">
              <Link href="/" className="hover:text-brand-400">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/#servicios" className="hover:text-brand-400">
                Servicios
              </Link>
              <span>/</span>
              <span className="text-white/70">{service.shortTitle}</span>
            </nav>

            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-400/30 bg-brand-500/15 text-brand-300">
              <Icon className="h-8 w-8" strokeWidth={1.7} />
            </span>

            <h1 className="mt-6 text-balance font-display text-3xl font-black tracking-tight sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 text-balance text-lg text-brand-300">
              {service.tagline}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-balance leading-relaxed text-white/60">
              {service.description}
            </p>

            <div className="mt-9 flex justify-center">
              <WhatsAppButton
                size="lg"
                message={service.whatsappMessage}
                label={`Cotizar ${service.shortTitle}`}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-ink-950 pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Sobre este servicio
            </h2>
            <div className="mt-5 space-y-4 text-balance leading-relaxed text-white/65">
              {service.longDescription.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-ink-900 p-7">
              <h3 className="font-display text-lg font-bold">
                Lo que incluye
              </h3>
              <ul className="mt-5 space-y-3.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/75">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <WhatsAppButton
                  message={service.whatsappMessage}
                  label="Hablar con un asesor"
                  className="w-full"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {images.length > 0 && (
        <section className="border-t border-white/10 bg-ink-900 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">
                Galería
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Proyectos de {service.shortTitle.toLowerCase()}
              </h2>
            </FadeIn>
            <div className="mt-10">
              <Gallery images={images} alt={service.title} />
            </div>
          </div>
        </section>
      )}

      <section className="bg-ink-950 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Otros servicios
            </h2>
            <Link
              href="/#servicios"
              className="hidden items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300 sm:inline-flex"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {otherServices.map((other) => {
              const OtherIcon = SERVICE_ICON_MAP[other.icon];
              return (
                <Link
                  key={other.slug}
                  href={`/servicios/${other.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-ink-900 p-6 transition-all hover:-translate-y-1 hover:border-brand-500/40"
                >
                  <OtherIcon className="h-6 w-6 text-brand-400" strokeWidth={1.7} />
                  <span className="mt-4 font-display font-bold">
                    {other.shortTitle}
                  </span>
                  <span className="mt-1 text-sm text-white/50">
                    {other.tagline}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA backgroundImage={ctaBackground} />
    </>
  );
}
