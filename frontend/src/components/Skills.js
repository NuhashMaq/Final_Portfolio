import React from 'react';
import './Skills.css';

export default function Skills({ skills }) {
  return (
    <section className="section" id="skills">
      <div className="sectionInner reveal">
        <div className="sectionHead">
          <h2 className="sectionTitle--caps">Skills</h2>
        </div>

        {skills?.length ? (
          <div className="skillsMarqueeStack gsap-stagger">
            {skills.map((cat, idx) => {
              const items = cat.items || [];
              // Deduplicate by skill name to keep counts accurate even if DB contains duplicates.
              const uniqueItems = Array.from(
                new Map(items.map((s) => [String(s.name || '').trim().toLowerCase(), s])).values()
              ).filter((s) => s && s.name);

              const uniqueCount = uniqueItems.length;
              const doubled = uniqueItems.concat(uniqueItems);
              const duration = Math.max(18, Math.min(42, uniqueCount * 2.2));

              return (
                <div className="skillsMarqueeCard gsap-item" key={cat.category}>
                  <div className="skillsMarqueeHead">
                    <span className="catPill">{cat.category}</span>
                    <span className="skillsMeta">{uniqueCount} items</span>
                  </div>

                  <div className="skillsMarqueeViewport" aria-label={`${cat.category} skills`}>
                    <div
                      className={`skillsTrack ${idx % 2 ? 'skillsTrack--rev' : ''}`}
                      style={{ '--dur': `${duration}s` }}
                    >
                      {doubled.map((s, j) => (
                        <span className="skillPill" key={`${cat.category}-${s.id ?? s.name}-${j}`}>{s.name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty">No skills yet—seed the database to load sample data.</div>
        )}
      </div>
    </section>
  );
}
