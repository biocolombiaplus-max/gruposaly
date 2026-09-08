"use client";

import { useRef, useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import type { UploadFolder } from "@/lib/upload";

interface ImageUploaderProps {
  folder: UploadFolder;
  onUploaded: (url: string) => void;
  label?: string;
  hint?: string;
}

export default function ImageUploader({
  folder,
  onUploaded,
  label = "Subir fotos",
  hint = "Cualquier tamaño o proporción: se ajustan automáticamente al formato de la página.",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    const list = Array.from(files);
    setProgress({ done: 0, total: list.length });

    for (let i = 0; i < list.length; i++) {
      const formData = new FormData();
      formData.append("file", list[i]);
      formData.append("folder", folder);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al subir la imagen.");
        onUploaded(data.url as string);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al subir la imagen.");
      }
      setProgress({ done: i + 1, total: list.length });
    }

    setUploading(false);
    setProgress(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/15 px-6 py-8 text-center transition-colors hover:border-brand-500/50 hover:bg-brand-500/5 disabled:opacity-60"
      >
        {uploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
        ) : (
          <UploadCloud className="h-6 w-6 text-brand-400" />
        )}
        <span className="text-sm font-semibold text-white/85">
          {uploading && progress
            ? `Subiendo ${progress.done}/${progress.total}...`
            : label}
        </span>
        <span className="max-w-xs text-xs text-white/45">{hint}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
