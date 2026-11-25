import { AudienceSection } from "@/domains/landing/components/sections/audience-section";
import { ColombiaSection } from "@/domains/landing/components/sections/colombia-section";
import { FeaturesSection } from "@/domains/landing/components/sections/features-section";
import { FinalCtaSection } from "@/domains/landing/components/sections/final-cta-section";
import { HeroSection } from "@/domains/landing/components/sections/hero-section";
import { HowItWorksSection } from "@/domains/landing/components/sections/how-it-works-section";
import { ProblemSection } from "@/domains/landing/components/sections/problem-section";
import { TransparencySection } from "@/domains/landing/components/sections/transparency-section";
import { ValuePillarsSection } from "@/domains/landing/components/sections/value-pillars-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ValuePillarsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TransparencySection />
      <ColombiaSection />
      <AudienceSection />
      <FinalCtaSection />
    </>
  );
}
