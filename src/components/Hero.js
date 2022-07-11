import React from 'react'
import { img_path, hero_img_size } from './Config';
import { Play, Imdb, Download } from './Images';

export default function Hero( {header_data} ) {
  return (
    <div className='hero-wrapper'>
        <div className='header-movie-details-box'>
          <div className='header-movie-logo'>
            {header_data.logo ?
              <img src={img_path+'500'+header_data.logo} alt="img2" />
              :
              <h1>{header_data.title}</h1>
            }
          </div>
          <div className="header-movie-overview">
            <p className='movie-overview' >{ header_data.overview }</p>
          </div>
          <div className="header-movie-genres">
            <label>Genres</label>
            <p className='movie-genres' >{ header_data.genres?.map((genres) => genres.name).join(', ') }</p>
          </div>
          <div className='header-btn-box'>
            <button className='header-btn watch-btn'>
              <span>Watch</span>
              <Play />
            </button>
            <button className='header-btn my-list-btn'>
              <span>My List</span>
              <span className='plus-sign' >+</span>
            </button>
            {header_data.videos && 
              <button className='blank-btn download-btn'><Download /></button>
            }
          </div>
          <div className='header-details-box'>
            <div className='rating-box'>
              <Imdb />
              {/* <img scr="images/svgs/imdb.svg" alt="imdb" /> */}
              <p>{header_data.vote_average}</p>
            </div>
            {/* <span className='rated-box'> U/A </span>
            <span className='res-box'> 4K </span> */}
            <p className='movie-release-date' >{ String(header_data.release_year) }</p>
          </div>
        </div>
      </div>
  )
}
