import { useState } from 'react'

import './App.css'
import Navbar from './Compoents/Navbar'
import DarkLight from './Compoents/DarkLight'
import Accordion from './Compoents/Day3/Accordion'
import Gallery from "./Compoents/Day4/Gallery.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen bg-white'>
      <h2 className='text-3xl font-bold text-center mb-4'>Gallery</h2>
      <Gallery />


 

  


    </div>
  )
}

export default App
