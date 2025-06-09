import { useState } from 'react'

import './App.css'
import Navbar from './Compoents/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className='h-screen bg-amber-950 w-full'>

    </div>
    <div className='h-screen bg-amber-500 w-full'>

    </div>
    <div className='h-screen bg-amber-100 w-full'>

    </div>
    </>
  )
}

export default App
