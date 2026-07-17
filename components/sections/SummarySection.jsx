"use client";

import { uid } from "@/lib/store";
import { TextArea, BookmarkIcon } from "../ui";

export default function SummarySection({ draft, setDraft, library, setLibrary }) {
  const insert = (e) => {
    const item = library.summaries.find((s) => s.id === e.target.value);
    if (item) setDraft((d) => ({ ...d, summary: item.text }));
    e.target.value = "";
  };

  const saveVariation = () => {
    const text = draft.summary.trim();
    if (!text) return;
    const label = window.prompt(
      "Name this summary for your library (e.g. 'AI engineer, fintech angle'):"
    );
    if (!label) return;
    setLibrary((lib) => ({
      ...lib,
      summaries: [...lib.summaries, { id: uid(), label, tags: [], text }],
    }));
  };

  return (
    <div className="space-y-3">
      <select className="input" defaultValue="" onChange={insert}>
        <option value="" disabled>
          Insert a saved summary from your library...
        </option>
        {library.summaries.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
      <TextArea
        label="Summary"
        value={draft.summary}
        onChange={(e) => setDraft((d) => ({ ...d, summary: e.target.value }))}
        rows={6}
        placeholder="3 to 4 lines tying your background to this specific role..."
        hint="Tip: mirror 2 or 3 exact keywords from the job description here. ATS scanners weight the summary heavily."
      />
      <button type="button" className="btn btn-outline text-xs" onClick={saveVariation}>
        <BookmarkIcon />
        Save current summary to library
      </button>
    </div>
  );
}
