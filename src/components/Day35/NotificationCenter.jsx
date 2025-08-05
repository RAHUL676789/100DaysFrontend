import React, { useEffect,useState } from 'react'
import NotificationBell from './NotificationBell'
import NotificationList from './NotificationList'
import sampleNotification from './NotificationUtil.js'
const NotificationCenter = () => {
    const [notifications, setnotifications] = useState([])
    const [showNotification, setshowNotification] = useState(false)

const handleNotificatio = ()=>{
    setshowNotification((prev)=>!prev)
}
    useEffect(()=>{

        let existing = JSON.parse(localStorage.getItem("notifications"));
        if(existing){
              setnotifications(existing);
        }else{
              localStorage.setItem("notifications",JSON.stringify(sampleNotification));
              setnotifications(JSON.parse(localStorage.getItem("notifications")))
        }

    },[])
    
  return (
    <div className='w-md overflow-y-scroll shadow-md shadow-gray-200 h-screen mx-auto p-4'>
      
      <NotificationBell showNotification={showNotification} handleNotificatio={handleNotificatio}/>
      <NotificationList notifications={notifications} showNotification={showNotification}/>
    </div>
  )
}

export default NotificationCenter
