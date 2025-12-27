import React from 'react';
import './Footer.css';

export default function Footer({ profile }) {
  const year = new Date().getFullYear();
  const links = profile?.links || {};
  return (
    <footer className="footer">
      <div className="footerInner">
        <div className="copy">© {year} {profile?.fullName || 'Your Name'}</div>
        <div className="social">
          {links.linkedin ? <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : null}
          {links.facebook ? <a href={links.facebook} target="_blank" rel="noreferrer">Facebook</a> : null}
          {links.portfolio ? <a href={links.portfolio} target="_blank" rel="noreferrer">Portfolio</a> : null}
        </div>
      </div>
    </footer>
  );
}
