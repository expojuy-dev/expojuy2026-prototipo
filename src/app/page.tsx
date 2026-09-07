import { SiteHeader } from "@/components/expojuy/site-header";
import { HeroSection } from "@/components/expojuy/hero-section";
import { AboutSection } from "@/components/expojuy/about-section";
import { ExhibitorsSection } from "@/components/expojuy/exhibitors-section";
import { AgendaSection } from "@/components/expojuy/agenda-section";
import { MapSection } from "@/components/expojuy/map-section";
import { NewsSection } from "@/components/expojuy/news-section";
import { SocialSection } from "@/components/expojuy/social-section";
import { SponsorsSection } from "@/components/expojuy/sponsors-section";
import { TestimonialsSection } from "@/components/expojuy/testimonials-section";
import { TicketsSection } from "@/components/expojuy/tickets-section";
import { FaqSection } from "@/components/expojuy/faq-section";
import { ContactSection } from "@/components/expojuy/contact-section";
import { SiteFooter } from "@/components/expojuy/site-footer";
import { AiAssistant } from "@/components/expojuy/ai-assistant";
import { PlanPanel } from "@/components/expojuy/plan-panel";
import { BackToTop } from "@/components/expojuy/back-to-top";
import { SearchPalette } from "@/components/expojuy/search-palette";
import { EventJsonLd } from "@/components/expojuy/event-jsonld";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <EventJsonLd />
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-deep focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
      >
        Saltar al contenido principal
      </a>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ExhibitorsSection />
        <AgendaSection />
        <MapSection />
        <NewsSection />
        <SocialSection />
        <SponsorsSection />
        <TestimonialsSection />
        <TicketsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <AiAssistant />
      <PlanPanel />
      <BackToTop />
      <SearchPalette />
    </div>
  );
}
