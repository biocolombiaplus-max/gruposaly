"use client";

import { useState } from "react";
import { FileDown, FileText } from "lucide-react";
import { SERVICES, VENTAS_SERVICE } from "@/lib/services";
import { BROCHURE_SECTIONS, DEFAULT_BROCHURE_SECTIONS } from "@/lib/brochure/brochureTypes";

const ALL_SERVICE_OPTIONS = [
  ...SERVICES.map((s) => ({ slug: s.slug, label: s.shortTitle })),
  { slug: VENTAS_SERVICE.slug, label: VENTAS_SERVICE.shortTitle },
];

export default function BrochureGenerator() {
  const [services, setServices] = useState<string[]>(
    ALL_SERVICE_OPTIONS.map((s) => s.slug)
  );
  const [sections, setSections] = useState<string[]>(DEFAULT_BROCHURE_SECTIONS);

  function toggleService(slug: string) {
    setServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function toggleSection(id: string) {
    setSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  const href = `/api/admin/brochure?services=${encodeURIComponent(
    services.join(",")
  )}&sections=${encodeURIComponent(sections.join(","))}`;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-brand-400" />
          <h3 className="font-display text-sm font-bold">Brochure de Servicios (PDF)</h3>
        </div>
        <p className="mt-1 text-xs text-white/45">
          Genera un brochure profesional en PDF con el logo, los servicios y
          la información que elijas — listo para enviar por WhatsApp o
          correo a tus clientes.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-white/45">
          Servicios a incluir
        </h4>
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {ALL_SERVICE_OPTIONS.map((s) => (
            <label
              key={s.slug}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-white/10 bg-ink-900/40 px-4 py-2.5"
            >
              <input
                type="checkbox"
                checked={services.includes(s.slug)}
                onChange={() => toggleService(s.slug)}
                className="h-4.5 w-4.5 shrink-0 accent-brand-500"
              />
              <span className="text-sm text-white/80">{s.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-white/45">
          Secciones del brochure
        </h4>
        <div className="mt-4 space-y-2.5">
          {BROCHURE_SECTIONS.map((section) => (
            <label
              key={section.id}
              className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-white/10 bg-ink-900/40 px-4 py-3"
            >
              <input
                type="checkbox"
                checked={sections.includes(section.id)}
                onChange={() => toggleSection(section.id)}
                className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-brand-500"
              />
              <span>
                <span className="block text-sm font-semibold text-white">
                  {section.label}
                </span>
                <span className="mt-0.5 block text-xs text-white/45">
                  {section.hint}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <a
        href={href}
        className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02]"
      >
        <FileDown className="h-4.5 w-4.5" />
        Generar Brochure PDF
      </a>
    </div>
  );
}
