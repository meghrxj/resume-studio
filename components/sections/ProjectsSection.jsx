"use client";

import { uid, deepCopy } from "@/lib/store";
import LibraryPicker from "../LibraryPicker";
import { Field, TextArea, EntryToolbar, EmptyState, moveItem } from "../ui";

export default function ProjectsSection({ draft, setDraft, library, setLibrary }) {
  const items = draft.projects;

  const update = (i, patch) =>
    setDraft((d) => {
      const next = [...d.projects];
      next[i] = { ...next[i], ...patch };
      return { ...d, projects: next };
    });

  const remove = (i) =>
    setDraft((d) => ({ ...d, projects: d.projects.filter((_, idx) => idx !== i) }));

  const move = (i, dir) =>
    setDraft((d) => ({ ...d, projects: moveItem(d.projects, i, dir) }));

  const addBlank = () =>
    setDraft((d) => ({
      ...d,
      projects: [
        ...d.projects,
        { id: uid(), title: "", tech: "", date: "", link: "", bullets: [] },
      ],
    }));

  const addFromLibrary = (libItems) =>
    setDraft((d) => ({
      ...d,
      projects: [
        ...d.projects,
        ...libItems.map((li) => {
          const c = deepCopy(li);
          const libId = c.id;
          c.id = uid();
          c.libId = libId;
          delete c.label;
          delete c.tags;
          return c;
        }),
      ],
    }));

  const saveVariation = (i) => {
    const it = items[i];
    const label = window.prompt("Name this project variation for your library:", it.title);
    if (!label) return;
    const source = library.projects.find((x) => x.id === it.libId);
    setLibrary((lib) => ({
      ...lib,
      projects: [
        ...lib.projects,
        { ...deepCopy(it), id: uid(), label, tags: source ? source.tags : [] },
      ],
    }));
  };

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <EmptyState>No projects on this resume yet. Add them from your library below.</EmptyState>
      )}

      {items.map((it, i) => (
        <div key={it.id} className="rounded-xl border border-line bg-bg/40 p-3.5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Project title" className="sm:col-span-2" value={it.title} onChange={(e) => update(i, { title: e.target.value })} />
            <Field label="Tech stack" value={it.tech} onChange={(e) => update(i, { tech: e.target.value })} placeholder="Python, LangChain, Docker" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date" value={it.date} onChange={(e) => update(i, { date: e.target.value })} placeholder="Mar 2025" />
              <Field label="Link" value={it.link} onChange={(e) => update(i, { link: e.target.value })} placeholder="github.com/..." />
            </div>
          </div>
          <TextArea
            className="mt-3"
            label="Bullet points"
            rows={Math.max(3, (it.bullets || []).length + 1)}
            value={(it.bullets || []).join("\n")}
            onChange={(e) => update(i, { bullets: e.target.value.split("\n") })}
            hint="One bullet per line."
          />
          <EntryToolbar
            onSave={() => saveVariation(i)}
            onUp={() => move(i, -1)}
            onDown={() => move(i, 1)}
            canUp={i > 0}
            canDown={i < items.length - 1}
            onRemove={() => remove(i)}
          />
        </div>
      ))}

      <div className="flex flex-wrap items-start gap-2">
        <div className="min-w-0 flex-1">
          <LibraryPicker
            items={library.projects}
            onAdd={addFromLibrary}
            buttonLabel="Add projects from library"
            renderPreview={(it) => `${it.title}${it.tech ? ` · ${it.tech}` : ""}`}
          />
        </div>
        <button type="button" className="btn btn-quiet" onClick={addBlank}>
          + Blank project
        </button>
      </div>
    </div>
  );
}
