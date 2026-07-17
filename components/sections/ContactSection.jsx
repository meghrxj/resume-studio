"use client";

import { Field } from "../ui";

export default function ContactSection({ draft, setDraft, setLibrary }) {
  const c = draft.contact;
  const set = (key) => (e) => {
    const value = e.target.value;
    setDraft((d) => ({ ...d, contact: { ...d.contact, [key]: value } }));
    // Contact details rarely differ between resumes, so keep the library copy
    // in sync and new drafts pick them up automatically.
    setLibrary((lib) => ({ ...lib, contact: { ...lib.contact, [key]: value } }));
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Field label="Full name" value={c.name} onChange={set("name")} placeholder="Meghraj Gole" />
      <Field label="Phone" value={c.phone} onChange={set("phone")} placeholder="+44 ..." />
      <Field label="Email" type="email" value={c.email} onChange={set("email")} placeholder="you@email.com" />
      <Field label="Location" value={c.location} onChange={set("location")} placeholder="Leeds, United Kingdom" />
      <Field label="LinkedIn" value={c.linkedin} onChange={set("linkedin")} placeholder="linkedin.com/in/..." />
      <Field label="GitHub" value={c.github} onChange={set("github")} placeholder="github.com/..." />
      <Field
        label="Portfolio"
        className="sm:col-span-2"
        value={c.portfolio}
        onChange={set("portfolio")}
        placeholder="yoursite.com (optional)"
      />
    </div>
  );
}
