// Every list on the resume (experience, projects, certifications, research,
// awards) may contain entries the AI or the user flagged as "not relevant to
// this role" via `include: false`. Templates should always render through
// this filter rather than the raw arrays, so a flagged entry disappears from
// the preview/PDF without ever being deleted from the user's data.
export const visible = (list = []) => list.filter((item) => item.include !== false && (item.name || item.title || item.role || item.company || item.institution || item.degree));
