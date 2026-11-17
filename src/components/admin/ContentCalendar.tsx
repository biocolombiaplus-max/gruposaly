"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import CopyTextButton from "@/components/CopyTextButton";
import {
  CONTENT_CALENDAR,
  PILLARS,
  FORMAT_LABELS,
  type CalendarDay,
  type ContentFormat,
} from "@/lib/contentCalendarTypes";

const STORAGE_KEY = "gs-content-calendar-done";
const POST_DAYS = CONTENT_CALENDAR.filter((d) => d.format !== "descanso").length;

type FilterId = "all" | ContentFormat | "pendiente";
const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "reel", label: "Reels" },
  { id: "carrusel", label: "Carruseles" },
  { id: "foto", label: "Fotos" },
  { id: "pendiente", label: "Pendientes" },
];

function tagline(tags: string[]) {
  return tags.map((t) => `#${t}`).join(" ");
}

function loadDone(): Record<number, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function ScriptPanel({ script }: { script: NonNullable<CalendarDay["script"]> }) {
  const rows: { k: string; v: React.ReactNode }[] = [
    { k: "Gancho", v: script.hook },
    {
      k: "Cuerpo",
      v: (
        <ul className="list-disc space-y-1 pl-4">
          {script.body.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ),
    },
    { k: "Cierre", v: script.cta },
    { k: "Dónde grabar", v: script.location },
    {
      k: "Tomas",
      v: (
        <ul className="list-disc space-y-1 pl-4">
          {script.shots.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ),
    },
    { k: "Duración", v: script.duration },
    {
      k: "Texto en pantalla",
      v: (
        <ul className="list-disc space-y-1 pl-4">
          {script.overlay.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ),
    },
    { k: "Audio", v: script.audio },
    { k: "Edición", v: script.editing },
  ];

  return (
    <div>
      <span className="mb-2.5 inline-flex items-center rounded-lg bg-brand-500/15 px-2.5 py-1.5 text-xs font-bold text-brand-400">
        Guion y grabación
      </span>
      <div className="space-y-3 rounded-xl border border-white/10 bg-ink-950/60 p-4">
        {rows.map((row) => (
          <div key={row.k} className="flex gap-3">
            <div className="w-24 shrink-0 pt-px text-[11px] font-bold uppercase tracking-wide text-brand-400">
              {row.k}
            </div>
            <div className="min-w-0 text-sm text-white/85">{row.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DayCard({
  d,
  done,
  onToggleDone,
}: {
  d: CalendarDay;
  done: boolean;
  onToggleDone: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isRest = d.format === "descanso";
  const pillar = PILLARS[d.pillar];

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-2xl border transition-colors",
        done ? "border-emerald-700/50" : "border-white/10",
        isRest ? "bg-ink-900/40" : "bg-ink-900/70"
      )}
    >
      <div
        className="flex cursor-pointer items-start gap-3 px-4 py-3.5"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="w-8 shrink-0 pt-0.5 font-display text-xs font-bold text-white/40">
          D{d.day}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span
              className={clsx(
                "rounded-md px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide",
                d.format === "reel"
                  ? "bg-brand-500/15 text-brand-400"
                  : "bg-white/5 text-white/60"
              )}
            >
              {FORMAT_LABELS[d.format]}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-white/50">
              <span className={clsx("h-2 w-2 shrink-0 rounded-full", pillar.dot)} />
              {pillar.label}
            </span>
          </div>
          <div
            className={clsx(
              "text-sm font-semibold",
              isRest ? "text-white/60" : "text-white"
            )}
          >
            {d.title}
          </div>
        </div>
        {!isRest && (
          <button
            type="button"
            role="checkbox"
            aria-checked={done}
            aria-label="Marcar como publicado"
            onClick={(e) => {
              e.stopPropagation();
              onToggleDone();
            }}
            className={clsx(
              "mt-0.5 flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg border transition-colors",
              done
                ? "border-emerald-600 bg-emerald-900/40"
                : "border-white/15 bg-ink-950"
            )}
          >
            {done && (
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        )}
        <ChevronDown
          className={clsx(
            "mt-1 h-4 w-4 shrink-0 text-white/40 transition-transform",
            open && "rotate-180"
          )}
        />
      </div>

      {open && (
        <div className="space-y-4 border-t border-white/10 px-4 pb-5 pl-[2.75rem] pt-4">
          {isRest ? (
            <p className="text-sm text-white/60">{d.production}</p>
          ) : (
            <>
              <div>
                <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-white/40">
                  {d.weekday} · Semana {d.week}
                </h4>
              </div>
              <div>
                <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-white/40">
                  Texto para la publicación
                </h4>
                <p className="whitespace-pre-line text-sm text-white">{d.caption}</p>
                <CopyTextButton
                  text={d.hashtags.length ? `${d.caption}\n\n${tagline(d.hashtags)}` : d.caption}
                  label="Copiar texto + hashtags"
                  className="mt-2.5"
                />
              </div>
              {d.hashtags.length > 0 && (
                <div>
                  <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-white/40">
                    Hashtags
                  </h4>
                  <p className="break-words text-sm text-sky-400">{tagline(d.hashtags)}</p>
                </div>
              )}
              {d.production && (
                <div>
                  <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-white/40">
                    Producción
                  </h4>
                  <p className="text-sm text-white/60">{d.production}</p>
                </div>
              )}
              {d.script && <ScriptPanel script={d.script} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function ContentCalendar() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [done, setDone] = useState<Record<number, boolean>>(() =>
    typeof window === "undefined" ? {} : loadDone()
  );

  function toggleDone(day: number) {
    setDone((prev) => {
      const next = { ...prev, [day]: !prev[day] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }

  const doneCount = useMemo(
    () =>
      CONTENT_CALENDAR.filter((d) => d.format !== "descanso" && done[d.day]).length,
    [done]
  );

  const byWeek = useMemo(() => {
    const map = new Map<number, CalendarDay[]>();
    CONTENT_CALENDAR.forEach((d) => {
      const visible =
        filter === "all" ||
        (filter === "pendiente" ? d.format !== "descanso" && !done[d.day] : d.format === filter);
      if (!visible) return;
      const list = map.get(d.week) ?? [];
      list.push(d);
      map.set(d.week, list);
    });
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [filter, done]);

  const usedPillars = useMemo(() => {
    const set = new Set<keyof typeof PILLARS>();
    CONTENT_CALENDAR.forEach((d) => set.add(d.pillar));
    return [...set];
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <h3 className="font-display text-base font-bold">
          Calendario de contenido — Instagram (30 días)
        </h3>
        <p className="mt-2 text-sm text-white/55">
          Pensado para que el feed se vea de constructora grande y confiable,
          sin que cada publicación sea un anuncio. Mezcla tips de valor,
          procesos reales de obra, antes/después, mitos del sector y
          presencia de Linda frente a cámara — con guion y pasos de
          grabación listos para los días de Reel.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {usedPillars.map((key) => {
            const p = PILLARS[key];
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-900/60 px-3 py-1.5 text-xs text-white/60"
              >
                <span className={clsx("h-2 w-2 rounded-full", p.dot)} />
                {p.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <div className="shrink-0 font-display text-2xl font-bold tabular-nums">
          {doneCount}/{POST_DAYS}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 text-xs text-white/40">publicaciones marcadas como hechas</div>
          <div className="h-2 overflow-hidden rounded-full bg-ink-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400 transition-[width]"
              style={{ width: `${POST_DAYS ? (doneCount / POST_DAYS) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={clsx(
              "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
              filter === f.id
                ? "border-brand-500 bg-brand-500 text-ink-950"
                : "border-white/15 text-white/70 hover:border-brand-400/50 hover:text-white"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {byWeek.map(([week, days]) => (
          <div key={week}>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/35">
              Semana {week}
            </h4>
            <div className="space-y-2.5">
              {days.map((d) => (
                <DayCard key={d.day} d={d} done={!!done[d.day]} onToggleDone={() => toggleDone(d.day)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-6">
        <h3 className="font-display text-base font-bold">Guía rápida de grabación</h3>
        <p className="mt-1 text-sm text-white/55">
          Aplica esto en cada Reel grabado por Linda — toma 2 minutos y se
          nota en el resultado.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { h: "Formato", p: "Vertical (9:16), celular quieto. Apóyalo contra algo o pide que alguien lo sostenga — nada de cámara temblando." },
            { h: "Luz", p: "Luz natural de frente, nunca a contraluz de una ventana. Si es en obra, graba en horas con buena luz (8–11 a.m. o 3–5 p.m.)." },
            { h: "Audio", p: "Graba en un lugar sin eco ni viento fuerte. Si hay ruido de obra, baja la voz al editar y sube subtítulos." },
            { h: "Duración", p: "Entre 20 y 45 segundos. Mejor corto y claro que largo — el primer segundo decide si siguen viendo." },
            { h: "Edición", p: "Usa CapCut o InShot (gratis): corta silencios, agrega subtítulos automáticos y cierra con el logo 1 segundo." },
            { h: "Antes de publicar", p: "Revisa que el mensaje principal se entienda sin sonido y que el CTA de WhatsApp quede claro." },
          ].map((item) => (
            <div key={item.h}>
              <h5 className="mb-1 text-sm font-semibold text-white">{item.h}</h5>
              <p className="text-sm text-white/55">{item.p}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-white/30">
        Marca cada publicación cuando la subas — tu avance se guarda en este navegador.
      </p>
    </div>
  );
}
