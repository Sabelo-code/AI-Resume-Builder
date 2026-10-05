import { Trash2, Plus, Layers, Award, Briefcase, Trophy, Eye, EyeOff } from 'lucide-react';
import { useResume } from '../../context/ResumeContext.jsx';

export default function AdditionalTab() {
  const {
    projects, updateProject, addProject, removeProject, toggleProjectInclude,
    certifications, updateCert, addCert, removeCert, toggleCertInclude,
    research, updateResearch, addResearch, removeResearch, toggleResearchInclude,
    awards, updateAward, addAward, removeAward, toggleAwardInclude
  } = useResume();

  return (
    <div>
      <div className="rb-subhead"><Layers size={15} /> Projects</div>
      {projects.map((p) => (
        <div className={`rb-card ${p.include === false ? 'rb-card-excluded' : ''}`} key={p.id}>
          <div className="rb-card-head">
            <strong>{p.name || 'New project'}{p.include === false ? ' (hidden from CV)' : ''}</strong>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => toggleProjectInclude(p.id)}>
                {p.include === false ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>
              <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => removeProject(p.id)}><Trash2 size={13} /></button>
            </div>
          </div>
          <div className="rb-row2">
            <div className="rb-field"><label>Name</label>
              <input value={p.name} onChange={(e) => updateProject(p.id, 'name', e.target.value)} /></div>
            <div className="rb-field"><label>Your role</label>
              <input value={p.role} onChange={(e) => updateProject(p.id, 'role', e.target.value)} placeholder="Team Member" /></div>
            <div className="rb-field"><label>Context</label>
              <input value={p.context} onChange={(e) => updateProject(p.id, 'context', e.target.value)} placeholder="Optional" /></div>
            <div className="rb-field"><label>Year</label>
              <input value={p.year} onChange={(e) => updateProject(p.id, 'year', e.target.value)} placeholder="Optional" /></div>
          </div>
          <div className="rb-field"><label>Description</label>
            <input value={p.description} onChange={(e) => updateProject(p.id, 'description', e.target.value)} placeholder="Optional" /></div>
        </div>
      ))}
      <button className="rb-btn rb-btn-sm" onClick={addProject}><Plus size={13} /> Add project</button>

      <div className="rb-subhead"><Award size={15} /> Certifications</div>
      {certifications.map((c) => (
        <div className={`rb-card ${c.include === false ? 'rb-card-excluded' : ''}`} key={c.id}>
          <div className="rb-card-head">
            <strong>{c.name || 'New certification'}{c.include === false ? ' (hidden from CV)' : ''}</strong>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => toggleCertInclude(c.id)}>
                {c.include === false ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>
              <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => removeCert(c.id)}><Trash2 size={13} /></button>
            </div>
          </div>
          <div className="rb-row2">
            <div className="rb-field"><label>Name</label>
              <input value={c.name} onChange={(e) => updateCert(c.id, 'name', e.target.value)} /></div>
            <div className="rb-field"><label>Issuer</label>
              <input value={c.issuer} onChange={(e) => updateCert(c.id, 'issuer', e.target.value)} placeholder="Optional" /></div>
            <div className="rb-field"><label>Year</label>
              <input value={c.year} onChange={(e) => updateCert(c.id, 'year', e.target.value)} placeholder="Optional" /></div>
          </div>
        </div>
      ))}
      <button className="rb-btn rb-btn-sm" onClick={addCert}><Plus size={13} /> Add certification</button>

      <div className="rb-subhead"><Briefcase size={15} /> Research</div>
      {research.map((r) => (
        <div className={`rb-card ${r.include === false ? 'rb-card-excluded' : ''}`} key={r.id}>
          <div className="rb-card-head">
            <strong>{r.title || 'New research item'}{r.include === false ? ' (hidden from CV)' : ''}</strong>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => toggleResearchInclude(r.id)}>
                {r.include === false ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>
              <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => removeResearch(r.id)}><Trash2 size={13} /></button>
            </div>
          </div>
          <div className="rb-row2">
            <div className="rb-field"><label>Title</label>
              <input value={r.title} onChange={(e) => updateResearch(r.id, 'title', e.target.value)} /></div>
            <div className="rb-field"><label>Your role</label>
              <input value={r.role} onChange={(e) => updateResearch(r.id, 'role', e.target.value)} placeholder="Research Leader" /></div>
            <div className="rb-field"><label>Context</label>
              <input value={r.context} onChange={(e) => updateResearch(r.id, 'context', e.target.value)} placeholder="Optional" /></div>
            <div className="rb-field"><label>Year</label>
              <input value={r.year} onChange={(e) => updateResearch(r.id, 'year', e.target.value)} placeholder="Optional" /></div>
          </div>
          <div className="rb-field"><label>Description</label>
            <input value={r.description} onChange={(e) => updateResearch(r.id, 'description', e.target.value)} placeholder="Optional" /></div>
        </div>
      ))}
      <button className="rb-btn rb-btn-sm" onClick={addResearch}><Plus size={13} /> Add research item</button>

      <div className="rb-subhead"><Trophy size={15} /> Awards</div>
      {awards.map((a) => (
        <div className={`rb-card ${a.include === false ? 'rb-card-excluded' : ''}`} key={a.id}>
          <div className="rb-card-head">
            <strong>{a.title || 'New award'}{a.include === false ? ' (hidden from CV)' : ''}</strong>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => toggleAwardInclude(a.id)}>
                {a.include === false ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>
              <button className="rb-btn rb-btn-ghost rb-btn-sm" onClick={() => removeAward(a.id)}><Trash2 size={13} /></button>
            </div>
          </div>
          <div className="rb-row2">
            <div className="rb-field"><label>Title</label>
              <input value={a.title} onChange={(e) => updateAward(a.id, 'title', e.target.value)} /></div>
            <div className="rb-field"><label>Year</label>
              <input value={a.year} onChange={(e) => updateAward(a.id, 'year', e.target.value)} placeholder="Optional" /></div>
          </div>
          <div className="rb-field"><label>Description</label>
            <input value={a.description} onChange={(e) => updateAward(a.id, 'description', e.target.value)} placeholder="Optional" /></div>
        </div>
      ))}
      <button className="rb-btn rb-btn-sm" onClick={addAward}><Plus size={13} /> Add award</button>
    </div>
  );
}
