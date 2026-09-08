"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Images, LogOut, Building } from "lucide-react";
import ServiceImagesManager from "./ServiceImagesManager";
import PropertiesManager from "./PropertiesManager";
import type { ServiceImagesMap } from "@/lib/serviceImages";
import type { Property } from "@/lib/properties";

type Tab = "servicios" | "inmuebles";

export default function AdminDashboard({
  initialServiceImages,
  initialProperties,
}: {
  initialServiceImages: ServiceImagesMap;
  initialProperties: Property[];
}) {
  const [tab, setTab] = useState<Tab>("inmuebles");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-black tracking-tight">
            Panel Administrativo
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Gestiona las fotos de cada servicio y publica inmuebles en venta.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/70 hover:border-red-400/40 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </button>
      </div>

      <div className="mt-8 flex gap-2 border-b border-white/10">
        <button
          onClick={() => setTab("inmuebles")}
          className={
            "inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors " +
            (tab === "inmuebles"
              ? "border-brand-500 text-white"
              : "border-transparent text-white/45 hover:text-white/70")
          }
        >
          <Building className="h-4 w-4" /> Inmuebles en Venta
        </button>
        <button
          onClick={() => setTab("servicios")}
          className={
            "inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors " +
            (tab === "servicios"
              ? "border-brand-500 text-white"
              : "border-transparent text-white/45 hover:text-white/70")
          }
        >
          <Images className="h-4 w-4" /> Fotos de Servicios
        </button>
      </div>

      <div className="mt-8">
        {tab === "inmuebles" ? (
          <PropertiesManager initialProperties={initialProperties} />
        ) : (
          <ServiceImagesManager initialImages={initialServiceImages} />
        )}
      </div>
    </div>
  );
}
