import React, { useMemo } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import './TechBackgroundFX.css';

function range(n) {
  return Array.from({ length: n }, (_, i) => i);
}

export default function TechBackgroundFX() {
  const reducedMotion = usePrefersReducedMotion();

  const shards = useMemo(() => {
    // “Thrown” neon shards — slow by design.
    // These are deterministic so the UI is stable across renders.
    return range(14).map((i) => {
      const x = (i * 7) % 100;
      const delay = (i % 7) * -2.1;
      const dur = 18 + (i % 6) * 4; // 18s..38s
      const scale = 0.65 + (i % 5) * 0.12;
      const hue = i % 3; // 0..2
      return { i, x, delay, dur, scale, hue };
    });
  }, []);

  const codeCols = useMemo(() => {
    // Keep it “code-y” but avoid wordy buzzwords. Prefer symbols.
    const text =
      '0101 1100 0011 1010   </>  {}  []  ()  ; ;  ::  =>  &&  ||  !=  ==  +=  -=  /* */  //  #  @  $  ~  '; 
    return range(10).map((i) => {
      const x = (i * 9 + 3) % 100;
      const dur = 14 + (i % 5) * 5; // 14..34s
      const delay = (i % 6) * -2.4;
      const opacity = 0.12 + (i % 4) * 0.04;
      return { i, x, dur, delay, opacity, text };
    });
  }, []);

  const syntaxBits = useMemo(() => {
    // Floating “code syntax” chips (slow drift).
    const bits = [
      '</>',
      '{…}',
      '[…]',
      '( )',
      '=>',
      '::',
      '&&',
      '||',
      '!=',
      '==',
      '+=',
      '--',
      '/* */',
      '//',
      '#'
    ];
    return range(14).map((i) => {
      const x = (i * 7 + 11) % 100;
      const y = (i * 13 + 18) % 100;
      const dur = 22 + (i % 6) * 6; // 22..52s
      const delay = (i % 7) * -1.8;
      const text = bits[i % bits.length];
      const hue = i % 3;
      return { i, x, y, dur, delay, text, hue };
    });
  }, []);

  const glyphs = useMemo(() => {
    // Mix of coding symbols + simple “tech logo” glyphs (not trademarked).
    const symbols = ['</>', '{ }', '[ ]', '( )', '⌘', 'λ', '∑', 'π', '∞', '≠', '≈', '⊕', '⊗', '⇢', '⟲', '⟡'];
    const kinds = ['symbol', 'icon'];

    return range(22).map((i) => {
      const x = (i * 11 + 5) % 100;
      const y = (i * 17 + 9) % 100;
      const dur = 26 + (i % 8) * 6; // 26..68s
      const delay = (i % 9) * -1.7;
      const hue = i % 3;
      const size = 12 + ((i * 7) % 18); // 12..29px
      const rot = ((i * 37) % 60) - 30; // -30..30deg
      const kind = kinds[i % kinds.length];
      const text = symbols[i % symbols.length];
      const iconType = i % 3; // 0..2
      return { i, x, y, dur, delay, hue, size, rot, kind, text, iconType };
    });
  }, []);

  const particles = useMemo(() => {
    // Slow drifting particles/orbs for “premium landing” vibe.
    return range(28).map((i) => {
      const left = (i * 13 + 7) % 100;
      const top = (i * 17 + 11) % 100;
      const size = 2 + (i % 6); // 2..7px
      const dur = 26 + (i % 7) * 7; // 26..68s
      const delay = (i % 9) * -2.2;
      const dx1 = ((i % 5) - 2) * (10 + (i % 3) * 8);
      const dy1 = (((i + 2) % 5) - 2) * (10 + (i % 4) * 7);
      const dx2 = -dx1;
      const dy2 = -dy1;
      const hue = i % 3;
      return { i, left, top, size, dur, delay, dx1, dy1, dx2, dy2, hue };
    });
  }, []);

  if (reducedMotion) {
    return <div className="techFx" aria-hidden="true" />;
  }

  return (
    <div className="techFx" aria-hidden="true">
      <div className="techFx__vignette" />
      <div className="techFx__grid" />

      {/* Cursor-reactive neon lighting */}
      <div className="techFx__cursorLight" />
      <div className="techFx__cursorLight techFx__cursorLight--b" />

      <svg className="techFx__circuits" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <g className="circuitSet">
          <path d="M60 120 H420 V220 H640" />
          <path d="M220 520 H520 V380 H900" />
          <path d="M980 120 H760 V320 H520" />
          <path d="M1040 660 H780 V540 H540 V700" />
          <path d="M120 700 H380 V560 H440" />
        </g>
        <g className="circuitNodes">
          <circle cx="60" cy="120" r="3" />
          <circle cx="420" cy="220" r="3" />
          <circle cx="640" cy="220" r="3" />
          <circle cx="220" cy="520" r="3" />
          <circle cx="900" cy="380" r="3" />
          <circle cx="980" cy="120" r="3" />
          <circle cx="520" cy="320" r="3" />
          <circle cx="1040" cy="660" r="3" />
          <circle cx="540" cy="700" r="3" />
          <circle cx="120" cy="700" r="3" />
          <circle cx="440" cy="560" r="3" />
        </g>
      </svg>

      <div className="techFx__particles">
        {particles.map((p) => (
          <span
            key={p.i}
            className={`particle particle--h${p.hue}`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              ['--dx1']: `${p.dx1}px`,
              ['--dy1']: `${p.dy1}px`,
              ['--dx2']: `${p.dx2}px`,
              ['--dy2']: `${p.dy2}px`
            }}
          />
        ))}
      </div>

      <div className="techFx__code">
        {codeCols.map((c) => (
          <div
            key={c.i}
            className="codeCol"
            style={{
              left: `${c.x}%`,
              animationDuration: `${c.dur}s`,
              animationDelay: `${c.delay}s`,
              opacity: c.opacity
            }}
          >
            {c.text}
          </div>
        ))}
      </div>

      <div className="techFx__syntax">
        {syntaxBits.map((b) => (
          <span
            key={b.i}
            className={`syntaxBit syntaxBit--h${b.hue}`}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`
            }}
          >
            {b.text}
          </span>
        ))}
      </div>

      <div className="techFx__glyphs">
        {glyphs.map((g) => (
          <span
            key={g.i}
            className={`glyph glyph--h${g.hue} ${g.kind === 'icon' ? 'glyph--icon' : 'glyph--symbol'}`}
            style={{
              left: `${g.x}%`,
              top: `${g.y}%`,
              animationDuration: `${g.dur}s`,
              animationDelay: `${g.delay}s`,
              ['--sz']: `${g.size}px`,
              ['--rot']: `${g.rot}deg`
            }}
          >
            {g.kind === 'icon' ? (
              <svg
                className="glyphSvg"
                viewBox="0 0 64 64"
                aria-hidden="true"
                focusable="false"
              >
                {g.iconType === 0 ? (
                  // Brackets mark
                  <path d="M22 14h-6v36h6M42 14h6v36h-6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                ) : g.iconType === 1 ? (
                  // Terminal prompt
                  <>
                    <rect x="12" y="16" width="40" height="32" rx="6" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path d="M22 30l8 6-8 6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M34 42h10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </>
                ) : (
                  // Simple chip
                  <>
                    <rect x="18" y="18" width="28" height="28" rx="6" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path d="M14 24h4M14 32h4M14 40h4M46 24h4M46 32h4M46 40h4M24 14v4M32 14v4M40 14v4M24 46v4M32 46v4M40 46v4" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </>
                )}
              </svg>
            ) : (
              g.text
            )}
          </span>
        ))}
      </div>

      <div className="techFx__shards">
        {shards.map((s) => (
          <span
            key={s.i}
            className={`shard shard--h${s.hue}`}
            style={{
              left: `${s.x}%`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
              transform: `translate3d(0,0,0) scale(${s.scale})`
            }}
          />
        ))}
      </div>
    </div>
  );
}
