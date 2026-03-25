import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { PartnersSection } from '@/components/landing/PartnersSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { PortalPreview } from '@/components/landing/PortalPreview';
import { InternationalEvents } from '@/components/landing/InternationalEvents';
import { NewsSection } from '@/components/landing/NewsSection';
import { RoadmapSection } from '@/components/landing/RoadmapSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PartnersSection />
        <InternationalEvents />
        <ServicesSection />
        <PortalPreview />
        <NewsSection />
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
