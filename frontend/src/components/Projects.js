import React from 'react';
import './Projects.css';

export default function Projects({ projects }) {
  return (
    <section className="section" id="projects">
      <div className="sectionInner reveal">
        <div className="sectionHead">
          <h2 className="sectionTitle--caps">Projects</h2>
        </div>

        {projects?.length ? (
          <div className="grid gsap-stagger">
            {projects.map((p) => (
              <article key={p.id} className="card gsap-item">
                <div className="thumb" aria-hidden="true">
                  {p.image ? (
                    <img
                      className="thumbImg"
                      src={p.image.startsWith('http') ? p.image : (p.image.startsWith('/') ? p.image : `/${p.image}`)}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        // Hide broken images but keep the thumbnail container.
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="thumbLabel">Preview</span>
                  )}
                  <span className="thumbGlow" />
                </div>
                <h3>{p.title}</h3>
                <p className="desc">{p.description}</p>
                <div className="tags">
                  {(p.technologies || []).map((t, i) => (
                    <span className="tag" key={`${p.id}-${i}`}>{t}</span>
                  ))}
                </div>
                {p.link ? (
                  <a className="link" href={p.link} target="_blank" rel="noreferrer">Open →</a>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">No projects yet—run <code>backend/seed.py</code> to load sample data.</div>
        )}
      </div>
    </section>
  );
}
