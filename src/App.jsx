import { FilePlus, Save, Download } from 'lucide-react';
import { ResumeProvider, useResume } from './context/ResumeContext.jsx';
import { TABS, TAB_GROUPS } from './data/constants.js';

import PersonalTab from './components/tabs/PersonalTab.jsx';
import ExperienceTab from './components/tabs/ExperienceTab.jsx';
import EducationTab from './components/tabs/EducationTab.jsx';
import SkillsTab from './components/tabs/SkillsTab.jsx';
import AdditionalTab from './components/tabs/AdditionalTab.jsx';
import SectionsTab from './components/tabs/SectionsTab.jsx';
import TemplateTab from './components/tabs/TemplateTab.jsx';
import TargetJobTab from './components/tabs/TargetJobTab.jsx';
import SavedTab from './components/tabs/SavedTab.jsx';
import ResumePreview from './components/preview/ResumePreview.jsx';
import TailorModeModal from './components/modals/TailorModeModal.jsx';

const TAB_COMPONENTS = {
  personal: PersonalTab,
  experience: ExperienceTab,
  education: EducationTab,
  skills: SkillsTab,
  additional: AdditionalTab,
  sections: SectionsTab,
  template: TemplateTab,
  target: TargetJobTab,
  saved: SavedTab,
};

function BuilderShell() {
  const {
    tab,
    setTab,
    handleNew,
    handleSave,
    handleDownload,
    toast,
    showTailorModal,
    setShowTailorModal,
    confirmGenerate,
  } = useResume();

  const ActiveTab = TAB_COMPONENTS[tab] || PersonalTab;
  const activeMeta = TABS.find((t) => t.id === tab) || TABS[0];

  // Falls back to the browser print dialog if the context has no download handler.
  const onDownload = handleDownload || (() => window.print());

  return (
    <div className="rb-app">
      <header className="rb-top no-print">
        <div className="rb-brand">
          <h1>Resume Builder</h1>
          <p>Tailor your real experience to a job posting — nothing is invented, everything stays editable.</p>
        </div>
        <div className="rb-toolbar">
          <button type="button" className="rb-btn" onClick={handleNew}>
            <FilePlus size={15} /> New
          </button>
          <button type="button" className="rb-btn" onClick={handleSave}>
            <Save size={15} /> Save
          </button>
          <button type="button" className="rb-btn rb-btn-primary" onClick={onDownload}>
            <Download size={15} /> Download PDF
          </button>
        </div>
      </header>

      <div className="rb-layout">
        <nav className="rb-sidebar no-print" aria-label="Resume sections">
          {TAB_GROUPS.map((group) => (
            <div className="rb-nav-group" key={group.id}>
              <div className="rb-nav-label">{group.label}</div>
              {TABS.filter((t) => t.group === group.id).map((t) => (
                <button
                  type="button"
                  key={t.id}
                  className={`rb-nav-item ${tab === t.id ? 'active' : ''}`}
                  onClick={() => setTab(t.id)}
                  aria-current={tab === t.id ? 'page' : undefined}
                >
                  <t.icon size={16} /> {t.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <main className="rb-editor no-print">
          <div className="rb-panel">
            <div className="rb-panel-head">
              <h2>{activeMeta.label}</h2>
            </div>
            <ActiveTab />
          </div>
        </main>

        <aside className="rb-preview-col">
          <ResumePreview />
        </aside>
      </div>

      {toast && <div className="rb-toast">{toast}</div>}
      {showTailorModal && (
        <TailorModeModal
          onChoose={confirmGenerate}
          onClose={() => setShowTailorModal(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      <BuilderShell />
    </ResumeProvider>
  );
}