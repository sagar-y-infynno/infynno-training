import { configureStore } from "@reduxjs/toolkit";
import machesReducer, { fetchFinished } from "../reducers/machesSlice";
import scoreReducer from "../reducers/scoreSlice";
import playerSlice from "../reducers/playerSlice";

export const store = configureStore({
  reducer: {
    matches: machesReducer,
    scoreboard: scoreReducer,
    player: playerSlice
  }
});

// store.dispatch(fetchLive());
store.dispatch(fetchFinished());
// store.dispatch(fetchUpcoming());
