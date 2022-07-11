import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api_base_url, api_key, img_path, hero_img_size } from './Config';
import Hero from './Hero';
import MoviesSlider from './MoviesSlider';
import Footer from './Footer';
import TopNav from './TopNav';
import SideBox from './SideBox';
import { useParams } from 'react-router-dom';

export default function Home() {
  const [header_data, setHeaderData] = useState({});
  const [must_watch, setMustWatch] = useState([]);
  const [loader, setLoader] = useState(false);
  const { movie_id } = useParams();
  const [language , setLanguage] = useState('en');

  useEffect(() => {
    (async () => {
      setLoader(true);
      let res = await axios.get(api_base_url+'upcoming'+api_key);
      setMustWatch(res.data.results);
      res = res.data.results[1];
      const m_id = movie_id ? movie_id : res.id;
      let api_url = api_base_url+m_id+api_key;

      if(movie_id) {
        api_url += '&append_to_response=images,credits,videos,recommendations&language='+language;
      }else {
        api_url += '&append_to_response=images&language='+language;
      }
      const m_res = await axios.get(api_url);
      
      setHeaderData({...m_res.data, 
        backdrop_path : m_res.data.backdrop_path,
        logo : m_res.data.images.logos.length > 0 ?  m_res.data.images.logos[0].file_path : '' ,
        genres : m_res.data.genres,
        release_year : new Date(res.release_date).getFullYear()
      });
      setLoader(false);
    })();
  }, [movie_id]);

  if(loader) {
    return <p>Loading....</p>;
  }

  return (
    <>
      {/* <header>
        <TopNav />
        <SideBox />
        {header_data.backdrop_path &&
          <div className="hero-banner-box">
            <img src={img_path+hero_img_size+header_data.backdrop_path} alt="img" />
          </div>
        }
        <Hero header_data={header_data} />
        {!movie_id && 
          <>
            <MoviesSlider options={{api_type: "top_rated", title: "MOVIES YOU MUST WATCH", block: 'must_watch'}} />
            <MoviesSlider options={{api_type: "upcoming", title: "RECOMMENDED FOR YOU", block: 'recommended'}} />
            <MoviesSlider options={{api_type: "popular", title: "BOLLYWOOD CLASSICS", block: 'classic'}} />
          </>
        } 
      </header> */}
      
      <Footer />
    </>
  )
}
