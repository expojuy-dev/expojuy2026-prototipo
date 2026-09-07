import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://expojuy.com.ar"),
  title: "ExpoJuy 2026 | Conectando Países — Creando Oportunidades",
  description:
    "La feria de producción, tecnología, innovación y comercio exterior más importante del Norte Argentino. Organiza la Cámara de Comercio Exterior de Jujuy. San Salvador de Jujuy, 2026.",
  keywords: [
    "ExpoJuy 2026",
    "feria Jujuy",
    "comercio exterior",
    "NOA",
    "expositores",
    "rondas de negocios",
    "Cámara de Comercio Exterior de Jujuy",
    "feria producción tecnología innovación",
  ],
  authors: [{ name: "Cámara de Comercio Exterior de Jujuy" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    title: "ExpoJuy 2026 — Conectando Países, Creando Oportunidades",
    description:
      "La feria de producción, tecnología, innovación y comercio exterior más importante del Norte Argentino. +300 expositores, +100.000 visitantes.",
    siteName: "ExpoJuy 2026",
    type: "website",
    locale: "es_AR",
    url: "https://expojuy.com.ar",
    images: [{ url: "/images/hero-feria.png", width: 1344, height: 768, alt: "Predio de ExpoJuy 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ExpoJuy 2026 — Conectando Países, Creando Oportunidades",
    description:
      "La feria de producción, tecnología, innovación y comercio exterior más importante del Norte Argentino.",
    images: ["/images/hero-feria.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2a1745" },
    { media: "(prefers-color-scheme: dark)", color: "#1e0f33" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jakarta.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster position="bottom-left" richColors closeButton />
      </body>
    </html>
  );
}
