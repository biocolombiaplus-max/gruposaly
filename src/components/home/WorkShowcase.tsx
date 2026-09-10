import MediaFrame from "@/components/MediaFrame";
import FadeIn from "@/components/FadeIn";

interface WorkShowcaseProps {
  images: string[];
}

export default function WorkShowcase({ images }: WorkShowcaseProps) {
  if (images.length < 4) return null;

  const track = [...images, ...images];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-ink-950 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">
            Nuestro Trabajo
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-black tracking-tight sm:text-4xl">
            Proyectos que hablan por sí solos
          </h2>
        </FadeIn>
      </div>

      <div className="group relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="w-56 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:w-72"
            >
              <MediaFrame src={src} alt="Proyecto de Grupo Saly" aspect="aspect-[4/3]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
