import React from 'react'

const Toggle = ({dark,toggle}) => {
  return (
    <div className={`flex border px-7 py-2 rounded-lg  ` }>

        <button type='' className={`cursor-pointer `} onClick={()=>toggle()}>
           {dark ? <i className="ri-moon-clear-fill ">  Dark</i>   :<i className="ri-sun-fill text-yellow-600">  Light</i>}
        </button>
      
    </div>
  )
}

export default Toggle
