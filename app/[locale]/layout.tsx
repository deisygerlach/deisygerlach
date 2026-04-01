import type { Metadata } from "next";
import { notFound } from "next/navigation";

const LOCALES = ["esp", "eng", "por"] as const;

const siteOrigin =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const metadataBase = new URL(`${siteOrigin}/deisygerlach/`);
type AppLocale = (typeof LOCALES)[number];

const localeMeta: Record<
  AppLocale,
  {
    title: string;
    description: string;
    keywords: string;
    author: string;
    openGraphTitle: string;
    openGraphDescription: string;
  }
> = {
  esp: {
    title: "Terapia Integrativa",
    description:
      "Sesiones de terapia integrativa. Apoyo emocional, terapia individual y bienestar mental. Agenda tu consulta hoy.",
    keywords:
      "terapia, salud mental, bienestar emocional, terapeuta, consulta terapéutica",
    author: "Deisy Gerlach",
    openGraphTitle: "Sesiones de Terapia Integrativa",
    openGraphDescription:
      "Apoyo emocional y terapia integrativa para tu bienestar mental",
  },
  eng: {
    title: "Integrative Therapy",
    description:
      "Integrative therapy sessions. Emotional support, individual therapy, and mental wellness. Book your consultation today.",
    keywords: "therapy, mental health, emotional wellness, therapist, counseling",
    author: "Deisy Gerlach",
    openGraphTitle: "Integrative Therapy",
    openGraphDescription:
      "Emotional support and integrative therapy for your mental wellness",
  },
  por: {
    title: "Terapia Integrativa",
    description:
      "Sessões de terapia integrativa. Apoio emocional, terapia individual e bem-estar mental. Agende sua consulta hoje.",
    keywords:
      "terapia, saúde mental, bem-estar emocional, terapeuta, consulta terapêutica",
    author: "Deisy Gerlach",
    openGraphTitle: "Sessões de Terapia Integrativa",
    openGraphDescription:
      "Apoio emocional e terapia integrativa para o seu bem-estar mental",
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  if (!LOCALES.includes(loc as AppLocale)) notFound();

  const locale = loc as AppLocale;
  const m = localeMeta[locale];

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    authors: [{ name: m.author }],
    metadataBase,
    openGraph: {
      title: m.openGraphTitle,
      description: m.openGraphDescription,
      type: "website",
      url: `${locale}/`,
      locale:
        locale === "esp" ? "es_ES" : locale === "eng" ? "en_US" : "pt_BR",
    },
    alternates: {
      canonical: `${locale}/`,
      languages: {
        es: "esp/",
        en: "eng/",
        "pt-BR": "por/",
        "x-default": "esp/",
      },
    },
  };
}

export default function LocaleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
