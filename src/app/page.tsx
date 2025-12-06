
import PublicNavbar from "@/components/navbars/PublicNavbar";
import ExploreSection from "@/components/sections/ExploreSection";
import HeroSection from "@/components/sections/HeroSection";
import JoinUsSection from "@/components/sections/JoinUsSection";
import LatestCreationsSection from "@/components/sections/LatestCreationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SocialsSection from "@/components/sections/SocialsSection";
import FooterSection from "@/components/sections/FooterSection";
import ClientWrapper from "@/components/ClientWrapper";

export default function Home() {
  return (
    <>
      <PublicNavbar/>

      <ClientWrapper>

        <HeroSection className=""/>
        <LatestCreationsSection className="latest-creation-section"/>
        <ExploreSection className="explore-section"/>
        <TestimonialsSection className="testimonials-section"/>
        <JoinUsSection className="join-us-section"/>
        <SocialsSection className="socials-section"/>
        <FooterSection className="footer-section"/>
        
      </ClientWrapper>
      
    </>
  );
}
