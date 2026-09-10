import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { SERVICES, VENTAS_SERVICE, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/services";

export default function Footer({ logoUrl }: { logoUrl?: string | null }) {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo src={logoUrl} textClassName="text-white" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Construcción, remodelación e inmobiliaria con estándares de las
              constructoras más grandes del mundo. Diseñamos, construimos y
              entregamos proyectos hospitalarios, residenciales, comerciales
              e industriales en toda Colombia.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-500 hover:text-brand-400"
              >
                <FacebookIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-500 hover:text-brand-400"
              >
                <InstagramIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="mailto:contacto@gruposaly.com"
                aria-label="Correo"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-500 hover:text-brand-400"
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
                  href={whatsappLink(
                    "Hola, quiero información sobre los servicios de Grupo Saly."
                  )}
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
    </footer>
  );
}
