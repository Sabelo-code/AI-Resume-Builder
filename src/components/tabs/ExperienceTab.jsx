import { Trash2, Plus, X, EyeOff, Eye } from 'lucide-react';
import { useResume } from '../../context/ResumeContext.jsx';

export default function ExperienceTab() {
  const {
    experience, updateExperience, addExperience, removeExperience, toggleExperienceInclude,
    updateBullet, addBullet, removeBullet
  } = useResume();

  return (
    <div>
      {experience.map((exp) => (
        <div className={`rb-card ${exp.include === false ? 'rb-card-excluded' : ''}`} key={exp.id}>
          <div className="rb-card-head">
            <strong>{exp.role || 'New role'}{exp.include === false ? ' (hidden from CV)' : ''}</strong>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => toggleExperienceInclude(exp.id)} title={exp.include === false ? 'Show on CV' : 'Hide from CV'}>
                {exp.include === false ? <Eye size={13} /> : <EyeOff size={13} />} {exp.include === false ? 'Show' : 'Hide'}
              </button>
              <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => removeExperience(exp.id)}><Trash2 size={13} /> Remove</button>
            </div>
          </div>
          <div className="rb-row2">
            <div className="rb-field"><label>Role</label>
              <input value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} placeholder="Software Engineer" /></div>
            <div className="rb-field"><label>Company</label>
              <input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Acme Inc" /></div>
            <div className="rb-field"><label>Start</label>
              <input value={exp.start} onChange={(e) => updateExperience(exp.id, 'start', e.target.value)} placeholder="Jan 2022" /></div>
            <div className="rb-field"><label>End</label>
              <input value={exp.end} onChange={(e) => updateExperience(exp.id, 'end', e.target.value)} placeholder="Present" /></div>
          </div>
          <label className="rb-label-sm">Bullets</label>
          {exp.bullets.map((b, i) => (
            <div className="rb-bullet-row" key={i}>
              <textarea value={b} onChange={(e) => updateBullet(exp.id, i, e.target.value)} placeholder="Describe what you did and the outcome" />
              <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => removeBullet(exp.id, i)}><X size={14} /></button>
            </div>
          ))}
          <button className="rb-btn rb-btn-sm" onClick={() => addBullet(exp.id)}><Plus size={13} /> Add bullet</button>
        </div>
      ))}
      <button className="rb-btn rb-btn-primary" onClick={addExperience}><Plus size={15} /> Add experience</button>
    </div>
  );
}
