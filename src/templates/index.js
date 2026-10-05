import ClassicTemplate from './ClassicTemplate.jsx';
import ModernTemplate from './ModernTemplate.jsx';
import SidebarTemplate from './SidebarTemplate.jsx';

/**
 * To add a new CV template:
 * 1. Create MyTemplate.jsx (props: { data }) + MyTemplate.css, following the
 *    existing templates as a pattern — same `data` shape, and filter lists
 *    through `visible()` from shared.js so excluded entries stay hidden.
 * 2. Import it here and add an entry to this array. That's it — it will
 *    automatically show up in the Template tab and the preview/download.
 */
export const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic Editorial',
    description: 'Serif headings, navy rules, icon-led sections. Warm and traditional.',
    component: ClassicTemplate
  },
  {
    id: 'modern',
    name: 'Modern ATS-First',
    description: 'Stripped-down single column, no icons or tables — built to parse cleanly in any ATS.',
    component: ModernTemplate
  },
  {
    id: 'sidebar',
    name: 'Structured Sidebar',
    description: 'Two-column layout with a dark sidebar for contact, skills and education.',
    component: SidebarTemplate
  }
];

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
}
