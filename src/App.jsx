import { useEffect, useState } from 'react';
import './App.css';
// import Modal from './Compoents/day5/Modal.jsx';
// import Toast from './Compoents/Day6/Toast.jsx';
// import Testimonialslider from './Compoents/Day7/TestimonialSlider.jsx';
// import MultiStepForm from './compoents/Day8/MultiStepForm.jsx';
// import CustomDropDown from './compoents/Day9/CustomDropDown.jsx';
// import CopyClipBoard from './compoents/Day10/CopyClipBoard.jsx';
import ImageSlider from './components/Day11/ImageSlider.jsx';
import Img2 from './components/Day11/ScrollImage.jsx';
import ImageSlider3D from './components/Day11/ScrollImage.jsx';
import FileUploader from './components/Day12/FileUploader.jsx';
import PdfViewer from './components/Day12/PdfViewer.jsx';
import TabSwitcher from './components/Day13/TabSwitcher.jsx';
import ScrollProgressBar from './components/Day14/ScrollProgressBar.jsx';
import AutoFocusOtp from './components/Day15/AutoFocusOtp.jsx';
import Tooltip from './components/Day16/Tooltip.jsx';
// import OverLayModal from './components/Day16/OverLayModal.jsx';
import ToastCcntainer from './components/Day16/ToastCcntainer.jsx';
// import ScrollGallery from './components/Day17/ScrollGaller.jsx';
import Navbar from "./components/Navbar.jsx"
import QuizApp from './components/Day17/QuizApp.jsx';
import QuotesBox from './components/Day18/QuotesBox.jsx';
import Accordion from "./components/Day3/Accordion.jsx"
import AutoAccordion from './components/Day19/AutoAccordion.jsx';
import SidebarLayout from './components/Day20/SidebarLayout.jsx';
// import Gallery from "./components/Day4/Gallery.jsx"
import StatsSection from './components/Day21/index.jsx';
import Modal from './components/day5/Modal.jsx';
import Gallery from './components/Day22/Gallery.jsx';
import AudioPlayer from './components/Day22/AudioPlayer.jsx';
import CanvasDraw from './components/Day23/CanvasDraw.jsx';
import TestimonialSlider from './components/Day7/TestimonialSlider.jsx';
import AnnonatoreImage from './components/Day24/AnnonatoreImage.jsx';
import CopyClipBoard from './components/Day10/CopyClipBoard.jsx';
import BeforeAfterImage from './components/Day25/BeforeAfterImage.jsx';
import ImageStack from './components/Day25/ImageStack.jsx';
import Offset from './components/Day26/PasswordGenerator.jsx';
import PasswordGenerator from './components/Day26/PasswordGenerator.jsx';
import StickyNotes from './components/Day27/StickyNotes.jsx';
import GoalTracker from './components/Day28/GoalTracker.jsx';
function App() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [toastStack, setToastStack] = useState([]);

  const handleModalopen = (e) => {
    e.stopPropagation();
    alert("Modal Cancelled");
    setisModalOpen(false);
  };

  const modalConfirm = (e) => {
    e.stopPropagation();
    alert("Modal Confirmed");
    setisModalOpen(false);
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        setisModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const showToast = (type) => {
    const id = Date.now(); // Unique ID
    const newToast = {
      id,
      type,
      message: `This is a ${type} toast message!`,
    };

    setToastStack((prev) => [...prev, newToast]);

    // Auto-close after 3 seconds
    setTimeout(() => {
      setToastStack((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const handleCloseToast = (id) => {
    setToastStack((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className=''>
      {/* <h2 className='text-3xl font-bold text-center mb-4'>Day-27/ Sticky notes </h2> */}
        {/* <TestimonialSlider/> */}
      {/* Modal Part
       {isModalOpen && (
         <Modal
         
         />
       } */}
{/* 
      <div className="flex gap-5 justify-center mb-6">
        <button
          className='border px-6 py-2 bg-green-600 text-white font-bold active:translate-y-0.5'
          onClick={() => showToast("success")}
        >
          Success Toast
        </button>
        <button
          className='border px-6 py-2 bg-red-600 text-white font-bold active:translate-y-0.5'
          onClick={() => showToast("error")}
        >
          Error Toast
        </button>
      </div>

      {/* Toast Stack */}
      {/* <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
        {toastStack.map((item, i) => (
          <Toast key={item.id} item={item} index={i} close={handleCloseToast} />
        ))}
      </div> */}
      {/* <StickyNotes/> */}
      <GoalTracker/>
 
    </div>
  );
}

export default App;
