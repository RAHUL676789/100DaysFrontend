import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"; // dark theme
import "prismjs/components/prism-javascript"; // extra language
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
const MarkDownStepByStep = () => {

  const [notes, setnotes] = useState([]);
  const [activeId, setactiveId] = useState(null);
  const activeNotes = useMemo(() => notes.find((n) => n.id === activeId) || null, [notes, activeId])
  const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const fmtDate = (ts) => new Date(ts).toLocaleString();
  const [markedDown, setmarkedDown] = useState("")
  const [filter, setfilter] = useState("")

  const createNew = () => {
    const now = Date.now();

    const newObj = {
      id: uid(),
      title: `Untitled ${notes.length}`,
      content: "# New Note\n\nStart writing...\n\n- Tip: Use **Markdown**\n- Try headings, lists, code blocks\n\n```js\nconsole.log('hello');\n```",
      updatedAt: now


    }

    setnotes((prev) => [newObj, ...prev]);
    setactiveId(newObj.id);
  }



  let btnClass = "px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"

  const filtered = useMemo(() => {
    let q = filter.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
  }, [notes, filter])

  const updateActive = (data) => {
    if (!activeNotes) return;
    setnotes((prev) => prev.map((n) => n.id === activeNotes.id ? { ...n, content: data.content, updatedAt: Date.now() } : n));


  }


  const previewHtml = useMemo(() => {
    const raw = activeNotes?.content || "";
    const marksDown = marked(raw, {
      highlight: function (code, lang) {
        if (Prism.languages[lang]) {
          return Prism.highlight(code, Prism.languages[lang], lang)
        }
        return Prism.highlight(code, Prism.languages.javascript, "javascript")
      }
    })

    return marksDown;


  }, [activeNotes?.content])

  useEffect(() => {
    Prism.highlightAll()
  }, [activeNotes?.content])


  const copy = (id) => {
    const base = notes.find((n) => n.id === id);
    if (!base) return;
    const now = Date.now();
    let n = { ...base, id: uid(), updatedAt: now, title: `${base.title} (copy)` }
    setnotes((prev) => [n, ...prev])
    setactiveId(n.id)

  }

  const deleteNotes = (id) => {
    if (!id) return;
    setnotes((prev) => prev.filter((n) => n.id !== id));
    if (activeId === id) setactiveId(null)
  }

  const exportfile = (file, type = "md") => {
    if (!file) return;
    const filename = `${file.title.replace(/[^a-z0-9\-_]+/gi, "-")}.${type}`;
    let data = file.content;
    if (type === "txt") {
      data = file.content.replace(/[#*_`>\-\[\]\(\)]/g, "");
    }
    const blob = new Blob([data], { type: 'text/plain:charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const importFile = (file)=>{

    const reader = new FileReader();
    reader.onload = ()=>{
      const content = String(reader.result.replace(/\.(md|markdown|txt)$/i),"") || "imported"
       const now = Date.now();
      const n = { id: uid(), title: name, content, updatedAt: now };
      setnotes((prev) => [n, ...prev]);
      setactiveId(n.id);
    }
    reader.readAsText(file);
  }
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 '>
      <header className='sticky top-0 z-40 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:to-zinc-900 dark:bg-zinc-950/70 supports-[backdrop-filter] backdrop-blur'>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500  animate-bounce" />
            <h1 className="text-lg sm:text-xl font-semibold">Markdown Notes</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/70">notes</span>

            <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"></span>

          </div>
        </div>
      </header>

      {/* main layouts */}

      <div className='max-w-7xl grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 p-4'>
        <div className='md:sticky md:top-[68px] h-fit'>

          {/* create notes */}
          <div className='p-3 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm rounded-2xl '>

            <div className='flex gap-2 mb-3'>
              <button onClick={createNew} className='bg-indigo-600 text-white rounded-xl px-3 py-2 active:scale-[.98] hover:bg-indigo-700 cursor-pointer'>+ New</button>
              <label className='px-3 py-2 rounded-xl text-white bg-zinc-100 dark:bg-zinc-800 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 ' htmlFor="file">Import
                <input  onChange={(e)=>importFile(e.target.files[0])} id='file' type='file' className='hidden' />
              </label>

            </div>

            <div className='relative mb-3'>
              <input
             
                className='w-full px-3 py-2 border focus:border-indigo-400 bg-zinc-100 dark:bg-zinc-900 border-transparent pr-8 outline-none rounded-xl'
                type="text" placeholder='search file..' />
              <div className='absolute opacity-70 top-2.5 right-2 text-xs'>⌘/Ctrl+F</div>
            </div>

          </div>

          <div className='overflow-auto max-h-[60vh] space-y-2 pr-1'>

            <AnimatePresence>
              {
                filtered.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    onClick={() => setactiveId(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl border transition shadow-sm ${item.id === activeId
                        ? "border-indigo-300 bg-indigo-50 dark:bg-indigo-950/30"
                        : "border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="truncate font-medium">
                        {item.title || "Untitled"}

                      </div>
                    </div>

                    <div className="text-xs opacity-70 mt-0.5">
                      {fmtDate(item.updatedAt)}

                    </div>
                    <div className="text-xs line-clamp-2 opacity-70 mt-1">{item.content.replace(/\s+/g, " ").slice(0, 160)}</div>
                  </motion.button>

                ))
              }

            </AnimatePresence>


          </div>
        </div>

        <div className='space-y-4'>
          {/* when no active file */}

          {/* toobar */}
          <div className='p-3 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm flex flex-wrap gap-2 items-center'>
            <input type="text" className='min-w-[220px] flex-1 px-3 py-2 border border-transparent bg-zinc-100 dark:bg-zinc-800 focus:border-indigo-400 outline-none font-semibold rounded-xl' value={activeNotes?.title || "Untitled"} />

            <button onClick={()=>exportfile(activeNotes,"md")} className={btnClass}>Export.md</button>

            <button onClick={()=>exportfile(activeNotes,"txt")} className={btnClass}>Export.txt</button>

            <button onClick={() => copy(activeId)} className={`px-3 py-2 bg-pink-800 hover:bg-pink-600 rounded-xl`}>Duplicate</button>

            <button onClick={() => deleteNotes(activeId)} className="px-3 py-2 bg-red-900 hover:bg-red-800 rounded-xl ">Delete</button>

          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {/* editor */}

            <section className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm overflow-hidden flex flex-col">

              <div className="px-4 py-2 border-b border-zinc-200/60 dark:border-zinc-800/60 text-sm flex items-center gap-2">
                <span className='font-medium'>markdown</span>
                <span className='text-xs ml-auto opacity-70'>auto saved enabled</span>

              </div>

              <textarea
                value={activeNotes?.content}
                onChange={(e) => updateActive({ content: e.target.value })}
                className='min-h-[60vh] leading-7 bg-transparent  w-full flex-1 p-4 outline-none resize-none' />

              <div className='p-3 border-t border-zinc-200/60 dark:border-zinc-800/60 gap-2'>
                <button className="px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">✨ Summarize Note (mock)</button>
              </div>
            </section>

            {/* previewer */}

            <section className='flex flex-col shadow-sm border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 overflow-hidden rounded-2xl'>

              <div className="px-4 py-2 border-b border-zinc-200/60 dark:border-zinc-800/60 text-sm font-medium">Preview</div>
              <article
                dangerouslySetInnerHTML={{ __html: previewHtml }}
                className="prose prose-zinc dark:prose-invert max-w-none p-4 prose-headings:scroll-mt-24 prose-pre:bg-zinc-900 prose-pre:text-zinc-100">

              </article>



            </section>

          </div>
          {/* mini chatsheet */}

          <details className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm overflow-hidden">
            <summary className="px-4 py-3 cursor-pointer select-none font-medium">Markdown Cheatsheet</summary>
            <div className="px-4 pb-4 text-sm grid sm:grid-cols-2 gap-4">
              <div>
                <code># Heading 1</code><br />
                <code>## Heading 2</code><br />
                <code>**bold**</code>, <code>*italic*</code>, <code>`code`</code>
              </div>
              <div>
                Lists:<br />
                <code>- item</code>, <code>1. item</code><br />
                Links: <code>[text](https://example.com)</code>
              </div>
            </div>
          </details>
        </div>



      </div>


    </div>
  )
}

export default MarkDownStepByStep
