import { useEffect, useState } from 'react';
import './App.css';
import { NotificationProvider } from './components/Day35/notificationContext';
import NotificationCenter from "./components/Day35/NotificationCenter.jsx"


function App() {
 
 
    // setToastStack((prev) => [...prev, newToast]);


  return (
    <NotificationProvider>
     
    <NotificationCenter/>
    </NotificationProvider>
  );
}

export default App;
