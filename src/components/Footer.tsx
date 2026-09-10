import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "./SocialIcons";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  SERVICES,
  VENTAS_SERVICE,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from "@/lib/services";
import type { LogoSize, SocialLinks } from "@/lib/siteSettingsTypes";

interface FooterProps {
  logoUrl?: string | null;
  logoSize?: LogoSize;
  logoShowWordmark?: boolean;
  socialLinks?: SocialLinks;
}

const SOCIAL_ICON_MAP = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
  twitter: XIcon,
} as const;

const SOCIAL_LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  twitter: "X (Twitter)",
} as const;

export default function Footer({
  logoUrl,
  logoSize,
  logoShowWordmark,
  socialLinks = {},
}: FooterProps) {
  const year = new Date().getFullYear();
  const activeSocials = (Object.keys(SOCIAL_ICON_MAP) as (keyof typeof SOCIAL_ICON_MAP)[])
    .filter((platform) => socialLinks[platform]);

  return (
    <footer id="contacto" className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo
              src={logoUrl}
              size={logoSize}
              showText={logoShowWordmark}
              textClassName="text-white"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Construcción, remodelación e inmobiliaria con estándares de las
              constructoras más grandes del mundo. Diseñamos, construimos y
              entregamos proyectos hospitalarios, residenciales, comerciales
              e industriales en toda Colombia.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {activeSocials.map((platform) => {
                const Icon = SOCIAL_ICON_MAP[platform];
                return (
                  <a
                    key={platform}
                    href={socialLinks[platform]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_LABELS[platform]}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-400 hover:shadow-lg hover:shadow-brand-900/30"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
              <a
                href="mailto:contacto@gruposaly.com"
                aria-label="Correo"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-400 hover:shadow-lg hover:shadow-brand-900/30"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="transition-colors hover:text-brand-400"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">
              Empresa
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>
                <Link href="/#nosotros" className="transition-colors hover:text-brand-400">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="transition-colors hover:text-brand-400">
                  {VENTAS_SERVICE.shortTitle}
                </Link>
              </li>
              <li>
                <Link href="/#proceso" className="transition-colors hover:text-brand-400">
                  Cómo trabajamos
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="transition-colors hover:text-white/40">
                  Acceso administrativo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-white/65">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-400" />
                <a
                  href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-400"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-400" />
                <a
                  href="mailto:contacto@gruposaly.com"
                  className="transition-colors hover:text-brand-400"
                >
                  contacto@gruposaly.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-400" />
                <span>Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {year} Grupo Saly. Todos los derechos reservados.</p>
          <p>Construcción · Remodelación · Inmobiliaria</p>
        </div>
      </div>
      {/* Reserves space so the fixed WhatsApp button never sits on top of
          this content when the page is scrolled all the way down. */}
      <div className="h-14 sm:h-4" aria-hidden="true" />
    </footer>
  );
}
