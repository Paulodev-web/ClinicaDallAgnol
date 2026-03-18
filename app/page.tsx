import { HeroSection } from "@/components/sections/HeroSection";
import { AuthorityBar } from "@/components/sections/AuthorityBar";
import { ConceptSection } from "@/components/sections/ConceptSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { TechSection } from "@/components/sections/TechSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FooterCTA } from "@/components/sections/FooterCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AuthorityBar />
      <ConceptSection />
      <PillarsSection />
      <TechSection />
      <TestimonialsSection />
      <FooterCTA />
    </>
  );
}
