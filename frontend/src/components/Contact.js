import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { apiPost } from '../api';
import './Contact.css';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [delivery, setDelivery] = useState(null);

  const links = profile?.links || {};

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await apiPost('/api/contact', form);
      setDelivery(res?.emailDelivery || null);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <section className="section" id="contact">
      <div className="sectionInner reveal">
        <div className="sectionHead">
          <h2 className="sectionTitle--caps">Contact</h2>
        </div>

        <div className="contactLayout">
          <div className="contactInfo">
            <div className="contactInfoCard gsap-item">
              <div className="contactName">{profile?.fullName || 'Your Name'}</div>
              {profile?.email ? (
                <a className="contactLink" href={`mailto:${profile.email}`}>{profile.email}</a>
              ) : null}
              {profile?.phone ? (
                <a className="contactLink" href={`tel:${profile.phone}`}>{profile.phone}</a>
              ) : null}
              {profile?.location ? <div className="contactMeta">{profile.location}</div> : null}
              <div className="contactSocial">
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
          </div>

          <form className="contactCard gsap-item" onSubmit={onSubmit}>
          <div className="row">
            <label>
              Name
              <input name="name" value={form.name} onChange={onChange} required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={onChange} required />
            </label>
          </div>
          <label>
            Message
            <textarea name="message" rows={5} value={form.message} onChange={onChange} required />
          </label>

          <div className="actions">
            <button className="btnGhost" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
            {status === 'sent' ? (
              <span className="ok">
                Sent!{delivery?.sent === false ? ' (Saved, email delivery pending.)' : ''}
              </span>
            ) : null}
            {status === 'error' ? <span className="bad">Something went wrong.</span> : null}
          </div>
          </form>
        </div>
      </div>
    </section>
  );
}
