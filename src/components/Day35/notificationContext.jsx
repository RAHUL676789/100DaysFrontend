import { useContext, createContext, useState, useEffect } from "react";
import sampleNotification from "./NotificationUtil.js"




// create a context

const notificationContext = createContext();

export const useNotifications = () => useContext(notificationContext);


export const NotificationProvider = ({ children }) => {

    const [notifications, setnotifications] = useState([]);

    useEffect(() => {
        let existing = JSON.parse(localStorage.getItem("notifications"))
          console.log(existing)
        if ( existing && existing.length > 0) {
            // console.log("if")
            setnotifications(existing);

        } else {
            localStorage.setItem("notifications", JSON.stringify(sampleNotification));
            setnotifications(JSON.parse(localStorage.getItem("notifications")))
        }

    }, [])


    const markAsRead = (id)=>{
        const updateNotifi = notifications?.map((item, i)=>item.id === id ? {...item,read:true}: item);
        setnotifications(updateNotifi);
        localStorage.setItem("notifications",JSON.stringify(updateNotifi));

    }

    const deleteNotifi = (id)=>{
        const deleteNotifi = notifications?.filter((item,i)=>item.id !== id);
                setnotifications(deleteNotifi);
        localStorage.setItem("notifications",JSON.stringify(deleteNotifi));

    }

    return (
        <notificationContext.Provider value={{notifications, markAsRead,deleteNotifi}}>
            {children}

        </notificationContext.Provider>
    )
}