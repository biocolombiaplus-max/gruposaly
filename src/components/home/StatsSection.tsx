import Counter from "@/components/Counter";
import FadeIn from "@/components/FadeIn";

const STATS = [
  { value: 12, suffix: "+", label: "Años de experiencia" },
  { value: 120, suffix: "+", label: "Proyectos entregados" },
  { value: 45000, suffix: "+", label: "m² construidos" },
  { value: 98, suffix: "%", label: "Clientes satisfechos" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-white/10 bg-ink-950 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08} className="text-center">
              <p className="font-display text-4xl font-black text-brand-400 sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/50 sm:text-sm">
                {stat.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
