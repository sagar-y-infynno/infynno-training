import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';

const api_base = process.env.REACT_APP_API_BASE;
const api_token = process.env.REACT_APP_API_TOKEN;
const proxy_base = process.env.REACT_APP_PROXY_BASE;

// export const fetchPlayer = createAsyncThunk('player/getPlayer', async () => {
  // const url = encodeURIComponent(`${api_base}players/${player_id}?api_token=${api_token}&include=career,teams,currentteams`);
  // const { data } = await axios.get(`${proxy_base}${url}`);
  // dispatch(setPlayer(data.data));  
// } )

const playerSlice = createSlice({
  name: "player",
  initialState: {
    data: []
  },
  reducers: {
    setPlayer : (state, action) => {
      state.data =  action.payload
    },
    clearPlayer : (state) => {
      state.data = [];
    }
  }
});

export const selectPlayer = state => state.player.data;

export const { setPlayer, clearPlayer } = playerSlice.actions;

export const fetchPlayer = (player_id) => async dispatch => {
  try{
    const url = encodeURIComponent(`${api_base}players/${player_id}?api_token=${api_token}&include=career,teams,currentteams`);
    const { data } = await axios.get(`${proxy_base}${url}`);
    // console.log(data);
    // console.log(data.data.career.map(career => career.type));
    // console.log([...new Set(data.data.career.map(career => career.type))]);
    
    // new custom data ....
    // console.log([...new Set(data.data.career.map(career => career.type))].map(type => {
    //   return data.data.career.filter(
    //     career => career.type === type).reduce(
    //       (career_data, career) => ({
    //         // type: career_data.type, 
    //         ...career_data, 
    //         batting: career_data.batting ? {
    //           ...career_data.batting ,
    //           matches: career.batting.matches ? (career_data.batting.matches + career.batting.matches) : career_data.batting.matches, 
    //           innings: (career_data.batting.innings + career.batting.innings), 
    //           hundreds: (career_data.batting.hundreds + career.batting.hundreds), 
    //           fifties: (career_data.batting.fifties + career.batting.fifties), 
    //           four_x: (career_data.batting.four_x + career.batting.four_x), 
    //           six_x: (career_data.batting.six_x + career.batting.six_x),
    //           balls_faced: (career_data.batting.six_x + career.batting.six_x),
    //           average: ((career_data.batting.average + career.batting.average) / 2),
    //           strike_rate: ((career_data.batting.strike_rate + career.batting.strike_rate) / 2),
    //           runs_scored: (career_data.batting.runs_scored + career.batting.runs_scored),
    //           not_outs: (career_data.batting.six_x + career.batting.six_x)
    //         } : null ,
    //         bowling: career_data.bowling ? {
    //           ...career_data.bowling,
    //           matches: career.bowling.matches ? (career_data.bowling.matches + career.bowling.matches) : career_data.bowling.matches, 
    //           innings: (career_data.bowling.innings + career.bowling.innings),
    //           overs: ( Number((career_data.bowling.overs + career.bowling.overs) % 1).toFixed(1).substring(2)) < 6 ? Number(career_data.bowling.overs + career.bowling.overs) : (career_data.bowling.overs + career.bowling.overs + 1 + Number(((Number(((career_data.bowling.overs + career.bowling.overs) % 1).toFixed(1).substring(2))  - 6) * 0.1).toFixed(1)) ),
    //           runs: (career_data.bowling.runs + career.bowling.runs),
    //           wickets: (career_data.bowling.wickets + career.bowling.wickets),
    //           four_wickets: (career_data.bowling.four_wickets + career.bowling.four_wickets),
    //           five_wickets: (career_data.bowling.five_wickets + career.bowling.five_wickets),
    //           average: ((career_data.bowling.average + career.bowling.average) / 2),
    //           econ_rate: ((career_data.bowling.econ_rate + career.bowling.econ_rate) / 2),
    //           medians: (career_data.bowling.medians + career.bowling.medians)
    //         } : null
    //       }) 
    //     )
    //   }
    // ));

    dispatch(setPlayer( {...data.data, 
      career : [...new Set(data.data.career.map(career => career.type))].map(type => {
      return data.data.career.filter(
        career => career.type === type).reduce(
          (career_data, career) => ({
            // type: career_data.type, 
            ...career_data, 
            batting: career_data.batting ? {
              ...career_data.batting ,
              matches: career.batting.matches ? (career_data.batting.matches + career.batting.matches) : career_data.batting.matches, 
              innings: (career_data.batting.innings + career.batting.innings), 
              hundreds: (career_data.batting.hundreds + career.batting.hundreds), 
              fifties: (career_data.batting.fifties + career.batting.fifties), 
              four_x: (career_data.batting.four_x + career.batting.four_x), 
              six_x: (career_data.batting.six_x + career.batting.six_x),
              balls_faced: (career_data.batting.six_x + career.batting.six_x),
              average: ((career_data.batting.average + career.batting.average) / 2),
              strike_rate: ((career_data.batting.strike_rate + career.batting.strike_rate) / 2),
              runs_scored: (career_data.batting.runs_scored + career.batting.runs_scored),
              not_outs: (career_data.batting.six_x + career.batting.six_x)
            } : null ,
            bowling: career_data.bowling ? {
              ...career_data.bowling,
              matches: career.bowling.matches ? (career_data.bowling.matches + career.bowling.matches) : career_data.bowling.matches, 
              innings: (career_data.bowling.innings + career.bowling.innings),
              overs: ( Number((career_data.bowling.overs + career.bowling.overs) % 1).toFixed(1).substring(2)) < 6 ? Number(career_data.bowling.overs + career.bowling.overs) : (career_data.bowling.overs + career.bowling.overs + 1 + Number(((Number(((career_data.bowling.overs + career.bowling.overs) % 1).toFixed(1).substring(2))  - 6) * 0.1).toFixed(1)) ),
              runs: (career_data.bowling.runs + career.bowling.runs),
              wickets: (career_data.bowling.wickets + career.bowling.wickets),
              four_wickets: (career_data.bowling.four_wickets + career.bowling.four_wickets),
              five_wickets: (career_data.bowling.five_wickets + career.bowling.five_wickets),
              average: ((career_data.bowling.average + career.bowling.average) / 2),
              econ_rate: ((career_data.bowling.econ_rate + career.bowling.econ_rate) / 2),
              medians: (career_data.bowling.medians + career.bowling.medians)
            } : null
            // bowling: { ...career_data.batting, matches: (career_data.batting.matches + career.batting.matches), 
            //   innings: (career_data.batting.innings + career.batting.innings), 
            //   hundreds: (career_data.batting.hundreds + career.batting.hundreds), 
            //   fifties: (career_data.batting.fifties + career.batting.fifties), 
            //   four_x: (career_data.batting.four_x + career.batting.four_x), 
            //   six_x: (career_data.batting.six_x + career.batting.six_x),
            //   balls_faced: (career_data.batting.six_x + career.batting.six_x),
            //   not_outs: (career_data.batting.six_x + career.batting.six_x)
            // } 
          }) 
        )
      }
    )}));

    // console.log([ 
    //   {
    //     ODI : data.data.career.filter(career => career.type === "ODI").reduce((career_data, career) => ({...career_data, 
    //       batting: { ...career_data.batting, matches: (career_data.batting.matches + career.batting.matches), 
    //       innings: (career_data.batting.innings + career.batting.innings), 
    //       hundreds: (career_data.batting.hundreds + career.batting.hundreds), 
    //       fifties: (career_data.batting.fifties + career.batting.fifties), 
    //       four_x: (career_data.batting.four_x + career.batting.four_x), 
    //       six_x: (career_data.batting.six_x + career.batting.six_x),
    //       balls_faced: (career_data.batting.six_x + career.batting.six_x),
    //       not_outs: (career_data.batting.six_x + career.batting.six_x)
    //     } }) )
    // }]
    // );
    // dispatch(setPlayer(data.data));
  }catch(er) {
    console.log(er, "custom error");
  }
}

export default playerSlice.reducer;