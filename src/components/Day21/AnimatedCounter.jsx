import React, { useEffect ,useState,useRef} from 'react'
import { useCounter } from './useCounter'

const AnimatedCounter = ({target,label}) => {
    const [isVisible, setisVisible] = useState(false)

    const {count,width,percentage} = useCounter(isVisible ? target : 0);
    console.log("percentage",percentage);
    const ref = useRef(null)

    useEffect(()=>{

        const observer = new IntersectionObserver(
            ([entry])=>{
                if(entry.isIntersecting){
                    setisVisible(true);
                    observer.disconnect();
                }
            },
            {threshold:0.5}
        )
        if(ref.current){
            observer.observe(ref.current);
        }

    },[])
  return (
    <div ref={ref}  className={`relative shadow-md shadow-gray-500 items-center  px-7 py-4 `}>
         <div
    className="absolute bottom-0 left-0 h-1 bg-green-700 transition-all "
    style={{ width: `${percentage}%` }}
  />
      <div className="text-center">
  <div className="text-2xl text-blue-600 font-bold">{count}+</div>
  <p className="text-sm text-gray-600">{label}</p>
  <p className="text-xs text-green-700">{Math.floor(percentage)}%</p>
</div>

    </div>
  )
}

export default AnimatedCounter
