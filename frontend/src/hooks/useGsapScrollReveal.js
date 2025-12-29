import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import usePrefersReducedMotion from './usePrefersReducedMotion';

// Site-wide scroll reveal for elements using the existing `.reveal` class.
// Also supports staggered children when you add `.gsap-item` inside.
export default function useGsapScrollReveal() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('.reveal'));
    if (!targets.length) return;

    // Reduced motion: make everything visible immediately.
    if (reducedMotion) {
      targets.forEach((el) => el.classList.add('reveal--in'));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    document.documentElement.classList.add('use-gsap');

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        // Ensure the element isn't permanently hidden even if animations are interrupted.
        el.classList.remove('reveal--in');

        const items = el.querySelectorAll('.gsap-item');

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            end: 'bottom 20%',
            toggleActions: 'play none none none'
          }
        });

        tl.fromTo(
          el,
          { autoAlpha: 0, y: 28, filter: 'blur(10px)', scale: 0.99 },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.05,
            // Keep the element crisp after GSAP clears inline styles.
            // Without this, CSS `.reveal{filter:blur(...)}` can re-apply and blur the whole site.
            onComplete: () => el.classList.add('reveal--in'),
            clearProps: 'filter'
          }
        );

        if (items.length) {
          tl.fromTo(
            items,
            { autoAlpha: 0, y: 18, scale: 0.992 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.95,
              stagger: 0.08
            },
            0.12
          );
        }
      });

      // A tiny global polish: soften scroll-linked jank on some GPUs.
      ScrollTrigger.refresh();
    });

    return () => {
      document.documentElement.classList.remove('use-gsap');
      ctx.revert();
    };
  }, [reducedMotion]);
}
