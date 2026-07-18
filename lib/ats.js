// Offline ATS analysis. No API, no network: everything runs on the text
// already in the draft, plus an optional pasted job description for
// keyword matching. Heuristics mirror what common ATS/recruiter screens
// actually look for: parseable contact info, quantified achievement
// bullets that start with action verbs, a real skills section, sane
// length, and coverage of the JD's vocabulary.

import { cleanLines } from "./store";

const ACTION_VERBS = new Set(
  `built developed designed led managed created delivered launched improved
   increased reduced optimised optimized automated implemented analysed
   analyzed negotiated sourced coordinated streamlined established drove
   spearheaded conducted collaborated engineered architected deployed
   migrated integrated evaluated researched presented authored produced
   achieved secured saved cut grew scaled owned defined shipped tested
   instrumented containerised containerized configured trained mentored
   supervised resolved identified initiated facilitated forecasted
   modelled modeled audited benchmarked consolidated standardised
   standardized transformed accelerated enabled won partnered advised
   supported prepared organised organized handled processed maintained`
    .split(/\s+/)
    .filter(Boolean)
);

const WEAK_PHRASES = [
  "responsible for",
  "worked on",
  "helped with",
  "duties included",
  "involved in",
  "assisted with",
  "tasked with",
];

const STOPWORDS = new Set(
  `a an and are as at be been being but by can could did do does for from
   had has have how i if in into is it its just may might more most much
   must no not of on or our out over shall should so some such than that
   the their them then there these they this those through to under up
   was we were what when where which while who whom why will with within
   would you your yours per etc via able strong excellent good great work
   working team teams role roles job candidate applicant experience years
   year skills skill ability required requirements preferred plus new
   including include includes well knowledge understanding based across
   ideal join opportunity company us he she about also both each other
   any all ensure ensuring using use used level looking seek seeking
   apply salary benefits days week hybrid remote office location full
   part time day month we're you'll you've who's what's it's don't`
    .split(/\s+/)
    .filter(Boolean)
);

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#./ -]/g, " ")
    .split(/[\s/]+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t) && !/^\d+$/.test(t));
}

/** Every word of text on the resume, as one lowercase string. */
export function resumeText(draft) {
  const parts = [
    draft.summary || "",
    ...(draft.experiences || []).flatMap((e) => [
      e.title,
      e.company,
      e.location,
      ...cleanLines(e.bullets),
    ]),
    ...(draft.educations || []).flatMap((e) => [
      e.institution,
      e.degree,
      e.modules,
      ...cleanLines(e.bullets),
    ]),
    ...(draft.projects || []).flatMap((p) => [
      p.title,
      p.tech,
      ...cleanLines(p.bullets),
    ]),
    ...((draft.skills && draft.skills.categories) || []).flatMap((c) => [
      c.name,
      c.items,
    ]),
    ...(draft.certifications || []).map((c) => c.text),
  ];
  return parts.filter(Boolean).join(" ");
}

function allBullets(draft) {
  return [
    ...(draft.experiences || []).flatMap((e) => cleanLines(e.bullets)),
    ...(draft.projects || []).flatMap((p) => cleanLines(p.bullets)),
  ];
}

function wordCount(text) {
  return (text || "").split(/\s+/).filter(Boolean).length;
}

/**
 * Extract candidate keywords from a job description: any non-stopword
 * that appears twice or more, plus tech-looking terms (contain digits,
 * +, #, or a dot, e.g. gpt-4o, c++, power bi parts, node.js) even if
 * they appear once. Returns [{ term, count }] sorted by frequency.
 */
export function extractKeywords(jdText) {
  const tokens = tokenize(jdText);
  const freq = new Map();
  for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);
  // Words that appear Capitalized (or ALLCAPS) in the raw JD are usually
  // product/tool names (Terraform, RAGAS, Qdrant), so keep them even if
  // they only appear once. Stopwords still filter sentence-start noise.
  const capitalized = new Set(
    (jdText.match(/\b[A-Z][A-Za-z0-9+#.]{2,}\b/g) || []).map((w) =>
      w.toLowerCase()
    )
  );
  const techLike = (t) =>
    /[0-9+#.]/.test(t) || t.length >= 10 || capitalized.has(t);
  const terms = [...freq.entries()]
    .filter(([t, n]) => n >= 2 || techLike(t))
    .sort((a, b) => b[1] - a[1])
    .map(([term, count]) => ({ term, count }));
  return terms.slice(0, 40);
}

/**
 * Analyze a draft. Returns { score, checks, keywords } where score is
 * 0-100, each check is { id, label, earned, max, status, advice } and
 * status is "pass" | "warn" | "fail". keywords is null when no JD given,
 * else { matched: [], missing: [] }.
 */
export function analyzeResume(draft, jdText) {
  const checks = [];
  const bullets = allBullets(draft);
  const fullText = resumeText(draft);
  const totalWords =
    wordCount(fullText) + wordCount((draft.contact && draft.contact.name) || "");

  const add = (id, label, earned, max, advice) => {
    const ratio = max === 0 ? 1 : earned / max;
    checks.push({
      id,
      label,
      earned: Math.round(earned * 10) / 10,
      max,
      status: ratio >= 0.999 ? "pass" : ratio >= 0.5 ? "warn" : "fail",
      advice: ratio >= 0.999 ? "" : advice,
    });
  };

  // 1. Contact details a parser can lift out (10)
  const c = draft.contact || {};
  const hasEmail = /\S+@\S+\.\S+/.test(c.email || "");
  const hasPhone = /(\+?\d[\d\s().-]{7,})/.test(c.phone || "");
  const hasLocation = !!(c.location || "").trim();
  const contactPts = (hasEmail ? 4 : 0) + (hasPhone ? 4 : 0) + (hasLocation ? 2 : 0);
  add(
    "contact",
    "Contact details",
    contactPts,
    10,
    [
      !hasEmail && "add a valid email address",
      !hasPhone && "add a phone number with country code",
      !hasLocation && "add a city or location",
    ]
      .filter(Boolean)
      .join("; ")
  );

  // 2. Professional summary (10)
  const sumWords = wordCount(draft.summary);
  let sumPts = 0;
  if (sumWords === 0) sumPts = 0;
  else if (sumWords < 20) sumPts = 5;
  else if (sumWords <= 95) sumPts = 10;
  else sumPts = 6;
  add(
    "summary",
    "Professional summary",
    sumPts,
    10,
    sumWords === 0
      ? "add a 2-4 sentence summary; ATS and recruiters both read it first"
      : sumWords < 20
        ? "your summary is very short; aim for 30-90 words"
        : "your summary is long; tighten it to under ~90 words"
  );

  // 3. Experience structure (10)
  const exps = draft.experiences || [];
  const complete = exps.filter(
    (e) =>
      (e.title || "").trim() &&
      (e.company || "").trim() &&
      ((e.start || "").trim() || (e.end || "").trim())
  );
  const expPts =
    exps.length === 0 ? 0 : Math.round((complete.length / exps.length) * 10);
  add(
    "structure",
    "Roles have title, company and dates",
    expPts,
    10,
    exps.length === 0
      ? "add at least one work experience entry"
      : "some roles are missing a title, company or dates; parsers rely on all three"
  );

  // 4. Bullet depth (10)
  const avgBullets =
    exps.length === 0
      ? 0
      : bullets.length === 0
        ? 0
        : exps.reduce((n, e) => n + cleanLines(e.bullets).length, 0) / exps.length;
  const longBullets = bullets.filter((b) => wordCount(b) > 40).length;
  let depthPts = Math.min(10, avgBullets * 3.4);
  depthPts = Math.max(0, depthPts - longBullets * 1.5);
  add(
    "depth",
    "Bullet depth per role",
    depthPts,
    10,
    avgBullets < 3
      ? "aim for 3-5 bullets per role describing outcomes, not duties"
      : `${longBullets} bullet(s) run past ~40 words; split or trim them`
  );

  // 5. Quantified results (15)
  const quantified = bullets.filter((b) =>
    /(\d|%|£|\$|€|per cent|percent)/i.test(b)
  ).length;
  const quantShare = bullets.length ? quantified / bullets.length : 0;
  const quantPts = Math.min(15, (quantShare / 0.5) * 15);
  add(
    "numbers",
    "Quantified achievements",
    quantPts,
    15,
    "add numbers to more bullets (%, £, time saved, volumes handled); aim for numbers in at least half of them"
  );

  // 6. Action verbs and weak phrasing (10)
  const verbStarts = bullets.filter((b) => {
    const first = (b.split(/\s+/)[0] || "").toLowerCase().replace(/[^a-z]/g, "");
    return ACTION_VERBS.has(first);
  }).length;
  const verbShare = bullets.length ? verbStarts / bullets.length : 0;
  const weakHits = [];
  for (const b of bullets) {
    for (const w of WEAK_PHRASES) {
      if (b.toLowerCase().includes(w)) weakHits.push(w);
    }
  }
  let verbPts = Math.min(10, (verbShare / 0.75) * 10);
  verbPts = Math.max(0, verbPts - new Set(weakHits).size * 2);
  add(
    "verbs",
    "Bullets start with action verbs",
    verbPts,
    10,
    weakHits.length
      ? `replace weak phrasing (${[...new Set(weakHits)].join(", ")}) with strong verbs like built, led, reduced, negotiated`
      : "start more bullets with a strong past-tense verb (built, led, reduced, negotiated...)"
  );

  // 7. Skills section (10)
  const skillItems = ((draft.skills && draft.skills.categories) || [])
    .flatMap((cat) => (cat.items || "").split(/[|,]/))
    .map((x) => x.trim())
    .filter(Boolean);
  const skillPts = Math.min(10, (skillItems.length / 10) * 10);
  add(
    "skills",
    "Skills section coverage",
    skillPts,
    10,
    "list at least 10 concrete skills/tools; ATS keyword filters lean heavily on this section"
  );

  // 8. Overall length (10)
  let lenPts;
  if (totalWords < 200) lenPts = 3;
  else if (totalWords < 320) lenPts = 7;
  else if (totalWords <= 1000) lenPts = 10;
  else if (totalWords <= 1250) lenPts = 7;
  else lenPts = 4;
  add(
    "length",
    `Length (${totalWords} words)`,
    lenPts,
    10,
    totalWords < 320
      ? "the resume is thin; add detail until you are past ~350 words"
      : "the resume is long; cut to roughly two pages (under ~1,000 words)"
  );

  // 9. Layout safety (5): guaranteed by this app's export, so always full
  // marks. Kept visible so the score is honest about where points come from.
  add("layout", "Single column, standard fonts and headers", 5, 5, "");

  // 10. JD keyword coverage (15, only when a JD is pasted)
  let keywords = null;
  if ((jdText || "").trim()) {
    const kws = extractKeywords(jdText);
    const resumeTokens = new Set(tokenize(fullText));
    const matched = [];
    const missing = [];
    for (const k of kws) {
      (resumeTokens.has(k.term) ? matched : missing).push(k.term);
    }
    const coverage = kws.length ? matched.length / kws.length : 1;
    add(
      "jd",
      "Job description keyword coverage",
      coverage * 15,
      15,
      "work the missing keywords below into your bullets, summary or skills, but only where they are true"
    );
    keywords = { matched, missing: missing.slice(0, 18) };
  }

  const earned = checks.reduce((n, x) => n + x.earned, 0);
  const max = checks.reduce((n, x) => n + x.max, 0);
  const score = Math.round((earned / max) * 100);

  return { score, checks, keywords };
}
