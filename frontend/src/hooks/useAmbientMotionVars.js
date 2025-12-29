import { useEffect } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Sets CSS variables on :root for cursor + scroll driven ambient FX.
// Variables include multiple parallax scales (s/m/l) so CSS can remain simple.
export default function useAmbientMotionVars() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = document.documentElement;

    // Default (center-ish) so it looks good without pointer.
    let targetX = window.innerWidth * 0.6;
    let targetY = window.innerHeight * 0.35;

    let curX = targetX;
    let curY = targetY;

    let raf = 0;

    function apply() {
      // Smooth follow for a more premium feel.
      curX = lerp(curX, targetX, 0.10);
      curY = lerp(curY, targetY, 0.10);

      // Cursor position for placing lights.
      root.style.setProperty('--fx-cx', `${curX.toFixed(1)}px`);
      root.style.setProperty('--fx-cy', `${curY.toFixed(1)}px`);

      // Parallax offsets (in px) derived from distance to center.
      const dx = curX - window.innerWidth / 2;
      const dy = curY - window.innerHeight / 2;

      // Clamp to prevent huge jumps on multi-monitor setups.
      const cdx = clamp(dx, -520, 520);
      const cdy = clamp(dy, -360, 360);

      const sX = cdx * 0.010;
      const sY = cdy * 0.010;
      const mX = cdx * 0.020;
      const mY = cdy * 0.020;
      const lX = cdx * 0.040;
      const lY = cdy * 0.040;

      root.style.setProperty('--fx-x-s', `${sX.toFixed(2)}px`);
      root.style.setProperty('--fx-y-s', `${sY.toFixed(2)}px`);
      root.style.setProperty('--fx-x-m', `${mX.toFixed(2)}px`);
      root.style.setProperty('--fx-y-m', `${mY.toFixed(2)}px`);
      root.style.setProperty('--fx-x-l', `${lX.toFixed(2)}px`);
      root.style.setProperty('--fx-y-l', `${lY.toFixed(2)}px`);

      raf = window.requestAnimationFrame(apply);
    }

    function onPointerMove(e) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function onScroll() {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = window.scrollY / max;

      // Give CSS ready-to-use pixel offsets per layer.
      // Negative means content drifts upward as you scroll down.
      root.style.setProperty('--fx-scroll-s', `${(-p * 10).toFixed(2)}px`);
      root.style.setProperty('--fx-scroll-m', `${(-p * 22).toFixed(2)}px`);
      root.style.setProperty('--fx-scroll-l', `${(-p * 40).toFixed(2)}px`);

      // Convenience for any other effects.
      root.style.setProperty('--scrollP', `${p.toFixed(4)}`);
    }

    // Reduced motion: keep variables stable (no RAF), but still set scrollP once.
    if (reducedMotion) {
      onScroll();
      return;
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    onScroll();
    raf = window.requestAnimationFrame(apply);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);
}
