"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle, Megaphone } from "lucide-react";
import MediaFrame from "@/components/MediaFrame";
import { SERVICES, whatsappLink } from "@/lib/services";
import type { ServiceImagesMap } from "@/lib/serviceImages";

function adCopyFor(tagline: string) {
  return `${tagline}. Cotiza tu proyecto gratis — te respondemos por WhatsApp.`;
}

function CopyTextButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt("Copia el texto:", text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:border-brand-400/50 hover:bg-white/5"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-400" /> Copiado
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> Copiar texto
        </>
      )}
    </button>
  );
}

export default function ServiceAdsKit({
  serviceImages,
}: {
  serviceImages: ServiceImagesMap;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <div className="flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-brand-400" />
          <h3 className="font-display text-sm font-bold">
            Kit de anuncios por servicio (Clic a WhatsApp)
          </h3>
        </div>
        <p className="mt-1 text-xs text-white/45">
          Para servicios sin precio fijo, en vez de forzarlos dentro del
          catálogo lo profesional es un anuncio de{" "}
          <span className="text-white/80">Clic a WhatsApp</span> con carrusel
          de fotos — no necesita precio y puedes mostrar &quot;Cotiza tu
          proyecto gratis&quot;. Aquí tienes la foto, el título y el texto
          listos para copiar en Ads Manager, por cada servicio.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-white/45">
          Cómo armar el anuncio en Ads Manager
        </h4>
        <ol className="mt-4 space-y-3 text-sm text-white/70">
          <li>
            <span className="font-semibold text-white/90">1.</span> Ads
            Manager → Crear → Objetivo{" "}
            <span className="text-white/90">&quot;Interacción&quot; → &quot;Mensajes&quot;</span>
            , destino <span className="text-white/90">WhatsApp</span>.
          </li>
          <li>
            <span className="font-semibold text-white/90">2.</span> Formato de
            anuncio: <span className="text-white/90">Carrusel</span> — una
            tarjeta por servicio.
          </li>
          <li>
            <span className="font-semibold text-white/90">3.</span> En cada
            tarjeta: descarga la foto de abajo, pega el título y el texto, y
            usa el botón &quot;Enviar mensaje&quot;.
          </li>
          <li>
            <span className="font-semibold text-white/90">4.</span> Publica —
            cada clic abre WhatsApp directo con el mensaje de ese servicio.
          </li>
        </ol>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SERVICES.map((service) => {
          const cover = serviceImages[service.slug]?.[0];
          const copy = adCopyFor(service.tagline);
          return (
            <div
              key={service.slug}
              className="self-start overflow-hidden rounded-2xl border border-white/10 bg-ink-950/50"
            >
              <MediaFrame
                src={cover}
                alt={service.shortTitle}
                aspect="aspect-[16/10]"
              />
              <div className="space-y-3 p-4">
                <h4 className="font-display text-sm font-bold text-white">
                  {service.shortTitle}
                </h4>
                <p className="text-xs leading-relaxed text-white/60">{copy}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <CopyTextButton text={copy} />
                  <a
                    href={whatsappLink(service.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-bold text-ink-950 transition-transform hover:scale-105"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Ver WhatsApp
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
