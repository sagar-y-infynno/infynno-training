import React from 'react';
import { 
  ProfilePic,
  Bell,
  Gift,
  Search,
} from './Images';

export default function TopNav() {
  return (
    <div className='top-bar'>
      <div className='top-bar-left'>
        <div className='logo-box'>
          <h1> DRAMATIC </h1>
        </div>
        <nav className='top-nav'>
          <div className='link-box'>
            <a className='active' href='#!' > HOME </a>
            <span className='active-link-dot'></span>
          </div>
          <a href='#!' > TV SHOW </a>
          <a href='#!' > MOVIES </a>
          <a href='#!' > NEW </a>
        </nav>
      </div>
      <div className='top-bar-right'>
        <div className='top-search-box'>
          <input type='search' placeholder='SEARCH' />
          <Search />
        </div>
        <div className='user-icons'>
          <Gift />
          <Bell />
        </div>
        <div className='top-profile-box'>
          <ProfilePic />
        </div>
      </div>
    </div>
  )
}
