import { ShoppingBag } from "lucide-react";
import CopyLinkButton from "@/components/CopyLinkButton";

const FEED_PATH = "/api/catalog/meta-feed.csv";

export default function MetaCatalogCard() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-brand-400" />
          <h3 className="font-display text-sm font-bold">
            Catálogo para Meta (Facebook, Instagram, WhatsApp)
          </h3>
        </div>
        <p className="mt-1 text-xs text-white/45">
          Esta es la URL de tu catálogo — incluye los inmuebles publicados en
          &quot;Inmuebles en Venta&quot; y los servicios a los que les hayas
          puesto un precio de referencia en la pestaña &quot;Logo, Imágenes y
          Anuncios&quot;. Se actualiza sola cada vez que publicas o editas
          algo — no tienes que volver a subir nada a Meta.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5">
        <p className="text-xs text-white/70">
          <span className="font-semibold text-amber-300">Importante:</span> un
          servicio solo aparece en el catálogo si tiene{" "}
          <span className="text-white/90">al menos una foto</span> (pestaña
          &quot;Fotos de Servicios&quot;) y un{" "}
          <span className="text-white/90">precio de referencia</span>{" "}
          (pestaña &quot;Logo, Imágenes y Anuncios&quot; → &quot;Precios de
          referencia para el catálogo de Meta&quot;). Un inmueble solo
          aparece si tiene al menos una foto.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-white/45">
          URL del catálogo
        </h4>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <code className="flex-1 overflow-x-auto rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-xs text-white/75">
            https://gruposaly.com{FEED_PATH}
          </code>
          <CopyLinkButton path={FEED_PATH} label="Copiar URL" className="shrink-0" />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-white/45">
          Cómo conectarla en Meta
        </h4>
        <ol className="mt-4 space-y-3 text-sm text-white/70">
          <li>
            <span className="font-semibold text-white/90">1.</span> En{" "}
            <span className="text-white/90">Meta Commerce Manager</span>, crea
            un catálogo nuevo (tipo &quot;Comercio electrónico&quot;) dentro de
            tu Business Manager.
          </li>
          <li>
            <span className="font-semibold text-white/90">2.</span> En{" "}
            <span className="text-white/90">Fuentes de datos → Agregar
            artículos → Usar un feed de datos</span>, pega la URL de arriba y
            programa la actualización automática (diaria).
          </li>
          <li>
            <span className="font-semibold text-white/90">3.</span>{" "}
            Conecta el catálogo a tu cuenta de WhatsApp Business desde
            Configuración del negocio → Cuentas de WhatsApp, para que los
            inmuebles aparezcan también dentro de WhatsApp.
          </li>
          <li>
            <span className="font-semibold text-white/90">4.</span> Usa ese
            mismo catálogo en Ads Manager para crear anuncios dinámicos /
            Advantage+ en Facebook, Instagram y WhatsApp.
          </li>
        </ol>
      </div>
    </div>
  );
}
