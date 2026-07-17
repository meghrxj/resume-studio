"use client";

import { uid, deepCopy } from "@/lib/store";
import { Field, TextArea, EmptyState, BookmarkIcon, moveItem } from "../ui";

export default function SkillsSection({ draft, setDraft, library, setLibrary }) {
  const cats = draft.skills.categories;

  const update = (i, patch) =>
    setDraft((d) => {
      const next = [...d.skills.categories];
      next[i] = { ...next[i], ...patch };
      return { ...d, skills: { categories: next } };
    });

  const remove = (i) =>
    setDraft((d) => ({
      ...d,
      skills: { categories: d.skills.categories.filter((_, idx) => idx !== i) },
    }));

  const move = (i, dir) =>
    setDraft((d) => ({
      ...d,
      skills: { categories: moveItem(d.skills.categories, i, dir) },
    }));

  const addCategory = () =>
    setDraft((d) => ({
      ...d,
      skills: {
        categories: [...d.skills.categories, { id: uid(), name: "", items: "" }],
      },
    }));

  const loadSet = (e) => {
    const set = library.skillSets.find((s) => s.id === e.target.value);
    e.target.value = "";
    if (!set) return;
    if (
      cats.some((c) => c.name || c.items) &&
      !window.confirm(`Replace the current skills with the "${set.label}" set?`)
    ) {
      return;
    }
    setDraft((d) => ({
      ...d,
      skills: {
        categories: set.categories.map((c) => ({ id: uid(), ...deepCopy(c) })),
      },
    }));
  };

  const saveSet = () => {
    if (cats.length === 0) return;
    const label = window.prompt(
      "Name this skill set for your library (e.g. 'AI engineer, data-heavy roles'):"
    );
    if (!label) return;
    setLibrary((lib) => ({
      ...lib,
      skillSets: [
        ...lib.skillSets,
        {
          id: uid(),
          label,
          tags: [],
          categories: cats.map(({ name, items }) => ({ name, items })),
        },
      ],
    }));
  };

  return (
    <div className="space-y-3">
      <select className="input" defaultValue="" onChange={loadSet}>
        <option value="" disabled>
          Load a saved skill set from your library...
        </option>
        {library.skillSets.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>

      {cats.length === 0 && (
        <EmptyState>No skill categories yet. Load a set above or add a category.</EmptyState>
      )}

      {cats.map((c, i) => (
        <div key={c.id} className="rounded-xl border border-line bg-bg/40 p-3">
          <div className="flex items-start gap-2">
            <Field
              className="flex-1"
              label="Category"
              value={c.name}
              onChange={(e) => update(i, { name: e.target.value })}
              placeholder="Languages & Core"
            />
            <div className="flex gap-1 pt-5">
              <button type="button" className="btn btn-quiet !px-2 !py-1 text-xs" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
              <button type="button" className="btn btn-quiet !px-2 !py-1 text-xs" onClick={() => move(i, 1)} disabled={i === cats.length - 1} aria-label="Move down">↓</button>
              <button type="button" className="btn btn-danger !px-2 !py-1 text-xs" onClick={() => remove(i)}>Remove</button>
            </div>
          </div>
          <TextArea
            className="mt-2"
            rows={2}
            value={c.items}
            onChange={(e) => update(i, { items: e.target.value })}
            placeholder="Python | SQL | LangChain | ..."
            hint="Separate skills with a pipe or comma. Add exact keywords from the job description here."
          />
        </div>
      ))}

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-quiet" onClick={addCategory}>
          + Category
        </button>
        <button type="button" className="btn btn-outline text-xs" onClick={saveSet}>
          <BookmarkIcon />
          Save current skills as a set
        </button>
      </div>
    </div>
  );
}
