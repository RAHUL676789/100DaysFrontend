import React, { useState } from 'react';

const CustomDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (value) => {
    console.log("Selected:", value);
    setIsOpen(false);
  };

  return (
    <div className='dropdown relative flex flex-col w-screen px-5 mr-6 ml-6 items-start'>
      <div className="opt border w-[70%] flex justify-between py-1 px-4 rounded-md bg-white cursor-pointer" onClick={handleToggle}>
        <p>Select a Service</p>
        <button className={`transition-all duration-150 ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <i className="ri-arrow-up-s-fill text-lg" />
        </button>
      </div>

      {isOpen && (
        <ul className='border w-[70%] mt-1 rounded-md overflow-hidden bg-white shadow-md'>
          {["Electrician", "Plumber", "Barber", "Beautician"].map(service => (
            <li
              key={service}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(service)}
            >
              {service}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropDown;
