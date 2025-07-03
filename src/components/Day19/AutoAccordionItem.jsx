import React, { useRef, useState } from 'react'
import TabContent from './TabContent';

const AutoAccordionItem = ({ item, isOpen, handleIsopne }) => {
    const contentRef = useRef(null);
   const [isTabOpen, setisTabOpen] = useState(null)

    const handletabopen = (e,name)=>{
         e.stopPropagation();

         if(isTabOpen == name){
            setisTabOpen(null);
            return;

         }
         setisTabOpen(name);
    }
    return (
        <div className='bg-white rounded-lg shadow-sm shadow-black border-b mt-5 '>

            <div onClick={() => handleIsopne(item.id)} className='bg-gray-500 font-bold px-5 py-3 rounded-lg flex flex-col gap-1 '>

              <div className='bg-gray-400 px-3 py-4  rounded-lg'>
                  <div className='flex py-1 text-black rounded-lg  justify-between px-3'>
                    <p >{item.title}</p>
                    <i className={`ri-arrow-down-s-line ${isOpen ? "rotate-0" : "-rotate-180"} transition-all duration-300 `}></i>
                </div>

                <div
                    style={{
                        maxHeight: isOpen ? `${contentRef.current.scrollHeight}px ` : ""
                    }}

                    ref={contentRef} className={` px-4 ${!isOpen ? "max-h-0" : ""} overflow-hidden transition-all duration-300 flex flex-col gap-2  `}>
                    {
                        item.tabs.map((tab, i) => (
                           <div onClick={(e)=>handletabopen(e,tab.label)} className='rounded-lg  px-3  min-h-14 overflow-scroll border no-scrollbar '>
                            {tab.label}
                            <TabContent tab={tab} tabopen={isTabOpen === tab.label} handletabopen={handletabopen}/>

                         </div>
                        ))
                    }
                </div>
              </div>

            </div>
        </div>
    )
}

export default AutoAccordionItem
