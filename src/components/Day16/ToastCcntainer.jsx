import React, { useState } from 'react'
import Toast from './Toast';

const ToastCcntainer = () => {
    // const [toastType,setToastType] = useState("");
    // const [toastContent, settoastContent] = useState("")
    const [toastLength, settoastLength] = useState([]);
    const [id,setId] = useState(0);

    const handleButtonClick = (type,content)=>{
       
        console.log(id);
        const netToast = {type,content,id};
        

        settoastLength((prev)=>{
            return [...prev,netToast]
        });
        setId((prev)=>prev + 1);


        // const fileterToast = toastLength.filter((ite,i)=>ite.id != id);
        setTimeout(()=>{
           settoastLength((prev)=>prev.filter((item,i)=>item.id != netToast.id));
        },5000);

        console.log(toastLength)
    }


    const remover = (id)=>{
        console.log("rmeover")
        settoastLength((prev)=>prev.filter((ite,i)=>ite.id != id));
    }

  return (
    <div className=' relative bg-black h-screen w-screen p-0 '>
    <div className="btn">
        <button className='border border-white text-white m-5 px-4 py-2 bg-red-800 font-bold cursor-pointer' onClick={()=>handleButtonClick("error","This is Toast content of type")}>Error Toast</button>
        <button className='border border-white text-white px-5 py-2 bg-yellow-400  font-bold cursor-pointer' onClick={()=>handleButtonClick("warning","This is Toast content of type")}>Warning Toast</button>
        <button className='bg-green-500 cursor-pointer m-4 border border-white text-white font-bold px-5 py-2' onClick={()=>handleButtonClick("success","This is Toast content of type")}>Success Toast</button>
    </div>
    
    <div className=' absolute right-0 top-10 flex flex-col gap-5 max-h-48 px-5 py-2 overflow-scroll no-scrollbar'>
         {toastLength?.map((item,i)=>(
            <Toast key={item.id} type={item?.type} content={item?.content} id={item.id} remover={remover}/>
         ))}
    </div>
      
    </div>
  )
}

export default ToastCcntainer
