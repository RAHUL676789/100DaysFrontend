import React, { memo } from 'react'
import Comp2 from './Comp2/Comp2'

const Comp1 = () => {
  console.log("rend")
  return (
    <div>
      <Comp2/>
    </div>
  )
}

export default memo(Comp1)
