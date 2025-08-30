import React from 'react'

const MarkDownStepByStep = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 '>
        <header className='sticky top-0 z-40 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:to-zinc-900 dark:bg-zinc-950/70 supports-[backdrop-filter] backdrop-blur'>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
            <h1 className="text-lg sm:text-xl font-semibold">AI Markdown Notes</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/70">notes</span>
           
              <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"></span>

          </div>
        </div>
        </header>

        {/* main layouts */}

        <div className='max-w-7xl grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 p-4'>
                  <aside>
                    
                  </aside>
        </div>
      
    </div>
  )
}

export default MarkDownStepByStep
