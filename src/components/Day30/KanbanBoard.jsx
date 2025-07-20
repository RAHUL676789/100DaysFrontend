import React, { useState } from 'react'
import KanbanCard from './KanbanCard'

const KanbanBoard = () => {
  const [Coulumns, setCoulumns] = useState({
    todo: [
      { id: 1, task: "To Complete the js interview preparation", status: "todo" }, 
      { id: 3, task: "Complete the sylabus", status: "todo" }],
    inProgress: [
      { id: 9, task: "complete mern project", status: "inProgress" }],
    done: [
      { id: 4, task: "complete the devops sylabus", status: "done" },
      { id: 5, task: "complete the devops sylabus", status: "done" },
      { id: 6, task: "complete the devops sylabus", status: "done" }
    ]
  })

  const [showInp, setshowInp] = useState(false)
  const [InpValue, setInpValue] = useState("");
  const getWidthPct = (key) => {
    const total = Coulumns.todo.length + Coulumns.inProgress.length + Coulumns.done.length;
    return total === 0 ? 0 : (Coulumns[key].length / total) * 100;
  }

  const handleDragStart = (e, item) => {
    console.log(item);
    e.dataTransfer.setData("cardId", item.id);
    e.dataTransfer.setData("fromColumns", item.status);

  }

  const handleDragend = (e, targetCoulmn) => {
    const cardId = e.dataTransfer.getData("cardId");
    const fromColumns = e.dataTransfer.getData("fromColumns");
    console.log(cardId)
    const draggedCard = Coulumns[fromColumns].find((item,i)=>item.id == cardId);
   
    if(!cardId || !draggedCard || fromColumns == targetCoulmn) return;
   

    setCoulumns((prev)=>{
      return {
        ...prev,
        [fromColumns]:prev[fromColumns].filter((item,i)=>item.id !== draggedCard.id),
        [targetCoulmn]:[...prev[targetCoulmn],{...draggedCard,status:targetCoulmn}]
      }
    })


  }

  const handleAddTask = ()=>{
    console.log(InpValue)
    if(!InpValue)return;
    const newTask = {
      id:Date.now(),
      task:InpValue,
      status:"todo"
    }

    setCoulumns((prev)=>{
      return{
        ...prev,
       todo:[...prev.todo,newTask]
      }
    })
    setshowInp(false);
    setInpValue("");
  }

  const renderColumn = (title, cards, color) => {
    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDragend(e, title)}
        className={`min-h-[300px]  relative rounded-lg px-6 py-3 shadow-md shadow-gray-600 `}>
        <h2 className={`px-2 py-3  mb-4 rounded-xl text-center text-2xl font-semibold shadow-md shadow-gray-700 uppercase ${color.bg}`}>{title}</h2>

        {
          title == "todo" &&
           <div className='py-3 px-5 '>
            {!showInp && 
            <button onClick={()=>setshowInp(true)} className={`bg-green-300 text-white mb-2 px-4 py-2 rounded-3xl`}>AddTask </button>}
            {
              showInp && <div> 
                <input value={InpValue} onChange={(e)=>setInpValue(e.target.value)} type="text" placeholder='add task'
                 className='bg-gray-200 rounded-lg px-3 py-2 border-0 outline-0' /> 
                 <div>
                  <button onClick={()=>setshowInp(false)} className='border px-2 py-1 mx-2 mt-2 rounded-lg bg-gray-600 text-white' >cancel</button>
                  <button onClick={handleAddTask} className='border px-2 py-1 mx-2 mt-2 rounded-lg bg-green-700 text-white'> add</button></div>
                 </div>
            }
             
             </div>
        }

        <div className='  absolute right-0 top-0 h-full w-2 bg-white rounded-lg flex justify-around '>

          <div style={{ height: `${getWidthPct(title)}%` }} className={` w-full transition-all duration-300 ${color.bg}`}>

          </div>

        </div>
        <div className='flex flex-col gap-4'>
          {
           cards.length > 0 ?  cards.map((item, i) => (
              <KanbanCard handleDragStart={handleDragStart} item={item} key={i} />
            )) :<div> 
              <h2 className='text-sm font-semibold text-center shadow-md py-5 px-6
               shadow-gray-400'>No Cards Avaialble Drag and Drop to add</h2>
            </div>
          }
        </div>


      </div>
    )

  }
  return (
    <div className='min-h-screen '>
      <h2 className='text-2xl font-semibold text-center m-5'>KanbanBoard 🚀</h2>
      <div className='max-w-screen p-6  overflow-hidden grid grid-cols-3 gap-6'>
        {renderColumn("todo", Coulumns.todo, { bg: "bg-blue-300", text: "text-blue-700" })}
        {renderColumn("inProgress", Coulumns.inProgress, { bg: "bg-yellow-300", text: "text-blue-700" })}

        {renderColumn("done", Coulumns.done, { bg: "bg-green-400", text: "text-blue-700" })}


      </div>


    </div>
  )
}

export default KanbanBoard
