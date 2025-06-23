import {useState,useRef,useEffect} from "react";


function ImageSlider(){




  const scrollRef = useRef(null);
  const [distances,setDistances] = useState([]);
  const [activeIdx,setActiveIdx] = useState(null);
   const imageData = [
    "https://plus.unsplash.com/premium_photo-1716572865911-1966b41dd359?q=80&w=415&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1695384287398-5781a1f51c31?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1639020715359-f03b05835829?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1694763891594-3b19ad17dec1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1689581916399-fb9e1e56c21f?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1570701123784-2d41777f5e93?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1690764250255-e63ffb4f03b5?q=80&w=410&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1716572865911-1966b41dd359?q=80&w=415&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1695384287398-5781a1f51c31?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1639020715359-f03b05835829?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1694763891594-3b19ad17dec1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1689581916399-fb9e1e56c21f?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1570701123784-2d41777f5e93?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1690764250255-e63ffb4f03b5?q=80&w=410&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  ]



  const handleScroll = ()=>{

    const container = scrollRef.current;
    const centerX = container.scrollLeft + container.clientWidth / 2;

    let allDistance = [];
    let indx = -1;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child,i)=>{
      let childCenter = child.offsetLeft + child.offsetWidth / 2;
      let distance = centerX - childCenter
     
      allDistance.push({childCenter,i,distance});

      if(Math.abs(distance) < minDistance){
        minDistance = distance;
        indx = i;
      }
      
    })
        setDistances(allDistance);
        setActiveIdx(indx);



  }

  const handleNext = ()=>{
    scrollRef.current.scrollLeft+=250;
  }

   const handlePrev = ()=>{
    scrollRef.current.scrollLeft-=250;
  }
  return (
    <div className=" max-w-[90%]  
 flex relative justify-center py-5 ">
      <button onClick={handlePrev} className="absolute -left-10  
 bg-blue-800 font-bold top-1/2  px-7 py-2 z-50 rounded-lg active:translate-y-0.25 cursor-pointer text-white ">
        prev
      </button>
      <div onScroll={ handleScroll} ref={scrollRef} className="relative flex overflow-x-scroll scroll-smooth no-scrollbar gap-10 w-full  
 items-center px-[45%] py-5 bg-gray-200 h-full  ">
        {
          imageData.map((it,i)=>{
            let container = scrollRef?.current;
            let item = distances?.find((d)=>d.i === i);
            let childCenter = item?.childCenter || 0;
            let centerx = container?.scrollLeft + container?.clientWidth / 2;
            let distance = item?.distance || 0;
            let linwidth = Math.abs(distance);
           
          


            return(
            <div className={`shrink-0 transition-all duration-200 relative bg-white  rounded-lg ${activeIdx === i ? "scale-120" :"scale-75"}`}>
              <img src={it} alt=""  className="h-64 w-64 rounded-lg"/>
              <div 
              style={{
                width:linwidth,
             transform: distance > 0 ? "translateX(-100%)" : "translateX(0)"

              }}
            
              className="line h-[2px] z-50 bg-green-300 absolute top-1/2 left-[50%] translate-x-1/2  rounded-full">
          

              </div>
              <div
              style={{
                left:distance > 0 ? "auto" :"90%",
                right:distance > 0 ? "90%" :"atuo"
              }}
               className="distance z-50 absolute px-4 rounded-lg flex justify-center items-center w-16 py-1  text-white bg-black top-1/2 ">
                {Math.round(Math.abs(distance))}

              </div>
           </div>)
})
        }

      </div>
      <button onClick={handleNext} className="absolute right-0 top-1/2  bg-green-600 font-bold text-white px-7 py-2 z-50 rounded-lg active:translate-y-0.5"> next</button>


    <div className="center absolute h-full bg-red-800 w-[2px] top-0 left-1/2 -translate-x-1/2" >


      </div>

    </div>
  )
}

export default ImageSlider;