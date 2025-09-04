import { createContext,useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({children})=>{
    const [todo, settodo] = useState([{
        todo:"work",
        id:Date.now()
    },{
        todo:"bath",
        id:Date.now()+Math.random() * 978
    }])

    const addTodo = (item)=>{
        console.log(item)
       settodo((prev)=>{
        return [item,...prev]
       })
       console.log(todo)
    }

    const deleteTod = (id)=>{
        settodo((prev)=>prev.filter(item=>item.id !== id))
    }

    return (
        <TodoContext.Provider
        value={{addTodo,deleteTod,todo,settodo}}
        >
            {children}

        </TodoContext.Provider>
    )
}