import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className='footer-wrapper' >
        <div className="footer-language-sec" >
          
        </div>
        <div className='footer-navigation-sec'>
          <p className='footer-title'>NAVIGATION</p>
          <div className="footer-links-box" >
            <Link to="/"> Home </Link>
            <Link to="/"> FAQ </Link>
            <Link to="/"> Investor Relations </Link>
            <Link to="/"> Jobs </Link>
            <Link to="/"> About Us </Link>
            <Link to="/"> Help Centre </Link>
          </div>
        </div>
        <div className='footer-legal-sec'>
          <p className='footer-title'>LEGAL</p>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Cookie Preferences</Link>
          <Link to="/">Corporate Information</Link>
        </div>
        <div className='footer-contact-sec'>
          <p className='footer-title'>TALK TO US</p>
          <Link to="/">support@ercom.com</Link>
          <Link to="/">+66 2399 1145</Link>
        </div>
        <div className='footer-social-sec'>
          <p className='footer-title'>FOLLOW US</p>
        </div>
      </div>
      <div className='footer-bottom' >
        <p>&copy; 2022 Dramatic All Rights Reserved.</p>
      </div>
    </footer>
  )
}
