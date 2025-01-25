import React from 'react';
import { IoPerson } from "react-icons/io5";

const Navbar = ({ activeIndex, handleNavigation }) => {
  const navlinks = ['Home', 'News', 'resonators', 'lore', 'regions', 'game'];

  return (
    <div
      className='z-50 fixed w-full px-10'
      style={{
        background: 'linear-gradient(to bottom, black, transparent)',
      }}
    >
      <div className='flex justify-between items-center'>
        <a href='/'>
          <img src="/assets/icons/logo.png" alt="logo" />
        </a>
        <div className='flex gap-5'>
          {navlinks.map((link, index) => (
            <button
              key={link}
              onClick={() => handleNavigation(index)}
              className={`nav-hover-btn duration-300 delay-300 transition-colors ${activeIndex === index ? '!text-yellow-500' : ''}`}
            >
              {link.toUpperCase()}
            </button>
          ))}
        </div>
        <div className='flex gap-5'>
          <div className='border rounded-full p-1 cursor-pointer hover:bg-white/10 transition-all'>
            <IoPerson className='text-xl text-white' />
          </div>
          <div className='border rounded-full p-1 cursor-pointer hover:bg-white/10 transition-all'>
            <IoPerson className='text-xl text-white' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;