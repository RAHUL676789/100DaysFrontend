import React, { useRef, useState } from 'react'
import ToastNoti from './ToastNoti'

const CopyClipBoard = () => {
  const [isCopy, setisCopy] = useState(false)
  const [charCount, setcharCount] = useState(0);
  const text = useRef(null);
  let maxLimit = 1000;

  const handleCopy = () => {
 
     text.current.select()
    setisCopy(true)
    setTimeout(() => {
      setisCopy(false);
    }, 400);

    // navigator.select - text(text.value)
    navigator.clipboard.writeText(text.current.value);

  }


  const handleCharCount = (e) => {
    // let text = document.querySelector("#textarea");
    let t = e.target;
      if (t.value.length > maxLimit) {
      t.value = t.value.slice(0, maxLimit);
      return;
    }

   
       const currentHeight = parseInt(window.getComputedStyle(text.current).height);
       console.log(currentHeight)

    if (currentHeight < 300) {
   
      text.current.style.height = "auto";
      text.current.style.height = text.current.scrollHeight + "px"
    }
    setcharCount(text.current.value.toString().length);
    
   
  }

  return (
    <div className='bg-white flex flex-col justify-center items-center w-96 p-4'>

      <div className={`fixed top-0 -translate-y-full ${isCopy ? "translate-y-5"  :"-translate-y-full"} transition-all duration-150`}>
        <ToastNoti />
      </div>


      <button onClick={handleCopy} className='ml-auto cursor-pointer active:translate-y-0.5'>copy <i className="ri-file-copy-fill"></i></button>
      <textarea  ref={text} onChange={handleCharCount} name="" id="textarea" rows={2} cols={10} className='border w-full select-text outline-0 p-2 over min-h-[64px]'>

      </textarea>
      <span className='self-end text-xs font-light'>{charCount}/{maxLimit}</span>

    </div>
  )
}

export default CopyClipBoard
