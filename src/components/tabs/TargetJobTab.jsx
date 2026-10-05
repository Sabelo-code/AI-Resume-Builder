import { Sparkles, Loader2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext.jsx';
import { TARGET_ATS_SCORE } from '../../data/constants.js';

export default function TargetJobTab() {
  const { targetRole, setTargetRole, jobDescription, setJobDescription, requestGenerate, aiLoading, aiError } = useResume();

  return (
    <div>
      <div className="rb-field"><label>Target role (optional)</label>
        <input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g. Service Desk Analyst" /></div>
      <div className="rb-field"><label>Job posting</label>
        <textarea style={{ minHeight: 180 }} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here" /></div>
      <button className="rb-btn rb-btn-accent" onClick={requestGenerate} disabled={aiLoading}>
        {aiLoading ? <Loader2 size={15} className="rb-spin" /> : <Sparkles size={15} />}
        {aiLoading ? 'Tailoring your resume…' : 'Generate tailored resume'}
      </button>
      <div className="rb-hint" style={{ marginTop: 8 }}>
        Uses only what's in Personal, Experience, Education, Skills, and Projects & more — it rewrites
        wording and priorities, it doesn't make up experience. You'll be asked how to use your
        information before anything is generated, and scored against a {TARGET_ATS_SCORE}% ATS match target.
      </div>
      {aiError && <div className="rb-error"><Sparkles size={14} />{aiError}</div>}
    </div>
  );
}
