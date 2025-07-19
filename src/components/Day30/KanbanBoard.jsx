import React, { useState, useRef } from 'react'
import KanbanCard from './KanbanCard'

const KanbanBoard = () => {
    const [Columns, setColumns] = useState({
        todo: [],
        inProgress: [],
        done: []

    })

    const [showInp, setshowInp] = useState(true)
    const inputFormRef = useRef()
    const [inpVal, setinpVal] = useState("");

    const handleTaskCreate = ()=>{
        if(!inpVal || inpVal.length < 3){
            alert("enter a valid task length should b 3");
            return;
        }
        const newCard  = {
            task:inpVal,
            id:Date.now(),
            status:"todo"
        }
        setColumns((prev)=>{
            return {...prev,todo:[...prev.todo,newCard]}
        })
    }

    return (
        <div className='max-w-screen py-8 px-8 bg-gray-50'>
            <div  className=' border-b mb-4 flex py-5 px-5 justify-between'>
                <h1 className='text-2xl  font-semibold'>Kanban Board</h1>
                <button  className='border w-5 h-5 flex justify-center items-center flex-col rounded-full' onClick={()=>setshowInp((prev)=>!prev)}>+</button>
            </div>
            <div ref={inputFormRef}  style={{maxHeight:showInp ? `${inputFormRef.current?.scrollHeight}px`:0}} className='mb-4 flex flex-col  rounded-lg transition-all duration-200 shadow-md shadow-gray-400  overflow-hidden gap-4 '>
                <label htmlFor="task" className='py-3 ml-4'>Task</label>
                <input value={inpVal} onChange={(e)=>setinpVal(e.target.value)} type="text" placeholder='enter your task ' className=" mx-4 py-3 px-4 bg-gray-200 rounded-lg" id='task'/>

                <button onClick={handleTaskCreate} className='w-fit px-5 py-2 border mb-5 ml-4 bg-gray-500 font-semibold  text-white'>Add-Todo</button>
            </div>
            <div className='flex max-w-screen gap-2 bg-white  px-2 rounded-lg pb-2'>
                {Object.entries(Columns).map(([key, value]) => (
                    <div key={key} className='  relative before:absolute before:h-[50%]  before:w-2 before:bg-teal-500 before:-left-2 before:top-0  shadow-md shadow-gray-400  h-[100vh] w-[34%]  text-center before:rounded-b-lg '>

                        <h2 style={{backgroundColor : key == "todo" ? "#e9f0f0" : key == "inProgress" ? "yellow" :"green"}} className='shadow-sm text-2xl text-teal-500 font-semibold uppercase shadow-gray-500 py-3'>{key}</h2>
                        <div className='  h-full   '>
                            {value.map((item, i) => (
                             item.task
                            ))}
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default KanbanBoard
