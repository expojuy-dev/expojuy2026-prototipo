import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ambitFont = localFont({
  src: [
    {
      path: "../public/fonts/Ambit-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Ambit-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Ambit-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Ambit-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ambit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ExpoJuy 2026 | Conectando Países, Creando Oportunidades",
  description:
    "Portal oficial de la ExpoJuy 2026. La muestra multisectorial más trascendente del Norte Argentino. Minería, litio, energías renovables, agroindustria y economía del conocimiento.",
  keywords: [
    "ExpoJuy 2026",
    "Jujuy",
    "Cámara de Comercio Exterior de Jujuy",
    "Minería Litio",
    "Energías Renovables",
    "Economía del Conocimiento",
    "Norte Argentino",
    "Feria Multisectorial",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${ambitFont.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-slate-950 text-slate-100 min-h-screen selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
