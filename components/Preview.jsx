"use client";

import { cleanLines, contactLine } from "@/lib/store";

const HELV = { fontFamily: "Helvetica, Arial, sans-serif" };

function Section({ title, children }) {
  return (
    <section className="mt-4">
      <h2 className="border-b border-[#222] pb-0.5 text-[12px] font-bold uppercase tracking-[0.08em]">
        {title}
      </h2>
      <div className="mt-1.5">{children}</div>
    </section>
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
          <h1 className="text-center text-[22px] font-bold tracking-[0.03em]">
            {(c.name || "").toUpperCase()}
          </h1>
          {contactLine(c) && (
            <p className="mt-1 text-center text-[10.5px]">{contactLine(c)}</p>
          )}

          {(draft.summary || "").trim() && (
            <Section title="Professional Summary">
              <p>{draft.summary.trim()}</p>
            </Section>
          )}

          {experiences.length > 0 && (
            <Section title="Experience">
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
            </Section>
          )}

          {educations.length > 0 && (
            <Section title="Education">
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
            </Section>
          )}

          {projects.length > 0 && (
            <Section title="Projects">
              {projects.map((p) => (
                <div key={p.id} className="mb-2.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-bold">{p.title}</span>
                    <span className="shrink-0 text-[10.5px] font-bold">
                      {(p.date || "").trim()}
                    </span>
                  </div>
                  {(p.tech || p.link) && (
                    <p className="italic">
                      {[p.tech, p.link].filter(Boolean).join(" | ")}
                    </p>
                  )}
                  {cleanLines(p.bullets).map((b, i) => (
                    <Bullet key={i}>{b}</Bullet>
                  ))}
                </div>
              ))}
            </Section>
          )}

          {skillCats.length > 0 && (
            <Section title="Skills">
              {skillCats.map((cat) => (
                <p key={cat.id} className="mt-[3px]">
                  {(cat.name || "").trim() && (
                    <span className="font-bold">{cat.name.trim()}: </span>
                  )}
                  {(cat.items || "").trim()}
                </p>
              ))}
            </Section>
          )}

          {certs.length > 0 && (
            <Section title="Certifications">
              {certs.map((t, i) => (
                <Bullet key={i}>{t}</Bullet>
              ))}
            </Section>
          )}
        </>
      )}
    </div>
  );
}
