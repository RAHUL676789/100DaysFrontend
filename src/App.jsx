import { useEffect, useState } from 'react';
import './App.css';
import { NotificationProvider } from './components/Day35/notificationContext';
import NotificationCenter from "./components/Day35/NotificationCenter.jsx"
import MultipleImageUploaderandPreviwer from './components/Day32/MultipleImageUploaderandPreviwer.jsx';
import AdvanceTable from './components/Day34/AdvanceTable.jsx';
import ScrollAnimationPlayer from './components/Day33/ScrollAnimationPlayer.jsx';
import Basic from './components/Framer/Basic.jsx';
import ThreeDProductShowcase from './components/Day36/Curosul.jsx';
import AudioPlayer from './components/Day22/AudioPlayer.jsx';
// import ThreeDProductShowcase from './components/Day36/Curosul.jsx';


function App() {
 
 
    // setToastStack((prev) => [...prev, newToast]);


  return (
  // <MultipleImageUploaderandPreviwer/>//
  // <ThreeDProductShowcase/>
  <AudioPlayer/>
  
  // <Basic/>
 
  );
}

export default App;
