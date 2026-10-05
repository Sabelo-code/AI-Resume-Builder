import { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  uid, emptyPersonal, emptyPersonalInfo, emptyExperience, emptyEducation,
  emptyProject, emptyCert, emptyResearch, emptyAward, defaultSections,
  TAILOR_MODES, TARGET_ATS_SCORE
} from '../data/constants.js';
import {
  seedPersonal, seedPersonalInfo, seedExperience, seedEducation, seedSkills,
  seedProjects, seedCertifications, seedResearch, seedAwards
} from '../data/seedData.js';
import { generateTailoredResume } from '../lib/aiClient.js';
import { listSavedResumes, saveResume, loadResume, deleteResume } from '../lib/storage.js';
import { TEMPLATES } from '../templates/index.js';

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [tab, setTab] = useState('personal');
  const [templateId, setTemplateId] = useState(TEMPLATES[0].id);

  const [personal, setPersonal] = useState(seedPersonal);
  const [personalInfo, setPersonalInfo] = useState(seedPersonalInfo);
  const [sections, setSections] = useState(defaultSections);
  const [experience, setExperience] = useState(seedExperience);
  const [education, setEducation] = useState(seedEducation);
  const [skills, setSkills] = useState(seedSkills);
  const [skillInput, setSkillInput] = useState('');
  const [projects, setProjects] = useState(seedProjects);
  const [certifications, setCertifications] = useState(seedCertifications);
  const [research, setResearch] = useState(seedResearch);
  const [awards, setAwards] = useState(seedAwards);
  const [targetRole, setTargetRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const [tailorMode, setTailorMode] = useState(null); // null until the user picks one via the modal
  const [showTailorModal, setShowTailorModal] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [ats, setAts] = useState(null); // { score, breakdown, matched, missing, tips, mode }

  const [savedList, setSavedList] = useState([]);
  const [activeSaveId, setActiveSaveId] = useState(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  };

  /* ---- persistence ---- */
  const refreshSavedList = () => setSavedList(listSavedResumes());
  useEffect(() => { refreshSavedList(); }, []);

  const handleSave = () => {
    const id = activeSaveId || uid('resume');
    const record = {
      id, ts: Date.now(), name: personal.name || 'Untitled resume',
      data: {
        personal, personalInfo, sections, experience, education, skills, projects,
        certifications, research, awards, targetRole, jobDescription, ats, templateId
      }
    };
    try {
      saveResume(id, record);
      setActiveSaveId(id);
      showToast('Saved.');
      refreshSavedList();
    } catch {
      showToast('Could not save — try again.');
    }
  };

  const handleLoad = (id) => {
    const record = loadResume(id);
    if (!record) return;
    const { data } = record;
    setPersonal(data.personal || emptyPersonal);
    setPersonalInfo(data.personalInfo || emptyPersonalInfo);
    setSections(data.sections || defaultSections);
    setExperience(data.experience?.length ? data.experience : [emptyExperience()]);
    setEducation(data.education?.length ? data.education : [emptyEducation()]);
    setSkills(data.skills || []);
    setProjects(data.projects || []);
    setCertifications(data.certifications || []);
    setResearch(data.research || []);
    setAwards(data.awards || []);
    setTargetRole(data.targetRole || '');
    setJobDescription(data.jobDescription || '');
    setAts(data.ats || null);
    setTemplateId(data.templateId || TEMPLATES[0].id);
    setActiveSaveId(id);
    setTab('preview');
  };

  const handleDelete = (id) => {
    deleteResume(id);
    if (activeSaveId === id) setActiveSaveId(null);
    refreshSavedList();
  };

  const handleNew = () => {
    setPersonal(emptyPersonal);
    setPersonalInfo(emptyPersonalInfo);
    setSections(defaultSections);
    setExperience([emptyExperience()]);
    setEducation([emptyEducation()]);
    setSkills([]);
    setProjects([]);
    setCertifications([]);
    setResearch([]);
    setAwards([]);
    setTargetRole('');
    setJobDescription('');
    setAts(null);
    setActiveSaveId(null);
    setAiError('');
    setTab('personal');
  };

  const toggleSection = (key) => setSections((s) => ({ ...s, [key]: !s[key] }));

  /* ---- AI generation ---- */

  // Called from the Target Job tab's "Generate" button — opens the
  // remove/tailor/all-info modal instead of generating immediately.
  const requestGenerate = () => {
    setAiError('');
    if (!jobDescription.trim()) { setAiError('Paste the job posting first.'); return; }
    if (!personal.name.trim() && experience.every((e) => !e.role.trim())) {
      setAiError('Add your name and at least one role in Experience so there is real background to tailor.');
      return;
    }
    setShowTailorModal(true);
  };

  // Called once the user picks a mode in the modal.
  const confirmGenerate = async (mode) => {
    setShowTailorModal(false);
    setTailorMode(mode);
    setAiError('');
    setAiLoading(true);
    try {
      const payload = {
        targetRole,
        jobDescription,
        tailorMode: mode,
        targetScore: TARGET_ATS_SCORE,
        personal: { name: personal.name, title: personal.title, summary: personal.summary },
        experience: experience.map((e) => ({ id: e.id, role: e.role, company: e.company, start: e.start, end: e.end, bullets: e.bullets.filter(Boolean) })),
        education: education.map((e) => ({ degree: e.degree, institution: e.institution, year: e.year })),
        skills,
        projects: projects.map((p) => ({ id: p.id, name: p.name, description: p.description })),
        certifications: certifications.map((c) => ({ id: c.id, name: c.name })),
        research: research.map((r) => ({ id: r.id, title: r.title, description: r.description })),
        awards: awards.map((a) => ({ id: a.id, title: a.title }))
      };

      const parsed = await generateTailoredResume(payload);

      if (parsed.summary) setPersonal((p) => ({ ...p, summary: parsed.summary }));
      if (Array.isArray(parsed.skills) && parsed.skills.length) setSkills(parsed.skills);
      if (Array.isArray(parsed.experience)) {
        setExperience((prev) => prev.map((e) => {
          const match = parsed.experience.find((x) => x.id === e.id);
          return match && Array.isArray(match.bullets) && match.bullets.length
            ? { ...e, bullets: match.bullets }
            : e;
        }));
      }

      // Apply "remove unrelated info" exclusions, if any were returned.
      const ex = parsed.exclude || {};
      if (Array.isArray(ex.experience) && ex.experience.length) {
        setExperience((prev) => prev.map((e) => ex.experience.includes(e.id) ? { ...e, include: false } : e));
      }
      if (Array.isArray(ex.projects) && ex.projects.length) {
        setProjects((prev) => prev.map((p) => ex.projects.includes(p.id) ? { ...p, include: false } : p));
      }
      if (Array.isArray(ex.certifications) && ex.certifications.length) {
        setCertifications((prev) => prev.map((c) => ex.certifications.includes(c.id) ? { ...c, include: false } : c));
      }
      if (Array.isArray(ex.research) && ex.research.length) {
        setResearch((prev) => prev.map((r) => ex.research.includes(r.id) ? { ...r, include: false } : r));
      }
      if (Array.isArray(ex.awards) && ex.awards.length) {
        setAwards((prev) => prev.map((a) => ex.awards.includes(a.id) ? { ...a, include: false } : a));
      }

      setAts({
        score: typeof parsed.ats_score === 'number' ? parsed.ats_score : null,
        breakdown: parsed.score_breakdown || null,
        matched: Array.isArray(parsed.keywords_matched) ? parsed.keywords_matched : [],
        missing: Array.isArray(parsed.keywords_missing) ? parsed.keywords_missing : [],
        tips: Array.isArray(parsed.improvement_tips) ? parsed.improvement_tips : [],
        mode
      });
      setTab('preview');
    } catch (err) {
      setAiError(`Could not generate right now (${err.message}). You can still edit everything by hand.`);
    } finally {
      setAiLoading(false);
    }
  };

  /* ---- field editors ---- */
  const updatePersonal = (field, value) => setPersonal((p) => ({ ...p, [field]: value }));
  const updatePersonalInfo = (field, value) => setPersonalInfo((p) => ({ ...p, [field]: value }));

  const addSkill = () => {
    const v = skillInput.trim();
    if (!v) return;
    setSkills((s) => [...s, v]);
    setSkillInput('');
  };
  const removeSkill = (i) => setSkills((s) => s.filter((_, idx) => idx !== i));

  const updateExperience = (id, field, value) => setExperience((list) => list.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  const addExperience = () => setExperience((list) => [...list, emptyExperience()]);
  const removeExperience = (id) => setExperience((list) => list.filter((e) => e.id !== id));
  const toggleExperienceInclude = (id) => setExperience((list) => list.map((e) => (e.id === id ? { ...e, include: !e.include } : e)));
  const updateBullet = (id, i, value) => setExperience((list) => list.map((e) => (e.id === id ? { ...e, bullets: e.bullets.map((b, bi) => (bi === i ? value : b)) } : e)));
  const addBullet = (id) => setExperience((list) => list.map((e) => (e.id === id ? { ...e, bullets: [...e.bullets, ''] } : e)));
  const removeBullet = (id, i) => setExperience((list) => list.map((e) => (e.id === id ? { ...e, bullets: e.bullets.filter((_, bi) => bi !== i) } : e)));

  const updateEducation = (id, field, value) => setEducation((list) => list.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  const addEducation = () => setEducation((list) => [...list, emptyEducation()]);
  const removeEducation = (id) => setEducation((list) => list.filter((e) => e.id !== id));

  const updateProject = (id, field, value) => setProjects((list) => list.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  const addProject = () => setProjects((list) => [...list, emptyProject()]);
  const removeProject = (id) => setProjects((list) => list.filter((p) => p.id !== id));
  const toggleProjectInclude = (id) => setProjects((list) => list.map((p) => (p.id === id ? { ...p, include: !p.include } : p)));

  const updateCert = (id, field, value) => setCertifications((list) => list.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  const addCert = () => setCertifications((list) => [...list, emptyCert()]);
  const removeCert = (id) => setCertifications((list) => list.filter((c) => c.id !== id));
  const toggleCertInclude = (id) => setCertifications((list) => list.map((c) => (c.id === id ? { ...c, include: !c.include } : c)));

  const updateResearch = (id, field, value) => setResearch((list) => list.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  const addResearch = () => setResearch((list) => [...list, emptyResearch()]);
  const removeResearch = (id) => setResearch((list) => list.filter((r) => r.id !== id));
  const toggleResearchInclude = (id) => setResearch((list) => list.map((r) => (r.id === id ? { ...r, include: !r.include } : r)));

  const updateAward = (id, field, value) => setAwards((list) => list.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  const addAward = () => setAwards((list) => [...list, emptyAward()]);
  const removeAward = (id) => setAwards((list) => list.filter((a) => a.id !== id));
  const toggleAwardInclude = (id) => setAwards((list) => list.map((a) => (a.id === id ? { ...a, include: !a.include } : a)));

  const value = {
    tab, setTab, templateId, setTemplateId,
    personal, personalInfo, sections, experience, education, skills, skillInput, setSkillInput,
    projects, certifications, research, awards, targetRole, setTargetRole, jobDescription, setJobDescription,
    tailorMode, showTailorModal, setShowTailorModal,
    aiLoading, aiError, ats,
    savedList, activeSaveId, toast,
    handleSave, handleLoad, handleDelete, handleNew, toggleSection,
    requestGenerate, confirmGenerate,
    updatePersonal, updatePersonalInfo, addSkill, removeSkill,
    updateExperience, addExperience, removeExperience, toggleExperienceInclude, updateBullet, addBullet, removeBullet,
    updateEducation, addEducation, removeEducation,
    updateProject, addProject, removeProject, toggleProjectInclude,
    updateCert, addCert, removeCert, toggleCertInclude,
    updateResearch, addResearch, removeResearch, toggleResearchInclude,
    updateAward, addAward, removeAward, toggleAwardInclude,
    showToast
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within a ResumeProvider');
  return ctx;
}
