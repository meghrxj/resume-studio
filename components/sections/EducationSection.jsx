"use client";

import { uid, deepCopy } from "@/lib/store";
import LibraryPicker from "../LibraryPicker";
import { Field, TextArea, EntryToolbar, EmptyState, moveItem } from "../ui";

export default function EducationSection({ draft, setDraft, library, setLibrary }) {
  const items = draft.educations;

  const update = (i, patch) =>
    setDraft((d) => {
      const next = [...d.educations];
      next[i] = { ...next[i], ...patch };
      return { ...d, educations: next };
    });

  const remove = (i) =>
    setDraft((d) => ({
      ...d,
      educations: d.educations.filter((_, idx) => idx !== i),
    }));

  const move = (i, dir) =>
    setDraft((d) => ({ ...d, educations: moveItem(d.educations, i, dir) }));

  const addBlank = () =>
    setDraft((d) => ({
      ...d,
      educations: [
        ...d.educations,
        {
          id: uid(),
          institution: "",
          location: "",
          degree: "",
          grade: "",
          start: "",
          end: "",
          modules: "",
          bullets: [],
        },
      ],
    }));

  const addFromLibrary = (libItems) =>
    setDraft((d) => ({
      ...d,
      educations: [
        ...d.educations,
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

  const insertModules = (i, blockId) => {
    const block = library.moduleBlocks.find((m) => m.id === blockId);
    if (block) update(i, { modules: block.items });
  };

  const saveModuleBlock = (i) => {
    const it = items[i];
    if (!(it.modules || "").trim()) return;
    const label = window.prompt(
      "Name this module set (e.g. 'MSc modules: fintech angle'):"
    );
    if (!label) return;
    setLibrary((lib) => ({
      ...lib,
      moduleBlocks: [
        ...lib.moduleBlocks,
        { id: uid(), label, appliesTo: it.libId || "", items: it.modules },
      ],
    }));
  };

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <EmptyState>No education entries yet. Add them from your library below.</EmptyState>
      )}

      {items.map((it, i) => {
        const relevantBlocks = library.moduleBlocks.filter(
          (m) => !m.appliesTo || !it.libId || m.appliesTo === it.libId
        );
        return (
          <div key={it.id} className="rounded-xl border border-line bg-bg/40 p-3.5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Institution" value={it.institution} onChange={(e) => update(i, { institution: e.target.value })} />
              <Field label="Degree" value={it.degree} onChange={(e) => update(i, { degree: e.target.value })} />
              <Field label="Location" value={it.location} onChange={(e) => update(i, { location: e.target.value })} />
              <Field label="Grade / GPA" value={it.grade} onChange={(e) => update(i, { grade: e.target.value })} placeholder="2:1 (Expected)" />
              <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:max-w-xs">
                <Field label="Start" value={it.start} onChange={(e) => update(i, { start: e.target.value })} />
                <Field label="End" value={it.end} onChange={(e) => update(i, { end: e.target.value })} />
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-clay/25 bg-clay-soft/50 p-2.5">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-clay">
                Relevant modules (swap per job description)
              </p>
              {relevantBlocks.length > 0 && (
                <select
                  className="input mb-2"
                  defaultValue=""
                  onChange={(e) => {
                    insertModules(i, e.target.value);
                    e.target.value = "";
                  }}
                >
                  <option value="" disabled>
                    Insert a saved module set...
                  </option>
                  {relevantBlocks.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
              )}
              <TextArea
                rows={2}
                value={it.modules || ""}
                onChange={(e) => update(i, { modules: e.target.value })}
                placeholder="Comma-separated module list..."
              />
              <button
                type="button"
                className="btn btn-quiet mt-1.5 !px-2 !py-1 text-xs"
                onClick={() => saveModuleBlock(i)}
              >
                Save these modules as a reusable set
              </button>
            </div>

            <TextArea
              className="mt-3"
              label="Additional bullet points"
              rows={3}
              value={(it.bullets || []).join("\n")}
              onChange={(e) => update(i, { bullets: e.target.value.split("\n") })}
              hint="One bullet per line: capstone projects, frameworks applied, research focus."
            />
            <EntryToolbar
              onUp={() => move(i, -1)}
              onDown={() => move(i, 1)}
              canUp={i > 0}
              canDown={i < items.length - 1}
              onRemove={() => remove(i)}
            />
          </div>
        );
      })}

      <div className="flex flex-wrap items-start gap-2">
        <div className="min-w-0 flex-1">
          <LibraryPicker
            items={library.educations}
            onAdd={addFromLibrary}
            buttonLabel="Add education from library"
            renderPreview={(it) => `${it.degree}, ${it.institution}`}
          />
        </div>
        <button type="button" className="btn btn-quiet" onClick={addBlank}>
          + Blank entry
        </button>
      </div>
    </div>
  );
}
