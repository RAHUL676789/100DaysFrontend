import React,{memo, useContext} from 'react'
import { counterContext } from './context'

const Comp3 = () => {
    const {count} = useContext(counterContext)
    console.log("Red")
  return (
    <div>
        comp3
        {count}
      
    </div>
  )
}

export default memo(Comp3)
