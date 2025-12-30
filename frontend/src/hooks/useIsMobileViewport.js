import { useEffect, useState } from 'react';

// Heuristic for "mobile experience":
// - narrow viewport OR
// - coarse pointer / no hover (typical phones/tablets)
// Used to disable heavy background animations that can jank on mobile GPUs.
export default function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mq = window.matchMedia('(max-width: 768px), (pointer: coarse), (hover: none)');

    const onChange = () => setIsMobile(Boolean(mq.matches));
    onChange();

    // Safari < 14 uses addListener/removeListener
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return isMobile;
}
