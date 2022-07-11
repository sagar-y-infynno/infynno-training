import React, { useState, useEffect } from 'react';
import { ArrowDown } from './Images';
import Slider  from 'react-slick';
import { api_base_url, api_key } from './Config';
import MovieCard from './MovieCard';
import axios from 'axios';

export default function MustWatch() {  
  const [must_watch, setMustWatch] = useState([]);

  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
  };

  useEffect(() => {
    (async () => {
      let res = await axios.get(api_base_url+'upcoming'+api_key);
      setMustWatch(res.data.results);
    })();
  }, []);

  if(must_watch.length === 0) return <p>loading...</p>

  return (
    <>
      <div className='must-watch-grid-box'>
        <div className='grid-header' >
          <p>MOVIES YOU MUST WATCH</p>
          <div className="select-filter" >
            <select className='temp-filter-btn' >
              <option defaultValue="asdf" value="">FILTERS</option>
            </select>
            <ArrowDown />
          </div>
        </div>
        <div className='must-watch-movie-grid'>
          <Slider {...settings}>
          { must_watch.map((movie, id) => {
              return(
                <MovieCard key={id} movie={movie} />
              );
            })
          }
          </Slider>
        </div>
      </div>
    </>
  )
}
