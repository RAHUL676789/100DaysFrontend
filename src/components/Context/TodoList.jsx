import React, { useContext } from 'react'
import { TodoContext } from './TodoContex'

const TodoList = () => {
    const {todo} = useContext(TodoContext)
    console.log(todo)
  return (
    <div>

        {todo.length > 0 && todo.map((item,i)=>(
            <div key={item.id} className='text-black'>{item.todo} {item.id} </div>
        ))}
      
    </div>
  )
}

export default TodoList
