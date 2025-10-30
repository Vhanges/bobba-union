
import PublicNavbar from "@/components/navbars/PublicNavbar";
import ExploreSection from "@/components/sections/ExploreSection";
import HeroSection from "@/components/sections/HeroSection";
import LatestCreationsSection from "@/components/sections/LatestCreationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <PublicNavbar/>
      <main>
        <HeroSection/>
        <LatestCreationsSection/>
        <ExploreSection/>
        <TestimonialsSection/>
      </main>
    </>
  );
}
