import { useEffect, useState } from 'react'

import './App.css'
import Modal from './Compoents/day5/Modal.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [isModalOpen, setisModalOpen] = useState(false)


  const handleModalopen = (e) => {
    e.stopPropagation();
    alert("modal cancel")
    setisModalOpen(false);
  }

  const modalConfirm = (e) => {
    e.stopPropagation();
    alert("modla confirm")
    setisModalOpen(false);
  }


  useEffect(() => {

    const handleKeydown = (e) => {
      if (e.key == "Escape") {
        setisModalOpen(false);
      }
    }


    window.addEventListener("keydown", handleKeydown)

    return () => window.removeEventListener("keydown", handleKeydown)
  }, [])

  return (
    <div className='min-h-screen bg-white'>
      <h2 className='text-3xl font-bold text-center mb-4'>Day-5 / Modal Challenge</h2>
      {
        isModalOpen && <Modal close={handleModalopen} title={"Do you want to delete"} modalConfirm={modalConfirm} content={"the content will delete permanent form your system"} />
      }


      <button onClick={() => setisModalOpen(true)} className='border px-7 py-2 bg-purple-900 text-white'>Open-Modal</button>






    </div>
  )
}

export default App
