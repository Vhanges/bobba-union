"use client";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { useEffect } from "react";

type ClientWrapperProps = {
    children: React.ReactNode;
}

export default function ClientWrapper({ 
    children 
}: ClientWrapperProps) {

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function update(time: number) {
      lenis.raf(time * 1000);
    }
    
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
      const LatestCreationMarker = false;
      const ExploreMarker = false;
      const JoinUsMarker = false;

      // Hero animations
      gsap.from('.hero-floating-bobba', {
        yPercent: -200,
        opacity: 0,
        rotation: 180,
        scale: 0.5,
        duration: 1.5,
        stagger: 0.2,
        ease: 'bounce.out',
      });

      gsap.from('.hero-text', {
        xPercent: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'back.out(1.5)',
      });

      gsap.from('.hero-cta', {
        yPercent: 50,
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: 'back.out(2)',
      });

      gsap.from(['.hero-image', '.hero-image-mobile'], {
        yPercent: 50,
        xPercent: -20,
        scale: 0.8,
        opacity: 0,
        rotation: 25,
        duration: 1.2,
        ease: 'back.out(2)',
      });

      // if(!bobbaRef.current) return;

      const LatestCreationTL  = gsap.timeline({
        scrollTrigger: {
          trigger: '.latest-creation-section',
          start: 'top 80%',                       
          end: 'bottom 20%',
          scrub: 1, // Reduced scrub for tighter, more responsive scroll interaction
          id: 'latest-creations',
          markers: LatestCreationMarker,
        }
      });

      LatestCreationTL
        .from(
          '.latest-creation-bobba',
          {
            yPercent: 80,
            scale: 0.3,
            opacity: 0,
            rotation: 45,
            ease: 'back.out(1.7)'
          }
        )
        // Subtle drink-shaking animation (gentle side-to-side shake)
        .to(
          ['.product-img-1', '.product-img-2', '.product-img-3'],
          {
            keyframes: {
              xPercent: [0, -8, 6, -4, 2, 0],
              rotation: [0, -3, 2, -1, 1, 0],
            },
            duration: 2,
            stagger: 0.2,
            ease: 'sine.inOut'
          },
          '<'
        );


        gsap.from('.explore-bobba', {
            xPercent: -80,
            yPercent: 80,
            rotation: -45, // Deeper rotation
            scale: 0.3,
            opacity: 0,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: '.explore-section',
              start: 'top 70%',
              end: 'center 40%',
              scrub: 1, // Reduced latency
              markers: ExploreMarker,
              id: 'explore-bobba'
            }
        });

        // Abstracted offering card config for consistent stagger timings
        const offeringCardsOptions = {
          opacity: 0,
          duration: 1, // Punched up duration
          ease: 'back.out(2)', // Aggressive overshoot
          stagger: 0.2, // Spread out rhythm
        };

        gsap.from('.offering-card-1', {
          ...offeringCardsOptions,
          xPercent: -50,
          yPercent: 50, // Slide up diagonally gives a neat 3D illusion
          scrollTrigger: {
            trigger: '.offering-card-1',
            start: 'top 85%',
            markers: ExploreMarker,
            id: 'card-1'
          }
        });

        gsap.from('.offering-card-reversed-1', {
          ...offeringCardsOptions,
          xPercent: 50,
          yPercent: 50,
          scrollTrigger: {
            trigger: '.offering-card-reversed-1',
            start: 'top 85%',
            markers: ExploreMarker,
            id: 'card-reversed-1'
          }
        });

        gsap.from('.offering-card-2', {
          ...offeringCardsOptions,
          xPercent: -50,
          yPercent: 50,
          scrollTrigger: {
            trigger: '.offering-card-2',
            start: 'top 85%',
            markers: ExploreMarker,
            id: 'card-2'
          }
        });

        
        const JoinUsTL = gsap.timeline({
          scrollTrigger: {
            trigger: '.join-us-section',
            start: 'top 75%',
            markers: JoinUsMarker,
            id: 'join-us-section',
            // Removed scrub. A fixed duration timeline should not be scrubbed if start and end overlap
          }
        });

        // Use appropriate easing and overlap rules
        JoinUsTL.
          from(
            '.join-us-section-header',
            {
              yPercent: 80, 
              opacity: 0,
              duration: 1,
              ease: 'back.out(1.5)',
            }
          ).
          from(
            '.join-us-section-img',
            {
              yPercent: 50,
              opacity: 0,
              scale: 0.8,
              duration: 1,
              ease: 'back.out(1.7)',
            },
            '-=0.7' // Law of Overlapping Action
          ).
          from(
            '.join-us-bobba',
            {
              xPercent: -80,
              yPercent: 80,
              rotation: -45,
              scale: 0.3,
              opacity: 0,
              duration: 1.2,
              ease: 'back.out(2)', // Peppy bubble finish
            },
            '-=0.8'
          )

        
  });

  return (
    <>

      <main>{children}</main>
    </>
  );
}