import React from 'react'
import Board from './Board'

export default function BoardManager({ boards, socket, user }) {
  return (
    <div className="board-manager p-6 mt-24">
      {boards.length === 0 ? (
        <div className="text-center text-black py-12 border-2 border-dashed rounded-xl">
          No boards yet — create one to get started
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {boards.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl shadow-sm bg-white border border-gray-200 hover:shadow-lg transition duration-200 overflow-hidden"
            >
              <Board meta={b} socket={socket} user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
