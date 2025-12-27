import React from 'react';
import './ResumeSections.css';

export default function Activities({ items }) {
  return (
    <section className="section" id="activities">
      <div className="sectionInner reveal">
        <div className="sectionHead">
          <h2 className="sectionTitle--caps">Extracurricular</h2>
        </div>

        {items?.length ? (
          <div className="resumeGrid">
            {items.map((a, idx) => (
              <article className="resumeCard" key={`${a.role}-${idx}`}>
                <div className="resumeTitle resumeTitle--caps">{a.role}</div>
                <div className="resumeOrg">{a.organization}</div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">No activities listed yet.</div>
        )}
      </div>
    </section>
  );
}
