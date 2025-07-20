import React from 'react'

const KanbanCard = ({item,handleDragStart}) => {
  return (
    <div
    draggable
    onDragStart={(e)=>handleDragStart(e,item)}

     className='py-3 px-4 hover:shadow-2xl bg-white  shadow-md shadow-gray-400 rounded-lg '>
      <div>
        <h2 className='font-semibold'>{item.task}</h2>
      </div>
      
    </div>
  )
}

export default KanbanCard
