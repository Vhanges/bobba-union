"use client";
import FloatingBobba from "@/components/FloatingBobba";
import { gsap} from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ExploreSection from "./sections/ExploreSection";

type ClientWrapperProps = {
    children: React.ReactNode;
}

export default function ClientWrapper({ 
    children 
}: ClientWrapperProps) {


  const bobbaRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {

      { 
        /**
         * Checks if floating bobba exist 
         */
      }

      const LatestCreationMarker = false;
      const ExploreMarker = false;
      const JoinUsMarker = false;

      // if(!bobbaRef.current) return;

      const LatestCreationTL  = gsap.timeline({
        scrollTrigger: {
          trigger: '.latest-creation-section',
          start: '20% 80%',                       
          end: '70% 80%',
          scrub: 3,
          id: 'latest-creations',
          markers: LatestCreationMarker,
        }
      });

      LatestCreationTL
        .from(
          '.latest-creation-bobba',
          {
            yPercent: 60,
            scale: -1,
            opacity: 0,
            duration: 4,
            ease: 'power2.out'
          }
        )
        .to(
          ['.product-img-1', '.product-img-2', '.product-img-3'],
          {
            x: 'random(-15, 15)',
            y: 'random(-10, 10)',
            rotation: 'random(-10, 10)',
            duration: 1,
            repeat: 10,
            yoyo: true,
            ease: 'power2.out'
          },
        ).
        to(
          ['.product-img-1', '.product-img-2', '.product-img-3'],
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1,
            yoyo: true,
            ease: 'power2.out'
          },
        );


        gsap.from('.explore-bobba', {
            xPercent: -60,
            yPercent: 50,
            scale: -1,
            opacity: 0,
            duration: 4,
            scrub: 3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.explore-bobba',
              start: 'top 80%',
              end: 'bottom 80%',
              scrub: 1,
              markers: ExploreMarker,
              id: 'explore-bobba'
            }
        });

        gsap.from('.offering-card-1', {
          xPercent: -50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'back.out',
          scrollTrigger: {
            trigger: '.offering-card-1',
            start: 'center 80%',
            end: 'center 50%',
            markers: ExploreMarker,
            id: 'card-1'
          }
        });

        gsap.from('.offering-card-reversed-1', {
          xPercent: 50,
          opacity: 0,
          duration: 1,
          ease: 'back.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.offering-card-reversed-1',
            start: 'center 80%',
            end: 'center 50%',
            markers: ExploreMarker,
            id: 'card-reversed-1'
          }
        });

        gsap.from('.offering-card-2', {
          xPercent: -50,
          opacity: 0,
          duration: 1,
          ease: 'back.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.offering-card-2',
            start: 'center 80%',
            end: 'center 50%',
            markers: ExploreMarker,
            id: 'card-2'
          }
        });

        
        const JoinUsTL = gsap.timeline({
          scrollTrigger: {
            trigger: '.join-us-section',
            start: 'center 80%',
            end: 'center 80%',
            markers: JoinUsMarker,
            id: 'join-us-section',
            scrub: 3
          }
        });

        JoinUsTL.
          from(
            '.join-us-section-header',
            {
              xPercent: -50,
              opacity: 0,
              duration: 1,
              ease: 'power1.inOut',
            }
          ).
          from(
            '.join-us-section-img',
            {
              opacity: 0,
              duration: 1,
              ease: 'power2.inOut',
            }
          ).
          from(
            '.join-us-bobba',
            {
              xPercent: -60,
              scale: -1,
              opacity: 0,
              duration: 2,
              ease: 'power2.out',
            },
            '+=1'
          )

        
  });

  return (
    <>

      <main>{children}</main>
    </>
  );
}