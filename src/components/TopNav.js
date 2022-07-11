import React from 'react';
import { 
  ProfilePic,
  Bell,
  Gift,
  Search,
} from './Images';
import { Link, useParams } from 'react-router-dom';

const BlankBtn = ({innerComp}) => {
  return <button style={{ border: 'none', background: 'transparent', width: 'max-content' }} >{innerComp}</button>;
}

export default function TopNav() {
  const {movie_id} = useParams();
  console.log(movie_id);
  return (
    <div className='top-bar'>
      <div className='top-bar-left'>
        <div className='logo-box'>
        <Link to='/' ><h1> DRAMATIC </h1></Link>
        </div>
        <nav className='top-nav'>
            {/* <a className='active' href='#!' > HOME </a> */}
            <Link className={movie_id ? '' : 'active'} to='/' > HOME </Link>
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
          <BlankBtn innerComp={<Gift />} />
          <BlankBtn innerComp={<Bell />} />
        </div>
        <div className='top-profile-box'>
          <ProfilePic />
          <span className='top-profile-status active'></span>
        </div>
      </div>
    </div>
  )
}
