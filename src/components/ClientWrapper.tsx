"use client";
import FloatingBobba from "@/components/FloatingBobba";
import { gsap} from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

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

      // if(!bobbaRef.current) return;

      const LatestCreationTL  = gsap.timeline({
        scrollTrigger: {
          trigger: '.latest-creation-section',
          start: '20% 80%',                       
          end: '70% 80%',
          scrub: 3,
          markers: true,
          id: 'latest-creations',
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
            x: "random(-15, 15)",
            y: "random(-10, 10)",
            rotation: "random(-10, 10)",
            duration: 1,
            repeat: 10,
            yoyo: true,
            ease: "power2.out"
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
            ease: "power2.out"
          },
        );
  });

  return (
    <>

      <main>{children}</main>
    </>
  );
}