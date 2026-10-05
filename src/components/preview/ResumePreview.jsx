import { useRef, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext.jsx';
import { getTemplate } from '../../templates/index.js';
import { downloadResumeAsPdf } from '../../lib/download.js';
import ImprovementPanel from './ImprovementPanel.jsx';

export default function ResumePreview() {
  const {
    templateId, personal, personalInfo, sections, experience, education,
    skills, projects, certifications, research, awards, ats, showToast
  } = useResume();

  const sheetRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const Template = getTemplate(templateId).component;
  const data = { personal, personalInfo, sections, experience, education, skills, projects, certifications, research, awards };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const filename = `${(personal.name || 'resume').trim().replace(/\s+/g, '_')}.pdf`;
      await downloadResumeAsPdf(sheetRef.current, filename);
    } catch (err) {
      showToast('Could not generate the PDF — try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="rb-preview-col">
      <ImprovementPanel ats={ats} />

      <button className="rb-btn rb-btn-accent no-print" onClick={handleDownload} disabled={downloading} style={{ alignSelf: 'flex-start' }}>
        {downloading ? <Loader2 size={15} className="rb-spin" /> : <Download size={15} />}
        {downloading ? 'Preparing PDF…' : 'Download CV as PDF'}
      </button>

      <div className="rb-resume-sheet" ref={sheetRef}>
        <Template data={data} />
      </div>
    </div>
  );
}
