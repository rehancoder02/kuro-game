import React from 'react';
import { IoPerson } from "react-icons/io5";

const Navbar = () => {
  const navlinks = ['Home', 'News', 'resonators', 'lore','regions','game'];

  return (
    <div
      className='z-50 fixed w-full px-10'
      style={{
        background: 'linear-gradient(to bottom, black, transparent)',
      }}
    >
      <div className='flex justify-between items-center'>
        <div>
          <img src="/assets/icons/logo.png" alt="logo" />
        </div>
        <div className='flex gap-5'>
          {navlinks.map((link, i) => (
            <a className='nav-hover-btn' href="#" key={i}>{link.toUpperCase()}</a>
          ))}
        </div>
        <div className='flex gap-5'>
          <div className='border rounded-full p-1'>
            <IoPerson className='text-xl text-white' />
          </div>
          <div className='border rounded-full p-1'>
            <IoPerson className='text-xl text-white' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
