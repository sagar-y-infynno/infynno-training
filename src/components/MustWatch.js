import React from 'react';
import { img_path } from './Config';
import { Arrow_down } from './Images';

export default function MustWatch({must_watch}) {
  // console.log(must_watch);
  const images_collection = must_watch.map((movie) =>  ({'url': img_path+'185'+movie.poster_path}));
  console.log(must_watch);
  return (
    <>
      <div className='must-watch-grid-box'>
        <div className='grid-header' >
          <p>MOVIES YOU MUST WATCH</p>
          {/* <button className='temp-filter-btn' >FILTERS</button> */}
          <div className="select-filter" >
            <select className='temp-filter-btn' >
              <option defaultValue="asdf" value="">FILTERS</option>
            </select>
            <Arrow_down />
          </div>
        </div>
        <div className='must-watch-grid'>
        { must_watch.map((movie, id) => {
            return(
              <div key={id} className="movie_card">
                <div className='movie-grid-item' >
                  <div className='movie-item-poster' >
                  <img src={img_path+'185'+movie.poster_path} alt="movie thumb" />
                  </div>
                  <div className='movie-item-details' >
                    <p className='movie-item-title' >{movie.title}</p>
                    <span className='movie-item-year'>{ new Date(movie.release_date).getFullYear() }</span>
                  </div>
                </div>    
              </div>
            );
          })
        }
        </div>
      </div>
    </>
  )
}
