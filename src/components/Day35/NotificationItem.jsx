import React,{useRef} from 'react'
import { useNotifications } from './notificationContext';

const NotificationItem = ({ notification,handleIsOpen,isOpen }) => {
    const {markAsRead,deleteNotifi} = useNotifications();
    function getRelativeTime(timestamp) {
        const now = new Date();
        const past = new Date(timestamp);
        const diff = (now - past) / 1000; // in seconds
        // console.log(diff)

        if (diff < 60) return `${Math.floor(diff)} sec ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        if (diff < 172800) return `Yesterday`;
        return `${Math.floor(diff / 86400)} days ago`;
    }

    const msgRef = useRef();

    return (
        <div className=' flex flex-col shadow-md rounded shadow-gray-200 m-2 px-5 py-2'>
            <div className='flex justify-between ' >
                <h2 className='font-semibold'>{notification.title}</h2>
                <span className='font-light text-xs'>{getRelativeTime(notification.time)}</span>
                <i style={{rotate : isOpen ? "0deg" :"180deg" }} onClick={()=>handleIsOpen(notification?.id)} className="ri-arrow-down-s-line transition-all duration-200"></i>
            </div>
            <div ref={msgRef} style={{maxHeight : isOpen ? `${msgRef?.current?.scrollHeight}px` :"0px"}} className='text-start transition-all duration-200 overflow-hidden '>
                <p className=' text-sm' > {notification.message}</p>
               { !notification?.read &&  <div className='flex gap-2'>
                    <button onClick={()=>markAsRead(notification?.id)} className='text-xs px-2 py-1 hover:bg-gray-300 rounded cursor-pointer font-semibold text-green-500 '>mark as read</button>
                </div>}
                <button onClick={()=>deleteNotifi(notification?.id)} className='text-red-500 text-sm cursor-pointer'>delete</button>
            </div>  

        </div>
    )
}

export default NotificationItem
