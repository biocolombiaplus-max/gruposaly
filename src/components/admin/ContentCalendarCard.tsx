import { CalendarDays, ExternalLink } from "lucide-react";
import CopyTextButton from "@/components/CopyTextButton";

const CALENDAR_URL = "https://claude.ai/artifact/QWB4eQBTi2Td6AbErR7Yop";

export default function ContentCalendarCard() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-brand-400" />
          <h3 className="font-display text-sm font-bold">
            Calendario de Contenido — Instagram (30 días)
          </h3>
        </div>
        <p className="mt-1 text-xs text-white/45">
          Un plan completo de 30 días para alimentar el feed: tips, mitos del
          sector, antes/después y presencia de Linda frente a cámara — con el
          guion y los pasos de grabación listos para cada Reel. Cada
          publicación se puede marcar como hecha y tiene botón para copiar el
          texto y los hashtags.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-white/45">
          Enlace para Linda
        </h4>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <code className="flex-1 overflow-x-auto rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-xs text-white/75">
            {CALENDAR_URL}
          </code>
          <CopyTextButton text={CALENDAR_URL} label="Copiar enlace" className="shrink-0" />
        </div>
        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02]"
        >
          <ExternalLink className="h-4 w-4" /> Abrir calendario
        </a>
        <p className="mt-3 text-xs text-white/40">
          Es un enlace privado — si Linda no lo puede abrir, entra a la
          página, usa el botón &quot;Share&quot; y dale acceso a su correo, o
          cámbialo a &quot;cualquiera con el enlace&quot;.
        </p>
      </div>
    </div>
  );
}
