import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// You can use these libs in your project (they're common and small)
// If you prefer zero-dependency, a tiny fallback parser is included below
import { marked } from "marked";
import DOMPurify from "dompurify";

// ----- Types -----
/** @typedef {{ id: string; title: string; content: string; updatedAt: number }} Note */
        
// ----- Constants -----
const LS_NOTES_KEY = "ai-md-notes-v1";
const LS_ACTIVE_ID_KEY = "ai-md-active-note-id";

// ----- Utilities -----
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const fmtDate = (ts) => new Date(ts).toLocaleString();

// Very small debounce
function useDebouncedCallback(cb, delay = 600) {
  const ref = useRef({ cb, t: null });
  ref.current.cb = cb;
  return (...args) => {
    if (ref.current.t) clearTimeout(ref.current.t);
    ref.current.t = setTimeout(() => ref.current.cb(...args), delay);
  };
}

// Basic mock "AI" summarizer (no API):
// - grabs first heading if present, otherwise first line as title
// - returns 2-3 concise bullet points based on first few sentences
function mockSummarize(markdown) {
  if (!markdown || !markdown.trim()) return "No content to summarize.";
  const lines = markdown.split(/\r?\n/);
  const heading = lines.find((l) => /^\s*#/.test(l)) || lines[0] || "Untitled";
  const title = heading.replace(/^\s*#+\s*/, "").trim();

  const text = markdown
    .replace(/`{1,3}[^`]*`{1,3}/g, " ") // remove inline/code blocks
    .replace(/\*\*|__|\*|_|\[|\]|\(|\)|>/g, " ")
    .replace(/#+\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const sentences = text.split(/[.!?]\s+/).filter(Boolean).slice(0, 6);
  const bullets = sentences.slice(0, 3).map((s) => `• ${s.trim()}.`).join("\n");
  return `**${title} – Summary**\n\n${bullets}`;
}

// Tiny fallback markdown renderer if 'marked' isn't available (very limited)
function tinyMarkdown(md) {
  if (!md) return "";
  let html = md
    .replace(/^######\s?(.*)$/gm, "<h6>$1</h6>")
    .replace(/^#####\s?(.*)$/gm, "<h5>$1</h5>")
    .replace(/^####\s?(.*)$/gm, "<h4>$1</h4>")
    .replace(/^###\s?(.*)$/gm, "<h3>$1</h3>")
    .replace(/^##\s?(.*)$/gm, "<h2>$1</h2>")
    .replace(/^#\s?(.*)$/gm, "<h1>$1</h1>")
    .replace(/^>\s?(.*)$/gm, '<blockquote class="border-l-4 pl-4 italic opacity-90">$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.*?)__/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="px-1 rounded bg-gray-100 dark:bg-zinc-800">$1</code>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="underline">$1</a>');
  return `<p>${html}</p>`;
}

// Configure marked (if present)
try {
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false,
  });
} catch (_) {}

export default function MarkdownNotesApp() {
  const [notes, setNotes] = useState(/** @type {Note[]} */([]));
  const [activeId, setActiveId] = useState(/** @type {string|null} */(null));
  const activeNote = useMemo(() => notes.find((n) => n.id === activeId) || null, [notes, activeId]);
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState("");

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_NOTES_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      setNotes(Array.isArray(arr) ? arr : []);
      const savedActive = localStorage.getItem(LS_ACTIVE_ID_KEY);
      if (savedActive) setActiveId(savedActive);
    } catch (e) {
      console.error("Failed to load notes:", e);
    }
  }, []);

  // Persist notes
  const persist = useDebouncedCallback((next) => {
    try {
      localStorage.setItem(LS_NOTES_KEY, JSON.stringify(next));
      setStatus("Saved");
      setTimeout(() => setStatus(""), 800);
    } catch (e) {
      console.error("Failed to save:", e);
      setStatus("Save error");
    }
  }, 500);

  useEffect(() => {
    persist(notes);
  }, [notes]);

  // Persist active note id
  useEffect(() => {
    if (activeId) localStorage.setItem(LS_ACTIVE_ID_KEY, activeId);
  }, [activeId]);

  // Keyboard: Cmd/Ctrl+S to save
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setStatus("Saved");
        setTimeout(() => setStatus(""), 800);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function createNote() {
    const now = Date.now();
    const n = {
      id: uid(),
      title: `Untitled ${notes.length + 1}`,
      content: "# New Note\n\nStart writing...\n\n- Tip: Use **Markdown**\n- Try headings, lists, code blocks\n\n```js\nconsole.log('hello');\n```",
      updatedAt: now,
    };
    setNotes((prev) => [n, ...prev]);
    setActiveId(n.id);
  }

  function duplicateNote(id) {
    const base = notes.find((n) => n.id === id);
    if (!base) return;
    const now = Date.now();
    const n = { ...base, id: uid(), title: `${base.title} (copy)`, updatedAt: now };
    setNotes((prev) => [n, ...prev]);
    setActiveId(n.id);
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeId === id) setActiveId(null);
  }

  function updateActive(fields) {
    if (!activeNote) return;
    setNotes((prev) =>
      prev.map((n) => (n.id === activeNote.id ? { ...n, ...fields, updatedAt: Date.now() } : n))
    );
  }

  function exportNote(note, type = "md") {
    if (!note) return;
    const filename = `${note.title.replace(/[^a-z0-9\-_]+/gi, "-")}.${type}`;
    let data = note.content;
    if (type === "txt") {
      // Strip markdown for plain text
      data = note.content.replace(/[#*_`>\-\[\]\(\)]/g, "");
    }
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importNoteFromFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const content = String(reader.result || "");
      const name = file.name.replace(/\.(md|markdown|txt)$/i, "") || "Imported";
      const now = Date.now();
      const n = { id: uid(), title: name, content, updatedAt: now };
      setNotes((prev) => [n, ...prev]);
      setActiveId(n.id);
    };
    reader.readAsText(file);
  }

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, filter]);

  // Render preview (marked -> DOMPurify)
  const previewHtml = useMemo(() => {
    const raw = activeNote?.content || "";
    try {
      const html = marked ? marked.parse(raw) : tinyMarkdown(raw);
      return DOMPurify.sanitize(html);
    } catch (e) {
      console.error(e);
      return tinyMarkdown(raw);
    }
  }, [activeNote?.content]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
      {/* App Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
            <h1 className="text-lg sm:text-xl font-semibold">AI Markdown Notes</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/70">{notes.length} notes</span>
            {status && (
              <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">{status}</span>
            )}
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 p-4">
        {/* Sidebar */}
        <aside className="md:sticky md:top-[68px] h-fit">
          <div className="p-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
            <div className="flex gap-2 mb-3">
              <button onClick={createNote} className="px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[.98]">+ New</button>
              <label className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">
                Import
                <input type="file" accept=".md,.markdown,.txt" className="hidden" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) importNoteFromFile(f);
                  e.currentTarget.value = "";
                }} />
              </label>
            </div>
            <div className="relative mb-3">
              <input
                className="w-full px-3 py-2 pr-8 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-indigo-400 outline-none"
                placeholder="Search notes..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <div className="absolute right-2 top-2.5 text-xs opacity-70">⌘/Ctrl+F</div>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-auto pr-1">
              <AnimatePresence initial={false}>
                {filtered.map((n) => (
                  <motion.button
                    key={n.id}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    onClick={() => setActiveId(n.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl border transition shadow-sm ${
                      n.id === activeId
                        ? "border-indigo-300 bg-indigo-50 dark:bg-indigo-950/30"
                        : "border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="truncate font-medium">{n.title || "Untitled"}</div>
                    </div>
                    <div className="text-xs opacity-70 mt-0.5">{fmtDate(n.updatedAt)}</div>
                    <div className="text-xs line-clamp-2 opacity-70 mt-1">{n.content.replace(/\s+/g, " ").slice(0, 160)}</div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </aside>

        {/* Editor + Preview */}
        <main className="space-y-4">
          {!activeNote ? (
            <div className="p-10 rounded-2xl bg-white dark:bg-zinc-950 border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
              <p className="text-lg">No note selected.</p>
              <p className="opacity-70">Create a new note or pick one from the sidebar.</p>
            </div>
          ) : (
            <>
              {/* Toolbar */}
              <div className="p-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm flex flex-wrap gap-2 items-center">
                <input
                  className="min-w-[220px] flex-1 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-indigo-400 outline-none font-semibold"
                  value={activeNote.title}
                  onChange={(e) => updateActive({ title: e.target.value })}
                />
                <div className="ml-auto flex flex-wrap gap-2">
                  <button
                    onClick={() => exportNote(activeNote, "md")}
                    className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    Export .md
                  </button>
                  <button
                    onClick={() => exportNote(activeNote, "txt")}
                    className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    Export .txt
                  </button>
                  <button
                    onClick={() => duplicateNote(activeNote.id)}
                    className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => deleteNote(activeNote.id)}
                    className="px-3 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Editor */}
                <section className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-4 py-2 border-b border-zinc-200/60 dark:border-zinc-800/60 text-sm flex items-center gap-2">
                    <span className="font-medium">Markdown</span>
                    <span className="ml-auto opacity-70 text-xs">Autosave enabled</span>
                  </div>
                  <textarea
                    className="min-h-[60vh] w-full flex-1 p-4 outline-none resize-none bg-transparent leading-7"
                    value={activeNote.content}
                    onChange={(e) => updateActive({ content: e.target.value })}
                    placeholder="# Title\n\nStart writing markdown..."
                  />
                  <div className="p-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex gap-2">
                    <button
                      onClick={() => {
                        const summary = mockSummarize(activeNote.content);
                        updateActive({ content: `${activeNote.content}\n\n---\n\n${summary}` });
                      }}
                      className="px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      ✨ Summarize Note (mock)
                    </button>
                  </div>
                </section>

                {/* Preview */}
                <section className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-4 py-2 border-b border-zinc-200/60 dark:border-zinc-800/60 text-sm font-medium">Preview</div>
                  <article
                    className="prose prose-zinc dark:prose-invert max-w-none p-4 prose-headings:scroll-mt-24 prose-pre:bg-zinc-900 prose-pre:text-zinc-100"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </section>
              </div>

              {/* Mini Cheatsheet */}
              <details className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer select-none font-medium">Markdown Cheatsheet</summary>
                <div className="px-4 pb-4 text-sm grid sm:grid-cols-2 gap-4">
                  <div>
                    <code># Heading 1</code><br/>
                    <code>## Heading 2</code><br/>
                    <code>**bold**</code>, <code>*italic*</code>, <code>`code`</code>
                  </div>
                  <div>
                    Lists:<br/>
                    <code>- item</code>, <code>1. item</code><br/>
                    Links: <code>[text](https://example.com)</code>
                  </div>
                </div>
              </details>
            </>
          )}
        </main>
      </div>

      <footer className="py-6 text-center text-xs opacity-70">Built for Day 42 – Live Markdown with localStorage & mock AI</footer>
    </div>
  );
}
