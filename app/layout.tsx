import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sesiones de Psicología Profesional | Bienestar Mental",
  description: "Sesiones de psicología profesional. Apoyo emocional, terapia individual y bienestar mental. Agenda tu consulta hoy.",
  keywords: "psicología, terapia, salud mental, bienestar emocional, psicólogo, consulta psicológica",
  authors: [{ name: "Psicología Profesional" }],
  openGraph: {
    title: "Sesiones de Psicología Profesional",
    description: "Apoyo emocional y terapia profesional para tu bienestar mental",
    type: "website",
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
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
