import React, { useState } from 'react'
import Toggle from './Toggle'

const DarkLight = () => {

  const [Dark, setDark] = useState(true)
  return (
    <div className={`${Dark && "dark:bg-gray-900 text-white"} flex justify-center items-center flex-col h-screen w-screen transition-all duration-300`}> 
     <div className="content  h-[60%] w-[40%] flex justify-center items-center flex-col gap-4 ">
       <h2 className='text-2xl font-bold m-4'>Dark&Light Mode</h2>
       <div>
        welcome to the dark and light mode
      </div>
      <div>
          <Toggle dark={Dark} toggle={() => setDark((prev) => !prev)} />
        </div>
     </div>
     


    </div>
  )
}

export default DarkLight
