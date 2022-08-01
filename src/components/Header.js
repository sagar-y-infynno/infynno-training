import React from 'react';
import { Link } from 'react-router-dom';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { CgBell } from 'react-icons/cg';
import { IoPersonCircleOutline } from 'react-icons/io5';
import getapp from '../assets/images/downloadapp.png';
import fancode from '../assets/svgs/fancode.svg';

export default function Header() {
  return (
    <header className="bg-theme-main z-[9999] w-screen fixed top-0 p-[10px] text-white">
      <div className="px-[16px] sm:px-[32px] top-bar w-full flex items-center justify-between max-w-[1024px] mx-auto md:px-0" >
        <div className="flex items-center gap-[50px]" >
          <div className="logo-wrapper h-[30px] md:h-[50px]" >
            <Link to="/" ><img src={fancode} className="h-full ml-[-7px] mb-[-15px]" alt="main-logo" /></Link>
          </div>
          <div className="hidden md:block top-nav-wrapper h-max">
            <nav className="flex gap-[24px]">
              <Link className='text-[14px] font-[600] uppercase tracking-[1.4px] text-theme-secondary' to="/" > Home </Link>
              <Link className='text-[14px] font-[600] uppercase tracking-[1.4px] ' to="/" > Schedule </Link>
              <Link className="relative after:bg-theme-secondary after:content-['NEW'] after:text-[11px] after:right-[-100%] after:px-[3px] after:bottom-[70%] after:rounded-[3px] after:absolute  text-[14px] font-[600] uppercase tracking-[1.4px]" to="/" > Shop </Link>
            </nav>
          </div>
        </div>
        <div className="top-icons-wrapper h-max flex items-center gap-[12px]">
          <span className="hidden md:block h-[24px] w-[24px] bg-white text-theme-main rounded-full p-[3px] flex items-center justify-center">
            <FaApple size={13} className="w-full h-full" />
          </span>
          <span className="hidden md:block h-[24px] w-[24px] bg-white text-theme-main rounded-full p-[5px] flex items-center justify-center">
            <FaGooglePlay className="h-full w-full" />
          </span>
          <p className='mr-[20px] text-[14px] font-[500] tracking-[0.45px]'>Get The App</p>
          <span className="h-[24px] md:hidden w-[24px] flex items-center justify-center">
            <img src={getapp} alt="get app" />
          </span>
          <span className="h-[24px] w-[24px] flex items-center justify-center">
            <CgBell className="h-full w-full"  />
          </span>

          <div className="flex items-center gap-[10px]">
            <span className=" relative after:top-0 after:shadow-[0px_0px_1px_3px_#001240] after:right-0 after:absolute after:rounded-full after:w-[7px] after:h-[7px]  after:content-[''] after:bg-theme-secondary  h-[24px] w-[24px]  flex items-center justify-center">
              <IoPersonCircleOutline className="h-full w-full"  />
            </span>
            <p className='hidden md:block font-[14px] font-[500] tracking-[0.45px]'>Login/Register</p>
          </div>
        </div>
      </div>
    </header>
  )
}
