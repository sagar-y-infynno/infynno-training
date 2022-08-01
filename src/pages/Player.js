import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPlayer, fetchPlayer, clearPlayer } from '../reducers/playerSlice';
import playerIcon from '../assets/svgs/player-icon.svg';
import BackArrow from '../assets/svgs/back-arrow.svg';
import cake from '../assets/svgs/birthday-icon.svg';
import avatar from '../assets/svgs/player-icon.svg';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/svgs/loader.svg';

export default function Player() {
  const [openTab, setOpenTab] = useState(1);
  const [careerType, setCareerType] = useState(1);
  const [performance, setPerformance] = useState('Batting');
  const { player_id } = useParams();
  const dispatch = useDispatch();
  const player_data = useSelector(selectPlayer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPlayer(player_id));  
    console.log({player_data});
    return(() => {
      dispatch(clearPlayer());
    })
  }, [player_id]);

  if(!player_data || player_data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="h-full w-full max-w-[150px]">
          <img className="h-full w-full" src={loader} alt="loader" />
        </div>
      </div>
    )
  }

  const setPill = (e) => {
    console.log(e.target.id);
    setCareerType(e.target.id);
  }

  const handlePerformance = (e) => {
    console.log(e.target.value);
    setPerformance(e.target.value);
  }

  return (
    <div className="player-container" >
      {/* =================== temp =================== */}
      {/* <pre>{JSON.stringify(player_data, null, 2)}</pre> */}
      {/* <img src={playerIcon} alt="player" /> */}
      {/* =================== temp =================== */}
      <div className="player-header" >
        <div className="back-nav-box" >
          <span className="back-arrow-box" onClick={() => {navigate(-1)}} >
            <img className='back-arrow' src={BackArrow} alt="back" />
          </span>
        </div>
        <div className="player-details-container" >
          <div className="player-image-box" >
            <img className="player-image" src={player_data.image_path} alt="player profile" />
          </div>
          <div className="player-details-box" >
            <p className="player-name">{player_data.fullname}</p>
            <div className="player-info-box" >
              <div className="player-role-box" >
                <span className="info-icon-box">
                  <img className='info-icon player-avatar' src={avatar} alt="player icon" />
                </span>
                <p className='player-role'>{player_data.position.name}</p>
              </div>
              <div className="player-dob-box" >
                <span className="info-icon-box">
                  <img className='info-icon dob-cake' src={cake} alt="cake icon" />
                </span>
                <p className='player-dob'>{moment(player_data.dateofbirth).format("MMMM D, YYYY")}{`(Age ${moment.duration(moment().diff(moment(player_data.dateofbirth), 'milliseconds')).years()})`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="player-profile" >
        {/*  */}
        <div className="player-profile-tabs">
          <ul className="tabs-header " >
            <li className="tab-li">
              <p 
                className={`tab-p ${openTab === 1 && 'active' }`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
              >
                Bio
              </p>
            </li>
            <li className="tab-li">
              <p
                className={`tab-p ${openTab === 2 && 'active' }`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
              >
                Career
              </p>
            </li>
            <span className={`active-indicator ${openTab === 1 ? 'left-0' : 'left-1/2'} `} ></span>
          </ul>
          <div className="tabs-blocks">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} >
                <div className="tab-box teams-container">
                  <p className='tab-content-title'>Teams</p>
                  <p className="teams-list">{player_data.teams.map((t) => t.name).filter((n, i, all) => all.indexOf(n) === i).join(', ')}</p>
                </div>
                <div className="tab-box recent-matches-container">
                  <p className='tab-content-title'>Recent Matches</p>
                  <div className="recent-matches-container" >
                    <div className="capsule-header">
                      <p className='capsule-title capsule-title-main'>Matches</p>
                      <p className='capsule-title'>Bat</p>
                      <p className='capsule-title'>Bowl</p>
                      <p className='capsule-title'>Format</p>
                    </div>
                    <div className="tbl-row">
                      <div className='tbl-cell tbl-cell-main'>
                        <p className='teams-box'>WI vs IND</p>
                        <span className='match-date'>27/07/22</span>
                      </div>
                      <p className='tbl-cell'>22(33)</p>
                      <p className='tbl-cell'>-</p>
                      <p className='tbl-cell'>ODI</p>
                    </div>
                  </div>
                </div>
                <div className="tab-box profile-container">
                  <p className='tab-content-title'>Profile</p>
                  <p>Class apart cricketer and a highly talented one too, Shai Hope started his cricketing journey with the traditional format of the game when he made his first-class debut in the year 2013. But he only came into the reckoning after a remarkable 2014-15 season where he was the fourth highest run-getter with a double century to his name.</p>
                </div>
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} >
                <div className="career-content-tabs">
                  <p className="career-content-title">Statistics</p>
                  {player_data.career && 
                    <div className={`statistics-pills-wrap  w-max`}>
                      {player_data.career.map((career, id) => {
                        return <p key={id} className={`statistics-pill cursor-pointer w-[75px] ${Number(careerType) === Number(id) ? 'active' : ''}`} onClick={setPill} id={id} >{career.type}</p>
                      })}
                    </div>
                  }
                </div>

                <div className="tab-box performance-container">
                  <div className='tab-content-title-light'>
                    <span >Performance</span>
                    <div className="overflow-hidden rounded-[4px] border-[1px] border-t-[#ccd0d9] border-b-[#0000001f] border-x-[#ccd0d9]" >
                      <select value={performance} onChange={handlePerformance} className="performance-selector leading-[1.33] text-[12px] cursor-pointer text-theme-main tarcking-[0.36px] font-[600] p-[8px_8px_8px_4px]" defaultValue="Batting">
                        <option value="Batting" >Batting</option>
                        <option value="Bowling" >Bowling</option>
                        <option value="Fielding" >Fielding</option>
                      </select>
                    </div>
                  </div>
                  {/* batting */}
                  {performance === "Batting" && 
                  <div className="performance-grid" >
                    <div className="performance-block" >
                      <p className="performance-block-title">Matches</p>
                      <span className="performance-block-data">{player_data.career[careerType].batting.matches}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Innings</p>
                      <span className="performance-block-data">{player_data.career[careerType].batting.innings}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Runs</p>
                      <span className="performance-block-data">{player_data.career[careerType].batting.runs_scored}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Balls Faced</p>
                      <span className="performance-block-data">{player_data.career[careerType].batting.balls_faced}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Average</p>
                      <span className="performance-block-data">{(player_data.career[careerType].batting.average).toFixed(2)}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Strike Rate</p>
                      <span className="performance-block-data">{(player_data.career[careerType].batting.strike_rate).toFixed(2)}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Not Outs</p>
                      <span className="performance-block-data">{player_data.career[careerType].batting.not_outs}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">100s</p>
                      <span className="performance-block-data">{player_data.career[careerType].batting.hundreds}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">200s</p>
                      <span className="performance-block-data">0</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">300s</p>
                      <span className="performance-block-data">0</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">50s</p>
                      <span className="performance-block-data">{player_data.career[careerType].batting.fifties}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">6s</p>
                      <span className="performance-block-data">{player_data.career[careerType].batting.six_x}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">4s</p>
                      <span className="performance-block-data">{player_data.career[careerType].batting.four_x}</span>
                    </div>
                  </div>
                  }
                  {/* bowling */}
                  {performance === "Bowling" && 
                  <div className="performance-grid" >
                    <div className="performance-block" >
                      <p className="performance-block-title">Matches</p>
                      <span className="performance-block-data">{player_data.career[careerType].bowling.matches}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Innings</p>
                      <span className="performance-block-data">{player_data.career[careerType].bowling.innings}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Balls Bowled</p>
                      <span className="performance-block-data">{0}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Runs</p>
                      <span className="performance-block-data">{player_data.career[careerType].bowling.runs}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Overs</p>
                      <span className="performance-block-data">{player_data.career[careerType].bowling.overs}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Maidens</p>
                      <span className="performance-block-data">{player_data.career[careerType].bowling.medians}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Wickets</p>
                      <span className="performance-block-data">{player_data.career[careerType].bowling.wickets}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Economy</p>
                      <span className="performance-block-data">{(player_data.career[careerType].bowling.econ_rate).toFixed(2)}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Average</p>
                      <span className="performance-block-data">{(player_data.career[careerType].bowling.average).toFixed(2)}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Strike Rate</p>
                      <span className="performance-block-data">{(player_data.career[careerType].bowling.strike_rate).toFixed(2)}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">4 WKT</p>
                      <span className="performance-block-data">{player_data.career[careerType].bowling.four_wickets}</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">5 WKT</p>
                      <span className="performance-block-data">{player_data.career[careerType].bowling.five_wickets}</span>
                    </div>
                  </div>
                  }
                  {/* fielding */}
                  {performance === "Bowling" && 
                  <div className="performance-grid" >
                    <div className="performance-block" >
                      <p className="performance-block-title">Caches</p>
                      <span className="performance-block-data">0</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Stumpings</p>
                      <span className="performance-block-data">0</span>
                    </div>
                    <div className="performance-block" >
                      <p className="performance-block-title">Run outs</p>
                      <span className="performance-block-data">0</span>
                    </div>
                  </div>
}
                </div>

                <div className="tab-box recent-matches-container">
                  <p className='tab-content-title-light'>
                    <span >Recent {"ODI"} Matches</span>
                  </p>
                  <div className="recent-matches-container" >
                    <div className="capsule-header">
                      <p className='capsule-title capsule-title-main'>Against</p>
                      <p className='capsule-title'>Bat</p>
                      <p className='capsule-title'>Bowl</p>
                      <p className='capsule-title'>Format</p>
                    </div>
                    <div className="tbl-row career">
                      <div className='tbl-cell tbl-cell-main'>
                        <p className='teams-box font-bold text-[14px]'>WI</p>
                      </div>
                      <p className='tbl-cell'>22(33)</p>
                      <p className='tbl-cell'>-</p>
                      <p className='tbl-cell'>ODI</p>
                    </div>
                    <div className="tbl-row career">
                      <div className='tbl-cell tbl-cell-main'>
                        <p className='teams-box font-bold text-[14px]'>WI</p>
                      </div>
                      <p className='tbl-cell'>22(33)</p>
                      <p className='tbl-cell'>-</p>
                      <p className='tbl-cell'>ODI</p>
                    </div>
                    <div className="tbl-row career">
                      <div className='tbl-cell tbl-cell-main'>
                        <p className='teams-box font-bold text-[14px]'>WI</p>
                      </div>
                      <p className='tbl-cell'>22(33)</p>
                      <p className='tbl-cell'>-</p>
                      <p className='tbl-cell'>ODI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  )
}
