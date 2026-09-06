import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { ExhibitorsDirectory } from "@/components/home/ExhibitorsDirectory";
import { ScheduleSection } from "@/components/home/ScheduleSection";
import { VenueMapSection } from "@/components/home/VenueMapSection";
import { NewsSection } from "@/components/home/NewsSection";
import { SponsorsSection } from "@/components/home/SponsorsSection";
import { TicketsSection } from "@/components/home/TicketsSection";
import { AiAssistantSection } from "@/components/home/AiAssistantSection";
import { ContactAndFaqSection } from "@/components/home/ContactAndFaqSection";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body-md text-body-md text-on-background relative">
      <Navbar />
      <main className="w-full pt-20 bg-background flex-1">
        <div className="flex flex-col w-full">
          <Hero />
          <AboutSection />
          <ExhibitorsDirectory />
          <ScheduleSection />
          <VenueMapSection />
          <NewsSection />
          <SponsorsSection />
          <TicketsSection />
          <ContactAndFaqSection />
        </div>
      </main>
      <AiAssistantSection />
      <Footer />
    </div>
  );
}
