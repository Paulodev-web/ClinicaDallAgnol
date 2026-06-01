import { HeroSection } from "@/components/sections/HeroSection";
import { ConceptSection } from "@/components/sections/ConceptSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { TechSection } from "@/components/sections/TechSection";
import { StructureSection } from "@/components/sections/StructureSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FooterCTA } from "@/components/sections/FooterCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ConceptSection />
      <PillarsSection />
      <TechSection />
      <StructureSection />
      <TestimonialsSection />
      <FooterCTA />
    </>
  );
}
