"use client";

export function Field({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      <input className="input" {...props} />
    </div>
  );
}

export function TextArea({ label, hint, className = "", ...props }) {
  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      <textarea className="input min-h-[90px] leading-relaxed" {...props} />
      {hint && <p className="mt-1 text-[11px] text-muted">{hint}</p>}
    </div>
  );
}

export function Tag({ children }) {
  return <span className="chip bg-clay-soft text-clay">{children}</span>;
}

export function AccordionItem({ title, count, open, onToggle, children }) {
  return (
    <section className="card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-bg/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40"
      >
        <span className="flex items-center gap-2.5">
          <span className="font-display text-[15px] font-semibold tracking-tight">
            {title}
          </span>
          {typeof count === "number" && count > 0 && (
            <span className="chip bg-pine-soft text-pine">{count}</span>
          )}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && <div className="border-t border-line px-4 py-4">{children}</div>}
    </section>
  );
}

export function EntryToolbar({
  onSave,
  onUp,
  onDown,
  onRemove,
  canUp,
  canDown,
  saveTitle = "Save this version to your library as a new variation",
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-dashed border-line pt-2.5">
      {onSave && (
        <button type="button" className="btn btn-outline !px-2.5 !py-1 text-xs" onClick={onSave} title={saveTitle}>
          <BookmarkIcon />
          Save to library
        </button>
      )}
      <span className="flex-1" />
      {onUp && (
        <button type="button" className="btn btn-quiet !px-2 !py-1 text-xs" onClick={onUp} disabled={!canUp} aria-label="Move up">
          ↑
        </button>
      )}
      {onDown && (
        <button type="button" className="btn btn-quiet !px-2 !py-1 text-xs" onClick={onDown} disabled={!canDown} aria-label="Move down">
          ↓
        </button>
      )}
      {onRemove && (
        <button type="button" className="btn btn-danger !px-2.5 !py-1 text-xs" onClick={onRemove}>
          Remove
        </button>
      )}
    </div>
  );
}

export function EmptyState({ children }) {
  return (
    <p className="rounded-lg border border-dashed border-line bg-bg/50 px-3 py-4 text-center text-sm text-muted">
      {children}
    </p>
  );
}

export function BookmarkIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 2.5h8a.5.5 0 01.5.5v10.6a.3.3 0 01-.47.24L8 11.2l-4.03 2.64a.3.3 0 01-.47-.24V3a.5.5 0 01.5-.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function moveItem(arr, i, dir) {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}
