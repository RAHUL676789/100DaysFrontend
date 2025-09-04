import React, { useContext } from 'react'
import { counterContext } from './context'
import { TodoContext } from './TodoContex'

const AddTodo = () => {
    const {addTodo} = useContext(TodoContext)
  return (
    <div>
      <button onClick={()=>addTodo({id:Date.now(),todo:"hello"})}>Add-todo</button>
    </div>
  )
}

export default AddTodo
