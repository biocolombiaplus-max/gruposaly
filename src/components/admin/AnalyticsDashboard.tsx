"use client";

import { useEffect, useState } from "react";
import { BarChart3, Eye, MessageCircle, RefreshCw } from "lucide-react";
import type { AnalyticsSummary } from "@/lib/analytics";

const RANGE_OPTIONS = [
  { days: 7, label: "7 días" },
  { days: 30, label: "30 días" },
  { days: 90, label: "90 días" },
];

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
      <div className="flex items-center gap-2 text-white/45">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-widest">{label}</span>
      </div>
      <p className="mt-2 font-display text-3xl font-black text-white">{value}</p>
    </div>
  );
}

function RankedList({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; count: number }[];
}) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-white/45">
        {title}
      </h4>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-white/40">Sin datos todavía.</p>
      ) : (
        <div className="mt-4 space-y-2.5">
          {rows.map((row) => (
            <div key={row.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">{row.label}</span>
                <span className="font-semibold text-white/90">{row.count}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-brand-500"
                  style={{ width: `${(row.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [days, setDays] = useState(30);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve()
      .then(() => {
        if (cancelled) return;
        setLoading(true);
        setError(null);
        return fetch(`/api/admin/analytics?days=${days}`).then((res) => res.json());
      })
      .then((data) => {
        if (cancelled || !data) return;
        if (data.error) throw new Error(data.error);
        setSummary(data.summary);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Error inesperado.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [days]);

  const conversion =
    summary && summary.totalPageViews > 0
      ? `${((summary.totalWhatsAppClicks / summary.totalPageViews) * 100).toFixed(1)}%`
      : "—";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-5">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-brand-400" />
          <h3 className="font-display text-sm font-bold">Rendimiento del sitio</h3>
        </div>
        <p className="mt-1 text-xs text-white/45">
          Visitas y clics en los botones de WhatsApp, incluyendo de qué
          campaña de Meta Ads vinieron (columna &quot;utm_campaign&quot; del
          anuncio). Esto es tu propio reporte — para hacer remarketing en
          Facebook/Instagram a quienes dieron clic, usa el{" "}
          <span className="text-white/80">Píxel de Meta</span> (Events
          Manager → Públicos personalizados), que ya queda marcando cada clic
          automáticamente.
        </p>
        <div className="mt-4 flex gap-2">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.days}
              type="button"
              onClick={() => setDays(opt.days)}
              className={
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors " +
                (days === opt.days
                  ? "border-brand-500 bg-brand-500 text-ink-950"
                  : "border-white/15 text-white/70 hover:border-brand-400/50 hover:text-white")
              }
            >
              {opt.label}
            </button>
          ))}
          {loading && <RefreshCw className="my-auto h-3.5 w-3.5 animate-spin text-white/40" />}
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>
      )}

      {summary && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatTile icon={Eye} label="Visitas" value={String(summary.totalPageViews)} />
            <StatTile
              icon={MessageCircle}
              label="Clics a WhatsApp"
              value={String(summary.totalWhatsAppClicks)}
            />
            <StatTile icon={BarChart3} label="Tasa de clic" value={conversion} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <RankedList
              title="Clics por botón / servicio"
              rows={summary.byLabel.map((r) => ({ label: r.label, count: r.count }))}
            />
            <RankedList
              title="Visitas + clics por campaña (utm_campaign)"
              rows={summary.byCampaign.map((r) => ({
                label: r.campaign,
                count: r.pageViews + r.whatsAppClicks,
              }))}
            />
          </div>

          <RankedList
            title="Visitas + clics por página"
            rows={summary.byPath.map((r) => ({
              label: r.path,
              count: r.pageViews + r.whatsAppClicks,
            }))}
          />
        </>
      )}
    </div>
  );
}
