import React from 'react'

const GoalItem = ({goal,handleIsCompleted}) => {

  return (
    <div  className=' px-7 py-2 flex flex-col gap-3 rounded-lg shadow-md shadow-gray-400'>
      <div className='flex  gap-3'>
        <input onChange={()=>handleIsCompleted(goal)} type="checkbox" />
        <h2 className='text-xl font-semibold'>{goal.title}</h2>
        <div>
         <button className='mx-3 cursor-pointer hover:bg-gray-200 px-2'><i className="ri-pencil-line"></i></button><button className='cursor-pointer hover:bg-gray-200 px-2'><i className="ri-delete-bin-5-fill"></i></button>
        </div>
      </div>
      <p className='px-4 py-1 bg-green-100 rounded-full mx-auto w-fit'>{goal.category}</p>
      
    </div>
  )
}

export default GoalItem
