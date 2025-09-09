import React,{useMemo, useState} from 'react'
import { counterContext } from './components/Context/context'
import Comp1 from "./components/Context/Comp1.jsx"
import "./App.css"
import InfiniteScroll from './components/Day41/InfiniteScroll.jsx'
import ScrollTopUp from './components/Day42/ScrollTopUp.jsx'
import ResizeablePane from './components/Day43/ResizeablePane.jsx'

const App = () => {


  const [count, setcount] = useState(0)
 
  return (
    <div>
       <h1 className="text-3xl font-semibold text-center mb-3 ">Resizeable Pane Split</h1>
   <ResizeablePane/>
  
    </div>
  )
}

export default App
