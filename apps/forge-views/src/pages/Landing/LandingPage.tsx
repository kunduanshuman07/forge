import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { LearningGrid } from "@/components/landing/LearningGrid";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";

function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#050505]">
        <Hero />
        <Stats />
        <LearningGrid />
        <Features />
        <HowItWorks />
        <Pricing />
      </main>
    </>
  );
}

export default LandingPage;