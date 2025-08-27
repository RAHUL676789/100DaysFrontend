import React, { useEffect, useRef, useState } from 'react'
import LayeredWhiteboard from './LayeredWhiteboard'

export default function Board({ meta, socket, user }) {
  const drawRef = useRef(null)
  const [boardMeta, setBoardMeta] = useState(meta)

  useEffect(() => {
    setBoardMeta(meta)
  }, [meta])

  return (
    <div
      className="board-wrapper absolute rounded-2xl shadow-md border border-gray-200 bg-white overflow-hidden transition-all"
      style={{
        left: boardMeta.x,
        top: boardMeta.y,
        width: boardMeta.width,
        height: boardMeta.height,
        zIndex: boardMeta.z || 1,
      }}
    >
      {/* Header */}
      <div className="board-header mt-22 bg-indigo-600 text-white font-semibold px-4 py-2 flex justify-between items-center">
        <span className="truncate">{boardMeta.name}</span>
        <div className="flex gap-2">
          {/* Placeholder for future controls like close, merge, etc. */}
          <button
            className="px-2 py-1 text-xs rounded-md bg-white text-indigo-600 hover:bg-indigo-100 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Whiteboard Area */}
      <div className="board-body flex-1 bg-gray-50">
        <LayeredWhiteboard
          boardId={boardMeta.id}
          width={boardMeta.width}
          height={boardMeta.height}
        />
      </div>
    </div>
  )
}
