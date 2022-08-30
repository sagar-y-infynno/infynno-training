import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <>
      <div className="app-footer main-container">
        <div className='footer-content'>
          <div className="footer-logo">
            <Image src="/images/autodigg-white.svg" alt="logo" height="36px" width="132px" />
          </div>
          <p className="footer-details">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
        </div>
        <div className='footer-links'>
          <div className='footer-so-links-box'>
            <Link href="/" >
              <a className="footer-so-link">
                <Image src="/images/soi-fb.svg" alt="car" height="24px" width="24px" />
              </a>
            </Link>
            <Link href="/" >
              <a className="footer-so-link">
                <Image src="/images/soi-twitter.svg" alt="car" height="24px" width="24px" />
              </a>
            </Link>
            <Link href="/" >
              <a className="footer-so-link">
                <Image src="/images/soi-insta.svg" alt="car" height="24px" width="24px" />
              </a>
            </Link>
          </div>
          <div className='footer-links-box'>
            <Link href="/" >
              <a className="footer-link">How it works</a>
            </Link>
            <Link href="/" >
              <a className="footer-link">Blog</a>
            </Link>
            <Link href="/" >
              <a className="footer-link">Frequently asked questions</a>
            </Link>
            <Link href="/" >
              <a className="footer-link">Are you a dealer?</a>
            </Link>
            <Link href="/" >
              <a className="footer-link">Contact us</a>
            </Link>
          </div>
        </div>
      </div>
      <div className='copyright-block main-container' >
        <span className="copyright-text">© AutoDigg 2021. All Rights Reserved.</span>
        <div className='footer-links-box'>
          <Link href="/" >
            <a className="footer-link">Terms of Service</a>
          </Link>
          <Link href="/" >
            <a className="footer-link">Privacy Policy</a>
          </Link>
        </div>
      </div>
    </>
  )
}
