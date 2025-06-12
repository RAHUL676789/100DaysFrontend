import { useState } from 'react'

import './App.css'
import Navbar from './Compoents/Navbar'
import DarkLight from './Compoents/DarkLight'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <DarkLight/>
    </>
  )
}

export default App
