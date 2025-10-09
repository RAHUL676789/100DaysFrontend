import React from 'react'
import { useCountup } from './useCountup'

const Counter = () => {

    const animateNumber = useCountup(1000,5000);
  return (
    <div>
        {animateNumber}
      
    </div>
  )
}

export default Counter
