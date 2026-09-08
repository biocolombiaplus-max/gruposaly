"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pt-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,125,22,0.16),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(251,125,22,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.15]" />
        <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-brand-600/25 blur-[110px] animate-float" />
        <div
          className="absolute -right-24 bottom-10 h-[26rem] w-[26rem] rounded-full bg-brand-500/15 blur-[130px] animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Construcción &amp; Inmobiliaria en Colombia
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-balance font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Construimos y remodelamos
            <span className="block bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
              espacios que impulsan tu proyecto
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/65 sm:text-lg"
          >
            Grupo Saly desarrolla infraestructura hospitalaria, casas, edificios,
            locales comerciales y bodegas desde cero, además de remodelaciones
            integrales y proyectos de vivienda listos para invertir — con el
            estándar de calidad de las grandes constructoras.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <WhatsAppButton
              size="lg"
              message="Hola, quiero cotizar un proyecto con Grupo Saly."
              label="Cotizar mi Proyecto"
            />
            <Link
              href="/proyectos"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/90 transition-all hover:border-brand-400/60 hover:bg-white/5"
            >
              Ver Proyectos en Venta
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex items-center gap-2 text-xs text-white/45"
          >
            <ShieldCheck className="h-4 w-4 text-brand-400" />
            Obras entregadas con garantía y cumplimiento normativo NSR-10
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto hidden aspect-[4/5] w-full max-w-md lg:block"
        >
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 shadow-2xl shadow-black/50" />
          <div className="absolute inset-6 overflow-hidden rounded-[2rem] bg-[conic-gradient(from_140deg,rgba(251,125,22,0.35),rgba(11,13,18,0.9),rgba(251,125,22,0.25))]" />
          <div className="absolute inset-6 flex flex-col justify-end rounded-[2rem] bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent p-7">
            <p className="text-xs uppercase tracking-widest text-brand-300">
              Grupo Saly
            </p>
            <p className="mt-2 font-display text-2xl font-bold">
              Ingeniería, diseño y ejecución en un solo equipo
            </p>
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-ink-900/95 px-5 py-4 shadow-xl backdrop-blur">
            <p className="font-display text-2xl font-black text-brand-400">+120</p>
            <p className="text-xs text-white/55">Proyectos entregados</p>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
    </section>
  );
}
