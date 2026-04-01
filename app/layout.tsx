import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

/** Origen público del sitio (sin barra final). Define `NEXT_PUBLIC_SITE_URL` en producción. */
const siteOrigin =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/**
 * Base para resolver URLs relativas de metadata (canonical, og:url, etc.).
 * Incluye `basePath` porque las páginas públicas viven bajo `/deisygerlach/`.
 */
export const metadataBase = new URL(`${siteOrigin}/deisygerlach/`);

/** Metadata de `/` (redirección al idioma guardado); el detalle por idioma está en `app/[locale]/layout.tsx`. */
export const metadata: Metadata = {
  metadataBase,
  title: "Sesiones de Terapia Profesional | Bienestar Mental",
  description:
    "Sesiones de terapia profesional. Apoyo emocional, terapia individual y bienestar mental. Agenda tu consulta hoy.",
  keywords:
    "terapia, salud mental, bienestar emocional, terapeuta, consulta terapéutica",
  authors: [{ name: "Terapia Profesional" }],
  openGraph: {
    title: "Sesiones de Terapia Profesional",
    description: "Apoyo emocional y terapia profesional para tu bienestar mental",
    type: "website",
  },
  alternates: {
    canonical: "esp/",
    languages: {
      es: "esp/",
      en: "eng/",
      "pt-BR": "por/",
      "x-default": "esp/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
