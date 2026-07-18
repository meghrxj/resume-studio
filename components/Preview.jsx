"use client";

import { cleanLines, contactLine } from "@/lib/store";

const HELV = { fontFamily: "Helvetica, Arial, sans-serif" };

// On-screen equivalents (px) of the PDF's extra-space steps.
const EXTRA_SPACE_PX = [0, 12, 24, 40];

function Section({ title, breakBefore, extraSpace, children }) {
  return (
    <>
      {breakBefore && (
        <div className="mt-5 flex items-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 border-t border-dashed border-neutral-300" />
          <span className="text-[9px] uppercase tracking-[0.15em] text-neutral-400">
            New page in PDF
          </span>
          <span className="h-px flex-1 border-t border-dashed border-neutral-300" />
        </div>
      )}
      <section className="mt-4" style={extraSpace ? { marginTop: 16 + extraSpace } : undefined}>
        <h2 className="border-b border-[#222] pb-0.5 text-[12px] font-bold uppercase tracking-[0.08em]">
          {title}
        </h2>
        <div className="mt-1.5">{children}</div>
      </section>
    </>
  );
}

function Bullet({ children }) {
  return (
    <div className="mt-[3px] flex pl-0.5">
      <span className="w-[14px] shrink-0">•</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

const dateRange = (start, end) =>
  [start, end].map((x) => (x || "").trim()).filter(Boolean).join(" - ");

export default function Preview({ draft }) {
  const c = draft.contact || {};
  const experiences = (draft.experiences || []).filter(
    (e) => e.title || e.company || cleanLines(e.bullets).length
  );
  const educations = (draft.educations || []).filter(
    (e) => e.institution || e.degree
  );
  const projects = (draft.projects || []).filter(
    (p) => p.title || cleanLines(p.bullets).length
  );
  const skillCats = (draft.skills?.categories || []).filter(
    (x) => (x.name || "").trim() || (x.items || "").trim()
  );
  const certs = (draft.certifications || [])
    .map((x) => (x.text || "").trim())
    .filter(Boolean);

  const empty =
    !c.name &&
    !(draft.summary || "").trim() &&
    experiences.length === 0 &&
    educations.length === 0 &&
    projects.length === 0 &&
    skillCats.length === 0 &&
    certs.length === 0;

  const renderers = {
    summary: () =>
      (draft.summary || "").trim() ? <p>{draft.summary.trim()}</p> : null,
    experience: () =>
      experiences.length === 0 ? null : (
        <>
          {experiences.map((e) => (
            <div key={e.id} className="mb-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-bold">{e.title}</span>
                <span className="shrink-0 text-[10.5px] font-bold">
                  {dateRange(e.start, e.end)}
                </span>
              </div>
              <p className="italic">
                {[e.company, e.location].filter(Boolean).join(", ")}
              </p>
              {cleanLines(e.bullets).map((b, i) => (
                <Bullet key={i}>{b}</Bullet>
              ))}
            </div>
          ))}
        </>
      ),
    education: () =>
      educations.length === 0 ? null : (
        <>
          {educations.map((e) => (
            <div key={e.id} className="mb-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-bold">{e.institution}</span>
                <span className="shrink-0 text-[10.5px] font-bold">
                  {dateRange(e.start, e.end)}
                </span>
              </div>
              <p className="italic">
                {[e.degree, e.grade ? `Grade: ${e.grade}` : "", e.location]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
              {(e.modules || "").trim() && (
                <Bullet>Relevant modules: {e.modules.trim()}</Bullet>
              )}
              {cleanLines(e.bullets).map((b, i) => (
                <Bullet key={i}>{b}</Bullet>
              ))}
            </div>
          ))}
        </>
      ),
    projects: () =>
      projects.length === 0 ? null : (
        <>
          {projects.map((p) => (
            <div key={p.id} className="mb-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-bold">{p.title}</span>
                <span className="shrink-0 text-[10.5px] font-bold">
                  {(p.date || "").trim()}
                </span>
              </div>
              {((p.tech || "").trim() || (p.link || "").trim()) && (
                <p className="italic">
                  {[p.tech, p.link].filter(Boolean).join(" | ")}
                </p>
              )}
              {cleanLines(p.bullets).map((b, i) => (
                <Bullet key={i}>{b}</Bullet>
              ))}
            </div>
          ))}
        </>
      ),
    skills: () =>
      skillCats.length === 0 ? null : (
        <>
          {skillCats.map((cat) => (
            <p key={cat.id} className="mt-[3px]">
              {(cat.name || "").trim() && (
                <span className="font-bold">{cat.name.trim()}: </span>
              )}
              {(cat.items || "").trim()}
            </p>
          ))}
        </>
      ),
    certifications: () =>
      certs.length === 0 ? null : (
        <>
          {certs.map((t, i) => (
            <Bullet key={i}>{t}</Bullet>
          ))}
        </>
      ),
  };

  const TITLES = {
    summary: "Professional Summary",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    skills: "Skills",
    certifications: "Certifications",
  };

  const order = draft.sectionOrder || Object.keys(TITLES);
  const settings = draft.sectionSettings || {};

  let renderedIndex = -1;
  const sections = order
    .map((id) => ({ id, body: renderers[id] ? renderers[id]() : null }))
    .filter((x) => x.body !== null)
    .map((x) => {
      renderedIndex += 1;
      const cfg = settings[x.id] || {};
      return (
        <Section
          key={x.id}
          title={TITLES[x.id]}
          breakBefore={renderedIndex > 0 && !!cfg.breakBefore}
          extraSpace={EXTRA_SPACE_PX[cfg.spaceBefore || 0] || 0}
        >
          {x.body}
        </Section>
      );
    });

  return (
    <div
      className="mx-auto w-full max-w-[820px] rounded-sm bg-white px-10 py-9 text-[11.5px] leading-[1.4] text-[#111] shadow-sheet ring-1 ring-black/5"
      style={{ ...HELV, minHeight: "1000px" }}
    >
      {empty ? (
        <p className="mt-40 text-center text-sm text-neutral-400" style={HELV}>
          This resume is empty. Add content on the left and it appears here exactly
          as the PDF will lay it out.
        </p>
      ) : (
        <>
          {/* Name style: matches PdfDoc's `name` style. Tweak size/weight
              here for the on-screen preview. */}
          <h1 className="text-center text-[18px] font-bold tracking-[0.01em]">
            {(c.name || "").trim()}
          </h1>
          {contactLine(c) && (
            <p className="mt-1 text-center text-[10.5px]">{contactLine(c)}</p>
          )}
          {sections}
        </>
      )}
    </div>
  );
}
