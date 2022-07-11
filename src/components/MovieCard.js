import React, { useState } from 'react';
import { img_path } from './Config';
import { Imdb,  Eye, Heart, RedHeart } from './Images';
import { Link } from 'react-router-dom';

export default function MovieCard({movie_data}) {
  const [movie, setMovie] = useState({...movie_data});
  return (
    <div className="movie_card">
      <div className='movie-grid-item' >
        <Link to={`/watch/${movie.id}`}> 
          <div className='movie-item-poster' >
          <img src={img_path+'185'+movie.poster_path} alt="movie thumb" />
          </div>
        </Link>
        <div className='movie-item-details' >
        <Link to={`/watch/${movie.id}`}> <p className='movie-item-title' >{movie.title}</p></Link>
          <span className='movie-item-year'>{ new Date(movie.release_date).getFullYear() }</span>
          <div className='movie-icons-box'>
            <div className='rating-box'>
              <Imdb />
              <p>{movie.vote_average}</p>
            </div>
            <div className='card-bottom-icons'>
              <button className='blank-btn'><Eye /></button>
              <button onClick={() => { 
                setMovie({...movie, like: movie.like ? false : true }) 
                }} className='blank-btn'>{movie.like ? <RedHeart/> : <Heart />}</button>
            </div>
          </div>  
        </div>
      </div>    
    </div>
  )
}
