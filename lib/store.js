"use client";

import { useCallback, useEffect, useState } from "react";
import { buildSeed, makeBlankDraft, uid, deepCopy } from "./seed";

export { uid, deepCopy };

const LS_KEY = "resume-studio-v1";

export const SECTION_IDS = [
  "summary",
  "experience",
  "education",
  "projects",
  "skills",
  "certifications",
];

/**
 * Upgrade a draft in place with fields added after first release, so old
 * localStorage data and old JSON backups keep working: sectionOrder
 * (drag order), sectionSettings (page break + extra space per section)
 * and jd (pasted job description for the ATS check).
 */
export function normalizeDraft(d) {
  const order = Array.isArray(d.sectionOrder) ? d.sectionOrder : [];
  const merged = [
    ...order.filter((id) => SECTION_IDS.includes(id)),
    ...SECTION_IDS.filter((id) => !order.includes(id)),
  ];
  const settings = {};
  for (const id of SECTION_IDS) {
    const cur = (d.sectionSettings || {})[id] || {};
    settings[id] = {
      breakBefore: !!cur.breakBefore,
      spaceBefore: [0, 1, 2, 3].includes(cur.spaceBefore) ? cur.spaceBefore : 0,
    };
  }
  return { ...d, sectionOrder: merged, sectionSettings: settings, jd: d.jd || "" };
}

function normalizeState(state) {
  return { ...state, drafts: state.drafts.map(normalizeDraft) };
}

function loadInitial() {
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.library && Array.isArray(parsed.drafts)) {
        return normalizeState(parsed);
      }
    }
  } catch (e) {
    // Corrupted storage: fall through to a fresh seed.
  }
  return normalizeState(buildSeed());
}

export function useResumeStore() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(loadInitial());
  }, []);

  useEffect(() => {
    if (!state) return;
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {
      // Storage full or unavailable; the app keeps working in memory.
    }
  }, [state]);

  const setLibrary = useCallback((fn) => {
    setState((s) => ({ ...s, library: fn(s.library) }));
  }, []);

  const setDraft = useCallback((fn) => {
    setState((s) => ({
      ...s,
      drafts: s.drafts.map((d) =>
        d.id === s.currentId ? { ...fn(d), updatedAt: Date.now() } : d
      ),
    }));
  }, []);

  const switchDraft = useCallback((id) => {
    setState((s) => ({ ...s, currentId: id }));
  }, []);

  const newDraft = useCallback((name) => {
    setState((s) => {
      const d = makeBlankDraft(name, s.library.contact);
      return { ...s, drafts: [...s.drafts, d], currentId: d.id };
    });
  }, []);

  const duplicateDraft = useCallback(() => {
    setState((s) => {
      const cur = s.drafts.find((d) => d.id === s.currentId);
      if (!cur) return s;
      const copy = deepCopy(cur);
      copy.id = uid();
      copy.name = `${cur.name} (copy)`;
      copy.updatedAt = Date.now();
      return { ...s, drafts: [...s.drafts, copy], currentId: copy.id };
    });
  }, []);

  const deleteDraft = useCallback(() => {
    setState((s) => {
      const rest = s.drafts.filter((d) => d.id !== s.currentId);
      if (rest.length === 0) {
        const d = makeBlankDraft("Untitled resume", s.library.contact);
        return { ...s, drafts: [d], currentId: d.id };
      }
      return { ...s, drafts: rest, currentId: rest[0].id };
    });
  }, []);

  const renameDraft = useCallback((name) => {
    setState((s) => ({
      ...s,
      drafts: s.drafts.map((d) =>
        d.id === s.currentId ? { ...d, name } : d
      ),
    }));
  }, []);

  const replaceAll = useCallback((next) => {
    setState(normalizeState(next));
  }, []);

  const current = state
    ? state.drafts.find((d) => d.id === state.currentId) || state.drafts[0]
    : null;

  return {
    ready: !!state,
    state,
    library: state?.library,
    drafts: state?.drafts || [],
    current,
    setLibrary,
    setDraft,
    switchDraft,
    newDraft,
    duplicateDraft,
    deleteDraft,
    renameDraft,
    replaceAll,
  };
}

/** Split textarea content into clean bullet lines for rendering. */
export function cleanLines(arr) {
  return (arr || []).map((b) => (b || "").trim()).filter(Boolean);
}

/** Non-empty contact fields joined for the resume header line. */
export function contactLine(c) {
  return [c.phone, c.email, c.location, c.linkedin, c.github, c.portfolio]
    .map((x) => (x || "").trim())
    .filter(Boolean)
    .join("  |  ");
}
