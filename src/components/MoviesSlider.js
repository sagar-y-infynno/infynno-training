import React, { useState, useEffect } from 'react';
import { ArrowDown } from './Images';
import Slider  from 'react-slick';
import { api_base_url, api_key } from './Config';
import MovieCard from './MovieCard';
import axios from 'axios';
import ISO6391 from 'iso-639-1';

export default function MustWatch({options}) {  
  const [must_watch, setMustWatch] = useState([]);
  const [languages, setLanguages] = useState({
    'Hindi' :'active' , 
    'Bengali': '', 
    'Marathi': '', 
    'Assamese': '', 
    'Telugu': '', 
    'Tamil': 'active', 
    'Malayalam': '' 
  });
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
      let language = Object.entries(languages).map((lan) => {
        return  lan[1] === 'active' ? ISO6391.getCode(lan[0]) : false;
      }).filter((ls) => ls !== false) ;
      let res = await axios.get(`${api_base_url}${options.api_type}${api_key}&language=${language.join(',')}&region=IN&page=1`);
      setMustWatch(res.data.results.map((result) => ({...result, like: true})));
    })();
  }, [options.api_type, languages]);

  const changLanguage = e => {
    let temp_languages = {};
    if(languages[e.target.innerHTML] !== 'active'){
      temp_languages = {...languages, [e.target.innerHTML]: 'active'}; 
    }else {
      temp_languages = {...languages, [e.target.innerHTML]: ''}; 
    }
    setLanguages(temp_languages);
  }

  if(must_watch.length === 0) return <p>loading...</p>

  return (
    <>
      <div className={`must-watch-grid-box ${options.block}`}>
        <div className='grid-header' >
          <p>{options.title}</p>
          {options.block === "must_watch" && 
            <div className="select-filter" >
              <select className='temp-filter-btn' >
                <option defaultValue="asdf" value="">FILTERS</option>
              </select>
              <ArrowDown />
            </div>
          }
        </div>
        {options.block === "recommended" && 
          <div className="slider-bts-box" >
            {Object.keys(languages).map((lang) => 
              <button key={lang} onClick={changLanguage} className={`lang-btn ${languages[lang]}`}>{lang}</button>
            )}
          </div>
        }
        <div className='must-watch-movie-grid'>
          <Slider {...settings}>
          { must_watch.map((movie, id) => {
              if(movie.poster_path){
                return(
                  <MovieCard key={id} movie_data={movie} />
                );
              }
            })
          }
          </Slider>
        </div>
      </div>
    </>
  )
}
