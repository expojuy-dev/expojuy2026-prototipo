import { EVENT, AGENDA } from "@/lib/data";

/**
 * Datos estructurados Schema.org (Event) para SEO / Google Rich Results.
 */
export function EventJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: "ExpoJuy 2026",
    alternateName: "ExpoJuy — Feria de Producción, Tecnología, Innovación y Comercio Exterior",
    slogan: EVENT.slogan,
    description:
      "La feria de producción, tecnología, innovación y comercio exterior más importante del Norte Argentino. +300 expositores, +100.000 visitantes, rondas de negocios internacionales y 10 días de actividades.",
    startDate: EVENT.startDate,
    endDate: EVENT.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: EVENT.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Teherán s/n, Ciudad Cultural",
        addressLocality: "San Salvador de Jujuy",
        addressRegion: "Jujuy",
        addressCountry: "AR",
      },
    },
    image: ["https://expojuy.com.ar/images/hero-feria.png"],
    url: "https://expojuy.com.ar",
    organizer: {
      "@type": "Organization",
      name: "Cámara de Comercio Exterior de Jujuy",
      url: "https://expojuy.com.ar",
      email: EVENT.email,
      telephone: EVENT.phone,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Entrada General Visitante",
        price: "5000",
        priceCurrency: "ARS",
        availability: "https://schema.org/InStock",
        url: "https://expojuy.com.ar/#entradas",
      },
      {
        "@type": "Offer",
        name: "Acreditación Empresarial · Ronda B2B",
        price: "12000",
        priceCurrency: "ARS",
        availability: "https://schema.org/InStock",
        url: "https://expojuy.com.ar/#entradas",
      },
    ],
    performer: AGENDA.flatMap((d) =>
      d.activities.slice(0, 2).map((a) => ({
        "@type": "Person",
        name: a.speaker.name,
        jobTitle: a.speaker.role,
      }))
    ).slice(0, 10),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
