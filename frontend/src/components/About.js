import React from 'react';
import './About.css';

export default function About({ profile }) {
  const about = profile?.about;
  return (
    <section className="section" id="about">
      <div className="sectionInner reveal">
        <div className="sectionHead">
          <h2 className="sectionTitle--caps">About</h2>
        </div>

        <div className="aboutCard">
          {about ? (
            <p>{about}</p>
          ) : (
            <p>
              Add your “About me” summary here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
