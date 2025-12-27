import React from 'react';
import './ResumeSections.css';

export default function Experience({ items }) {
  return (
    <section className="section" id="experience">
      <div className="sectionInner reveal">
        <div className="sectionHead">
          <h2 className="sectionTitle--caps">Work Experience</h2>
        </div>

        {items?.length ? (
          <div className="resumeList">
            {items.map((x, idx) => (
              <article className="resumeCard" key={`${x.company}-${idx}`}>
                <div className="resumeTop">
                  <div>
                    <div className="resumeTitle resumeTitle--caps">{x.role}</div>
                    <div className="resumeOrg">{x.company}</div>
                  </div>
                  <div className="resumeMeta">{x.start} — {x.end}</div>
                </div>
                {x.highlights?.length ? (
                  <ul className="resumeBullets">
                    {x.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">No experience added yet.</div>
        )}
      </div>
    </section>
  );
}
