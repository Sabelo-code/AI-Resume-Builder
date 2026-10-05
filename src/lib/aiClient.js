/**
 * =============================================================================
 *  AI CLIENT — this is the ONLY file you need to touch to change AI providers.
 * =============================================================================
 *
 * Everything else in the app calls `generateTailoredResume(payload)` below and
 * expects the JSON shape documented in `RESPONSE_SHAPE` further down. As long
 * as your replacement returns that same shape, nothing else in the codebase
 * needs to change.
 *
 * ---- CURRENT SETUP: Cloudflare Worker backend + Google Gemini -------------
 * This app calls a small Cloudflare Worker (see /worker) instead of talking
 * to an AI provider directly from the browser. The Worker holds the real
 * Gemini API key server-side (as a Cloudflare secret) and forwards requests
 * to Gemini, so the key never ships to the client / can't be read from dev
 * tools. See /worker/src/index.js and the README's "Environment setup"
 * section to configure it.
 *
 * ---- SWAPPING PROVIDERS -----------------------------------------------------
 * You generally don't need to touch this file to change providers — just
 * edit /worker/src/index.js, since that's the only place that actually talks
 * to an external AI API. This file just POSTs { system, messages } to
 * AI_ENDPOINT and expects back { content: [{ type: 'text', text }] }, which
 * is provider-agnostic on purpose.
 * =============================================================================
 */

// 🔧 Your Worker's URL. Locally this is wherever `wrangler dev` (run from
// /worker) is listening — 8787 is Wrangler's default. In production, set
// VITE_AI_ENDPOINT (in .env.local, or your host's env var settings) to your
// deployed Worker's URL, e.g. https://resume-builder-api.<your-subdomain>.workers.dev/generate
const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT || 'https://resume-builder-api.sabelo-tshazi-digifycx.workers.dev/generate';

/**
 * Low-level call to the backend. Swap this out to change providers entirely
 * — just keep returning the raw assistant text. The actual provider call
 * (Gemini, by default) lives in /worker/src/index.js, not here.
 */
async function callModel(systemPrompt, userPayload) {
  const resp = await fetch(AI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system: systemPrompt,
      messages: [{ role: 'user', content: JSON.stringify(userPayload) }]
    })
  });

  if (!resp.ok) throw new Error(`AI request failed (${resp.status})`);
  const data = await resp.json();

  // The Worker normalizes whatever the underlying provider returns into
  // this shape: content is an array of blocks. If you change the Worker's
  // response shape, update this too.
  const text = (data.content || [])
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n');

  return text;
}

/**
 * RESPONSE_SHAPE — the JSON the app expects back from the model, parsed from
 * the raw text `callModel` returns. Documented here so a swapped-in provider
 * knows exactly what contract to fulfill.
 *
 * {
 *   summary: string,
 *   skills: string[],
 *   experience: [{ id: string, bullets: string[] }],
 *   keywords_matched: string[],
 *   keywords_missing: string[],
 *   ats_score: number,                 // 0-100
 *   score_breakdown: {                 // sub-scores, each 0-100, purely informational
 *     keyword_coverage: number,
 *     experience_relevance: number,
 *     skills_alignment: number,
 *     formatting_clarity: number
 *   },
 *   improvement_tips: [                // concrete, ordered steps to close the gap to the target score
 *     { area: string, suggestion: string, impact: "high"|"medium"|"low" }
 *   ],
 *   exclude: {                         // only present when tailorMode === "remove"
 *     experience: string[],            // ids the model thinks are unrelated to the role
 *     projects: string[],
 *     certifications: string[],
 *     research: string[],
 *     awards: string[],
 *     skills: string[]                 // skill *names* to drop from the visible list
 *   }
 * }
 */

import { buildSystemPrompt } from './atsPrompt.js';

/**
 * generateTailoredResume — the function the rest of the app calls.
 * @param {object} payload - candidate info + job description + tailorMode (see atsPrompt.js)
 * @returns {Promise<object>} parsed RESPONSE_SHAPE object
 */
export async function generateTailoredResume(payload) {
  const systemPrompt = buildSystemPrompt(payload.tailorMode, payload.targetScore);
  const rawText = await callModel(systemPrompt, payload);

  const cleaned = rawText.replace(/```json|```/g, '').trim();
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    throw new Error('The AI response could not be parsed. Try again.');
  }
  return parsed;
}
