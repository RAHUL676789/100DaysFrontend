import React,{useRef,useState} from 'react'
import NotificationItem from './NotificationItem'

const NotificationList = ({notifications,showNotification}) => {
    const notifieRef = useRef();
    const [isOpen, setisOpen] = useState(null)
    const handleIsOpen = (id)=>{
        setisOpen((prev)=> prev === id ? null : id);
    }
  return (
    <div ref={notifieRef} style={{maxHeight:showNotification ? `${notifieRef?.current?.scrollHeight}px` : `0px`}} className='text-center py-2 overflow-hidden transition-all duration-500'>
        {
            notifications.length > 0 ? 
            notifications.map((notification,i)=>(
                <NotificationItem key={i} notification={notification} isOpen={isOpen === i+1 ? true : false} handleIsOpen={handleIsOpen}/>

            )) 

         : 
            <div> </div>
        }

    </div>
  )
}

export default NotificationList
