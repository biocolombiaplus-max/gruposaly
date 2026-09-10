"use client";

import { useState, type FormEvent } from "react";
import { Trash2, X } from "lucide-react";
import ImageUploader from "./ImageUploader";
import MediaFrame from "@/components/MediaFrame";
import {
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
  type Property,
  type PropertyStatus,
  type PropertyType,
} from "@/lib/propertyTypes";
import { COLOMBIA_DEPARTMENTS, OTHER_CITY_OPTION } from "@/lib/colombiaLocations";

function parseLocation(location: string) {
  const parts = location.split(",");
  if (parts.length < 2) return { departamento: "", ciudad: "", ciudadManual: location };

  const cityPart = parts[0].trim();
  const deptPart = parts.slice(1).join(",").trim();
  const dept = COLOMBIA_DEPARTMENTS.find(
    (d) => d.name.toLowerCase() === deptPart.toLowerCase()
  );
  if (!dept) return { departamento: "", ciudad: "", ciudadManual: location };

  const city = dept.cities.find((c) => c.toLowerCase() === cityPart.toLowerCase());
  return city
    ? { departamento: dept.name, ciudad: city, ciudadManual: "" }
    : { departamento: dept.name, ciudad: OTHER_CITY_OPTION, ciudadManual: cityPart };
}

interface PropertyFormProps {
  initial?: Property;
  onSaved: (property: Property) => void;
  onCancel: () => void;
}

const TYPES: PropertyType[] = ["casa", "edificio", "local", "bodega"];
const STATUSES: PropertyStatus[] = ["disponible", "reservado", "vendido"];

export default function PropertyForm({ initial, onSaved, onCancel }: PropertyFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [type, setType] = useState<PropertyType>(initial?.type ?? "casa");
  const [status, setStatus] = useState<PropertyStatus>(initial?.status ?? "disponible");
  const initialLocation = parseLocation(initial?.location ?? "");
  const [departamento, setDepartamento] = useState(initialLocation.departamento);
  const [ciudad, setCiudad] = useState(initialLocation.ciudad);
  const [ciudadManual, setCiudadManual] = useState(initialLocation.ciudadManual);
  const [price, setPrice] = useState(initial?.price?.toString() ?? "");
  const [priceLabel, setPriceLabel] = useState(initial?.priceLabel ?? "");
  const [areaM2, setAreaM2] = useState(initial?.areaM2?.toString() ?? "");
  const [bedrooms, setBedrooms] = useState(initial?.bedrooms?.toString() ?? "");
  const [bathrooms, setBathrooms] = useState(initial?.bathrooms?.toString() ?? "");
  const [parking, setParking] = useState(initial?.parking?.toString() ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [featuresText, setFeaturesText] = useState(
    (initial?.features ?? []).join("\n")
  );
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(initial);
  const showResidentialFields = type === "casa" || type === "edificio";
  const citiesForDept =
    COLOMBIA_DEPARTMENTS.find((d) => d.name === departamento)?.cities ?? [];
  const resolvedCity = ciudad === OTHER_CITY_OPTION ? ciudadManual.trim() : ciudad;
  const location = departamento && resolvedCity ? `${resolvedCity}, ${departamento}` : "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!location) {
      setError("Selecciona el departamento y la ciudad del inmueble.");
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      title,
      type,
      status,
      location,
      price: Number(price),
      priceLabel: priceLabel || undefined,
      areaM2: areaM2 === "" ? "" : Number(areaM2),
      bedrooms: bedrooms === "" ? "" : Number(bedrooms),
      bathrooms: bathrooms === "" ? "" : Number(bathrooms),
      parking: parking === "" ? "" : Number(parking),
      description,
      features: featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      images,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/properties/${initial!.id}` : "/api/properties",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          data?.error || `No se pudo guardar el inmueble (código ${res.status}).`
        );
      }
      if (!data?.property) {
        throw new Error("El servidor no devolvió el inmueble guardado.");
      }
      onSaved(data.property as Property);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">
          {isEdit ? "Editar inmueble" : "Nuevo inmueble"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 hover:text-white"
        >
          <X className="h-4.5 w-4.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Título *
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Casa campestre en Rionegro"
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Tipo *
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType)}
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {PROPERTY_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Estado
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as PropertyStatus)}
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {PROPERTY_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Departamento *
          </label>
          <select
            required
            value={departamento}
            onChange={(e) => {
              setDepartamento(e.target.value);
              setCiudad("");
              setCiudadManual("");
            }}
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          >
            <option value="">Selecciona...</option>
            {COLOMBIA_DEPARTMENTS.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Ciudad / Municipio *
          </label>
          <select
            required
            disabled={!departamento}
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500 disabled:opacity-50"
          >
            <option value="">
              {departamento ? "Selecciona..." : "Primero elige el departamento"}
            </option>
            {citiesForDept.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value={OTHER_CITY_OPTION}>{OTHER_CITY_OPTION}</option>
          </select>
          {ciudad === OTHER_CITY_OPTION && (
            <input
              required
              value={ciudadManual}
              onChange={(e) => setCiudadManual(e.target.value)}
              placeholder="Escribe el nombre del municipio"
              className="mt-2 w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Precio (COP) *
          </label>
          <input
            required
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="450000000"
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Texto de precio (opcional)
          </label>
          <input
            value={priceLabel}
            onChange={(e) => setPriceLabel(e.target.value)}
            placeholder="Desde $450.000.000"
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Área (m²)
          </label>
          <input
            type="number"
            min={0}
            value={areaM2}
            onChange={(e) => setAreaM2(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Parqueaderos
          </label>
          <input
            type="number"
            min={0}
            value={parking}
            onChange={(e) => setParking(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>

        {showResidentialFields && (
          <>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
                Habitaciones
              </label>
              <input
                type="number"
                min={0}
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
                Baños
              </label>
              <input
                type="number"
                min={0}
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Detalles generales del inmueble..."
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Características (una por línea)
          </label>
          <textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            rows={4}
            placeholder={"Piscina\nCocina integral\nZona social cubierta"}
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/45">
          Fotos del inmueble
        </label>
        <ImageUploader
          folder="properties"
          onUploaded={(url) => setImages((prev) => [...prev, url])}
        />
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.map((url) => (
              <div key={url} className="group relative">
                <MediaFrame src={url} alt={title} aspect="aspect-square" />
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((i) => i !== url))}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/90 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-500 px-7 py-3 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Publicar inmueble"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/70 hover:text-white"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
