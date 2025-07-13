import React, { useRef, useState } from 'react'
import stack1 from "../../assest/stack1.jpg"
import stack2 from "../../assest/stack2.jpg"
import stack3 from "../../assest/stack3.jpg"
import stack4 from "../../assest/stack4.jpg"
import stack5 from "../../assest/stack5.jpg"
import stack6 from "../../assest/stack6.jpg"
import stack7 from "../../assest/stack7.jpg"

const ImageStack = () => {

  const imageArray = [
    { img: stack1, content: "❤️ Love to feel Deep" },
    { img: stack2, content: "🔥 Passionate about Growth" },
    { img: stack3, content: "🎯 Focused & Determined" },
    { img: stack4, content: "💡 Ideas turn into Code" },
    { img: stack5, content: "🚀 Always ready to build" },
    { img: stack6, content: "🌿 Calm, Creative & Curious" },
    { img: stack7, content: "🎨 Crafting clean interfaces" }
  ];


  const offsetRef = useRef({ x: 0, y: 0 })
  const [isDragging, setisDragging] = useState(false);
  const [dragIndex, setdragIndex] = useState(null);
  const [postion, setpostion] = useState((imageArray.map((_, i) => ({ x: i * 10, y: i * 10 }))))
  const containerRef = useRef(null);


  const handleMouseUp = () => {
    setisDragging(false);
    setdragIndex(null);


  }

  const handlemouseMove = (e) => {
    if (!isDragging || dragIndex === null || !containerRef.current) return;
 
    const rect = containerRef.current.getBoundingClientRect();
     const x = e.clientX - rect.left - offsetRef.current.x
     const  y =  e.clientY - rect.top - offsetRef.current.y
    const newPostion = [...postion];
    newPostion[dragIndex] = { x, y };
    setpostion(newPostion);

  }

  const handmouseDown = (e, i) => {
    setisDragging(true);
    setdragIndex(i);
    const rect = containerRef.current.getBoundingClientRect();


    offsetRef.current = {
    x: e.clientX - rect.left - postion[i].x,
  y: e.clientY - rect.top - postion[i].y
    }

    console.log("postion")

  }

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => handlemouseMove(e)}
      onMouseUp={handleMouseUp}


      className='h-[400px] relative  w-[800px] mx-auto px-5 shadow-md bg-white shadow-gray-700 flex justify-center items-center flex-col rounded-lg '>

      <div

        className='absolute h-[300px] w-[400px] mx-auto  shadow-lg shadow-gray-800 rounded-lg cursor-grab'>
        {
          imageArray.map((item, i) => (
            <div key={i}
              onMouseDown={(e) => handmouseDown(e, i)}
              style={{
                left: `${postion[i].x}px`,
                top: `${postion[i].y}px`,
                    zIndex: imageArray.length - i,
              }} className='absolute select-none h-full w-full inset-0 rounded-lg'>
              <img src={item.img} className='h-full w-full object-cover rounded-lg' />
              <div className='absolute bg-black/30 inset-0  rounded-lg flex flex-col items-center justify-center text-white font-semibold'>
                {item.content}
              </div>
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default ImageStack
