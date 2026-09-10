"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Home, Menu, X } from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";
import { SERVICES, VENTAS_SERVICE } from "@/lib/services";
import type { LogoAlign, LogoSize } from "@/lib/siteSettingsTypes";

const NAV_LINKS = [
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/proyectos", label: "Proyectos en Venta" },
  { href: "/#proceso", label: "Cómo Trabajamos" },
  { href: "/#contacto", label: "Contacto" },
];

interface HeaderProps {
  logoUrl?: string | null;
  logoSize?: LogoSize;
  logoAlign?: LogoAlign;
}

export default function Header({ logoUrl, logoSize, logoAlign = "left" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-9 z-40 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-ink-950/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-ink-950/70 to-transparent"
      )}
    >
      <div className="relative mx-auto flex max-w-7xl items-center px-5 py-3.5 sm:px-8">
        {logoAlign === "center" ? (
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          >
            <Logo src={logoUrl} size={logoSize} />
          </Link>
        ) : (
          <Link
            href="/"
            className={clsx("text-white", logoAlign === "right" && "order-2")}
          >
            <Logo src={logoUrl} size={logoSize} />
          </Link>
        )}

        <div
          className={clsx(
            "flex flex-1 items-center gap-1",
            logoAlign === "right" ? "order-1 mr-auto justify-start" : "ml-auto justify-end"
          )}
        >
        <nav
          className={clsx(
            "items-center gap-1",
            logoAlign === "center" ? "hidden" : "hidden lg:flex"
          )}
        >
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              aria-expanded={servicesOpen}
            >
              Servicios
              <ChevronDown
                className={clsx(
                  "h-4 w-4 transition-transform",
                  servicesOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={clsx(
                "absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-200",
                servicesOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-ink-900/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className="rounded-xl px-4 py-3 text-sm text-white/80 transition-colors hover:bg-brand-600/15 hover:text-brand-300"
                  >
                    {service.shortTitle}
                  </Link>
                ))}
                <Link
                  href="/proyectos"
                  className="col-span-2 mt-1 flex items-center justify-between rounded-xl bg-brand-600/15 px-4 py-3 text-sm font-semibold text-brand-300 transition-colors hover:bg-brand-600/25"
                >
                  {VENTAS_SERVICE.shortTitle}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={clsx(logoAlign === "center" ? "hidden" : "hidden lg:block")}>
          <WhatsAppButton
            message="Hola, quiero información sobre los servicios de Grupo Saly."
            label="Cotizar Ahora"
          />
        </div>

        <button
          className={clsx(
            "relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-ink-950 shadow-lg shadow-brand-900/50 transition-transform active:scale-90",
            logoAlign !== "center" && "lg:hidden"
          )}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          {!mobileOpen && (
            <span className="absolute inset-0 rounded-full bg-brand-400/50 blur-md animate-soft-glow" />
          )}
          <span className="relative">
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={2.4} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2.4} />
            )}
          </span>
        </button>
        </div>
      </div>

      <div
        className={clsx(
          "overflow-hidden border-t border-white/10 bg-ink-950/97 backdrop-blur-md transition-all duration-300",
          logoAlign !== "center" && "lg:hidden",
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex max-h-[75vh] flex-col gap-1 overflow-y-auto px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
          >
            <Home className="h-4 w-4 text-brand-400" />
            Volver al Inicio
          </Link>
          <div className="my-2 h-px bg-white/10" />
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-white/40">
            Servicios
          </p>
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/servicios/${service.slug}`}
              className="rounded-lg px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
            >
              {service.shortTitle}
            </Link>
          ))}
          <Link
            href="/proyectos"
            className="rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-300 hover:bg-white/5"
          >
            {VENTAS_SERVICE.shortTitle}
          </Link>
          <div className="my-2 h-px bg-white/10" />
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3">
            <WhatsAppButton
              message="Hola, quiero información sobre los servicios de Grupo Saly."
              label="Cotizar Ahora"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
