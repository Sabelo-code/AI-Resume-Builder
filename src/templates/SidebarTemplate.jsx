import { Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';
import { visible } from './shared.js';
import './SidebarTemplate.css';

function SideHeading({ children }) {
  return <div className="ts-side-heading">{children}</div>;
}
function MainHeading({ children }) {
  return <div className="ts-main-heading">{children}</div>;
}

export default function SidebarTemplate({ data }) {
  const { personal, personalInfo, sections, experience, education, skills, projects, certifications, research, awards } = data;

  return (
    <div className="ts-sheet">
      <aside className="ts-side">
        <div className="ts-side-name">{personal.name || 'Your Name'}</div>
        {personal.title && <div className="ts-side-title">{personal.title}</div>}

        <div className="ts-side-block">
          {personal.email && <div className="ts-side-contact"><Mail size={12} />{personal.email}</div>}
          {personal.phone && <div className="ts-side-contact"><Phone size={12} />{personal.phone}</div>}
          {personal.location && <div className="ts-side-contact"><MapPin size={12} />{personal.location}</div>}
          {personal.links && <div className="ts-side-contact"><LinkIcon size={12} />{personal.links}</div>}
        </div>

        {sections.skills && skills.length > 0 && (
          <div className="ts-side-block">
            <SideHeading>Skills</SideHeading>
            <div className="ts-side-skills">{skills.map((s, i) => <span key={i} className="ts-side-chip">{s}</span>)}</div>
          </div>
        )}

        {sections.education && visible(education).length > 0 && (
          <div className="ts-side-block">
            <SideHeading>Education</SideHeading>
            {visible(education).map((e) => (
              <div key={e.id} className="ts-side-item">
                <div className="ts-side-item-title">{e.degree}</div>
                <div className="ts-side-item-sub">{e.institution}{e.year ? ` · ${e.year}` : ''}</div>
              </div>
            ))}
          </div>
        )}

        {sections.certifications && visible(certifications).length > 0 && (
          <div className="ts-side-block">
            <SideHeading>Certifications</SideHeading>
            {visible(certifications).map((c) => (
              <div key={c.id} className="ts-side-item">
                <div className="ts-side-item-title">{c.name}</div>
                {(c.issuer || c.year) && <div className="ts-side-item-sub">{[c.issuer, c.year].filter(Boolean).join(' · ')}</div>}
              </div>
            ))}
          </div>
        )}

        {sections.personalInfo && (personalInfo.gender || personalInfo.place || personalInfo.dob) && (
          <div className="ts-side-block">
            <SideHeading>Personal information</SideHeading>
            {personalInfo.gender && <div className="ts-side-item-sub">Gender: {personalInfo.gender}</div>}
            {personalInfo.place && <div className="ts-side-item-sub">Place: {personalInfo.place}</div>}
            {personalInfo.dob && <div className="ts-side-item-sub">DOB: {personalInfo.dob}</div>}
          </div>
        )}
      </aside>

      <main className="ts-main">
        {sections.objective && personal.summary && (
          <section className="ts-main-block">
            <MainHeading>Profile</MainHeading>
            <p className="ts-main-para">{personal.summary}</p>
          </section>
        )}

        {sections.experience && visible(experience).length > 0 && (
          <section className="ts-main-block">
            <MainHeading>Experience</MainHeading>
            {visible(experience).map((e) => (
              <div key={e.id} className="ts-main-item">
                <div className="ts-main-row">
                  <span className="ts-main-role">{e.role}</span>
                  <span className="ts-main-date">{[e.start, e.end].filter(Boolean).join(' – ')}</span>
                </div>
                <div className="ts-main-company">{e.company}</div>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul className="ts-main-bullets">
                    {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {sections.projects && visible(projects).length > 0 && (
          <section className="ts-main-block">
            <MainHeading>Projects</MainHeading>
            {visible(projects).map((p) => (
              <div key={p.id} className="ts-main-item">
                <div className="ts-main-row">
                  <span className="ts-main-role">{p.name}</span>
                  <span className="ts-main-date">{[p.context, p.year].filter(Boolean).join(', ')}</span>
                </div>
                {p.role && <div className="ts-main-company">{p.role}</div>}
                {p.description && <p className="ts-main-para">{p.description}</p>}
              </div>
            ))}
          </section>
        )}

        {sections.research && visible(research).length > 0 && (
          <section className="ts-main-block">
            <MainHeading>Research</MainHeading>
            {visible(research).map((r) => (
              <div key={r.id} className="ts-main-item">
                <div className="ts-main-row">
                  <span className="ts-main-role">{r.title}</span>
                  <span className="ts-main-date">{[r.context, r.year].filter(Boolean).join(', ')}</span>
                </div>
                {r.role && <div className="ts-main-company">{r.role}</div>}
                {r.description && <p className="ts-main-para">{r.description}</p>}
              </div>
            ))}
          </section>
        )}

        {sections.awards && visible(awards).length > 0 && (
          <section className="ts-main-block">
            <MainHeading>Awards</MainHeading>
            {visible(awards).map((a) => (
              <div key={a.id} className="ts-main-item">
                <div className="ts-main-row"><span className="ts-main-role">{a.title}</span><span className="ts-main-date">{a.year}</span></div>
                {a.description && <p className="ts-main-para">{a.description}</p>}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
