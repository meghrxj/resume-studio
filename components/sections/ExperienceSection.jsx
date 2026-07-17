"use client";

import { uid, deepCopy } from "@/lib/store";
import LibraryPicker from "../LibraryPicker";
import { Field, TextArea, EntryToolbar, EmptyState, moveItem } from "../ui";

export default function ExperienceSection({ draft, setDraft, library, setLibrary }) {
  const items = draft.experiences;

  const update = (i, patch) =>
    setDraft((d) => {
      const next = [...d.experiences];
      next[i] = { ...next[i], ...patch };
      return { ...d, experiences: next };
    });

  const remove = (i) =>
    setDraft((d) => ({
      ...d,
      experiences: d.experiences.filter((_, idx) => idx !== i),
    }));

  const move = (i, dir) =>
    setDraft((d) => ({ ...d, experiences: moveItem(d.experiences, i, dir) }));

  const addBlank = () =>
    setDraft((d) => ({
      ...d,
      experiences: [
        ...d.experiences,
        { id: uid(), title: "", company: "", location: "", start: "", end: "", bullets: [] },
      ],
    }));

  const addFromLibrary = (libItems) =>
    setDraft((d) => ({
      ...d,
      experiences: [
        ...d.experiences,
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
    const label = window.prompt(
      "Name this variation for your library:",
      `${it.title || "Role"} at ${it.company || "Company"}`
    );
    if (!label) return;
    const source = library.experiences.find((x) => x.id === it.libId);
    setLibrary((lib) => ({
      ...lib,
      experiences: [
        ...lib.experiences,
        {
          ...deepCopy(it),
          id: uid(),
          label,
          tags: source ? source.tags : [],
        },
      ],
    }));
  };

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <EmptyState>
          No roles on this resume yet. Pull them from your library below, or add a blank one.
        </EmptyState>
      )}

      {items.map((it, i) => (
        <div key={it.id} className="rounded-xl border border-line bg-bg/40 p-3.5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Job title" value={it.title} onChange={(e) => update(i, { title: e.target.value })} />
            <Field label="Company" value={it.company} onChange={(e) => update(i, { company: e.target.value })} />
            <Field label="Location" value={it.location} onChange={(e) => update(i, { location: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start" value={it.start} onChange={(e) => update(i, { start: e.target.value })} placeholder="Jan 2025" />
              <Field label="End" value={it.end} onChange={(e) => update(i, { end: e.target.value })} placeholder="Present" />
            </div>
          </div>
          <TextArea
            className="mt-3"
            label="Bullet points"
            rows={Math.max(4, (it.bullets || []).length + 1)}
            value={(it.bullets || []).join("\n")}
            onChange={(e) => update(i, { bullets: e.target.value.split("\n") })}
            hint="One bullet per line. Tweak wording per job description, then save the version you like as a library variation."
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
            items={library.experiences}
            onAdd={addFromLibrary}
            buttonLabel="Add roles from library"
            renderPreview={(it) =>
              `${it.title} at ${it.company} (${it.start} to ${it.end}) · ${(it.bullets || []).length} bullets`
            }
          />
        </div>
        <button type="button" className="btn btn-quiet" onClick={addBlank}>
          + Blank role
        </button>
      </div>
    </div>
  );
}
