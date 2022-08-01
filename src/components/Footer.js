import React from 'react';
import { Link } from 'react-router-dom';
// import homeLogo from '../assets/images/home-logo.png';
import homeLogo from '../assets/images/home-logo-active.png';
import scheduleLogo from '../assets/images/schedule-logo.png';
import shopLogo from '../assets/images/shop-logo.png';
import ellipsis from '../assets/svgs/ellipsis-icon.svg';
import fbIcon from '../assets/svgs/fb_icon.svg';
import instaIcon from '../assets/svgs/insta_icon.svg';
import twitterIcon from '../assets/svgs/twitter_icon.svg';
import fancode from '../assets/svgs/fancode.svg';

export default function Footer() {
  return (
    <footer className="bg-theme-main w-screen pb-[70px] md:pb-0">
      <div className='footer-container w-full mx-auto max-w-[1024px] grid md:grid-cols-2 md:gap-[50px]' >
        <div className="flex flex-col w-max items-center mx-auto md:flex-row md:items-start md:gap-[50px]">
          <div className='footer-img-box max-w-[150px] py-[24px]'>
            <img src={fancode} className="h-full w-full mb-[-8px]" alt="main-logo" />
          </div>
          <div className="contact-footer p-[24px] text-center" >
            <h2 className="text-[#c8c8c8] text-[18px] font-noto mb-[23px]" >Contact With Us</h2>
            <div className="contact-icons-box flex gap-[24px]">
              <img className="w-[48px] h=[48px]" src={fbIcon} alt="social icons.." />
              <img className="w-[48px] h=[48px]" src={instaIcon} alt="social icons.." />
              <img className="w-[48px] h=[48px]" src={twitterIcon} alt="social icons.." />
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center md:text-left grid gap-[30px] p-[24px]" >
          <address className="text-[14px] text-white font-noto leading-[1.29] tracking-[0.25px]" >
          Corporate Office: 
          ONE BKC, Tower A, 12th &amp; 14th Floor, Unit 1201 &amp; 1202 and 1401 &amp; 1402, Plot C-66, G Block, Bandra Kurla Complex, Bandra (East), Mumbai, Maharashtra-400051
          </address>
          <nav className="bottom-links">
            <Link className="text-[14px] text-white font-noto leading-[1.29] tracking-[0.25px]"  to=''>Careers | </Link>
            <Link className="text-[14px] text-white font-noto leading-[1.29] tracking-[0.25px]"  to=''>Help Desk | </Link>
            <Link className="text-[14px] text-white font-noto leading-[1.29] tracking-[0.25px]"  to=''>T&Cs | </Link>
            <Link className="text-[14px] text-white font-noto leading-[1.29] tracking-[0.25px]"  to=''>Privacy Policy | </Link>
            <Link className="text-[14px] text-white font-noto leading-[1.29] tracking-[0.25px]"  to=''>About Us | </Link>
            <Link className="text-[14px] text-white font-noto leading-[1.29] tracking-[0.25px]"  to=''>IND vs WI</Link>
          </nav>
        </div>
      </div>
      {/**  
       * mobile only bottom nav 
       */}
      <div className="mob-nav pt-[5px] w-screen shadow-[0px_0px_8px_0px_#0000001a] flex items-center justify-around bg-white fixed md:hidden bottom-0">
        <div className="flex justify-center flex-col items-center" >
          <img src={homeLogo} className="h-[24px] w-[24px] mb-[5px]" alt="home" />
          <span className='text-theme-secondary' >Home</span>
        </div>
        <div className="flex justify-center flex-col items-center" >
          <img src={scheduleLogo} className="h-[24px] w-[24px] mb-[5px]" alt="home" />
          <span className='text-[#66718c]' >Home</span>
        </div>
        <div className="flex justify-center flex-col items-center" >
          <img src={shopLogo} className="h-[24px] w-[24px] mb-[5px]" alt="home" />
          <span className='text-[#66718c]' >Home</span>
        </div>
        <div className="flex justify-center flex-col items-center" >
          <img src={ellipsis} className="h-[24px] w-[24px] mb-[5px]" alt="home" />
          <span className='text-[#66718c]' >Home</span>
        </div>
      </div>
    </footer>
  )
}
