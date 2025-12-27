import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Activities from './components/Activities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { apiGet } from './api';
import './App.css';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [apiOk, setApiOk] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        await apiGet('/api/health');
        const [prof, p, s, exp, edu, certs, acts] = await Promise.all([
          apiGet('/api/profile'),
          apiGet('/api/projects'),
          apiGet('/api/skills'),
          apiGet('/api/experience'),
          apiGet('/api/education'),
          apiGet('/api/certifications'),
          apiGet('/api/activities')
        ]);
        if (!mounted) return;
        setProfile(prof);
        setProjects(p);
        setSkills(s);
        setExperience(exp);
        setEducation(edu);
        setCertifications(certs);
        setActivities(acts);
        setApiOk(true);
      } catch (e) {
        if (!mounted) return;
        console.error(e);
        setApiOk(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Lightweight scroll-reveal animation (no libraries):
  // adds .reveal--in when elements enter the viewport.
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('.reveal'));
    if (!targets.length) return;

    // If IntersectionObserver isn't available, just show everything.
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('reveal--in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--in');
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="app">
      <Navigation profile={profile} />
      {!apiOk ? (
        <div className="apiBanner">
          Backend not reachable. Start the Flask server on <code>http://localhost:5000</code>.
        </div>
      ) : null}
      <main>
        <Hero profile={profile} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Experience items={experience} />
        <Education items={education} />
        <Certifications items={certifications} />
        <Activities items={activities} />
        <About profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
