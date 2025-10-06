import React,{useMemo, useState} from 'react'
import { counterContext } from './components/Context/context'
import Comp1 from "./components/Context/Comp1.jsx"
import "./App.css"

import ErrorBoundary from './components/ErrorBoundary.jsx'

import MindMap from './components/Day54/MindMap.jsx'





const App = () => {


  const [count, setcount] = useState(0)
 
  return (
    <div className=''>
      {/* <h1 className='text-4xl font-semibold text-center text-white'>Image Crop</h1> */}
      <ErrorBoundary>
     <MindMap/>
      </ErrorBoundary>
    </div>
  )
}

export default App
