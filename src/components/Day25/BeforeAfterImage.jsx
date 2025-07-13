import React, { useEffect, useRef, useState } from 'react'
import beforeImage from "../../assest/before.jpg"
import afterImage from "../../assest/after.jpg"

const BeforeAfterImage = () => {
  const containerRef = useRef(null);
  const [slideX, setslideX] = useState(250)
  const [isDragging, setisDragging] = useState(false);


  const startDragging = () => {
    setisDragging(true);

  }

  const stopDragging = () => {
    setisDragging(false);

  }

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef) return;


    const rect = containerRef.current.getBoundingClientRect()
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    setslideX(x);



  }


  useEffect(() => {

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopDragging)

    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", stopDragging)

    }


    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", stopDragging)
    }

  }, [isDragging])
  return (
    <div  className='h-[90vh] max-w-screen relative mx-5  border select-none' ref={containerRef}>
      <img src={afterImage} alt="before" className='h-full w-full object-cover rounded-xl' />

      <div style={{ width: `${slideX}px` }} className='absolute border top-0 h-full rounded-xl'>
        <img src={beforeImage} style={{ width: `${slideX}px` }} className='h-full object-cover ' />

      </div>

      <div    onMouseDown={startDragging} style={{ left: `${slideX}px` }} className='h-full w-2 top-0 bg-purple-900 absolute  '>

      </div>

      {/* labels */}

      <div className='z-20 top-5 right-15 border px-5 py-2 bg-black text-white font-semibold rounded-lg absolute'>
        after
      </div>

      <div className='z-20 px-5 py-2 bg-black text-white font-semibold rounded-lg absolute top-5 left-15'>before</div>



    </div>
  )
}

export default BeforeAfterImage
