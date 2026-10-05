import { visible } from './shared.js';
import './ModernTemplate.css';

function Heading({ children }) {
  return <div className="tm-heading">{children}</div>;
}

export default function ModernTemplate({ data }) {
  const { personal, personalInfo, sections, experience, education, skills, projects, certifications, research, awards } = data;
  const contact = [personal.phone, personal.email, personal.location, personal.links].filter(Boolean);

  return (
    <div className="tm-sheet">
      <div className="tm-header">
        <div className="tm-name">{personal.name || 'Your Name'}</div>
        {personal.title && <div className="tm-title">{personal.title}</div>}
        {contact.length > 0 && <div className="tm-contact">{contact.join('  ·  ')}</div>}
      </div>

      {sections.objective && personal.summary && (
        <section>
          <Heading>Summary</Heading>
          <p className="tm-para">{personal.summary}</p>
        </section>
      )}

      {sections.experience && visible(experience).length > 0 && (
        <section>
          <Heading>Experience</Heading>
          {visible(experience).map((e) => (
            <div className="tm-item" key={e.id}>
              <div className="tm-row">
                <span className="tm-role">{e.role}{e.company ? `, ${e.company}` : ''}</span>
                <span className="tm-date">{[e.start, e.end].filter(Boolean).join(' – ')}</span>
              </div>
              {e.bullets.filter(Boolean).length > 0 && (
                <ul className="tm-bullets">
                  {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {sections.education && visible(education).length > 0 && (
        <section>
          <Heading>Education</Heading>
          {visible(education).map((e) => (
            <div className="tm-item" key={e.id}>
              <div className="tm-row">
                <span className="tm-role">{e.degree}{e.institution ? `, ${e.institution}` : ''}</span>
                <span className="tm-date">{e.year}</span>
              </div>
              {e.details && <p className="tm-para">{e.details}</p>}
            </div>
          ))}
        </section>
      )}

      {sections.skills && skills.length > 0 && (
        <section>
          <Heading>Skills</Heading>
          <p className="tm-para">{skills.join(', ')}</p>
        </section>
      )}

      {sections.projects && visible(projects).length > 0 && (
        <section>
          <Heading>Projects</Heading>
          {visible(projects).map((p) => (
            <div className="tm-item" key={p.id}>
              <div className="tm-row">
                <span className="tm-role">{p.name}{p.role ? ` — ${p.role}` : ''}</span>
                <span className="tm-date">{[p.context, p.year].filter(Boolean).join(', ')}</span>
              </div>
              {p.description && <p className="tm-para">{p.description}</p>}
            </div>
          ))}
        </section>
      )}

      {sections.certifications && visible(certifications).length > 0 && (
        <section>
          <Heading>Certifications</Heading>
          <p className="tm-para">{visible(certifications).map((c) => [c.name, c.issuer, c.year].filter(Boolean).join(' — ')).join('; ')}</p>
        </section>
      )}

      {sections.research && visible(research).length > 0 && (
        <section>
          <Heading>Research</Heading>
          {visible(research).map((r) => (
            <div className="tm-item" key={r.id}>
              <div className="tm-row">
                <span className="tm-role">{r.title}{r.role ? ` — ${r.role}` : ''}</span>
                <span className="tm-date">{[r.context, r.year].filter(Boolean).join(', ')}</span>
              </div>
              {r.description && <p className="tm-para">{r.description}</p>}
            </div>
          ))}
        </section>
      )}

      {sections.awards && visible(awards).length > 0 && (
        <section>
          <Heading>Awards</Heading>
          {visible(awards).map((a) => (
            <div className="tm-item" key={a.id}>
              <div className="tm-row"><span className="tm-role">{a.title}</span><span className="tm-date">{a.year}</span></div>
              {a.description && <p className="tm-para">{a.description}</p>}
            </div>
          ))}
        </section>
      )}

      {sections.personalInfo && (personalInfo.gender || personalInfo.place || personalInfo.dob) && (
        <section>
          <Heading>Personal information</Heading>
          <p className="tm-para">
            {[personalInfo.gender && `Gender: ${personalInfo.gender}`, personalInfo.place && `Place: ${personalInfo.place}`, personalInfo.dob && `Date of birth: ${personalInfo.dob}`].filter(Boolean).join('  ·  ')}
          </p>
        </section>
      )}

      <div className="tm-machine-note">Formatted for maximum ATS parseability — plain structure, no tables or icons.</div>
    </div>
  );
}
