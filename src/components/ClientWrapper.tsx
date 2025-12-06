"use client";
import FloatingBobba from "@/components/FloatingBobba";
import { gsap } from "@/lib/gsap";
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

      if(!bobbaRef.current) return;

  });

  return (
    <>
      <FloatingBobba ref={bobbaRef} className="fixed bottom-20 right-[400px] z-50 hidden md:block" />
      
      <main>{children}</main>
    </>
  );
}