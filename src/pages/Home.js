import React from 'react';
import MatchSlider from '../components/MatchSlider';
import { useSelector } from 'react-redux';
// import { selectMatches } from '../reducers/machesSlice'; // ----working...
import loader from '../assets/svgs/loader.svg';

export default function Home() {

  // const allMatches = useSelector(selectMatches); // ----working...
  const allMatches = useSelector(state => state.matches);

  if(allMatches.isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="h-full w-full max-w-[150px]">
          <img className="h-full w-full" src={loader} alt="loader" />
        </div>
      </div>
    )
  }

  return (
    <>
      {allMatches.live.length > 0 && 
        <MatchSlider matches={allMatches.live} sliderTitle="Live Matches" showDots={true} sliderType="live-match" />
      }
      {allMatches.finished.length > 0 && 
        <MatchSlider matches={allMatches.finished} sliderTitle="Finished Matches" sliderType="finished-match" showDots={false} />
      }
      {allMatches.upcoming.length > 0 && 
        <MatchSlider matches={allMatches.upcoming} sliderTitle="Upcoming Matches" sliderType="upcoming-match" showDots={false} />
      }
    </>
  )
}
