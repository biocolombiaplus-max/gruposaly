"use client";

import { useState, type FormEvent } from "react";
import { Megaphone, Plus, Share2, Trash2 } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/SocialIcons";
import {
  LOGO_ALIGN_LABELS,
  LOGO_SIZE_LABELS,
  SOCIAL_PLATFORMS,
  SOCIAL_PLATFORM_LABELS,
  SOCIAL_PLATFORM_PLACEHOLDERS,
  type LogoAlign,
  type LogoSize,
  type SiteSettings,
  type SocialLinks,
} from "@/lib/siteSettingsTypes";

const SIZES: LogoSize[] = ["md", "lg", "xl"];
const ALIGNS: LogoAlign[] = ["left", "center", "right"];

const SOCIAL_ICON_MAP = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
  twitter: XIcon,
} as const;

export default function SiteSettingsManager({
  initialSettings,
}: {
  initialSettings: SiteSettings;
}) {
  const [logoSize, setLogoSize] = useState(initialSettings.logoSize);
  const [logoAlign, setLogoAlign] = useState(initialSettings.logoAlign);
  const [logoShowWordmark, setLogoShowWordmark] = useState(
    initialSettings.logoShowWordmark
  );
  const [announcements, setAnnouncements] = useState(initialSettings.announcements);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(initialSettings.socialLinks);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(partial: Partial<SiteSettings>) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partial),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "No se pudo guardar.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setSaving(false);
    }
  }

  function handleSizeChange(size: LogoSize) {
    setLogoSize(size);
    save({ logoSize: size });
  }

  function handleAlignChange(align: LogoAlign) {
    setLogoAlign(align);
    save({ logoAlign: align });
  }

  function handleShowWordmarkChange(value: boolean) {
    setLogoShowWordmark(value);
    save({ logoShowWordmark: value });
  }

  function handleAddAnnouncement(e: FormEvent) {
    e.preventDefault();
    const text = newAnnouncement.trim();
    if (!text) return;
    const next = [...announcements, text];
    setAnnouncements(next);
    setNewAnnouncement("");
    save({ announcements: next });
  }

  function handleRemoveAnnouncement(index: number) {
    const next = announcements.filter((_, i) => i !== index);
    setAnnouncements(next);
    save({ announcements: next });
  }

  function handleSocialChange(platform: keyof SocialLinks, value: string) {
    setSocialLinks((prev) => ({ ...prev, [platform]: value }));
  }

  function handleSocialBlur() {
    save({ socialLinks });
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <h3 className="font-display text-sm font-bold">Logo</h3>
        <p className="mt-1 text-xs text-white/45">
          Ajusta el tamaño y la posición del logo en el menú y el pie de página.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
              Tamaño
            </label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeChange(size)}
                  className={
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors " +
                    (logoSize === size
                      ? "border-brand-500 bg-brand-500 text-ink-950"
                      : "border-white/15 text-white/70 hover:border-brand-400/50 hover:text-white")
                  }
                >
                  {LOGO_SIZE_LABELS[size]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
              Posición
            </label>
            <div className="flex flex-wrap gap-2">
              {ALIGNS.map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => handleAlignChange(align)}
                  className={
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors " +
                    (logoAlign === align
                      ? "border-brand-500 bg-brand-500 text-ink-950"
                      : "border-white/15 text-white/70 hover:border-brand-400/50 hover:text-white")
                  }
                >
                  {LOGO_ALIGN_LABELS[align]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-ink-900/40 p-4">
          <input
            type="checkbox"
            checked={logoShowWordmark}
            onChange={(e) => handleShowWordmarkChange(e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-brand-500"
          />
          <span>
            <span className="block text-sm font-semibold text-white">
              Mostrar &quot;Grupo Saly&quot; en texto blanco junto al logo
            </span>
            <span className="mt-1 block text-xs text-white/50">
              Actívalo si tu archivo de logo es solo el ícono/símbolo (sin
              texto). Si tu imagen ya trae el nombre escrito dentro de la
              foto, ese texto no se puede recolorear desde aquí — el color
              queda fijo en el archivo. Para un texto perfectamente blanco y
              nítido, sube una versión del logo que sea solo el símbolo, sin
              letras, y activa esta opción.
            </span>
          </span>
        </label>
      </div>

      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <div className="flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-brand-400" />
          <h3 className="font-display text-sm font-bold">
            Barra de anuncios (mensajes en movimiento)
          </h3>
        </div>
        <p className="mt-1 text-xs text-white/45">
          Aparecen en una franja arriba de todo el sitio, deslizándose de
          izquierda a derecha. Ideal para promociones o mensajes de
          confianza cortos.
        </p>

        <form onSubmit={handleAddAnnouncement} className="mt-4 flex gap-2">
          <input
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            placeholder="Ej: Visita técnica 100% gratis"
            maxLength={120}
            className="flex-1 rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            disabled={!newAnnouncement.trim() || announcements.length >= 12}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-ink-950 transition-transform hover:scale-105 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" /> Agregar
          </button>
        </form>

        {announcements.length === 0 ? (
          <p className="mt-4 text-sm text-white/40">
            No hay anuncios personalizados — se muestran los mensajes por
            defecto.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {announcements.map((text, i) => (
              <li
                key={`${text}-${i}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink-900/60 px-4 py-2.5"
              >
                <span className="text-sm text-white/80">{text}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAnnouncement(i)}
                  aria-label="Eliminar anuncio"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/40 hover:bg-red-500/15 hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4 text-brand-400" />
          <h3 className="font-display text-sm font-bold">Redes Sociales</h3>
        </div>
        <p className="mt-1 text-xs text-white/45">
          Pega el link de cada red social. Solo se muestran íconos en el pie
          de página de las redes que llenes — deja el campo vacío para
          ocultarlas.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SOCIAL_PLATFORMS.map((platform) => {
            const Icon = SOCIAL_ICON_MAP[platform];
            return (
              <label key={platform} className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/45">
                  <Icon className="h-3.5 w-3.5" />
                  {SOCIAL_PLATFORM_LABELS[platform]}
                </span>
                <input
                  type="url"
                  value={socialLinks[platform] ?? ""}
                  onChange={(e) => handleSocialChange(platform, e.target.value)}
                  onBlur={handleSocialBlur}
                  placeholder={SOCIAL_PLATFORM_PLACEHOLDERS[platform]}
                  className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
                />
              </label>
            );
          })}
        </div>
      </div>

      {saving && <p className="text-xs text-white/40">Guardando...</p>}
      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
