import React, { memo, useContext, useRef,useState } from 'react'
import Comp3 from '../comp3'
import { counterContext } from '../context'

const Comp2 = () => {
  // const {setcount} = useContext(counterContext)
  console.log("rebdeubg")
  const rangeRef = useRef()
  const [left, setleft] = useState(0)
  const handleRef = (ref,value)=>{
    const inp = ref.current;
    const min = inp.min;
    const max = inp.max;
    const pct = (value - min) / (max-min) * 100;
    setleft(pct)
  }
  return (
    <div>
    
    <div className='relative w-full py-6   border'>
        <div style={{position:'absolute',left:left,top:-5}}>{Math.floor(left)}%</div>
      <input onChange={(e)=>handleRef(rangeRef,e.target.value)} ref={rangeRef} type="range" min={20} max={90} />
    </div>
     
    </div>
  )
}

export default memo(Comp2)
