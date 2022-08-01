import { Link } from 'react-router-dom';
import playIcon from '../assets/svgs/play-icon.svg';
import graph from '../assets/svgs/graph.svg';

export default function MatchCard({match, type}) {
  match = Array.isArray(match) ? match[0] : match;
  return (
    <div className="match-card group">
      <div className="match-card-top bg-[#147] rounded-[12px] h-[100px] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[40%] after:content-[''] after:bg-gradient-to-b after:from-[#00000000] after:to-[#000000] flex justify-center items-end" >
        <img className="h-full absolute w-auto mx-auto" src={match.league.image_path} alt="league logo" />
        <p className="mb-[26px] z-[99] text-white text-center uppercase text-[10px] leading-[1.6] tracking-[1.4px] text-ellipsis w-[90%] whitespace-nowrap">{match.round+" "+match.league.name}</p>
      </div>
      <div className="match-card-btn-wrap absolute z-[99] w-full flex items-center -translate-x-1/2 -translate-y-1/2 top-[100px] left-1/2 h-max">
        <Link className="mx-auto" to={`/score/${match.stage_id}/${match.id}`}>
          <button className={`match-card-btn h-[32px] leading-[17px] shadow-[0_2px_6px_0px_rgba(0,_0,_0,_0.15)] mx-auto w-max px-[12px] uppercase  tracking-[1.4px] pb-[6px] pt-[4px] score-btn  rounded-full flex items-center justify-center ${type !== "live-match" ? "bg-white text-theme-secondary" : 'bg-theme-secondary text-white'}`}>
          {type === "live-match" ?
            <>
              <img className='play-icon card-btn-icon' src={playIcon} alt='play' />
              <span className="card-btn-txt" >Watch Live</span>
            </>
            : 
            type === "finished-match" ?
            <span className="card-btn-txt" >Score Card</span>
            :
            <span className="card-btn-txt" >Preview</span>
            }
          </button>
        </Link>
      </div>
      <div className="match-card-details relative bg-white border-t-0 pb-[8px] border border-[#e6e6e6] pt-[22px] rounded-[0px_0px_12px_12px]">
        <div className="w-full">
          <div className="flex justify-around w-full  mt-[10px]">
            <div className="">
              <div className="flex items-center">
                <div className="flex flex-col justify-center items-center">
                  <div className="h-[32px] w-[32px]">
                    <img className="h-full w-full" src={match.localteam.image_path} alt="team logo" />
                  </div>
                  <label className="text-[10px] tracking-[1.4px]">{match.localteam.code}</label>
                </div>
                <div className='flex flex-col ml-[10px]'>
                  {/* {match?.map(m => ( m.runs[0] &&
                      <span className='text-[#666666] font-bold text-[12px]' >{m.runs[0].score+"/"+m.runs[0].wickets}</span>
                  ))} */}
                  <span className='text-[#666666] font-bold text-[14px] ' >{match.runs[0].score+"/"+match.runs[0].wickets}</span>
                  <span className='text-[#666666] font-normal text-[12px] ' >{match.runs[0].overs} overs</span>
                </div>
              </div>
            </div>
            <div className="flex relative justify-center items-center">
              <div className="bg-[#dcdcdc] w-[1px] h-[40px] "></div>
              <label className="text-[10px] absolute block leading-[16px] text-center text-white bg-[#dcdcdc] h-[16px] w-[16px] rounded-full">V</label>
            </div>
            <div className="">
              <div className="flex items-center">
                <div className='flex flex-col mr-[10px]'>
                  {/* {match?.map(m => ( m.runs[1] &&
                      <span className='text-[#666666] font-bold text-[12px] ' >{m.runs[1].score+"/"+m.runs[1].wickets}</span>
                  ))} */}
                  <span className='text-[#666666] text-right font-bold text-[14px] ' >{match.runs[1].score+"/"+match.runs[1].wickets}</span>
                  <span className='text-[#666666] text-right font-normal text-[12px] ' >{match.runs[1].overs} overs</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="h-[32px] w-[32px]">
                    <img  className="h-full w-full" src={match.visitorteam.image_path}  alt="team logo" />
                  </div>
                  <label className="text-[10px] tracking-[1.4px]">{match.visitorteam.code}</label>
                </div>
              </div>
            </div>
          </div>
          {/* {match?.map(m => ( m.note && 
            <div className="text-[12px] leading-[1.33] tracking-[0.24px] text-center">{m.note}</div>
          ))} */}
          <div className="text-[12px] max-w-[80%] overflow-hidden whitespace-nowrap text-ellipsis leading-[1.33] tracking-[0.24px] mx-auto text-center">{match.note}</div>
        </div>
      </div>
      <div className={`h-auto px-[12px] items-center pb-[8px] pt-[18px] mt-[-10px] w-full invisible group-hover:visible flex bg-[#f0f1f4] rounded-b-[12px] ${type !== 'live-match' ? 'justify-center' : 'justify-between'}`} >
      {type === 'live-match' &&
        <div className="flex items-center">
          <div className="flex items-center cursor-pointer justify-center w-[16px] h-[16px] mr-[8px]" >
            {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff9666" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 5c.77 0 1.4.63 1.4 1.4v11.2c0 .77-.63 1.4-1.4 1.4-.77 0-1.4-.63-1.4-1.4V6.4c0-.77.63-1.4 1.4-1.4zM6.4 9.2h.2c.77 0 1.4.63 1.4 1.4v7c0 .77-.63 1.4-1.4 1.4h-.2c-.77 0-1.4-.63-1.4-1.4v-7c0-.77.63-1.4 1.4-1.4zM19 14.4c0-.77-.63-1.4-1.4-1.4-.77 0-1.4.63-1.4 1.4v3.2c0 .77.63 1.4 1.4 1.4.77 0 1.4-.63 1.4-1.4v-3.2z" fill="#ff9666"></path></svg> */}
            <img src={graph} alt="graph" />
          </div>
          <p className="text-[11px] cursor-pointer text-[#141414]" >Points</p>
          {/* <div className="flex items-center cursor-pointer justify-center w-[11px] h-[11px] ml-[8px] rounded-full bg-[#ff9666]" > */}
        </div>
      }
        <div className="flex items-center">
          <p className="text-[11px] cursor-pointer leading-[12px] text-[#141414]" >More Cricket</p>
          <div className="flex items-center cursor-pointer justify-center w-[11px] h-[11px] ml-[8px] rounded-full bg-[#ff9666]" >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.71a.996.996 0 000 1.41L13.88 12 10 15.88a.996.996 0 101.41 1.41L16 12.7a.996.996 0 000-1.41L11.41 6.7c-.38-.38-1.02-.38-1.41.01z" fill="#fff"></path></svg>
          </div>
        </div>
      </div>
    </div>
  )
}
