import React from 'react';
import './ResumeSections.css';

export default function Certifications({ items }) {
  return (
    <section className="section" id="certifications">
      <div className="sectionInner reveal">
        <div className="sectionHead">
          <h2 className="sectionTitle--caps">Certifications</h2>
        </div>

        {items?.length ? (
          <div className="resumeGrid gsap-stagger">
            {items.map((c, idx) => (
              <article className="resumeCard gsap-item" key={`${c.title}-${idx}`}>
                <div className="resumeTitle resumeTitle--caps">{c.title}</div>
                {c.issuer ? <div className="resumeOrg">{c.issuer}</div> : null}
                {c.type ? <div className="resumeMeta">{c.type}</div> : null}
                {c.keywords?.length ? (
                  <div className="tags" style={{ marginTop: 10 }}>
                    {c.keywords.map((k, i) => (
                      <span className="tag" key={`${c.title}-k-${i}`}>{k}</span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">No certifications yet.</div>
        )}
      </div>
    </section>
  );
}
