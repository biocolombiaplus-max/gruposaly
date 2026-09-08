import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gruposaly.com"),
  title: {
    default: "Grupo Saly | Construcción, Remodelación e Inmobiliaria",
    template: "%s | Grupo Saly",
  },
  description:
    "Grupo Saly construye y remodela infraestructura hospitalaria, casas, edificios, locales comerciales y bodegas en Colombia. Conoce también nuestros proyectos de vivienda en venta.",
  keywords: [
    "constructora Colombia",
    "remodelaciones",
    "construcción de casas",
    "construcción de edificios",
    "infraestructura hospitalaria",
    "bodegas industriales",
    "locales comerciales",
    "venta de proyectos de vivienda",
    "Grupo Saly",
  ],
  openGraph: {
    title: "Grupo Saly | Construcción, Remodelación e Inmobiliaria",
    description:
      "Construcción y remodelación de infraestructura hospitalaria, casas, edificios, locales y bodegas. Proyectos de vivienda en venta.",
    siteName: "Grupo Saly",
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-ink-950 font-body text-white">
        {children}
      </body>
    </html>
  );
}
