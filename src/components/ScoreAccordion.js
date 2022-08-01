import React, { useEffect, useState } from "react";
import roundArrow from '../assets/svgs/round-arrow.svg';
import axios from 'axios';
import { Link } from "react-router-dom";
import loader from '../assets/svgs/loader.svg';

export default function ScoreAccordion({match, fix_id}) {
  const [isOpen, setOpen] = useState(false);
  const [match_data, setMatchData] = useState([]);

  
  useEffect(() => {
    setMatchData(match);
  }, [match, fix_id]);
  
  if(match_data.length === 0) {
    return (<div className="flex justify-center items-center">
    <div className="h-full w-full max-w-[50px]">
      <img className="h-full w-full" src={loader} alt="loader" />
    </div>
  </div>);
  }

  return (
    <div className={`accordion ${!isOpen && "sticky bottom-0" } `}>
      <div className="accordion-header border-t-0 border-collapse border-y border-y-light-border p-[12px_18px] bg-[#fafafa] flex justify-between">
        <div className="flex items-center gap-[10px]">
          <p className="text-[16px] leading-[1.25px] font-bold text-black tracking-[0.5px]">
            {match_data.team_code}
          </p>
          <p className="text-[12px] leading-[1.33] tracking-[0.4px] text-black ">
            {/* Inning 1 */}
            Inning {match_data.runs.inning}
          </p>
        </div>
        <div className="flex gap-[30px]">
          <p className="text-[14px] tracking-[0.25px] font-bold text-black">
            {match_data.totals ? match_data.totals.total+"/"+match_data.totals.wickets : "00/00"}
          </p>
          <div
            onClick={() => {
              setOpen(!isOpen);
            }}
            className="h-[24px] w-[24px] cursor-pointer rounded-full bg-[#ffb999]"
          >
            <img
              className={`transition-all duration-[1s] ${isOpen ? "rotate-180" : "rotate-0"}`}
              src={roundArrow}
              alt="round arrow"
            />
          </div>
        </div>
      </div>
      <div
        className={`accordion-content transition-all duration-[1s] h-max overflow-hidden ${
          isOpen ? "max-h-[2000px]" : "max-h-0"
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
          {match_data &&
            match_data.batting.map((batting, id) => {
              return (
                <div key={id} className="p-[10px] w-full flex justify-center box-border text-[#66718c] mt-0 border-b-none rounded-[2px] items-start">
                  <div className="flex-1">
                    <Link to={`/player/${batting.player_id}`} >
                    <p className={`leading-[1.33] text-[14px] cursor-pointer text-blue-highlight tracking-[0.4px] ${!batting.bowler && !batting.catchstump ? 'font-bold' : 'font-normal'} `}>
                      {batting.batsman.fullname}
                      {batting.batsman.fullname === match_data.captain.fullname && " (c)"}
                      {batting.batsman.fullname === match_data.wicketkeeper.fullname && " (wk)"}
                      {/* {!batting.bowler && " *"} */}
                    </p>
                    </Link>
                    { !batting.bowler && !batting.catchstump ? 
                      <p className="pt-[5px] text-[#ff5000] leading-[1.27] tracking-[0.3px] text-[11px]"> not out </p>
                    :
                      <p className="pt-[5px] text-[#787878] leading-[1.27] tracking-[0.3px] text-[11px]"> {batting.catchstump ? "c "+ batting.catchstump.firstname[0]+" "+batting?.catchstump.lastname : ""} {batting.bowler ? "b "+ batting.bowler.firstname[0]+" "+batting?.bowler.lastname : ""} </p>
                    }
                  </div>
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
          <div className="p-[10px] w-full flex justify-center box-border text-[#66718c] mt-0 border-b-none rounded-[2px] items-center">
            <p className="font-bold flex-1 text-[14px] text-[#141414] tracking-[0.25px]">
              Extras
            </p>
            {match_data.extras ? <>
              <p className="font-bold text-[14px] mr-[5px] text-[#141414]  tracking-[0.25px]">
                {match_data.extras.bye+match_data.extras.leg_bye+match_data.extras.noball_balls+match_data.extras.wide+match_data.extras.penalty}
              </p>
              <p className="font-normal text-[12px] text-[#787878] leading-[1.33] tracking-[0.4px]">
                (b {match_data.extras.bye}, 
                lb {match_data.extras.leg_bye}, 
                nb {match_data.extras.noball_balls}, 
                w {match_data.extras.wide}, 
                p {match_data.extras.penalty})
              </p>
            </>
            :
            <p className="font-normal text-[12px] text-[#787878] leading-[1.33] tracking-[0.4px]">
              0 (0, 0, 0, 0, 0)
            </p>
            }
          </div>
          {match_data.did_not_bat && 
            <div className="p-[10px] w-full flex justify-center box-border text-[#66718c] mt-0 border-b-none rounded-[2px] items-center">
              <p className="font-bold flex-1 text-[14px] whitespace-nowrap w-full pr-[30px] text-[#141414] tracking-[0.25px]">
                Did Not Bat
              </p>
              {match_data.extras ? <>
                <p className="font-normal text-[12px] text-[#787878] leading-[1.33] tracking-[0.4px]">
                  {match_data.did_not_bat}
                </p>
              </>
              :
              <p className="font-normal text-[12px] text-[#787878] leading-[1.33] tracking-[0.4px]">
                0 (0, 0, 0, 0, 0)
              </p>
              }
            </div>
          }
          <div className="p-[10px] w-full flex justify-center box-border text-[#66718c] mt-0 border-b-none rounded-[2px] items-center">
            <p className="font-bold flex-1 text-[18px] leading-[1.25] text-[#141414] tracking-[0.5px]">
              Total Score
            </p>
            <p className="font-bold text-[18px] text-[#141414]  leading-[1.25] tracking-[0.5px]">
              {match_data.totals ? match_data.totals.total+"/"+match_data.totals.wickets : "00/00"}
            </p>
            <p className="font-normal ml-[5px] text-[14px] text-[#787878] tracking-[0.25px]">
              ({match_data?.totals?.overs} overs)
            </p>
          </div>
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
          {match_data &&
            match_data.bowling.map((bowling, id) => {
              return (
                <div key={id} className="p-[10px] w-full flex justify-center box-border text-[#66718c] mt-0 border-b-none rounded-[2px] items-center">
                  <Link to={`/player/${bowling.player_id}`} className="leading-[1.33] font-normal text-[14px] cursor-pointer flex-1 text-blue-highlight tracking-[0.4px]" >
                    {/* <p className="leading-[1.33] font-normal text-[14px] cursor-pointer flex-1 text-blue-highlight tracking-[0.4px]"> */}
                      {bowling.bowler.fullname}
                    {/* </p> */}
                  </Link>
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
            {match_data.batting.map((fow, id) => {  
              if(fow.fow_balls !== 0) {
                return (
                  <div key={id} className="p-[10px] w-full flex justify-center box-border text-[#66718c] mt-0 border-b-none rounded-[2px] items-center">
                    <Link to={`/player/${fow.player_id}`} className="leading-[1.33] font-normal text-[14px] cursor-pointer flex-1 text-blue-highlight tracking-[0.4px]" >
                      {/* <p className="leading-[1.33] font-normal text-[14px] cursor-pointer flex-1 text-blue-highlight tracking-[0.4px]"> */}
                        {fow.batsman.fullname}
                      {/* </p> */}
                    </Link>
                    <p className="text-[#787878] font-normal min-w-[100px] text-[13px] leading-[1.2] tracking-[1.5px]">
                      {fow.fow_score}
                    </p>
                    <p className="text-[#787878] font-normal min-w-[100px] text-[13px] leading-[1.2] tracking-[1.5px]">
                      {fow.fow_balls}
                    </p>
                  </div>
                )
              }
            })}
        </div>
        {/* fow data .... */}
      </div>
    </div>
  );
}
