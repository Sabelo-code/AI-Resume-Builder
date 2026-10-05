import {
  User, Briefcase, GraduationCap, ListChecks, Target, FolderOpen,
  Layers, Award, Trophy, Mail, BookOpen, Contact, UserCircle2,
  SlidersHorizontal, Palette
} from 'lucide-react';

/* ---------- id helper ---------- */
export const uid = (p) => `${p}_${Math.random().toString(36).slice(2, 9)}`;

/* ---------- empty record factories ---------- */
export const emptyPersonal = { name: '', title: '', email: '', phone: '', location: '', links: '', summary: '' };
export const emptyPersonalInfo = { gender: '', place: '', dob: '' };

// `include` lets the AI (or the user) flag an entry as "not relevant to this
// role" without ever deleting the user's data — it just gets left out of the
// generated/preview resume until switched back on. See TailorModeModal.
export const emptyExperience = () => ({ id: uid('exp'), role: '', company: '', start: '', end: '', bullets: [''], include: true });
export const emptyEducation = () => ({ id: uid('edu'), degree: '', institution: '', year: '', details: '', include: true });
export const emptyProject = () => ({ id: uid('proj'), name: '', role: '', context: '', year: '', description: '', include: true });
export const emptyCert = () => ({ id: uid('cert'), name: '', issuer: '', year: '', include: true });
export const emptyResearch = () => ({ id: uid('res'), title: '', role: '', context: '', year: '', description: '', include: true });
export const emptyAward = () => ({ id: uid('award'), title: '', year: '', description: '', include: true });

export const defaultSections = {
  objective: true, personalInfo: false, education: true, experience: true,
  skills: true, projects: true, certifications: true, research: true, awards: true
};

/* section order + icon/label used by the Sections tab + preview */
export const SECTION_META = [
  { key: 'objective', label: 'Objective', icon: Target },
  { key: 'personalInfo', label: 'Personal information', icon: Contact },
  { key: 'education', label: 'Education', icon: BookOpen },
  { key: 'experience', label: 'Experience', icon: Mail },
  { key: 'skills', label: 'Skills', icon: UserCircle2 },
  { key: 'projects', label: 'Project', icon: Layers },
  { key: 'certifications', label: 'Certification', icon: Award },
  { key: 'research', label: 'Research', icon: Briefcase },
  { key: 'awards', label: 'Awards', icon: Trophy },
];

/* Sidebar tabs. `group` decides which sidebar section a tab appears under
   (must match an id in TAB_GROUPS below). */
export const TABS = [
  { id: 'personal',   label: 'Personal',        icon: User,              group: 'content' },
  { id: 'experience', label: 'Experience',      icon: Briefcase,         group: 'content' },
  { id: 'education',  label: 'Education',       icon: GraduationCap,     group: 'content' },
  { id: 'skills',     label: 'Skills',          icon: ListChecks,        group: 'content' },
  { id: 'additional', label: 'Projects & more', icon: Layers,            group: 'content' },
  { id: 'sections',   label: 'Sections',        icon: SlidersHorizontal, group: 'design' },
  { id: 'template',   label: 'Template',        icon: Palette,           group: 'design' },
  { id: 'target',     label: 'Target job',      icon: Target,            group: 'tools' },
  { id: 'saved',      label: 'Saved',           icon: FolderOpen,        group: 'tools' },
];

export const TAB_GROUPS = [
  { id: 'content', label: 'Content' },
  { id: 'design',  label: 'Design' },
  { id: 'tools',   label: 'Tools' },
];

/* The ATS score the app is designed to help the user reach. Surfaced in the
   prompt, the gauge and the improvement panel — change this in one place. */
export const TARGET_ATS_SCORE = 80;

/* The three ways the user can choose to have their info used when the AI
   tailors a resume to a job posting. See TailorModeModal + aiClient.js. */
export const TAILOR_MODES = {
  REMOVE: 'remove',   // strip anything not relevant to the role
  TAILOR: 'tailor',   // reorder / emphasize, but keep everything
  ALL: 'all',          // use every bit of supplied info as-is
};