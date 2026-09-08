"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";
import { SERVICES, VENTAS_SERVICE } from "@/lib/services";

const NAV_LINKS = [
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/proyectos", label: "Proyectos en Venta" },
  { href: "/#proceso", label: "Cómo Trabajamos" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Header() {
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
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-ink-950/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-ink-950/70 to-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/" className="text-white">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
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

        <div className="hidden lg:block">
          <WhatsAppButton
            message="Hola, quiero información sobre los servicios de Grupo Saly."
            label="Cotizar Ahora"
          />
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={clsx(
          "overflow-hidden border-t border-white/10 bg-ink-950/97 backdrop-blur-md transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex max-h-[75vh] flex-col gap-1 overflow-y-auto px-5 py-4">
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
