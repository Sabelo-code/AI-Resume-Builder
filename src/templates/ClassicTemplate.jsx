import { Target, Contact, BookOpen, Mail, UserCircle2, Layers, Award, Briefcase, Trophy, MapPin, Phone } from 'lucide-react';
import { visible } from './shared.js';
import './ClassicTemplate.css';

function Heading({ icon: Icon, children }) {
  return (
    <div className="tc-heading">
      <Icon size={20} className="tc-heading-icon" />
      <span>{children}</span>
    </div>
  );
}

export default function ClassicTemplate({ data }) {
  const { personal, personalInfo, sections, experience, education, skills, projects, certifications, research, awards } = data;
  const contactParts = [personal.phone, personal.email].filter(Boolean);

  return (
    <div className="tc-sheet">
      <div className="tc-name">{personal.name || 'Your Name'}</div>
      {personal.location && <div className="tc-contact-line"><MapPin size={13} />{personal.location}</div>}
      {contactParts.length > 0 && (
        <div className="tc-contact-line">
          {personal.phone && <><Phone size={13} />{personal.phone}</>}
          {personal.email && <><Mail size={13} style={{ marginLeft: personal.phone ? 10 : 0 }} />{personal.email}</>}
        </div>
      )}
      {personal.links && <div className="tc-contact-line">{personal.links}</div>}

      {sections.objective && personal.summary && (
        <>
          <Heading icon={Target}>Objective</Heading>
          <div className="tc-para">{personal.summary}</div>
        </>
      )}

      {sections.personalInfo && (personalInfo.gender || personalInfo.place || personalInfo.dob) && (
        <>
          <Heading icon={Contact}>Personal information</Heading>
          <ul className="tc-plainlist">
            {personalInfo.gender && <li>Gender: {personalInfo.gender}</li>}
            {personalInfo.place && <li>Place: {personalInfo.place}</li>}
            {personalInfo.dob && <li>Date of birth: {personalInfo.dob}</li>}
          </ul>
        </>
      )}

      {sections.education && visible(education).length > 0 && (
        <>
          <Heading icon={BookOpen}>Education</Heading>
          {visible(education).map((e) => (
            <div className="tc-item" key={e.id}>
              <div className="tc-row"><strong>{e.institution}</strong>{e.year && <span className="tc-date">{e.year}</span>}</div>
              {e.degree && <div className="tc-sub">{e.degree}</div>}
              {e.details && <div className="tc-para">{e.details}</div>}
            </div>
          ))}
        </>
      )}

      {sections.experience && visible(experience).length > 0 && (
        <>
          <Heading icon={Mail}>Experience</Heading>
          {visible(experience).map((e) => (
            <div className="tc-item" key={e.id}>
              <div className="tc-row"><strong>{e.company}</strong>{(e.start || e.end) && <span className="tc-date">{[e.start, e.end].filter(Boolean).join(' - ')}</span>}</div>
              {e.role && <div className="tc-sub">{e.role}</div>}
              {e.bullets.filter(Boolean).length > 0 && <div className="tc-para">{e.bullets.filter(Boolean).join(' ')}</div>}
            </div>
          ))}
        </>
      )}

      {sections.skills && skills.length > 0 && (
        <>
          <Heading icon={UserCircle2}>Skills</Heading>
          <div className="tc-skills">{skills.map((s, i) => <span className="tc-chip" key={i}>{s}</span>)}</div>
        </>
      )}

      {sections.projects && visible(projects).length > 0 && (
        <>
          <Heading icon={Layers}>Project</Heading>
          {visible(projects).map((p) => (
            <div className="tc-item" key={p.id}>
              {p.role && <div className="tc-role">{p.role}</div>}
              <div className="tc-sub">{p.name}</div>
              {(p.context || p.year) && <div className="tc-date-line">{[p.context, p.year].filter(Boolean).join(' | ')}</div>}
              {p.description && <div className="tc-para">{p.description}</div>}
            </div>
          ))}
        </>
      )}

      {sections.certifications && visible(certifications).length > 0 && (
        <>
          <Heading icon={Award}>Certification</Heading>
          {visible(certifications).map((c) => (
            <div className="tc-item" key={c.id}>
              <div className="tc-role">{c.name}</div>
              {(c.issuer || c.year) && <div className="tc-date-line">{[c.issuer, c.year].filter(Boolean).join(' — ')}</div>}
            </div>
          ))}
        </>
      )}

      {sections.research && visible(research).length > 0 && (
        <>
          <Heading icon={Briefcase}>Research</Heading>
          {visible(research).map((r) => (
            <div className="tc-item" key={r.id}>
              <div className="tc-role">{r.role ? `${r.role} - ${r.title}` : r.title}</div>
              {(r.context || r.year) && <div className="tc-date-line">{[r.context, r.year].filter(Boolean).join(' | ')}</div>}
              {r.description && <div className="tc-para">{r.description}</div>}
            </div>
          ))}
        </>
      )}

      {sections.awards && visible(awards).length > 0 && (
        <>
          <Heading icon={Trophy}>Awards</Heading>
          {visible(awards).map((a) => (
            <div className="tc-item" key={a.id}>
              <div className="tc-role">{a.title}</div>
              {a.description && <div className="tc-para">{a.description}</div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
