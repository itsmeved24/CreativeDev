import React, { useState } from 'react';
import cv from '../assets/cvicon.png';
import linkedin from '../assets/linkedin.jpg';
import behance from '../assets/behance.png';
import github from '../assets/github.png';
import 'remixicon/fonts/remixicon.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e, sectionId) => {
    // Optional: if you have custom smooth scrolling logic, prevent default
    // e.preventDefault(); 
    // const element = document.getElementById(sectionId.substring(1));
    // if (element) {
    //   element.scrollIntoView({ behavior: 'smooth' });
    // }
    if (isMenuOpen) {
      setIsMenuOpen(false); // Close mobile menu on click
    }
  };

  return (
    <header className="w-full px-6 md:px-48 py-4.5 border-b-2 flex justify-between items-center bg-[#e0e0db]">

      <div className='flex gap-10'>
      <a
        href="/" // Main logo/brand link, can still go to top or refresh
        className="degular-font text-lg font-semibold hover:bg-black hover:text-[#e0e0db] transition duration-450"
      >
        Vansia
        <i className="ri-arrow-right-up-long-fill text-[#e0e0db]"></i>
      </a>

      {/* Desktop Menu */}
      <nav className="hidden md:flex justify-center items-center gap-4">
        {[ { name: 'WORK', id: '#work' }, { name: 'ABOUT', id: '#about' }, { name: 'CREATIVE', id: '#creative' } ].map((item, index) => (
          <a
            key={index}
            href={item.id} // Changed to section ID
            onClick={(e) => handleNavClick(e, item.id)}
            className="degular-font text-xs py-1.5 font-medium tracking-wider hover:bg-black hover:text-[#e0e0db] transition duration-450 line-through"
          >
            {item.name}
            <i className="ri-arrow-right-up-long-fill text-[#e0e0db]"></i>
          </a>
        ))}
      </nav>
      </div>

      {/* Social Links */}
      <div className="hidden md:flex gap-4">
      <a href="/cv.pdf" download target="_blank" rel="noopener noreferrer">
        <img className='w-5 h-5 object-cover' src={cv} alt="CV" />
      </a>


        <a href="https://www.linkedin.com/in/vedank-vansia-73167b270" target="_blank" rel="noopener noreferrer">
          <img className='w-5 h-5 object-cover' src={linkedin} alt="LinkedIn" />
        </a>

        <a href="https://github.com/itsmeved24" target="_blank" rel="noopener noreferrer">
          <img className='w-5 h-5 object-cover' src={github} alt="GitHub" />
        </a>

        <a href="https://www.behance.net/vedankvansia" target="_blank" rel="noopener noreferrer">
          <img className='w-5 h-5 object-cover' src={behance} alt="Behance" />
        </a>
        
      </div>

      {/* Hamburger Menu for Mobile */}
      <button
        className="block md:hidden text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className={`ri-${isMenuOpen ? 'close-line' : 'menu-line'}`}></i>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="absolute top-0 left-0 w-full h-screen bg-[#e0e0db] p-4 flex flex-col items-start shadow-lg md:hidden z-50">
          {/* Add a close button for mobile menu if not using the hamburger toggle for it */}
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="self-end text-2xl mb-4">
            <i className="ri-close-line"></i>
          </button>
          <div className='flex flex-col w-full'> {/* Ensure full width for mobile links */}
          {[ { name: 'WORK', id: '#work' }, { name: 'ABOUT', id: '#about' }, { name: 'CREATIVE', id: '#creative' } ].map((item, index) => (
            <a
              key={index}
              href={item.id} // Changed to section ID
              onClick={(e) => handleNavClick(e, item.id)}
              className="degular-font text-sm py-2 w-full text-left font-medium tracking-wider hover:bg-black hover:text-[#e0e0db] transition duration-450 line-through"
            >
              {item.name}
            </a>
          ))}
          </div>
          <div className="flex gap-4 mt-4">
            <img className='w-5 h-5 object-cover' src={cv} alt="CV"/>
            <img className='w-5 h-5 object-cover' src={linkedin} alt="Linkedin" />
            <img className='w-5 h-5 object-cover' src={github} alt="Github" />
            <img className='w-5 h-5 object-cover' src={behance} alt="Behance" />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
