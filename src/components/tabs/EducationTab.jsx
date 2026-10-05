import { Trash2, Plus } from 'lucide-react';
import { useResume } from '../../context/ResumeContext.jsx';

export default function EducationTab() {
  const { education, updateEducation, addEducation, removeEducation } = useResume();

  return (
    <div>
      {education.map((ed) => (
        <div className="rb-card" key={ed.id}>
          <div className="rb-card-head">
            <strong>{ed.institution || 'New entry'}</strong>
            <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => removeEducation(ed.id)}><Trash2 size={13} /> Remove</button>
          </div>
          <div className="rb-row2">
            <div className="rb-field"><label>Institution</label>
              <input value={ed.institution} onChange={(e) => updateEducation(ed.id, 'institution', e.target.value)} placeholder="University of KwaZulu-Natal" /></div>
            <div className="rb-field"><label>Degree / qualification</label>
              <input value={ed.degree} onChange={(e) => updateEducation(ed.id, 'degree', e.target.value)} placeholder="BSc. Computer Science" /></div>
            <div className="rb-field"><label>Year</label>
              <input value={ed.year} onChange={(e) => updateEducation(ed.id, 'year', e.target.value)} placeholder="2024" /></div>
          </div>
          <div className="rb-field"><label>Details</label>
            <input value={ed.details} onChange={(e) => updateEducation(ed.id, 'details', e.target.value)} placeholder="Optional — honors, relevant coursework, etc." /></div>
        </div>
      ))}
      <button className="rb-btn rb-btn-primary" onClick={addEducation}><Plus size={15} /> Add education</button>
    </div>
  );
}
