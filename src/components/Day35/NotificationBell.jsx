import React from 'react'

export default function NotificationBell({showNotification,handleNotificatio,unread}) {
    return (
        <div onClick={()=>handleNotificatio()} className=' flex justify-center gap-0 items-center px-7 shadow-md shadow-gray-200 cursor-pointer py-2  flex-col-reverse rounded-full ml-auto'>
            <h2 className='text-xs underline  font-semibold'>Notifications</h2>
            <div className='relative w-fit text-center '>
                <i style={{rotate:showNotification ? "8deg" :"",
                    color:showNotification ? "#De3Ef6" :"black"
                }} className="ri-notification-3-fill transition-all duration-200 text-2xl relative  inline-block">

                  
                </i>
                  <span className='text-sm absolute -top-2 font-semibold text-blue-600 -right-2 '>{unread}</span>
            </div>

        </div>
    )
}
