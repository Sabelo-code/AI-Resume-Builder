import { useResume } from '../../context/ResumeContext.jsx';

export default function PersonalTab() {
  const { personal, updatePersonal } = useResume();

  return (
    <div>
      <div className="rb-field"><label>Full name</label>
        <input value={personal.name} onChange={(e) => updatePersonal('name', e.target.value)} placeholder="Jane Doe" /></div>
      <div className="rb-field"><label>Professional title</label>
        <input value={personal.title} onChange={(e) => updatePersonal('title', e.target.value)} placeholder="Senior Software Engineer" /></div>
      <div className="rb-row2">
        <div className="rb-field"><label>Email</label>
          <input value={personal.email} onChange={(e) => updatePersonal('email', e.target.value)} placeholder="jane@example.com" /></div>
        <div className="rb-field"><label>Phone</label>
          <input value={personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} placeholder="+27 00 000 0000" /></div>
        <div className="rb-field"><label>Location</label>
          <input value={personal.location} onChange={(e) => updatePersonal('location', e.target.value)} placeholder="Durban, South Africa" /></div>
        <div className="rb-field"><label>LinkedIn / portfolio</label>
          <input value={personal.links} onChange={(e) => updatePersonal('links', e.target.value)} placeholder="linkedin.com/in/jane" /></div>
      </div>
      <div className="rb-field"><label>Objective / summary</label>
        <textarea value={personal.summary} onChange={(e) => updatePersonal('summary', e.target.value)}
          placeholder="Write your own, or generate one from a job posting in the Target job tab." /></div>
    </div>
  );
}
