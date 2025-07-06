import React from 'react'

const Sidebar = ({isOpen,setisOpen,setTabname,active,setactive}) => {
  const navItems = [
    { label: "Profile", icon: "ri-user-line" },
    { label: "Settings", icon: "ri-settings-3-line" },
    { label: "Users", icon: "ri-group-line" },
    { label: "Logout", icon: "ri-logout-box-r-line" },
  ];
  

  const handleNavitemClick = (e,activeTab)=>{
    e.stopPropagation()
    // setisOpen((prev)=>!prev)
    setTabname(activeTab)
    setactive(activeTab)

  }
  return (
    <div className={`bg-white flex flex-col gap-4 items-center justify-start text-black font-bold ${isOpen ? "w-64 " :"w-16"} transition-all duration-200`}>
      
      <div onClick={()=>setisOpen((prev)=>!prev)} className='items-center flex mt-5  w-full justify-center '>
        <i className="ri-dashboard-line"></i>
        {isOpen && <span>Dashboard</span>}
      </div>

      <nav className='flex flex-col gap-5'>
        {navItems.map((item,i)=>(
          <div title={item.label} onClick={(e)=>handleNavitemClick(e,item.label)}className={`p-2 m-3 hover:bg-blue-50 transition-all duration-200 rounded-lg cursor-pointer ${active == item.label && "bg-green-600 text-white"}`}>
            <i className={`${item.icon} mx-2`}></i>
           {isOpen && <span> {item.label}</span>}
          </div>
        ))}
      </nav>
      
    </div>
  )
}

export default Sidebar
