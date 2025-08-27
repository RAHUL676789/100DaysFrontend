import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export default function useRealtime({ roomId, user }) {
  const [socket, setSocket] = useState(null)
  const [boards, setBoards] = useState([])
  const socketRef = useRef(null)
    
  useEffect(() => {
    const s = io('http://localhost:4000', {
      transports: ['websocket'], // force websocket for stability
    })
    socketRef.current = s
    setSocket(s)

    s.on('connect', () => console.log('✅ connected:', s.id))

    s.emit('room:join', { roomId, user })

    // Board + room state sync
    s.on('room:state', (state) => {
      setBoards(state.boards || [])
    })

    s.on('board:created', (board) => {
      setBoards((prev) => [...prev, board])
    })

    s.on('board:updated', ({ boardId, patch }) => {
      setBoards((prev) =>
        prev.map((b) => (b.id === boardId ? { ...b, ...patch } : b))
      )
    })

    // Action handlers
    s.on('action:applied', ({ boardId, action }) => {
      setBoards((prev) =>
        prev.map((b) =>
          b.id === boardId ? { ...b, actions: [...(b.actions || []), action] } : b
        )
      )
    })

    s.on('action:reverted', ({ boardId, actionId }) => {
      setBoards((prev) =>
        prev.map((b) =>
          b.id === boardId
            ? { ...b, actions: (b.actions || []).filter((a) => a.id !== actionId) }
            : b
        )
      )
    })

    // Merge handler
    s.on('merge:done', ({ boards: mergedBoards }) => {
      console.log('🔄 Merge complete')
      setBoards(mergedBoards)
    })

    return () => {
      s.off() // remove all listeners
      s.disconnect()
    }
  }, [roomId, user])

  // --- API functions ---
  const createBoard = (board) => {
    setBoards((prev) => [...prev, board])
    socketRef.current?.emit('board:create', { roomId, board })
  }

  const pushAction = (boardId, action) => {
    // optimistic update
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId ? { ...b, actions: [...(b.actions || []), action] } : b
      )
    )
    socketRef.current?.emit('action:push', { roomId, boardId, action })
  }

  return { socket, boards, createBoard, pushAction }
}
