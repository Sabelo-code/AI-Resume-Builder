import { Check } from 'lucide-react';
import { TEMPLATES } from '../../templates/index.js';
import { useResume } from '../../context/ResumeContext.jsx';

export default function TemplateTab() {
  const { templateId, setTemplateId } = useResume();

  return (
    <div>
      <div className="rb-hint">Pick a CV template. Your content stays the same — only the layout changes.</div>
      <div className="rb-template-grid">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            className={`rb-template-card ${templateId === t.id ? 'active' : ''}`}
            onClick={() => setTemplateId(t.id)}
          >
            <div className="rb-template-card-head">
              <span>{t.name}</span>
              {templateId === t.id && <Check size={16} color="var(--rb-navy)" />}
            </div>
            <p>{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
