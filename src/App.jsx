import React,{useMemo, useState} from 'react'
import { counterContext } from './components/Context/context'
import Comp1 from "./components/Context/Comp1.jsx"

const App = () => {


  const [count, setcount] = useState(0)
 
  return (
    <div>
      <counterContext.Provider value={{count,setcount}}>
        <Comp1/>


      </counterContext.Provider>
  
    </div>
  )
}

export default App
