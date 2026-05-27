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
      const TestimonialsMarker = false;

      // Hero animations
      const heroFloatingBobbaIntro = gsap.from('.hero-floating-bobba', {
        yPercent: -200,
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        stagger: 0.2,
        ease: 'bounce.out',
      });

      const heroFloatingBobbaSpin = gsap.to('.hero-floating-bobba', {
        rotation: '+=360',
        duration: 2,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
        force3D: true,
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

      // Use GSAP matchMedia to provide different animations on mobile vs desktop
      const mm = gsap.matchMedia();

      // Product images animation: create once (applies to all viewports)
      const productShake = gsap.to(['.product-img-1', '.product-img-2', '.product-img-3'], {
        keyframes: {
          xPercent: [0, -8, 6, -4, 2, 0],
          rotation: [0, -3, 2, -1, 1, 0],
        },
        duration: 2,
        stagger: 0.2,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: '.latest-creation-section',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          id: 'latest-creations-products',
          markers: LatestCreationMarker,
        }
      });

      // Table to Desktop
      mm.add('(min-width: 768px)', () => {

        const LatestCreationTL = gsap.timeline({
          scrollTrigger: {
            trigger: '.latest-creation-section',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
            id: 'latest-creations',
            markers: LatestCreationMarker,
          }
        });


        LatestCreationTL.from('.latest-creation-bobba', {
          yoyoEasePercent: 80,
          scale: 0.3,
          opacity: 1,
          rotation: 45,
          ease: 'back.out(1.7)'
        });

        const ExploreTL = gsap.timeline({
          scrollTrigger: {
            trigger: '.explore-section',
            start: 'top 80%',
            end: 'top 70%',
            scrub: 1,
            markers: ExploreMarker,
            id: 'explore-bobba',
          }
        });

        ExploreTL.fromTo('.explore-bobba', 
        {
          xPercent: -50,
          yPercent: 0,
          scale: 0,
          ease: 'back.out(1.5)',
        }, {
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          duration: 1.2,
        });

const OfferingCard1TL = gsap.timeline({
          scrollTrigger: {
            trigger: '.offering-card-1',
            start: 'top 85%',
            markers: ExploreMarker,
            id: 'card-1',
          }
        });

        OfferingCard1TL.from('.offering-card-1', {
          opacity: 0,
          duration: 1,
          ease: 'back.out(2)',
          xPercent: -50,
          yPercent: 50,
        });

        const OfferingCardReversed1TL = gsap.timeline({
          scrollTrigger: {
            trigger: '.offering-card-reversed-1',
            start: 'top 85%',
            markers: ExploreMarker,
            id: 'card-reversed-1',
          }
        });

        OfferingCardReversed1TL.from('.offering-card-reversed-1', {
          opacity: 0,
          duration: 1,
          ease: 'back.out(2)',
          xPercent: 50,
          yPercent: 50,
        });

        const OfferingCard2TL = gsap.timeline({
          scrollTrigger: {
            trigger: '.offering-card-2',
            start: 'top 85%',
            markers: ExploreMarker,
            id: 'card-2',
          }
        });

        OfferingCard2TL.from('.offering-card-2', {
          opacity: 0,
          duration: 1,
          ease: 'back.out(2)',
          xPercent: -50,
          yPercent: 50,
        });

        const JoinUsTL = gsap.timeline({
          scrollTrigger: {
            trigger: '.join-us-section',
            start: 'top 75%',
            markers: JoinUsMarker,
            id: 'join-us-section',
          }
        });

        const TestimonialsTL = gsap.timeline({
          scrollTrigger: {
            trigger: '.testimonial-card',
            start: 'top 85%',
            markers: TestimonialsMarker,
            id: 'testimonials-bounce',
          }
        });

        JoinUsTL
          .from('.join-us-section-header', {
            yPercent: 80,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.5)',
          })
          .from('.join-us-section-img', {
            yPercent: 50,
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: 'back.out(1.7)',
          }, '-=0.7')
          .from('.join-us-bobba', {
            xPercent: -80,
            yPercent: 80,
            rotation: -45,
            scale: 0.3,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(2)',
          }, '-=0.8');

        TestimonialsTL.from('.testimonial-card', {
          yPercent: 80,
          opacity: 0,
          duration: .5,
          stagger: 0.2,
          ease: 'ease.inOut',
        });

        return () => {
          LatestCreationTL.kill();
          ExploreTL.kill();
          OfferingCard1TL.kill();
          OfferingCardReversed1TL.kill();
          OfferingCard2TL.kill();
          JoinUsTL.kill();
          TestimonialsTL.kill();
        };
      });

      // Mobile 
      mm.add('(max-width: 767px)', () => {

        const LatestCreationTL = gsap.timeline({
          scrollTrigger: {
            trigger: '.latest-creation-section',
            start: 'top 80%',
            end: 'top 70%',
            scrub: 1,
            id: 'latest-creations-mobile',
            markers: LatestCreationMarker,
          }
        });

        LatestCreationTL.fromTo('.latest-creation-bobba',
          {
          xPercent: 0,
          yPercent: 40,
          scale: 0,
          opacity: 0,
        }, {
          xPercent: -190,
          yPercent: 40,
          opacity: 1,
          scale: 0.8,
          duration: 1.2,
          ease: 'sine.inOut'
        });

        const ExploreTL = gsap.timeline({
          scrollTrigger: {
            trigger: '.explore-section',
            start: 'top 80%',
            end: 'top 80%',
            scrub: 1,
            markers: ExploreMarker,
            id: 'explore-bobba-mobile',
          }
        });

        ExploreTL.fromTo('.explore-bobba', {
          xPercent: -60,
          yPercent: 50,
          rotation: -45,
          scale: 0,
          opacity: 0,
          ease: 'back.out(1.5)',
        }, {
          xPercent: -60,
          yPercent: 30,
          rotation: 0,
          scale: 0.5,
          opacity: 1,
          duration: 1.2,
        });

        const OfferingCard1TL = gsap.timeline({
          scrollTrigger: {
            trigger: '.offering-card-1',
            start: 'top 85%',
            markers: ExploreMarker,
            id: 'card-1-mobile',
          }
        });

        OfferingCard1TL.from('.offering-card-1', {
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          xPercent: -30,
        });

        const OfferingCardReversed1TL = gsap.timeline({
          scrollTrigger: {
            trigger: '.offering-card-reversed-1',
            start: 'top 85%',
            markers: ExploreMarker,
            id: 'card-reversed-1-mobile',
          }
        });

        OfferingCardReversed1TL.from('.offering-card-reversed-1', {
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          xPercent: 30,
        });

        const OfferingCard2TL = gsap.timeline({
          scrollTrigger: {
            trigger: '.offering-card-2',
            start: 'top 85%',
            markers: ExploreMarker,
            id: 'card-2-mobile',
          }
        });

        OfferingCard2TL.from('.offering-card-2', {
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          xPercent: -30,
        });

        const JoinUsTL = gsap.timeline({
          scrollTrigger: {
            trigger: '.join-us-section',
            start: 'top 75%',
            markers: JoinUsMarker,
            id: 'join-us-section-mobile',
          }
        });

        JoinUsTL
          .from('.join-us-section-header', {
            yPercent: 48,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.5)',
          })
          .from('.join-us-section-img', {
            yPercent: 30,
            opacity: 0,
            scale: 0.64,
            duration: 0.8,
            ease: 'back.out(1.7)',
          }, '-=0.45')
          .from('.join-us-bobba', {
            xPercent: -48,
            yPercent: 48,
            rotation: -45,
            scale: 0.18,
            opacity: 0,
            duration: 0.96,
            ease: 'back.out(2)',
          }, '-=0.5');

        return () => {
          ExploreTL.kill();
          OfferingCard1TL.kill();
          OfferingCardReversed1TL.kill();
          OfferingCard2TL.kill();
          JoinUsTL.kill();
        };
      });

      return () => {
        heroFloatingBobbaIntro.kill();
        heroFloatingBobbaSpin.kill();
        productShake?.kill();
        mm.revert();
      };
  });

  return (
    <>

      <main>{children}</main>
    </>
  );
}