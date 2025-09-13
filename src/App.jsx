import React,{useMemo, useState} from 'react'
import { counterContext } from './components/Context/context'
import Comp1 from "./components/Context/Comp1.jsx"
import "./App.css"
import InfiniteScroll from './components/Day41/InfiniteScroll.jsx'
import ScrollTopUp from './components/Day42/ScrollTopUp.jsx'
import ResizeablePane from './components/Day43/ResizeablePane.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Home2 from './components/Home2.jsx'
import Calendar from './components/Day44/Calendar.jsx'
import CropImage from './components/Day45/CropImage.jsx'



const App = () => {


  const [count, setcount] = useState(0)
 
  return (
    <div>
      <ErrorBoundary>
      <CropImage/>
      </ErrorBoundary>
    </div>
  )
}

export default App
