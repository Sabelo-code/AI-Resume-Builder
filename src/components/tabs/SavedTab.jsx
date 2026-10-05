import { Check, Trash2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext.jsx';

export default function SavedTab() {
  const { savedList, activeSaveId, handleLoad, handleDelete } = useResume();

  return (
    <div>
      {savedList.length === 0 && <div className="rb-saved-empty">No saved resumes yet — use Save above.</div>}
      {savedList.map((item) => (
        <div className="rb-saved-item" key={item.id}>
          <div>
            <div>{item.name}{activeSaveId === item.id && <Check size={13} style={{ marginLeft: 6, color: 'var(--rb-navy)' }} />}</div>
            <div className="meta">{new Date(item.ts).toLocaleString()}</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="rb-btn rb-btn-sm" onClick={() => handleLoad(item.id)}>Load</button>
            <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => handleDelete(item.id)}><Trash2 size={13} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
