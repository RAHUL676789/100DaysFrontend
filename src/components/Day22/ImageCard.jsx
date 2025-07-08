import React, { useEffect, useState,useRef } from 'react'
import gsap from "gsap"


const ImageCard = ({img,indx,title}) => {
  const ref = useRef(null)
  const [isVisble, setisVisble] = useState(false)

  useEffect(()=>{
    const observer = new IntersectionObserver(
      ([entery])=>{
        if(entery.isIntersecting){
          setisVisble(true);
          observer.disconnect();
        }
      },{threshold:0.9}
    )
    if(ref.current){
      observer.observe(ref.current);
    }
  },[])

  useEffect(()=>{
         if(isVisble && ref.current){
               gsap.fromTo(ref.current,{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1})
         }
  },[isVisble])
  return (
    <div ref={ref}  className='break-inside-avoid p-2'>
      
     {isVisble === true ?  <div  className='h-full w-full shadow-md shadow-gray-300 p-1'>
         <img src={img} alt="" className='object-cover h-full w-full animated-image' />
       {title}
      </div>  : <div className='h-64 w-64 animate-pulse bg-gray-300 px-5 py-3 '>
         </div>}
      
    </div>
  )
}

export default ImageCard
