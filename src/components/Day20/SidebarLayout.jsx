import React,{useState} from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const SidebarLayout = () => {
  const [isOpen, setisOpen] = useState(false)
  const [tabName, settabName] = useState("Home")
  const [active, setactive] = useState("User")
  return (
    <div className='h-screen bg-gray-600 w-full flex  '>
      <Sidebar setactive={setactive} active={active} setTabname={settabName} isOpen={isOpen} setisOpen={setisOpen}/>
    
      <div className='flex flex-col flex-1'>
          <TopBar tabName={tabName} isOpen={isOpen} setisOpen={setisOpen}/>
        <main className='mx-5 flex flex-col justify-center items-center '>
    

     <h2 className='text-4xl font-bold text-white'>you're viewing the {tabName } content</h2>

        </main>
      </div>


     
          

      
    </div>
  )
}

export default SidebarLayout
