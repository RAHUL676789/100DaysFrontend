import { useState } from 'react'

import './App.css'
import Navbar from './Compoents/Navbar'
import DarkLight from './Compoents/DarkLight'
import Accordion from './Compoents/Day3/Accordion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Accordion/>
    </>
  )
}

export default App
