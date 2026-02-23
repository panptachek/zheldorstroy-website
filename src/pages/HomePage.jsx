import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { DirectionsSection } from '../components/sections/DirectionsSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { JobsSection } from '../components/sections/JobsSection';
import { PressSection } from '../components/sections/PressSection';
import { ContactsSection } from '../components/sections/ContactsSection';

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <DirectionsSection />
        <ProjectsSection />
        <JobsSection />
        <PressSection />
        <ContactsSection />
      </main>
      <Footer />
    </>
  );
}
