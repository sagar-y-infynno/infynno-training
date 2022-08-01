import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const api_base = process.env.REACT_APP_API_BASE;
const api_token = process.env.REACT_APP_API_TOKEN;
const proxy_base = process.env.REACT_APP_PROXY_BASE;

const scoreSlice = createSlice({
  name: "scoreboard",
  initialState: {
    headerData: [],
    data: []
  },
  reducers: {
    setScoreboard: (state, action) => {
      state.data = action.payload
    },
    setHeaderData: (state, action) => {
      state.headerData = action.payload
    },
    clearBoth : (state) => {
      state.data = [];
      state.headerData = [];
    }
  }
});

export const { setScoreboard, setHeaderData, clearBoth } = scoreSlice.actions;

export const selectScore = state => state.scoreboard.data;
export const selectHeaderData = state => state.scoreboard.headerData;

export const fetchScores = (stage_id, fix_id) => async dispatch => {
  try {
    // const url = encodeURIComponent(`https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=pCKbJYBnFQkyAqEEfEgQAGkFDCHYjeV7PwTpvC6qtCN9wa6mp3aJ512MJjYh&include=balls,odds,localteam,visitorteam,bowling.team,batting.team,runs.team,bowling.bowler,batting.batsman,batting.bowler,batting.catchstump,batting.runoutby,scoreboards&filter[stage_id]=${stage_id}`);
    const url = encodeURIComponent(`${api_base}fixtures/${fix_id}?api_token=${api_token}&include=balls,odds,localteam,visitorteam,bowling.team,batting.team,runs.team,bowling.bowler,batting.batsman,batting.bowler,batting.catchstump,batting.runoutby,scoreboards,lineup`);
    const { data } = await axios.get(`https://api.allorigins.win/raw?url=${url}`);
    // console.log(data);
    dispatch(setScoreboard([
      {
        team_id: data.data.localteam_id,
        team_code: data.data.localteam.code,
        team_name: data.data.localteam.name,
        batting: data.data.batting.filter(batting => batting.team_id === data.data.localteam_id),
        bowling: data.data.bowling.filter(bowling => bowling.team_id === data.data.localteam_id),
        lineup: data.data.lineup.filter(lineup => lineup.lineup.team_id === data.data.localteam_id),
        did_not_bat: data.data.lineup.filter(lineup => lineup.lineup.team_id === data.data.localteam_id).filter(lineup => !data.data.batting.map(bat => bat.batsman.fullname).includes(lineup.fullname)).map(lineup => lineup.firstname[0]+" "+lineup.lastname).join(', '),
        captain: data.data.lineup.filter(lineup => lineup.lineup.team_id === data.data.localteam_id).filter(lineup => lineup.lineup.captain)[0],
        wicketkeeper: data.data.lineup.filter(lineup => lineup.lineup.team_id === data.data.localteam_id).filter(lineup => lineup.lineup.wicketkeeper)[0],
        extras: data.data.scoreboards.filter(scoreboard => scoreboard.team_id === data.data.visitorteam_id && scoreboard.type === "extra")[0],
        totals: data.data.scoreboards.filter(scoreboard => scoreboard.team_id === data.data.visitorteam_id && scoreboard.type === "total")[0],
        runs: data.data.runs.filter(run => run.team_id === data.data.localteam_id)[0]
      }, 
      {
        team_id: data.data.visitorteam_id,
        team_code: data.data.visitorteam.code,
        team_name: data.data.visitorteam.name,
        batting: data.data.batting.filter(batting => batting.team_id === data.data.visitorteam_id) ,
        bowling: data.data.bowling.filter(bowling => bowling.team_id === data.data.visitorteam_id) ,
        lineup: data.data.lineup.filter(lineup => lineup.lineup.team_id === data.data.visitorteam_id),
        captain: data.data.lineup.filter(lineup => lineup.lineup.team_id === data.data.visitorteam_id).filter(lineup => lineup.lineup.captain)[0],
        wicketkeeper: data.data.lineup.filter(lineup => lineup.lineup.team_id === data.data.visitorteam_id).filter(lineup => lineup.lineup.wicketkeeper)[0],
        did_not_bat: data.data.lineup.filter(lineup => lineup.lineup.team_id === data.data.visitorteam_id).filter(lineup => !data.data.batting.map(bat => bat.batsman.fullname).includes(lineup.fullname)).map(lineup => lineup.firstname[0]+" "+lineup.lastname).join(', '),
        extras: data.data.scoreboards.filter(scoreboard => scoreboard.team_id === data.data.localteam_id && scoreboard.type === "extra")[0],
        totals: data.data.scoreboards.filter(scoreboard => scoreboard.team_id === data.data.localteam_id && scoreboard.type === "total")[0],
        runs: data.data.runs.filter(run => run.team_id === data.data.visitorteam_id)[0]
      }
      ]));
    dispatch(setHeaderData(data.data));
  }catch (er) {
    console.log(er, 'custom error');
  }
}

// export const fetchScores = (stage_id, fix_id) => async dispatch => {
//   try {
//     const url = encodeURIComponent(`https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=pCKbJYBnFQkyAqEEfEgQAGkFDCHYjeV7PwTpvC6qtCN9wa6mp3aJ512MJjYh&include=balls,odds,localteam,visitorteam,bowling.team,batting.team,runs.team,bowling.bowler,batting.batsman,batting.bowler,batting.catchstump,batting.runoutby,scoreboards&filter[stage_id]=${stage_id}`);
//     const { data } = await axios.get(`https://api.allorigins.win/raw?url=${url}`);
//     console.log(data);
//     dispatch(setScoreboard([...data.data.map(match => (
//       {
//         team_id: match.localteam_id,
//         team_code: match.localteam.code,
//         team_name: match.localteam.name,
//         batting: match.batting.filter(batting => batting.team_id === match.localteam_id),
//         bowling: match.bowling.filter(bowling => bowling.team_id === match.localteam_id),
//         extras: match.scoreboards.filter(scoreboard => scoreboard.team_id === match.localteam_id && scoreboard.type === "extra")[0],
//         totals: match.scoreboards.filter(scoreboard => scoreboard.team_id === match.localteam_id && scoreboard.type === "total")[0],
//         runs: match.runs.filter(run => run.team_id === match.localteam_id)[0]
//       }
//     )), ...data.data.map(match => (
//       {
//         team_id: match.visitorteam_id,
//         team_code: match.visitorteam.code,
//         team_name: match.visitorteam.name,
//         batting: match.batting.filter(batting => batting.team_id === match.visitorteam_id) ,
//         bowling: match.bowling.filter(bowling => bowling.team_id === match.visitorteam_id) ,
//         extras: match.scoreboards.filter(scoreboard => scoreboard.team_id === match.visitorteam_id && scoreboard.type === "extra")[0],
//         totals: match.scoreboards.filter(scoreboard => scoreboard.team_id === match.visitorteam_id && scoreboard.type === "total")[0],
//         runs: match.runs.filter(run => run.team_id === match.localteam_id)[0]
//       }
//     ))]));
//     dispatch(setHeaderData(data.data.filter(m => String(m.id) === String(fix_id))[0]));
//   }catch (er) {
//     console.log(er, 'custom error');
//   }
// }

export default scoreSlice.reducer;