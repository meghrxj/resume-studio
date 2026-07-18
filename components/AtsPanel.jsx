"use client";

import { useMemo, useState } from "react";
import { analyzeResume } from "@/lib/ats";
import { TextArea } from "./ui";

const STATUS_ICON = {
  pass: <span className="text-pine">✓</span>,
  warn: <span className="text-clay">!</span>,
  fail: <span className="text-red-600">✕</span>,
};

function scoreColor(score) {
  if (score >= 80) return "text-pine";
  if (score >= 60) return "text-clay";
  return "text-red-600";
}

function barColor(score) {
  if (score >= 80) return "bg-pine";
  if (score >= 60) return "bg-clay";
  return "bg-red-500";
}

export default function AtsPanel({ draft, setDraft }) {
  const [open, setOpen] = useState(false);
  const result = useMemo(
    () => analyzeResume(draft, draft.jd),
    [draft]
  );

  const issues = result.checks.filter((c) => c.status !== "pass");

  return (
    <div className="card mb-4 overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-bg/60"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5">
          <span className="font-display text-[15px] font-semibold tracking-tight">
            ATS check
          </span>
          <span className={`font-display text-[15px] font-bold ${scoreColor(result.score)}`}>
            {result.score}/100
          </span>
          {issues.length > 0 && (
            <span className="chip bg-clay-soft text-clay">
              {issues.length} suggestion{issues.length === 1 ? "" : "s"}
            </span>
          )}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-line px-4 py-4">
          <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className={`h-full rounded-full transition-all ${barColor(result.score)}`}
              style={{ width: `${result.score}%` }}
            />
          </div>

          <ul className="space-y-1.5">
            {result.checks.map((c) => (
              <li key={c.id} className="text-sm leading-snug">
                <span className="mr-1.5 inline-block w-3 text-center font-bold">
                  {STATUS_ICON[c.status]}
                </span>
                <span className="font-medium">{c.label}</span>
                <span className="ml-1 text-[11px] text-muted">
                  {c.earned}/{c.max}
                </span>
                {c.advice && (
                  <p className="ml-[18px] text-[12px] text-muted">{c.advice}</p>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-dashed border-line pt-3">
            <TextArea
              label="Job description (optional, for keyword matching)"
              hint="Paste the JD here. It is analysed entirely in your browser; nothing is sent anywhere. It also saves with this resume."
              value={draft.jd || ""}
              placeholder="Paste the job advert text..."
              onChange={(e) => setDraft((d) => ({ ...d, jd: e.target.value }))}
            />
          </div>

          {result.keywords && (
            <div className="mt-3 space-y-2">
              {result.keywords.missing.length > 0 && (
                <div>
                  <p className="label">Missing from your resume</p>
                  <div className="flex flex-wrap gap-1">
                    {result.keywords.missing.map((k) => (
                      <span key={k} className="chip bg-clay-soft text-clay">
                        {k}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[11px] text-muted">
                    Work these into bullets, your summary or skills, but only
                    the ones that are genuinely true for you.
                  </p>
                </div>
              )}
              {result.keywords.matched.length > 0 && (
                <div>
                  <p className="label">Already covered</p>
                  <div className="flex flex-wrap gap-1">
                    {result.keywords.matched.map((k) => (
                      <span key={k} className="chip bg-pine-soft text-pine">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <p className="mt-3 text-[11px] leading-relaxed text-muted">
            This is a heuristic guide computed locally, not a real ATS. Real
            systems mostly check that text extracts cleanly (which this
            layout guarantees) and match keywords, which is what the JD box
            above tests.
          </p>
        </div>
      )}
    </div>
  );
}
