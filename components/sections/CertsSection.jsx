"use client";

import { uid } from "@/lib/store";
import LibraryPicker from "../LibraryPicker";
import { EmptyState, moveItem } from "../ui";

export default function CertsSection({ draft, setDraft, library, setLibrary }) {
  const items = draft.certifications;

  const update = (i, text) =>
    setDraft((d) => {
      const next = [...d.certifications];
      next[i] = { ...next[i], text };
      return { ...d, certifications: next };
    });

  const remove = (i) =>
    setDraft((d) => ({
      ...d,
      certifications: d.certifications.filter((_, idx) => idx !== i),
    }));

  const move = (i, dir) =>
    setDraft((d) => ({
      ...d,
      certifications: moveItem(d.certifications, i, dir),
    }));

  const addBlank = () =>
    setDraft((d) => ({
      ...d,
      certifications: [...d.certifications, { id: uid(), text: "" }],
    }));

  const addFromLibrary = (libItems) =>
    setDraft((d) => ({
      ...d,
      certifications: [
        ...d.certifications,
        ...libItems.map((li) => ({ id: uid(), libId: li.id, text: li.text })),
      ],
    }));

  const saveToLibrary = (i) => {
    const text = (items[i].text || "").trim();
    if (!text) return;
    const label = window.prompt("Short name for this certification:", text.slice(0, 40));
    if (!label) return;
    setLibrary((lib) => ({
      ...lib,
      certifications: [...lib.certifications, { id: uid(), label, text }],
    }));
  };

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <EmptyState>No certifications listed. Add them from your library below.</EmptyState>
      )}

      {items.map((c, i) => (
        <div key={c.id} className="flex items-center gap-2">
          <input
            className="input flex-1"
            value={c.text}
            onChange={(e) => update(i, e.target.value)}
            placeholder="Certification name, issuer (date)"
          />
          <button type="button" className="btn btn-quiet !px-2 !py-1 text-xs" onClick={() => saveToLibrary(i)} title="Save to library">
            Save
          </button>
          <button type="button" className="btn btn-quiet !px-2 !py-1 text-xs" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
          <button type="button" className="btn btn-quiet !px-2 !py-1 text-xs" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">↓</button>
          <button type="button" className="btn btn-danger !px-2 !py-1 text-xs" onClick={() => remove(i)}>✕</button>
        </div>
      ))}

      <div className="flex flex-wrap items-start gap-2">
        <div className="min-w-0 flex-1">
          <LibraryPicker
            items={library.certifications}
            onAdd={addFromLibrary}
            buttonLabel="Add certifications from library"
            renderPreview={(it) => it.text}
          />
        </div>
        <button type="button" className="btn btn-quiet" onClick={addBlank}>
          + Blank
        </button>
      </div>
    </div>
  );
}
