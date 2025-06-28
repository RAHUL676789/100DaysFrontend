import React, { useEffect, useState } from 'react';

const OverLayModal = () => {
  const [modal, setModal] = useState(false);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setModal(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : 'auto';
  }, [modal]);

  return (
    <div className="h-screen w-screen bg-black/20 flex flex-col justify-center items-center relative">
      <button
        onClick={() => setModal(true)}
        className="px-7 py-3 bg-green-600 absolute left-4 top-4 text-white rounded"
      >
        Show modal
      </button>

      {modal && (
        <div
          onClick={() => setModal(false)} // click on overlay
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside modal
            className="bg-white text-black rounded-lg shadow-xl px-8 py-6 w-[90%] max-w-md relative"
          >
            <button
              onClick={() => setModal(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Modal Title</h2>
            <p>This is the modal content. Click outside or press Esc to close.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverLayModal;
