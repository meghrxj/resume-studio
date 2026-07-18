# Resume Studio

A personal resume and portfolio builder built around one idea: your career content is written once, stored in a library, and reassembled per job description. No retyping, no hunting through old PDF versions.

Built with Next.js 14 (App Router), Tailwind CSS, and @react-pdf/renderer.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to vercel.com, click "Add New Project", and import the repository.
3. Vercel auto-detects Next.js. Accept the defaults and click Deploy.

No environment variables are needed. The app is fully client-side; all data stays in the visitor's own browser.

## How it works

### Content Library
The library is the permanent record of everything you have ever put on a resume:

- Work experiences, each saved as a named variation (the same Coca-Cola internship exists in client-service, procurement, and business-analyst framings, for example)
- Professional summaries per career track
- Projects with alternate framings
- Skill sets grouped by category
- Module/coursework blocks that swap in and out of education entries per job description
- Certifications

The library ships pre-seeded from four real resume variants (AI engineering, procurement, business analysis, and client service tracks).

### Building a resume for a job description
1. Click "New resume" and name it after the company or role.
2. In each section, click "Add from library" and tick the blocks that match the JD. Filter by tag (AI Engineering, Procurement, Business Analysis, Client Service, Consulting) to narrow down fast.
3. Tweak bullets, dates, and keywords inline. Bullets are one per line in the textarea.
4. If a tweak is worth keeping, hit "Save to library" on that card and it becomes a new named variation for future resumes.
5. Reorder sections with the up/down arrows on each section header (Education above Experience for a student-facing resume, for example). Inside each section, the Layout bar lets you force it to start on a new PDF page and add extra blank space above it.
6. Open the ATS check above the preview, paste the job description, and work through the suggestions and missing keywords.
7. Download the PDF.

Two example resumes are included so you can see the flow immediately.

### ATS guarantees
The exported PDF is generated with @react-pdf/renderer, which produces a real, selectable text layer (not an image render, which is why html2canvas-based exporters were avoided). The layout is deliberately strict:

- Helvetica only, one of the core PDF standard fonts every parser handles
- Single column: no tables, columns, text boxes, icons, or images
- Standard section headers: Professional Summary, Experience, Education, Projects, Skills, Certifications
- Plain round bullets
- Hyphenation disabled so no word is ever split across lines

The live preview on the right mirrors the PDF layout, so what you see is what the parser gets. When a section is set to start on a new page, the preview shows a dashed "New page in PDF" marker at that point.

### ATS check
The panel above the preview scores the resume 0-100 with a fully offline heuristic (nothing leaves the browser, no API): parseable contact details, summary length, complete role headers, bullet depth, quantified achievements, action verbs vs weak phrasing, skills coverage, and overall length. Paste a job description into the panel and it also computes keyword coverage locally, listing which JD terms the resume already contains and which are missing. The JD is saved with the resume. Treat it as a guide: real ATS systems mostly need clean text extraction (guaranteed here) plus keyword relevance.

### Adjusting the name styling
The candidate name at the top is intentionally modest (14.5pt bold, typed casing, no forced capitals). To tune it further:

- PDF: `components/PdfDoc.jsx`, the `name` entry in the StyleSheet near the top (fontSize, fontFamily "Helvetica" vs "Helvetica-Bold", letterSpacing). The `<Text style={s.name}>` line near the bottom controls the casing.
- On-screen preview: `components/Preview.jsx`, the `<h1>` near the bottom of the file.

### Data, storage, and backups
Everything is stored in your browser's localStorage under the key `resume-studio-v1`. Nothing is sent to a server.

That means data is per-browser and per-device. Use the Export button in the header to download a JSON backup, and Import to restore it on another device or after clearing browser data. Export regularly.

## Project structure

```
app/
  layout.js            Root layout, fonts, metadata
  page.js              Entry point (client-only, loads the Builder)
  globals.css          Design tokens and component classes
components/
  Builder.jsx          App shell: header, draft manager, accordion, preview
  LibraryPicker.jsx    Generic checklist picker over library items
  Preview.jsx          Live HTML preview mirroring the PDF
  PdfDoc.jsx           The ATS-strict PDF document definition
  DownloadPdfButton.jsx PDF generation and download
  ui.jsx               Shared primitives (fields, accordion, toolbars)
  sections/            One form component per resume section
lib/
  seed.js              The pre-seeded content library and draft factories
  store.js             State management and localStorage persistence
```

## Customising the seed data

All pre-loaded content lives in `lib/seed.js`. Edit it freely; the seed only applies on first load. If you have already used the app and want a re-seed, clear the `resume-studio-v1` key in your browser's localStorage (DevTools > Application > Local Storage) and reload.
