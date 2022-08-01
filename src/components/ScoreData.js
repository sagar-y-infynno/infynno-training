import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ScoreAccordion from './ScoreAccordion';
import roundArrow from '../assets/svgs/round-arrow.svg';

export default function ScoreData({ stage_id }) {
  const [match_data, setMatchData ] = useState([]);
  const [accordion_id, openAccordion] = useState(0);
  
  useEffect(() => {
    (async () => {
      const url = encodeURIComponent(`https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=pCKbJYBnFQkyAqEEfEgQAGkFDCHYjeV7PwTpvC6qtCN9wa6mp3aJ512MJjYh&include=balls,odds,localteam,visitorteam,bowling.team,batting.team,runs.team,bowling.bowler,batting.batsman,scoreboards&filter[stage_id]=${stage_id}`);
      const res = await axios.get(`https://api.allorigins.win/raw?url=${url}`);

      // const url2 = encodeURIComponent(`https://cricket.sportmonks.com/api/v2.0/fixtures/${fix_id}?api_token=pCKbJYBnFQkyAqEEfEgQAGkFDCHYjeV7PwTpvC6qtCN9wa6mp3aJ512MJjYh&include=balls,odds,localteam,visitorteam,bowling.team,batting.team,runs.team,bowling.bowler,batting.batsman,scoreboards,lineup`);
      // const ress = await axios.get(`https://api.allorigins.win/raw?url=${url2}`);
      // console.log({ress});

      setMatchData([...res.data.data.map(match => (
        {
          team_id: match.localteam_id,
          team_code: match.localteam.code,
          team_name: match.localteam.name,
          batting: match.batting.filter(batting => batting.team_id === match.localteam_id),
          bowling: match.bowling.filter(bowling => bowling.team_id === match.localteam_id),
          extras: match.scoreboards.filter(scoreboard => scoreboard.team_id === match.localteam_id && scoreboard.type === "extra")[0],
          totals: match.scoreboards.filter(scoreboard => scoreboard.team_id === match.localteam_id && scoreboard.type === "total")[0],
          runs: match.runs.filter(run => run.team_id === match.localteam_id)[0]
        }
      )), ...res.data.data.map(match => (
        {
          team_id: match.visitorteam_id,
          team_code: match.visitorteam.code,
          team_name: match.visitorteam.name,
          batting: match.batting.filter(batting => batting.team_id === match.visitorteam_id) ,
          bowling: match.bowling.filter(bowling => bowling.team_id === match.visitorteam_id) ,
          extras: match.scoreboards.filter(scoreboard => scoreboard.team_id === match.visitorteam_id && scoreboard.type === "extra")[0],
          totals: match.scoreboards.filter(scoreboard => scoreboard.team_id === match.visitorteam_id && scoreboard.type === "total")[0],
          runs: match.runs.filter(run => run.team_id === match.localteam_id)[0]
        }
      ))]);
      
    })();
  },[accordion_id]);

  const setOpenAccordion = (e) => {
    console.log(e.target.id, 'set accordion ');
    openAccordion(e.target.id);
  }

  if(match_data.length === 0) {
    return <p>loading...</p>
  }

  console.log({match_data});

  return (
    <>
      {/* ----- */}
      <div className="accordion-container" >
        {match_data.splice(0, 2).map((match, id) => (
          <div className={`accordion {!isOpen && 'sticky bottom-0}`}> 
            <div className="accordion-header border-t-0 border-collapse border-y border-y-light-border p-[12px_18px] bg-[#fafafa] flex justify-between">
              <div className="flex items-center gap-[10px]">
                <p className="text-[16px] leading-[1.25px] font-bold text-black tracking-[0.5px]">
                  {match.team_code}
                </p>
                <p className="text-[12px] leading-[1.33] tracking-[0.4px] text-black ">
                  Inning 1
                  {/* {match.runs.inning} */}
                </p>
              </div>
              <div className="flex gap-[30px]">
                <p className="text-[14px] tracking-[0.25px] font-bold text-black">
                  {match.runs ? match.runs.score+"/"+match.runs.wickets : 0/0}
                </p>
                <div
                  onClick={setOpenAccordion}
                  className="h-[24px] w-[24px] cursor-pointer rounded-full bg-[#ffb999]"
                >
                  <img
                    id={id}
                    className={`transition-all duration-[1s] ${String(accordion_id) === String(id) ? "rotate-180" : "rotate-0"}`}
                    src={roundArrow}
                    alt="round arrow"
                  />
                </div>
              </div>
            </div>
            <div
              className={`accordion-content transition-all duration-[1s] h-max overflow-hidden ${
                String(accordion_id) === String(id) ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              {/* batting data .... */}
              <div className="w-[98%] mx-auto">
                <div className="p-[10px] w-full mx-auto flex justify-center items-center rounded-[10px] box-border text-[#66718c] bg-[#fafafa] mt-[20px]">
                  <p className="font-normal flex-1 text-[12px] leading-[1.2] text-[#787878] tracking-[1.5px]">
                    BATSMEN
                  </p>
                  <p className="font-bold min-w-[60px] text-[12px] text-[#787878]  leading-[1.2] tracking-[1.5px]">
                    R
                  </p>
                  <p className="font-normal min-w-[60px] text-[12px] text-[#787878] leading-[1.2] tracking-[1.5px]">
                    B
                  </p>
                  <p className="font-normal min-w-[60px] text-[12px] text-[#787878] leading-[1.2] tracking-[1.5px]">
                    4s
                  </p>
                  <p className="font-normal min-w-[60px] text-[12px] text-[#787878] leading-[1.2] tracking-[1.5px]">
                    6s
                  </p>
                  <p className="font-normal min-w-[60px] text-[12px] text-[#787878] leading-[1.2] tracking-[1.5px]">
                    S/R
                  </p>
                </div>
                {match &&
                  match?.batting?.map((batting, id) => {
                    return (
                      <div key={id} className="p-[10px] w-full flex justify-center box-border text-[#66718c] mt-0 border-b-none rounded-[2px] items-center">
                        <p className={`leading-[1.33] text-[14px] cursor-pointer flex-1 text-blue-highlight tracking-[0.4px] ${batting.active ? 'font-bold' : 'font-normal'} `}>
                          {batting.batsman.fullname}
                          {batting.active && "*"}
                        </p>
                        <p className="text-[#787878] font-bold min-w-[60px] text-[13px] leading-[1.2] tracking-[1.5px] ">
                          {batting.score}
                        </p>
                        <p className="text-[#787878] font-normal min-w-[60px] text-[13px] leading-[1.2] tracking-[1.5px]">
                          {batting.ball}
                        </p>
                        <p className="text-[#787878] font-normal min-w-[60px] text-[13px] leading-[1.2] tracking-[1.5px]">
                          {batting.four_x}
                        </p>
                        <p className="text-[#787878] font-normal min-w-[60px] text-[13px] leading-[1.2] tracking-[1.5px]">
                          {batting.six_x}
                        </p>
                        <p className="text-[#787878] font-normal min-w-[60px] text-[13px] leading-[1.2] tracking-[1.5px]">
                          {batting.rate}
                        </p>
                      </div>
                    );
                  })
                }
                {match.extras && 
                <div className="p-[10px] w-full flex justify-center box-border text-[#66718c] mt-0 border-b-none rounded-[2px] items-center">
                  <p className="font-bold flex-1 text-[14px] text-[#141414] tracking-[0.25px]">
                    Extras
                  </p>
                  <p className="font-bold text-[14px] mr-[5px] text-[#141414]  tracking-[0.25px]">
                  {match.extras.total}
                  </p>
                  <p className="font-normal text-[12px] text-[#787878] leading-[1.33] tracking-[0.4px]">
                    (b {match.extras.bye}, lb {match.extras.leg_bye}, nb {match.extras.noball_balls}, w {match.extras.wide}, p {match.extras.penalty})
                  </p>
                </div>
                }
                {match.totals && 
                <div className="p-[10px] w-full flex justify-center box-border text-[#66718c] mt-0 border-b-none rounded-[2px] items-center">
                  <p className="font-bold flex-1 text-[18px] leading-[1.25] text-[#141414] tracking-[0.5px]">
                    Total Score
                  </p>
                  <p className="font-bold text-[18px] text-[#141414]  leading-[1.25] tracking-[0.5px]">
                    {match.totals.total+"/"+match.totals.wickets}
                  </p>
                  <p className="font-normal ml-[5px] text-[14px] text-[#787878] tracking-[0.25px]">
                    ({match.totals.overs} overs)
                  </p>
                </div>
                }
              </div>
              {/* batting data .... */}
              {/* bowling data .... */}
              <div className="w-[98%] mx-auto">
                <div className="p-[10px] w-full mx-auto flex justify-center items-center rounded-[10px] box-border text-[#66718c] bg-[#fafafa] mt-[20px]">
                  <p className="font-normal flex-1 text-[12px] text-[#787878] leading-[1.2] tracking-[1.5px]">
                    BOWLER
                  </p>
                  <p className="font-normal min-w-[60px] text-[12px] leading-[1.2] tracking-[1.5px]">
                    O
                  </p>
                  <p className="font-normal min-w-[60px] text-[12px] leading-[1.2] tracking-[1.5px]">
                    M
                  </p>
                  <p className="font-normal min-w-[60px] text-[12px] leading-[1.2] tracking-[1.5px]">
                    R
                  </p>
                  <p className="font-normal min-w-[60px] text-[12px] leading-[1.2] tracking-[1.5px]">
                    W
                  </p>
                  <p className="font-normal min-w-[60px] text-[12px] leading-[1.2] tracking-[1.5px]">
                    ECO
                  </p>
                </div>
                {match.bowling &&
                  match.bowling.map((bowling, id) => {
                    return (
                      <div key={id}  className="p-[10px] w-full flex justify-center box-border text-[#66718c] mt-0 border-b-none rounded-[2px] items-center">
                        <p className="leading-[1.33] font-normal text-[14px] cursor-pointer flex-1 text-blue-highlight tracking-[0.4px]">
                          {bowling.bowler.fullname}
                        </p>
                        <p className="text-[#787878] font-normal min-w-[60px] text-[13px] leading-[1.2] tracking-[1.5px]">
                          {bowling.overs}
                        </p>
                        <p className="text-[#787878] font-normal min-w-[60px] text-[13px] leading-[1.2] tracking-[1.5px]">
                          {bowling.medians}
                        </p>
                        <p className="text-[#787878] font-normal min-w-[60px] text-[13px] leading-[1.2] tracking-[1.5px]">
                          {bowling.runs}
                        </p>
                        <p className="text-[#787878] font-bold min-w-[60px] text-[13px] leading-[1.2] tracking-[1.5px] ">
                          {bowling.wickets}
                        </p>
                        <p className="text-[#787878] font-normal min-w-[60px] text-[13px] leading-[1.2] tracking-[1.5px]">
                          {bowling.rate}
                        </p>
                      </div>
                    );
                  })}
              </div>
              {/* fow data .... */}
              <div className="w-[98%] mx-auto">
                <div className="p-[10px] w-full mx-auto flex justify-center items-center rounded-[10px] box-border text-[#66718c] bg-[#fafafa] mt-[20px]">
                  <p className="font-normal uppercase flex-1 text-[12px] text-[#787878] leading-[1.2] tracking-[1.5px]">
                    Fall of wickets
                  </p>
                  <p className="font-normal min-w-[100px] uppercase text-[12px] leading-[1.2] tracking-[1.5px]">
                    score
                  </p>
                  <p className="font-normal uppercase min-w-[100px] text-[12px] leading-[1.2] tracking-[1.5px]">
                    over
                  </p>
                </div>
              </div>
              {/* fow data .... */}
            </div>
          </div>
        ))}
      </div>    
      {/* ----- */}
    </>
  )
}
