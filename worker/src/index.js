/**
 * =============================================================================
 *  CLOUDFLARE WORKER — server-side proxy to Google Gemini
 * =============================================================================
 *
 * This is the backend the frontend (`src/lib/aiClient.js`) now calls instead
 * of hitting an AI provider directly from the browser. It exists so your
 * Gemini API key never ships to the client — it lives only here, as a
 * Cloudflare secret, and this Worker forwards requests to Gemini on the
 * frontend's behalf.
 *
 * Flow:
 *   React app  --POST-->  this Worker (/generate)  --POST-->  Gemini API
 *              <--JSON--                            <--JSON--
 *
 * -----------------------------------------------------------------------
 * 🔧 WHERE TO PUT YOUR API KEY
 * -----------------------------------------------------------------------
 * Do NOT paste your key into this file. It's read from an environment
 * binding called GEMINI_API_KEY, which Cloudflare injects at runtime:
 *
 *   - Local dev:   put it in `worker/.dev.vars` (see .dev.vars.example)
 *   - Production:  run `wrangler secret put GEMINI_API_KEY` from /worker
 *
 * Get a key from https://aistudio.google.com/apikey
 * Full setup steps are in the main README.md under "Environment setup".
 * -----------------------------------------------------------------------
 */

// 🔧 Change this if you want a different Gemini model. "gemini-2.0-flash" is
// fast/cheap and works well for this JSON-generation task. See
// https://ai.google.dev/gemini-api/docs/models for other options.
const GEMINI_MODEL = 'gemini-3.8-flash';

// Restrict which origins may call this Worker. During local dev the Vite
// server runs on localhost:5173. 🔧 Add your deployed frontend's origin
// (e.g. 'https://your-app.pages.dev') once you deploy it, and remove the
// localhost entry if you want to lock this down further.
const ALLOWED_ORIGINS = [
 'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174'
  // 'https://your-frontend-domain.pages.dev',
];

function corsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin'
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers });
    }

    // 🔧 This is where the key set via `wrangler secret put GEMINI_API_KEY`
    // (or worker/.dev.vars locally) becomes available.
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the Worker.' }),
        { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }

    // The frontend sends the same shape it always did: { system, messages }
    // where messages[0].content is a JSON string of the resume/job payload.
    const { system, messages } = body;
    const userContent = messages?.[0]?.content || '';

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    // Gemini's request shape: `systemInstruction` + `contents`. We also ask
    // for a JSON mime type so Gemini returns clean JSON without needing to
    // strip markdown fences (aiClient.js still strips them defensively).
    const geminiBody = {
      systemInstruction: {
        parts: [{ text: system || '' }]
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userContent }]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json'
      }
    };

    let geminiResp;

try {
  const maxAttempts = 3;
  const retryDelay = 1500;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    geminiResp = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    // Successful response
    if (geminiResp.ok) {
      break;
    }

    // Retry temporary Gemini availability/rate-limit errors
    if (
      (geminiResp.status === 503 || geminiResp.status === 429) &&
      attempt < maxAttempts
    ) {
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      continue;
    }

    // Stop for other errors
    break;
  }
} catch (e) {
  return new Response(
    JSON.stringify({ error: 'Failed to reach Gemini API' }),
    {
      status: 502,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    }
  );
}

    if (!geminiResp.ok) {
      const errText = await geminiResp.text();
      return new Response(
        JSON.stringify({ error: `Gemini request failed (${geminiResp.status})`, details: errText }),
        { status: geminiResp.status, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    const geminiData = await geminiResp.json();

    // Extract the plain text Gemini produced and hand it back to the
    // frontend in the same `{ content: [{ type: 'text', text }] }` shape
    // aiClient.js already knows how to read (so aiClient.js needs almost no
    // changes regardless of which provider is behind this Worker).
    const text =
      geminiData?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('\n') || '';

    return new Response(JSON.stringify({ content: [{ type: 'text', text }] }), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
};
