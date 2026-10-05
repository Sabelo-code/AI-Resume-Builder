import { SECTION_META } from '../../data/constants.js';
import { useResume } from '../../context/ResumeContext.jsx';

export default function SectionsTab() {
  const { sections, toggleSection, personalInfo, updatePersonalInfo } = useResume();

  return (
    <div>
      <div className="rb-hint">Turn sections on or off — only enabled sections with content show up in the preview and PDF.</div>
      {SECTION_META.map((s) => (
        <div className="rb-sectionrow" key={s.key}>
          <div className="rb-sectionrow-label"><s.icon size={16} color="var(--rb-navy)" /> {s.label}</div>
          <button className={`rb-switch ${sections[s.key] ? 'on' : ''}`} onClick={() => toggleSection(s.key)} aria-label={`Toggle ${s.label}`}>
            <span />
          </button>
        </div>
      ))}
      {sections.personalInfo && (
        <div style={{ marginTop: 16 }}>
          <div className="rb-subhead">Personal information fields</div>
          <div className="rb-hint">Optional — some employers and ATS profiles prefer these left off. Include them only if you want to.</div>
          <div className="rb-row2">
            <div className="rb-field"><label>Gender</label>
              <input value={personalInfo.gender} onChange={(e) => updatePersonalInfo('gender', e.target.value)} /></div>
            <div className="rb-field"><label>Place</label>
              <input value={personalInfo.place} onChange={(e) => updatePersonalInfo('place', e.target.value)} /></div>
            <div className="rb-field"><label>Date of birth</label>
              <input value={personalInfo.dob} onChange={(e) => updatePersonalInfo('dob', e.target.value)} /></div>
          </div>
        </div>
      )}
    </div>
  );
}
