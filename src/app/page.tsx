
import PublicNavbar from "@/components/navbars/PublicNavbar";
import ExploreSection from "@/components/sections/ExploreSection";
import HeroSection from "@/components/sections/HeroSection";
import JoinUsSection from "@/components/sections/JoinUsSection";
import LatestCreationsSection from "@/components/sections/LatestCreationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SocialsSection from "@/components/sections/SocialsSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <PublicNavbar/>
      <main>
        <HeroSection/>
        <LatestCreationsSection/>
        <ExploreSection/>
        <TestimonialsSection/>
        <JoinUsSection/>
        <SocialsSection/>
        <FooterSection/>
      </main>
    </>
  );
}
