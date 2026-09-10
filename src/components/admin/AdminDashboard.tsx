"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Images, LogOut, Building, LayoutTemplate } from "lucide-react";
import ServiceImagesManager from "./ServiceImagesManager";
import PropertiesManager from "./PropertiesManager";
import SiteImagesManager from "./SiteImagesManager";
import type { ServiceImagesMap } from "@/lib/serviceImages";
import type { Property } from "@/lib/propertyTypes";
import type { SiteImagesMap } from "@/lib/siteImageTypes";

type Tab = "servicios" | "inmuebles" | "sitio";

export default function AdminDashboard({
  initialServiceImages,
  initialProperties,
  initialSiteImages,
}: {
  initialServiceImages: ServiceImagesMap;
  initialProperties: Property[];
  initialSiteImages: SiteImagesMap;
}) {
  const [tab, setTab] = useState<Tab>("inmuebles");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const TABS: { id: Tab; label: string; icon: typeof Building }[] = [
    { id: "inmuebles", label: "Inmuebles en Venta", icon: Building },
    { id: "servicios", label: "Fotos de Servicios", icon: Images },
    { id: "sitio", label: "Logo e Imágenes del Sitio", icon: LayoutTemplate },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-black tracking-tight">
            Panel Administrativo
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Gestiona el logo, las imágenes del sitio, las fotos de cada
            servicio y publica inmuebles en venta.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/70 hover:border-red-400/40 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              "inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors " +
              (tab === t.id
                ? "border-brand-500 text-white"
                : "border-transparent text-white/45 hover:text-white/70")
            }
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "inmuebles" && (
          <PropertiesManager initialProperties={initialProperties} />
        )}
        {tab === "servicios" && (
          <ServiceImagesManager initialImages={initialServiceImages} />
        )}
        {tab === "sitio" && (
          <SiteImagesManager initialImages={initialSiteImages} />
        )}
      </div>
    </div>
  );
}
