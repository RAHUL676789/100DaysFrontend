import React, { useState } from 'react';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const navLinkAfterClass = `
    relative pb-1 after:absolute after:h-0.5 after:left-0 after:bottom-0 
    after:w-0 after:bg-teal-400 after:transition-all after:duration-300 hover:after:w-full 
    text-white hover:text-gray-200 font-bold
  `;

  const handleCloseMenu = () => setToggle(false);

  return (
    <nav className="w-full font-sans bg-gray-900 fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center h-16 px-4 md:px-8">
        <h2 className="text-2xl font-bold text-white">Logo</h2>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className={navLinkAfterClass}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setToggle(true)}
            aria-label="Open Menu"
            className="text-white text-2xl"
          >
            <i className="ri-menu-3-line"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 left-0 w-full py-4 bg-gray-900 flex flex-col items-center justify-center gap-6 transition-all duration-500 ease-in-out transform ${
          toggle ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseMenu}
          aria-label="Close Menu"
          className="absolute top-5 right-5 text-white text-2xl"
        >
          <i className="ri-close-line"></i>
        </button>

        {/* Mobile Links */}
        {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
          <a
            key={item}
            href="#"
            onClick={handleCloseMenu}
            className={navLinkAfterClass}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
