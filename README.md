# AI Resume Builder

An AI-assisted resume builder that helps you create a stronger, job-targeted CV from your real experience.

Add your education, work experience, projects, skills, and other background information once. Then paste a job posting and let the AI analyse how well your resume matches the role.

The application provides an **AI-estimated ATS match score**, explains where your resume is strong or weak, identifies missing keywords, and gives practical steps to improve your match.

You can choose from multiple resume templates and download the final resume as a PDF.

> **Note:** The ATS score is an AI-generated estimate designed to help identify improvement areas. It is not a guarantee of how a specific employer's ATS will score your resume.

## Key Features

- **AI-powered resume tailoring** — adapt your resume to a specific job posting.
- **ATS match score** — get an estimated 0–100 match score.
- **Score breakdown** — see keyword coverage, experience relevance, skills alignment, and formatting clarity.
- **Missing keywords** — identify relevant terms from the job posting that may be missing from your resume.
- **Improvement recommendations** — receive practical suggestions ranked by impact.
- **Three tailoring modes** — choose how aggressively your resume should be adapted.
- **Multiple templates** — choose between different resume layouts.
- **PDF export** — download your completed resume as a PDF.
- **Local resume storage** — resumes are currently saved in browser local storage.
- **Secure AI architecture** — the Gemini API key stays on the backend and is never exposed to the browser.

## How It Works

The basic workflow is:

```text
Add Your Background
        ↓
Choose a Resume Template
        ↓
Paste the Target Job
        ↓
Choose How to Tailor Your Resume
        ↓
AI Analyses the Job + Resume
        ↓
ATS Match Score + Gap Analysis
        ↓
Improve Your Resume
        ↓
Download PDF
```

The goal is not simply to generate another AI-written CV. The application is designed to help users understand **what their resume is missing and what they can improve** for a specific opportunity.

## Tailoring Modes

When generating a tailored resume, the application asks how your information should be used.

### 1. Remove Unrelated Information

The AI identifies experience, projects, or skills that are less relevant to the target role.

Unrelated information is hidden from the generated resume rather than permanently deleted. You can bring it back at any time.

### 2. Tailor to This Role

Keeps your background but adjusts the order and wording to emphasise information that is most relevant to the target job.

### 3. Use Everything as-is

Uses your complete background with light polishing and minimal reordering.

The resume is still analysed against the target job, but the AI does not aggressively tailor the content.

## ATS Analysis

The application uses an AI-generated target score, which defaults to **80%**.

The analysis provides:

- Overall ATS match score
- Keyword coverage
- Experience relevance
- Skills alignment
- Formatting clarity
- Matched keywords
- Missing keywords
- Ranked improvement recommendations

The target score is configured in:

```text
src/data/constants.js
```

The relevant setting is:

```javascript
TARGET_ATS_SCORE
```

The improvement panel displays the analysis alongside the resume preview.

## Technology

### Frontend

- React
- Vite
- JavaScript
- CSS

### AI Backend

- Cloudflare Workers
- Google Gemini API

### Storage

- Browser `localStorage`

### PDF

- Client-side PDF generation from the resume preview

## Architecture

The project is split into a React frontend and a Cloudflare Worker backend.

```text
resume-builder/
│
├── React / Vite frontend
│   └── src/
│       └── lib/
│           └── aiClient.js
│
└── worker/
    └── src/
        └── index.js
```

The request flow is:

```text
Browser
   │
   │ Resume + Job Posting
   ↓
Cloudflare Worker
   │
   │ Gemini API request
   ↓
Google Gemini
   │
   │ AI analysis
   ↓
Cloudflare Worker
   │
   ↓
Browser
```

The Gemini API key is stored on the server side as a Cloudflare secret rather than being exposed in the frontend.

## Project Structure

```text
src/
├── main.jsx
├── App.jsx
│
├── context/
│   └── ResumeContext.jsx
│
├── data/
│   ├── constants.js
│   └── seedData.js
│
├── lib/
│   ├── aiClient.js
│   ├── atsPrompt.js
│   ├── atsScoring.js
│   ├── storage.js
│   └── download.js
│
├── templates/
│   ├── index.js
│   ├── ClassicTemplate.*
│   ├── ModernTemplate.*
│   ├── SidebarTemplate.*
│   └── shared.js
│
├── components/
│   ├── ScoreGauge.jsx
│   ├── tabs/
│   ├── preview/
│   └── modals/
│
└── styles/
    └── index.css

worker/
├── src/
│   └── index.js
├── wrangler.toml
└── .dev.vars.example
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/resume-builder.git
cd resume-builder
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Set up the AI Worker

```bash
cd worker
npm install
```

For local development, copy the example environment file:

```bash
cp .dev.vars.example .dev.vars
```

Add your Gemini API key:

```env
GEMINI_API_KEY=your-key-here
```

The `.dev.vars` file is ignored by Git and should **never be committed**.

### 4. Start the Worker

From the `worker` directory:

```bash
npm run dev
```

The Worker runs on:

```text
http://localhost:8787
```

### 5. Configure the frontend

Return to the project root:

```bash
cd ..
cp .env.example .env.local
```

The local configuration should point to:

```env
VITE_AI_ENDPOINT=http://localhost:8787/generate
```

### 6. Start the frontend

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

You need both the **Worker** and the **frontend** running during local development.

## Production Deployment

### Deploy the Worker

Authenticate with Cloudflare:

```bash
wrangler login
```

Set the Gemini API key as a Cloudflare secret:

```bash
npm run secret:set
```

Then deploy:

```bash
npm run deploy
```

The deployment will provide a Worker URL similar to:

```text
https://resume-builder-api.example.workers.dev
```

Configure the frontend to use:

```env
VITE_AI_ENDPOINT=https://your-worker-url.workers.dev/generate
```

Also update the Worker's `ALLOWED_ORIGINS` configuration with your deployed frontend domain.

### Deploy the Frontend

Build the application:

```bash
npm run build
```

This creates the production files in:

```text
/dist
```

The frontend can be deployed to services such as Cloudflare Pages, Vercel, or Netlify.

## Adding a Resume Template

Create a new template inside:

```text
src/templates/
```

For example:

```text
MyTemplate.jsx
MyTemplate.css
```

The template receives the resume data:

```javascript
{ data }
```

Use the shared `visible()` helper when rendering lists so that hidden or excluded entries remain hidden.

Finally, register the template in:

```text
src/templates/index.js
```

It will then become available in the template selection interface and PDF export.

## Data Storage

Currently, resumes are stored in the browser using:

```text
localStorage
```

This means the project can be used without creating a user account or running a database.

A future version can replace the local storage layer with a backend database and user accounts.

## Security

The Gemini API key should **never be placed directly in the frontend**.

The intended architecture is:

```text
Frontend
   ↓
Cloudflare Worker
   ↓
Gemini API
```

The Worker stores the Gemini API key as a server-side secret and handles requests to the AI provider.

Do not commit:

```text
.env
.env.local
.dev.vars
API keys
```

## Current Status

This project is currently under active development.

The core resume-building, AI tailoring, ATS analysis, improvement recommendations, templates, and PDF export functionality are being developed as the foundation for a larger career-focused product.

## Future Direction

Potential future improvements include:

- User accounts
- Cloud resume storage
- Resume version history
- More resume templates
- Improved job-description analysis
- Job application tracking
- Career recommendations
- Stronger resume validation
- More AI providers
- Integration with a broader career platform

## License

License information will be added as the project develops.