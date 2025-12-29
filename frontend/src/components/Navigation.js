import React, { useEffect, useMemo, useState } from 'react';
import './Navigation.css';

export default function Navigation({ profile }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const brandMark = (
    <span className="brandMark" aria-hidden="true">
      <span className="brandLogo" aria-hidden="true">
        <span className="brandLogoBg" />
        <span className="brandLogoTrace" />
        <span className="brandLogoLetters">
          <span className="brandLogoM">M</span>
        </span>
      </span>
    </span>
  );

  const links = useMemo(() => ([
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]), []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    // Prevent background scroll while menu is open.
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    // Hide navbar when scrolling down; show when scrolling up.
    // Disabled while mobile menu is open.
    if (open) {
      setHidden(false);
      return undefined;
    }

    let lastY = window.scrollY || 0;
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY || 0;

        // Always show at the top.
        if (y < 24) {
          setHidden(false);
          lastY = y;
          return;
        }

        const delta = y - lastY;
        if (delta > 10) setHidden(true);
        if (delta < -10) setHidden(false);

        lastY = y;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  return (
    <header className={`nav ${open ? 'nav--menuOpen' : ''} ${hidden ? 'nav--hidden' : ''}`}
      data-menu-open={open ? 'true' : 'false'}
      data-hidden={hidden ? 'true' : 'false'}
    >
      <div className="navInner">
        <a className="brand" href="#home" aria-label={profile?.fullName || 'Portfolio'} onClick={() => setOpen(false)}>
          {brandMark}
        </a>

        <nav className="links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <button
          className="menuButton"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobileNav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`menuIcon ${open ? 'menuIcon--open' : ''}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        className={`mobileOverlay ${open ? 'mobileOverlay--open' : ''}`}
        role="presentation"
        aria-hidden={!open}
        onClick={(e) => {
          // Close only when clicking the overlay, not the panel.
          if (!open) return;
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="mobilePanel" role="dialog" aria-modal="true" id="mobileNav" aria-label="Menu">
          <div className="mobileHeader">
            <div className="mobileBrand" aria-hidden="true">{brandMark}</div>
            <button className="mobileClose" type="button" onClick={() => setOpen(false)} aria-label="Close menu">×</button>
          </div>
          <div className="mobileLinks">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
