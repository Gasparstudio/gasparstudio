'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useLang } from '../context/LanguageContext';

/**
 * Outcrowd-minta: minden [data-animate] elem szövege karakterenként
 * úszik be, a scroll pozícióhoz kötve (scrub). Desktop only.
 * Nyelvváltásra és oldalváltásra újra-splittel.
 */
export default function TextReveal() {
  const { lang } = useLang();
  const pathname = usePathname();

  useEffect(() => {
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const splits: SplitType[] = [];
    const splitEls: HTMLElement[] = [];
    const triggers: ScrollTrigger[] = [];

    // PageTransition után várunk egy tick-et, hogy a DOM kész legyen
    const id = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
        if (el.dataset.animateDone) return;
        el.dataset.animateDone = '1';
        const split = new SplitType(el, { types: 'lines,words,chars', tagName: 'span' });
        splits.push(split);
        splitEls.push(el);
        const tween = gsap.from(split.chars, {
          opacity: 0,
          duration: 2,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 40%',
            scrub: true,
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      window.clearTimeout(id);
      triggers.forEach((t) => t.kill());
      splits.forEach((s) => s.revert());
      splitEls.forEach((el) => { delete el.dataset.animateDone; });
    };
  }, [lang, pathname]);

  return null;
}
