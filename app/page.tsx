import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { Features } from "@/components/sections/Features";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Dynamic imports for sections below the fold
const InteractiveDemo = dynamic(() => import("@/components/sections/InteractiveDemo").then(mod => mod.InteractiveDemo), {
  loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials), {
  loading: () => <SectionSkeleton />,
});
const Pricing = dynamic(() => import("@/components/sections/Pricing").then(mod => mod.Pricing), {
  loading: () => <SectionSkeleton />,
});
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks").then(mod => mod.HowItWorks), {
  loading: () => <SectionSkeleton />,
});
const Comparison = dynamic(() => import("@/components/sections/Comparison").then(mod => mod.Comparison), {
  loading: () => <SectionSkeleton />,
});
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA").then(mod => mod.FinalCTA), {
  loading: () => <SectionSkeleton />,
});

function SectionSkeleton() {
  return (
    <div className="w-full h-[600px] bg-black flex items-center justify-center">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6">
        <div className="h-12 w-1/3 bg-white/5 rounded-lg animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-accent/30">
      <Hero />
      <StatsSection />
      <Features />
      <HowItWorks />
      <InteractiveDemo />
      <Testimonials />
      <Comparison />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
