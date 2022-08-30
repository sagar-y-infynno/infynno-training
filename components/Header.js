import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="app-header main-container">
      <div className='links-block'>
        <Link href="/" ><a  className="header-link">HOW IT WORKS</a></Link>
        <Link href="/" ><a className="header-link">WHY US</a></Link>
        <Link href="/" ><a className="header-link">CONTACT US</a></Link>
      </div>
      <div className='logo-block'>
        <Image src="/images/autodigg.svg" alt="logo" height="36px" width="132px" />
      </div>
      <div className='actions-block'>
        <Link href="/" >
          <a className="header-action-link">
            <Image src="/images/car.svg" alt="car" height="20px" width="18px" />
            <span>USED CARS FOR SALE</span>
          </a>
        </Link>
        <button className="header-btn header-action-btn"><span>SIGN IN/REGISTER</span></button>
      </div>
      
    </div>
  )
}
