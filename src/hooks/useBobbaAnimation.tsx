"use client";

import {useRef} from "react";
import  {gsap, ScrollTrigger} from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function useBobbaAnimation() {
    const bobbaRef = useRef(null);
    
    

    return { bobbaRef };
}