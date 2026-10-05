import { uid } from './constants.js';

export const seedPersonal = {
  name: 'Sabelo Tshazi',
  title: 'IT Support & Service Desk Professional',
  email: 'sabelotshazi073@gmail.com',
  phone: '0630403648',
  location: 'Durban',
  links: '',
  summary: 'Motivated and adaptable IT professional with a strong foundation in information technology and experience in technical support, software development, system administration, and digital solutions. Eager to contribute skills, take on new challenges, and continue developing knowledge in a dynamic IT environment. Committed to delivering reliable technology solutions, resolving technical issues efficiently, and providing excellent service while maintaining a strong willingness to learn and grow professionally.'
};

export const seedPersonalInfo = { gender: 'Male', place: 'Durban', dob: 'Dec 06, 2002' };

export const seedExperience = [
  {
    id: uid('exp'), role: 'Zendesk Administrator', company: 'CX Expert', start: 'Oct 2025', end: 'Present', include: true,
    bullets: [
      'Configured and maintained the Zendesk platform and support workflow.',
      'Troubleshot system issues and implemented process improvements.',
      'Monitored performance, maintained documentation, and supported business users.'
    ]
  },
  {
    id: uid('exp'), role: 'Junior IT Support Technician', company: 'Global Network Systems', start: 'Feb 2025', end: 'July 2025', include: true,
    bullets: [
      'Provided first-line IT support for Microsoft 365, Windows, and user accounts.',
      'Managed incidents through ticketing systems and met SLA targets.',
      'Escalated complex issues and delivered support via email and phone.'
    ]
  }
];

export const seedEducation = [
  { id: uid('edu'), degree: 'Service Desk and AI Bootcamp', institution: 'CAPACITI', year: '2025', details: '', include: true },
  { id: uid('edu'), degree: 'BSc. Computer Science and Mathematics', institution: 'University of Zululand', year: '2024', details: '', include: true },
  { id: uid('edu'), degree: 'Science', institution: 'Mshweshwe High School', year: '2020', details: '', include: true }
];

export const seedSkills = [
  'Mathematics', 'Zendesk Administration', 'Microsoft 365', 'Technical Troubleshooting',
  'Incident Management', 'Service Desk Operations', 'System Configuration', 'Technical Documentation',
  'Microsoft Excel', 'Process Improvement', 'Problem Solving', 'Analytical Thinking', 'Team Collaboration',
  'Attention to Detail', 'Communication', 'Time Management', 'Adaptability', 'Website Development',
  'Willingness to Learn', 'Customer Service', 'Multitasking', 'Database Management'
];

export const seedProjects = [
  { id: uid('proj'), name: 'AI Site Guide ( Zendesk)', role: 'Team Member', context: 'CX Expert', year: '2026', description: '', include: true },
  { id: uid('proj'), name: 'Service Desk Optimisation (Zendesk)', role: 'Project Leader', context: 'CX Expert', year: '2026', description: '', include: true },
  { id: uid('proj'), name: 'AI Support Portal', role: 'Project Leader', context: 'CAPACITI Final Project', year: '2025', description: '', include: true },
  { id: uid('proj'), name: 'School Event Management Web App', role: 'Team Member', context: 'University Final Year Project', year: '2024', description: '', include: true }
];

export const seedCertifications = [
  { id: uid('cert'), name: 'Python for Data Science and AI', issuer: '', year: '', include: true },
  { id: uid('cert'), name: 'SFIA Service Operations Practitioner', issuer: '', year: '', include: true },
  { id: uid('cert'), name: 'Infrastructure Engineer SFIA', issuer: '', year: '', include: true },
  { id: uid('cert'), name: 'Generative AI for Customer Success', issuer: '', year: '', include: true }
];

export const seedResearch = [
  { id: uid('res'), title: 'AI Research on Pothole Detection', role: 'Leader', context: 'University Research Project', year: '2024', description: '', include: true },
  { id: uid('res'), title: 'AI Research on Image Classification (Deep Learning)', role: '', context: '', year: '', description: '', include: true },
  {
    id: uid('res'), title: 'AI in Business: Opportunities and Challenges', role: 'Research Leader', context: '', year: '', include: true,
    description: 'Research into the opportunities and challenges of Artificial Intelligence in business, focusing on its potential to drive growth, improve efficiency, and enhance decision-making. Investigated the benefits and limitations of AI adoption, providing insights for businesses to maximize opportunities and overcome challenges.'
  }
];

export const seedAwards = [
  { id: uid('award'), title: 'University Certificate', year: '2021', description: 'For outstanding academic performance within the Faculty of Science, Agriculture and Engineering in year 2021.', include: true }
];
