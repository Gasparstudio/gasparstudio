'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Outcrowd-minta: Lenis smooth scroll (lerp 0.09, lassított görgetés),
 * GSAP ScrollTriggerrel szinkronban. Mobilon natív scroll marad.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      gestureOrientation: 'vertical',
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
