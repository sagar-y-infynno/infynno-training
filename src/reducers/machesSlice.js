import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api_base = process.env.REACT_APP_API_BASE;
const api_token = process.env.REACT_APP_API_TOKEN;
const proxy_base = process.env.REACT_APP_PROXY_BASE;


// using .then()...
// export const fetchFinished = createAsyncThunk('matches/getFinished', () => {
//   const url = encodeURIComponent("https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=pCKbJYBnFQkyAqEEfEgQAGkFDCHYjeV7PwTpvC6qtCN9wa6mp3aJ512MJjYh&include=localteam,visitorteam,runs.team,league");
//   return axios.get(`https://api.allorigins.win/raw?url=${url}`).then(res => res.data.data.filter((m) => m.status === "Finished").splice(0, 15)).catch(er => console.log(er));
// });

// using async await...
export const fetchFinished = createAsyncThunk('matches/getFinished', async () => {
  const url = encodeURIComponent(`${api_base}fixtures?api_token=${api_token}&include=localteam,visitorteam,runs.team,league`);
  const { data } = await axios.get(`${proxy_base}${url}`);
  console.log(data);
  return data.data.filter((m) => m.status === "Finished");//.splice(0, 50);
});

// export const fetchLive = createAsyncThunk('matches/getFinished', async () => {
//   const url = encodeURIComponent("https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=pCKbJYBnFQkyAqEEfEgQAGkFDCHYjeV7PwTpvC6qtCN9wa6mp3aJ512MJjYh&include=localteam,visitorteam,runs.team,league");
//   const { data } = await axios.get(`https://api.allorigins.win/raw?url=${url}`);
//   return data.data.filter((m) => m.status === "Finished").splice(16, 15);
// });

// export const fetchUpcoming = createAsyncThunk('matches/getFinished', async () => {
//   const url = encodeURIComponent("https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=pCKbJYBnFQkyAqEEfEgQAGkFDCHYjeV7PwTpvC6qtCN9wa6mp3aJ512MJjYh&include=localteam,visitorteam,runs.team,league");
//   const { data } = await axios.get(`https://api.allorigins.win/raw?url=${url}`);
//   return data.data.filter((m) => m.status === "Finished").splice(31, 15);
// });

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    finished: [],
    upcoming: [],
    live: []
  },
  reducers: {
    setFinished: (state, action) => {
      state.finished = action.payload
    }
  },
  extraReducers: {
    [fetchFinished.pending] : (state) => {
      state.isLoading = true;
    },
    [fetchFinished.fulfilled] : (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.finished = action.payload.splice(0, 15);
      state.live = action.payload.splice(20, 15);
      state.upcoming = action.payload.splice(50, 15);
    },
    [fetchFinished.rejected] : (state) => {
      state.isLoading = false;
    }
    // [fetchLive.pending] : (state) => {
    //   state.isLoading = true;
    // },
    // [fetchLive.fulfilled] : (state, action) => {
    //   state.isLoading = false;
    //   // console.log(action.payload);
    //   state.live = action.payload;
    // },
    // [fetchLive.rejected] : (state) => {
    //   state.isLoading = false;
    // },
    // [fetchUpcoming.pending] : (state) => {
    //   state.isLoading = true;
    // },
    // [fetchUpcoming.fulfilled] : (state, action) => {
    //   state.isLoading = false;
    //   // console.log(action.payload);
    //   state.upcoming = action.payload;
    // },
    // [fetchUpcoming.rejected] : (state) => {
    //   state.isLoading = false;
    // }
  }
});

export const selectFinished = state => state.matches.finished;
export const selectMatches = state => state.matches;

// working ...
// export const fetchFinished = async dispatch => {
//   try{
//     const url = encodeURIComponent("https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=pCKbJYBnFQkyAqEEfEgQAGkFDCHYjeV7PwTpvC6qtCN9wa6mp3aJ512MJjYh&include=localteam,visitorteam,runs.team,league");
//     const { data } = await axios.get(`https://api.allorigins.win/raw?url=${url}`);
//     console.log(data.data.filter((m) => m.status === "Finished").splice(0, 15));
//     dispatch(setFinished(data.data.filter((m) => m.status === "Finished").splice(0, 15)));
//   }catch(er) {
//     console.log(er, 'custom error');
//   }
// }

export const { setFinished } = matchesSlice.actions;

export default matchesSlice.reducer;