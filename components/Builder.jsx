"use client";

import { useRef, useState } from "react";
import { useResumeStore, cleanLines } from "@/lib/store";
import { AccordionItem } from "./ui";
import ContactSection from "./sections/ContactSection";
import SummarySection from "./sections/SummarySection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import CertsSection from "./sections/CertsSection";
import Preview from "./Preview";
import DownloadPdfButton from "./DownloadPdfButton";

export default function Builder() {
  const store = useResumeStore();
  const [openSection, setOpenSection] = useState("experience");
  const fileRef = useRef(null);

  if (!store.ready || !store.current) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted">
        Loading your studio...
      </div>
    );
  }

  const {
    state,
    library,
    drafts,
    current,
    setLibrary,
    setDraft,
    switchDraft,
    newDraft,
    duplicateDraft,
    deleteDraft,
    renameDraft,
    replaceAll,
  } = store;

  const toggle = (id) => setOpenSection((cur) => (cur === id ? null : id));

  const handleNew = () => {
    const name = window.prompt(
      "Name this resume (use the company or role so you can find it later):",
      "New role"
    );
    if (name) newDraft(name);
  };

  const handleRename = () => {
    const name = window.prompt("Rename this resume:", current.name);
    if (name) renameDraft(name);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${current.name}"? Your library is not affected.`)) {
      deleteDraft();
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-studio-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed?.library || !Array.isArray(parsed?.drafts)) {
          throw new Error("Not a Resume Studio backup file.");
        }
        if (
          window.confirm(
            "Importing replaces your current library and resumes with the backup. Continue?"
          )
        ) {
          replaceAll(parsed);
        }
      } catch (err) {
        window.alert(`Import failed: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const bulletCount = (arr) =>
    arr.reduce((n, x) => n + cleanLines(x.bullets).length, 0);

  return (
    <div className="min-h-screen">
      <a
        href="#editor"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to editor
      </a>

      <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-pine font-display text-sm font-bold text-white">
              RS
            </div>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-semibold tracking-tight">
                Resume Studio
              </p>
              <p className="text-[11px] text-muted">
                One career library, one resume per job
              </p>
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-1.5">
            <select
              className="input !w-auto !py-1.5"
              value={current.id}
              onChange={(e) => switchDraft(e.target.value)}
              aria-label="Switch resume"
            >
              {drafts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <button type="button" className="btn btn-quiet" onClick={handleRename}>
              Rename
            </button>
            <button type="button" className="btn btn-outline" onClick={handleNew}>
              New resume
            </button>
            <button type="button" className="btn btn-quiet" onClick={duplicateDraft}>
              Duplicate
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <span className="mx-1 hidden h-5 w-px bg-line sm:block" />
            <button type="button" className="btn btn-quiet" onClick={exportJson} title="Download all resumes and your library as a JSON backup">
              Export
            </button>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => fileRef.current?.click()}
              title="Restore from a JSON backup"
            >
              Import
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={importJson}
            />
            <DownloadPdfButton draft={current} />
          </div>
        </div>
      </header>

      <main
        id="editor"
        className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h1 className="font-display text-lg font-semibold tracking-tight">
              {current.name}
            </h1>
            <p className="text-[11px] text-muted">Saved on this device automatically</p>
          </div>

          <AccordionItem
            title="Contact"
            open={openSection === "contact"}
            onToggle={() => toggle("contact")}
          >
            <ContactSection draft={current} setDraft={setDraft} setLibrary={setLibrary} />
          </AccordionItem>

          <AccordionItem
            title="Professional Summary"
            count={current.summary.trim() ? 1 : 0}
            open={openSection === "summary"}
            onToggle={() => toggle("summary")}
          >
            <SummarySection draft={current} setDraft={setDraft} library={library} setLibrary={setLibrary} />
          </AccordionItem>

          <AccordionItem
            title="Work Experience"
            count={current.experiences.length}
            open={openSection === "experience"}
            onToggle={() => toggle("experience")}
          >
            <ExperienceSection draft={current} setDraft={setDraft} library={library} setLibrary={setLibrary} />
          </AccordionItem>

          <AccordionItem
            title="Education"
            count={current.educations.length}
            open={openSection === "education"}
            onToggle={() => toggle("education")}
          >
            <EducationSection draft={current} setDraft={setDraft} library={library} setLibrary={setLibrary} />
          </AccordionItem>

          <AccordionItem
            title="Projects"
            count={current.projects.length}
            open={openSection === "projects"}
            onToggle={() => toggle("projects")}
          >
            <ProjectsSection draft={current} setDraft={setDraft} library={library} setLibrary={setLibrary} />
          </AccordionItem>

          <AccordionItem
            title="Skills"
            count={current.skills.categories.length}
            open={openSection === "skills"}
            onToggle={() => toggle("skills")}
          >
            <SkillsSection draft={current} setDraft={setDraft} library={library} setLibrary={setLibrary} />
          </AccordionItem>

          <AccordionItem
            title="Certifications"
            count={current.certifications.length}
            open={openSection === "certs"}
            onToggle={() => toggle("certs")}
          >
            <CertsSection draft={current} setDraft={setDraft} library={library} setLibrary={setLibrary} />
          </AccordionItem>

          <p className="px-1 pt-1 text-[11px] leading-relaxed text-muted">
            {current.experiences.length} roles, {bulletCount(current.experiences)}{" "}
            experience bullets on this resume. Everything lives in your browser's
            local storage. Use Export for a backup before clearing browser data or
            switching devices.
          </p>
        </div>

        <div className="lg:sticky lg:top-[70px] lg:h-[calc(100vh-86px)] lg:overflow-y-auto">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Live preview
            </p>
            <span className="chip bg-pine-soft text-pine" title="Single column, Helvetica, real text layer, standard headers and bullets">
              ATS-safe layout
            </span>
          </div>
          <Preview draft={current} />
          <div className="h-6" />
        </div>
      </main>
    </div>
  );
}
