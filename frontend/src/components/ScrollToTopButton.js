import React, { useEffect, useState } from 'react';
import './ScrollToTopButton.css';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY || 0;
        setVisible(y > 420);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <button
      className={`toTop ${visible ? 'toTop--visible' : ''}`}
      type="button"
      aria-label="Scroll back to top"
      onClick={() => {
        try {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (e) {
          window.scrollTo(0, 0);
        }
      }}
    >
      <span className="toTopIcon" aria-hidden="true">↑</span>
    </button>
  );
}
