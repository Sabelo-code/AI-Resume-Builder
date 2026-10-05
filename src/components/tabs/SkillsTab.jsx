import { X } from 'lucide-react';
import { useResume } from '../../context/ResumeContext.jsx';

export default function SkillsTab() {
  const { skills, removeSkill, addSkill, skillInput, setSkillInput } = useResume();

  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        {skills.map((s, i) => (
          <span className="rb-skillchip" key={i}>
            {s}
            <button onClick={() => removeSkill(i)} aria-label={`Remove ${s}`}><X size={13} /></button>
          </span>
        ))}
      </div>
      <div className="rb-addrow">
        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
          placeholder="Add a skill and press Enter"
        />
        <button className="rb-btn rb-btn-primary" onClick={addSkill}>Add</button>
      </div>
    </div>
  );
}
