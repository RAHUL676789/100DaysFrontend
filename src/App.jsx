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
    <div className='min-h-screen flex justify-center items-center flex-col bg-gray-300'>
      <h2 className='text-3xl font-bold text-center mb-4'>Day-13/ TabSwitcher </h2>

      {/* Modal Part */}
      {/* {isModalOpen && (
        <Modal
          close={handleModalopen}
          title={"Do you want to delete"}
          modalConfirm={modalConfirm}
          content={"The content will be deleted permanently from your system"}
        />
      )} */}

      {/* <div className="flex gap-5 justify-center mb-6">
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
      </div> */}

      {/* Toast Stack */}
      {/* <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
        {toastStack.map((item, i) => (
          <Toast key={item.id} item={item} index={i} close={handleCloseToast} />
        ))}
      </div> */}
      {/* <Testimonialslider/> */}
      {/* <CopyClipBoard/> */}
      {/* <ImageSlider/> */}
      {/* <Img2/> */}
      {/* <ImageSlider3D/> */}
      {/* <FileUploader/> */}
      {/* <PdfViewer/> */}
      <TabSwitcher/>
    </div>
  );
}

export default App;
