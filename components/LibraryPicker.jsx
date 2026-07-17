"use client";

import { useMemo, useState } from "react";
import { Tag } from "./ui";

/**
 * Generic checklist picker over library items.
 * Items need: id, label, optional tags, plus whatever renderPreview reads.
 */
export default function LibraryPicker({
  items,
  onAdd,
  buttonLabel = "Add from library",
  addLabel = "Add selected",
  renderPreview,
  emptyText = "Your library has no items in this section yet. Save one from a draft to reuse it later.",
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(() => new Set());
  const [tag, setTag] = useState("All");

  const tags = useMemo(() => {
    const t = new Set();
    items.forEach((i) => (i.tags || []).forEach((x) => t.add(x)));
    return ["All", ...Array.from(t)];
  }, [items]);

  const shown =
    tag === "All" ? items : items.filter((i) => (i.tags || []).includes(tag));

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const add = () => {
    const chosen = items.filter((i) => selected.has(i.id));
    if (chosen.length) onAdd(chosen);
    setSelected(new Set());
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        className="btn btn-outline border-dashed"
        onClick={() => setOpen(true)}
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {buttonLabel}
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-pine/30 bg-pine-soft/40 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-pine-dark">
          Content library
        </p>
        <button type="button" className="btn btn-quiet !px-2 !py-1 text-xs" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>

      {tags.length > 1 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={`chip transition-colors ${
                tag === t
                  ? "bg-pine text-white"
                  : "bg-surface text-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {shown.length === 0 ? (
        <p className="px-1 py-3 text-sm text-muted">{emptyText}</p>
      ) : (
        <ul className="lib-scroll max-h-72 space-y-1.5 overflow-y-auto pr-1">
          {shown.map((item) => (
            <li key={item.id}>
              <label
                className={`flex cursor-pointer items-start gap-2.5 rounded-lg border bg-surface p-2.5 transition-colors ${
                  selected.has(item.id)
                    ? "border-pine ring-1 ring-pine/40"
                    : "border-line hover:border-pine/50"
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#0E6B4E]"
                  checked={selected.has(item.id)}
                  onChange={() => toggle(item.id)}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="text-sm font-medium">{item.label}</span>
                    {(item.tags || []).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </span>
                  {renderPreview && (
                    <span className="mt-0.5 block text-xs leading-snug text-muted">
                      {renderPreview(item)}
                    </span>
                  )}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2.5 flex justify-end">
        <button
          type="button"
          className="btn btn-primary !py-1.5"
          onClick={add}
          disabled={selected.size === 0}
        >
          {addLabel}
          {selected.size > 0 ? ` (${selected.size})` : ""}
        </button>
      </div>
    </div>
  );
}
