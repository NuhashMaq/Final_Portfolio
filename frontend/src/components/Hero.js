import React, { useMemo, useState } from 'react';
import './Hero.css';
import placeholderAvatar from '../assets/profile-placeholder.svg';
import dpAvatar from '../assets/dp.jpg';

export default function Hero({ profile }) {
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

  return (
    <section className="hero" id="home">
      <div className="heroInner reveal">
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
