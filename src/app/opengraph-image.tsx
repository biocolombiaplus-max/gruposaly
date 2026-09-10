import { ImageResponse } from "next/og";
import { getSiteImage } from "@/lib/siteImages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const alt = "Grupo Saly — Construcción, Remodelación e Inmobiliaria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND_GRADIENT = "linear-gradient(135deg, #ff9a35 0%, #fb7d16 50%, #bb4c0c 100%)";

export default async function Image() {
  let logoUrl: string | null = null;
  try {
    logoUrl = await getSiteImage("logo");
  } catch {
    logoUrl = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          background: "linear-gradient(135deg, #0a0b0d 0%, #131318 55%, #1d1710 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -320,
            left: 150,
            width: 900,
            height: 900,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(251,125,22,0.5) 0%, rgba(251,125,22,0.14) 42%, rgba(251,125,22,0) 68%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#ff9a35",
          }}
        >
          Construcción · Remodelación · Inmobiliaria
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt=""
              width={560}
              height={240}
              style={{ objectFit: "contain" }}
            />
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
              <svg width={116} height={135} viewBox="0 0 100 116">
                <defs>
                  <linearGradient id="gs-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff9a35" />
                    <stop offset="100%" stopColor="#bb4c0c" />
                  </linearGradient>
                </defs>
                <path d="M50 0 L100 29 V87 L50 116 L0 87 V29 Z" fill="url(#gs-grad)" />
                <path d="M22 42 L67 12 V26 L36 47 Z" fill="#ffffff" />
                <path d="M33 69 L78 39 V53 L47 74 Z" fill="#ffffff" />
              </svg>
              <div
                style={{
                  display: "flex",
                  fontSize: 92,
                  fontWeight: 900,
                  letterSpacing: -2,
                  textTransform: "uppercase",
                  color: "#ffffff",
                }}
              >
                Grupo Saly
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 6,
              borderRadius: 999,
              background: BRAND_GRADIENT,
            }}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 27,
                fontWeight: 700,
                color: "rgba(255,255,255,0.82)",
              }}
            >
              Construcción, remodelación e inmuebles en toda Colombia
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 27,
                fontWeight: 800,
                color: "#ff9a35",
              }}
            >
              gruposaly.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
