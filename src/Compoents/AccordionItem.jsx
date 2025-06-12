import React from 'react'

const AccordionItem = ({question,answer,isOpenIndex,toggle,i}) => {
  return (
    <div className='item bg-white w-full shadow-sm shadow-white py-4 m-3' key={i+1}>
      <button onClick={()=>toggle()} className='p-2 flex justify-between items-center w-full '>
        <h3> <span>{i+1}</span>  {question}</h3>
        <span>
         { isOpenIndex ? <i class="ri-subtract-fill"></i> : <i class="ri-add-line"></i>}
        </span>
      </button>
    <div
        className={`px-6 text-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpenIndex ? 'max-h-96 py-2' : 'max-h-0 py-0'
        }`}
      >
        <p>{answer}</p>
      </div>
      
      
    </div>
  )
}

export default AccordionItem
