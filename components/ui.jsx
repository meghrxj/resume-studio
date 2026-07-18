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

export function AccordionItem({
  title,
  count,
  open,
  onToggle,
  onMoveUp,
  onMoveDown,
  canUp,
  canDown,
  children,
}) {
  return (
    <section className="card overflow-hidden">
      <div className="flex w-full items-center gap-1 pr-2">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-bg/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40"
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
        {onMoveUp && (
          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              className="btn btn-quiet !px-2 !py-1 text-xs"
              onClick={onMoveUp}
              disabled={!canUp}
              title="Move this section up on the resume"
              aria-label={`Move ${title} up`}
            >
              ↑
            </button>
            <button
              type="button"
              className="btn btn-quiet !px-2 !py-1 text-xs"
              onClick={onMoveDown}
              disabled={!canDown}
              title="Move this section down on the resume"
              aria-label={`Move ${title} down`}
            >
              ↓
            </button>
          </div>
        )}
      </div>
      {open && <div className="border-t border-line px-4 py-4">{children}</div>}
    </section>
  );
}

const SPACE_LABELS = ["Normal", "Small gap", "Medium gap", "Large gap"];

/**
 * Per-section layout controls: force the section to start on a new PDF
 * page, and add extra blank space above it. Shown at the top of every
 * section's accordion panel.
 */
export function SectionLayoutBar({ sectionId, draft, setDraft, isFirst }) {
  const cur = draft.sectionSettings?.[sectionId] || {
    breakBefore: false,
    spaceBefore: 0,
  };
  const update = (patch) =>
    setDraft((d) => ({
      ...d,
      sectionSettings: {
        ...d.sectionSettings,
        [sectionId]: { ...cur, ...patch },
      },
    }));

  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-line bg-bg/60 px-3 py-2">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
        Layout
      </span>
      <label
        className={`flex cursor-pointer items-center gap-1.5 text-sm ${isFirst ? "opacity-40" : ""}`}
        title={
          isFirst
            ? "The first section always starts on page 1, under your name"
            : "Push this whole section (title included) onto a new page in the PDF"
        }
      >
        <input
          type="checkbox"
          className="h-3.5 w-3.5 accent-pine"
          checked={cur.breakBefore}
          disabled={isFirst}
          onChange={(e) => update({ breakBefore: e.target.checked })}
        />
        Start on a new page
      </label>
      <label className="flex items-center gap-1.5 text-sm">
        Space above:
        <select
          className="input !w-auto !py-1 text-sm"
          value={cur.spaceBefore}
          onChange={(e) => update({ spaceBefore: Number(e.target.value) })}
          title="Insert extra blank space before this section"
        >
          {SPACE_LABELS.map((l, i) => (
            <option key={i} value={i}>
              {l}
            </option>
          ))}
        </select>
      </label>
    </div>
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
