import React, { memo, useContext } from 'react'
import Comp3 from '../comp3'
import { counterContext } from '../context'

const Comp2 = () => {
  // const {setcount} = useContext(counterContext)
  console.log("rebdeubg")
  return (
    <div>
      cmop3
      {/* <button onClick={()=>setcount((prev)=>prev - 1)}>
        desc
      </button> */}
      <button></button>
     <Comp3/>
     
    </div>
  )
}

export default memo(Comp2)
