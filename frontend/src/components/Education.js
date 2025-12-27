import React from 'react';
import './ResumeSections.css';

export default function Education({ items }) {
  return (
    <section className="section" id="education">
      <div className="sectionInner reveal">
        <div className="sectionHead">
          <h2 className="sectionTitle--caps">EDUCATION</h2>
        </div>

        {items?.length ? (
          <div className="resumeList">
            {items.map((e, idx) => (
              <article className="resumeCard" key={`${e.institution}-${idx}`}>
                <div className="resumeTop">
                  <div>
                    <div className="resumeTitle resumeTitle--caps">{e.degree}</div>
                    <div className="resumeOrg">{e.institution}</div>
                  </div>
                </div>
                {e.major ? <div className="resumeMeta">Major: {e.major}</div> : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">No education entries yet.</div>
        )}
      </div>
    </section>
  );
}
