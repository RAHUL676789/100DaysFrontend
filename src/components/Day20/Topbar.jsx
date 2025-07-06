import React from 'react'

const TopBar = ({tabName}) => {
  return (
    <div className='h-16 flex justify-between   px-5 bg-white   items-center   '>
      <h2>  {tabName}</h2>

        <div className='font-black'>
            <i className="ri-user-smile-line text-3xl font-light"></i>
        </div>
        
      
    </div>
  )
}

export default TopBar
