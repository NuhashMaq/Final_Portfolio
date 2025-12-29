import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Hero.css';
import placeholderAvatar from '../assets/profile-placeholder.svg';
import dpAvatar from '../assets/dp.jpg';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

export default function Hero({ profile }) {
  const rootRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const name = profile?.fullName || 'Your Name';
  const headline = profile?.headline || 'AI/ML • Full‑Stack • Problem Solving';
  const location = profile?.location || '';
  const cvUrl = profile?.cvUrl || '';
  const sources = useMemo(() => {
    // 1) backend/public URL (e.g. /dp.jpg)
    // 2) bundled asset (src/assets/dp.jpg)
    // 3) placeholder
    const first = profile?.imageUrl || '/dp.jpg';
    return [first, dpAvatar, placeholderAvatar];
  }, [profile]);

  const [srcIndex, setSrcIndex] = useState(0);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const avatar = rootRef.current.querySelector('.heroAvatar');
      const kicker = rootRef.current.querySelectorAll('.kicker');
      const title = rootRef.current.querySelector('h1');
      const ctas = rootRef.current.querySelectorAll('.ctaRow a');

      gsap.set([avatar, title], { willChange: 'transform,opacity' });
      gsap.set(ctas, { willChange: 'transform,opacity' });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        avatar,
        { autoAlpha: 0, y: 20, scale: 0.92 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.0 }
      )
        .fromTo(
          kicker,
          { autoAlpha: 0, y: 14, filter: 'blur(6px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.08, clearProps: 'filter' },
          0.15
        )
        .fromTo(
          title,
          { autoAlpha: 0, y: 18, filter: 'blur(10px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.95, clearProps: 'filter' },
          0.18
        )
        .fromTo(
          ctas,
          { autoAlpha: 0, y: 10, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.06 },
          0.38
        );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion, name, headline, location, cvUrl]);

  return (
    <section className="hero" id="home">
      <div className="heroInner reveal" ref={rootRef}>
        <div className="heroAvatar" aria-hidden="true">
          <div className="avatarRing" />
          <img
            className="avatarImg"
            src={sources[Math.min(srcIndex, sources.length - 1)]}
            alt=""
            onError={() => setSrcIndex((i) => Math.min(i + 1, sources.length - 1))}
          />
        </div>

        <div className="heroCopy">
        <p className="kicker">{headline}</p>
        <h1>
          {name}
        </h1>
        {location ? <p className="kicker kicker--location">{location}</p> : null}
        <div className="ctaRow">
          <a className="btnPrimary" href="#projects">View Projects</a>
          <a className="btnGhost" href="#about">About</a>
          {cvUrl ? (
            <a className="btnGhost btnCv" href={cvUrl} target="_blank" rel="noreferrer">Download CV</a>
          ) : null}
          <a className="btnGhost" href="#contact">Contact</a>
        </div>
        </div>
      </div>
    </section>
  );
}
