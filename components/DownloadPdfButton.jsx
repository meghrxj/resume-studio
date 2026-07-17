"use client";

import { useState } from "react";

export default function DownloadPdfButton({ draft }) {
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    if (busy) return;
    setBusy(true);
    try {
      const [{ pdf }, { default: PdfDoc }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./PdfDoc"),
      ]);
      const blob = await pdf(<PdfDoc draft={draft} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const name = (draft.contact?.name || "Resume").trim() || "Resume";
      a.download = `${name} - ${draft.name || "Resume"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
      window.alert("PDF generation failed. Check the console for details.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleDownload}
      disabled={busy}
    >
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 2v8m0 0l3-3m-3 3L5 7m-2.5 5.5h11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {busy ? "Preparing PDF..." : "Download PDF"}
    </button>
  );
}
