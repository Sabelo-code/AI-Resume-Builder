import { Scissors, Target, ListChecks, X } from 'lucide-react';
import { TAILOR_MODES } from '../../data/constants.js';

const OPTIONS = [
  {
    mode: TAILOR_MODES.REMOVE,
    icon: Scissors,
    title: 'Remove unrelated info',
    description: 'Hide experience, projects, skills, etc. that don\u2019t support this specific role. Nothing is deleted — you can bring anything back later.'
  },
  {
    mode: TAILOR_MODES.TAILOR,
    icon: Target,
    title: 'Tailor to this role',
    description: 'Keep every entry you\u2019ve added, but reorder and reword so the most relevant material stands out first.'
  },
  {
    mode: TAILOR_MODES.ALL,
    icon: ListChecks,
    title: 'Use everything as-is',
    description: 'Keep your original emphasis and ordering. Just polish wording and still score it honestly against the posting.'
  }
];

export default function TailorModeModal({ onChoose, onClose }) {
  return (
    <div className="rb-modal-backdrop" role="dialog" aria-modal="true" aria-label="Choose how to use your information">
      <div className="rb-modal">
        <div className="rb-modal-head">
          <h2>Before I write this…</h2>
          <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <p className="rb-modal-sub">How should I use the information you've provided when tailoring your resume to this job posting?</p>
        <div className="rb-modal-options">
          {OPTIONS.map((o) => (
            <button key={o.mode} className="rb-modal-option" onClick={() => onChoose(o.mode)}>
              <o.icon size={20} className="rb-modal-option-icon" />
              <div>
                <div className="rb-modal-option-title">{o.title}</div>
                <div className="rb-modal-option-desc">{o.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
