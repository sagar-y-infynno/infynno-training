import React from 'react';
import Slider from "react-slick";
import MatchCard from './MatchCard';

export default function MatchSlider({matches, sliderType, sliderTitle, showDots}) {
  const settings = {
    dots: showDots,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: showDots
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className={`match-slider-container mb-[20px] ${sliderType}`}>
      { sliderType  === "live-match" ?
        <div className="match-grid-header pt-[20px] pb-[16px] bg-theme-main w-screen">
            <h2 className="text-white font-bold w-full max-w-[1024px] mx-auto leading-[1.6] tracking-[0.2px] text-[20px]">{sliderTitle}</h2>
        </div>
        :
        <div className="match-grid-header pb-[16px] w-screen">
            <h2 className="text-theme-main font-bold w-full max-w-[1024px] mx-auto leading-[1.6] tracking-[0.2px] text-[20px]">{sliderTitle}</h2>
        </div>
      }
      <div className={`live-matches-wrap relative w-screen mx-auto ${ sliderType === "live-match" &&
        "before:content-[''] before:h-[100px] before:w-full before:absolute before:top-0 before:bg-theme-main"} `}> 
        <div className="relative mx-[auto] match-grid max-w-[1024px] w-screen">
          <Slider {...settings}>
            {matches.map((match) => {
              return (
                <MatchCard key={match.id} match={match} type={sliderType}/>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}
