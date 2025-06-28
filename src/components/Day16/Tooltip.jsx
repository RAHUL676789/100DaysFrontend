import React from 'react'
import Tooltipinfo from './Tooltipinfo';

const Tooltip = () => {
  return (
    <div className='h-screen w-screen p-0 bg-black flex items-center justify-center flex-col'>
      <div className="relative group cursor-pointer border border-green-600 h-16 max-w-xl px-5 shadow-md shadow-gray-200 rounded-lg py-6 bg-gray-300">
        <p className='text-xl font-bold'>Hover me to show the tooltip</p>

        <div className="absolute opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 -top-18 right-0 w-48 px-7 py-5 bg-white shadow-xl rounded">
          <Tooltipinfo content="this is tool info" />
        </div>
      </div>
    </div>
  )
}

export default Tooltip
