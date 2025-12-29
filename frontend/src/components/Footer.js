import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

export default function Footer({ profile }) {
  const links = profile?.links || {};
  const fullName = profile?.fullName || 'Mashfiq Naushad';
  return (
    <footer className="footer">
      <div className="footerInner">
        <div className="footerLeft">
          <a className="footerName" href="#home">{fullName}</a>
          <div className="copy">Copyright @__maashfiiiiq__ | All rights are reserved | 2025</div>
        </div>
        <div className="social">
          {links.linkedin ? (
            <a className="socialIcon" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn className="socialSvg" aria-hidden="true" />
            </a>
          ) : null}
          {links.facebook ? (
            <a className="socialIcon" href={links.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF className="socialSvg" aria-hidden="true" />
            </a>
          ) : null}
          {links.instagram ? (
            <a className="socialIcon" href={links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram className="socialSvg" aria-hidden="true" />
            </a>
          ) : null}
          {links.twitter ? (
            <a className="socialIcon" href={links.twitter} target="_blank" rel="noreferrer" aria-label="X (Twitter)">
              <FaXTwitter className="socialSvg" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
