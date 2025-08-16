import React, { useEffect, useState } from 'react'
import NotificationBell from './NotificationBell'
import NotificationList from './NotificationList'
import sampleNotification from './NotificationUtil.js'
import { useNotifications } from './notificationContext.jsx'
const NotificationCenter = () => {
 const {notifications} = useNotifications();
//  console.log(notifications)
  const [showNotification, setshowNotification] = useState(false)
  const [unread, setunread] = useState(null)

  const handleNotificatio = () => {
    setshowNotification((prev) => !prev)
  }
 

  useEffect(() => {
    let unread = notifications?.reduce((acc, curr) => {
      console.log(curr)
      acc += curr?.read ? 0 : 1;
      return acc;

    }, 0)
    setunread(unread);
  
  }, [notifications])





  return (
    <div className='w-md overflow-y-scroll shadow-md shadow-gray-200 h-screen mx-auto p-4'>

      <NotificationBell unread={unread} showNotification={showNotification} handleNotificatio={handleNotificatio} />
      <NotificationList notifications={notifications} showNotification={showNotification} />
    </div>
  )
}

export default NotificationCenter
