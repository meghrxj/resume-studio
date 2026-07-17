"use client";

import { useCallback, useEffect, useState } from "react";
import { buildSeed, makeBlankDraft, uid, deepCopy } from "./seed";

export { uid, deepCopy };

const LS_KEY = "resume-studio-v1";

function loadInitial() {
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.library && Array.isArray(parsed.drafts)) {
        return parsed;
      }
    }
  } catch (e) {
    // Corrupted storage: fall through to a fresh seed.
  }
  return buildSeed();
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
    setState(next);
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
