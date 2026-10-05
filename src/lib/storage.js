/**
 * Save/load resumes to the browser's localStorage.
 *
 * This runs as a normal deployed web app (not inside the Claude.ai artifact
 * sandbox), so it uses localStorage rather than the artifact `window.storage`
 * API. If you later deploy this behind user accounts, this is the other
 * natural place to swap in a real backend — replace the three functions
 * below with calls to your API and keep the same signatures.
 */

const PREFIX = 'resume-builder:';

export function listSavedResumes() {
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(PREFIX)) continue;
    try {
      const record = JSON.parse(localStorage.getItem(key));
      if (record) items.push(record);
    } catch {
      /* skip corrupted entry */
    }
  }
  return items.sort((a, b) => b.ts - a.ts);
}

export function saveResume(id, record) {
  localStorage.setItem(`${PREFIX}${id}`, JSON.stringify(record));
}

export function loadResume(id) {
  const raw = localStorage.getItem(`${PREFIX}${id}`);
  return raw ? JSON.parse(raw) : null;
}

export function deleteResume(id) {
  localStorage.removeItem(`${PREFIX}${id}`);
}
