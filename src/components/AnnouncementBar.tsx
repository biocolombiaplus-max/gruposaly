import { Sparkles } from "lucide-react";

interface AnnouncementBarProps {
  messages: string[];
}

export default function AnnouncementBar({ messages }: AnnouncementBarProps) {
  if (messages.length === 0) return null;

  const track = [...messages, ...messages];

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-9 overflow-hidden bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700">
      <div className="absolute inset-0 bg-noise opacity-[0.08]" />
      <div className="flex h-full w-max items-center gap-10 animate-marquee">
        {track.map((message, i) => (
          <span
            key={`${message}-${i}`}
            className="flex shrink-0 items-center gap-2 text-xs font-semibold tracking-wide text-white/95"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-white/80" strokeWidth={2} />
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
