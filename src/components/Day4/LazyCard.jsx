import {  useEffect, useRef, useState } from "react"
import gsap from "gsap"



function LazyCard({imageUrl,title}){

  const ref = useRef();
  const [isVisible,setIsVisible] = useState(false);

  useEffect(()=>{
    const observer = new IntersectionObserver(
      ([entry])=>{
      if(entry.isIntersecting){
        setIsVisible(true);
        observer.disconnect();
      }
    },
    {threshold:0.1}
  )

   if(ref.current){
     observer.observe(ref.current);
   }

    return ()=> observer.disconnect();

  },[])


  useEffect(()=>{
   
    if(isVisible && ref.current){
      gsap.fromTo(ref.current,{opacity:0,scale:0.9},{opacity:1,scale:1,duration:0.3,ease:"power3.in"})
    }

  },[isVisible])




  return (
    <div  ref={ref} className=" p-5  break-inside-avoid">
      {
        isVisible ? (
          <div  className="h-full w-full  shadow-md p-3"> 
          <img loading="lazy" src={imageUrl} alt="" className="h-full w-full object-cover" />

          </div>
        ):(<div className="w-full h-48 bg-gray-200 mb-4 animate-pulse duration-100"> 

        </div>)
      }
      
    </div>
  )
}


export default LazyCard;